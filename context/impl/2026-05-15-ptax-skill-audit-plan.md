# portuguese-tax-and-benefits Skill Audit Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `skills/portuguese-tax-and-benefits/SKILL.md` into conformance with the `superpowers:writing-skills` standard and restore the safety-critical sections it is missing relative to the installed copy.

**Architecture:** Four sequential edits to a single file. Task 1 fixes the over-limit frontmatter and rewrites the description to a "Use when…" lead (P0 + P1-description). Task 2 replaces the repo-only `## Why this skill exists` section with the real `## Common mistakes` table from the installed copy — this is both the P1 port and the P2 DRY cleanup, because `## Why this skill exists` only restates Common-mistakes rows 1–2. Task 3 ports the `## Fact-gate` section (including the subsídio+atividade hard-rules). Task 4 re-runs every conformance gate and ships the PR.

**Tech Stack:** Markdown skill file; bash verification gates (`sed`, `grep`, `wc`); `git` + `gh` for the PR. No PyYAML in this environment — frontmatter is checked with `sed`/`grep`.

**Deliberate ordering deviation:** The audit listed P2 cleanup last. P2's only real fix is deleting `## Why this skill exists`; since the ported `## Common mistakes` table supersedes that section's content verbatim, Task 2 does the deletion as a *replace* rather than leaving a dead section to remove later. The second P2 finding — the `## Universal output format` block duplicating `assets/answer-template.md` — is **intentionally left as-is**: Cavekit conformance row ACC2 is load-bearing on SKILL.md reproducing those exact headings in-context, and Claude reads SKILL.md (not the asset) at answer time. Task 4 records this disposition.

**Scope:** One file. One branch. One PR. Commit per task.

---

## File Structure

- Modify: `skills/portuguese-tax-and-benefits/SKILL.md` — the only file changed.
- All commands below run from repo root: `/Users/simonsangla/projects/simon-productivity`.

Baseline metrics at plan time (the "failing test" state):

- Frontmatter block (lines 1–4) = **1070 bytes** — over the 1024 spec cap by 46.
- `description` field = 1014 bytes — front-loads *what the skill is*, no "Use when…" lead.
- `grep -c "^## Common mistakes" SKILL.md` = **0** — section absent.
- `grep -c "^## Fact-gate" SKILL.md` = **0** — section absent.
- `grep -c "^## Why this skill exists" SKILL.md` = **1** — repo-only section to be replaced.

---

## Task 1: Fix over-limit frontmatter + rewrite description ("Use when…" lead)

**Files:**
- Modify: `skills/portuguese-tax-and-benefits/SKILL.md:3`

- [ ] **Step 1: Create the working branch**

Run from repo root:

```bash
git checkout main && git pull --ff-only && git checkout -b fix/ptax-skill-audit
```

Expected: on a new branch `fix/ptax-skill-audit` tracking nothing yet.

- [ ] **Step 2: Confirm the frontmatter is over the limit (RED)**

```bash
sed -n '1,4p' skills/portuguese-tax-and-benefits/SKILL.md | wc -c
```

Expected: `1070` (or any value `> 1024`). This is the failing state.

- [ ] **Step 3: Replace the description line**

Edit `skills/portuguese-tax-and-benefits/SKILL.md`. Replace the entire line 3 (the current `description:` line) with exactly this single line:

```
description: Use when Portugal is the jurisdiction and the question touches personal income tax, property tax, or employment-support benefits — IRS (modelo 3, anexos, NHR, RNH, IFICI, IRS Jovem, escalão, retenção, mais-valias), property tax (IMI, AIMI, IMT, IS, IMT Jovem, ARU), IEFP/Segurança Social desemprego (subsídio, parcial, Guia 6002, RP 5044/5059, GD 63, ACPE), or trabalhador independente Seg Social (taxa 21,4%, escalões trimestrais, isenção 12m, pluriactividade, MOE). Other triggers: Finanças, AT, NIF, atividade aberta, recibos verdes, declaração trimestral, jovem comprador — and PT life events with tax/benefit consequences: buying a home, becoming freelancer, moving to PT, losing a job, inheriting property, starting a company while on benefits. Prefer over generic tax/legal answers whenever Portugal is at issue.
```

