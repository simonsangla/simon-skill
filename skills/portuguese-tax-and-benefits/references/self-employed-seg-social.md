# Self-employed Segurança Social — Trabalhador Independente contribution regime

This file covers the **contribution side** of being a Portuguese self-employed worker (*trabalhador independente* / TI). The IRS side of self-employment (Categoria B, coefficients, regime simplificado) is in `references/irs.md`; the unemployment-benefit side (ACPE, atividade-while-on-subsídio compatibility, parcial logic) is in `references/iefp-seg-social.md`. This file is what you read when the user asks "how much do I have to pay to Seg Social as a freelancer", "do I get the isenção primeiro ano", "what is the declaração trimestral", or "is my US client work part of my base".

> **Read this file when** the user mentions trabalhador independente, recibos verdes, atividade aberta, escalão contributivo, base de incidência, taxa contributiva, declaração trimestral, dispensa contributiva, isenção contributiva inicial, pluriactividade, primeiro ano de atividade, atividade empresarial vs prestação de serviços, contribuição mínima/máxima Segurança Social, MOE (membro de órgão estatutário), or any question about how much a freelancer pays to Seg Social per month and how that figure is computed.

---

## 0. Legal anchor

**Código dos Regimes Contributivos do Sistema Previdencial de Segurança Social** (CRCSPSS, usually called *Código Contributivo*), approved by **Lei n.º 110/2009, de 16 de setembro**, with consolidated text on Diário da República Eletrónico. The articles that matter most for freelancers:

| Article | What it governs |
|---|---|
| **Art. 132.º a 162.º CRCSPSS** | Section dedicated to *trabalhadores independentes*: scope, enrolment, contribution base, rate, declaration, exemptions. |
| **Art. 151.º CRCSPSS** | Taxa contributiva (rate). |
| **Art. 162.º CRCSPSS** | Rendimento relevante — the coefficient applied to gross receipts to derive the contribution base (70% for services, 20% for sale of goods / hotelaria / restauração / bebidas). |
| **Art. 157.º CRCSPSS** | Isenção contributiva inicial (12-month grace at the start of activity). |
| **Art. 158.º CRCSPSS** | Dispensa contributiva by pluriactividade. |
| **Art. 168.º CRCSPSS** | Membros de órgãos estatutários (MOE) — partial overlap with the TI regime; different base rules. |
| **Decreto Regulamentar n.º 6/2018, de 2 de julho** | Operational regulation of CRCSPSS (still in force, consolidated). |

Operational source for figures and forms: **Segurança Social — Guia Prático Trabalhadores Independentes**, plus the Segurança Social Direta (SSD) portal area for declaração trimestral.

> Never quote a rate, base, or threshold from memory — pull the current value from the CRCSPSS consolidated, the Seg Social guia prático, or the OE / Portaria fixing the IAS.

---

## 1. Who is in this regime

The TI regime covers natural persons receiving income that, under IRS, falls in **Categoria B** — *trabalho independente* (prestação de serviços listed in art. 151.º CIRS), *atividade empresarial* (commerce / industry / hotelaria / restauração / bebidas / sale of goods), and certain isolated acts above a threshold. Specifically:

- **Prestadores de serviços** (consulting, software development, design, freelance professionals listed in art. 151.º CIRS, all "outros prestadores de serviços").
- **Trabalhadores empresariais** with *atividade comercial / industrial*.
- **Produtores agrícolas** (separate sub-regime with its own coefficient).
- **Sócios-gerentes / administradores** of companies — see §6 on MOE: similar but not identical.
- **Cônjuge / membro de união de facto** of TI when working in the activity without an employment contract (separate enrolment).

A TI is enrolled in Seg Social via the *Início de Atividade* declared at AT — AT communicates the start of activity to Seg Social, which opens the inscription. The first month with effective contribution obligation depends on whether the *isenção inicial* (§5) applies.

> **Pluriactividade is common and changes the answer.** If the user is also employee (CTSD/CTSP) — i.e., already contributing in the Regime Geral dos Trabalhadores por Conta de Outrem — read §4 carefully before quoting a number.

---

## 2. Contribution base — how the figure is computed

The base is **not** "what you invoiced this month". It is a quarterly-derived figure based on a **rendimento relevante**, capped on both ends.

### Step 1 — Rendimento relevante (Art. 162.º CRCSPSS)
A coefficient applied to gross receipts of the previous quarter:

