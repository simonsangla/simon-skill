# simon-productivity

Claude Code plugin: three-track productivity system (task management, two-tier memory, multi-source sync, local HTML dashboard).

> Status: scaffold only. Skills not yet ported into this repo — see [TASKS.md](TASKS.md).

## Install

```text
/plugin marketplace add simonsangla/simon-productivity
/plugin install simon-productivity
```

Requires the repo to be public on GitHub. Until then, install from a local clone:

```text
/plugin marketplace add /absolute/path/to/simon-productivity
/plugin install simon-productivity
```

## What's in it

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `start` | `/simon-productivity:start` | Init `TASKS.md` + `memory/` + `dashboard.html` for the active track (job search / MetricPilot / simon-platform / generic). |
| `update` | `/simon-productivity:update` | Sync tasks and memory from Gmail, Calendar, Drive, Vercel, GitHub, Apple Notes. |
| `task-management` | Auto (background) | Teaches Claude the `TASKS.md` read/write conventions. |
| `memory-management` | Auto (background) | Two-tier memory (`CLAUDE.md` hot cache + `memory/` deep tier). |

The dashboard (`dashboard.html`) is a static page that reads/writes the same `TASKS.md` — open it from Finder.

## Development

This repo is the plugin's source. Its own [CLAUDE.md](CLAUDE.md) documents the dev workflow. Backlog lives in [TASKS.md](TASKS.md).

## License

[MIT](LICENSE)
