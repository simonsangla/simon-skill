---
created: "2026-05-14"
last_edited: "2026-05-14"
---

# PR4 precedent — Cavekit SKILL.md conformance pattern

Locked precedent for PR5–PR8. Source skills: `skills/bump-version/SKILL.md` (shipped in PR #23) and `skills/memory-management/SKILL.md` (shipped in PR #24). This document is the single point of truth for the three precedent objects derived from those two skills; any future migration that diverges from this shape is contract drift and must be reconciled here before shipping.

## FRONTMATTER_SPEC

Ordered key list as shipped. Spelling and dash-vs-underscore are normative. All keys live inside the YAML frontmatter delimited by `---` lines at the very top of the SKILL.md file.

| Key | Type | Required? | Spelling | Used by |
|---|---|---|---|---|
| `name` | string (kebab-case, matches the parent directory) | yes | `name` | every skill |
| `description` | string ("use when…" trigger phrase, single line preferred) | yes | `description` | every skill |
| `disable-model-invocation` | bool | optional — present only when the skill is user-only (slash-invoked, side-effect) | `disable-model-invocation` (hyphens) | side-effect invocable skills |
| `user-invocable` | bool | optional — present only when the skill is Claude-only (background, side-effect-free) | `user-invocable` (hyphens) | background-context skills |
| `argument-hint` | string | optional — present when the skill takes a positional argument | `argument-hint` (hyphens) | skills with arguments |

Cross-check against `context/kits/cavekit-skill-contract.md` R1: contract enumerates `name`, `description`, `disable-model-invocation: true`, `user-invocable: false`, `argument-hint: "<spec>"`. As-shipped frontmatter keys are a strict subset of this enumeration — no drift.

Worked examples (verbatim from the two shipped skills):

```yaml
# bump-version (side-effect, user-only)
name: bump-version
description: Atomically bump the plugin version across all three locations …
disable-model-invocation: true
argument-hint: major | minor | patch
```

```yaml
# memory-management (background, Claude-only)
name: memory-management
description: Use when Claude needs to decode user shorthand …
user-invocable: false
```

## TABLE_FORMAT

Top-of-body "Cavekit conformance" table — the worked instance of the cross-reference between each skill's body and the kit acceptance criteria it satisfies.

### Pre-table anchor paragraph

A single prose paragraph precedes the table, written as:

> This skill is the worked instance of `context/kits/<downstream-kit>.md` R<N>, anchored to `context/kits/cavekit-skill-contract.md` R1 (frontmatter) and R4 (invocation-mode classification — <classification>).

Where `<classification>` is one of `user-only`, `user-invocable`, `Claude-only` (matching the CLASSIFICATION_FLAGS section below).

### Table shape

- Section heading: `## Cavekit conformance` (exact heading string — downstream tooling may key on this).
- 3 columns: `Kit | Requirement | How this skill satisfies it`.
- One row per acceptance criterion in the requirement(s) the skill instantiates. Every row points at a body section that satisfies the AC; if no section satisfies an AC, the section is added — rows are never fabricated.
- The first two rows of every table cover skill-contract R1 (frontmatter) and R4 (invocation classification).
- Subsequent rows cover the relevant requirement in `cavekit-invocable-skills.md` or `cavekit-background-skills.md`.

### Kit-column short names

The first column uses short names (kit-file suffix `-skills.md` dropped):

| Long form | Short form |
|---|---|
| `cavekit-skill-contract.md` | `skill-contract` |
| `cavekit-invocable-skills.md` | `invocable-skills` |
| `cavekit-background-skills.md` | `background-skills` |

### AC reference syntax

`R<N> ACC<M> (<short-description>)`. Three letters of "ACC" (uppercase), no space between `R` and the digit, single space between `R<N>` and `ACC<M>`. Examples from shipped skills:

- `R1 (frontmatter)` — when the row covers an entire requirement (no per-AC breakdown needed because the requirement has a single AC).
- `R4 (invocation classification)` — same, entire requirement.
- `R1 ACC1 (identical values post-bump)` — when the row covers one specific acceptance criterion.
- `R1 ACC3 (non-zero on pre-bump drift, all three values printed)` — short description in parentheses summarises the AC.

The "How this skill satisfies it" column names the specific body section, precondition, or step that satisfies the AC.

## CLASSIFICATION_FLAGS

Three invocation modes; the flag combination is the source of truth for which mode applies. Side-effect discipline follows from the mode.

| Mode | Frontmatter flag | Side effects allowed? | Slash-invocable by user? | Auto-invoke by Claude? | Example |
|---|---|---|---|---|---|
| User-only | `disable-model-invocation: true` | yes | yes | no | `bump-version` |
| User-invocable (default) | _no flag_ | yes | yes | yes | `start`, `update` |
| Claude-only | `user-invocable: false` | no | no | yes (background context) | `memory-management`, `task-management` |

Side-effect rule (verbatim from `cavekit-skill-contract.md` R4): a Claude-only skill must be side-effect-free — no file writes, no external service calls. User-invocable and user-only skills may have side effects.

Practical consequence for migration: a skill flagged `user-invocable: false` MUST have its body scrubbed of write/exec/mutation language. Conventions that prescribe how memory or task files are written are rephrased as advice to whichever invocable skill (`start`, `update`) performs the write. PR4 is the worked example of this rephrasing.

## Body-organisation precedent

Beyond the conformance table, the two shipped skills converged on this body shape. Future migrations should match:

1. `# <skill-name>` H1 matching `frontmatter.name`.
2. A 1–2 sentence opening paragraph stating the skill's purpose and its invocation mode in plain English.
3. `## Cavekit conformance` section (table per TABLE_FORMAT).
4. Domain sections — the actual content of the skill, structured for whoever consumes it (Claude reading as background context, or a user reading before slash-invocation).
5. Optional `## Migration template` tail section — only shipped on the first migration (bump-version, PR #23). Subsequent migrations do not duplicate it; the canonical checklist lives in this precedent document instead.

## Verification checklist used by PR4

Mechanical checks run before opening PR4 — apply identically to PR5–PR8:

```
python3 -c "import yaml; d=yaml.safe_load(open(PATH).read().split('---')[1]); print(list(d.keys()))"
grep -c "simon-productivity" PATH        # must be 0
grep -nE '(\.\./|~/)' PATH               # must be empty (no parent-dir escape, no home-dir paths)
```

Plus the AC-specific greps for the relevant kit requirement (for memory-management: `grep -c "hot cache → glossary → deep memory → ask user"` ≥ 1).

## Open contract gaps surfaced during PR4

None blocking. One observation worth recording for the next kit revision pass:

- `cavekit-background-skills.md` R1 AC3 forbids "language describing a file-write operation or external service call". The kit does not list verbs; mechanical detection is grep-able but not automated. PR4 applied a manual sweep over `Add to`, `Create`, `Write`, `Update`, `Bootstrap`, `Promote`, `Demote` — these were rephrased as advice. A future kit revision could enumerate the forbidden-verb set explicitly to make CI checkable.

## Changelog

- 2026-05-14 — created. Locks precedent from PR #23 (bump-version) + PR #24 (memory-management). No drift between the two; PR5–PR8 should follow this document verbatim.