Leave lines 1, 2, and 4 (`---`, `name: portuguese-tax-and-benefits`, `---`) untouched.

- [ ] **Step 4: Verify the frontmatter is now under the limit (GREEN)**

```bash
sed -n '1,4p' skills/portuguese-tax-and-benefits/SKILL.md | wc -c
```

Expected: a value `<= 1024` (the new description is ~870 bytes; frontmatter total should land near 925).

**Contingency if still `> 1024`:** delete the clause `Other triggers: Finanças, AT, NIF, atividade aberta, recibos verdes, declaração trimestral, jovem comprador — and ` from the description (those terms are already covered by the parenthetical keyword lists), then re-run Step 4.

- [ ] **Step 5: Verify frontmatter keys still intact**

```bash
sed -n '2,3p' skills/portuguese-tax-and-benefits/SKILL.md | grep -oE '^[a-z-]+:'
```

Expected output:
```
name:
description:
```

- [ ] **Step 6: Commit**

```bash
git add skills/portuguese-tax-and-benefits/SKILL.md
git commit -m "$(cat <<'EOF'
fix(skill): trim ptax frontmatter under 1024, lead description with "Use when"

Frontmatter block was 1070 bytes, over the agentskills 1024 cap. Rewrites
the description to the writing-skills "Use when..." trigger form and drops
the duplicate keyword list.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Replace `## Why this skill exists` with the `## Common mistakes` table

**Files:**
- Modify: `skills/portuguese-tax-and-benefits/SKILL.md` — section currently at lines 29–33.

**Why a replace, not an insert:** `## Why this skill exists` says only two things — (1) training-data tax numbers are stale, (2) generic legal-advice theatre is bad. Those are exactly rows 1 and 2 of the `## Common mistakes` table being ported. Keeping both would duplicate content (writing-skills "eliminate redundancy"). The table is the richer, installed-copy form.

- [ ] **Step 1: Confirm the Common-mistakes section is absent (RED)**

```bash
grep -c "^## Common mistakes" skills/portuguese-tax-and-benefits/SKILL.md
grep -c "^## Why this skill exists" skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `0` then `1`.

- [ ] **Step 2: Replace the section**

Edit `skills/portuguese-tax-and-benefits/SKILL.md`. Find this exact block (the `## Why this skill exists` heading and its two paragraphs):

```
## Why this skill exists

LLM training data on Portuguese tax and benefit law is almost certainly stale. Brackets, IAS-indexed thresholds, IMT bands, IRS Jovem percentages, AIMI rates, IRS scale rates, and benefit ceilings change at least annually — usually via the *Orçamento do Estado* (state budget) for the following year, often with mid-year corrections in *Diário da República*. Quoting a remembered number from training is the most dangerous failure mode here. The skill exists to prevent that.

The second failure mode is generic legal-advice theatre — long answers that read as authoritative but never name a source, hedge on everything, and leave the user worse off than a five-minute search on `portaldasfinancas.gov.pt` would. Don't do that either.
```

Replace it with exactly this block:

```
## Common mistakes — do not do these

| Mistake | Why it causes harm | Fix |
|---|---|---|
| **Quoting a remembered number** (rate, bracket, IAS-indexed threshold, IMT band, benefit ceiling) | PT tax values change every *Orçamento do Estado*; often mid-year corrections in *Diário da República* too. User acts on a stale figure. | Look it up from an official source. If unavailable, describe the rule's structure and name exactly which page to check. |
| **Generic legal-advice theatre** — long answer, sounds authoritative, no source named, hedges everything | Leaves user worse off than a five-minute search on `portaldasfinancas.gov.pt`. | Name a source. Name the specific professional and the specific question, or admit you can't verify. |
| **Skipping fact-dependencies** — answering without knowing residency status, age, contract type, property use, contribution history | Many PT rules bifurcate hard on these facts. A correct answer for one profile is wrong for another. | Ask first. See `references/clarifying-questions.md`. |
| **Collapsing the 6-section output** — merging Facts+Analysis, skipping Risks because the answer "feels safe" | Hides assumptions; user can't tell what you verified vs inferred. | Use every section. Risks always contains at least "I could not verify X" and any unresolved fact-dependency. |
| **Citing unofficial blogs as the authority** | Blog numbers may be stale or wrong; user loses the audit trail to the primary source. | Use canonical URLs from `references/sources.md`. Blogs can illustrate, not anchor. |
| **Confusing the pluriactividade SS-exemption ceiling with the subsídio parcial compatibility test** — e.g. stating "rendimento relevante must stay below 1×IAS (≈ €767/mês brut for services)" as the limit for combining independent work with subsídio de desemprego | The 1×IAS / 4×IAS thresholds in Art. 158.º CRCSPSS apply to the SS *contribution-exemption* for a TI who is *also* a Regime Geral employee — entirely unrelated to subsídio parcial. The parcial compatibility test (Art. 59.º DL 220/2006) is simply: **rendimento relevante < user's subsídio value**. For the 2026 cap of €1.342,83, the brut ceiling is ≈ €1.918/mês — 2.5× higher than €767. Applying the wrong threshold causes the user to forgo ~€1.100/mês of legitimate earnings. | Cite both rules and their statutory sources separately. Never cross-apply them. |
```

