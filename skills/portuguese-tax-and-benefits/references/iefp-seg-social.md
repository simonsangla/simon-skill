# IEFP and Segurança Social — unemployment, active employment, and benefits

The Portuguese employment-support system has two agencies whose paths cross constantly:

- **IEFP — Instituto do Emprego e Formação Profissional** runs *active* labour-market policies: job placement, training, apprenticeships, business-creation support, and the operational side of *registo como desempregado* (registration as unemployed).
- **Segurança Social** runs the *passive* side: contributory benefits (subsídio de desemprego), non-contributory benefits (RSI, subsídio social de desemprego), and contribution collection.

Both agencies must agree, in different ways, on the user's status before benefits flow. The split is structural — IEFP controls *availability for work* (without which the benefit is suspended), Seg Social controls *contribution history and payment*. A user who is "registered at IEFP" but whose declarações de disponibilidade lapse will see the benefit suspended even if Seg Social has nothing else to complain about.

> **Read this file when** the user mentions IEFP, Segurança Social, Seg Social, subsídio de desemprego, subsídio de desemprego parcial, subsídio social de desemprego, RP 5044 / GD 63 / RP 5059, declaração de situação de desemprego, criação do próprio emprego / ACPE, atividade aberta enquanto desempregado, desemprego involuntário, RSI, prestações sociais, declaração mensal de disponibilidade, emprego conveniente, plano pessoal de emprego (PPE), majoração do subsídio, or anything about combining freelance / business activity with unemployment benefits.

> **Self-employed Segurança Social contributions** (taxa contributiva 21,4%, escalões trimestrais, isenção primeiros 12 meses, pluriactividade) are now covered in `references/self-employed-seg-social.md`. Read both files when the question crosses the boundary.

---

## 0. The structural pivot — IAS and salário mínimo

Almost every threshold in this system is expressed as a multiple of the **Indexante dos Apoios Sociais (IAS)**, set annually by the OE or a stand-alone Portaria. Several reference values are also tied to the **Salário Mínimo Nacional / Retribuição Mínima Mensal Garantida (RMMG)**.

Current figures (verify on Diário da República before citing):

| Reference | 2026 | 2025 | Source |
|---|---|---|---|
| **IAS** | **€537,13** | €522,50 | **Portaria n.º 480-A/2025/1, de 30 de dezembro** |
| **RMMG / SMN Continente** | **€920** | €870 | **Decreto-Lei n.º 139/2025, de 29 de dezembro** |
| RMMG Açores | €966 | €913,50 | Regional diploma |
| RMMG Madeira | €968 | €915 | Regional diploma |
| **Mínimo de existência IRS** | €12 880 | €12 180 | Art. 70.º CIRS (linked to RMMG anual × 14 vs. 1,5 × 14 × IAS, the higher) |

Derived figures used everywhere in this file (2026):

- **1 × IAS** = €537,13 — *floor of subsídio de desemprego when reference remuneration < SMN*.
- **1,15 × IAS** = €617,70 — *floor of subsídio de desemprego when reference remuneration ≥ SMN*.
- **2,5 × IAS** = **€1 342,83** — *monthly ceiling of subsídio de desemprego (the benefit itself, not a compatibility threshold)*.
- **4 × IAS** = €2 148,52 — *threshold for pluriactividade dispensa contributiva (see `self-employed-seg-social.md` §4)*.
- **8 × IAS** = **€4 297,04** — *cap on the contribution-equivalent registration ceiling when on Subsídio Parcial (see §3)*.
- **12 × IAS** = €6 445,56 — *monthly ceiling for self-employed contribution base*.
- **80% × IAS** = **€429,70** — *household per-capita income threshold for access to Subsídio Social de Desemprego*.
- **240 × IAS** = **€128 911,20** — *patrimony cap (mobiliário) for access to Subsídio Social de Desemprego*.
- **55 × IAS** = €29 542,15 — *annual IRS Jovem income exemption ceiling (see `irs.md` §8)*.

> **Never quote a euro figure from memory.** Pull the current IAS from Diário da República or Seg Social, then apply the multiple.

---

## 1. Subsídio de desemprego — contributory unemployment benefit

