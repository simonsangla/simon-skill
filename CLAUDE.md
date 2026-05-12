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

## When real code lands, this file should grow these sections

- **Commands** — build / lint / typecheck / test (incl. single-test invocation), dev server, deploy.
- **Architecture** — only the big-picture relationships that span multiple files (plugin manifest → skill loader → skill `SKILL.md` discovery, or whatever the chosen shape is). Skip anything discoverable from `ls`.
- **Conventions** — anything that diverges from `~/.claude/CLAUDE.md` defaults (e.g. branch policy override, lint baseline, scope rules).

Do not pre-populate these from a template. Write them once the code actually exists.