- **70% × gross receipts from prestação de serviços** (services).
- **20% × gross receipts from sale of goods, hotelaria, restauração, e bebidas**.
- Mixed activity (services + sale of goods) — coefficients applied separately to each stream and summed.

### Step 2 — Reference period
The base used in a given month is anchored to the **declaração trimestral** filed in the previous quarter for the quarter before that. Operationally, the SSD shows the *base contributiva* the system will use for each month of the upcoming quarter, derived from the trailing quarter's receipts. The TI can choose, in each declaração, a base from **1/12 below to 25% above** the system-computed base, in 5-percentage-point steps — a manual adjustment lever (see Art. 163.º CRCSPSS).

### Step 3 — Monthly base ceiling and floor (Art. 163.º CRCSPSS)
The monthly base is bracketed:
- **Floor**: nothing (zero rendimento → zero base → minimum contribution applies only if not exempt).
- **Ceiling**: **12 × IAS** per month (typical statutory ceiling — verify article and current numeric value).
- **Minimum monthly contribution when not exempt**: corresponds to a base of **1 × IAS**, giving **21,4% × 1 IAS** as the minimum amount payable. **In 2026, with IAS = €537,13, this minimum is approximately €114,95 / month.**

### Step 4 — Apply the rate
- **Taxa contributiva — prestadores de serviços / general TI**: **21,4%** of the monthly base (Art. 151.º CRCSPSS).
- **Taxa contributiva — produtores agrícolas e cônjuge**: lower (around 14,6% — verify).
- **Taxa contributiva — empresarial activity**: same 21,4% generally; check sub-regimes for specific cases.

### Worked example — 2026, services-only TI
- Quarter Q1 2026 gross receipts (services): €15 000.
- Rendimento relevante Q1: 0,70 × 15 000 = €10 500.
- Monthly base for Q2 contributions: 10 500 / 3 = €3 500 / month.
- Monthly contribution Q2 (no manual adjustment, no exemption): 21,4% × 3 500 = **€749 / month**.
- Yearly drag: at this run rate, ~€8 988 / year of contribuições.

The TI can request a manual adjustment to lower or raise the base by up to 25% — useful when receipts are seasonal or when the user wants to deliberately bank a higher base for future pension calculations.

---

## 3. The declaração trimestral — operational obligation

**Four times a year**, the TI files a *declaração trimestral* via SSD, declaring the gross receipts of the relevant trimester. Calendar:

| Period declared | Filing window | Source data |
|---|---|---|
| Q4 of prior year (Oct–Dec) | **1 to 31 January** | Receipts billed Oct–Dec |
| Q1 (Jan–Mar) | **1 to 30 April** | Receipts billed Jan–Mar |
| Q2 (Apr–Jun) | **1 to 31 July** | Receipts billed Apr–Jun |
| Q3 (Jul–Sep) | **1 to 31 October** | Receipts billed Jul–Sep |

Verify the exact deadline in the current calendar of obligations on **seg-social.pt** — Seg Social periodically extends specific quarters.

What goes on the declaração:
- Gross receipts split between **services** and **sale of goods / hotelaria-restauração-bebidas** (different coefficients).
- Identification of any economically-dependent client where the TI invoices > 50% of total receipts to a single entity (see §7 on economic dependence).

Result of the filing:
- SSD recomputes the monthly base for the *next* quarter's months.
- The TI can apply the manual adjustment (−1/12 to +25%) at this moment.
- If the TI does not file, Seg Social applies an *officiosa* base (typically punitive — the maximum base) and assesses the contribution accordingly, **plus coima**. Missing the declaração is the most expensive operational mistake a freelancer can make in this regime.

> A "zero-receipts" quarter still requires filing a declaração marking *sem rendimentos*. Silence = officiosa estimation, not zero.

---

## 4. Dispensa contributiva by pluriactividade (Art. 158.º CRCSPSS)

A TI who is **also** an employee in the Regime Geral (Categoria A under another employer) — or who is a pensioner of the Seg Social or another mandatory social-security regime — may be **exempt from making TI contributions** if the rendimento relevante does not exceed certain thresholds.

