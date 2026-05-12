---
name: start
description: Initialize a productivity workspace in the current folder, or scaffold a fresh Claude Code plugin source repo. Bootstraps TASKS.md / CLAUDE.md / memory/ if missing, opens the dashboard, and optionally runs a comprehensive scan across Gmail, Google Calendar, Google Drive, Apple Notes, Vercel, and GitHub. Inherits context upward from any parent CLAUDE.md so the same command behaves correctly in any directory. When invoked with `plugin` in an empty git repo, scaffolds LICENSE + CI + .claude-plugin manifests + Dependabot instead.
---

# Start (simon-productivity)

> Connector reference: [CONNECTORS.md](../../CONNECTORS.md).

Initialize the task and memory systems in the current folder, then open the dashboard. The skill is **folder-agnostic** — it operates on whatever directory it's invoked from and inherits richer context from any parent `CLAUDE.md` it can find. Two special cases override the generic flow:

- **Plugin source repo** (a `.claude-plugin/plugin.json` is present, OR the user passed `plugin` and the repo is empty) — see §1a.
- **Workspace root** (the `CLAUDE.md` in the current folder declares concurrent sub-projects) — the skill summarizes them rather than treating the folder as a single project.

## Instructions

### 1. Detect special cases

Check, in order:

1. **`.claude-plugin/plugin.json` exists in cwd** → plugin source repo (established). Jump to §1a, sub-case A.
2. **`plugin` argument passed AND `.claude-plugin/` is absent AND cwd is a git repo** → bootstrap a new plugin repo. Jump to §1a, sub-case B.
3. **Otherwise** → generic flow (§2 onward). The "right" behavior is parameterized by what the folder's own `CLAUDE.md` says, plus whatever parent `CLAUDE.md` files exist further up the path.

State to the user which mode is active before doing anything else.

### 1a. Plugin source track

A **Claude Code plugin source repo**. Two sub-cases:

**A. `.claude-plugin/plugin.json` already exists** — repo is an established plugin. Skip scaffold. Run plugin-dev init: ensure `TASKS.md`, `CLAUDE.md`, and `memory/` exist at repo root for plugin-dev backlog tracking. **Do NOT create a root-level `dashboard.html`** — for plugin repos, the dashboard (if any) is a plugin asset at `skills/dashboard.html` that ships with the plugin. If the user wants the visual board, they open `skills/dashboard.html` directly. The "Open the dashboard" step (§4) is skipped for this track.

**B. User passed `plugin` argument AND `.claude-plugin/` is absent** — bootstrap a new plugin repo. Run the scaffold steps below. **Do not continue into the normal init flow afterward** — scaffold ends with a clean working tree; user opts into plugin-dev init by running `/simon-productivity:start` again (no args) when they want TASKS.md + memory/ created.

#### Scaffold steps (sub-case B only)

Treat this as a `repo-bootstrap`-style operation. Templates live at `${CLAUDE_PLUGIN_ROOT}/skills/start/templates/`.

1. **Preflight**:
   - `git status` — confirm it's a git repo. If not, prompt the user to `git init` first; do not auto-init.
   - `git remote -v` — note the remote (used to infer `{{AUTHOR_GITHUB}}` for README).
   - `gh auth status` — confirm CLI works. If not authed, scaffold the files but skip the branch-protection follow-up note.
   - Confirm cwd is near-empty: anything beyond `.git/`, `.gitignore`, or a single `README.md` → ABORT and ask the user to confirm. Never overwrite existing files.

2. **Resolve substitution variables**:
   - `{{PLUGIN_NAME}}` — `basename "$PWD"` (e.g. `my-cool-plugin`). Validate: must match `^[a-z][a-z0-9-]+$`. If not, prompt the user.
   - `{{PLUGIN_DESCRIPTION}}` — ask the user: "One-sentence description of this plugin?" Default placeholder: `"TODO: describe this plugin"`.
   - `{{AUTHOR_NAME}}` — `git config user.name`. Fallback: ask the user.
   - `{{AUTHOR_EMAIL}}` — `git config user.email`. Fallback: ask the user.
   - `{{AUTHOR_GITHUB}}` — parse from `git remote get-url origin` (`github.com/<owner>/<repo>` → `<owner>`). If no remote, leave as `<owner>` literal so README is obviously incomplete.
   - `{{YEAR}}` — current year.

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
   Do NOT push automatically. Tell the user: "Scaffold committed locally on branch `<current-branch>`. Push when ready: `git push -u origin <branch>`."

7. **Surface follow-ups** (do not auto-execute):
   - Branch protection requires public repo or GitHub Pro. If repo is private on free plan, note this and tell the user to flip via `gh repo edit --visibility public` when ready.
   - Recommend opening PR-mode workflow from this point: every subsequent change goes via branch + PR, no direct push to main.
   - Tell the user: "Scaffold done. Run `/simon-productivity:start` again (no args) when you want a plugin-dev TASKS.md + memory/ at repo root, or just start adding skills under `skills/<name>/SKILL.md` first."

**Stop after step 7.** Do NOT chain into the normal init flow. The scaffold commit must leave a clean working tree. Sub-case A (next invocation) handles plugin-dev init separately.

