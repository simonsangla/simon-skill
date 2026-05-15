# Handoff — Modelo 3 IRS upload-XML capability for portuguese-tax-and-benefits

## Goal

Add a Modelo 3 IRS **upload-file** capability to the `portuguese-tax-and-benefits`
skill: a reference doc plus a helper script so the skill can help a user
correct and re-upload their IRS declaration XML to the Portal das Finanças —
without guessing schema details or income codes.

## Current Progress

**Complete.** Three PRs shipped to `simon-skill` (`github.com/simonsangla/simon-skill`),
all squash-merged, CI green:

- **PR #34** — added `skills/portuguese-tax-and-benefits/references/modelo3-xml.md`
  + `assets/modelo3-edit.py` + `SKILL.md` wiring (dispatch row, Cavekit
  conformance ACC1 7->8, R4 note, safe-failure bullet).
- **PR #35** — fixed a Soma column-mapping bug from #34 and added the official
  `CodRendimentos` tables (Quadro 4A 401-419, 4C 421-424) sourced to
  Portaria 104/2026/1.
- **PR #36** — doc note: the v2026 schema is a two-file set
  (`Modelo3IRSv2026.xsd` `<xs:include>`s `types.xsd`).

`main` @ `24439ea`. Built via `superpowers:writing-skills` TDD (RED baseline ->
GREEN -> REFACTOR). Verified end-to-end against the **real official**
`Modelo3IRSv2026.xsd`: the test declaration and the script's output both
validate with `xmllint --schema`.

The live skill (`~/.claude/skills/portuguese-tax-and-benefits/`, symlinked to
the `claude-config` repo) is synced **on disk** — feature is live.

## What Worked

- **writing-skills TDD.** A RED-phase subagent exposed that, without the
  reference, an agent guesses the Soma-total mapping and the amount encoding.
  GREEN re-test confirmed all gaps closed.
- **Grounding in the official sources the user provided.** Portaria 104/2026/1
  gave the `CodRendimentos` table; the real `Modelo3IRSv2026.xsd` confirmed the
  column mapping and enabled true end-to-end validation.
- **Conservative script design.** `modelo3-edit.py` refuses without the XSD,
  refuses without an explicit `--set`, never overwrites the input, never
  computes tax, and validates via `xmllint` before writing.
- `/pr` compressed mode for the small doc PR (#36).

## What Didn't Work (avoid repeating)

- **Empirical-only schema verification.** PR #34 inferred the Soma mapping from
  one real declaration where `SomaC04` and `SomaC05` were both `0.00` — so it
  could not distinguish them and wrongly mapped `Quotizacoes -> SomaC04`. The
  XSD `AnexoAq04AT01-Linha` element order is the authority (`C04=RetSobretaxa`,
  `C05=Quotizacoes`). **Verify XML-schema mappings against the XSD, not a single
  sample file.** Fixed in #35, re-confirmed against the real v2026 XSD.
- **`irs-schemas-master.zip`** the user supplied was a stale community mirror
  (v2014-2016 only) — no v2026 schema. Its v2016 XSD still helped confirm the
  structure.

## Next Steps

1. **Commit the claude-config sync.** The `claude-config` repo
   (`~/projects/claude-config`, branch `feat-memory-shell-hook-path-scope`) has
   uncommitted synced files: `skills/portuguese-tax-and-benefits/references/modelo3-xml.md`
   (new), `assets/modelo3-edit.py` (new), and `SKILL.md` (one dispatch-table row
   added). They sit alongside the user's unrelated in-flight work
   (`iefp-seg-social.md`, memory files). Commit the three skill files when
   reconciling that branch. Note: claude-config's `SKILL.md` has no Cavekit
   conformance section, so only the dispatch row was synced — that is correct.
2. **For real use of `modelo3-edit.py`:** the official `Modelo3IRSv2026.xsd`
   + `types.xsd` must be downloaded together from Portal das Finanças ->
   Serviços Tributários -> Outros Serviços -> Formato de Ficheiros. The user
   already has them locally at `~/Desktop/Suporte_Informatico_IRS_2026/`.
3. **Out of current scope:** the helper script handles only AnexoA / Quadro 04
   income lines. Other anexos (B/C/G with their own calculation logic) remain
   Portal-UI-only by design — extending the script is net-new scope.

## Resume

```
cd /Users/simonsangla/projects/simon-productivity && git checkout main && git pull --ff-only
```

Sync status: `simon-skill` `main` @ `24439ea` == `origin/main`, tree clean.
`claude-config` synced on disk, uncommitted (see Next Step 1).
