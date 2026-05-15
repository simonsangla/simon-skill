# Modelo 3 IRS — the upload XML file

How to read, correct, and re-upload the XML file that the Portal das Finanças
uses for the **Modelo 3 IRS declaration** (annual personal income tax return).

Read this when the user wants to **produce or correct the file they upload to
the Portal** — when they mention a *declaração gravada* / *ficheiro*, the
`Modelo3IRSv2026` schema, an `.xsd`, AnexoA income codes, or "re-upload my
corrected declaration".

This reference is about **file mechanics only**. It does not compute tax and
it does not tell the user what their figures should be — that comes from the
rest of this skill plus the user's own source documents. Never invent a figure
to put in the XML.

---

## Golden rule — prefer the Portal's own import over hand-editing

The Portal das Finanças Modelo 3 application can **save a declaration to an XML
file** and **read one back in** — *"Leitura de uma declaração gravada
previamente num ficheiro"*. When you import a file, the application:

- recomputes every total,
- runs the official *validações* (coherence + completeness checks),
- regenerates a clean XML at submission.

So the safest workflow for almost every correction is:

1. Open the declaration in the Portal Modelo 3 app (or open the pre-filled
   *declaração automática* if eligible).
2. Import the saved XML, **or** edit the declaration already loaded there.
3. Change the figure **in the form UI**.
4. Run *Validar*, fix anything it flags, submit with Cartão de Cidadão / Chave
   Móvel Digital. Save the *comprovativo*.

Hand-editing the raw XML — or using the helper script below — is a **fallback**
for offline or repetitive work. Even then, the corrected file **must still be
imported through the Portal** so the server-side *validações* run before
submission. The script is not a substitute for that step.

Always start from the declaration the Portal already gives you (pre-filled or
previously saved) and change only what must change. Do not build a declaration
from nothing — you would drop data the AT pre-filled (household, IBAN flags,
prior-year carry-overs).

---

## What is verified vs what you must look up

This skill's prime directive is *never invent*. The facts below are split
accordingly.

**Confirmed from official sources:**

- the document envelope and namespace (below);
- the `AnexoA / Quadro 04` income-line structure and the column-total mapping
  `SomaC01..C05` (below) — the order is fixed by the Modelo3IRS XSD
  `AnexoAq04AT01-Linha` element sequence and matches the Anexo A column
  instructions of **Portaria n.º 104/2026/1**;
- the `AnexoA` Quadro 4A / 4C `CodRendimentos` tables (below) — reproduced from
  **Portaria n.º 104/2026/1** (the 2026 campaign, income year 2025). Codes are
  **campaign-year-specific**: for any other year, read that year's Portaria;
- the amount format: a plain decimal, **dot** separator, **exactly two**
  decimal places, in **euros** (e.g. `94412.98`) — not cents, not a comma
  (observed in a real declaration file).

**Must still look up — never assume:**

- the field semantics of every `Rosto` Quadro (marital status, dependants,
  IBAN flags, service code, etc.);
- the structure of every other anexo (B, C, D, E, F, G, H, J, L, ...). Each
  has its own elements, and B/C/G additionally carry their own calculation
  logic.

When in doubt, do not hand-edit — use the Portal UI.

---

## Document envelope

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Modelo3IRSv2026
    xmlns="http://www.dgci.gov.pt/2009/Modelo3IRSv2026"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    versao="1"
    xsi:schemaLocation="http://www.dgci.gov.pt/2009/Modelo3IRSv2026 Modelo3IRSv2026.xsd">
  <Rosto> ... </Rosto>
  <AnexoA> ... </AnexoA>
</Modelo3IRSv2026>
```

- The root element name carries the **campaign version** — `Modelo3IRSv2026`
  is the schema for the campaign that declares income year 2025. A different
  campaign uses a different root element, namespace, and `.xsd`. Never reuse a
  prior year's file or schema.
- The **default namespace** must be present on every element.
- Children: exactly one `<Rosto>` (cover sheet — year, NIF, marital status,
  IBAN, ...) followed by one element per anexo filed (`<AnexoA>`, `<AnexoB>`,
  ... in schema order).

---

## AnexoA / Quadro 04 — employment & pension income

```xml
<AnexoA>
  <Quadro04>
    <AnexoAq04AT01>
      <AnexoAq04AT01-Linha numero="1">
        <NIF>514920408</NIF>                    <!-- paying entity NIF -->
        <CodRendimentos>401</CodRendimentos>    <!-- income-type code: look up -->
        <Titular>A</Titular>                    <!-- income holder -->
        <Rendimentos>94412.98</Rendimentos>     <!-- gross income      -> SomaC01 -->
        <Retencoes>18879.00</Retencoes>         <!-- IRS withheld      -> SomaC02 -->
        <Contribuicoes>10277.22</Contribuicoes> <!-- mandatory SS      -> SomaC03 -->
        <!-- <RetSobretaxa> -> SomaC04: present only for income years 2015-2017 -->
        <Quotizacoes>0.00</Quotizacoes>         <!-- union dues        -> SomaC05 -->
      </AnexoAq04AT01-Linha>
      <AnexoAq04AT01-Linha numero="2"> ... </AnexoAq04AT01-Linha>
    </AnexoAq04AT01>
    <AnexoAq04AT01SomaC01>115083.54</AnexoAq04AT01SomaC01> <!-- = sum of all Rendimentos -->
    <AnexoAq04AT01SomaC02>18879.00</AnexoAq04AT01SomaC02>  <!-- = sum of all Retencoes -->
    <AnexoAq04AT01SomaC03>10277.22</AnexoAq04AT01SomaC03>  <!-- = sum of all Contribuicoes -->
    <AnexoAq04AT01SomaC04>0.00</AnexoAq04AT01SomaC04>      <!-- = sum of all RetSobretaxa -->
    <AnexoAq04AT01SomaC05>0.00</AnexoAq04AT01SomaC05>      <!-- = sum of all Quotizacoes -->
  </Quadro04>
