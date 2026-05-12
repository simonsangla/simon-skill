# Connectors

The `start` and `update` skills name concrete tools (Gmail, Google Calendar, Vercel, GitHub, etc.) rather than generic categories. Where a remote MCP isn't connected, skills fall back to a CLI shell-out (`gh`) or skip the source.

## Connector map

| Category | Tool | Source / how it's wired | Used by |
|---|---|---|---|
| Email | Gmail | Cowork bundled MCP | start, update |
| Calendar | Google Calendar | Cowork bundled MCP | start, update |
| Documents / files | Google Drive | Cowork bundled MCP | start, update |
| Notes | Apple Notes | Cowork bundled MCP (desktop only) | start, update |
| Deployments | Vercel | Cowork bundled MCP | update |
| Design | Figma | Cowork bundled MCP | update (optional) |
| Issues / PRs | GitHub | No remote MCP — `gh issue list --assignee=@me`, `gh pr list --author=@me` | update |
| Tickets | Linear | Remote MCP (optional) | update (if used) |
| Library docs | Context7 | Remote MCP | dev skills |
| Chat | Slack | Remote MCP | update (skipped if not connected) |
| Knowledge base | Notion | Remote MCP | update (skipped if not connected) |
| Project tracker | Asana / Atlassian / monday.com / ClickUp / MS365 | Remote MCPs | update (skipped if not connected) |

## How scope is decided

The skills are **folder-agnostic** — they operate on the current working directory and inherit context from any parent `CLAUDE.md` they can find on the upward walk. Per-folder scoping (which Gmail people to search for, which Drive folders to check, which GitHub repos to prioritize, which Vercel projects matter) comes from those inherited `CLAUDE.md` files, not from hard-coded paths in the skill.

If the current folder has no parent `CLAUDE.md`, the skills fall back to broad sweeps (last 7 days everywhere; broad Drive listings; all GitHub assignments) and let the user filter the surfaced items.

## Hard-rule gates and verification policies

The `update` skill respects any **hard rule** declared by a parent `CLAUDE.md` — a compliance gate, regulatory check, authorization requirement, or anything explicitly marked as gated. If a task or external message looks like it might trip such a rule, the skill flags it rather than auto-completing, and quotes the rule text from the parent file so the user can see exactly what they need to confirm.

Same idea for verification policies: if a parent `CLAUDE.md` declares what evidence a "done" claim requires (test logs, preview URL, deploy status, etc.), the skill flags any Active task claimed as done without that evidence.

The skills never invent rules the parent doesn't declare, and never silently skip rules the parent does declare.

## Connecting / disconnecting tools

These connectors are bundled by Cowork; auth happens in the app, not in this plugin. To check what's connected right now, open the Cowork connectors panel. The entries in `.mcp.json` declare the categories the plugin understands — actual connection state is independent.
