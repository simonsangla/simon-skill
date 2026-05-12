# Cross-border services and treaty mechanics

A Portuguese resident invoicing a foreign client triggers three distinct rule-sets simultaneously: **place-of-supply rules** (CIVA, for IVA), **withholding-tax rules** in the client's country (US, FR, UK, etc.), and **elimination-of-double-taxation rules** in the resident state (Art. 81.º CIRS + the relevant CDT). Each has its own forms and deadlines. Getting one right and another wrong is a frequent failure mode.

> **Read this file when** the user mentions a foreign client, prestação de serviços a não residentes, Art. 6.º CIVA, W-8BEN / W-8BEN-E, IRS US, retenção na fonte estrangeira, FATCA, FBAR, CDT / convenção / treaty, double-taxation, Mercor / Outlier / Alignerr / Upwork / Toptal / Malt, Form 1099, autoliquidação, reverse-charge, VIES, OSS, declaração recapitulativa, or any question about how a payment from a non-Portuguese client should be treated.

---

## 1. The three independent layers — keep them separate

| Layer | Question it answers | Where to look |
|---|---|---|
| **A. IVA / VAT** | Should I charge Portuguese IVA on this invoice? | CIVA (Código do IVA), Art. 6.º place-of-supply |
| **B. Foreign withholding** | Is the foreign client (or the foreign tax authority) going to withhold tax from my payment? | Client country's domestic rule + the applicable CDT + the relevant treaty-benefit form |
| **C. PT IRS / IRC** | How do I declare this revenue in PT, and what credit do I get for any foreign tax already paid? | CIRS Art. 81.º (residents) or CIRC equivalent + Anexo J of Modelo 3 |

Resolve them in this order: A first (determines what the invoice looks like), then B (determines what gets paid into your account), then C (annual reconciliation).

---

## 2. Layer A — IVA place-of-supply for services (Art. 6.º CIVA)

Art. 6.º CIVA implements the EU place-of-supply rules (Directive 2006/112/EC, Arts. 44–59). Two regimes matter for a freelancer:

### B2B services (Art. 6.º n.º 6 al. a) CIVA)
Place of supply = **the place where the recipient is established / has its fixed establishment**. So a service rendered by a PT-resident sole-trader to a *taxable person* (i.e., a business) established outside PT is **not subject to Portuguese IVA**.

- If the client is **in another EU member state**: B2B reverse-charge. Issue the *fatura-recibo* with **no Portuguese IVA**, include the client's intracommunity VAT number, write the mention *"IVA – autoliquidação (Art. 196.º Diretiva 2006/112/CE / Art. 6.º n.º 6 al. a) CIVA)"*. **Register with VIES** beforehand and file the **Declaração Recapitulativa** in the period the invoice falls in (typically monthly when invoicing over a threshold, otherwise quarterly).
- If the client is **outside the EU** (US, UK, CH, BR, AU, etc.): **operation falls outside Portuguese territory** — no IVA, no VIES involvement, no Declaração Recapitulativa. Mention on the invoice: *"IVA – não sujeito; operação fora do território nacional, Art. 6.º n.º 6 al. a) CIVA"*. The invoice still flows through Portal das Finanças' fatura-recibo system (you are the issuer of record for AT).

### B2C services (Art. 6.º n.º 6 al. b) and n.º 8 CIVA)
Place of supply = **where the provider is established**, i.e., Portugal — with exceptions (telecoms, broadcasting, electronically supplied services, which use destination-country rules under OSS). For most consulting / dev services to a private individual abroad, Portuguese IVA applies (subject to your status under Art. 53.º CIVA exemption if you qualify).

### Common edge cases
- **Mercor / Outlier / Alignerr / Scale AI / Surge / Prolific** — these are US-incorporated marketplaces that pay for AI-related labour (annotation, evaluation, model rating). Treat them as **B2B clients outside the EU**: Art. 6.º n.º 6 al. a), no PT IVA, no VIES, invoice mention as above. Confirm the contracting entity's name on the platform's Tax Information / Payer of Record page before relying on the label.
- **Stripe Atlas / US LLC owned by a PT resident** — the LLC is a foreign person from PT's view, so B2B treatment applies; but if the LLC is a *disregarded entity* for US purposes flowing through to the PT-resident owner, the income reverts to direct CIVA / CIRS treatment of the underlying activity. Get specialist help before assuming.
- **Foreign holding company you control** — related-party. Arm's-length pricing required (CIRS Art. 63.º for residents); AT looks at services-to-own-vehicle arrangements closely.

---

## 3. Layer B — Foreign withholding and the role of treaty forms