Do not touch the `## Cavekit conformance` section above it or the `## Core operating principles` section below it.

- [ ] **Step 3: Verify the swap (GREEN)**

```bash
grep -c "^## Common mistakes" skills/portuguese-tax-and-benefits/SKILL.md
grep -c "^## Why this skill exists" skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `1` then `0`.

- [ ] **Step 4: Verify section order is still sane**

```bash
grep -n "^## " skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `## Cavekit conformance`, then `## Common mistakes — do not do these`, then `## Core operating principles`, in that order.

- [ ] **Step 5: Commit**

```bash
git add skills/portuguese-tax-and-benefits/SKILL.md
git commit -m "$(cat <<'EOF'
fix(skill): restore ptax Common-mistakes table, drop redundant rationale section

Replaces the repo-only "## Why this skill exists" section with the
installed copy's "## Common mistakes" table. The old section only
restated table rows 1-2; the table is the canonical, harm-indexed form.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Port the `## Fact-gate — ask before computing` section

**Files:**
- Modify: `skills/portuguese-tax-and-benefits/SKILL.md` — insert between `## Core operating principles` and `## When to use which reference file`.

This restores the missing harm-prevention gate: the BLOCKING/EXPENSIVE/SAFE/REVERSIBLE fact classification, the live-harm lead-with-risk protocol, the worked-example isolation rule, and the five mandatory subsídio+atividade hard-rules.

- [ ] **Step 1: Confirm the Fact-gate section is absent (RED)**

```bash
grep -c "^## Fact-gate" skills/portuguese-tax-and-benefits/SKILL.md
grep -c "Subsídio de Desemprego Parcial" skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `0` then `0`.

- [ ] **Step 2: Insert the section**

Edit `skills/portuguese-tax-and-benefits/SKILL.md`. Find this exact anchor — the end of operating principle 7 followed by the next heading:

```
7. **Conservative tone, no theatre.** Be precise. Skip the boilerplate "consult a qualified professional" filler unless there is a real reason — instead, identify *which kind* of professional and *which specific point* needs verification.

## When to use which reference file
```

Replace it with exactly this (principle 7 unchanged, full Fact-gate section inserted, heading unchanged):

```
7. **Conservative tone, no theatre.** Be precise. Skip the boilerplate "consult a qualified professional" filler unless there is a real reason — instead, identify *which kind* of professional and *which specific point* needs verification.

## Fact-gate — ask before computing

**This gate is mandatory. Do not compute benefits, deadlines, exemptions, contribution amounts, or tax owed unless the required facts are present or explicitly marked as assumptions.**

Before answering any operational question, classify each missing fact:

| Class | Definition | Action |
|---|---|---|
| **BLOCKING** | Answer is wrong or contradictory without this fact | Ask it — do not proceed |
| **EXPENSIVE** | Missing this fact could cause real harm: repayment order, lost benefit, wrong filing | Ask it alongside BLOCKING facts |
| **SAFE** | Nice to have; answer holds either way | Assume and flag the assumption inline |
| **REVERSIBLE** | Answering without it causes at most a minor correction later | Assume and flag |

