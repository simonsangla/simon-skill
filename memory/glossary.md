# Glossary — simon-productivity plugin

> Cross-track terms (Scenario A, IAS, Modelo 3, people decoder ring) live in `/Users/simonsangla/projects/CLAUDE.md`. This file is plugin-dev specific.

## Plugin terms

| Term | Meaning |
|------|---------|
| **SKILL.md** | Markdown file with YAML frontmatter (`name`, `description`) that defines a single Claude Code skill. Discovered by Claude based on the `description` field. |
| **Plugin manifest** | `.claude-plugin/plugin.json` at repo root. Declares plugin metadata (name, version, author) and lists bundled skills/commands/hooks/agents. |
| **Marketplace** | `.claude-plugin/marketplace.json` at repo root. Makes a git repo installable as a plugin source via `/plugin marketplace add <git-url-or-org/repo>`. |
| **Skill invocation modes** | `user-invocable: false` = Claude-only (background knowledge). `disable-model-invocation: true` = user-only (side effects). Omit both = either. |
| **Skill description trigger** | The `description` field is what Claude matches against — write it as a "use when…" trigger, not a title. |
| **Plugin install command** | `/plugin install simon-productivity@simonsangla` after the marketplace is added. |
| **CLAUDE_PLUGIN_ROOT** | Env var pointing to the plugin's installed root — used in skills to reference bundled assets (e.g. `${CLAUDE_PLUGIN_ROOT}/skills/dashboard.html`). |

## Sibling plugins (reference structure)

| Plugin | Repo / Source | Why look at it |
|--------|---------------|----------------|
| anthropic-skills | github.com/anthropics/skills | Canonical example of a multi-skill plugin with marketplace.json |
| superpowers | (in env) | Frontmatter conventions for skill discovery triggers |
| cavekit (`bp:` / `2.0.0:`) | (in env) | Plugin with mixed skills + commands + agents — full surface area |

## simon-productivity bundled skills (the four to port)

| Skill | Type | Purpose |
|-------|------|---------|
| `start` | user-invocable | Init TASKS.md + memory + dashboard for the active track |
| `update` | user-invocable | Sync tasks/memory from Gmail, Calendar, Drive, Vercel, GitHub, Apple Notes |
| `task-management` | Claude-only (`user-invocable: false`) | Background skill teaching Claude to read/write TASKS.md |
| `memory-management` | Claude-only (`user-invocable: false`) | Background skill for two-tier memory (CLAUDE.md + memory/) |
