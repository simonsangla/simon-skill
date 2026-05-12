# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Greenfield. No code yet. Remote: `github.com/simonsangla/simon-productivity`. Single branch `main`, no commits.

When picking up work here, infer scope from the first concrete request and update this file as architecture lands. Do not invent structure that isn't there.

## Intended purpose (inferred — confirm with user before assuming)

Name and parent workspace (`~/projects/CLAUDE.md`) suggest this repo will hold the source for the **`simon-productivity` Claude Code plugin** — the same plugin currently providing these skills in Simon's environment:

- `simon-productivity:start` — three-track productivity init (job search + MetricPilot + simon-platform)
- `simon-productivity:update` — sync tasks/memory from GitHub, Vercel, Gmail, Calendar
- `simon-productivity:task-management` — shared `TASKS.md` workflow
- `simon-productivity:memory-management` — two-tier memory (decodes shorthand, acronyms, nicknames)

If a different purpose is requested, replace this section rather than layering on top.

## Workspace context (load before editing)

- `~/projects/CLAUDE.md` — three-track setup (simon-platform / job search / MetricPilot), compliance gate (PT employment, Scenario A), people decoder ring, glossary.
- `~/.claude/CLAUDE.md` — global rules: caveman style intensity 1, plan-first sketch gate, preflight (Python 3.11+, no Drive/iCloud paths), stage checkpoints, branch-per-task, no direct-to-main.
- `~/.claude/projects/-Users-simonsangla-projects-simon-productivity/memory/` — project-local memory tier for this repo. Read before grep.

The compliance gate (no paid AI eval work until Scenario A confirmed) and simon-platform's §1–§7 quality bar apply across all tracks — push back if a request violates either.

## Centralized config sibling (`~/projects/claude-config/`)

This plugin is the **template + code**. Simon's **runtime instance** of its output lives elsewhere — keep them in sync mentally, never edit one expecting the other to follow.

| Surface | Path | Role |
|---------|------|------|
| Plugin source | `~/projects/simon-productivity/` (this repo) | The four skills + `dashboard.html` + manifests. Distributed via `/plugin install`. |
| Global Claude config | `~/projects/claude-config/` | Symlinked into `~/.claude/` by its `setup.sh`. Holds `CLAUDE.md`, hooks, generic skills (not plugin-namespaced), settings. |
| Runtime productivity data | `~/projects/claude-config/cowork/` | Simon's actual `TASKS.md` + `memory/` + `dashboard.html` for cross-track use. Maintained by `/simon-productivity:start` and `/simon-productivity:update`. |

**Conventions inherited from claude-config (apply here too):**
- Conventional commits with scoped types: `feat(skill): …`, `feat(memory): …`, `chore(config): …`, `docs: …`.
- Skills with side effects use `disable-model-invocation: true` (user-only).
- Background-knowledge skills use `user-invocable: false` (Claude-only).
- CI = JSON + YAML manifest validity + SKILL.md frontmatter lint. No JS/TS build gates (no JS/TS code).
- Pin GitHub Actions to full commit SHA; Dependabot updates them weekly.
- No `git add -A` / `git add .` — stage files by name to avoid leaking secrets or stray artifacts.

**What this plugin does NOT use from claude-config:**
- `setup.sh` symlink-into-`~/.claude/` pattern. Plugin distribution goes through Claude Code's `/plugin marketplace add` + `/plugin install` instead. Editing the SKILL.md files here does **not** automatically update the installed plugin — bump the version and reinstall, or work directly inside the installed plugin's cache during iteration.

## Templates ↔ canonical files

`skills/start/templates/` mirrors this repo's bootstrap state with `{{PLACEHOLDER}}` substitution. When the `start` skill is invoked with `plugin` in an empty git repo, it stamps these templates out to scaffold a fresh plugin repo (LICENSE, .gitignore, README, .github/{dependabot.yml,workflows/ci.yml}, .claude-plugin/{plugin.json,marketplace.json}).

**Sync rule:** when changing any of this repo's hygiene files (`LICENSE`, `.gitignore`, `.github/dependabot.yml`, `.github/workflows/ci.yml`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `README.md`), update the matching template under `skills/start/templates/` in the same commit. CI does not enforce this — it's a convention. Drift means new plugins scaffolded with `/simon-productivity:start plugin` get an older hygiene baseline than this repo.

## When real code lands, this file should grow these sections

- **Commands** — build / lint / typecheck / test (incl. single-test invocation), dev server, deploy.
- **Architecture** — only the big-picture relationships that span multiple files (plugin manifest → skill loader → skill `SKILL.md` discovery, or whatever the chosen shape is). Skip anything discoverable from `ls`.
- **Conventions** — anything that diverges from `~/.claude/CLAUDE.md` defaults (e.g. branch policy override, lint baseline, scope rules).

Do not pre-populate these from a template. Write them once the code actually exists.
