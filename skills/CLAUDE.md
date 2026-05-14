# Skills

SKILL.md files for the plugin. See context/kits/ for requirements this directory implements.
See context/plans/ for task dependency graphs.

## Conventions
- Each skill lives at `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`)
- Description is the trigger Claude matches on — write it as a "use when…" sentence
- Side-effecting skills use `disable-model-invocation: true`
- Background-context skills use `user-invocable: false`
- Shared assets used by multiple skills can live directly in this directory (e.g. `dashboard.html`, which is a static asset — not a skill — referenced by `task-management/SKILL.md` via `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html`).
