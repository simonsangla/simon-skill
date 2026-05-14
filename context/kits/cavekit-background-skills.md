---
created: "2026-05-14"
last_edited: "2026-05-14"
---

# Cavekit: background-skills

## Scope
The three skills in `skills/` that act as pure background context for Claude or trigger-driven domain knowledge: `memory-management`, `task-management`, and `portuguese-tax-and-benefits`. The first two are Claude-only (`user-invocable: false` per cavekit-skill-contract.md R4). The third is user-invocable on a PT-tax trigger. This kit captures the conventions each skill teaches Claude.

In scope:
- The conventions each background skill documents.
- The side-effect discipline that flows from each skill's invocation mode.
- The reference-file structure of the PT tax skill.

## Requirements

### R1: memory-management — two-tier memory architecture
**Description:** Defines the contract between a `CLAUDE.md` hot cache and a deeper `memory/` directory. The hot cache lives at the workspace or repo-root `CLAUDE.md`, targets ≤ 100 lines, and covers approximately 30 frequent people, 30 common terms, active projects, and user preferences. The deep tier lives at `memory/glossary.md`, `memory/people/`, `memory/projects/`, and `memory/context/`. Lookup discipline is strictly tiered: hot cache → glossary → deep memory → ask the user. Meanings are never invented. Entries are promoted to the hot cache when their frequency rises and demoted to the deep tier when they go stale.

**Acceptance Criteria:**
- [ ] The SKILL.md body documents the tiered-lookup order verbatim: hot cache → glossary → deep memory → ask user.
- [ ] The SKILL.md body documents the `CLAUDE.md` hot-cache format conventions as currently practised: table-based, bold names, target ≤ 100 lines.
- [ ] The SKILL.md body contains no language describing a file-write operation or external service call (skill is Claude-only per cavekit-skill-contract.md R4 and must be side-effect-free).

**Dependencies:** cavekit-skill-contract.md R1 (frontmatter), cavekit-skill-contract.md R4 (Claude-only invocation).

### R2: task-management — TASKS.md format and editing conventions
**Description:** Defines the 4-section layout for `TASKS.md`: Active, Waiting On, Someday, Done. The task line grammar is `- [ ] **Title** — context, for whom, due date`. Subtasks are indented bullets beneath the parent task. The Done section is retained for approximately one week before pruning. Decode-before-act discipline applies: before mutating `TASKS.md`, parse user shorthand via the memory-management lookup defined in R1.

**Acceptance Criteria:**
- [ ] The SKILL.md body specifies the exact 4-section template (Active, Waiting On, Someday, Done) matching the existing skill body.
- [ ] The SKILL.md body documents the task line grammar and the subtask indentation grammar with at least one worked example of each.
- [ ] The SKILL.md body contains no language describing a side-effect operation; mutation guidance is phrased as advice to whichever skill is editing the file (skill is Claude-only per cavekit-skill-contract.md R4).

**Dependencies:** cavekit-skill-contract.md R1 (frontmatter), cavekit-skill-contract.md R4 (Claude-only). R1 of this kit (decode-before-act precondition).

### R3: portuguese-tax-and-benefits — PT tax + benefits domain reference
**Description:** Operating manual for the Portuguese tax and social-protection regime as it touches a freelancer / job-seeker. Coverage spans:
- IRS: modelo 3, anexos, NHR, IFICI, IRS Jovem.
- Property tax: IMI, AIMI, IMT, IS, IMT Jovem, ARU.
- IEFP and Seg Social desemprego: subsídio, acumulação parcial (Guia 6002), RP 5044, GD 63, ACPE, Subsídio Social.
- Trabalhador independente Seg Social: 21,4% contribution rate, escalões, isenção primeiros 12 meses, pluriactividade dispensa, MOE.
- Cross-border: Art. 6.º CIVA, W-8BEN, treaty articles relevant to US payers.

Two disciplines are enforced:
- **Source-first:** numbers are never recalled from memory; every answer verifies them against canonical PT sources.
- **Never-invent:** if a value cannot be verified in-session, describe the shape of the rule and link the canonical source rather than fabricate a value.

A 6-section answer template (Facts / Analysis / Risks / Actions / Documents needed / Source links) backs every answer.

**Acceptance Criteria:**
- [ ] The SKILL.md body enumerates the reference files under `skills/portuguese-tax-and-benefits/references/` — `clarifying-questions`, `irs`, `property-tax`, `iefp-seg-social`, `self-employed-seg-social`, `cross-border`, `sources` — together with a dispatch-by-domain table that points an incoming question to one of those references.
- [ ] `skills/portuguese-tax-and-benefits/assets/answer-template.md` defines the six sections using the exact heading strings Facts, Analysis, Risks, Actions, Documents needed, Source links (downstream tools and viewers key on these literal heading strings).
- [ ] Each reference file under `references/` cites primary sources (DRE, AT, Seg Social, IEFP) ahead of secondary commentary, verifiable by reading the citation order.
- [ ] Every numeric threshold in the reference files appears next to a publication date or a "consolidado a" date, or is explicitly flagged with the phrase "date not displayed".

**Dependencies:** cavekit-skill-contract.md R1 (frontmatter), cavekit-skill-contract.md R4 (user-invocable on PT-tax trigger).

## Out of Scope
- Any side-effect behavior — covered by cavekit-invocable-skills.md, where the invocable skills consume these conventions.
- The shared root-level `skills/dashboard.html` asset that the task-management skill mentions copying as a one-time first-run step — not treated as a separate domain in the current draft.
- Non-PT tax jurisdictions — the cross-border references describe only the Portuguese side of any bilateral situation.

## Cross-References
Referenced by:
- cavekit-invocable-skills.md R2 (`start`) and R3 (`update`) — both consume the memory-management and task-management conventions defined in R1 and R2 here.

References:
- cavekit-skill-contract.md R1, R4 — every skill in this kit is an instance of the envelope and the invocation-mode classification.

## Changelog
-
