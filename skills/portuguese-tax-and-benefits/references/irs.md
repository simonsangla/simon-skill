# IRS — Imposto sobre o Rendimento das Pessoas Singulares

Personal income tax. Annual, residency-based, progressive on aggregated income. Governed primarily by the **Código do IRS** (CIRS).

> **Read this file when** the user mentions IRS, modelo 3, anexos, escalões, retenção na fonte, mais-valias, rendimentos prediais, trabalho independente (recibos verdes / atividade aberta), pensões, NHR / RNH / IFICI, IRS Jovem, residência fiscal, or any annual filing question.

---

## 1. Residency — the first question on every IRS matter

Tax treatment turns on residency. Before computing anything, classify the user.

### Resident in Portugal
A person is resident for IRS purposes in a given year if any of the statutory tests in Article 16.º CIRS are met. The two most common pathways:
- More than 183 days (continuous or not) of presence in Portugal in any 12-month period overlapping the year, **or**
- Habitual residence demonstrated by an available dwelling on 31 December suggesting intention to maintain it as habitual residence.

There are additional tests for crew members, public servants abroad, and family-unit-based residency. Verify against the current text of Article 16.º on **Diário da República Eletrónico** before relying on the threshold.

Residents are taxed on worldwide income, subject to double-taxation conventions (CDTs).

### Non-resident
Taxed only on Portuguese-source income, generally at a flat rate per income category (commonly 25% on Categoria A/B, but verify — rates change), with no access to the progressive scale or most personal deductions. A CDT can override.

### Residente Não Habitual (NHR / RNH) — legacy regime
Closed to new entrants from **2024** onwards by **Lei n.º 82/2023, de 29 de dezembro (Orçamento do Estado 2024)**. Transitional provisions allowed late registration for some 2024 movers; the **31 March 2025 transitional deadline has expired** and no further grandfather windows are open. Anyone already enrolled keeps the regime for the remainder of their 10-year window. Do not promise the regime to a new arrival — by 2026 the only NHR beneficiaries are those already inside the 10-year window from a registration completed by 31 March 2025 at the latest.

For taxpayers **already inside the 10-year NHR window**, the **list of "atividades de elevado valor acrescentado"** (high-value-added activities qualifying for the 20% flat rate on PT-source Cat A/B income) is governed by:

- **Portaria n.º 12/2010, de 7 de janeiro** — original list, used CAE / Article 151.º CIRS codes.
- **Portaria n.º 230/2019, de 23 de julho** — replacement list keyed to **Classificação Portuguesa das Profissões (CPP)** codes published by INE. This portaria reorganised activities into ~30 high-level groups, e.g. CPP **2** (Specialists in intellectual and scientific activities), CPP **25** (ICT specialists — including codes like 251 / 2519 for software / IT specialists), CPP **21** (Engineers and engineering professions), etc. **Verify the user's CPP classification against the current portaria text** (DRE) — different roles map to different codes and a few high-value tech roles sit at the edge of the list.

Portaria 230/2019 **remains operative** for existing NHR beneficiaries until the end of their 10-year window — i.e., do not assume the activity-list rules are moot just because the regime is closed to new entrants. For the residual cohort the portaria's coding still matters at every annual filing (Anexo L of Modelo 3).

### IFICI — Incentivo Fiscal à Investigação Científica e Inovação
Successor regime, sometimes informally "NHR 2.0", introduced by Lei 82/2023 (OE 2024) and codified at **Article 58.º-A of the Estatuto dos Benefícios Fiscais (EBF)**. **Fully regulated as of 2025** through the following chain (verify each on Diário da República or AT before relying on a specific clause):

- **Portaria n.º 352/2024/1, de 23 de dezembro** — main regulation: procedure for inscription, list of profissões altamente qualificadas (Anexo I), list of CAE codes for industrial / services entities (Anexo II).
- **Portaria n.º 52-A/2025/1, de 25 de fevereiro** — amends Portaria 352/2024/1 (extended scope of qualifying entities; clarified some highly-qualified-profession requirements).
- **Despacho n.º 2416-A/2025, de 20 de fevereiro** — approves the IFICI inscription model and instructions, formally available on Portal das Finanças.
- **Aviso n.º 4812/2025/2, de 20 de fevereiro** (IAPMEI) — postos de trabalho qualificados and atividades económicas recognised as relevant for the IFICI application by industrial / services entities.
- **Aviso n.º 5309/2025/2, de 25 de fevereiro** (AICEP) — equivalent for entities under AICEP-managed contractual benefits.
- **Ofício Circulado n.º 20276, de 26 de fevereiro de 2025** (AT Subdireção-Geral, Área de Gestão Tributária — IR) — operational interpretation.

