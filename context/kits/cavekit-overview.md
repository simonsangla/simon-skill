---
created: "2026-05-14"
last_edited: "2026-05-14"
---

# Cavekit Overview

## Project
simon-skill — opinionated Claude Code plugin packaging SKILL.md skills for productivity workflows and PT-freelancer tax/benefits guidance. GitHub repo: `simonsangla/simon-skill`. Plugin manifests still declare `simon-productivity` on this branch — the manifest rename is part of in-flight PR #18 (PR2 rename + sanitize). Treat the manifest name as transitional until that PR merges.

## Domain Index
| Domain | Cavekit File | Requirements | Status | Description |
|--------|--------------|--------------|--------|-------------|
| skill-contract | cavekit-skill-contract.md | 4 | DRAFT | Polyglot SKILL.md envelope: frontmatter, invocation flags, optional scripts/ subdir, ${CLAUDE_PLUGIN_ROOT} asset paths. |
| invocable-skills | cavekit-invocable-skills.md | 3 | DRAFT | bump-version, start, update — skills with side effects (file writes, external syncs). |
| background-skills | cavekit-background-skills.md | 3 | DRAFT | memory-management, task-management, portuguese-tax-and-benefits — background-context skills. |

## Cross-Reference Map
| Domain A | Interacts With | Interaction Type |
|----------|----------------|------------------|
| invocable-skills | skill-contract | every invocable skill is an instance of D1 R1 + R4 |
| background-skills | skill-contract | every background skill is an instance of D1 R1 + R4 |
| invocable-skills | background-skills | start + update consume memory-management + task-management conventions when bootstrapping / syncing user workspace |

## Dependency Graph
Implementation order:
1. skill-contract — no dependencies (defines envelope referenced by D2 + D3).
2. background-skills — depends on skill-contract.
3. invocable-skills — depends on skill-contract AND background-skills (start + update consume D3 R1 + R2 conventions).
