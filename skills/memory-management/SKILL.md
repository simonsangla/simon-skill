---
name: memory-management
description: Use when Claude needs to decode user shorthand (nicknames, acronyms, project codenames, internal terms) by consulting a two-tier memory system — a `CLAUDE.md` hot cache at the workspace root and a deeper `memory/` directory. Defines the tiered lookup order (hot cache → glossary → deep memory → ask user) and the file-format conventions that invocable skills follow when they write to either tier.
user-invocable: false
---

# memory-management

Two-tier memory architecture so Claude reads requests the way a colleague would. This skill is a background context skill (Claude-only, side-effect-free): it documents the lookup discipline and the format conventions; it does not itself write to memory. Invocable skills (`/simon-skill:start`, `/simon-skill:update`) perform writes against these conventions.

## Cavekit conformance

This skill is the worked instance of `context/kits/cavekit-background-skills.md` R1, anchored to `context/kits/cavekit-skill-contract.md` R1 (frontmatter) and R4 (invocation-mode classification — Claude-only).

| Kit | Requirement | How this skill satisfies it |
|---|---|---|
| skill-contract | R1 (frontmatter) | `name`, `description`, `user-invocable: false` set in YAML above. |
| skill-contract | R4 (invocation classification) | Claude-only — `user-invocable: false` keeps this skill out of slash-command invocation; Claude consults it as background context. |
| background-skills | R1 ACC1 (tiered-lookup order verbatim) | Section "Tiered lookup" states the order `hot cache → glossary → deep memory → ask user` verbatim. |
| background-skills | R1 ACC2 (hot-cache format documented) | Section "Hot-cache format conventions" documents table-based layout, bold names, and the ≤ 100-line target. |
| background-skills | R1 ACC3 (no side-effect language) | All write-shaped guidance is phrased as advice that invocable skills follow when they edit memory; this skill itself describes no file writes or external service calls. |

## The decoding goal

Transform user shorthand into a fully grounded request before acting:

```
User: "ask todd to do the PSR for oracle"
              ↓ Claude decodes via the tiered lookup
"Ask Todd Martinez (Finance lead) to prepare the Pipeline Status Report
 for the Oracle Systems deal ($2.3M, closing Q2)"
```

Without memory, that request is meaningless. With memory, Claude recognises:

- **todd** → Todd Martinez, Finance lead, prefers Slack
- **PSR** → Pipeline Status Report (weekly sales doc)
- **oracle** → Oracle Systems deal, not the company

## Architecture

```
CLAUDE.md          ← Hot cache (~30 people, ~30 common terms, active projects, preferences)
memory/
  glossary.md      ← Full decoder ring (everyone, every term)
  people/          ← Complete per-person profiles
  projects/        ← Project details
  context/         ← Company, teams, tools
```

**`CLAUDE.md` (hot cache)** — top ~30 people, ~30 most common acronyms/terms, active projects (5–15), user preferences. Goal: cover 90% of daily decoding needs.

**`memory/glossary.md` (full decoder)** — complete coverage; consulted when something is not in the hot cache; can grow indefinitely.

**`memory/people/`, `memory/projects/`, `memory/context/`** — rich detail consulted when more than a one-line gloss is needed for execution.

## Tiered lookup

Decoding order — strict, no skipping:

```
hot cache → glossary → deep memory → ask user
```

Step by step:

1. **Hot cache** — read `CLAUDE.md` in the current working directory. Covers the 90% case.
2. **Glossary** — if a term is not in the hot cache, read `memory/glossary.md`.
3. **Deep memory** — if richer context is needed (drafting a message, planning a meeting), read the relevant file under `memory/people/`, `memory/projects/`, or `memory/context/`.
4. **Ask user** — if the term is not found in any tier, ask: "I don't know what X means yet. Can you tell me?" Meanings are never invented.

Worked example:

```
User: "ask todd to do the PSR for oracle"

  hot cache:     todd → Todd Martinez, Finance  ✓
                 PSR  → Pipeline Status Report  ✓
                 oracle → not in hot cache

  glossary:      oracle → Oracle Systems deal ($2.3M)  ✓

  → Claude can now act with full context.
```

## Hot-cache format conventions

The hot cache at `CLAUDE.md` follows these conventions (invocable skills that write the file must respect them):

- **Tables**, not prose paragraphs — every section that lists people, terms, or projects is a Markdown table for compactness and scannability.
- **Bold names** in the leftmost column (`**Todd**`, `**Phoenix**`) so quick visual scans land on the right row.
- **Target ≤ 100 lines total.** When the file grows past that ceiling, the oldest / least-used entries are demoted to `memory/glossary.md`.

Worked layout (illustrative — invocable skills produce content of this shape):