</AnexoA>
```

| Per-line field | Meaning | Column total |
|---|---|---|
| `Rendimentos` | gross income | `AnexoAq04AT01SomaC01` |
| `Retencoes` | IRS withheld at source | `AnexoAq04AT01SomaC02` |
| `Contribuicoes` | mandatory social-security contributions | `AnexoAq04AT01SomaC03` |
| `RetSobretaxa` | sobretaxa withheld — income years 2015–2017 only | `AnexoAq04AT01SomaC04` |
| `Quotizacoes` | union dues | `AnexoAq04AT01SomaC05` |

This order is fixed by the `AnexoAq04AT01-Linha` element sequence in the
Modelo3IRS XSD and matches the Anexo A column instructions of Portaria
104/2026/1 (4ª–8ª colunas). `RetSobretaxa` is absent from declarations for
income year 2018 onward — the sobretaxa was abolished — so in a current return
`SomaC04` is `0.00` and `SomaC05` carries the union-dues total.

**The critical failure mode:** the `SomaC0x` totals are **stored values, not
derived**. Change a `<Rendimentos>` and forget to update
`AnexoAq04AT01SomaC01`, and the file is internally inconsistent — the Portal's
coherence check rejects it, or (worse) accepts a wrong total. **Every edit to a
line value requires recomputing the matching `SomaC0x`.**

**Finding the line to edit:** match `<NIF>` (the paying entity) and
`<CodRendimentos>` against the income source you are correcting; the `numero`
attribute is that line's address (the helper script addresses lines by it).
A single `<AnexoA>` can hold lines for both titulares of a joint declaration —
the `<Titular>` element (`A` / `B` / a dependant) distinguishes them.

---

## AnexoA — `CodRendimentos` codes

Reproduced from the Anexo A *instruções de preenchimento*, **Portaria n.º
104/2026/1** — the 2026 campaign (income year 2025). Codes are
campaign-year-specific; for any other year, read that year's Portaria. Do not
pick a code by analogy — the distinctions (subject to retention or not,
*ex-residente* regime, IRS Jovem, year ranges) are legally load-bearing.

**Quadro 4A — `CodRendimentos` (income / retention lines):**

| Code | Description |
|---|---|
| 401 | Trabalho dependente — rendimento bruto (exceto os dos códigos 402 e 408 a 418) |
| 402 | Gratificações não atribuídas pela entidade patronal [al. g) n.º 3 art. 2.º CIRS] — tributação autónoma |
| 403 | Pensões (exceto pensões de sobrevivência e de alimentos) |
| 404 | Pensões de sobrevivência |
| 405 | Pensões de alimentos |
| 406 | Rendas temporárias e vitalícias |
| 407 | Pré-reforma — regime de transição |
| 408 | Compensações/subsídios de atividade voluntária a bombeiros (n.º 19 art. 72.º CIRS) |
| 409 | Trabalho dependente não sujeito a retenção — rendimentos em espécie (ano de 2018) |
| 410 | Trabalho dependente, incl. subsídios de férias/Natal — regime ex-residentes (anos 2019–2027) |
| 411 | Gratificações não atribuídas pela entidade patronal — regime ex-residentes (anos 2019–2027) |
| 412 | Trabalho dependente — uso de habitação fornecida pela entidade patronal (2019+) |
| 413 | Trabalho dependente — empréstimos sem juros / juro inferior ao de referência (2019+) |
| 414 | Trabalho dependente — ganhos de planos de opções/subscrição/atribuição sobre valores mobiliários, em benefício de trabalhadores ou membros de órgãos sociais (2019+) |
| 415 | Trabalho dependente — uso pessoal de viatura automóvel com acordo escrito (2019+) |
| 416 | Trabalho dependente — aquisição de viatura por preço inferior ao de mercado (2019+) |
| 417 | Trabalho dependente, incl. subsídios de férias/Natal e parte isenta — regime IRS Jovem, art. 12.º-B CIRS (anos 2020–2024) |
| 418 | Trabalho dependente, incl. subsídios de férias/Natal e parte excluída — n.º 9 art. 12.º CIRS, estudantes dependentes (2020+) |
| 419 | Trabalho dependente auferido em criptoativos (2024+) |

**Quadro 4C — `Código da despesa` (outras deduções):**

| Code | Description |
|---|---|
| 421 | Indemnizações pagas pelo trabalhador à entidade patronal por rescisão sem aviso prévio |
| 422 | Quotizações para ordens profissionais |
| 423 | Despesas de valorização profissional de juízes (Lei n.º 143/99) |
| 424 | Prémios de seguros de profissões de desgaste rápido (art. 27.º CIRS) |

## Editing the XML by hand — safety checklist

1. **Work on a copy.** Never edit the only copy of the downloaded file.
2. **Change only sourced values.** Edit a figure only if a document backs it —
   *recibo*, employer DMR, *declaração da entidade pagadora*. Never a number
   you computed in your head or guessed.
3. **Format every amount** as `NNNN.DD` — dot separator, exactly two decimals,
   euros.
4. **Recompute every affected `SomaC0x`** total.
5. **Preserve element order and the default namespace.**
6. **Validate against the official XSD:**
   `xmllint --noout --schema Modelo3IRSv2026.xsd file.xml`. The v2026 schema is
   a **two-file set** — `Modelo3IRSv2026.xsd` `<xs:include>`s `types.xsd`;
   download both and keep them in the same folder, or validation fails on the
   missing include. The XSD is named in the file's `schemaLocation`.
7. **Import the validated file through the Portal** so the server-side
   *validações* run, then submit.

---

## Helper script: `assets/modelo3-edit.py`

Automates steps 3–6 for **AnexoA / Quadro 04 income-line edits only**. Run
`python3 assets/modelo3-edit.py --help` for full usage.

It deliberately **refuses** to:

- run without the official XSD (`--xsd`) — a valid upload cannot be guaranteed
  without it;
- run without at least one explicit `--set` edit — it never edits blind;
- overwrite the input file — `--out` must differ from `--in`;
- emit output that fails XSD validation;
- run on a declaration with more than one `<AnexoA>` element (rare) — that
  case goes to the Portal UI.

It **never computes tax** and **never invents a value** — it only moves the
values passed on the command line, then recomputes `SomaC01..C05`.

Example — correct the income on line 2, preview first, then write:

```bash
# preview the diff only
python3 assets/modelo3-edit.py \
  --in decl-downloaded.xml --xsd Modelo3IRSv2026.xsd \
  --out decl-corrected.xml --set 2:Rendimentos=20670.56 --dry-run

