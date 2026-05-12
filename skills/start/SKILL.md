---
name: start
description: Initialize Simon's three-track productivity system (job search + MetricPilot + simon-platform) or scaffold a fresh Claude Code plugin source repo. Detects which track you're in, bootstraps TASKS.md / CLAUDE.md / memory/ if missing, opens the dashboard, and optionally runs a comprehensive scan across Gmail, Google Calendar, Google Drive, Apple Notes, Vercel, and GitHub. When invoked with `plugin` in an empty git repo, scaffolds LICENSE + CI + .claude-plugin manifests + Dependabot too.
---

# Start (simon-productivity)

> Connector reference: [CONNECTORS.md](../../CONNECTORS.md). Track conventions described there.

Initialize the task and memory systems, then open the dashboard. **Track-aware** — the same command behaves differently in `/projects/job/job`, `/projects/metricpilot`, `/projects/simon-ops/simon-platform`, `/projects` (root), or anywhere else.

## Instructions

### 1. Detect the active track

Read the current working directory. Classify into:

| Track | Working dir match |
|---|---|
| Job search | pwd starts with `/Users/simonsangla/projects/job/` |
| MetricPilot | pwd starts with `/Users/simonsangla/projects/metricpilot/` |
| simon-platform | pwd starts with `/Users/simonsangla/projects/simon-ops/` |
| Workspace root | pwd is exactly `/Users/simonsangla/projects/` |
| **Plugin source** | `.claude-plugin/plugin.json` exists in cwd, OR (cwd is a git repo + user passed `plugin` as argument). See §1a below. |
| Generic | anything else — fall back to plain TASKS.md + memory in CWD |

State the detected track to Simon up front.

### 1a. Plugin source track

A **Claude Code plugin source repo**. Two sub-cases:

**A. `.claude-plugin/plugin.json` already exists** — repo is an established plugin. Skip scaffold. Run plugin-dev init: ensure `TASKS.md`, `CLAUDE.md`, `memory/`, and `dashboard.html` (at repo root, for plugin-dev convenience) exist. Same as Generic from this point on.

**B. User passed `plugin` argument AND `.claude-plugin/` is absent** — bootstrap a new plugin repo. Run the scaffold steps below before normal init.

#### Scaffold steps (sub-case B only)

Treat this as a `repo-bootstrap`-style operation. Templates live at `${CLAUDE_PLUGIN_ROOT}/skills/start/templates/`.

1. **Preflight**:
   - `git status` — confirm it's a git repo. If not, prompt Simon to `git init` first; do not auto-init.
   - `git remote -v` — note the remote (used to infer `{{AUTHOR_GITHUB}}` for README).
   - `gh auth status` — confirm CLI works. If not authed, scaffold the files but skip the branch-protection follow-up note.
   - Confirm cwd is near-empty: anything beyond `.git/`, `.gitignore`, or a single `README.md` → ABORT and ask Simon to confirm. Never overwrite existing files.

2. **Resolve substitution variables**:
   - `{{PLUGIN_NAME}}` — `basename "$PWD"` (e.g. `my-cool-plugin`). Validate: must match `^[a-z][a-z0-9-]+$`. If not, prompt Simon.
   - `{{PLUGIN_DESCRIPTION}}` — ask Simon: "One-sentence description of this plugin?" Default placeholder: `"TODO: describe this plugin"`.
   - `{{AUTHOR_NAME}}` — `git config user.name`. Fallback: ask Simon.
   - `{{AUTHOR_EMAIL}}` — `git config user.email`. Fallback: ask Simon.
   - `{{AUTHOR_GITHUB}}` — parse from `git remote get-url origin` (`github.com/<owner>/<repo>` → `<owner>`). If no remote, leave as `<owner>` literal so README is obviously incomplete.
   - `{{YEAR}}` — current year (e.g. `2026`).

3. **Copy + substitute templates** (never overwrite existing files):

   | Source (`${CLAUDE_PLUGIN_ROOT}/skills/start/templates/...`) | Destination |
   |---|---|
   | `LICENSE` | `./LICENSE` |
   | `gitignore` | `./.gitignore` |
   | `README.md` | `./README.md` |
   | `dependabot.yml` | `./.github/dependabot.yml` |
   | `ci.yml` | `./.github/workflows/ci.yml` |
   | `plugin.json` | `./.claude-plugin/plugin.json` |
   | `marketplace.json` | `./.claude-plugin/marketplace.json` |

   Substitute all `{{PLACEHOLDER}}` tokens during copy. Use `mkdir -p` for `.github/workflows/` and `.claude-plugin/`.

4. **Create `skills/` directory** (empty placeholder so contributors know where SKILL.md files go):
   ```bash
   mkdir -p skills
   ```

5. **Local validation gates** — run before reporting success:
   ```bash
   jq empty .claude-plugin/plugin.json
   jq empty .claude-plugin/marketplace.json
   python3 -c "import yaml; yaml.safe_load(open('.github/dependabot.yml'))"
   python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))"
   ```
   If any fail, surface the error; do NOT proceed to commit.

6. **Stage and commit explicitly** (no `git add -A`):
   ```bash
   git add LICENSE .gitignore README.md .github/dependabot.yml .github/workflows/ci.yml \
           .claude-plugin/plugin.json .claude-plugin/marketplace.json
   git commit -m "chore: bootstrap plugin repo (LICENSE, CI, manifests)"
   ```
   Do NOT push automatically. Tell Simon: "Scaffold committed locally on branch `<current-branch>`. Push when ready: `git push -u origin <branch>`."

