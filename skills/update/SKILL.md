---
name: update
description: Sync tasks and refresh memory from current activity. Pulls from GitHub (gh CLI), Vercel, Gmail, Google Calendar, Google Drive, Apple Notes, optionally Linear. Triages stale tasks, fills memory gaps, and flags any hard-rule violations declared in the local or parent CLAUDE.md (compliance gates, verification policies, unverified "done" claims).
argument-hint: "[--comprehensive]"
---

# Update (simon-productivity)

> Connector reference: [CONNECTORS.md](../../CONNECTORS.md).

Keep the task list and memory current. **Folder-agnostic** — the skill operates on the current working directory's `TASKS.md` + `memory/`, and inherits broader context (hard rules, key people, relevant folders) from any parent `CLAUDE.md` it can find on the upward walk.

Two modes:

- **Default:** Sync tasks from external tools, triage stale items, check memory for gaps. Fast.
- **`--comprehensive`:** Deep scan Gmail, Calendar, Drive, Apple Notes, Vercel, GitHub — flag missed todos, suggest new memories, surface stale entities.

## Usage

```bash
/simon-productivity:update
/simon-productivity:update --comprehensive
```

## Scope of external-source checks

The skill does not classify folders into hard-coded "tracks". Instead, **what to scan is parameterized by the local and parent CLAUDE.md files** that the upward walk surfaces:

- If a parent `CLAUDE.md` declares key people / organizations / recruiters, narrow Gmail + Calendar searches to those.
- If it names specific Google Drive folders (by ID or path), scope Drive checks to those.
- If it lists active GitHub repos or Vercel projects, prioritize those.
- If it declares **hard rules** (compliance gates, verification policies, quality bars), enforce them — see §7 and §8 below.

If no parent `CLAUDE.md` is present, fall back to broad sweeps (last 7 days everywhere) and let the user filter the surfaced items.

## Default mode

### 1. Load current state

Read `TASKS.md` and the `memory/` directory in the working directory. Walk the directory chain upward; read every `CLAUDE.md` you find along the way — they declare the rules, people, and surfaces this folder operates under.

If `TASKS.md` or `memory/` is absent, suggest `/simon-productivity:start` first and stop.

### 2. Sync tasks from external sources

Run each source against the scope declared by the inherited `CLAUDE.md` files.

**GitHub** — shell out:

```bash
gh issue list --assignee=@me --state=open --json number,title,repository,url --limit 50
gh pr list --author=@me --state=open --json number,title,repository,url --limit 50
```

For each result not in `TASKS.md`, propose adding (include the URL). If a parent `CLAUDE.md` lists specific repos, prioritize those. If `gh auth status` fails, note it and continue without GitHub.

**Vercel** — use the Vercel MCP:

- `list_projects` to enumerate active surfaces.
- For each project, `list_deployments` (last 10) → flag any failed/error builds on `production` or the most recent preview.
- For flagged failures, fetch `get_deployment_build_logs` and propose a "fix failing build" task with the log summary.

If the parent `CLAUDE.md` names specific Vercel projects to prioritize, lead with those.

**Linear** (optional, if MCP connected and `list_issues` returns results) — list issues assigned to the user.

**Google Calendar** — `list_events` for the next 7 days. Surface:

- Meetings with people / organizations named in the parent `CLAUDE.md` → propose prep task.
- Any event that matches a category the parent `CLAUDE.md` flags as gate-relevant (e.g. a documented compliance-gate appointment) → propose prep task and flag against the gate.
- Recurring meetings without a corresponding memory entry → flag for memory enrichment.

**Gmail** — search recent threads (last 7 days). Surface anything containing a commitment or deadline:

- Messages from people / orgs named in the parent `CLAUDE.md`.
- Correspondence relating to any compliance gate the parent declares.
- Customer / collaborator questions.

For each, propose a task with the thread reference.

**Google Drive** — list recently modified files. Scope to folders the parent `CLAUDE.md` names (by ID or path); fall back to a broad sweep if none are named. New files → propose triage task.

**Apple Notes** — check note piles the parent `CLAUDE.md` names as relevant. New idea → add to backlog (not Active unless explicitly actionable). Desktop-only; skip silently if unavailable.

### Diff format

For each external source, present a diff table and let the user batch-decide:

| External item | TASKS.md match? | Action |
|---|---|---|
| Found externally, not in TASKS.md | No match | Offer to add |
| Found externally, already in TASKS.md | Fuzzy title match | Skip |
| In TASKS.md, source done/closed/merged | No active source | Offer to mark done |
| In TASKS.md, active 30+ days, no source equivalent | — | Flag as stale |

### 3. Triage stale items

Review the Active section of TASKS.md:

- Tasks with past due dates → ask: done? reschedule? move to Someday?
- Tasks active 30+ days with no recent activity → ask.
- Tasks referencing a person/project no longer in memory → flag for cleanup.

### 4. Decode tasks for memory gaps

For each Active task, decode all entities (people, projects, acronyms, URLs) against the tiered cache:

1. CWD `CLAUDE.md` (hot cache).
2. Any parent `CLAUDE.md` found on the upward walk (broader context).
3. `memory/` directories at any tier.

Track which entities decode cleanly vs. which have gaps.

### 5. Fill gaps

Present unknown terms grouped:

```
Terms in your tasks I don't have context for:

1. "[term]" (from: "[task title]")
   → What is this?
```

Update the right memory file (CWD `memory/` for local terms, a parent `memory/` for cross-folder terms — write to whichever tier already owns similar entries).

### 6. Capture enrichment

When tasks contain richer context than memory, extract and update:

- Links → add to project / people files.
- Status changes ("X launched") → update project status, consider demoting from CLAUDE.md.
- Relationships ("X's sign-off on Y's proposal") → cross-reference in people files.
- Deadlines → add to project files.

### 7. Hard-rule gate check

If any parent `CLAUDE.md` on the upward walk declares a **hard rule** (compliance gate, regulatory check, authorization requirement) AND any task or external message looks like it might trip that rule, do **NOT** auto-complete or auto-accept it. Surface explicitly:

```
HARD-RULE GATE — action that may trip a documented rule.

Rule source: <path/to/parent/CLAUDE.md>
Rule text:
  <copy the rule verbatim from the parent CLAUDE.md>

Status checklist (user must confirm before proceeding):
  [ ] <each gate condition from the parent CLAUDE.md, copied verbatim>

Until all conditions are confirmed, do NOT auto-action.
```

Never invent rules the parent doesn't declare. Never silently skip a rule the parent does declare.

### 8. Verification-policy check

If any parent `CLAUDE.md` declares a verification policy for "done" claims (e.g. a required-evidence list: test logs, preview URL, deploy status, screenshot, build-gate counts), scan the Active section of `TASKS.md` for any task marked or claimed as done without the declared evidence. Flag each such task for re-verification.

If no parent `CLAUDE.md` declares a verification policy, skip this step silently.

### 9. Report

```
Update complete:

External sync:
- GitHub: +X issues, +Y PRs (Z merged)
- Vercel: [build status summary, e.g. "all green" or "<project> preview failing"]
- Calendar: X events surfaced
- Gmail: X threads with action items
- Drive: X new files
- Notes: X new entries

Triage:
- X stale flagged, Y completed
- X hard-rule gate flags (see step 7)
- X unverified-done flags (see step 8)

Memory:
- X gaps filled, Y entities enriched
- Z new entities suggested for memory (see comprehensive mode for full review)
```

## Comprehensive mode (`--comprehensive`)

Everything in default mode, plus a deep multi-source scan independent of the per-source scoping above.

### Extra: deep scan all sources

- **Gmail** — last 30 days, sent + received.
- **Calendar** — last 30 + next 30 days.
- **Drive** — all recently-modified across any folder the parent `CLAUDE.md` names, plus a broad sweep.
- **Apple Notes** — all notes updated since last comprehensive scan.
- **GitHub** — `gh issue list --state=all --limit 100` across owned repos; `gh pr list --state=all --limit 100`.
- **Vercel** — all projects, last 30 deployments each.

### Extra: flag missed todos

Compare activity against TASKS.md. Surface action items that never made it into the task list:

- Commitments the user made in sent email ("I'll send X by Friday").
- Action items from meetings without a follow-up task.
- Todos mentioned in chat / notes that never made it to TASKS.md.

Let the user pick which to add.

### Extra: suggest new memories

Group suggestions by confidence:

- **High** (≥ 5 mentions in distinct contexts) → offer to add directly.
- **Medium** → ask for one-line context, then add.
- **Low** (1–2 mentions) → note for later.

Categories: people, projects, terms, tools, relationships.

### Extra: cleanup suggestions

- Projects with no mentions in 30 days → mark stale?
- People not contacted in 60 days → demote from CLAUDE.md hot cache to `memory/people/` only?
- Glossary terms never referenced → demote / remove?

## Notes

- Never auto-add tasks or memories without confirmation.
- External-source links are preserved in TASKS.md when available.
- `gh` CLI is the GitHub source of truth — no remote GitHub MCP is wired.
- Hard rules declared in parent `CLAUDE.md` files are non-negotiable. Always flag; never auto-complete.
- `--comprehensive` always runs interactively — no silent updates.
- Apple Notes is desktop-only; skip silently if the MCP is unavailable.
- Verified-facts-only reporting if a parent `CLAUDE.md` declares it — no "should work" claims when a verification policy is in scope.
