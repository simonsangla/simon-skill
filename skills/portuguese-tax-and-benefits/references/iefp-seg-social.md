# IEFP and Segurança Social — unemployment, self-employment, business-creation support

The Portuguese employment-support system has two agencies whose paths cross constantly:

- **IEFP — Instituto do Emprego e Formação Profissional** runs *active* labour-market policies: job placement, training, apprenticeships, business-creation support, and the operational side of *registo como desempregado* (registration as unemployed).
- **Segurança Social** runs the *passive* side: contributory benefits (subsídio de desemprego), non-contributory benefits (RSI, subsídio social de desemprego), and contribution collection for employees, employers, and self-employed (independentes).

Both agencies must agree, in different ways, on the user's status before benefits flow.

> **Read this file when** the user mentions IEFP, Segurança Social, Seg Social, subsídio de desemprego, subsídio parcial, criação do próprio emprego, atividade aberta enquanto desempregado, desemprego involuntário, RSI, prestações sociais, declaração mensal de disponibilidade, isenção contributiva, or anything about combining freelance / business activity with unemployment benefits.

---

## 0. The structural pivot — IAS

Almost every threshold in this system is expressed as a multiple of the **Indexante dos Apoios Sociais (IAS)**, set annually by the OE. Both the unemployment-benefit floor and ceiling, the partial-benefit compatibility ceiling, and several Seg Social contribution thresholds are IAS-multiples. **Never quote a euro figure from memory** — pull the current IAS from Segurança Social or Diário da República, then apply the multiple.

---

## 1. Subsídio de desemprego — contributory unemployment benefit

Governed by **Decreto-Lei n.º 220/2006**, repeatedly amended. Run by Segurança Social.

### Eligibility (cumulative)
1. **Involuntary unemployment**. Termination by employer (excluding for just cause attributable to the worker), end of fixed-term contract not renewed by employer, mutual revocation in conditions accepted by Seg Social, dismissal during probationary period in certain conditions, abandonment with just cause from worker's side under restrictive conditions. **Voluntary resignation generally disqualifies**, with narrow exceptions for objectively justified resignation (e.g., move to follow spouse, harassment cases formally documented).
2. **Contribution record**: a minimum number of days of contributions in employment (Regime Geral dos Trabalhadores por Conta de Outrem) within a reference window prior to unemployment. Historically **360 days in the 24 months prior**; verify the current rule in DL 220/2006 consolidated. Self-employed contributions count under a separate, narrower scheme (subsídio de desemprego para trabalhadores independentes economicamente dependentes — restrictive).
3. **Registration as job-seeker at IEFP** within the deadline (typically 90 days from unemployment).
4. **Capacity and availability for work** — the user must accept "convocatórias" (job-search interviews, training, employer referrals) within IEFP's program.
5. **No accumulation with incompatible income** — see §4.