Governed by **Decreto-Lei n.º 220/2006, de 3 de novembro** (the *Regime Geral de Proteção no Desemprego dos Trabalhadores por Conta de Outrem*), repeatedly amended. Run by Segurança Social.

### Eligibility (cumulative)
1. **Desemprego involuntário**. Termination by employer (excluding for just cause attributable to the worker), end of fixed-term contract not renewed by employer, mutual revocation in conditions accepted by Seg Social, dismissal during probationary period in certain conditions, resignation with just cause from the worker's side under restrictive conditions (e.g., back-pay arrears, documented harassment, domestic-violence victim status with formal protective procedure). **Voluntary resignation generally disqualifies**, with narrow exceptions only.
2. **Prazo de garantia (contribution record)**: at least **360 days of registered remunerated work** as a Categoria A employee (Regime Geral dos Trabalhadores por Conta de Outrem) within the **24 months prior** to unemployment. Verify the current rule in DL 220/2006 consolidated — the window has been adjusted in OEs.
3. **Registration as job-seeker at IEFP** within the deadline (typically 90 days from unemployment), with active *plano pessoal de emprego (PPE)*.
4. **Capacity and availability for work** — the user must accept *convocatórias* (job-search interviews, training, employer referrals) within IEFP's program and must not be on incompatible benefits.
5. **No accumulation with incompatible income or status** — see §4.

### Amount
- Computed from the **remuneração de referência (RR)** — average of the **first 12 months of remunerações within the 14 months prior to unemployment** (Art. 28.º DL 220/2006).
- Daily benefit = **65% × RR / 30**.
- **Monthly floor**: 1 × IAS in the general case; **1,15 × IAS = €617,70 in 2026** when the RR is at least the SMN.
- **Monthly ceiling**: **2,5 × IAS = €1 342,83 in 2026** — this is the **maximum the benefit can ever pay** in a given month, *not* the threshold for compatibility with other income. Statutory source: Art. 28.º n.º 2 DL 220/2006.
- After a fixed initial period (typically 180 days), the benefit may be reduced by a percentage of the original amount (**degressividade**, Art. 28.º-A DL 220/2006) — verify the current text.
- Paid monthly; the 13th/14th-month proportionality applies.

> **The 2,5×IAS / €1 342,83 figure caps the benefit itself, NOT a "you can earn up to this much elsewhere without losing the benefit" threshold.** This distinction is the single most common confusion users bring to the system. The compatibility-with-other-income test is structured differently — see §3.

### Majoração — top-up when both spouses on benefit or dependents present
Under DL 220/2006 and the *Lei de Apoio à Família*, the monthly amount can be increased by **10%** when:
- Both spouses / unidos de facto are simultaneously receiving subsídio de desemprego (with dependents present); **or**
- The claimant is a single parent with dependents.

Form: **Requerimento de Majoração — RP 5059/2025** (Seg Social). Lists household composition (up to 12 members with NISS / NIF / birth / relationship). Filed via SSD preferentially.

### Subsídio de desemprego para trabalhadores independentes
A narrow, residual benefit available to **trabalhadores independentes economicamente dependentes** (TI invoicing >50% of receipts to a single entidade contratante) who lose the dependence relationship in qualifying circumstances. Restrictive. The general TI regime does **not** give access to ordinary subsídio de desemprego — see `self-employed-seg-social.md` §9.

### Duration
A schedule based on **age at unemployment** and **contribution history in the 8 years before unemployment**. The table runs from a minimum (e.g., 150 days for the youngest with the shortest history) to a maximum (e.g., 540 days for the oldest with the longest history, with per-additional-5-years-of-contribution add-ons for older claimants). Verify exact durations on DL 220/2006.

### Subsídio Social de Desemprego (SSD)
Means-tested. Two variants:
- **Inicial**: where the claimant does **not** meet the contributory prazo de garantia (no 360-day history) but **has at least 180 days of work in the last 12 months** and meets household-income / patrimony limits.
- **Subsequente**: kicks in when the contributory subsídio exhausts, subject to the same means.

**2026 means tests** (verify on Seg Social):
- **Rendimento per capita mensal do agregado familiar** must not exceed **80% × IAS = €429,70**.
- **Património mobiliário do agregado** must not exceed **240 × IAS = €128 911,20**.

The agregado-familiar income calculation uses the **capitação** rule from the *Lei de Condição de Recursos*:

| Member | Pondering |
|---|---|
| Requerente (the applicant) | 1 |
| Each adult ≥ 18 in the agregado | 0,7 |
| Each minor < 18 in the agregado | 0,5 |

Rendimento de referência per capita = total monthly income of agregado ÷ sum of ponderings.

**Worked example** (single-earner family of four: applicant mother, working father €1 000/mo, two minor children):
- Total monthly bruto: €1 000.
- Pondering total: 1 + 0,7 + (2 × 0,5) = 2,7.
- Per-capita reference: 1 000 / 2,7 = **€370,37**.
- 370,37 < 429,70 → **passes the SSD income test** for 2026.

> **Empirical edge case from the SSD simulator**: a person already on Subsídio Social de Desemprego who attempts a simulation for further benefits (e.g., parcial) often returns **€0 / month** regardless of the new part-time income figures. The simulator's logic treats SSD as a terminal state — the result does not mean the user is ineligible *in principle*, only that the simulator does not enumerate cumulation paths from SSD. **Always cross-check by reading the situation against the Guia Prático Subsídio de Desemprego Parcial** rather than trusting the SPS 5/2025 simulator output as authoritative.

---

## 2. The 24 termination codes — Declaração de Situação de Desemprego RP 5044

This is the **single most important form** in the unemployment workflow. The employer must issue it within **5 working days** of the worker's request (Art. 43.º DL 220/2006); if the employer refuses or is unable, the **Autoridade para as Condições do Trabalho (ACT)** can certify the termination on the form's Section 5.

The termination motive code on the RP 5044 determines whether the unemployment is **involuntary** for the purposes of Subsídio de Desemprego — most codes qualify, but the worker-initiative ones (resignation without just cause, voluntary probation-period termination) **do not**.