### 2. Check what exists

In the current working directory, check for:

- `TASKS.md` — task list
- `CLAUDE.md` — working memory
- `memory/` — deep memory directory
- `dashboard.html` — the visual UI

**Then walk the directory chain upward** looking for additional `CLAUDE.md` files. Read each one you find — they describe the broader workspace (organizational rules, people, projects, compliance gates) and the bootstrap step in §6 should inherit from them rather than re-prompt for context the user has already written down.

### 3. Create what's missing

- **`TASKS.md` missing:** Create from the `task-management` skill template. Place it in the working directory.
- **`dashboard.html` missing:** Copy it from `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html` into the working directory. **Skip this for the Plugin source track** — plugin repos don't get a root-level dashboard.html; the dashboard ships as a plugin asset under `skills/`.
- **`CLAUDE.md` + `memory/` missing:** First-run. Continue to step 6 (bootstrap) after opening the dashboard.

### 4. Open the dashboard

Do NOT run `open` or `xdg-open` — Claude runs sandboxed and shell-open commands won't reach the user's browser.

- For **Plugin source** track: skip this step. Plugin repos don't get a root-level dashboard; if a `skills/dashboard.html` exists in the plugin, mention "Plugin includes a dashboard at `skills/dashboard.html` — open it from Finder if useful." Otherwise say nothing.
- For all other folders: tell the user: "Dashboard ready at `dashboard.html`. Open it from Finder or your file browser."

### 5. Orient the user

If everything was already initialized:

```
Workspace initialized.
- /simon-productivity:update to sync tasks + memory
- /simon-productivity:update --comprehensive for a deep multi-source scan
```

Stop here unless a bootstrap is needed.

### 6. Bootstrap memory (first run only)

Only if `CLAUDE.md` and `memory/` are absent in the working directory.

**Always inherit upward first.** Read every `CLAUDE.md` you found on the upward walk in §2 — they typically declare the people, projects, terms, hard rules, and compliance gates that govern this folder. Pull all of that forward into the new `CLAUDE.md` you're about to write. Only ask the user about things you genuinely cannot derive.

If a parent `CLAUDE.md` declares a **hard rule** (e.g. a compliance gate, a verification policy, an execution-quality bar), surface it explicitly in the new `CLAUDE.md` so the user can see it inherited. Never silently drop hard rules — that's the point of having them written down upstream.

**Then run a multi-source scan** — present what was found, ask the user to confirm/extend. Adapt each source to what the parent `CLAUDE.md` declares as relevant:

- **Gmail** — search recent threads (sent + received). If the parent `CLAUDE.md` lists key people or organizations, narrow the search to those.
- **Google Calendar** — list upcoming + recent events with attendees. Surface recurring meetings, interview slots, gate-relevant appointments (any meeting the parent `CLAUDE.md` flags as compliance-relevant).
- **Google Drive** — if the parent `CLAUDE.md` names specific folders (by ID or path), check those. Otherwise list recently modified files in the root.
- **Apple Notes** — check anything the parent `CLAUDE.md` names as a relevant pile (desktop-only MCP; skip silently if unavailable).
- **Vercel** — `list_projects` and `list_deployments` to discover active apps.
- **GitHub** — `gh repo list --limit 30` and `gh issue list --assignee=@me --state=open` to discover repos and open assignments. If `gh auth status` fails, note it and continue.

### 7. Write memory files

Use the `memory-management` skill templates. Place in the working directory.

**Seed defaults from what the upward walk found.** If the parent `CLAUDE.md` declared people, projects, glossary terms, or hard rules, the new `CLAUDE.md` should reference them (or copy the most active subset into the local hot cache) and the new `memory/` should mirror the parent's directory shape where it makes sense. Don't fabricate placeholder entries — empty sections are fine for a fresh folder.

### 8. Report results

```
Productivity system ready:
- Tasks: TASKS.md (X items)
- Memory: X people, X terms, X projects (inherited Y from parent CLAUDE.md)
- Dashboard: open dashboard.html in browser

Connectors detected: [list MCPs that returned data]
Connectors expected but unavailable: [list, e.g. "GitHub (gh CLI not authed)", "Apple Notes (not desktop)"]

Hard rules inherited from parent CLAUDE.md: [list, or "none"]

Use /simon-productivity:update to keep things current.
```

## Notes

- **Always inherit upward first.** Rich context already lives in parent `CLAUDE.md` files. Walk the chain before asking the user — never re-prompt for context they've already written down.
- **Respect inherited hard rules.** If a parent `CLAUDE.md` declares a compliance gate, verification policy, or quality bar, surface it in the local `CLAUDE.md` and respect it during `update` runs. Never auto-action anything the parent declares as gated.
- Apple Notes is desktop-only; skip silently if the MCP is unavailable in this session.
- GitHub has no remote MCP — use `gh` CLI directly. If `gh auth status` fails, report once and continue without GitHub.
- Vercel MCP exposes deployments + runtime logs; very useful for discovering active surfaces.
- Never auto-fill the status of any compliance gate inherited from a parent CLAUDE.md — those are user-controlled and must be flagged rather than ticked.
