# Tasks

## Active

- [ ] **Re-run smoke test against v0.2.1** - after the dashboard/normal-init fix, repeat Test B in a fresh Claude session. Pass criteria: scaffold ends with clean working tree (no untracked dashboard.html, no untracked TASKS.md, no untracked memory/), and a second `/simon-productivity:start` run in the same dir opts into plugin-dev init explicitly. **Note**: cache lag — must be a fresh session that installs from the repo path, since the session-local agent-mode-sessions cache pins to an older snapshot.

## Waiting On

## Someday

- [ ] **Flip repo to public + enable branch protection** - blocked while private (GitHub free plan). Required for short-form install `/plugin marketplace add simonsangla/simon-productivity`. Trigger after smoke-test passes.
- [ ] **Audit `start` + `update` invocation flags** - currently no `disable-model-invocation: true`, so Claude can auto-invoke them. Both have real side effects (file writes, Gmail scans). Decide whether to gate as user-only. Matches upstream cache today; changing would diverge.
- [ ] **Add `scaffold-skill` user command** - bash script that creates `skills/<name>/SKILL.md` from a template and registers it in the marketplace manifest
- [ ] **Add `release-plugin` user command** - bumps version, tags, and creates GitHub release with skill changelog
- [ ] **Cross-link in claude-config** - add a one-line entry in `~/projects/claude-config/memory/` pointing to this plugin so the central index records it

## Done

- [x] ~~**Bootstrap repo structure**~~ - scaffold Claude Code plugin layout (plugin manifest, skills/, marketplace.json) using `repo-bootstrap` skill (2026-05-12, root commit `493a21d`)
- [x] ~~**Publish plugin marketplace**~~ - `.claude-plugin/marketplace.json` shipped in root commit (2026-05-12)
- [x] ~~**Wire CI**~~ - `.github/workflows/ci.yml` validates JSON manifests + SKILL.md frontmatter; green on first run (2026-05-12)
- [x] ~~**Migrate plugin source into this repo**~~ - ported `start`, `update`, `task-management`, `memory-management` SKILL.md files + `dashboard.html` + `CONNECTORS.md` + `.mcp.json` from local plugin cache; bumped manifest to v0.1.0 (2026-05-12, PR #2)
- [x] ~~**Teach `start` to scaffold new plugin repos**~~ - added "Plugin source" track with `plugin` arg trigger; templates at `skills/start/templates/` mirror this repo's bootstrap state with `{{PLACEHOLDER}}` substitution. Bumped manifest to v0.2.0 (2026-05-12, PR #3)
- [x] ~~**Fix smoke-test findings on Plugin source track**~~ - dropped root-level `dashboard.html` from plugin-dev init (canonical location is `skills/dashboard.html` after PR #2); decoupled scaffold from auto-init so scaffold commit lands with a clean working tree; users opt into plugin-dev TASKS/memory by re-running `start` (no args). Bumped to v0.2.1 (2026-05-12, PR #4)