**Eligibility**: depends on **the qualifying entity** the taxpayer earns income from — universities and entities integrated in the *Sistema Nacional de Ciência e Tecnologia*, centros de tecnologia e inovação, RFAI / contractual-benefit beneficiaries, **certified Startups under Lei n.º 21/2023, de 25 de maio**, AICEP/IAPMEI-recognised productive-investment companies, ANI-validated R&D activity eligible for SIFIDE, and certain Madeira/Azores qualifying entities. A sole-trader operating in their own name without channelling income through a qualifying entity **does not qualify**, regardless of activity classification.

**Eligible CAE codes for industrial / services entities (Anexo II Portaria 352/2024)** — verified per AT FAQ 5506:
- Indústrias extrativas — divisões 05 a 09
- Indústrias transformadoras — divisões 10 a 33
- Atividades de informação e comunicação — divisões **58 a 63** (this includes most software, data, and tech consulting activities)
- Investigação e desenvolvimento das ciências físicas e naturais — grupo 721
- Ensino superior — subclasse 85420
- Atividades de saúde humana — subclasses 86100 a 86904

The industrial / services entity must also export **at least 50% of its turnover** to qualify.

**Competent entities for verifying activity requirements**:
| Activity profile | Verifying entity |
|---|---|
| Docência e investigação científica (higher-ed, SNCTI) | **FCT** — Fundação para a Ciência e Tecnologia |
| Postos de trabalho em investigação ou inovação, MOE | **Centros de tecnologia e inovação** |
| Postos de trabalho qualificados em entidades com benefícios fiscais contratuais ao investimento produtivo, MOE | **AICEP** |
| Postos de trabalho qualificados em empresas industriais / serviços (CAE acima + exportação ≥50%), MOE | **IAPMEI** |
| Atividades de I&D elegíveis para SIFIDE | **ANI** — Agência Nacional de Inovação |
| Trabalhadores e MOE de start-ups certificadas (Lei 21/2023) | **Startup Portugal** |
| Verificação dos demais requisitos | **AT** |

**Benefit**: **special 20% IRS rate** on Categorias A and B from qualifying activities; foreign-source income generally **exempt** (general rule — pension income / Categoria H is the main exception). 10-year window.

**Registration deadline**: by **15 January of the year following the year of becoming PT tax resident** (Art. 2.º n.º 1 Portaria 352/2024/1). The competent entity must communicate validated inscriptions to AT by 15 February each year; AT makes the inscription status available on Portal das Finanças by 31 March. Each cohort's deadline is rigid; missing it costs the IFICI year, not the entire 10-year benefit.

**No stacking**: IFICI is incompatible with NHR (former or current), Programa Regressar, and IRS Jovem (see §8). The taxpayer chooses one.

Always pull the current text of EBF Art. 58.º-A on DRE and the consolidated Portaria 352/2024 + 52-A/2025 before stating eligibility.

> **What to flag to the user when NHR / IFICI may apply:** date of becoming Portuguese tax resident, prior 5-year residency history outside PT, nature of activity, employer / client location, whether registered with AT under either regime.

---

## 2. Categories of income

IRS aggregates income across categories. Each category has its own determination rules; the result is summed and taxed on the IRS scale (with exceptions — see §4 for special rates).

| Cat. | Source | Typical annex |
|---|---|---|
| **A** | Employment (rendimentos do trabalho dependente) | Anexo A |
| **B** | Self-employment, business, professional services (recibos verdes, atividade aberta) | Anexo B (regime simplificado) or Anexo C (contabilidade organizada) |
| **E** | Capital income (interest, dividends, royalties) | Anexo E |
| **F** | Property rental income (rendimentos prediais) | Anexo F |
| **G** | Capital gains and other increments (mais-valias, indemnizações específicas) | Anexo G or G1 |
| **H** | Pensions | Anexo A (or Anexo J if foreign-sourced) |

Foreign-sourced income of any category is also reported on **Anexo J**.

Other annexes:
- **Anexo D** — imputation of income from transparent entities.
- **Anexo H** — benefits / deductions to be claimed (donations, health, education, housing, etc.).
- **Anexo I** — heritage / undivided estate (herança indivisa).
- **Anexo L** — supplementary statements for IFICI / former NHR claimants.

