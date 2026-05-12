# Handoff — simon-productivity

> Last updated: 2026-05-12. Read this first; check `TASKS.md` for current backlog state and `git log --oneline -10` for what's landed since.

## Goal

Build out `simon-productivity` as a versioned, GitHub-hosted **Claude Code plugin** that ships Simon's four-skill productivity bundle (`start`, `update`, `task-management`, `memory-management`) + a `skills/dashboard.html` asset. Repo at `github.com/simonsangla/simon-productivity` (currently private). Plugin manifest at `.claude-plugin/{plugin.json,marketplace.json}`.

The plugin is the **template + code**. Simon's runtime instance of the same files lives at `~/projects/claude-config/cowork/` — never edit `cowork/` to fix a skill bug; that's user data.

## Current progress

| Commit | What landed |
|--------|-------------|
| `493a21d` (root) | LICENSE (MIT), .gitignore, README, .github/{dependabot.yml,workflows/ci.yml}, .claude-plugin manifests v0.0.1, CLAUDE.md, TASKS.md, memory/, dashboard.html at root. CI green. |
| `220f085` (#1) | CLAUDE.md: documented relationship to `~/projects/claude-config/` + inherited conventions. TASKS.md bootstrap items closed out. |
| `1334212` (#2) | Ported 4 SKILL.md files from local agent-mode-sessions cache → `skills/<name>/SKILL.md`. Moved `dashboard.html` to canonical `skills/dashboard.html`. Added `CONNECTORS.md` + `.mcp.json`. Bumped to v0.1.0. |
| `dc43534` (#3) | New "Plugin source" track in `start` skill — `/simon-productivity:start plugin` scaffolds a fresh plugin repo from templates at `skills/start/templates/`. Bumped to v0.2.0. |
| `0ee9e39` (#4) | Fixed smoke-test findings: dropped root `dashboard.html` from Plugin source init flow, decoupled scaffold from auto-init so scaffold commit ends with clean working tree. Bumped to v0.2.1. |
| `29fbdaa` (#5) | TASKS.md cleanup: smoke-test cycle closed, claude-config cross-link logged. Active section now empty. |

**Sibling work** in `~/projects/claude-config` ([PR #19](https://github.com/simonsangla/claude-config/pull/19), commit `129b13d`): added `memory/simon-productivity-plugin.md` (reference type, user scope) indexed under "Claude Code harness" in `MEMORY.md`. Cross-linking complete.

Repo is at **v0.2.1** on `main`, working tree clean, all 5 PRs merged.

## What worked

- **`repo-bootstrap` skill as the spine** for the initial scaffold. Even though it's calibrated for Vite/React/TS frontend apps and this is a plugin repo (markdown + JSON), the security baseline / branch-protection / PR-workflow discipline transferred cleanly. Adapt build gates per repo type (here: `jq empty` on JSON manifests + Python frontmatter lint on SKILL.md instead of lint+typecheck+test+build).
- **Templates as the source of truth for new-plugin scaffolding.** `skills/start/templates/` mirrors this repo's hygiene state with `{{PLACEHOLDER}}` substitution. CLAUDE.md documents the sync rule (changing hygiene file → update template in same commit). Convention-only, not CI-enforced.
- **PR-only workflow after root commit.** Every change after `493a21d` went through a branch + PR + green CI + squash merge with `--admin --delete-branch`. Branch protection itself is blocked (private repo on free plan) but the discipline is in place.
- **Two-repo coordination via parallel branches**, not one bundled commit. The claude-config cross-link shipped as its own PR (#19) in its own repo without touching Simon's unrelated WIP edits on `cowork/TASKS.md`.

## What didn't work

- **`/plugin marketplace add` and `/plugin install` from subagent tool context.** The TEST 0 smoke-test step failed because slash commands are user-typed session built-ins, not callable from a tool environment. Future smoke tests of the install path require an interactive Simon-typed test in a fresh Claude Code session.
- **Initial assumption that scaffold should chain into normal init.** v0.2.0 of the `start` skill auto-ran TASKS.md + memory/ + dashboard.html creation right after the scaffold commit, leaving untracked files in the working tree. Fixed in v0.2.1 by decoupling — scaffold ends clean, user re-runs `start` (no args) when ready for plugin-dev init.
- **Initial assumption that `dashboard.html` lives at repo root for plugin source repos.** Lingering misapplication of productivity-track logic. The canonical location is `skills/dashboard.html` (per the `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html` reference inside the SKILL.md files). v0.2.1 cleanup removed every root-level dashboard mention from the Plugin source track.
- **Cache lag in the current session.** This session pinned the plugin from `~/Library/Application Support/Claude/local-agent-mode-sessions/.../plugin_01PG.../` at boot. v0.2.x version bumps in the repo do not propagate — running `/simon-productivity:start` in this session uses the cached v0.1.0-ish code, not the on-disk v0.2.1. Restart Claude Code in a fresh terminal to pick up new versions.

## Next steps

All Active backlog is empty. The four Someday items, in rough order of value × effort:

1. **Smoke-retest v0.2.1** (~30 min, interactive) — Use the recipe at the end of this file. Verify Test B (scaffold ends clean) and Test C (no stray dashboard.html on simon-productivity itself). Skip if confident from the v0.2.1 diff.
2. **Flip repo to public + enable branch protection** (1 step + 1 API call, ~5 min) — Once Simon's ready to share the plugin. Required for short-form install via `/plugin marketplace add simonsangla/simon-productivity`.
   ```bash
   gh repo edit simonsangla/simon-productivity --visibility public --accept-visibility-change-consequences
   # Then PUT /repos/.../branches/main/protection with required_status_checks=["Validate plugin manifests + skills"]
   # Always GET-readback after PUT — never trust write exit code (per repo-bootstrap §4 lesson).
   ```
3. **`release-plugin` user command** (~1 hr) — Bumps manifest versions, tags `vX.Y.Z`, drafts a GitHub release with the skill-changelog. Mirrors what `repo-bootstrap` did at scaffold time. Should live at `commands/release-plugin.md` or as a new user-invocable skill at `skills/release-plugin/SKILL.md`.
4. **`scaffold-skill` user command** (~1 hr) — Bash script that creates `skills/<name>/SKILL.md` from a template, asks for the trigger sentence, and (optional) appends an entry to the README skill table. Same pattern as `start plugin` but at intra-plugin granularity. Could share templating logic with `start`.
5. **Audit `start` + `update` invocation flags** (~15 min decision, ~5 min change) — Both currently lack `disable-model-invocation: true`, so Claude can auto-invoke them. Both have real side effects (file writes, Gmail scans). Matches the upstream cache forked from Anthropic — flipping diverges from upstream. Decide: gate or not, then ship.

## Smoke-retest recipe (v0.2.1)

Copy-paste into a **fresh** Claude Code session in any working dir. Pastes results back at the end.

```text
You are smoke-testing the simon-productivity plugin v0.2.1 at:
  /Users/simonsangla/projects/simon-productivity

Run three tests sequentially. Report results in the format at the bottom.

────────────────────────────────────────
TEST 0 — INSTALL (Simon types these, not the agent)
────────────────────────────────────────
Simon will run these manually:
  /plugin marketplace add /Users/simonsangla/projects/simon-productivity
  /plugin install simon-productivity
Confirm version reported as 0.2.1.

────────────────────────────────────────
TEST B — PLUGIN SCAFFOLD (clean tree after scaffold)
────────────────────────────────────────
In shell:
  mkdir -p ~/tmp/sp-smoke-021 && cd ~/tmp/sp-smoke-021 && git init -q

Then in Claude:
  /simon-productivity:start plugin

Description prompt → "Smoke test v0.2.1 — delete after"

Verify with shell:
  cd ~/tmp/sp-smoke-021 && \
    ls -la && \
    jq empty .claude-plugin/plugin.json && jq empty .claude-plugin/marketplace.json && \
    grep -rn "{{" . --include="*.md" --include="*.json" --include="*.yml" 2>/dev/null | grep -v ".git/" || echo "no unsubstituted placeholders" && \
    git log --oneline -3 && \
    git status

Pass criteria:
  - 7 files stamped, all manifests valid, no leftover {{ }} tokens
  - Exactly 1 local commit
  - git status: CLEAN working tree (this is the v0.2.1 fix)
  - Skill output told Simon to re-run start (no args) for plugin-dev init

────────────────────────────────────────
TEST C — IDEMPOTENCY on simon-productivity itself
────────────────────────────────────────
In shell:
  cd /Users/simonsangla/projects/simon-productivity && git rev-parse HEAD > /tmp/before.txt
  find . -type f -not -path "./.git/*" | sort > /tmp/before-files.txt

Then in Claude:
  /simon-productivity:start

Verify in shell:
  cd /Users/simonsangla/projects/simon-productivity && \
    git rev-parse HEAD > /tmp/after.txt && diff /tmp/before.txt /tmp/after.txt && \
    find . -type f -not -path "./.git/*" | sort > /tmp/after-files.txt && \
    diff /tmp/before-files.txt /tmp/after-files.txt && echo "file list unchanged" && \
    git status

Pass criteria:
  - HEAD unchanged
  - File list unchanged (no stray dashboard.html created — this is the other v0.2.1 fix)
  - git status: clean

────────────────────────────────────────
CLEANUP
────────────────────────────────────────
  rm -rf ~/tmp/sp-smoke-021 /tmp/before*.txt /tmp/after*.txt
  /plugin uninstall simon-productivity
  /plugin marketplace remove simon-productivity

────────────────────────────────────────
REPORT BACK
────────────────────────────────────────
TEST 0: PASS | FAIL — <one line>
TEST B: PASS | FAIL — clean tree: yes/no, commits: 1, unsubstituted: none
TEST C: PASS | FAIL — HEAD: <sha> unchanged, files: unchanged, status: clean
```

## How to resume in a fresh session

```
cd ~/projects/simon-productivity
# Read these in order:
#   1. HANDOFF.md (this file)
#   2. TASKS.md (current backlog)
#   3. CLAUDE.md (project conventions + claude-config sync rules)
#   4. memory/ (project-local memory tier)
git log --oneline -10   # see what's landed since this handoff was written
```

Parent workspace context loads automatically from `~/projects/CLAUDE.md` (three-track setup, compliance gate, glossary) and `~/.claude/CLAUDE.md` (global rules: caveman style, PR-only after root commit, no `git add -A`).
