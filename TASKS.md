# Tasks

## Active

- [ ] **Smoke test local install in a fresh Claude Code session** - run `/plugin marketplace add /Users/simonsangla/projects/simon-productivity` then `/plugin install simon-productivity`, then `/simon-productivity:start` in a test directory; confirm all four skills resolve. Skip if the currently-running session already has the cache-installed copy (risk of conflict).

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
