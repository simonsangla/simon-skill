# Skill: `portuguese-tax-and-benefits`

> Validation notes from real exercise of the skill on 2026-05-12. The skill itself ships in `skills/portuguese-tax-and-benefits/SKILL.md`. This file captures what worked, what didn't, and patterns the skill should evolve toward.

## Context of the exercise

Simon submitted a 5-section "handoff" with calculated subsídio/atividade compliance numbers and asked the next agent to guide him through the Finanças form + W-8BEN. The handoff contained:
- 1 mathematically-right number tied to wrong rule (€767/1 IAS — SS contribution-exemption threshold, not IEFP cumulation cap)
- 1 right number from wrong path (€1.342,83 subsídio cap derived correctly)
- 1 mislabeled mechanism ("autoliquidação IVA" for non-EU service — should be Art. 6.º n.º 6 al. a) CIVA)
- 1 forward-looking claim phrased as confirmed fact ("RNH code 2519.0 active in cadastro" — actually RNH cadastros don't carry HVA codes)

Skill was invoked **before** the next agent could act on any of these. The 6-section answer template caught all 4 errors before they reached production.

## What the skill got right

1. **Sources-first rule prevented hallucination on changing numbers.** IAS 2026 (€537,13), subsídio máximo (€1.342,83), Art. 53.º CIVA threshold (€15.000) — every figure was looked up against official PT sources (Portaria 480-A/2025/1, DL 9/2025, etc.) rather than recalled. WebSearch was sufficient for most; PDF was needed for Portaria 230/2019.

2. **"Never invent" forced a flag instead of a guess.** The DL 220/2006 Art. 59.º formula `(prestação × 1,35) − rend. rel.` was confirmed via OCC/DataLABOR sources before being applied. Without that discipline the agent would have proposed a plausible-looking but wrong formula.

3. **Clarifying-questions discipline mostly held.** The skill demanded residency status, age, contract type, regime simplificado / contabilidade organizada before answering. RNH status was the pivot that determined the 20% rate question — getting that wrong would have changed the answer materially.

4. **6-section template caught the error class.** Facts / Analysis / Risks / Actions / Documents / Sources — putting "Risks" mandatory forced the agent to surface the razor-thin €12,83 margin instead of letting the handoff's optimistic framing through.

5. **Cross-domain dispatch worked.** A handoff that spans IRS (RNH Cat. B), IEFP (cumulação), Seg Social (isenção 12m), and cross-border (Mercor US, W-8BEN, CIVA Art. 6.º) was routed to all four references and the cross-domain interactions were called out.

## What didn't work / pinch points

1. **PDF fetch via WebFetch failed three times** (Portaria 230/2019 from dre.pt, info.portaldasfinancas, carlospintodeabreu mirror). All three returned "Binary content cannot be parsed." This is a hard limit on official-source verification when the only public version of a diploma is PDF. **Workaround:** secondary citations (apcmc.pt) gave the structure, then user provided the actual document later via Drive. **Skill improvement candidate:** add a note in `sources.md` that PDF diplomas from `info.portaldasfinancas` may need Drive-asset fallback for confirmation.

2. **Drive evidence integration wasn't in the original workflow.** The user's compliance file lives in `~/Library/CloudStorage/GoogleDrive-simonsangla@gmail.com/My Drive/02_Tax_PT/` and `IRS_Dossier_2025_Simon_Sangla/`. The skill's clarifying-questions list should explicitly prompt "do you have a Drive-archived deferimento / payslip / termination doc I can read directly?" The skill currently asks for facts; it should also ask for primary docs when they exist.

3. **CAE-Rev.4 (DL 9/2025) is a 2025 platform shift** the skill doesn't yet flag in its calendar rule. Old CAE-Rev.3 codes (62020, 62010) happen to map cleanly, but any answer that lists a CAE code should cross-check Rev.4. **Skill improvement:** add CAE-Rev.4 awareness to `references/iefp-seg-social.md` and `references/cross-border.md`.

4. **W-8BEN treaty article specifically:** the skill correctly directed to "Portugal-US treaty" but didn't preload the article numbers (7 Business Profits / 14 Independent Personal Services). Required separate reasoning. **Skill improvement:** add a W-8BEN cheat-sheet asset under `assets/` (treaty article numbers per income type, line-by-line for individuals from PT).

5. **Razor-thin margin was caught as a Risk but not modeled as a calculation.** The €12,83 buffer was flagged narratively; a more rigorous output would have a buffer-sensitivity table (target brut vs. residual buffer vs. parcial subsídio). **Skill improvement:** consider adding a "sensitivity table" sub-pattern when monthly billing approaches a hard cap.

## Common conflations the skill should pre-empt

1. **€767/1 IAS rendimento relevante** ≠ subsídio cumulation cap. The €767 rule is **Art. 168.º CRC** (SS isenção contributiva for those with concurrent dependent work); the cumulation cap is **DL 220/2006 Art. 59.º** (= valor mensal do subsídio). Different rule families, same family of "low-income thresholds for independents." Easy to mix up if recalled from memory.

2. **0,70 (SS rendimento relevante coef.) ≠ 0,75 (IRS Cat. B simplificado coef.).** Both apply to "services" but in different mechanics. SS uses 0,70 to compute the contribution base; IRS uses 0,75 for taxable rendimento líquido under regime simplificado. Anyone quoting "70% of bruto" needs disambiguation.

3. **"Autoliquidação"** is reverse-charge — applies to **intra-EU** acquisitions or specific PT operations. Services to a non-EU client are **non-tributable in PT** (CIVA Art. 6.º n.º 6 al. a)), NOT autoliquidação. The mechanic and the invoice wording differ.

4. **RNH cadastro does NOT inscribe an HVA code.** The Deferimento RNH (IRNH document) only sets period (10 years) and country of provenance. The HVA code is declared yearly in **Anexo L do Modelo 3 IRS**. Any answer that says "your RNH file at AT has code X" is wrong — the file has no code.

5. **NHR vs. IFICI is a different regime, not the new name.** NHR closed to new entrants on 2024-01-01. IFICI (Lei OE 2024) is a partial-coverage successor with narrower HVA scope. Beneficiaries inscribed before 2024 stay on NHR full 10 years. Don't equate the two.

## Patterns that should land in the skill itself

When the next agent updates `skills/portuguese-tax-and-benefits/SKILL.md`:

- [ ] Add the 5 conflations above to a "Common conflations to pre-empt" section near `references/sources.md`.
- [ ] Add a Drive-evidence intake question to `references/clarifying-questions.md`: "do you have the Deferimento RNH / Work Certificate / Declaração de Desemprego archived? Paths help."
- [ ] Add CAE-Rev.4 awareness to `references/iefp-seg-social.md` and `references/cross-border.md`.
- [ ] Add a W-8BEN cheat-sheet asset under `assets/` with PT-US treaty article mapping.
- [ ] Consider adding `assets/buffer-sensitivity-template.md` for the razor-margin pattern.

These would each merit a separate PR (small, focused, testable). Hygiene-checklist add candidate: phishing/factual claims must cite source date, not domain folk-analysis (lesson surfaced in session 2 PR #20 review, but also relevant here — the skill should re-verify dates on Portarias yearly).

## How to apply

When working in this repo on the `portuguese-tax-and-benefits` skill — read this file first. When dispatched to *use* the skill on a Simon question — also read this file (it documents what's already been validated and the live-fire conflations). The validated rules cache at `~/projects/memory/projects/mercor_atividade.md` is the production reference for Simon's specific compliance file.

## Last update

2026-05-12 — captured after first real session use of the skill on Mercor onboarding decision.