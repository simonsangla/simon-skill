# Tasks

## Active

- [ ] **Migrate `simon-productivity` plugin source into this repo** - port the four skills (`start`, `update`, `task-management`, `memory-management`) from the local plugin cache at `~/Library/Application Support/Claude/.../plugin_01PGVaLEcQhDYUqu5FeM7juT/` into `skills/`
- [ ] **Smoke test install** - once skills are in `skills/`, install locally via `/plugin marketplace add /Users/simonsangla/projects/simon-productivity` and confirm `/simon-productivity:start` resolves

## Waiting On

## Someday

- [ ] **Flip repo to public + enable branch protection** - blocked while private (GitHub free plan). Required for short-form install `/plugin marketplace add simonsangla/simon-productivity`. Trigger when skills are ported + smoke-tested.
- [ ] **Add `scaffold-skill` user command** - bash script that creates `skills/<name>/SKILL.md` from a template and registers it in the marketplace manifest
- [ ] **Add `release-plugin` user command** - bumps version, tags, and creates GitHub release with skill changelog
- [ ] **Cross-link in claude-config** - add a one-line entry in `~/projects/claude-config/memory/` pointing to this plugin so the central index records it

## Done

- [x] ~~**Bootstrap repo structure**~~ - scaffold Claude Code plugin layout (plugin manifest, skills/, marketplace.json) using `repo-bootstrap` skill (2026-05-12, root commit `493a21d`)
- [x] ~~**Publish plugin marketplace**~~ - `.claude-plugin/marketplace.json` shipped in root commit (2026-05-12)
- [x] ~~**Wire CI**~~ - `.github/workflows/ci.yml` validates JSON manifests + SKILL.md frontmatter; green on first run (2026-05-12)
