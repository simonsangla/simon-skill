---
created: "2026-05-14"
last_edited: "2026-05-14"
---

# Cavekit: invocable-skills

## Scope
The three skills in `skills/` that have side effects: `bump-version`, `start`, and `update`. Each is an instance of the skill envelope defined in cavekit-skill-contract.md (D1 R1 + D1 R4 in particular). This kit captures WHAT each skill does, its preconditions, its outputs, and its safe-failure modes.

In scope:
- The behavior contract of each invocable skill.
- Preconditions that must hold before the skill runs.
- Observable outputs after the skill runs.
- Safe-failure modes (when and how the skill must refuse to act).

## Requirements

### R1: bump-version — atomic 3-field SemVer bump
**Description:** Accepts a single argument: `major`, `minor`, or `patch`. Touches three SemVer fields across two files:
- `.claude-plugin/plugin.json` — `.version`
- `.claude-plugin/marketplace.json` — `.metadata.version`
- `.claude-plugin/marketplace.json` — `.plugins[0].version`

After a successful bump, all three fields hold the same new SemVer value. The skill refuses to run when the working tree is dirty, when the three fields disagree before the bump, or when any of the three current values is not valid SemVer. The skill does not commit, tag, or push; it prints a next-step checklist for the user to perform commit + tag + PR manually.

**Acceptance Criteria:**
- [ ] After a successful invocation, the three SemVer fields hold identical values (verifiable by reading each field).
- [ ] Invocation exits non-zero with a clear stderr message when `git status --porcelain` returns non-empty output before the bump.
- [ ] Invocation exits non-zero with a clear stderr message listing all three current values when pre-bump field drift is detected.
- [ ] After invocation, `git log` shows no new commits attributable to the skill and `git tag --list` shows no new tags attributable to the skill.
- [ ] File writes appear atomically — no partial-file window is observable from a concurrent read of either touched file.

**Dependencies:** cavekit-skill-contract.md R1 (frontmatter), cavekit-skill-contract.md R4 (user-only invocation).

### R2: start — folder-agnostic init with two sub-modes
**Description:** Two sub-modes that do not chain into one another:
- **Generic mode** (no args): in the current working directory, create `TASKS.md`, `CLAUDE.md`, and `memory/` if and only if they are absent. Walk the parent CLAUDE.md chain upward and surface hard rules inherited from parents in the newly written local `CLAUDE.md`.
- **Plugin-scaffold mode** (argument `plugin`, cwd is an empty git repo): stamp templates from `skills/start/templates/` into the working directory, substituting `{{PLACEHOLDER}}` tokens. Finish with a clean working tree and a follow-up instruction printout.

An optional multi-source bootstrap scan (Gmail, Calendar, Drive, Notes, Vercel, GitHub) may run as a best-effort step in generic mode. Missing connectors are reported but never fatal.

**Acceptance Criteria:**
- [ ] In generic mode, `TASKS.md`, `CLAUDE.md`, and `memory/` are created only when absent; pre-existing files at those paths are not overwritten (verifiable by mtime comparison or content equality).
- [ ] In generic mode, every CLAUDE.md on the upward parent chain is read; hard-rule text from each parent appears verbatim in the newly written local `CLAUDE.md`.
- [ ] In plugin-scaffold mode, the skill aborts when cwd contains anything beyond `.git`, `.gitignore`, and a single `README.md`.
- [ ] In plugin-scaffold mode, after scaffold completion `git status --porcelain` is empty and the scaffold commit is present.
- [ ] In plugin-scaffold mode, the skill prints follow-up instructions and does not chain into generic init.
- [ ] When a connector check fails (for example `gh auth status` returns non-zero), the failure is reported in the skill's output and the skill itself still exits 0.

**Dependencies:** cavekit-skill-contract.md R1 (frontmatter), cavekit-skill-contract.md R4 (user-invocable). cavekit-background-skills.md R1 (consumes memory-management conventions when scaffolding `memory/`). cavekit-background-skills.md R2 (consumes task-management conventions when scaffolding `TASKS.md`).

### R3: update — multi-source sync with hard-rule respect
**Description:** Two modes:
- **Default mode:** sync from external sources (GitHub via `gh` CLI, Vercel via MCP, optionally Linear, Calendar, Gmail, Drive, Notes), scoped by hints from the parent CLAUDE.md chain.
- **Comprehensive mode** (argument `--comprehensive`): a deep 30-day scan combined with new-memory suggestions and cleanup proposals.

Two gates apply in both modes:
- **Hard-rule gate:** when a parent CLAUDE.md declares a rule and an incoming item could trip it, the skill flags and halts that item rather than auto-actioning it.
- **Verification-policy check:** any Active task claimed as done without the parent's required evidence is flagged.

Every proposed change to `TASKS.md` or `memory/` is shown to the user as a diff for confirmation; nothing is auto-written.

**Acceptance Criteria:**
- [ ] The skill's output contains a per-source diff table with each row classified as new, existing, or stale.
- [ ] When a parent CLAUDE.md declares a hard rule and an incoming item could trip it, the skill's output contains the quoted rule text verbatim and the item is marked halted rather than actioned.
- [ ] The skill's output flags Active tasks that are claimed as done but lack the evidence required by the parent CLAUDE.md.
- [ ] No write to `TASKS.md` or any file under `memory/` occurs without an explicit user confirmation captured in the same invocation transcript.
- [ ] When the Apple Notes MCP is unavailable (non-desktop runtime), the Notes source is skipped silently — no error is surfaced and the rest of the sync proceeds.
- [ ] The GitHub source uses the `gh` CLI; failure of `gh auth status` is reported once and the skill continues with the remaining sources.

**Dependencies:** cavekit-skill-contract.md R1 (frontmatter), cavekit-skill-contract.md R4 (user-invocable). cavekit-background-skills.md R1 (consumes memory-management tier-lookup discipline). cavekit-background-skills.md R2 (writes to `TASKS.md` per task-management format).

## Out of Scope
- HOW each skill implements its behavior internally (specific shell commands, JSON-edit tools, MCP call shapes) — implementation belongs in the SKILL.md body, not in this kit.
- The skill-envelope shape itself — covered by cavekit-skill-contract.md.
- Slack, Notion, Asana, Atlassian, monday, ClickUp, MS365, Linear, and Figma sources declared in `.mcp.json` but treated as optional and not exercised by the current `update` flow.
- Renaming user-workspace folders or deleting user files — these operations are explicitly never performed by any invocable skill.

## Cross-References
References:
- cavekit-skill-contract.md R1, R4 — every invocable skill defined here is an instance of the envelope and the invocation-mode classification.
- cavekit-background-skills.md R1, R2 — `start` (R2) and `update` (R3) consume the memory-management and task-management conventions when bootstrapping or syncing a user workspace.

## Changelog
-
