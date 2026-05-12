# Connectors

This plugin is pre-wired for Simon's actual stack. The `start` and `update` skills name concrete tools (Gmail, Google Calendar, Vercel, GitHub, etc.) rather than generic categories. Where a remote MCP isn't connected, skills fall back to a CLI shell-out (`gh`) or skip the source.

## Connector map

| Category | Tool | Source / how it's wired | Used by |
|---|---|---|---|
| Email | Gmail | Cowork bundled MCP | start, update |
| Calendar | Google Calendar | Cowork bundled MCP | start, update |
| Documents / files | Google Drive | Cowork bundled MCP | start, update (Job_Search / jobs / job_utils folders) |
| Notes | Apple Notes | Cowork bundled MCP (desktop only) | start, update (Lab pile, Pompt Library) |
| Deployments | Vercel | Cowork bundled MCP | update (Carcassonne, simon-platform apps, MetricPilot) |
| Design | Figma | Cowork bundled MCP | update (optional) |
| Issues / PRs | GitHub | No remote MCP — `gh issue list --assignee=@me`, `gh pr list --author=@me` | update (simon-platform repo work) |
| Tickets | Linear | Remote MCP (optional) | update (if used) |
| Library docs | Context7 | Remote MCP | dev skills |
| Chat | Slack | Remote MCP (not currently used by Simon) | update (skipped if not connected) |
| Knowledge base | Notion | Remote MCP (not currently used) | update (skipped if not connected) |
| Project tracker | Asana / Atlassian / monday.com / ClickUp / MS365 | Remote MCPs (not currently used) | update (skipped if not connected) |

## Track-aware behavior

The plugin recognizes Simon's three concurrent tracks. The `start` and `update` skills detect the active working directory and scope their checks accordingly:

| Track | Working dir | Key external surfaces |
|---|---|---|
| Job search | `/Users/simonsangla/projects/job/job/` | Gmail (recruiter threads), Calendar (interview slots, IEFP), Drive (`Job_Search`, `jobs`, `job_utils`), Apple Notes |
| MetricPilot | `/Users/simonsangla/projects/metricpilot/` | Vercel (deploys), Gmail (customer conversations), Drive |
| simon-platform | `/Users/simonsangla/projects/simon-ops/simon-platform/` | GitHub (`gh`), Vercel (per-app previews), Calendar |
| Workspace root | `/Users/simonsangla/projects/` | All of the above |

If the working dir is none of these, the skills run in generic mode (just `TASKS.md` + memory in CWD).

## Compliance gate

The `update` skill is aware of Simon's Scenario A compliance gate (IEFP green light → AT atividade independente open → Seg Social notified within 5 working days → monthly billing < €767 brut). If it sees a task or email proposing acceptance of paid work, it flags it rather than auto-completing — and references `/Users/simonsangla/projects/CLAUDE.md` for the hard rule.

## Connecting / disconnecting tools

These connectors are bundled by Cowork; auth happens in the app, not in this plugin. To check what's connected right now, open the Cowork connectors panel. The entries in `.mcp.json` declare the categories the plugin understands — actual connection state is independent.