### Section 3.1 — Initiative of the employer (codes 1–6)
| # | Description | Qualifies for subsídio? |
|---|---|---|
| 1 | Justa causa de despedimento por facto imputável ao trabalhador | **No** (worker's fault) |
| 2 | Despedimento coletivo | Yes |
| 3 | Despedimento por extinção do posto de trabalho | Yes |
| 4 | Denúncia do contrato no período experimental (employer initiative) | Yes — subject to specific Seg Social conditions |
| 5 | Despedimento por inadaptação superveniente ao posto de trabalho | Yes |
| 6 | Cessação da comissão de serviço ou situação equiparada, sem contrato de trabalho subsistente | Yes — case-specific |

### Section 3.2 — Initiative of the worker (codes 7–10)
| # | Description | Qualifies? |
|---|---|---|
| 7 | Resolução com justa causa | Yes — but "justa causa" must be documented |
| 8 | Resolução com justa causa por retribuições em mora (salários em atraso) | Yes |
| 9 | Denúncia do contrato / demissão | **No** (voluntary) |
| 10 | Denúncia do contrato no período experimental (worker initiative) | **No** (voluntary) |

### Section 3.3 — Revogação por acordo (codes 11–17)
Mutual revocations linked to corporate distress / restructuring; most qualify for subsídio under their specific legal frameworks:
| # | Description |
|---|---|
| 11 | Acordo por empresa em recuperação (CIRE) ou conciliação extrajudicial |
| 12 | Acordo com redução de efetivos por situação económica difícil (DL 353-H/1977) |
| 13 | Acordo com redução de efetivos por reestruturação setorial (diploma próprio) |
| 14 | Acordo com redução de efetivos por reestruturação (despacho do membro do Governo) |
| 15 | Acordo fundamentado em motivo que permita despedimento coletivo ou extinção (with quota limits per DL 220/2006) |
| 16 | Acordo sem redução do nível de emprego, com vista a reforço de qualificação/capacidade técnica |
| 17 | Acordo não previsto nos pontos 11–16 |

> Codes 11–17 typically qualify but **only within annual quota limits** set per company size. The form requires identifying the specific legal basis (case number, applicable diploma, despacho number).

### Section 3.4 — Caducidade do contrato (codes 18–24)
| # | Description | Qualifies? |
|---|---|---|
| 18 | Fim do contrato a termo | Yes |
| 19 | Cessação do contrato de militar (renewal not granted for reasons not imputable) | Yes |
| 20 | Despedimento pelo administrador da insolvência | Yes |
| 21 | Morte do empregador, dissolução / encerramento da empresa | Yes |
| 22 | Impossibilidade superveniente, absoluta e definitiva | Yes |
| 23 | Reforma por velhice | **No** (retiree, not unemployed) |
| 24 | Reforma por invalidez | **No** (invalidity pensioner) |

### Section 5 — ACT certification (employer refusal path)
When the employer refuses or is unable to issue the RP 5044, the worker can request that **ACT** (the labour inspectorate) certify the termination. The form's Section 5 has two pre-printed motives:
- *O empregador não cumpriu as formalidades previstas no Código do Trabalho*.
- *Outro motivo* (free-text).

This path is slower but unblocks the subsídio application. Flag it to a user whose former employer is refusing to sign.

---

## 3. Subsídio de Desemprego Parcial — partial benefit while working part-time

The most operationally complex part of the regime. A claimant may start **part-time employment (CTSP or CTSD with reduced schedule)** *or* **trabalho independente** (recibos verdes) and retain a **partial benefit** computed by formula. Authoritative source: **Seg Social Guia Prático 6002 — Subsídio de Desemprego Parcial** (current version v4.41, publicada 14 de maio de 2025; verify any newer revision before answering).

### Eligibility — two configurations
**A. At date of unemployment, already accumulating** part-time CCO or independent activity with the main job from which the claimant was dismissed:
- Must meet the regular subsídio eligibility (involuntariness, prazo de garantia, etc.).
- The salário / rendimento relevante from the part-time / independent activity must be **less than the subsídio de desemprego value**.

**B. Starts the part-time / independent activity while already receiving subsídio**:
- Must be currently receiving subsídio (not exhausted, not suspended).
- The salário / rendimento relevante must be **less than the subsídio value**.

In both configurations:
- **Cannot work for the employer that dismissed the claimant**, nor any company in the same group or with a domain-relationship to it.
- For independent activity: the **rendimento relevante** is computed as **70% of services rendered** or **20% of merchandise sales / hotelaria-restauração-bebidas**, divided by 12 — same coefficients as for Seg Social contributions but **annualised** and **monthlyised** for the parcial test.
- The regime **excludes**: trabalhadores independentes economicamente dependentes (single-client > 50%), TI with atividade empresarial, gerentes / administradores of pessoas coletivas. They have separate subsídio paths.

### The formula (Seg Social administrative reading)
> **Valor a receber = (Subsídio de Desemprego + 0,35 × Subsídio de Desemprego) − rendimento mensal do trabalho parcial**

Where *rendimento mensal* is:
- **Part-time employee**: gross monthly salary from the part-time contract.
- **Independent**: monthly duodécimo of the annualised rendimento relevante = (annual receipts × 0,70 [services] or × 0,20 [goods/hotelaria]) / 12.

### Three caps / floors
The formula's output is then clamped:

1. **The parcial cannot exceed the full subsídio**. If the formula produces a value > Subsídio, the parcial = Subsídio.
2. **If Subsídio + 35% < SMN**: parcial = Subsídio (i.e., the formula is bypassed and the full subsídio is paid).
3. **If (work income + parcial) < SMN**: parcial = Subsídio (same effect — the system tops the user up to ensure combined income meets the SMN floor).

### Worked examples (using 2026 SMN = €920)

**Example 1 — Part-time employee, formula applies cleanly:**
- Subsídio = €1 000; part-time salário = €500.
- Parcial = (1 000 + 350) − 500 = **€850 / month**.
- Combined: 850 + 500 = 1 350 > SMN → no top-up needed. **Pays €850 parcial**.

**Example 2 — Cap 1 (parcial can't exceed full subsídio):**
- Subsídio = €600; part-time salário = €200.
- Formula: (600 + 210) − 200 = 610.
- 610 > 600 (full subsídio) → **parcial = €600** (capped at full subsídio).

**Example 3 — Cap 2 (subsídio + 35% < SMN):**
- Subsídio = €620; SMN 2026 = €920.
- 620 + 35% = 837 < 920 → **parcial = €620** regardless of part-time income.

**Example 4 — Independent activity:**
- Subsídio = €700; annual services receipts (estimated) = €18 000.
- Rendimento relevante = 0,70 × 18 000 = €12 600 / year = €1 050 / month.
- Formula: (700 + 245) − 1 050 = −105 → **parcial = €0** (and benefit suspended for the month — rendimento exceeds the compatibility ceiling).
- If rendimento were €6 000 / year → 0,70 × 6 000 = 4 200 / 12 = €350 / month → parcial = (700 + 245) − 350 = €595.

### Operational rules
- **90-day filing deadline** from the start of the part-time / independent activity. Filed via SSD (preferred), at a Loja de Cidadão, or by post. If filed within 90 days, the parcial backdates to the activity start. If filed after, parcial starts from the filing date and the worker loses the intervening months.
- **Cannot work for the employer that dismissed the claimant or related companies** — see §1 eligibility.
- **Duration**: parcial is paid as long as the part-time contract / independent activity continues, but **capped at the remaining subsídio entitlement**. Months on parcial consume the entitlement at a partial rate proportional to the reduction.
- **Two remunerations registered for Seg Social** during parcial:
  - The actual part-time salary, AND
  - The **difference between the part-time salary and the original remuneração de referência used for the subsídio**, treated as *equivalência à entrada de contribuições*.
  - The combined registered remuneration is **capped at 8 × IAS = €4 297,04 / month in 2026** (Guia 6002 K, exemplo 2).
- **The parcial period does NOT count toward the prazo de garantia for a new subsídio**. This is a critical structural fact: a year on parcial does not give the worker a fresh 360-day history.

### IRS treatment — non-declarable
**Subsídio de Desemprego Parcial values are NOT to be declared for IRS purposes.** Source: Seg Social Guia Prático 6002 v4.41 K (Perguntas Frequentes). Cross-reference for `irs.md`: parcial values are excluded from Anexo A.

> This is unusual — most Seg Social cash benefits *are* declarable for IRS (with deduction code). The parcial is specifically carved out. Flag this to any user filing IRS in a year they received parcial.

### Suspension (temporary, parcial resumes after)
The parcial is **suspended** during:
- Subsídio por Risco Clínico na Gravidez, por Interrupção da Gravidez, Parental Inicial, ou por Adoção (these substitute).
- Departure from national territory beyond the *dispensa anual* (typically 30 days/year) or beyond authorised medical leave.
- Detention or other liberty-deprivation measures.
- Sickness or maternity periods without right to the specific subsídios above — in this case the worker receives the **full subsídio de desemprego** (not the parcial) for the period.

### Cessação (right ends permanently)
The right ends when:
- Any eligibility condition fails.
- Total entitlement period exhausted.
- The worker becomes a pensão de invalidez beneficiary.
- The worker reaches retirement age **and** has the prazo de garantia for old-age pension.
- False declarations or fraudulent means.
- IEFP registration cancelled for non-compliance (see §5 sanctions).
- **The part-time contract ends** — at this point, to resume the full subsídio:
  - If still within the original subsídio period: update IEFP inscription **and** present a new **RP 5044** for the part-time job termination.
  - If beyond the original period but with **at least 360 days of work in the last 24 months**: can apply for a **new** Subsídio de Desemprego.
  - If no fresh prazo de garantia but **at least 180 days of work in the last 12 months** and the per-capita household income ≤ 80%×IAS: can apply for **Subsídio Social de Desemprego inicial**.
  - If neither: only Subsídio Social de Desemprego *subsequente* if income/patrimony tests are met.
  - For recibos-verdes work: present proof of cessação de atividade at Finanças instead of the RP 5044.

### Accumulation rules
**CAN accumulate with**:
- Occupational risk indemnities and pensions.
- Part-time wage / independent income within the formula above.
- Prestação Social para a Inclusão (PSI).

**CANNOT accumulate with**:
- Other replacement subsídios (Doença, Parental Inicial, Adoção).
- Regular employer payments triggered by the contract termination (severance instalments).
- Retirement pensions (Seg Social or other mandatory regime, including foreign).
- Survivor / relative-invalidity pensions exceeding 1 × IAS.
- Pre-retirement payments from former employer.
- Subsídio de Apoio ao Cuidador Informal Principal.

---

## 4. Self-employment and "atividade aberta" while on full subsídio (not parcial)

This is the highest-risk area for unintended benefit loss. The rules below describe the *structure*; verify thresholds on Seg Social before answering a specific case.

### Baseline rule
**Opening or maintaining atividade at Finanças as a *trabalhador independente* is, by default, incompatible with receiving subsídio de desemprego**, because the unemployed person is supposed to be *available for employment* and not engaged in their own remunerated activity. Receiving income from undeclared activity while on benefit constitutes **fraud** and triggers repayment plus penalties.

### Permitted exceptions
Several narrow channels allow combining activity and benefit, each with its own eligibility test:

1. **Subsídio de Desemprego Parcial** — see §3 above. The most common legitimate path: declare the activity in advance, accept the formula, keep a (reduced) benefit.
2. **Apoio à Criação do Próprio Emprego (ACPE)** — see §5. The benefit is *converted* into a lump-sum / staged payment to capitalise a new business.
3. **Atividade ocasional e de muito baixo valor**: in some interpretations, very small **isolated receipts** (*atos isolados* under AT rules, declared in advance to Seg Social via GD 63 motive 3) may not be treated as incompatible. This is **fact-specific and Seg-Social-discretionary** — do not rely on it without written guidance.
4. **Authorised volunteering / training / academic activity**: not paid activity but must be reported and authorised through the IEFP convocatória system.

### Reporting obligations — the GD 63 alteration motives
**Declaração de Alterações — GD 63/2025**. Filed within **10 working days** of any of these situations (verify against the current diploma — some sources state 5 working days for specific items):

| # | Motive |
|---|---|
| 1 | Início de trabalho por conta de outrem |
| 2 | Início de atividade independente |
| 3 | Prática de ato isolado (period specified) |
| 4 | Frequência em curso de formação profissional (with monthly value) |
| 5 | Detenção em estabelecimento prisional / outra medida privativa de liberdade |
| 6 | Ausência do território nacional |
| 7 | Passagem à situação de reforma ou aposentação |
| 8 | Ausência do território nacional para procurar emprego (Reg. CE 883/2004, documento portátil **U2**) |
| 9 | Alteração do rendimento relevante da atividade independente ou da remuneração do trabalho a tempo parcial, para valor ≥ Subsídio de Desemprego |
| 10 | Alteração do rendimento mensal per capita do agregado familiar para montante > 80%×IAS (para efeitos de Subsídio Social) |
| 11 | Outra situação (free text) |

Channels: SSD (preferred), e-mail via SSD for EACO (Exercício de Atividade por Conta de Outrem), in-person at Loja de Cidadão, or by post to the Centro Distrital.

### What triggers loss of benefit
- Failure to attend a convocatória without justification — **after a prior written warning**, the second unjustified absence is grounds for inscription cancellation.
- Refusing an "*emprego conveniente*" — see §6 for the criteria. Once cancelled, the worker can re-register only **90 consecutive days** after cancellation.
- Refusing / abandoning / being excluded from: vocational training, *trabalho socialmente necessário*, medidas ativas de emprego, or the PPE (Plano Pessoal de Emprego).
- Income exceeding the compatibility ceiling without prior authorisation.
- Opening atividade without filing GD 63.
- Travel abroad beyond the authorised window without notice (the dispensa anual is typically 30 days/year; departure to look for work in another EU country requires the **U2 portable document** under Regulation (EC) 883/2004).
- False declarations.

> **The cost of declaring is administrative; the cost of not declaring can be the entire benefit plus penalties plus criminal referral.** Always file the GD 63 *before* the change in circumstance, not after.

---

## 5. Apoio à Criação do Próprio Emprego (ACPE)

A formal IEFP program through which a recipient of subsídio de desemprego can capitalise their remaining entitlement to start a business or self-employed activity.

### How it works (structure — verify current rules on IEFP)
- Claimant submits a **project / business plan** to IEFP.
- IEFP evaluates technical and financial viability.
- On approval, the remaining benefit is paid either as a **lump sum**, or in **two or three tranches** tied to project milestones (registration, first-year operation).
- The claimant **must register as self-employed at Finanças**, open the activity, and **start contributing to Seg Social** in the appropriate independente regime (see `references/self-employed-seg-social.md`).
- A **claw-back risk** applies if the activity ceases prematurely (typically within a minimum operation window) — partial repayment of the advance may be required.

### Interaction with isenção contributiva inicial
ACPE recipients are typically **not eligible** for the 12-month *isenção contributiva inicial* — Seg Social treats the ACPE drawdown as a substitute. The freelancer starts paying full TI contributions from day one of the new activity. This is a frequently misunderstood point. See `self-employed-seg-social.md` §5.

### Practical implications for someone starting a SaaS / consulting business
- Allows aggregation of remaining benefit weeks into starting capital — useful when the runway is the bottleneck.
- Triggers Seg Social TI contributions immediately, including the minimum ~€114,95 / month (2026).
- IRS Categoria B starts to flow; invoices via Portal das Finanças or certified software.
- IVA (VAT) treatment depends on activity and turnover — see `references/irs.md` §3 on Article 53.º CIVA exemption and `references/cross-border.md` §2 on B2B reverse-charge for foreign clients.

### Other complementary programs
IEFP operates additional programs (Microinvest / Invest+, Empreende XXI, Estágios, Compromisso Emprego Sustentável, hiring incentives) that interact with ACPE. They are project-funded and **subject to budget windows** — verify open calls on iefp.pt.

---

## 6. Emprego conveniente — the criteria that protect the right to refuse

A worker on subsídio de desemprego must accept offers of *emprego conveniente* (suitable employment) from IEFP. Refusing a qualifying offer cancels the inscription and the benefit. Source: Art. 13.º DL 220/2006 and operational doctrine in the Guia Prático Subsídio de Desemprego.

An offer is *conveniente* only when **all** of the following are met:

### Salary
- **At least the SMN** (€920 in 2026 Continente; €966 Açores; €968 Madeira).
- **Gross monthly salary ≥ subsídio + 10%** in the **first 12 months** of the subsídio.
- **Gross monthly salary ≥ subsídio** from the **13th month** onwards.
- **OR** the salary equals/exceeds the claimant's last job's salary (this overrides the formula above — the offer is always conveniente if it matches the prior salary).

### Skills match
- Tasks the worker is able to perform given physical condition, schooling, experience, competences, and vocational training — even if in a different field from the prior job.

### Transport cost
Must satisfy **one** of:
- Public-transport round-trip cost ≤ **10% of gross salary**.
- Transport cost ≤ the prior job's transport cost.
- Transport paid by employer or free transport provided.

### Commute time
Must satisfy:
- Round-trip daily commute ≤ **25%** of the daily working time.
- Reduced to **≤ 20%** if the worker has dependent minor children or caregiver responsibilities.
- **Exception**: if the commute exceeds 25%, the offer is still acceptable if the commute is **shorter than** the prior job's commute.

> If a user reports an IEFP offer they want to refuse, run all four tests *before* the refusal. A defensible refusal (with documented commute / salary / skills mismatch) preserves the benefit; an undefended refusal cancels it and bars re-registration for 90 days.

---

## 7. RSI — Rendimento Social de Inserção

Non-contributory, means-tested minimum income. Separate from subsídio de desemprego — kicks in only when household income (per *capitação*) falls below a percentage-of-IAS threshold and there is no other applicable benefit. Out of scope for most freelance / new-business situations but flag it as a fallback when other paths are exhausted.

The 2026 RSI value per adulto (the reference for the requerente) is **43,5% × IAS = €233,65** (verify against the current RSI Portaria — the percentages cascade for minors and additional adults).

---

## 8. The compatibility gate — what to check before doing anything paid

For a user currently registered as unemployed at IEFP and receiving (or applying for) subsídio de desemprego, here is the gate to run **before** they accept paid work of any kind:

1. **IEFP**: are you still registered, is your *plano pessoal de emprego* current, do you have any pending convocatórias?
2. **AT**: do you have atividade open or closed? Are you about to issue an invoice? Categoria B income is visible to Seg Social via the AT/SS data bridge.
3. **Segurança Social**: are your declarações mensais de disponibilidade up to date? Have you reported any change via GD 63?
4. **Income test**: is the expected payment compatible with the parcial formula in §3? If services receipts annualised exceed (subsídio × 12 / 0,70), parcial = 0 and the benefit is suspended for the month.
5. **Channel**: is the payment one-off / occasional (*ato isolado* — GD 63 motive 3), or recurrent? Recurrent income from a single client may be reclassified as economic dependence and trigger the entidade contratante regime — see `self-employed-seg-social.md` §7.

**Default posture**: any paid activity should be **declared in advance** via SSD (GD 63 motive 1 or 2). The cost of declaring is administrative; the cost of not declaring can be the entire benefit plus penalties plus a criminal referral for fraud above the threshold.

---

## 9. Specific situations to handle carefully

- **Receiving back-pay or severance** from a former employer after benefit started → may be reclassified and trigger partial recovery.
- **Receiving a foreign salary while in PT and registered as unemployed** → triggers compatibility analysis under both the Portuguese ruleset and the relevant EU coordination regulation (**Regulation (EC) 883/2004** if EU/EEA / Switzerland / UK under withdrawal arrangements). The unemployed person registered in PT must generally not be working abroad. To **look for work** in another EU/EEA state while keeping the PT benefit for up to 3 months, request the **U2 portable document** (Reg. 883/2004; declared via GD 63 motive 8).
- **Spouse / household income changes** → only matters for *Subsídio Social* (means-test), not the contributory subsídio, but always triggers a means-test review when one is in flight.
- **Refusing a job offer from IEFP** → run the four-test gate from §6 before declining; declining a qualifying offer is grounds for inscription cancellation and 90-day re-registration bar.
- **Already on Subsídio Social de Desemprego, starting part-time work** → the SSD simulator (SPS 5/2025) often returns €0 regardless of the parcial figures input. This is a simulator artefact, not a substantive ineligibility — read the case against the Guia Prático directly and confirm with a written Pedido de Esclarecimento via SSD.

---

## 10. Forms reference card

| Form | Purpose | Who files | Channel |
|---|---|---|---|
| **RP 5044/2025** | Declaração de Situação de Desemprego (24 termination codes) | Employer (or ACT if employer refuses) | Paper → Loja de Cidadão / Centro Distrital, or upload via SSD |
| **RP 5059/2025** | Requerimento de Majoração do Subsídio de Desemprego (10% top-up) | Worker | SSD (preferred) / paper |
| **GD 63/2025** | Declaração de Alterações (11 motives, including atividade start, U2 portátil, training, travel) | Worker | SSD (preferred) — 10 working days max |
| **MG 14** | Registo / Alteração de IBAN | Worker | SSD |
| **SPS 5/2025** | Simulador de Desemprego (online tool, not a form) | Worker (informational) | SSD — non-binding |

All forms include a *Proteção de Dados* notice; processing happens at **ISS, I.P.** (Continente), **ISSA, I.P.R.A.** (Azores), or **ISSM, IP-RAM** (Madeira). Data are kept "for the period necessary".

---

## 11. Sources

Primary, in this order:
- **Decreto-Lei n.º 220/2006, de 3 de novembro** (consolidated) — *Regime Geral de Proteção no Desemprego dos Trabalhadores por Conta de Outrem*. Diário da República Eletrónico.
- **Portaria n.º 8-B/2007, de 3 de janeiro** (altered by **Portaria n.º 282/2016, de 27 de outubro**) — operational regulation of unemployment protection.
- **Seg Social — Guia Prático Subsídio de Desemprego** and **Guia Prático 6002 Subsídio de Desemprego Parcial** (current revisions on seg-social.pt; check the publication date inside each PDF — the parcial guia was last revised 14 maio 2025 to v4.41).
- **Seg Social — Guia Prático Subsídio Social de Desemprego**.
- **Lei n.º 53-B/2006, de 29 de dezembro** — IAS, rules for annual update.
- **Portaria n.º 480-A/2025/1, de 30 de dezembro** — IAS 2026 fixed at €537,13.
- **Decreto-Lei n.º 139/2025, de 29 de dezembro** — RMMG 2026 fixed at €920.
- **Decreto-Lei n.º 112/2024, de 19 de dezembro** — RMMG 2025 (€870), still relevant for transition cases.
- **IEFP** — programa Apoio à Criação do Próprio Emprego page and the current program suite (Microinvest, Invest+, Empreende XXI).
- **Regulamento (CE) n.º 883/2004** — EU social-security coordination (U2 portable document).

See `references/sources.md` for exact URLs and the protocol for verifying currentness.
