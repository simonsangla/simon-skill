#!/usr/bin/env bash
# PostToolUse hook — warn when a hygiene file is edited without its matching
# template under skills/start/templates/ being touched in the same change set.
#
# Enforces the documented convention in CLAUDE.md ("Templates ↔ canonical files").
# Non-blocking: writes a warning to stderr and exits 0. Never blocks an edit.
#
# Fail-open: any bug in this hook must not brick the session. The ERR trap
# below guarantees a clean exit 0 even on unexpected errors.

set -uo pipefail
trap 'exit 0' ERR

# Fail-open if jq is not on PATH (the user may have a leaner shell)
command -v jq >/dev/null 2>&1 || exit 0

# Project root — Claude Code sets this for project-scoped hooks
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Parse the edited file path from stdin
edited_path="$(jq -r '.tool_input.file_path // ""' 2>/dev/null)"
[ -n "$edited_path" ] || exit 0

# Normalize to a path relative to the project root
rel_path="${edited_path#${PROJECT_DIR}/}"

# Map watched canonical paths → template path under skills/start/templates/
template=""
case "$rel_path" in
  LICENSE)                                template="skills/start/templates/LICENSE" ;;
  .gitignore)                             template="skills/start/templates/gitignore" ;;
  README.md)                              template="skills/start/templates/README.md" ;;
  .github/dependabot.yml)                 template="skills/start/templates/dependabot.yml" ;;
  .github/workflows/ci.yml)               template="skills/start/templates/ci.yml" ;;
  .claude-plugin/plugin.json)             template="skills/start/templates/plugin.json" ;;
  .claude-plugin/marketplace.json)        template="skills/start/templates/marketplace.json" ;;
  *) exit 0 ;;
esac

# If the template doesn't exist on disk, nothing to compare against
[ -f "${PROJECT_DIR}/${template}" ] || exit 0

# Check whether the template is also modified (staged or unstaged) in git
template_dirty="$(git -C "${PROJECT_DIR}" status --porcelain -- "${template}" 2>/dev/null | head -n1)"

if [ -z "$template_dirty" ]; then
  cat >&2 <<EOF
[template-sync] You edited ${rel_path} but did not change ${template}.
[template-sync] CLAUDE.md convention: update the matching template under
[template-sync] skills/start/templates/ in the same commit so new plugins
[template-sync] scaffolded via /simon-productivity:start plugin inherit the
[template-sync] new hygiene baseline. Warning only — commit will not be blocked.
EOF
fi

exit 0