Ask only BLOCKING and EXPENSIVE facts first. If immediate harm appears possible (user is in an active violation, deadline is live, benefit is at risk today), lead with only:
1. **Risk warning** — what harm is live right now
2. **What not to do** — the one action that makes it worse
3. **Exact missing facts required** — one line each, labelled BLOCKING or EXPENSIVE
4. **Official channel to verify** — portal URL or phone number

Only after receiving those facts — or the user explicitly saying "just assume X" — compute the full answer.

**No illustrative calculations in the main answer while BLOCKING facts are missing.** If a worked example is genuinely useful to show the *structure* of a computation (e.g., the parcial formula, an IRS escalão calculation, an IMT band lookup), isolate it under a sub-section titled exactly:

> ### Example only — not your result

with a one-line caveat: *"These numbers use assumed inputs (listed below). Your actual result depends on the BLOCKING facts above and may differ materially."* List the assumed inputs verbatim before showing the math. Do not place worked examples inside the **Facts**, **Analysis**, **Risks**, or **Actions** sections — those sections must describe rule structure only when BLOCKING facts are missing. Users mentally convert any number on the page into "my number"; isolation is the only mitigation.

### Subsídio de desemprego + atividade independente — hard rules

If the user is receiving subsídio de desemprego **and** mentions or plans self-employed income, **all five of the following must appear in every answer, regardless of how much other detail is requested:**

1. Name **Subsídio de Desemprego Parcial** explicitly — not "reduced benefit" or "a special regime".
2. Name **GD 63 / declaração de alteração de situação** and state the filing window: within **10 working days** of opening atividade.
3. Name the **Subsídio Parcial application deadline**: within **90 days** of starting activity; backdates to start date if filed on time, forfeits intervening months if filed late.
4. Warn that opening atividade **without filing GD 63** — even for a single month — can be treated as non-declaration and trigger **repayment of all benefit received** during the undeclared period, plus coimas.
5. **Never imply the full subsídio continues unchanged.** Always state that the parcial formula must be applied and the application must be filed.

## When to use which reference file
```

- [ ] **Step 3: Verify the section landed (GREEN)**

```bash
grep -c "^## Fact-gate" skills/portuguese-tax-and-benefits/SKILL.md
grep -c "Subsídio de Desemprego Parcial" skills/portuguese-tax-and-benefits/SKILL.md
grep -c "^### Subsídio de desemprego + atividade independente — hard rules" skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `1`, `1`, `1`.

- [ ] **Step 4: Verify section order**

```bash
grep -n "^## " skills/portuguese-tax-and-benefits/SKILL.md
```

Expected order: `## Cavekit conformance` → `## Common mistakes — do not do these` → `## Core operating principles` → `## Fact-gate — ask before computing` → `## When to use which reference file` → `## Workflow for every question` → `## Universal output format` → `## Out of scope` → `## A note on conservatism`.

- [ ] **Step 5: Commit**

```bash
git add skills/portuguese-tax-and-benefits/SKILL.md
git commit -m "$(cat <<'EOF'
fix(skill): restore ptax Fact-gate and subsídio+atividade hard-rules

Ports the BLOCKING/EXPENSIVE/SAFE/REVERSIBLE fact-classification gate,
the live-harm lead-with-risk protocol, the worked-example isolation rule,
and the five mandatory subsídio-parcial hard-rules from the installed copy.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Re-run conformance gates and ship the PR

**Files:**
- No source change. Verification + PR only.

- [ ] **Step 1: Run every Cavekit conformance gate (HANDOFF.md verification set)**

```bash
F=skills/portuguese-tax-and-benefits/SKILL.md
echo "frontmatter bytes:"; sed -n '1,4p' "$F" | wc -c
echo "plugin-name leakage (want 0):"; grep -c "simon-productivity" "$F"
echo "relative/home paths (want empty):"; grep -nE '(\.\./|~/)' "$F"
echo "conformance heading (want 1):"; grep -c "^## Cavekit conformance$" "$F"
echo "anchor phrase (want >=1):"; grep -c "worked instance of" "$F"
```

Expected: frontmatter bytes `<= 1024`; plugin-name leakage `0`; relative/home paths print nothing; conformance heading `1`; anchor phrase `1`.

If any row fails, fix it in `SKILL.md`, amend the most relevant task's commit's intent with a **new** commit (`fix(skill): ...`), and re-run this step.

- [ ] **Step 2: Confirm the P2 answer-template disposition (no change expected)**

The `## Universal output format` block intentionally still duplicates the six headings from `assets/answer-template.md`. This is correct: Cavekit conformance row ACC2 requires SKILL.md to reproduce those exact headings, and Claude has SKILL.md — not the asset — in context at answer time. No edit. This step exists only to record that the duplication was reviewed and kept on purpose.

