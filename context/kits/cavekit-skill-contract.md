---
created: "2026-05-14"
last_edited: "2026-05-14"
---

# Cavekit: skill-contract

## Scope
Defines what a "skill" looks like in the simon-skill plugin: the SKILL.md envelope, optional bundled code, invocation-mode flags, and asset-path resolution via `${CLAUDE_PLUGIN_ROOT}`. Applies to every skill under `skills/<name>/`, regardless of whether the skill bundles executable code. The contract is forward-looking — future polyglot skills (Python, TypeScript, shell scripts bundled alongside SKILL.md) slot into this shape without retrofit.

In scope:
- SKILL.md frontmatter conventions.
- Invocation-flag semantics (`disable-model-invocation`, `user-invocable`, `argument-hint`).
- Optional `scripts/` subdir conventions for bundled polyglot code.
- `${CLAUDE_PLUGIN_ROOT}` asset-path resolution.

## Requirements

### R1: SKILL.md frontmatter
**Description:** Every skill at `skills/<name>/SKILL.md` carries YAML frontmatter with `name` and `description`. `name` matches `^[a-z][a-z0-9-]+$` and equals the parent directory name. `description` is a single-sentence "use when…" trigger phrase (not a title or tagline). Optional flags: `disable-model-invocation: true`, `user-invocable: false`, `argument-hint: "<spec>"`.

**Acceptance Criteria:**
- [ ] The CI workflow step "Validate SKILL.md frontmatter" in `.github/workflows/ci.yml` passes for every `skills/*/SKILL.md` in the repo.
- [ ] Every skill present under `skills/` is enumerated in this kit's body together with its invocation-mode classification per R4.
- [ ] The local validator at `commands/validate.md` applies the same frontmatter rules as the CI workflow (same required fields, same regex for `name`, same optional flags accepted).

**Dependencies:** none.

### R2: Optional `scripts/` subdir for polyglot bundling
**Description:** A skill may optionally include `skills/<name>/scripts/` holding Python, TypeScript, or shell code. Bundled scripts are referenced from the SKILL.md body via `${CLAUDE_PLUGIN_ROOT}/skills/<name>/scripts/<file>`. Bundled scripts are self-contained — no coupling to a monorepo, no relative imports escaping `skills/<name>/`. Python scripts declare their requirements inline (top-of-file comment block or PEP 723 metadata). TypeScript scripts run under `bun` or `node --experimental-strip-types` without a separate build step.

**Acceptance Criteria:**
- [ ] At draft time (2026-05-14), the 6 existing skills (`bump-version`, `start`, `update`, `memory-management`, `task-management`, `portuguese-tax-and-benefits`) are pure-markdown; none contains a `scripts/` directory.
- [ ] Any skill that bundles a `scripts/` directory documents the `${CLAUDE_PLUGIN_ROOT}/skills/<name>/scripts/<file>` invocation path in its SKILL.md body.
- [ ] Any skill that bundles scripts has its script-level input → output contract captured in the matching downstream kit (cavekit-invocable-skills.md or cavekit-background-skills.md, depending on the skill's invocation mode).

**Dependencies:** none.

### R3: Asset references via `${CLAUDE_PLUGIN_ROOT}`
**Description:** Skill bodies that reference bundled assets (templates, HTML, JSON, scripts) resolve those references through the `${CLAUDE_PLUGIN_ROOT}` env var. Repo-relative paths (`./skills/...`), hardcoded user-home paths (`/Users/...`), and `../` traversal that escapes the skill's own subtree are disallowed.

**Acceptance Criteria:**
- [ ] All current `${CLAUDE_PLUGIN_ROOT}` references in the repo are enumerated in this kit: the `start` skill references templates under `${CLAUDE_PLUGIN_ROOT}/skills/start/templates/`; the `task-management` skill references `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html`.
- [ ] No SKILL.md body contains a path beginning with `/Users/`.
- [ ] No SKILL.md body uses a `../` segment that escapes its own `skills/<name>/` tree. The shared root-level asset `skills/dashboard.html` is the only documented exception and is accessed only via `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html`.

**Dependencies:** none.

### R4: Invocation-mode classification
**Description:** Three invocation modes are recognised:
- **User-invocable** (no flag): both Claude and the user may invoke.
- **User-only** (`disable-model-invocation: true`): the user types the slash command; Claude must not auto-invoke.
- **Claude-only** (`user-invocable: false`): pure background context for Claude; users do not slash-invoke.

Side-effect rule: a Claude-only skill must be side-effect-free — no file writes, no external service calls. User-invocable and user-only skills may have side effects.

**Acceptance Criteria:**
- [ ] Each of the 6 existing skills is classified in this kit's body. Current classification: `bump-version` user-only; `start` user-invocable; `update` user-invocable; `memory-management` Claude-only; `task-management` Claude-only; `portuguese-tax-and-benefits` user-invocable.
- [ ] No skill classified Claude-only contains language in its SKILL.md body describing file writes or external service calls (verifiable by reading the skill body for write/fetch verbs).

**Dependencies:** none.

## Out of Scope
- What each individual skill does — covered by cavekit-invocable-skills.md (D2) and cavekit-background-skills.md (D3).
- The plugin manifest (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`).
- Skill-discovery mechanics inside the Claude Code runtime itself.
- The `${CLAUDE_PROJECT_DIR}` env var — a different concept, used by hooks, not skills.

## Cross-References
Referenced by:
- cavekit-invocable-skills.md — every invocable skill (D2 R1, R2, R3) is an instance of this contract, in particular R1 (frontmatter) and R4 (classification).
- cavekit-background-skills.md — every background skill (D3 R1, R2, R3) is an instance of this contract, in particular R1 and R4.

## Changelog
-