### Amount
- Computed from the **remuneração de referência (RR)** — average earnings of a reference period (recent past, formula at **Art. 28.º DL 220/2006**).
- Daily benefit = **65% of the RR / 30**, with a floor (typically the value of the IAS) and a **monthly ceiling of 2.5×IAS** — this is the "plafond du subsídio" itself, i.e., the **maximum the benefit can ever pay** in a given month, not the threshold for compatibility with other income. In 2026 (IAS = €537,13) the monthly ceiling is **€1 342,83** (2,5 × 537,13). Temporary uplifts have been added in specific OEs (verify the current year's text). Statutory source: **Art. 28.º n.º 2 DL 220/2006**.
- After a fixed initial period (typically 180 days), the benefit may be reduced by a percentage of the original amount (**degressividade**, **Art. 28.º-A DL 220/2006**), under the current text of the diploma.
- Paid monthly, with the standard 13th/14th-month proportionality applying.

> **The 2.5×IAS / €1 342,83 figure is the cap on the benefit itself, NOT a "you can earn up to this much elsewhere without losing the benefit" threshold.** That distinction is the single most common confusion users bring to the system. The compatibility-with-other-income test is structured differently — see §2 below.

### Duration
A schedule based on **age at unemployment** and **contribution history in the 8 years before unemployment**. The table runs from a minimum (e.g., 150 days for the youngest with the shortest history) to a maximum (e.g., 540 days for the oldest with the longest history, with a per-additional-5-years-of-contribution add-on for older claimants). Verify exact numbers in the current DL 220/2006.

### Subsídio social de desemprego
Means-tested. Either:
- **Inicial**: where the claimant does not meet the contributory thresholds but meets household-income limits.
- **Subsequente**: kicks in when the contributory benefit exhausts, subject to means.

Both are tied to a percentage of IAS, with single-person vs household composition factored in.

---

## 2. Subsídio parcial de desemprego — partial benefit while working part-time

The claimant may start **part-time employment** (CTSP or CTSD with reduced schedule) and retain a **partial benefit** computed by formula. The regime is set out in DL 220/2006; the operative articles in the current consolidated version are typically **Arts. 47.º–49.º** (cumul / acumulação de subsídio com rendimentos de trabalho), with the *formula and reduction logic* at **Art. 48.º** and the *compatibility ceiling* logic at **Art. 49.º**. **Article numbering has shifted across consolidations** — verify against the current "consolidado a" text on DRE before citing a specific article.

### The formula (current Seg Social administrative reading)
> partial benefit = (full benefit × 1,35) − rendimento bruto mensal do trabalho a tempo parcial

with two further constraints:
- The partial benefit cannot exceed the full benefit (it is a reduction, not an uplift, in absolute terms).
- The combined sum (partial benefit + earnings) must respect the cap on cumul defined by the diploma.

The remaining benefit duration is consumed at a rate proportional to the reduction — months where the partial benefit is paid count partially against the total entitlement.

### Plafond du subsídio vs. seuil de compatibilité — do not confuse these

| Concept | What it caps | Statutory source | Reference value in 2026 |
|---|---|---|---|
| **Plafond du subsídio** | Maximum the benefit can pay per month (the benefit cannot exceed this even if RR is high) | Art. 28.º n.º 2 DL 220/2006 | **2,5 × IAS = €1 342,83** |
| **Seuil de cumul / compatibilité** | Maximum combined (benefit + outside earnings) per month under the parcial / acumulação rule | Arts. 47.º–49.º DL 220/2006 (verify article numbering) | **Not a single IAS-multiple** — computed by formula from the user's RR; depends on RR, schedule reduction, and source of income |
| **Compatibility threshold for occasional self-employment (administrative practice)** | Above this monthly income from independent activity, Seg Social may treat the activity as incompatible with availability for work | Not codified in DL 220/2006 — Seg Social discretion, normally an IAS-multiple that **changes across guidance documents and across local offices** | **Confirm in writing with Seg Social for each case** — do not anchor on a fixed figure |

When a user reports a number like "the IEFP guy told me less than €X/month", that number is almost always the third row above — administrative practice, not a codified threshold. **Always require a written confirmation through Segurança Social Direta** (Pedidos / Esclarecimentos) before treating it as binding.

### Self-employment income vs. part-time-employee income — Seg Social applies the parcial logic to both, but…

The diploma was drafted around part-time *employee* contracts. When Seg Social extends parcial-style logic to a benefit recipient earning *independente* income, two things change in practice:
- The reference figure for the deduction is generally the **gross receipts of the period** imputed to the relevant month (not the IRS-coefficient-adjusted figure, not the 70%-of-receipts Seg Social contribution base — see §6).
- Seg Social typically annualises the income (1/12) for some computations and treats it month-by-month for others — the practice is uneven.

This is exactly why the proactive-written-declaration posture in §3 below is the right default: get Seg Social's reading **on your file** in writing **before** invoicing.

This is **distinct** from continuing self-employment activity full-time — see §3.

---

## 3. Self-employment and "atividade aberta" while on benefit

This is the highest-risk area for unintended benefit loss. The rules below describe the *structure*; verify thresholds on Seg Social before answering a specific case.

### Baseline rule
**Opening or maintaining "atividade" at Finanças as a *trabalhador independente* is, by default, incompatible with receiving subsídio de desemprego**, because the unemployed person is supposed to be *available for employment* and not engaged in their own remunerated activity. Receiving income from undeclared activity while on benefit constitutes **fraud** and triggers repayment plus penalties.

### Permitted exceptions
Several narrow channels allow combining activity and benefit, each with its own eligibility test:

1. **Apoio à Criação do Próprio Emprego (ACPE)** — see §4. The benefit is *converted* into a lump-sum / staged payment to capitalise a new business.
2. **Atividade ocasional e de muito baixo valor**: in some interpretations, very small isolated receipts (well below a monthly IAS-multiple) declared in advance to Seg Social may not be treated as incompatible. This is **fact-specific and Seg-Social-discretionary** — do not rely on it without written guidance.
3. **Authorised volunteering / training / academic activity**: not paid activity but must be reported and authorised through IEFP convocatória system.

### Reporting obligations
- **Monthly declaração de disponibilidade** via Segurança Social Direta — confirming availability for work and any income received.
- **Any change in circumstances** (income, residence, household, new activity) must be reported "without undue delay" — Seg Social applies a strict interpretation.
- Failure to declare → benefit suspended, recovery proceedings, possible criminal referral for fraud above thresholds.

### What triggers loss of benefit
- Failure to attend a convocatória without justification.
- Refusing a "*emprego conveniente*" (suitable employment as defined in DL 220/2006).
- Income exceeding the compatibility ceiling without prior authorisation.
- Opening atividade without notifying Seg Social.
- Travel abroad beyond the authorised window without notice.

---

## 4. Apoio à Criação do Próprio Emprego (ACPE)

A formal IEFP program through which a recipient of subsídio de desemprego can capitalise their remaining entitlement to start a business or self-employed activity.

### How it works (structure — verify current rules on IEFP)
- Claimant submits a **project / business plan** to IEFP.
- IEFP evaluates technical and financial viability.
- On approval, the remaining benefit is paid either as a **lump sum**, or in **two or three tranches** tied to project milestones (registration, first-year operation).
- The claimant **must register as self-employed at Finanças**, open the activity, and **start contributing to Seg Social** in the appropriate independente regime.
- A **claw-back risk** applies if the activity ceases prematurely (typically within a minimum operation window) — partial repayment of the advance may be required.

### Practical implications for someone starting a SaaS / consulting business
- Allows aggregation of remaining benefit weeks into starting capital.
- Triggers Seg Social independente contributions immediately (after any *isenção contributiva inicial* window — see §6).
- IRS Categoria B starts to flow; invoices via Portal das Finanças or certified software.
- VAT (IVA) treatment depends on activity and turnover — see `references/irs.md` §3 on Article 53.º CIVA exemption.

### Other complementary programs
IEFP operates additional programs (Microinvest / Invest+, Empreende XXI, support for hiring, internships) that interact with ACPE. They are project-funded and **subject to budget windows** — verify open calls on the IEFP portal.

---

## 5. RSI — Rendimento Social de Inserção

Non-contributory, means-tested minimum income. Separate from subsídio de desemprego — kicks in only when household income (per *capitação*) falls below a percentage-of-IAS threshold and there is no other applicable benefit. Out of scope for most freelance / new-business situations but flag it as a fallback when other paths are exhausted.

---

## 6. Segurança Social contributions for self-employed (independente)

Once activity is open, the user is in the **Regime dos Trabalhadores Independentes**. Key handles:

- **Relevant income** = receipts in the reference quarter, multiplied by an activity coefficient (typically 70% for services, 20% for sale-of-goods — verify Article 162.º Código Contributivo).
- **Contribution base** = relevant income, with floors (a fraction of IAS) and ceilings (a multiple of IAS) per month.
- **Contribution rate** = a single rate applied to the base (around 21.4% historically — verify).
- **Declaração trimestral** in January / April / July / October via Segurança Social Direta — sets the base for the *following* quarter.
- **Isenção contributiva inicial**: the first **12 months** of activity may be exempt from contributions, provided the worker has prior contribution history in another scheme that is still active and that the activity meets specific conditions. The exemption is **not automatic** for everyone — verify against Article 157.º Código Contributivo.
- **Pluriactividade**: when the user is *also* an employee (Categoria A) or beneficiary of another scheme, contributions as independente may be reduced or exempt depending on the income mix.

When the user is **receiving subsídio de desemprego** and **opens activity**, the benefit and the independente contributions become **mutually inconsistent** unless an ACPE path or another permitted exception applies.

---

## 7. The compatibility gate — what to check before doing anything paid

For a user currently registered as unemployed at IEFP and receiving (or applying for) subsídio de desemprego, here is the gate to run **before** they accept paid work of any kind:

1. **IEFP**: are you still registered, is your *plano pessoal de emprego* current, do you have any pending convocatórias?
2. **AT**: do you have atividade open or closed? Are you about to issue an invoice? Categoria B income will be visible to Seg Social.
3. **Segurança Social**: is your declaração mensal de disponibilidade up to date? Have you reported any change?
4. **Income test**: is the expected payment within the compatibility ceiling (an IAS-multiple — verify current value)? Above the ceiling, the benefit is suspended for the month or claw-back applies.
5. **Channel**: is the payment one-off / occasional, or recurrent? Recurrent income from a single client may be reclassified as economic dependence and trigger separate rules.

**Default posture**: any paid activity should be **declared in advance** via Segurança Social Direta. The cost of declaring is administrative; the cost of not declaring can be the entire benefit plus penalties.

---

## 8. Specific situations to handle carefully

- **Receiving back-pay or severance** from a former employer after benefit started → may be reclassified and trigger partial recovery.
- **Receiving a foreign salary while in PT and registered as unemployed** → triggers compatibility analysis under both the Portuguese ruleset and the relevant EU coordination regulation (Reg 883/2004 if EU/EEA). The unemployed person registered in PT must generally not be working abroad.
- **Spouse / household income changes** → only matters for *subsídio social*, not the contributory benefit, but trigger means-test review.
- **Refusing a job offer from IEFP** → check whether the offer met *emprego conveniente* criteria before declining; declining a qualifying offer is grounds for benefit loss.

---

## 9. Sources

Primary, in this order:
- **Decreto-Lei n.º 220/2006** (consolidated) — Diário da República Eletrónico.
- **Código dos Regimes Contributivos do Sistema Previdencial de Segurança Social (Código Contributivo)** — Diário da República Eletrónico.
- **Segurança Social — Guias Práticos** for desemprego, trabalhadores independentes, declaração trimestral.
- **IEFP — programa Apoio à Criação do Próprio Emprego** page and the *Iniciativa Emprego +* / current program suite.

See `references/sources.md` for exact URLs.