```bash
grep -c "Do not paraphrase the headings" skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `1` (the block is present and unchanged).

- [ ] **Step 3: Confirm the Cavekit conformance table is still accurate**

The conformance table maps to skill-contract R1/R4 and background-skills R3 ACC1–ACC4. Tasks 1–3 added safety content but changed no AC mapping: R1 still holds (`name`+`description` present), R4 still holds (no `disable-model-invocation`, no `user-invocable: false`), ACC1–ACC4 unchanged. No edit to the conformance table.

```bash
grep -c "^| background-skills | R3 ACC" skills/portuguese-tax-and-benefits/SKILL.md
```

Expected: `4`.

- [ ] **Step 4: Push the branch and open the PR**

```bash
git push -u origin fix/ptax-skill-audit
gh pr create --title "fix(skill): portuguese-tax-and-benefits audit fixes (frontmatter, description, restored safety sections)" --body "$(cat <<'EOF'
## Summary
- Trims the frontmatter block from 1070 to ~925 bytes — under the agentskills 1024-char cap — and rewrites the `description` to the writing-skills "Use when…" trigger form, dropping the duplicate keyword list.
- Restores the `## Common mistakes` table (replacing the redundant repo-only `## Why this skill exists` section, whose content the table supersedes verbatim).
- Restores the `## Fact-gate — ask before computing` section: BLOCKING/EXPENSIVE/SAFE/REVERSIBLE fact classification, live-harm lead-with-risk protocol, worked-example isolation rule, and the five mandatory subsídio+atividade hard-rules.

Brings the repo SKILL.md back to superset parity with the installed copy and into `superpowers:writing-skills` conformance. Cavekit conformance table unchanged — no AC mapping affected.

## Test plan
- [ ] `sed -n '1,4p' skills/portuguese-tax-and-benefits/SKILL.md | wc -c` returns `<= 1024`
- [ ] `grep -c "simon-productivity" skills/portuguese-tax-and-benefits/SKILL.md` returns `0`
- [ ] `grep -nE '(\.\./|~/)' skills/portuguese-tax-and-benefits/SKILL.md` prints nothing
- [ ] `grep -c "^## Cavekit conformance$" skills/portuguese-tax-and-benefits/SKILL.md` returns `1`
- [ ] Section order: Cavekit conformance → Common mistakes → Core operating principles → Fact-gate → When to use which reference file
- [ ] CI green

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 5: Wait for CI, then merge and sync**

```bash
gh pr checks --watch
```

When checks are green:

```bash
gh pr merge --squash --delete-branch
git checkout main && git pull --ff-only
```

Expected: PR merged, `main` fast-forwarded, `fix/ptax-skill-audit` deleted.

---

## Self-Review

**Spec coverage:**
- P0 (frontmatter over 1024) → Task 1, Steps 2–4.
- P1 description rewrite to "Use when…" lead → Task 1, Step 3.
- P1 divergence: port Common-mistakes table → Task 2. Port Fact-gate + subsídio hard-rules → Task 3.
- P2 cleanup: delete redundant `## Why this skill exists` → done by Task 2's replace. Answer-template duplication → reviewed and kept by design, recorded in Task 4 Step 2.
- All four audit findings have a task. No gaps.

**Placeholder scan:** Every code/markdown block contains the literal final content. No "TBD", no "similar to Task N", no "add error handling". The Task 1 contingency names the exact clause to delete. Clear.

**Type consistency:** Section heading strings are used identically across tasks — `## Common mistakes — do not do these`, `## Fact-gate — ask before computing`, `### Subsídio de desemprego + atividade independente — hard rules` — and the Task 3/Task 4 `grep` checks match those exact strings. The anchor block in Task 3 Step 2 reproduces principle 7's text verbatim from the current file. Consistent.
