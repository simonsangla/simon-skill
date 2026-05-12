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

None yet. `main` is empty pending first scaffold commit.

## Status (2026-05-12)

- [x] Empty repo created on GitHub
- [x] CLAUDE.md + dashboard.html + TASKS.md + memory/ seeded (this session)
- [ ] Plugin manifest + marketplace.json
- [ ] Skills ported from local plugin cache
- [ ] First public release tagged
