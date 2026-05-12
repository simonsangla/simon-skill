---
name: update-review
description: WIP A/B test skill — run the same scan as `/simon-productivity:update --comprehensive` then additionally render a standalone HTML review dashboard to disk so the result can be eyeballed. Use when the user wants both the standard text report AND a visual review surface in one invocation. Not yet promoted; do not auto-invoke. Compare side-by-side against `update` before any promotion decision.
disable-model-invocation: true
---

# Update Review (simon-productivity) — WIP

> Parallel A/B test skill. Same scan as [`update`](../update/SKILL.md) `--comprehensive` mode plus a final HTML render step. Lives alongside `update` so the two can be compared on a real run without modifying the production skill. **Do not promote** (do not move logic into `update`, do not bump plugin version) until the comparison passes.
>
> Connector reference: [CONNECTORS.md](../../CONNECTORS.md). Track conventions described there.

## Usage

```
/simon-productivity:update-review
```

No argument variants. Always runs comprehensive scan + HTML render. If the user only wants the text report, point them to `/simon-productivity:update` instead.

## What this skill does differently from `update`

| Step | `update` | `update-review` |
|---|---|---|
| Track detection | yes | yes (identical) |
| External-source scan | default scopes to track; `--comprehensive` deep-scans all sources | always deep-scans all sources (no flag) |
| Compliance gate flag | yes | yes (identical) |
| simon-platform §1–§7 check | yes | yes (identical) |
| Text report | yes | yes (identical structure) |
| **HTML review render** | no | **yes — final step (10)** |

If the text-report sections differ between the two skills on the same input, that's a divergence bug — fix `update-review` to match before promoting.

## Detect track

Same logic as `update` / `start`:

| Track | Working dir match |
|---|---|
| Job search | pwd starts with `/Users/simonsangla/projects/job/` |
| MetricPilot | pwd starts with `/Users/simonsangla/projects/metricpilot/` |
| simon-platform | pwd starts with `/Users/simonsangla/projects/simon-ops/` |
| Workspace root | pwd is exactly `/Users/simonsangla/projects/` |
| Plugin source (this repo) | pwd is `/Users/simonsangla/projects/simon-productivity` |
| Generic | anything else — TASKS.md in CWD only |

For the **plugin-source** track, treat external scans as workspace-root-equivalent (operator state lives at `~/projects/`, not in this repo). Render the HTML to `/tmp/` since this repo is going public — never write a review file into `simon-productivity/`.

## Steps 1–9: same as `update --comprehensive`

Run the comprehensive flow from [`update` SKILL.md](../update/SKILL.md) verbatim:

1. Load current state (TASKS.md + memory/ + parent CLAUDE.md)
2. Sync tasks from external sources (GitHub via `gh`, Vercel MCP, Calendar, Gmail, Drive, Apple Notes)
3. Triage stale items
4. Decode tasks for memory gaps
5. Fill gaps (present, do not auto-write)
6. Capture enrichment opportunities
7. **Compliance gate check** (HARD RULE — never auto-action paid-work proposals)
8. simon-platform §1–§7 check (if applicable)
9. Emit text report in the standard format

Plus the `--comprehensive` extras: deep multi-source scan (last 30 days), missed-todo detection, new-memory suggestions, cleanup suggestions.

## Step 10 — render HTML review (NEW)

After the text report is emitted, render a standalone HTML dashboard.

### 10.1 Pick output path

| Track | HTML output path |
|---|---|
| Workspace root | `~/projects/dashboards/review-YYYY-MM-DD-HHMM.html` (cowork-symlinked) |
| Job search | `~/projects/job/dashboards/review-YYYY-MM-DD-HHMM.html` |
| MetricPilot | `~/projects/metricpilot/dashboards/review-YYYY-MM-DD-HHMM.html` |
| simon-platform | `~/projects/simon-ops/simon-platform/dashboards/review-YYYY-MM-DD-HHMM.html` |
| Plugin source | `/tmp/simon-productivity-review-YYYY-MM-DD-HHMM.html` (NEVER write into the public-bound plugin repo) |
| Generic | `<cwd>/dashboards/review-YYYY-MM-DD-HHMM.html` |