The Portal das Finanças pre-fills Anexo A and parts of Anexo H from declared withholding and reported receipts; this does **not** discharge the taxpayer's duty to verify.

---

## 3. Categoria B — self-employment, the regime that matters most for freelancers

Two regimes:

### Regime simplificado
- Default for activity below a turnover threshold (verify current ceiling on AT — it is reviewed periodically).
- Taxable income is determined by applying a **coefficient** to gross receipts. The coefficient depends on the type of activity (services, sale of goods, hotelaria, etc.). Common coefficients (verify):
  - Sale of goods / hotelaria / restauração — lower coefficient (more of revenue is treated as costs).
  - Professional services listed in the Article 151.º-CIRS table — higher coefficient.
  - "Other services" — usually the highest coefficient.
- A documented-expenses requirement applies above an activity threshold: a slice of the assumed deductible portion must be backed by actual invoices uploaded to e-Fatura (anti-abuse rule). Verify the current invoice-justification thresholds on AT.
- No need to keep formal accounting books, but invoices must be issued via the Portal das Finanças or certified software.

### Contabilidade organizada
- Mandatory above the turnover ceiling for regime simplificado; optional below it.
- Real expenses deductible; requires a **Contabilista Certificado (CC)** to sign returns.
- Anexo C, not Anexo B.

### Opening / closing activity (atividade)
- "Início de atividade" via Portal das Finanças — Finanças → Cidadãos → Início de Atividade. Define CAE (or list of Article 151.º professional codes), expected turnover, VAT regime.
- "Cessação de atividade" via the same path. The cessation date matters for both IRS (annualisation) and Segurança Social (contribution stop).

### VAT (IVA) interaction
Categoria B activity triggers IVA registration unless covered by:
- **Article 53.º CIVA exemption** (small-scale operators below a turnover threshold — verify the current ceiling, raised in recent budgets), or
- An activity-specific exemption (e.g., medical professions, education).

IVA is out of scope here beyond noting the interaction. See `sources.md` for AT's IVA portal.

### Segurança Social contributions for Categoria B
Separate from IRS. The contribution base is computed on a **rolling quarterly basis** from relevant income (the *declaração trimestral* of receipts), with an activity coefficient applied — **70% for services**, **20% for sale of goods / hotelaria-restauração-bebidas** (Art. 162.º CRCSPSS). The taxa contributiva is **21,4%** of the resulting monthly base; the **minimum monthly contribution in 2026 is ~€114,95** (21,4% × 1 IAS = 21,4% × €537,13). Contributions for the **first 12 months** of activity may be exempt (isenção contributiva inicial, Art. 157.º CRCSPSS) but this interacts with prior contribution history. Pluriactividade dispensa applies when rendimento médio mensal stays below 4×IAS = €2 148,52/mo (2026). See `references/self-employed-seg-social.md` for the full mechanics, escalões trimestrais, MOE regime, and economic-dependence flag.

---

## 4. Special / preferential rates

Some income is taxed at autonomous rates rather than on the progressive scale:
- **Categoria E** (interest, dividends): typically 28% liberatory withholding for residents (with an option to aggregate). Verify rate annually.
- **Categoria F** (rental): typically 25% special rate, with reductions for longer-term lease contracts (the duration-based reductions have been revised multiple times — verify the current schedule on AT). Option to aggregate exists.
- **Categoria G** (mais-valias on securities held under 1 year): may be subject to mandatory aggregation under recent reforms — verify before answering capital-gains questions.
- **Mais-valias imobiliárias** (real estate gains): residents tax 50% of the gain at the IRS scale; non-residents historically faced full inclusion but Court of Justice case law has shifted this — verify current AT guidance.

---

## 5. Progressive scale

IRS scale (escalões) is set in the **annual Orçamento do Estado**. Brackets and marginal rates change every year, sometimes mid-year by corrective diploma. **Never state a current rate from memory.** Pull the current table from AT's "Tabelas Práticas" or the consolidated CIRS on Diário da República before quoting.

### 2026 reference (OE 2026 — Lei n.º 73-A/2025, de 30 de dezembro)
The 2026 scale (income earned in 2026, declared in 2027) carries two structural changes vs 2025:
- **Automatic adjustment of escalão limits by 3,51%** — coefficient 1,0351, per the *Portaria* published under Art. 68.º-B CIRS in October 2025. This is **above** the projected 2026 inflation (~2,1%), so taxpayers with nominal raises below 3,51% experience a real tax cut from the bracket creep protection alone.
- **Reduction of −0,3 percentage points** on the *taxas marginais* of escalões **2.º a 5.º** vs 2025 — small but cumulative for incomes between roughly €8 342 and €29 397 of rendimento coletável.

