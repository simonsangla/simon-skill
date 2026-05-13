# Handoff — simon-productivity

> Last updated: 2026-05-13 (session 4). Read this first; check `TASKS.md` for current backlog state, `git log --oneline -10` for what's landed since, `gh pr list --state=open` for in-flight branches.

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
| `1038d3e` (#8) | `start` / `update` skills made folder-agnostic; hard-coded tracks removed. |
| `49ec5aa` (#9) | New `portuguese-tax-and-benefits` skill: SKILL.md + 5 references (`iefp-seg-social`, `irs`, `property-tax`, `clarifying-questions`, `cross-border`, `sources`). 2025 IAS/figures. |
| `064928e` (#10) | Session 3 close-out — TASKS triage + memory refresh. |
| `51ab92f` (#11) | Dashboard kanban view — semantic column rails + soft WIP hints. |
| `030eb81` | Session 3 sync log — PRs #10 + #11 merged. |
| _pending_ (`feat/portuguese-tax-2026-refresh`) | **2026 refresh of portuguese-tax-and-benefits**: SKILL.md + 4 existing references replaced from Desktop master (IAS €537,13 / SMN €920 / IMT Jovem €330 539/€660 982 / IRS Jovem 55×IAS = €29 542,15 / AIMI 2026 deductions €600k/€1,2M / IFICI implementing chain Portaria 352/2024 + 52-A/2025 / Subsídio Parcial Guia 6002 v4.41 with worked examples / IRS escalões 2026 +3,51% + −0,3pp on 2–5). **New file `references/self-employed-seg-social.md`** — entire trabalhador-independente regime (CRCSPSS Art. 132–168, taxa 21,4%, declaração trimestral, isenção 12m, pluriactividade dispensa 4×IAS, MOE, economic dependence >50%). Bumped to v0.4.0. |

**Sibling work** in `~/projects/claude-config` ([PR #19](https://github.com/simonsangla/claude-config/pull/19), commit `129b13d`): added `memory/simon-productivity-plugin.md` (reference type, user scope) indexed under "Claude Code harness" in `MEMORY.md`. Cross-linking complete.

Repo is at **v0.2.1** on `main` (still — no version bump in session 2). Three OPEN PRs from session 2, none merged yet:

| PR | Branch | What it does |
|---|---|---|
| [#6](https://github.com/simonsangla/simon-productivity/pull/6) | `feat/update-review-skill` | **WIP A/B test skill** — `/simon-productivity:update-review`. Same scan as `update --comprehensive` + a final HTML render step. `disable-model-invocation: true`. Template at `skills/update-review/templates/review.html` (placeholder shell, no real data). Plugin version NOT bumped — promotion gated on comparison test. |
| [#7](https://github.com/simonsangla/simon-productivity/pull/7) | `feat/automation-recommendations` | **Plugin-dev automation bundle** — 2 hooks (template-sync warn + `git add -A` block), `/validate` slash command (local CI mirror), `bump-version` skill (atomic 3-field SemVer bump), `plugin-release-reviewer` subagent (8-check pre-tag review with privacy gate). Hooks ship as code; activation gated behind `cp .claude/settings.json.example .claude/settings.json` (denied as self-modification of agent config). |

**Sibling PR** [claude-config#20](https://github.com/simonsangla/claude-config/pull/20) is **PARKED** per scope lock. Session 2 user instruction: "Do not modify claude-config for now. Leave it untouched. We will test the new skill output against the old skill before changing the shared Claude configuration." Three bot reviews on #20 surfaced 3 valid findings (see "What didn't work" below) — they're signal for `update-review` skill design, not action items on #20.

## Session 2 context (2026-05-12 PM)

- Started from clean `main` at v0.2.1; ended with 3 open PRs.
- User's question "should we merge simon-productivity into claude-config / rename to `skills`?" → resolved as **keep `simon-productivity` name, keep the 3-repo split**: claude-config = private dotfiles + cowork user data, simon-productivity = shippable plugin code (going public), `~/projects/` symlinks = ergonomic shortcuts. Merging or renaming carries cost > benefit when the only friction is "two install models for two audiences."
- `/simon-productivity:update --comprehensive` 5th run from this repo surfaced: Mercor $70/hr offer expiring 2026-05-23 (Scenario A gate-blocked), `spinto@spptaxes.pt` 2nd IRS reminder (firm relationship to Cristina unclear), Mindrift identity-check email (mailbox-name suspicion, NOT subdomain — I framed it wrong, codex caught it), Drive folder IDs returning 0 files. Most of this was already in cowork TASKS.md from earlier scheduled runs.

## What worked

- **`repo-bootstrap` skill as the spine** for the initial scaffold. Even though it's calibrated for Vite/React/TS frontend apps and this is a plugin repo (markdown + JSON), the security baseline / branch-protection / PR-workflow discipline transferred cleanly. Adapt build gates per repo type (here: `jq empty` on JSON manifests + Python frontmatter lint on SKILL.md instead of lint+typecheck+test+build).
- **Templates as the source of truth for new-plugin scaffolding.** `skills/start/templates/` mirrors this repo's hygiene state with `{{PLACEHOLDER}}` substitution. CLAUDE.md documents the sync rule (changing hygiene file → update template in same commit). Convention-only, not CI-enforced.
- **PR-only workflow after root commit.** Every change after `493a21d` went through a branch + PR + green CI + squash merge with `--admin --delete-branch`. Branch protection itself is blocked (private repo on free plan) but the discipline is in place.
- **Two-repo coordination via parallel branches**, not one bundled commit. The claude-config cross-link shipped as its own PR (#19) in its own repo without touching Simon's unrelated WIP edits on `cowork/TASKS.md`.
- **Parallel-skill pattern for A/B testing a skill change.** Instead of editing `update` in place, `update-review` was created alongside (PR #6). Both can be invoked on the same scan input; comparison test catches divergence before the production skill changes. Same shape Anthropic uses for `xlsx` / `xlsx-v2` etc. Keeps `update` stable while iterating on the render-HTML idea.
- **Hooks shipped as code, activation gated behind a user-typed copy step.** Writing a project-level `.claude/settings.json` that registers `PreToolUse(Bash)` is denied as "self-modifying agent configuration." Workaround: ship `.claude/settings.json.example` + live file is `.gitignore`d. User flips on after review. Pattern is clean — review-before-activate fits the security model and the hooks bundle still got into one PR.
- **Smoke-testing hooks against fixture stdin** before pushing. 8 cases (template-sync trigger + non-trigger; `git add -A` / `.` / `--all` / chained-after-`&&` block; `git add README.md` and `git add .github/...` allow) — all pass. Catches the matcher-regex edge cases (`.` vs `./` vs `.github/...`) that would otherwise show up in production.
- **Cross-model bot review on PR #20.** Even though that PR is parked, Codex + Gemini found a real factual error in my own work (the Mindrift "subdomain mismatch" framing was wrong — both addresses share `notify.mindrift.ai`, only the mailbox differs). Useful regardless of merge decision because the same error class will recur in `update`'s output.

## What didn't work

- **`/plugin marketplace add` and `/plugin install` from subagent tool context.** The TEST 0 smoke-test step failed because slash commands are user-typed session built-ins, not callable from a tool environment. Future smoke tests of the install path require an interactive Simon-typed test in a fresh Claude Code session.
- **Initial assumption that scaffold should chain into normal init.** v0.2.0 of the `start` skill auto-ran TASKS.md + memory/ + dashboard.html creation right after the scaffold commit, leaving untracked files in the working tree. Fixed in v0.2.1 by decoupling — scaffold ends clean, user re-runs `start` (no args) when ready for plugin-dev init.
- **Initial assumption that `dashboard.html` lives at repo root for plugin source repos.** Lingering misapplication of productivity-track logic. The canonical location is `skills/dashboard.html` (per the `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html` reference inside the SKILL.md files). v0.2.1 cleanup removed every root-level dashboard mention from the Plugin source track.
- **Cache lag in the current session.** This session pinned the plugin from `~/Library/Application Support/Claude/local-agent-mode-sessions/.../plugin_01PG.../` at boot. v0.2.x version bumps in the repo do not propagate — running `/simon-productivity:start` in this session uses the cached v0.1.0-ish code, not the on-disk v0.2.1. Restart Claude Code in a fresh terminal to pick up new versions. **Carries into session 2:** `update-review`, `bump-version`, `/validate`, `plugin-release-reviewer` agent, and the hooks are all on-disk but invisible to this session's cached plugin. Validation of any of these requires a fresh Claude Code session.
- **Initial framing of the Mindrift identity-check email as a "subdomain mismatch".** Both `info@notify.mindrift.ai` and `updates@notify.mindrift.ai` share the same subdomain (`notify.mindrift.ai`); only the mailbox name differs. Mailbox-name spoofing is still a phishing vector worth flagging, but the language I used in cowork TASKS.md (PR #20) was wrong. Codex bot caught it. Lesson: phishing claims must cite header evidence (SPF/DKIM, Return-Path, link target), not folk domain analysis.
- **Initial impulse to consolidate the three repos.** Across multiple turns Simon asked "should we move user data into simon-productivity?" then "should everything go to claude-config?" then "should we rename to `skills` and consume from claude-config?" The right answer in all three cases was no — the documented split (private dotfiles ≠ public-bound plugin code ≠ user data) exists for privacy + distribution-model reasons, not aesthetics. Three "merge them" pitches in one session is signal that the rationale for the split should be more findable; HANDOFF + CLAUDE.md now make it explicit.

## Next steps

**The three open PRs need user decisions before anything else moves.**

1. **PR #7 (automation bundle) — review + decide on hook activation** (~10 min).
   - Read the two hook scripts and the `.example` settings file.
   - If happy: `cp .claude/settings.json.example .claude/settings.json` to flip hooks on in this repo.
   - Start a fresh Claude Code session and verify both hooks fire on the manual test plan in the PR description (edit README → expect template-sync warning; try `git add -A` → expect refusal).
   - Merge PR #7 once verified. Hooks become live discipline for plugin-dev work in this repo.

2. **PR #6 (`update-review` WIP skill) — comparison test** (~30 min in fresh session).
   - The whole point of `update-review` is to verify it produces the same text report as `update --comprehensive` PLUS an HTML render.
   - Recipe in `skills/update-review/SKILL.md` "Comparison-test protocol".
   - **Hard requirement: fresh Claude Code session** — this session's cached plugin will not see the new skill (see Cache lag note above).
   - After comparison passes: pick the promotion path documented in the skill (fold into `update`, keep both, or add `--render` flag).
   - Hygiene-checklist add candidate (from session 2 bot reviews): phishing claims must cite header evidence, not domain folk-analysis; date-relative phrasing must be refreshed when the file is touched; anything mentioned in a Done log must have a matching Active/Waiting On entry.

3. **claude-config PR #20 — decide whether to push fixes or close** (user only).
   - **Scope-locked** — Claude should not touch claude-config without lifted instruction.
   - Bot reviews surfaced 3 valid findings (subdomain framing wrong, stale countdown line, missing-from-Active items). Two of these will be caught by future `update-review` runs if the hygiene checklist lands. The factual error (subdomain) is purely a content fix.
   - Options: push 1-commit fix to #20 from your own session, OR close #20 and let the next `update`/`update-review` run naturally produce a clean replacement, OR leave parked indefinitely.

Then the four older Someday items (rough order of value × effort):

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
