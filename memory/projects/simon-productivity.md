# Project: simon-productivity (this repo)

## What it is

Source repo for the **`simon-productivity` Claude Code plugin** — the four-skill productivity bundle Simon already uses (`start`, `update`, `task-management`, `memory-management`).

Currently the plugin lives only in the local Claude session cache at:

```
~/Library/Application Support/Claude/local-agent-mode-sessions/.../plugin_01PGVaLEcQhDYUqu5FeM7juT/
```

Goal: move it into this git repo so it's:
- Versioned + reviewable
- Installable on other machines via `/plugin marketplace add simonsangla/simon-productivity`
- Distributable to other people (eventually public)

## Target layout

```
simon-productivity/
├── .claude-plugin/
│   ├── plugin.json            # plugin manifest (name, version, components)
│   └── marketplace.json       # marketplace listing (so the repo is installable)
├── skills/
│   ├── start/SKILL.md
│   ├── update/SKILL.md
│   ├── task-management/SKILL.md
│   ├── memory-management/SKILL.md
│   └── dashboard.html         # shared asset, referenced via ${CLAUDE_PLUGIN_ROOT}
├── .github/
│   └── workflows/lint-skills.yml   # frontmatter lint on PR
├── CLAUDE.md                  # this repo's project guide
├── TASKS.md                   # plugin-dev backlog
├── memory/                    # plugin-dev memory tier
└── README.md                  # install + usage docs
```

## Plugin distribution model (how "hosting" works)

Claude Code plugins are **git-hosted**, not registry-published. The flow:

1. Repo contains `.claude-plugin/marketplace.json` declaring one or more plugins.
2. User runs `/plugin marketplace add simonsangla/simon-productivity` (or full git URL).
3. User runs `/plugin install simon-productivity` to install it.
4. Updates ship via git tags — users run `/plugin update` to pull.

No npm, no PyPI, no Anthropic registry. GitHub + a manifest = "hosted."

## Active worktrees / branches

None. `main` clean at v0.3.0.

## Status (2026-05-12 — session 3 close)

Bootstrap fully complete. Plugin shipping at **v0.3.0** with 8 skills + 1 command + 2 hooks + 1 agent.

- [x] Empty repo created on GitHub
- [x] CLAUDE.md + dashboard.html + TASKS.md + memory/ seeded (session 1)
- [x] Plugin manifest + marketplace.json (commit `493a21d`, v0.0.1)
- [x] Skills ported from local plugin cache → `start`, `update`, `task-management`, `memory-management` (PR #2, v0.1.0)
- [x] `start` teaches plugin-source scaffolding via `plugin` arg (PR #3, v0.2.0)
- [x] Smoke-test findings fixed (PR #4, v0.2.1)
- [x] Automation bundle: 2 hooks + `/validate` + `bump-version` skill + `plugin-release-reviewer` agent (PR #7, hooks activated in this repo via `.claude/settings.json` with `$CLAUDE_PROJECT_DIR` paths)
- [x] `update-review` WIP A/B-test skill alongside `update` (PR #6) — promotion path pending comparison test
- [x] `start` + `update` made folder-agnostic — dropped hard-coded job/MetricPilot/simon-platform tracks (PR #8, v0.3.0)
- [x] `portuguese-tax-and-benefits` skill (PR #9) — exercised in real session 2026-05-12; see `memory/projects/portuguese-tax-and-benefits.md` for validation notes
- [ ] First public release tagged (gated on `flip repo to public` Someday task)

## Active TASKS.md items (2026-05-12)

1. Compare `/update --comprehensive` vs `/update-review` text reports (test recipe in `skills/update-review/SKILL.md`)
2. Decide promotion path for `update-review` (fold / keep / `--render` flag)
3. Refresh `HANDOFF.md` (stale — snapshots session 2 close, pre-#8/#9)

## Bundled skills inventory (v0.3.0)

| Skill | Type | Notes |
|---|---|---|
| `start` | user-invocable | Init TASKS.md + memory + dashboard. Folder-agnostic since PR #8. Has `plugin` arg for scaffolding new plugin repos. |
| `update` | user-invocable | Sync from external sources. Folder-agnostic since PR #8. |
| `update-review` | user-invocable (`disable-model-invocation: true`) | WIP A/B of `update` + HTML render. Promotion pending. |
| `task-management` | Claude-only (`user-invocable: false`) | Background: read/write TASKS.md. |
| `memory-management` | Claude-only (`user-invocable: false`) | Background: two-tier memory (CLAUDE.md + memory/). |
| `bump-version` | user-invocable | Atomic 3-field SemVer bump (plugin.json + marketplace.json + README). |
| `portuguese-tax-and-benefits` | user-invocable | IRS / property tax / IEFP / Seg Social / cross-border. Source-first discipline, 6-section answer template. |
| `dashboard.html` | asset | Shared static asset referenced via `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html`. |