### Test
- The TI must be **simultaneously** an employee with at least the minimum number of working hours per month under the Regime Geral (typically a fraction of full-time — verify).
- The **rendimento relevante mensal médio** from the TI activity (annual basis) must not exceed **4 × IAS**. In **2026 this threshold is 4 × 537,13 = €2 148,52 / month**, or roughly **€25 782 / year of services receipts at the 70% coefficient = ~€36 832 / year of gross services receipts**. Above this, the exemption falls away for the months that exceed.
- Pensioner / Regime Geral employee status must be **active and continuous** — gaps invalidate the exemption for those months.

### Practical implication
A freelancer who keeps a part-time employee job that triggers Regime Geral contributions, and whose freelance income stays under ~€2 148 / month average (2026), pays **zero** Seg Social on the freelance side. This is a structural planning lever for transitioning between full employment and full freelance.

> The dispensa applies automatically when the conditions are met — there is **no opt-in** — but the TI must still **file the declaração trimestral**. Filing accurately is what proves the threshold compliance.

---

## 5. Isenção contributiva inicial — first 12 months (Art. 157.º CRCSPSS)

A TI who **opens activity** at AT triggers a **12-month exemption** from Seg Social contributions, counting from the month of effective registration in the TI regime, **provided** specific conditions are met:

### Conditions (cumulative)
1. The TI must not have been in the TI regime in the **24 months** prior to the opening of activity (anti-abuse: prevents repeated open-close cycles).
2. The TI must have an enrolment in another mandatory regime — typically Regime Geral (employee) — covering the same period, OR must be otherwise enrolled in a social-protection regime.
3. The activity must be a genuine new activity, not a reconfiguration of an existing one through a related entity.

### What the isenção covers
- Suspends the **obligation** to contribute for 12 months.
- Does **not** suspend the **declaração trimestral** — filing is still required.
- Does **not** automatically extend if the conditions break during the 12 months.

### Counting the 12 months
The 12 months count from the **start of the first calendar month following the registration**. So opening atividade on 15 March 2026 gives an isenção window of April 2026 to March 2027 inclusive (verify against the SSD page for the specific user).

### Interaction with ACPE (Apoio à Criação do Próprio Emprego)
ACPE recipients who use unemployment benefit capital to start a business are typically *not* eligible for the isenção contributiva inicial — Seg Social treats the ACPE drawdown as a substitute for the exemption. See `references/iefp-seg-social.md` §4.

### Interaction with NHR / IFICI
The fiscal regimes operate on income; the isenção contributiva operates on contributions. They are **independent**. A TI under IFICI still pays Seg Social on the same TI-regime rules; IFICI does not exempt contributions.

---

## 6. Membros de órgãos estatutários (MOE) — gerentes, administradores

Sócios-gerentes of unipessoais and managers / administrators of LLCs / SAs are in a **separate sub-regime** of the Código Contributivo (around Art. 168.º), not in the pure TI regime.

Key differences:
- **Contribution base** is the *remuneração efetivamente paga* by the company (statutory minimum: 1×IAS, ceiling: 12×IAS). The 70%-coefficient rule **does not** apply to MOE remuneration — it is computed on the actual gross salary paid by the company.
- **Taxa contributiva**: MOE-and-company split (similar to employer/employee split in Regime Geral) — verify on Código Contributivo Art. 168.º. The combined rate is typically around 34,75% (split 23,75% company / 11% MOE).
- **Pluriactividade**: a sócio-gerente who is *also* a TI on the side has both enrolments active; the dispensa rules above interact with the MOE income for the threshold test.

> Common situation: a freelancer incorporates a **sociedade unipessoal** to invoice through. The freelancer is now MOE (gerente) of the unipessoal, not a TI. The unipessoal pays the freelancer a gerência remuneration, and the gerência base feeds the MOE contribution at 34,75%. The TI regime no longer applies unless the person keeps a separate atividade aberta in their own name. The IRS side flips from Categoria B to Categoria A (gerência salary) plus dividends / lucros — substantially different tax mechanics. **Get specialist advice before incorporating.**

---

## 7. Economic dependence — the >50%-to-one-client trap

If a TI invoices **more than 50%** of their total annual receipts to a **single client entity**, that client becomes an **entidade contratante** under Art. 140.º CRCSPSS and bears its own **contribution obligation**: typically **7% to 10% of the value paid to the TI** in the prior year, depending on the dependence percentage. The rates and percentages have been revised in recent OEs — verify against the current Código Contributivo article 168.º-D / 168.º-E.

