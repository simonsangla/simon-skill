# simon-productivity

Forked from Anthropic's `productivity` plugin and customized for Simon Sangla's three-track setup (job search + MetricPilot + simon-platform). Same `TASKS.md` + working memory + dashboard pattern, but the `start` and `update` skills are rewired around Simon's actual connectors (Google trio, Apple Notes, Vercel, GitHub via `gh`, Figma, Linear, Context7) and aware of the hard compliance rules (Scenario A) and the §1–§7 execution rules of simon-platform.

## Installation

While the repo is private (current state), install from a local clone:

```text
/plugin marketplace add /absolute/path/to/simon-productivity
/plugin install simon-productivity
```

Once the repo is flipped to public:

```text
/plugin marketplace add simonsangla/simon-productivity
/plugin install simon-productivity
```

## Commands

| Command | What it does |
|---------|--------------|
| `/simon-productivity:start` | Detect which track you're in, initialize tasks + memory if missing, open the dashboard, do an optional bootstrap scan across Gmail / Calendar / Drive / Apple Notes / Vercel / GitHub. |
| `/simon-productivity:update` | Sync tasks from GitHub (`gh issue list --assignee=@me`), Vercel build status, optionally Linear; scan Gmail / Calendar / Drive / Notes for new action items; triage stale tasks; fill memory gaps; flag any compliance-gate violations. |
| `/simon-productivity:update --comprehensive` | Same plus a deep multi-source scan and new-entity suggestions. |
| `/simon-productivity:bump-version <major\|minor\|patch>` | Atomically bump the plugin version across `plugin.json` + both fields in `marketplace.json`. Refuses to run on a dirty tree. User-only. |
| `/validate` | Run the CI checks locally (`jq empty` on JSON manifests + SKILL.md frontmatter lint). |

## Skills

| Skill | Role | Invocation |
|-------|------|------------|
| `start` | Initialize the system. Track-aware. Bootstraps from existing CLAUDE.md/memory if present. | User-invocable |
| `update` | Keep state current. Track-aware. Vercel + GitHub built in. | User-invocable |
| `bump-version` | Coordinated SemVer bump across the three manifest fields. Refuses dirty tree, refuses pre-bump drift. | User-only (`disable-model-invocation: true`) |
| `task-management` | `TASKS.md` format and editing conventions. | Claude-only (`user-invocable: false`) |
| `memory-management` | Two-tier memory architecture (`CLAUDE.md` hot cache + `memory/` directory). | Claude-only (`user-invocable: false`) |

## Project automation (this repo only)

Project-level hooks + a release-readiness subagent for plugin-dev work. None of these ship with the installed plugin — they live in `.claude/` and only fire when Claude operates inside this repo.

| Surface | What it does | How to enable |
|---|---|---|
| `.claude/hooks/check-template-sync.sh` | PostToolUse warning when a hygiene file (`LICENSE`, `README.md`, `.gitignore`, CI workflow, plugin/marketplace manifest) is edited without the matching template under `skills/start/templates/`. Non-blocking. | Activate via the settings file below. |
| `.claude/hooks/block-git-add-all.sh` | PreToolUse(Bash) block on `git add -A`, `git add .`, `git add --all`. Exit 2 with stderr explanation. | Activate via the settings file below. |
| `.claude/agents/plugin-release-reviewer.md` | Read-only subagent. Run before `git tag vX.Y.Z`: checks version sync, HANDOFF changelog, template validity after placeholder substitution, privacy gate (no review HTML / personal data staged), CI status. | Available automatically — invoke by name. |

**Hook activation** (one-time, user-approved): `cp .claude/settings.json.example .claude/settings.json`. The `.example` file ships in this repo; the live `.claude/settings.json` is gitignored to avoid auto-applying hooks for anyone who clones the repo before reviewing them.

## Connectors

See [CONNECTORS.md](CONNECTORS.md) for the full map of which tool feeds which step. Pre-wired in [`.mcp.json`](.mcp.json): Slack, Notion, Asana, Linear, Atlassian, MS365, monday, ClickUp, Gmail, Google Calendar, Google Drive, Apple Notes, Vercel, Figma, Context7, GitHub (placeholder; uses `gh` CLI in practice).

## Development

This repo is the plugin's source. Its own [CLAUDE.md](CLAUDE.md) documents the dev workflow. Backlog lives in [TASKS.md](TASKS.md).

## License

[MIT](LICENSE)
