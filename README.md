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

## Skills

| Skill | Role | Invocation |
|-------|------|------------|
| `start` | Initialize the system. Track-aware. Bootstraps from existing CLAUDE.md/memory if present. | User-invocable |
| `update` | Keep state current. Track-aware. Vercel + GitHub built in. | User-invocable |
| `task-management` | `TASKS.md` format and editing conventions. | Claude-only (`user-invocable: false`) |
| `memory-management` | Two-tier memory architecture (`CLAUDE.md` hot cache + `memory/` directory). | Claude-only (`user-invocable: false`) |

## Connectors

See [CONNECTORS.md](CONNECTORS.md) for the full map of which tool feeds which step. Pre-wired in [`.mcp.json`](.mcp.json): Slack, Notion, Asana, Linear, Atlassian, MS365, monday, ClickUp, Gmail, Google Calendar, Google Drive, Apple Notes, Vercel, Figma, Context7, GitHub (placeholder; uses `gh` CLI in practice).

## Development

This repo is the plugin's source. Its own [CLAUDE.md](CLAUDE.md) documents the dev workflow. Backlog lives in [TASKS.md](TASKS.md).

## License

[MIT](LICENSE)
