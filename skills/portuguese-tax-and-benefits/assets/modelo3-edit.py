#!/usr/bin/env python3
"""Safely edit a downloaded Modelo 3 IRS declaration XML.

Part of the portuguese-tax-and-benefits skill. See
references/modelo3-xml.md for the full workflow and the rules this script
enforces.

Scope: edits the income-value fields inside AnexoA / Quadro 04 only
(Rendimentos, Retencoes, Contribuicoes, Quotizacoes), recomputes the
Quadro-04 column totals SomaC01..C04, and validates the result against the
official Modelo3IRSv2026 XSD using xmllint.

It does NOT compute tax, does NOT touch any other anexo, and does NOT invent
values -- it only moves the values passed on the command line. For any other
change, use the Portal das Financas "Leitura de uma declaracao gravada"
import UI instead.

The output file must still be imported through the Portal so the server-side
validacoes run. This script is not a substitute for that step.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from decimal import Decimal, InvalidOperation
from pathlib import Path
import xml.etree.ElementTree as ET

NS = "http://www.dgci.gov.pt/2009/Modelo3IRSv2026"
XSI_NS = "http://www.w3.org/2001/XMLSchema-instance"
ROOT_TAG = "Modelo3IRSv2026"

# Verified empirically against a real declaration file: each editable
# per-line field maps to one Quadro-04 column total.
FIELD_TO_SOMA = {
    "Rendimentos": "AnexoAq04AT01SomaC01",
    "Retencoes": "AnexoAq04AT01SomaC02",
    "Contribuicoes": "AnexoAq04AT01SomaC03",
    "Quotizacoes": "AnexoAq04AT01SomaC04",
}
EDITABLE_FIELDS = tuple(FIELD_TO_SOMA)


def q(tag):
    """Return the namespace-qualified form of a tag name."""
    return "{%s}%s" % (NS, tag)


def fmt_amount(raw):
    """Normalise an amount to NNNN.DD -- dot separator, two decimals, euros."""
    text = raw.strip().replace(",", ".")
    try:
        value = Decimal(text)
    except InvalidOperation:
        raise SystemExit("error: '%s' is not a valid amount" % raw)
    if value < 0:
        raise SystemExit("error: amount '%s' is negative" % raw)
    return "%.2f" % value


def parse_set(spec):
    """Parse a LINE:FIELD=VALUE edit spec into (line_no, field, value)."""
    try:
        locator, value = spec.split("=", 1)
        line_no, field = locator.split(":", 1)
    except ValueError:
        raise SystemExit(
            "error: --set '%s' must be LINE:FIELD=VALUE, "
            "e.g. 2:Rendimentos=20670.56" % spec
        )
    line_no = line_no.strip()
    field = field.strip()
    if not line_no.isdigit():
        raise SystemExit("error: --set '%s': LINE must be a number" % spec)
    if field not in EDITABLE_FIELDS:
        raise SystemExit(
            "error: --set '%s': FIELD must be one of %s"
            % (spec, ", ".join(EDITABLE_FIELDS))
        )
    return line_no, field, fmt_amount(value)


def sum_column(lines, field):
    """Sum one per-line field across every income line."""
    total = Decimal("0")
    for line in lines:
        el = line.find(q(field))
        if el is not None and el.text and el.text.strip():
            total += Decimal(el.text.strip())
    return "%.2f" % total


def main():
    ap = argparse.ArgumentParser(
        description="Edit AnexoA/Quadro04 income lines of a Modelo 3 IRS XML.",
        epilog="See references/modelo3-xml.md for the full workflow.",
    )
    ap.add_argument("--in", dest="src", required=True,
                    help="downloaded Modelo 3 XML to edit")
    ap.add_argument("--xsd", required=True,
                    help="official Modelo3IRSv2026.xsd (required for validation)")
    ap.add_argument("--out", required=True,
                    help="output path (must differ from --in)")
    ap.add_argument("--set", dest="edits", action="append",
                    metavar="LINE:FIELD=VALUE",
                    help="edit one income field; repeatable; at least one required")
    ap.add_argument("--dry-run", action="store_true",
                    help="validate and show the diff without writing --out")
    args = ap.parse_args()

    if not args.edits:
        raise SystemExit("error: at least one --set LINE:FIELD=VALUE is "
                         "required; this script never edits blind")

    src = Path(args.src)
    xsd = Path(args.xsd)
    out = Path(args.out)
    if not src.is_file():
        raise SystemExit("error: --in file not found: %s" % src)
    if not xsd.is_file():
        raise SystemExit("error: --xsd file not found: %s. Download "
                         "Modelo3IRSv2026.xsd from the Portal das Financas."
                         % xsd)
    if out.resolve() == src.resolve():
        raise SystemExit("error: --out must differ from --in "
                         "(never overwrite the original)")
    if shutil.which("xmllint") is None:
        raise SystemExit("error: xmllint not found. Install libxml2 "
                         "(macOS: preinstalled; Debian/Ubuntu: "
                         "apt install libxml2-utils).")

    edits = [parse_set(s) for s in args.edits]

    ET.register_namespace("", NS)
    ET.register_namespace("xsi", XSI_NS)
    try:
        tree = ET.parse(src)
    except ET.ParseError as exc:
        raise SystemExit("error: --in is not well-formed XML: %s" % exc)
    root = tree.getroot()
    if root.tag != q(ROOT_TAG):
        raise SystemExit("error: root element is %s, expected %s. This is "
                         "not a Modelo3IRSv2026 declaration."
                         % (root.tag, q(ROOT_TAG)))

    anexos = root.findall(q("AnexoA"))
    if not anexos:
        raise SystemExit("error: no AnexoA in this declaration.")
    if len(anexos) > 1:
        raise SystemExit("error: this declaration has more than one AnexoA. "
                         "This script handles a single AnexoA only -- use "
                         "the Portal import UI instead.")
    quadro = anexos[0].find(q("Quadro04"))
    table = quadro.find(q("AnexoAq04AT01")) if quadro is not None else None
    if table is None:
        raise SystemExit("error: no AnexoA/Quadro04/AnexoAq04AT01 income "
                         "table found.")
    lines = table.findall(q("AnexoAq04AT01-Linha"))
    if not lines:
        raise SystemExit("error: AnexoA Quadro 04 has no income lines.")

    by_number = {}
    for line in lines:
        num = line.get("numero")
        if num is not None:
            by_number[num] = line

    changes = []  # list of (description, old, new)

    # Sanity check: do the stored totals already match the lines?
    for field, soma_tag in FIELD_TO_SOMA.items():
        soma_el = quadro.find(q(soma_tag))
        if soma_el is None:
            continue
        stored = (soma_el.text or "").strip()
        computed = sum_column(lines, field)
        if stored and Decimal(stored) != Decimal(computed):
            sys.stderr.write(
                "warning: input %s is %s but the lines sum to %s. The "
                "downloaded file is already inconsistent -- verify it in "
                "the Portal.\n" % (soma_tag, stored, computed))

    # Apply edits.
    for line_no, field, value in edits:
        line = by_number.get(line_no)
        if line is None:
            present = ", ".join(sorted(by_number)) or "none"
            raise SystemExit('error: --set %s:%s=...: no AnexoAq04AT01-Linha '
                             'numero="%s". Lines present: %s'
                             % (line_no, field, line_no, present))
        el = line.find(q(field))
        if el is None:
            raise SystemExit("error: line %s has no <%s> element. Use the "
                             "Portal UI to add a missing field."
                             % (line_no, field))
        old = (el.text or "").strip()
        if old == value:
            print("note: line %s %s is already %s; no change."
                  % (line_no, field, value))
            continue
        el.text = value
        changes.append(("line %s %s" % (line_no, field), old, value))

    if not changes:
        print("Nothing to change. Exiting without writing.")
        return 0

    # Recompute the column totals affected by the edits.
    for field, soma_tag in FIELD_TO_SOMA.items():
        soma_el = quadro.find(q(soma_tag))
        if soma_el is None:
            continue
        old = (soma_el.text or "").strip()
        new = sum_column(lines, field)
        if old != new:
            soma_el.text = new
            changes.append(("%s (recomputed)" % soma_tag, old, new))

    if quadro.find(q("AnexoAq04AT01SomaC05")) is not None:
        sys.stderr.write("note: SomaC05 was left unchanged -- this script "
                         "has no verified mapping for it. If your edit "
                         "affects a C05 field, verify via the Portal "
                         "import.\n")

    print("Changes:")
    for desc, old, new in changes:
        print("  %s: %s -> %s" % (desc, old or "(empty)", new))

    # Validate against the XSD before writing the real output.
    tmp = tempfile.NamedTemporaryFile(suffix=".xml", delete=False)
    tmp.close()
    tmp_path = Path(tmp.name)
    try:
        tree.write(tmp_path, encoding="UTF-8", xml_declaration=True)
        result = subprocess.run(
            ["xmllint", "--noout", "--schema", str(xsd), str(tmp_path)],
            capture_output=True, text=True,
        )
        if result.returncode != 0:
            sys.stderr.write("XSD validation FAILED -- output not written:\n")
            sys.stderr.write(result.stderr.strip() + "\n")
            return 1
        print("XSD validation passed (%s)." % xsd.name)
        if args.dry_run:
            print("Dry run: --out not written.")
            return 0
        shutil.copyfile(tmp_path, out)
    finally:
        tmp_path.unlink(missing_ok=True)

    print("Wrote %s." % out)
    print()
    print("NEXT: import this file through the Portal das Financas "
          '("Leitura de uma declaracao gravada") so the server-side '
          "validacoes run before you submit. This script does not replace "
          "that step.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
