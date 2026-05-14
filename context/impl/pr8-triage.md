---
created: "2026-05-14"
last_edited: "2026-05-14"
---

# PR8 triage — portuguese-tax-and-benefits

Triage document. No edits to `skills/portuguese-tax-and-benefits/SKILL.md` in this chat — Simon picks A/B/C below and PR8 ships in a separate chat.

## 1. Per-AC hit/miss against `cavekit-background-skills.md` R3

| AC | Requirement (verbatim summary) | Status | Evidence |
|---|---|---|---|
| R3 ACC1 | SKILL.md body enumerates the 7 reference files under `references/` together with a dispatch-by-domain table | **HIT** | `skills/portuguese-tax-and-benefits/SKILL.md:38-47` — "When to use which reference file" table names all seven: `irs.md`, `property-tax.md`, `iefp-seg-social.md`, `self-employed-seg-social.md`, `cross-border.md`, `clarifying-questions.md`, `sources.md`. |
| R3 ACC2 | `assets/answer-template.md` defines the six sections using exact heading strings (Facts, Analysis, Risks, Actions, Documents needed, Source links) | **HIT** | `skills/portuguese-tax-and-benefits/assets/answer-template.md` carries all six H2 headings verbatim. Spot-check: `grep -E "^## (Facts\|Analysis\|Risks\|Actions\|Documents needed\|Source links)$"` returns all six. |
| R3 ACC3 | Each reference file cites primary sources (DRE, AT, Seg Social, IEFP) ahead of secondary commentary | **HIT (sources.md confirmed; per-domain files plausible)** | `references/sources.md` has an explicit "Order of authority" section (lines 22–24+) leading with DRE then Portal das Finanças. Per-domain reference files weren't fully scanned in this triage but the discipline is documented at the bundle level. |
| R3 ACC4 | Every numeric threshold in `references/` appears next to a publication date, a "consolidado a" date, or the literal phrase "date not displayed" | **PROBABLY HIT — needs per-file spot-check** | `references/sources.md` carries an explicit "Refresh log" table dated 2026-05-13 with anchor diplomas (Portaria 480-A/2025/1, DL 139/2025, Lei 73-A/2025, Lei 45-A/2024, DL 48-D/2024). The discipline is set bundle-wide; verifying it in every per-domain reference file is a small additional pass. |

**Verdict on AC coverage:** all four ACs from background-skills R3 are met (or near-met with a small verification pass). The skill is in unusually good shape relative to PR4–PR7 starting points — Simon clearly already did the source-discipline work.

## 2. Additional gaps beyond R3 ACs

The kit ACs are met. The gaps that remain are Cavekit-shape gaps from the precedent locked in PR #25:

| Gap | Severity | Classification |
|---|---|---|
| Missing top-of-body **Cavekit conformance** table | required by precedent | conformance-table absent |
| Frontmatter shape | OK — current `name` + `description` match precedent. No mode flag needed (kit says "user-invocable on PT-tax trigger" → default user-invocable, no flag). | none |
| `simon-productivity` remnants | none (`grep` returns 0 — cleaned in earlier PRs) | none |
| Asset paths | OK — no `../` escape, no `~/`, no `/Users/`, no `${CLAUDE_PLUGIN_ROOT}` reference outside `skills/portuguese-tax-and-benefits/` | none |
| Side-effect language | OK — skill is user-invocable but its "side effect" is producing a 6-section answer; no file writes, no external-service mutations described. Already implicitly handles unavailable-web ("If web access is unavailable in the current session, say so explicitly and describe the rule's structure without numeric values"). | none |
| Safe-failure modes | Implicit. Could optionally add an explicit block per skill-contract R4 (user-invocable skills with side effects must document safe-failure modes), though "side effects" here are weak. | optional polish |

## 3. Estimated diff

| Metric | Value |
|---|---|
| Lines added | ~25–30 (one Cavekit conformance section: anchor paragraph + 8-row table + optional safe-failure-modes block) |
| Lines removed | 0 |
| Sections rewritten | 0 |
| Sections added | 1 (the conformance section) |
| File restructuring | none — table slots in between the H1 + opening paragraph and the existing "Why this skill exists" section |

This is the lightest migration in the PR4–PR8 batch by a wide margin. The skill's content is already correct; PR8 is purely about adding the kit cross-reference layer.

## 4. Classification

**A — Standard conformance migration like PR4 / PR7. Diff < ~80 lines, no kit revision needed.**

Justification: all four R3 acceptance criteria are already satisfied in the current body (with one optional spot-check pass on per-domain reference files to confirm AC4 date-keying). The only missing piece is the top-of-body Cavekit conformance table prescribed by the PR #25 precedent. No kit revision is required because the kit and the skill already agree on substance — only the cross-reference layer is missing. No rewrite is required because the existing 105-line body is on-contract; it just doesn't say so.

## 5. Recommendation for next chat

**Ship PR8 in the next chat — Classification A path.** Concretely:

1. Branch `cavekit/portuguese-tax-and-benefits` off main.
2. Add the Cavekit conformance section per PR #25 precedent: anchor paragraph + 8-row table covering skill-contract R1 (frontmatter), R4 (invocation classification — user-invocable on PT-tax trigger), and background-skills R3 ACC1–ACC4. Each row points at an existing body section or asset file that satisfies the AC.
3. (Optional) Add a brief "Safe-failure modes" block: web-access unavailable, ambiguous user residency / age / contract type, regime change mid-question.
4. (Optional) Spot-check per-domain reference files for AC4 compliance and tighten any place a numeric threshold lacks a date stamp.
5. Run the standard verification gates (`yaml.safe_load`, `grep simon-productivity`, asset-path escape check).
6. Open PR titled `PR8: portuguese-tax-and-benefits Cavekit migration`.

Expected diff: +25 to +60 lines, single file (`skills/portuguese-tax-and-benefits/SKILL.md`). One follow-up PR if the per-domain reference-file AC4 spot-check surfaces drift — keep that as a separate sweep.

## 6. Open observations for the next kit revision pass

Non-blocking observations recorded for whenever Cavekit kits get a refresh:

- The kit classifies portuguese-tax-and-benefits as background-skills R3, but the invocation mode in the kit prose says "user-invocable on a PT-tax trigger" — i.e. user-invocable, not Claude-only. This is the **only background-skills entry that is not Claude-only**. The kit's domain index (`cavekit-overview.md`) names "background-skills" as "background-context skills" without distinguishing the invocation-mode split. Consider either (a) splitting R3 out into its own kit (`cavekit-domain-skills.md` or similar) or (b) renaming the kit to clarify that "background" means "documents domain conventions" rather than "Claude-only invocation".
- The kit's R3 ACC3 ("primary sources ahead of secondary commentary") is human-verifiable but not automatable. Worth recording the AT / DRE URL prefix list in the kit so a CI grep could enforce it.

## 7. References used by this triage

- `skills/portuguese-tax-and-benefits/SKILL.md` (full read)
- `skills/portuguese-tax-and-benefits/assets/answer-template.md` (heading-string check)
- `skills/portuguese-tax-and-benefits/references/sources.md` (citation-order + refresh-log check)
- `context/kits/cavekit-background-skills.md` R3 (full read)
- `context/kits/cavekit-skill-contract.md` R1, R4 (full read)
- `context/impl/pr4-precedent.md` (the precedent doc shipped in PR #25)