The structure remains **9 escalões**, two rates per escalão (taxa normal / marginal and taxa média). Specific 2026 anchor values seen in current AT references: 3.º escalão taxa média = **15,823%**; 4.º escalão taxa normal = **24,100%** (top of 3.º escalão around €17 838). Always validate the full table against the AT "Tabelas Práticas IRS 2026" before computing.

### Note on the rendimentos-2025 declaration filed in 2026
The 2025 scale (used for the declaração entregue em 2026) was set by **Lei n.º 55-A/2025, de 22 de julho**, which retroactively reduced rates and prompted AT to publish a corrective retention table from 1 August 2025. The OE 2026 changes apply only to rendimentos 2026 onward — do not import the 2026 rates into a 2025 reconciliation by mistake.

### Family quotient
Spouses (married or união de facto opting for joint filing) may opt for *tributação conjunta* — income aggregated and divided by 2 before applying the scale. Default since 2015 is separate filing; opt-in for joint.

Dependents are taxed in the household's return with deductions per dependent, age-banded.

### Mínimo de existência
Below an annual rendimento coletável threshold, IRS payable is zero. The 2026 *mínimo de existência* is **€12 880** — the higher of (RMMG × 14 = €920 × 14 = €12 880) and (1,5 × 14 × IAS = 1,5 × 14 × €537,13 = €11 280). A taxpayer earning exactly the SMN therefore pays zero IRS and has no retenção na fonte. Source: Art. 70.º CIRS.

---

## 6. Deductions

Two layers:
1. **Specific deductions per category** — e.g., the Categoria A specific deduction (fixed amount + social-security contributions) and Categoria B coefficient-based deduction.
2. **Collection deductions ("deduções à coleta")** — applied to tax already computed, with annual ceilings.

The percentages and caps below are the **structural** values that have appeared in recent CIRS texts and Tabelas Práticas. **Verify each against the current AT page before stating to the user** — both percentages and global / sector sub-caps have been touched in successive OEs.

- Health expenses (15% of expenses, subject to a global cap).
- Education and training (30% of expenses, capped).
- Housing — interest on pre-2011 mortgages (very limited); rent for permanent residence (capped).
- Lar / nursing-home expenses (capped).
- Per-dependent deductions, age-banded.
- Donations to recognised entities.
- General family expenses (15% of e-Fatura invoices), with sectoral sub-caps for restaurants, hairdressers, mechanics, gym, vet.
- PPR (Plano Poupança Reforma) contributions, capped and age-banded.
- Disability deductions.

All collection deductions are subject to a **global cap** that scales with taxable income — at the top brackets the cap can be very low or zero. Verify the formula in the annual OE.

To qualify, expenses must generally be linked to a Portuguese NIF in e-Fatura. Foreign-issued invoices require manual upload via the "Despesas com Direito a Dedução" workflow.

---

## 7. Filing cycle

- **Tax year** = calendar year.
- **Modelo 3** is the annual declaration, filed via Portal das Finanças.
- **Filing window** is typically April to June of the following year. The exact open and close dates are set each year and have been adjusted by AT — verify current dates on the AT calendar.
- **Payment / refund** typically settled by 31 August following the filing year — verify.
- **Penalties** for late filing range from administrative fines (coima) to loss of access to the regime simplificado pre-fill workflow.

Estimated-tax / withholding interactions:
- Categoria A: employer withholds via monthly retention tables.
- Categoria B: clients withhold (typically 25% for services to taxpayers required to keep accounts) unless the taxpayer is dispensed under Article 101.º-B CIRS.
- Categoria E/F: withholding by the payer.

The annual return reconciles withholding to the actual tax due.

---

## 8. IRS Jovem

Partial exemption for younger taxpayers earning Categoria A or B income (rendimentos do trabalho dependente e independente). Governed by **Art. 12.º-B CIRS** (substantially rewritten by OE 2025, **Lei n.º 45-A/2024, de 31 de dezembro**, and confirmed by OE 2026 with structural continuity).

### Schedule (current — applicable to rendimentos 2025 and 2026)

| Year of benefit | Exemption % |
|---|---|
| 1.º ano | **100%** |
| 2.º, 3.º, 4.º ano | **75%** |
| 5.º, 6.º, 7.º ano | **50%** |
| 8.º, 9.º, 10.º ano | **25%** |