`mkdir -p` the parent directory if needed.

Use the local timezone of `date`, format `YYYY-MM-DD-HHMM` (e.g. `2026-05-12-1845`). This makes runs per-day-sortable and allows multiple runs per day without collision.

### 10.2 Load the template

Read [`templates/review.html`](templates/review.html) from this skill's directory. It is a complete HTML document with `<!-- {{PLACEHOLDER}} -->` markers the skill fills.

### 10.3 Substitute placeholders

For each placeholder, generate HTML matching the structure documented inside the template's comment headers. The placeholders are:

| Placeholder | What it holds |
|---|---|
| `{{TIMESTAMP}}` | ISO local timestamp + track name + invocation source (cwd) |
| `{{COMPLIANCE_CARDS}}` | One `.card.red` per compliance flag (Scenario A status + any paid-work proposal). Empty `<!-- none -->` comment if no flags. |
| `{{FLAG_CARDS}}` | `.card.yellow` for each new Active item added this run (with source: Gmail thread, Calendar event, etc.) |
| `{{MEMORY_PATCH_CARDS}}` | `.card` per memory file modified (file path + 1-line summary of the change) |
| `{{EXTERNAL_SUMMARY}}` | Single `.card` with bullets: GitHub / Vercel / Calendar / Gmail / Drive / Notes counts |
| `{{ALREADY_TRACKED}}` | `.card.muted` listing items confirmed still-current with no change since last run |
| `{{SHIPPED_CARD}}` | `.card.green` only if this run produced commits/PRs — list branch + PR URL + commit shas. Omit otherwise. |
| `{{SIMON_PLATFORM_FLAGS}}` | `.card.red` per simon-platform §1–§7 violation (unverified-done claims). Omit if track ≠ simon-platform. |

**No personal data leaks into the plugin repo.** The template ships with placeholder comments only — never commit a rendered file.

### 10.4 Write + report

Write the substituted HTML to the path from 10.1. Report to the user:

```
Review rendered: <abs/path/to/review-YYYY-MM-DD-HHMM.html>
Open it in your browser to review side-by-side with the text report above.
```

Do NOT run `open` / `xdg-open` — sandbox blocks it. Tell the user to open it manually.

## Comparison-test protocol

Until promoted, treat any divergence between this skill and `update --comprehensive` as a bug here, not there.

```bash
# Test recipe
/simon-productivity:update --comprehensive     # baseline text report
/simon-productivity:update-review              # this skill — text report + HTML
```

Diff the two text reports. They must match section-for-section. The HTML render is additive.

If/when comparison passes consistently across all 5 tracks (job / metricpilot / simon-platform / workspace-root / generic), the next move is one of:

- Fold step 10 into `update`'s `--comprehensive` mode and delete this skill (preferred — single source of truth).
- Keep both, document `update-review` as the "with dashboard" variant.
- Add `--render` flag to `update` instead (mirrors `--comprehensive` pattern).

The decision is captured in this repo's TASKS.md / HANDOFF.md when made.

## Notes

- The HTML is intentionally self-contained (inline CSS, no JS, no external assets) so it opens cleanly via `file://` and survives being moved.
- No auto-open — Claude runs sandboxed, the user opens it.
- The output directory (`dashboards/` next to TASKS.md) is the same shape as the existing `dashboard.html` location convention — keeps review files discoverable from the productivity UI.
- Compliance gate is non-negotiable here too. The HTML must surface it in red at the top — never hide a flagged paid-work proposal in a collapsed section.
- This skill is `disable-model-invocation: true` during WIP — Claude will not auto-invoke. Promotion decision will flip this flag if/when fold-in happens.