The foreign client's domestic rules and the applicable **Convenção para Evitar a Dupla Tributação (CDT)** determine whether and how much they withhold.

### W-8BEN — US payers, individual foreign person

If your client is a US person (Mercor, Outlier, US tech company, US-based marketplace), they are required by the US Internal Revenue Code (Chapter 3, §§1441–1474, plus FATCA Chapter 4 §§1471–1474) to withhold US tax on **US-source payments** to **foreign persons**, **unless** you produce a treaty-claim form establishing reduced or zero withholding.

- **Form W-8BEN** — for individuals.
- **Form W-8BEN-E** — for entities (your PT Lda / Unipessoal).
- Both are **US IRS forms** filed with the payer (Mercor), **not** with AT.
- Current revision: October 2021 (verify on irs.gov — the IRS reissues these periodically).
- Validity: 3 calendar years from the date signed, unless a treaty election expires earlier or a relevant circumstance changes (residency change, etc.).

**Key claim on the W-8BEN** (Part II):
- Country of residence for tax-treaty purposes → **Portugal**.
- Treaty article and paragraph that allows reduced / zero withholding.

For services performed by a PT-resident self-employed person **wholly outside the US**, the income is typically **not US-source** under IRC §861 (place of performance test), so US withholding is **zero** even without treaty invocation. The W-8BEN is still required to **document the foreign-person status** and avoid the default 30% backup withholding the payer would otherwise apply.

If any of the work is **performed on US soil** (you travel to the US, you log in from a US IP via a US co-working space), the analysis flips and **US-source income** is generated — then the CDT articles below become the operative rules.

### The CDT Portugal–USA (signed 1994, in force 1996)
Key articles for service income:
- **Art. 7** — business profits: attributable only to the contracting state where the resident has a *permanent establishment (PE)*. A PT-resident sole-trader with no US PE has zero US business-profits exposure under treaty.
- **Art. 14** — independent personal services: the contracting state (US) may tax only if the PT resident has a *fixed base regularly available* in the US or stays > 183 days in the US in any 12-month period.
- **Art. 15** — dependent personal services: short-stay / employer-residence exceptions.

If both treaty conditions are negative (no US PE, no fixed base, < 183 days), US has no taxing right and the W-8BEN claim is just paperwork — but it is non-negotiable paperwork for the payer.

### Other CDTs you may encounter (PT-resident perspective)

| Treaty | Notes |
|---|---|
| **PT–France (1971, with protocols)** | Art. 14 (independent services) and Art. 15 (dependent services); allocates business income to residence absent PE. The most common case for a French expat in PT. |
| **PT–United Kingdom (1968, several amendments)** | Similar PE / fixed-base logic. Post-Brexit, EU place-of-supply rules treat UK as a third country. |
| **PT–Germany (1980)** | Similar PE / fixed-base logic. |
| **PT–Brazil (2000, amended 2008)** | Has specific source-state taxing rights for *serviços técnicos e de assistência técnica* (treats these as royalties — different from most other treaties). Verify the article applicable to your service. |
| **PT–Spain (1993)** | Standard OECD-model PE article. |
| **PT–Netherlands (1999, amended 2020)** | Standard OECD model. |
| **PT–Switzerland (1974, amended 2012)** | Standard. |

Equivalent treaty forms vary by country: France typically uses the *certificat de résidence fiscale portugais* obtained from AT; the UK uses HMRC's *Double Taxation Treaty Passport scheme*; Brazil uses *Form RFB Receita Federal*.

**Always pull the actual CDT text** for the specific country from Portal das Finanças → Convenções para Evitar a Dupla Tributação. Don't trust summaries — the article numbers move across treaty versions.

### Certificado de Residência Fiscal (the PT-side document)

Most foreign payers and tax authorities want a *Certidão de Residência Fiscal* issued by AT to back the W-8BEN / equivalent. Obtain via:

**Portal das Finanças → Cidadãos → Os Seus Serviços → Pedir → Certidões → Residência Fiscal**

Valid for one year. Some treaties (US) accept a separate "Form 6166-equivalent" — the AT *certidão* is the PT analogue.

---

## 4. Layer C — PT IRS declaration (Art. 81.º CIRS + Anexo J)

Whatever was paid where, the PT-resident reports it in PT.

### Where on Modelo 3

- **Anexo B / Anexo C** (Categoria B) — gross receipts including the foreign-source revenue.
- **Anexo J — Rendimentos obtidos no estrangeiro** — for each foreign source: country, nature of income, gross amount in EUR (use the AT exchange-rate table for the year), foreign tax already paid in EUR.
- **Anexo L** — only if you are a NHR / IFICI beneficiary claiming the special regime on the foreign-source slice.