### Eligibility
- Age **18 to 35 inclusive** at the **last day of the tax year** (the threshold is age at 31 December, not at any other point).
- Income type: **Categoria A or B only** (not E / F / G / H — rental income, capital gains, pensions, dividends are excluded).
- **Not a dependent** in the household IRS declaration of the year being filed.
- **No education requirement** (the prior ensino secundário requirement was **abolished by OE 2025**).
- **Tributary situation regular** (no IRS or Seg Social debts in arrears).
- Has **not** benefited from / does not benefit from: NHR, IFICI, Programa Regressar.

### Annual income ceiling
Income up to **55 × IAS** per year qualifies for the percentage exemption; income above that is taxed normally.
- **2026**: 55 × €537,13 = **€29 542,15**.
- **2025**: 55 × €522,50 = €28 737,50.

If the worker has both Categoria A and B income, the ceiling applies to the **sum**.

### Counting the 10-year window
The 10-year benefit window counts from the **first year the worker received Categoria A or B income while declaring autonomously (not as a dependent)** — even if the worker did not request IRS Jovem in earlier years. Years without Categoria A/B income are **not** counted. The transitional rules of OE 2025 do not reset the counter: a worker who started in 2022 is in year 4 (75% exemption) for the 2025 declaration filed in 2026.

### Application channels
- **Declaração anual (Modelo 3)** — primary channel. From the IRS campaign filed in **2026** (rendimentos 2025) onward, the option is integrated into **IRS Automático** — the AT pre-fills the benefit if the taxpayer is identified as eligible. **Always verify the pre-filled proposal before accepting** — wrong year-counter mismatches are common.
- **Monthly retention adjustment via the employer (Art. 99.º-F CIRS)** — for Categoria A, the worker can request the employer apply the reduced retention from January, indicating the year of the benefit. Result: lower monthly retention, larger líquido on the payslip.
- **No equivalent monthly adjustment exists for Categoria B** — the freelancer pays the standard 23% retention (Art. 151.º CIRS list activities, since OE 2025) and reconciles annually on Modelo 3.

### Substitution declarations
A young worker who failed to claim IRS Jovem in prior eligible years can file **declarações de substituição** for those years, **provided the 4-year prescription window has not elapsed** since the original filing deadline. The recovery is real and often material.

Key questions for eligibility (ask the user):
- Year of birth (and what age on 31 December of the year being filed).
- Year first earned Categoria A or B income as a non-dependent.
- Prior IRS Jovem benefit years used.
- Current employment (Categoria A, Categoria B, or both).
- Whether they were ever under NHR, IFICI, or Programa Regressar.

---

## 9. Common interactions to flag

- **Unemployment benefit + Categoria B activity**: see `references/iefp-seg-social.md`. The benefit can be suspended or revoked if activity is opened and undeclared; declared activity may keep partial benefit under specific conditions.
- **Subsídio de Desemprego Parcial values are NOT declarable for IRS** — source: Seg Social Guia Prático 6002 v4.41 K (Perguntas Frequentes). Do not include parcial amounts in Anexo A even though they pass through the worker's bank account. Cross-reference: `iefp-seg-social.md` §3.
- **NHR / IFICI + foreign income**: the regime modifies *which* income is taxed in PT and at what rate; treaty rules still apply. Cross-check the CDT for the source country. IFICI registration deadline is **15 January of the year following residency** — see §1.
- **Categoria B + Seg Social TI contributions**: separate computation from IRS. See `references/self-employed-seg-social.md` for the 21,4% rate, escalões trimestrais, isenção primeiros 12 meses, and pluriactividade dispensa (4×IAS = €2 148,52/mo in 2026).
- **Rental income (Categoria F) + AIMI**: see `references/property-tax.md`.
- **Capital gains on primary residence**: rollover relief (reinvestment in new primary residence within prescribed window) may exempt the gain — verify the reinvestment window and qualifying assets, including PPR-style alternatives introduced in recent OEs.

---

## 10. Authoritative sources for IRS questions

Primary, in this order:
- **Código do IRS (CIRS)** — consolidated text on Diário da República Eletrónico.
- **Portal das Finanças** — `www.portaldasfinancas.gov.pt` — IRS section, Tabelas Práticas, IRS Jovem page, IFICI page.
- **AT Ofícios-Circulados and Informações Vinculativas** — published binding interpretations.
- **Annual Orçamento do Estado** law — confirms the year's brackets and any in-year changes.

See `references/sources.md` for exact URLs and the protocol for verifying currentness.