Operational consequence for the TI:
- **The TI does not pay more** — the entidade contratante pays the extra.
- But the TI's status changes for some compatibility tests: a **trabalhador independente economicamente dependente** has access to a separate, narrow form of **subsídio de desemprego para trabalhadores independentes** if the dependence relationship ends in qualifying circumstances. See `references/iefp-seg-social.md` §1.

> US-incorporated marketplaces (Mercor, Outlier, etc.) and consultancies invoicing through a single platform — a US LLC, a single UK client — can trigger the economic-dependence flag silently. The platform is the *entidade contratante* even if domiciled abroad: Seg Social applies the test on receipts irrespective of client jurisdiction. The foreign client may not pay the contribuição da entidade contratante voluntarily, but the TI is still flagged in Seg Social's records as economically dependent, which affects future benefit eligibility tests.

---

## 8. Atividade aberta but no receipts — what to do

A TI with atividade aberta and zero receipts is **not exempt** from the declaração trimestral and is **not automatically exempt** from contributions (the isenção inicial covers only the first 12 months under §5).

### Options
1. **Cessação de atividade** at AT — formally close the activity. Seg Social cuts off the TI regime accordingly. Reopening later restarts a new 12-month isenção window only if the 24-month gap (§5) has been observed.
2. **Continue filing zero-receipts declarações**, accepting that the minimum contribution (€114,95 / month in 2026 — see §2) applies unless pluriactividade or another exemption covers the case.
3. **Suspensão temporária da atividade** — a narrow Seg Social procedure available in specific cases (illness, parental leave, etc.) — request via SSD with justification.

> The most expensive mistake is **forgetting that atividade is open**. The minimum contribution accrues silently; debt builds up; recovery proceedings follow. Always confirm atividade status on Portal das Finanças whenever the user is unsure.

---

## 9. The benefits side — what contributions buy

Contributions to the TI regime give access to:
- **Subsídio de doença** (sickness benefit) after a contribution-history threshold.
- **Subsídio de parentalidade** (parental benefit) — initial and extended.
- **Pensão de velhice** (old-age pension) accruing on the contribution base.
- **Pensão de invalidez** (invalidity pension).
- **Subsídio por morte / pensão de sobrevivência** (death and survivor benefits).
- **Subsídio de desemprego para trabalhadores independentes economicamente dependentes** — only under the restrictive Art. 140.º CRCSPSS dependence test (see §7 and `references/iefp-seg-social.md` §1).

**Subsídio de desemprego ordinário (Regime Geral) is not accessible to a TI on TI contributions alone.** A freelancer who pays the TI regime for 10 years and then loses all their clients has **no subsídio de desemprego** unless they qualify under the economic-dependence path.

This is the single most surprising structural fact about the regime — flag it loudly to anyone considering full-freelance as a long-term path. See cross-domain notes in `references/iefp-seg-social.md` §1.

---

## 10. Cross-references

- **IRS Categoria B side** (regime simplificado vs contabilidade organizada, coefficients, Art. 53.º CIVA, withholding 23% on services from clients with contabilidade organizada): `references/irs.md` §3.
- **Cross-border IVA mechanics** (B2B reverse-charge, place of supply, VIES, declaração recapitulativa): `references/cross-border.md` §2.
- **Foreign-client withholding and treaty mechanics** (W-8BEN, CDTs, Art. 81.º CIRS credit): `references/cross-border.md` §3–§4.
- **Atividade-while-on-subsídio compatibility, ACPE, parcial logic**: `references/iefp-seg-social.md` §§2–4.
- **Property income (Categoria F)** is **not** Categoria B — Seg Social TI contributions do **not** apply to rental income.

---

## 11. Sources

Primary, in this order:
- **CRCSPSS / Código Contributivo** — Lei n.º 110/2009 consolidated on Diário da República Eletrónico.
- **Decreto Regulamentar n.º 6/2018, de 2 de julho** — operational regulation.
- **Seg Social — Guia Prático Trabalhadores Independentes** (current PDF on seg-social.pt; check publication date inside).
- **SSD — Segurança Social Direta** — for the live base, declaração trimestral, isenção status.
- **Portaria fixing IAS** for the year (currently **Portaria n.º 480-A/2025/1, de 30 de dezembro** for IAS 2026 = €537,13).

See `references/sources.md` for the canonical entry URLs and the protocol for verifying currentness.