# write the corrected file
python3 assets/modelo3-edit.py \
  --in decl-downloaded.xml --xsd Modelo3IRSv2026.xsd \
  --out decl-corrected.xml --set 2:Rendimentos=20670.56
```

`--set LINE:FIELD=VALUE` — `LINE` is the `numero` attribute of an
`AnexoAq04AT01-Linha`; `FIELD` is one of `Rendimentos`, `Retencoes`,
`Contribuicoes`, `RetSobretaxa`, `Quotizacoes`. Repeat `--set` for multiple
edits.

After the script writes the file, **still import it through the Portal** (see
the golden rule).

---

## Out of scope for this reference

- **Other anexos.** Anexo B/C (Categoria B income), Anexo G (mais-valias) and
  others carry their own structure and calculation logic — use the Portal UI,
  not hand-editing. For the tax treatment behind those anexos, see
  `references/irs.md`.
- **Choosing the figures.** What a number *should* be is an IRS question, not a
  file-format one — see `references/irs.md` and the fact-gate in `SKILL.md`.
- **A figure dispute with the AT.** If the employer's DMR and the user's number
  disagree, that is a substantive matter, not an XML problem; correcting the
  XML does not resolve it.

---

## Source links

- **Portaria n.º 104/2026/1, de 5 de março** — *Diário da República* n.º 45/2026,
  Série I, 2026-03-05. Approves the Modelo 3 declaration, Anexo A/B/C/D/H/J and
  their *instruções de preenchimento* for the 2026 campaign (income year 2025);
  effective 1 January 2026. The authority for the Quadro 4 column order and the
  `CodRendimentos` tables above. Find it at <https://diariodarepublica.pt/> by
  searching "Portaria 104/2026".
- **Modelo 3 — IRS**, Portal das Finanças — the declaration application and the
  save / read-XML feature (no publication date displayed):
  <https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Rendimentos/Declaracao/Modelo_3/>
- **`Modelo3IRSv2026.xsd`** (+ `types.xsd`) — the schema to validate the upload
  file against, distributed as a two-file set (`Modelo3IRSv2026.xsd`
  `<xs:include>`s `types.xsd`). The AT publishes both on the Portal das Finanças
  under *Serviços Tributários → Outros Serviços → Formato de Ficheiros*
  (*Suporte Informático — Formato de ficheiros*). It is not a stable public deep
  link; obtain the files for the current campaign year. Schemas for earlier
  years (v2014–v2016) are **not** valid for a 2026 declaration.
