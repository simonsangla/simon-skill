---
name: task-management
description: Use when Claude reads or interprets the user's task state in `TASKS.md`. Documents the 4-section layout (Active, Waiting On, Someday, Done), the task-line grammar, the subtask-indentation grammar, and the decode-before-act discipline that applies before any other skill mutates the file. Pure background context — invocable skills (`start`, `update`) perform the writes.
user-invocable: false
---

# task-management

Two-tier discipline for Simon's task list. This skill is background context (Claude-only, side-effect-free): it documents the file shape, the line grammar, and the decode-before-act precondition. Invocable skills (`/simon-skill:start`, `/simon-skill:update`) perform writes against these conventions.

## Cavekit conformance

This skill is the worked instance of `context/kits/cavekit-background-skills.md` R2, anchored to `context/kits/cavekit-skill-contract.md` R1 (frontmatter) and R4 (invocation-mode classification — Claude-only).

| Kit | Requirement | How this skill satisfies it |
|---|---|---|
| skill-contract | R1 (frontmatter) | `name`, `description`, `user-invocable: false` set in YAML above. |
| skill-contract | R4 (invocation classification) | Claude-only — `user-invocable: false` keeps this skill out of slash-command invocation; Claude consults it as background context before reading or interpreting `TASKS.md`. |
| background-skills | R2 ACC1 (exact 4-section template) | Section "File layout — 4-section template" specifies the four section headings verbatim: `## Active`, `## Waiting On`, `## Someday`, `## Done`. |
| background-skills | R2 ACC2 (task-line grammar + subtask indentation, with worked examples) | Section "Line grammar" documents the task-line shape and the subtask-indentation rule, each with at least one worked example. |
| background-skills | R2 ACC3 (no side-effect language; mutation guidance is advice to whichever skill edits the file) | All editing guidance is phrased as advice to invocable skills (`start`, `update`) that perform the writes. This skill describes how the file looks and how to read it; it does not describe Claude writing to it. |

## File layout — 4-section template

`TASKS.md` lives in the current working directory and uses **exactly four H2 sections**, in this order:

```markdown
# Tasks

## Active

## Waiting On

## Someday

## Done
```

The four section names — `Active`, `Waiting On`, `Someday`, `Done` — are normative. Skills that write to `TASKS.md` must preserve this order and these spellings; downstream tooling (the dashboard at `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html`) keys on the literal heading strings.

Empty sections are valid. A fresh `TASKS.md` is the template above with no items under any heading.

## Line grammar

Two grammars apply: the **task line** and the **subtask line**.

### Task line

A single Markdown bullet, checkbox, bold title, em-dash, then context. The fields are: actor / for-whom / due-date / waiting-since — whichever apply.

```
- [ ] **<Task title>** — <context, for whom, due date>
```

Worked example:

```markdown
- [ ] **Send Q3 forecast spreadsheet** — for Todd, due 2026-05-20
- [ ] **Review draft brief** — for Sarah, waiting since 2026-05-08
- [ ] **File IRS Modelo 3** — for self, due 2026-06-30
```

Conventions inside the title and context:

- **Bold** the title; the bold word is what the dashboard's drag-handle keys on.
- Prefer `for <person>` when the task is a commitment to someone.
- Prefer `due <YYYY-MM-DD>` for deadlines.
- Prefer `waiting since <YYYY-MM-DD>` for items in `Waiting On`.

### Subtask line

Subtasks are indented two spaces beneath the parent task line, no checkbox:

```
- [ ] **<Task title>** — <context>
  - <subtask detail>
  - <subtask detail>
```

Worked example:

```markdown
- [ ] **Prep Mercor interview** — for self, due 2026-05-12
  - Draft 2-minute TripAdvisor STAR opener
  - Re-read Mercor compliance gate (`memory/projects/mercor_atividade.md`)
  - Test mic + lighting 30 min before
```

Subtasks are unchecked detail. They do not appear in the dashboard's checkbox grid; they surface only when the parent task is expanded.

### Done line

When an invocable skill marks a task done, the convention is to check the box, strikethrough the title, and append a completion date in parentheses, then move the line to the `Done` section:

```markdown
- [x] ~~**Send Q3 forecast spreadsheet**~~ — for Todd, due 2026-05-20 (done 2026-05-19)
```

The `Done` section is retained for approximately one week before pruning; pruned items live in nowhere — they're gone.

## Decode-before-act precondition

Before any invocable skill mutates `TASKS.md`, the parsing skill (typically `update` or whoever is staging the diff) consults `memory-management` to decode user shorthand in the proposed line: nicknames → canonical names, acronyms → meanings, project codenames → full project entries. The lookup order is the verbatim tiered order from `memory-management` R1:

```
hot cache → glossary → deep memory → ask user
```

A task line that references a term the lookup cannot resolve is staged with the unknown term flagged; the user confirms or supplies the decoding before the write commits.

This precondition is what keeps `TASKS.md` lines self-explanatory across sessions — a task written as "ask todd about PSR" carries no value six months later when "todd" decodes to two different people on the team.

## How Claude reads `TASKS.md`

Claude consults this skill as background context whenever the user asks about tasks. The read paths:

- **"What's on my plate" / "my tasks"** — Claude reads `TASKS.md`, summarises Active and Waiting On, and surfaces overdue / urgent items by comparing each due date against today.
- **"What am I waiting on"** — Claude reads the `Waiting On` section and notes how long each item has been waiting (today minus `waiting since` date).
- **"Done with X" / "finished X"** — Claude locates the task. The mutation that follows (check the box, strikethrough, append date, move to `Done`) is staged by the invocable skill (`update`) per the diff-first discipline; Claude itself does not write.
- **Summarising meetings or threads** — Claude extracts candidate task lines and presents them to the user as a proposed diff. The invocable skill (`update`) is what appends them after the user confirms.

## Dashboard convention

The shared root-level asset `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html` reads and writes the same `TASKS.md` file the conventions above describe. The dashboard:

- Drag-and-drop reorders items inside a section and across sections.
- Auto-saves changes back to `TASKS.md` in the working directory.
- Watches the file for external edits and re-syncs.

The copy-step that places `dashboard.html` into the user's working directory on first run is performed by the `start` invocable skill — never by this skill.

## Conventions summary

- Four H2 sections, exact spellings: `Active`, `Waiting On`, `Someday`, `Done`.
- Tasks: `- [ ] **<Title>** — <context>`. Bold title is normative.
- Subtasks: two-space indent under the parent line; no checkbox.
- `Done` items retain a strikethrough title and a `(done <YYYY-MM-DD>)` suffix.
- `Done` section is pruned weekly.
- Every line that references a person, project, or term resolves cleanly via the `memory-management` tiered lookup before the line is committed.
