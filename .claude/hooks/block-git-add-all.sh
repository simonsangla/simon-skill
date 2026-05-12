#!/usr/bin/env bash
# PreToolUse(Bash) hook — block `git add -A`, `git add .`, `git add --all`
# inside this repo. Per CLAUDE.md and global rules: stage files by name to
# avoid leaking secrets or stray artifacts (uncommitted .env, /tmp review
# HTML, etc.).
#
# Exits 2 on match → stderr surfaces to Claude as a block message.
# Exits 0 otherwise → command proceeds.
#
# Fail-open on internal error: any bug in this hook must not brick the
# session. The ERR trap below guarantees an exit-0 fallback.

set -uo pipefail
trap 'exit 0' ERR

command -v jq >/dev/null 2>&1 || exit 0

cmd="$(jq -r '.tool_input.command // ""' 2>/dev/null)"
[ -n "$cmd" ] || exit 0

# Strip leading whitespace and inspect each statement separated by ; && ||
# Match patterns for the dangerous variants:
#   git add .
#   git add -A
#   git add --all
#   git add --no-ignore-removal -A
#   git add -A --ignore-errors  (and any other -A combination)
# Allow `git add <path>` even if the path starts with `.` (e.g. `git add .github/`)
# — those are explicit paths, not the "stage everything" wildcards.

# Use a portable bash 3.2 regex (no PCRE).
# Word boundaries: ensure "git add" is its own word, then check the next token.
if [[ "$cmd" =~ (^|[[:space:]\;\&\|])git[[:space:]]+add[[:space:]]+(-A|--all|\.)([[:space:]]|$|\;|\&|\|) ]]; then
  cat >&2 <<EOF
[block-git-add-all] Refusing 'git add -A' / 'git add .' / 'git add --all'.
[block-git-add-all] Reason: CLAUDE.md global rule — stage files by name to
[block-git-add-all] avoid leaking secrets (.env, settings.local.json) or
[block-git-add-all] stray artifacts (/tmp review HTML, .DS_Store).
[block-git-add-all] Re-run with explicit paths, e.g. 'git add README.md TASKS.md'.
EOF
  exit 2
fi

exit 0
