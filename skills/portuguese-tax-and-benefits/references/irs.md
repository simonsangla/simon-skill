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
Closed to new entrants from **2024** onwards by **Lei n.º 82/2023, de 29 de dezembro (Orçamento do Estado 2024)**. Transitional provisions allowed late registration for some 2024 movers (deadline closed **31 March 2025**). Anyone already enrolled keeps the regime for the remainder of their 10-year window. Do not promise the regime to a new arrival without checking the transitional rules and verifying the user is not eligible only under the residual grandfather windows.

For taxpayers **already inside the 10-year NHR window**, the **list of "atividades de elevado valor acrescentado"** (high-value-added activities qualifying for the 20% flat rate on PT-source Cat A/B income) is governed by:

- **Portaria n.º 12/2010, de 7 de janeiro** — original list, used CAE / Article 151.º CIRS codes.
- **Portaria n.º 230/2019, de 23 de julho** — replacement list keyed to **Classificação Portuguesa das Profissões (CPP)** codes published by INE. This portaria reorganised activities into ~30 high-level groups, e.g. CPP **2** (Specialists in intellectual and scientific activities), CPP **25** (ICT specialists — including codes like 251 / 2519 for software / IT specialists), CPP **21** (Engineers and engineering professions), etc. **Verify the user's CPP classification against the current portaria text** (DRE) — different roles map to different codes and a few high-value tech roles sit at the edge of the list.

Portaria 230/2019 **remains operative** for existing NHR beneficiaries until the end of their 10-year window — i.e., do not assume the activity-list rules are moot just because the regime is closed to new entrants. For the residual cohort the portaria's coding still matters at every annual filing (Anexo L of Modelo 3).

### IFICI — Incentivo Fiscal à Investigação Científica e Inovação
Successor regime, sometimes informally "NHR 2.0", introduced by Lei 82/2023 (OE 2024) and codified at **Article 58.º-A of the Estatuto dos Benefícios Fiscais (EBF)**. Regulated by **Portaria n.º 352/2024/1, de 23 de dezembro**, with implementation guidance issued by AT, FCT, IAPMEI, AICEP, and Startup Portugal each in their respective tracks.

IFICI is **narrower than NHR** in two ways:
1. Eligibility depends on **the qualifying entity** the taxpayer earns income from — universities, research entities in the national S&T system, RFAI / contractual-benefit beneficiaries, **certified Startups under Lei n.º 21/2023, de 25 de maio**, AICEP/IAPMEI-recognised productive-investment companies, and certain Madeira/Azores qualifying entities. A sole-trader operating in their own name without channelling income through a qualifying entity **does not qualify**, regardless of activity classification.
2. The activity list (Portaria 352/2024) requires **highly qualified jobs** with specific CPP codes within the qualifying entity — overlap with Portaria 230/2019 codes exists but the underlying logic is different (entity-anchored, not activity-anchored).

**Registration deadline**: by **15 January of the year following the year of becoming PT tax resident** (Article 58.º-A EBF, with first-cohort extensions issued via AT). Each cohort's deadline is rigid; missing it costs the IFICI year, not the entire 10-year benefit.

Always pull the current text of EBF Art. 58.º-A on DRE and the consolidated Portaria 352/2024 before stating eligibility.

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
Separate from IRS. The contribution base is computed on a **rolling quarterly basis** from relevant income, with a coefficient applied (typically 70% for services, 20% for sale-of-goods — verify). Contributions for the first 12 months of activity may be exempt (isenção contributiva inicial) but this interacts with prior contribution history. See `references/iefp-seg-social.md` for details.

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

Family quotient: spouses (married or união de facto opting for joint filing) may opt for *tributação conjunta* — income aggregated and divided by 2 before applying the scale. Default since 2015 is separate filing; opt-in for joint.

Dependents are taxed in the household's return with deductions per dependent, age-banded.

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

Partial exemption for younger taxpayers earning Categoria A or B income, with a degressive percentage exemption over a multi-year window starting from the first year of earning qualifying income after completing a qualifying education level. The age ceiling, percentage schedule, and qualifying conditions have been **revised in successive OEs** (notably expanded in 2024 OE) — verify the current schedule on AT's IRS Jovem page before applying it.

Key questions for eligibility (ask the user):
- Year of birth and current age.
- Year first earned Categoria A or B income.
- Highest qualification completed (and when).
- Prior years already benefited from IRS Jovem under earlier versions.

---

## 9. Common interactions to flag

- **Unemployment benefit + Categoria B activity**: see `references/iefp-seg-social.md`. The benefit can be suspended or revoked if activity is opened and undeclared; declared activity may keep partial benefit under specific conditions.
- **NHR / IFICI + foreign income**: the regime modifies *which* income is taxed in PT and at what rate; treaty rules still apply. Cross-check the CDT for the source country.
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