7. **Surface follow-ups** (do not auto-execute):
   - Branch protection requires public repo or GitHub Pro. If repo is private on free plan, note this and tell Simon to flip via `gh repo edit --visibility public` when ready.
   - Recommend opening PR-mode workflow from this point: every subsequent change goes via branch + PR, no direct push to main.

After scaffolding completes, continue with the normal init flow (TASKS.md, memory/, dashboard.html at repo root for plugin-dev convenience). The repo is now a "Plugin source" track (sub-case A on next invocation).

### 2. Check what exists

For the detected track's working directory, check for:

- `TASKS.md` — task list
- `CLAUDE.md` — working memory
- `memory/` — deep memory directory
- `dashboard.html` — the visual UI

Also check the parent `/Users/simonsangla/projects/CLAUDE.md` (root-level cross-track memory) and the per-track CLAUDE.md if you're not at the root. Always read existing CLAUDE.md files before asking new questions — Simon has rich memory and you should inherit, not duplicate.

### 3. Create what's missing

- **`TASKS.md` missing:** Create from the `task-management` skill template. Place it in the working directory.
- **`dashboard.html` missing:** Copy it from `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html` into the working directory.
- **`CLAUDE.md` + `memory/` missing:** First-run. Continue to step 6 (bootstrap) after opening the dashboard.

### 4. Open the dashboard

Do NOT run `open` or `xdg-open` — Claude runs sandboxed and shell-open commands won't reach the user's browser. Tell Simon: "Dashboard ready at `dashboard.html` in the [track] working dir. Open it from Finder or your file browser."

### 5. Orient the user

If everything was already initialized:

```
[Track] initialized.
- /simon-productivity:update to sync tasks + memory
- /simon-productivity:update --comprehensive for a deep multi-source scan
```

Stop here unless a bootstrap is needed.

### 6. Bootstrap memory (first run only)

Only if `CLAUDE.md` and `memory/` are absent in the working directory.

**Always inherit upward first.** Read any existing CLAUDE.md at:
1. The detected track's parent (e.g. `/Users/simonsangla/projects/job/CLAUDE.md`)
2. The workspace root (`/Users/simonsangla/projects/CLAUDE.md`)

Pull forward all people, terms, projects already known. Only ask Simon about things you cannot derive.

**Then run a multi-source scan** — present what was found, ask Simon to confirm/extend:

- **Gmail** — search recent threads (sent + received). Look for recruiter names, IEFP/AT/Seg Social references, customer conversations, Mercor / HumanIT / Malt / Mindrift / Alignerr / Outlier mentions.
- **Google Calendar** — list upcoming + recent events with attendees. Surface recurring meetings, interview slots, IEFP appointments.
- **Google Drive** — track-specific folders:
  - `Job_Search` (id `1U8s1hd_h9X8mkQVzqXbdkPRlYh-OXAtw`)
  - `jobs` (id `1SQsUBxGou4Qi2P7dwHY9NKW9M2ou6M1l`)
  - `job_utils` if present
- **Apple Notes** — Lab pile, Pompt Library, FASTDEV / AGENT PROTOCOL scaffolding notes (desktop-only MCP; skip silently if unavailable).
- **Vercel** — `list_projects` and `list_deployments` to discover active apps (Carcassonne, simon-platform apps, MetricPilot).
- **GitHub** — `gh repo list --limit 30` and `gh issue list --assignee=@me --state=open` to discover repos and open assignments. If `gh auth status` fails, note it and continue.

### 7. Write memory files

Use the `memory-management` skill templates. Place in the track's working directory.

**Track-specific defaults to seed in `CLAUDE.md ## Projects`:**

- **Job search** — Active recruiter pipeline (Mercor, Malt, Outlier, Alignerr), IEFP gate (Marta Sousa Fontoura), Scenario A status.
- **MetricPilot** — B2C scale-up qualification (€15–25K engagements, Snowflake required), Cal.com booking topic "Root-Cause Scoping Call".
- **simon-platform** — §1–§7 execution rules from `/Users/simonsangla/projects/simon-ops/simon-platform/CLAUDE.md`, active worktrees (`wt-madame-irma`, `wt-irs-kernel-hardening`).
- **Workspace root** — All three track summaries with pointers to per-track CLAUDE.md.

### 8. Report results

```
Productivity system ready — [track]:
- Tasks: TASKS.md (X items)
- Memory: X people, X terms, X projects (inherited Y from parent CLAUDE.md)
- Dashboard: open dashboard.html in browser

Connectors detected: [list MCPs that returned data]
Connectors expected but unavailable: [list, e.g. "GitHub (gh CLI not authed)", "Apple Notes (not desktop)"]

Use /simon-productivity:update to keep things current.
```

## Notes

- **Always inherit upward first.** Simon has rich memory at `/Users/simonsangla/projects/CLAUDE.md` and per-track CLAUDE.md files. Never re-prompt for context you can read.
- Apple Notes is desktop-only; skip silently if the MCP is unavailable in this session.
- GitHub has no remote MCP — use `gh` CLI directly. If `gh auth status` fails, report once and continue without GitHub.
- Vercel MCP exposes deployments + runtime logs; very useful for discovering Simon's active surfaces.
- Never auto-fill Scenario A status or compliance flags — Simon controls those manually. See `/Users/simonsangla/projects/CLAUDE.md`.
- For simon-platform track, the §1–§7 execution rules apply: do not claim anything is "verified" without evidence (test logs, preview URL, build green).
