# Tasks

## Active

- [ ] **Bootstrap repo structure** - scaffold Claude Code plugin layout (plugin manifest, skills/, marketplace.json) using `repo-bootstrap` skill
- [ ] **Migrate `simon-productivity` plugin source into this repo** - port the four skills (`start`, `update`, `task-management`, `memory-management`) from the local plugin cache
- [ ] **Publish plugin marketplace** - add `.claude-plugin/marketplace.json` so users can install via `/plugin marketplace add simonsangla/simon-productivity`
- [ ] **Wire CI** - GitHub Action that lints SKILL.md frontmatter on every PR

## Waiting On

## Someday

- [ ] **Add `scaffold-skill` user command** - bash script that creates `skills/<name>/SKILL.md` from a template and registers it in the marketplace manifest
- [ ] **Add `release-plugin` user command** - bumps version, tags, and creates GitHub release with skill changelog

## Done