### The double-tax credit mechanism (Art. 81.º CIRS, n.º 1)

For PT residents not under NHR/IFICI: PT taxes worldwide income, with a credit for foreign tax actually paid, capped at the lesser of (i) the foreign tax actually paid, or (ii) the fraction of PT IRS attributable to the foreign-source income.

For NHR (residual holders) and IFICI: certain foreign-source categories may be **exempt with progression** instead of credit-method, depending on whether the source state has taxing rights under the CDT.

### Common pitfall — the "I wasn't withheld so it's clean" fallacy

A US client paying a PT resident under a clean W-8BEN typically withholds zero. Founders sometimes infer "zero withholding = nothing to declare". **Wrong**: the gross receipt is **still 100% taxable in PT**. The W-8BEN simply prevented a foreign tax from accruing — it did nothing to the PT tax obligation. Declare on Anexo B (Cat B) and Anexo J (with zero foreign tax paid).

### Exchange rate

AT publishes the official annual *câmbio* table on Portal das Finanças. Most freelancers use the **monthly average exchange rate** for the month the receipt was earned, or the rate on the receipt date — be consistent across the year.

---

## 5. The four-step protocol when a foreign engagement lands

1. **Identify the client's status and country**. Is the contracting entity a *taxable person* (B2B) or an *individual* (B2C)? Get the entity name, country, and VAT/TIN.
2. **Apply Layer A** to the invoice. Decide IVA treatment and mention. If EU B2B, register VIES first; if non-EU, write the Art. 6.º n.º 6 a) CIVA mention.
3. **Apply Layer B** to set up the payer relationship. If US payer → W-8BEN before first payment, AT *certidão de residência fiscal* on file. If French payer / agent → *certificat de résidence fiscale*. If UK payer → relevant HMRC procedure.
4. **At annual Modelo 3 time, apply Layer C**. Anexo B (gross), Anexo J (per-country detail), Anexo L if NHR/IFICI. Compute Art. 81.º credit on any foreign tax paid.

---

## 6. Sources

Primaries first:

- **Código do IVA (CIVA) — Art. 6.º** (place-of-supply for services) — Portal das Finanças: https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/civa6.aspx
- **CIRS — Art. 81.º** (elimination of international double taxation) — DRE consolidado: https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1988-34514475
- **AT — Convenções para Evitar a Dupla Tributação** (full library of treaties in force): https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/convencoes_evitar_dupla_tributacao/
- **AT — Certidão de Residência Fiscal** (workflow): Portal das Finanças → Cidadãos → Os Seus Serviços → Pedir → Certidões → Residência Fiscal.
- **Convenção Portugal–EUA (1994/1996)** — text via AT CDT library; also at U.S. Treasury archive.
- **IRS US — Form W-8BEN + instructions**: https://www.irs.gov/forms-pubs/about-form-w-8-ben (Rev. October 2021 or successor — verify current revision).
- **IRS US — Publication 515** (withholding of tax on nonresident aliens and foreign entities): https://www.irs.gov/publications/p515
- **EU VIES — VAT number validation**: https://ec.europa.eu/taxation_customs/vies/
- **AT — VIES / Operadores Intracomunitários (ROI)** workflow: Portal das Finanças → Início de Atividade → marcação ROI.
- **AT — Câmbios anuais** (annual official exchange-rate tables): Portal das Finanças → Apoio ao Contribuinte → Câmbios.
- **EU Directive 2006/112/EC** (VAT Directive, Arts. 44–59 place of supply): EUR-Lex.

---

## 7. Quick decision lattice

```
Foreign engagement → who is paying you?

  is the payer a taxable person (B2B)?
  ├─ YES, in EU         → IVA: B2B reverse-charge; VIES register; Declaração Recapitulativa.
  │                       Foreign-side: usually nothing to do; check the country's treaty form.
  │
  ├─ YES, outside EU    → IVA: out of scope (Art. 6.º n.º 6 a) CIVA); no VIES.
  │                       Foreign-side:
  │                       ├─ US payer → W-8BEN + AT certidão de residência fiscal.
  │                       ├─ UK payer → HMRC procedure / treaty form.
  │                       ├─ FR/DE/CH/NL/ES → CDT clause + certidão de residência fiscal.
  │                       └─ BR payer → check Art. 12 for "serviços técnicos" treatment.
  │
  └─ NO, an individual  → IVA generally applies in PT (Art. 6.º n.º 8 + OSS for digital).
                          Foreign-side: usually nothing.

In every branch → annual: Anexo B (gross EUR) + Anexo J (per-country) + Art. 81.º credit.
```
