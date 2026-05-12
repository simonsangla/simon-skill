# Tasks

## Active

- [ ] **Compare `/update --comprehensive` vs `/update-review` text reports** — confirm section-for-section identity on the same input before any promotion decision. Track-by-track: at minimum workspace-root + plugin-source. Test recipe in `skills/update-review/SKILL.md` "Comparison-test protocol".
- [ ] **Decide promotion path for `update-review`** — after comparison passes: (a) fold step 10 into `update --comprehensive` and delete `update-review`, (b) keep both as variants, or (c) add `--render` flag to `update` instead. Document the decision in HANDOFF.md.
- [ ] **Refresh HANDOFF.md** — currently snapshots session 2 close-out (v0.2.1, 3 open PRs). Out of date: PRs #6/#7 merged, then #8 (folder-agnostic) + #9 (portuguese-tax) shipped to v0.3.0. Hooks activated. Smoke-retest recipe still references v0.2.1.

## Waiting On

## Someday

- [ ] **Flip repo to public + enable branch protection** - blocked while private (GitHub free plan). Required for short-form install `/plugin marketplace add simonsangla/simon-productivity`.
- [ ] **Audit `start` + `update` invocation flags** - currently no `disable-model-invocation: true`, so Claude can auto-invoke them. Both have real side effects (file writes, Gmail scans). Decide whether to gate as user-only. Matches upstream cache today; changing would diverge.
- [ ] **Add `scaffold-skill` user command** - bash script that creates `skills/<name>/SKILL.md` from a template and registers it in the marketplace manifest
- [ ] **Add `release-plugin` user command** - bumps version, tags `vX.Y.Z` on GitHub, drafts release notes from the skill changelog

## Done

- [x] ~~**Activate project hooks**~~ - `.claude/settings.json` written with `$CLAUDE_PROJECT_DIR` paths (cleaner than the absolute-path example); template-sync + `git add -A` blocker live in this repo (2026-05-12)
- [x] ~~**Add `portuguese-tax-and-benefits` skill**~~ - IRS / Anexo L / NHR / IFICI reference skill, user-invocable (2026-05-12, PR #9, commit `49ec5aa`)
- [x] ~~**Make `start` + `update` folder-agnostic**~~ - dropped hard-coded job/MetricPilot/simon-platform tracks; detect via CWD signals instead (2026-05-12, PR #8, commit `1038d3e`)
- [x] ~~**Bootstrap repo structure**~~ - scaffold Claude Code plugin layout (plugin manifest, skills/, marketplace.json) using `repo-bootstrap` skill (2026-05-12, root commit `493a21d`)
- [x] ~~**Publish plugin marketplace**~~ - `.claude-plugin/marketplace.json` shipped in root commit (2026-05-12)
- [x] ~~**Wire CI**~~ - `.github/workflows/ci.yml` validates JSON manifests + SKILL.md frontmatter; green on first run (2026-05-12)
- [x] ~~**Migrate plugin source into this repo**~~ - ported `start`, `update`, `task-management`, `memory-management` SKILL.md files + `dashboard.html` + `CONNECTORS.md` + `.mcp.json` from local plugin cache; bumped manifest to v0.1.0 (2026-05-12, PR #2)
- [x] ~~**Teach `start` to scaffold new plugin repos**~~ - added "Plugin source" track with `plugin` arg trigger; templates at `skills/start/templates/` mirror this repo's bootstrap state with `{{PLACEHOLDER}}` substitution. Bumped manifest to v0.2.0 (2026-05-12, PR #3)
- [x] ~~**Fix smoke-test findings on Plugin source track**~~ - dropped root-level `dashboard.html` from plugin-dev init (canonical location is `skills/dashboard.html` after PR #2); decoupled scaffold from auto-init so scaffold commit lands with a clean working tree; users opt into plugin-dev TASKS/memory by re-running `start` (no args). Bumped to v0.2.1 (2026-05-12, PR #4)
- [x] ~~**Smoke test v0.2.0**~~ - ran in a fresh Claude session. Findings: TEST 0 install requires user-typed slash commands (not callable from tool context — known limitation); TEST A Generic track passed; TEST B + TEST C surfaced the dashboard / auto-init bugs fixed in v0.2.1 (PR #4). Re-test against v0.2.1 deferred (high confidence in fix from diff review) (2026-05-12)
- [x] ~~**Cross-link in claude-config**~~ - added `memory/simon-productivity-plugin.md` (reference type, user scope) + index entry under "Claude Code harness" in claude-config (2026-05-12, claude-config PR #19)
