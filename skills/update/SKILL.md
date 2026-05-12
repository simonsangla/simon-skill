---
name: update
description: Sync tasks and refresh memory from Simon's current activity. Pulls from GitHub (gh CLI), Vercel, Gmail, Google Calendar, Google Drive, Apple Notes, optionally Linear. Triages stale tasks, fills memory gaps, flags compliance-gate violations (Scenario A) and unverified "done" claims (simon-platform §1–§7).
argument-hint: "[--comprehensive]"
---

# Update (simon-productivity)

> Connector reference: [CONNECTORS.md](../../CONNECTORS.md).

Keep the task list and memory current. **Track-aware** — scopes external-source checks to the detected working directory.

Two modes:

- **Default:** Sync tasks from external tools, triage stale items, check memory for gaps. Fast.
- **`--comprehensive`:** Deep scan Gmail, Calendar, Drive, Apple Notes, Vercel, GitHub — flag missed todos, suggest new memories, surface stale entities.

## Usage

```bash
/simon-productivity:update
/simon-productivity:update --comprehensive
```

## Detect track

Use the same logic as `start`. Scope all external-source checks to the detected track:

| Track | External sources checked |
|---|---|
| Job search | Gmail (recruiter threads), Calendar (interviews, IEFP), Drive (Job_Search / jobs / job_utils), Apple Notes |
| MetricPilot | Vercel (deploys), Gmail (customer conversations), Drive (MetricPilot folder), Calendar |
| simon-platform | GitHub (`gh`), Vercel (per-app previews), Calendar |
| Workspace root | All three sequentially; present grouped by track |
| Generic | Skip external sources; only triage TASKS.md in CWD |

## Default mode

### 1. Load current state

Read `TASKS.md` and the `memory/` directory in the working directory. Also read `/Users/simonsangla/projects/CLAUDE.md` and any per-track CLAUDE.md for cross-track context (compliance gate, §1–§7 rules, active people).

If `TASKS.md` or `memory/` is absent, suggest `/simon-productivity:start` first and stop.

### 2. Sync tasks from external sources

Run only the subset relevant to the detected track.

**GitHub** (simon-platform, workspace root) — shell out:

```bash
gh issue list --assignee=@me --state=open --json number,title,repository,url --limit 50
gh pr list --author=@me --state=open --json number,title,repository,url --limit 50
```

For each result not in `TASKS.md`, propose adding (include the URL). If `gh auth status` fails, note it and continue without GitHub.

**Vercel** (MetricPilot, simon-platform, workspace root) — use the Vercel MCP:

- `list_projects` to enumerate active surfaces
- For each project, `list_deployments` (last 10) → flag any failed/error builds on `production` or the most recent preview
- For flagged failures, fetch `get_deployment_build_logs` and propose a "fix failing build" task with the log summary

Skip Vercel for the job-search track (no Vercel deployments there).

**Linear** (optional, if MCP connected and `list_issues` returns results) — list issues assigned to Simon. Currently Simon doesn't track work in Linear, so this is a no-op unless that changes.

**Google Calendar** — `list_events` for the next 7 days. Surface:

- Interview slots (anything matching recruiter pattern: Mercor, Malt, Outlier, Alignerr, HumanIT, Oliver James, Mindrift) → propose prep task
- IEFP / AT / Seg Social appointments → propose prep task and flag against Scenario A
- Cal.com bookings (MetricPilot "Root-Cause Scoping Call") → propose prep task
- Recurring meetings without a memory entry → flag for memory enrichment

**Gmail** — search recent threads (last 7 days). Surface anything containing a commitment or deadline:

- Recruiter messages with action items
- IEFP / AT / Seg Social correspondence
- Customer questions (MetricPilot)
- Mercor / HumanIT / Malt / Outlier / Alignerr threads

For each, propose a task with the thread reference.

**Google Drive** — list recently modified files in track-specific folders:

- Job search: `Job_Search` (`1U8s1hd_h9X8mkQVzqXbdkPRlYh-OXAtw`), `jobs` (`1SQsUBxGou4Qi2P7dwHY9NKW9M2ou6M1l`)
- MetricPilot: MetricPilot folder if present
- New files → propose triage task (especially `Job_Search` leads from Paula's sheet)

**Apple Notes** — check Lab pile and Pompt Library for new entries since last update. New idea → add to lab backlog (NOT TASKS.md Active, unless explicitly actionable). Desktop-only; skip silently if unavailable.

### Diff format

For each external source, present a diff table and let Simon batch-decide:

| External item | TASKS.md match? | Action |
|---|---|---|
| Found externally, not in TASKS.md | No match | Offer to add |
| Found externally, already in TASKS.md | Fuzzy title match | Skip |
| In TASKS.md, source done/closed/merged | No active source | Offer to mark done |
| In TASKS.md, active 30+ days, no source equivalent | — | Flag as stale |

### 3. Triage stale items

Review the Active section of TASKS.md:

- Tasks with past due dates → ask: done? reschedule? move to Someday?
- Tasks active 30+ days with no recent activity → ask
- Tasks referencing a person/project no longer in memory → flag for cleanup

### 4. Decode tasks for memory gaps

For each Active task, decode all entities (people, projects, acronyms, URLs) against the tiered cache:

1. CWD `CLAUDE.md` (hot cache)
2. Parent `/Users/simonsangla/projects/CLAUDE.md` (cross-track hot cache)
3. Per-track `memory/` directories

Track which entities decode cleanly vs. which have gaps.

### 5. Fill gaps

Present unknown terms grouped:

```
Terms in your tasks I don't have context for:

1. "[term]" (from: "[task title]")
   → What is this?
```

Update the right memory file (CWD `memory/` for local terms, `/Users/simonsangla/projects/memory/` for cross-track terms).

### 6. Capture enrichment

When tasks contain richer context than memory, extract and update:

- Links → add to project / people files
- Status changes ("X launched") → update project status, consider demoting from CLAUDE.md
- Relationships ("X's sign-off on Y's proposal") → cross-reference in people files
- Deadlines → add to project files

### 7. Compliance gate check (HARD RULE)

If any task or external message proposes accepting paid work, do **NOT** auto-complete or auto-add as accepted. Surface explicitly:

```
COMPLIANCE GATE — paid work proposal detected.

Reference: /Users/simonsangla/projects/CLAUDE.md (Scenario A hard rule)

Scenario A status (Simon must confirm before accepting):
  [ ] IEFP advisor (Marta Sousa Fontoura) green light
  [ ] Atividade independente open at AT
  [ ] Seg Social notified within 5 working days
  [ ] Monthly billing stays < €767 brut (< 1 IAS rendimento relevante)

Until all 4 are confirmed, do NOT accept paid work.
```

### 8. simon-platform §1–§7 check (simon-platform track only)

If the detected track is simon-platform, scan the Active section of TASKS.md for any task claiming "done" without verified-facts evidence (test logs, preview URL screenshot, 6-gate green: 0 failing tests / 0 warnings / 0 deprecations / 0 build errors / 0 console errors / 0 unresolved preview issues).

Flag each such task for re-verification. Do not let an unverified "done" stand.

### 9. Report

```
Update complete — [track]:

External sync:
- GitHub: +X issues, +Y PRs (Z merged)
- Vercel: [build status summary, e.g. "all green" or "irs preview failing"]
- Calendar: X events surfaced
- Gmail: X threads with action items
- Drive: X new files in [folder]
- Notes: X new lab entries

Triage:
- X stale flagged, Y completed
- X compliance flags (Scenario A)
- X unverified-done flags (simon-platform §1–§7)

Memory:
- X gaps filled, Y entities enriched
- Z new entities suggested for memory (see comprehensive mode for full review)
```

## Comprehensive mode (`--comprehensive`)

Everything in default mode, plus deep multi-source scan independent of track.

### Extra: deep scan all sources

- **Gmail** — last 30 days, sent + received
- **Calendar** — last 30 + next 30 days
- **Drive** — all recently-modified in `/jobs`, `/Job_Search`, `/MetricPilot`, any per-track folder
- **Apple Notes** — all notes updated since last comprehensive scan
- **GitHub** — `gh issue list --state=all --limit 100` across owned repos; `gh pr list --state=all --limit 100`
- **Vercel** — all projects, last 30 deployments each

### Extra: flag missed todos

Compare activity against TASKS.md. Surface action items that never made it into the task list:

- Commitments Simon made in sent email ("I'll send X by Friday")
- Action items from meetings without a follow-up task
- Todos mentioned in chat / notes that never made it to TASKS.md

Let Simon pick which to add.

### Extra: suggest new memories

Group suggestions by confidence:

- **High** (≥ 5 mentions in distinct contexts) → offer to add directly
- **Medium** → ask for one-line context, then add
- **Low** (1–2 mentions) → note for later

Categories: people, projects, terms, tools, recruiter relationships.

### Extra: cleanup suggestions

- Projects with no mentions in 30 days → mark stale?
- People not contacted in 60 days → demote from CLAUDE.md hot cache to `memory/people/` only?
- Glossary terms never referenced → demote / remove?

## Notes

- Never auto-add tasks or memories without Simon's confirmation.
- External-source links are preserved in TASKS.md when available.
- `gh` CLI is the GitHub source of truth — no remote GitHub MCP is wired.
- Compliance gate is non-negotiable. Always flag, never auto-complete.
- `--comprehensive` always runs interactively — no silent updates.
- Apple Notes is desktop-only; skip silently if the MCP is unavailable.
- For simon-platform, honor §1–§7: verified-facts-only reporting, no "should work" claims.