```markdown
# Memory

## Me
[Name], [Role] on [Team]. [One sentence about what I do.]

## People
| Who | Role |
|-----|------|
| **Todd** | Todd Martinez, Finance lead |
| **Sarah** | Sarah Chen, Engineering (Platform) |
| **Greg** | Greg Wilson, Sales |
→ Full list: memory/glossary.md, profiles: memory/people/

## Terms
| Term | Meaning |
|------|---------|
| PSR | Pipeline Status Report |
| P0 | Drop everything priority |
| standup | Daily 9am sync |
→ Full glossary: memory/glossary.md

## Projects
| Name | What |
|------|------|
| **Phoenix** | DB migration, Q2 launch |
| **Horizon** | Mobile app redesign |
→ Details: memory/projects/

## Preferences
- 25-min meetings with buffers
- Async-first, Slack over email
- No meetings Friday afternoons
```

## Deep-memory format conventions

The deep tier carries unlimited detail. Invocable skills that produce these files follow the shapes below.

`memory/glossary.md` — the decoder ring:

```markdown
# Glossary

Workplace shorthand, acronyms, and internal language.

## Acronyms
| Term | Meaning | Context |
|------|---------|---------|
| PSR | Pipeline Status Report | Weekly sales doc |
| OKR | Objectives & Key Results | Quarterly planning |
| P0/P1/P2 | Priority levels | P0 = drop everything |

## Internal Terms
| Term | Meaning |
|------|---------|
| standup | Daily 9am sync in #engineering |
| the migration | Project Phoenix database work |
| ship it | Deploy to production |

## Nicknames → Full Names
| Nickname | Person |
|----------|--------|
| Todd | Todd Martinez (Finance) |
| T | Also Todd Martinez |

## Project Codenames
| Codename | Project |
|----------|---------|
| Phoenix | Database migration |
| Horizon | New mobile app |
```

`memory/people/{name}.md` — per-person profile:

```markdown
# Todd Martinez

**Also known as:** Todd, T
**Role:** Finance Lead
**Team:** Finance
**Reports to:** CFO (Michael Chen)

## Communication
- Prefers Slack DM
- Quick responses, very direct
- Best time: mornings

## Context
- Handles all PSRs and financial reporting
- Key contact for deal approvals over $500k
- Works closely with Sales on forecasting
```

`memory/projects/{name}.md` — project profile:

```markdown
# Project Phoenix

**Codename:** Phoenix
**Also called:** "the migration"
**Status:** Active, launching Q2

## What It Is
Database migration from legacy Oracle to PostgreSQL.

## Key People
- Sarah - tech lead
- Todd - budget owner
- Greg - stakeholder (sales impact)
```

`memory/context/company.md` — shared context:

```markdown
# Company Context

## Tools & Systems
| Tool | Used for | Internal name |
|------|----------|---------------|
| Slack | Communication | - |
| Asana | Engineering tasks | - |
| Salesforce | CRM | "SF" or "the CRM" |
| Notion | Docs/wiki | - |

## Teams
| Team | What they do | Key people |
|------|--------------|------------|
| Platform | Infrastructure | Sarah (lead) |
| Finance | Money stuff | Todd (lead) |
| Sales | Revenue | Greg |
```

## Routing new memory (advice to invocable skills)

When the user says "remember X means Y" — the invocable skill that handles the request (typically `update`) decides which tier to route the entry into. The conventions:

| Type | Hot cache target | Deep memory target |
|---|---|---|
| Person | Add a `People` row only when the person is in the top ~30 frequent contacts | A row in `memory/glossary.md` Nicknames table + a `memory/people/{name}.md` profile |
| Acronym / term | Add a `Terms` row when it is among the ~30 most common | A row in `memory/glossary.md` Acronyms or Internal Terms table |
| Project | Add to `Projects` while the project is active | A row in `memory/glossary.md` Project Codenames + `memory/projects/{name}.md` |
| Nickname | Carry in `People` row when the parent person is top-30 | All nicknames live in `memory/glossary.md` Nicknames table |
| Company context | Quick reference only | `memory/context/company.md` |
| Preferences | All preferences | — |
| Historical / stale | Removed from hot cache | Retained in `memory/` for traceability |

## Promotion and demotion (advice to invocable skills)

The hot cache stays fresh by moving entries up and down between tiers as their relevance shifts.

**Promotion to `CLAUDE.md` is appropriate when** an entry recurs across recent requests, when it is part of a currently active project, or when the user explicitly names it as primary.

**Demotion to `memory/` only is appropriate when** a project completes, when a person is no longer a frequent contact, or when a term is rarely used.

The skill that performs the move (typically `update`) presents the proposed change as a diff for user confirmation before writing.

## File-location reference

- **Hot cache:** `CLAUDE.md` in the current working directory.
- **Deep memory:** `memory/` subdirectory of the same working directory.
- Filenames in `memory/people/` and `memory/projects/` are lowercase with hyphens (`todd-martinez.md`, `project-phoenix.md`).
- The hot cache always captures nicknames alongside the canonical name — decoding fails silently otherwise.
