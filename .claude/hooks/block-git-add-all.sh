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

# Skip enforcement when the command starts with a single `cd <path>` to a
# directory outside $CLAUDE_PROJECT_DIR — this hook governs the active project,
# not unrelated repos visited in the same session.
#
# Narrow on purpose to stay safe:
#   - `cd` must be the first action (anchored to ^) so it actually takes effect
#     before `git add`
#   - the command must contain at most one statement-boundary `cd` so a
#     `cd /tmp && cd $CLAUDE_PROJECT_DIR && git add -A` chain can't bypass
#   - the comparison uses a `$proj/` boundary so sibling paths like
#     `/app/web-api` don't match `/app/web`
#   - one leading single or double quote is stripped so `cd "$proj/sub"` is
#     compared cleanly
# Anything more exotic (subshells, variable expansion, multi-cd chains) falls
# through to the existing block — safe default.
if [ -n "${CLAUDE_PROJECT_DIR:-}" ]; then
  # Count statement-boundary `cd` occurrences. `grep -c` would max out at 1
  # (lines), so use `-o` + `wc -l`. `|| true` inside the brace group neutralises
  # grep's exit 1 on no-match so pipefail+ERR trap don't fire prematurely.
  cd_count=$( { printf '%s' "$cmd" | grep -oE '(^|[[:space:]]|;|&&|\|\|)cd[[:space:]]' || true; } | wc -l | tr -d ' ')
  if [ "$cd_count" = "1" ] \
     && [[ "$cmd" =~ ^[[:space:]]*cd[[:space:]]+[\"\']?([^[:space:]\;\&\|\"\']+)[\"\']?[[:space:]]*(\;|\&|\||$) ]]; then
    target="${BASH_REMATCH[1]%/}"
    proj="${CLAUDE_PROJECT_DIR%/}"
    # Carve-out applies only to ABSOLUTE paths free of unresolved components.
    # - Relative `cd subdir` would change the effective wd to somewhere we
    #   cannot evaluate against $proj without resolving — stay in-scope
    #   (claude-config#23 — bypass class #5).
    # - Absolute paths containing `..` or `/.` segments (e.g.
    #   `/tmp/../project`) resolve to a different real path than the literal
    #   string match suggests — they can re-enter the project, so the safe
    #   default is to fall through to enforcement (simon-skill#21 — bypass
    #   class #6, Gemini security-high).
    case "$target" in
      "$proj"|"$proj"/*) ;;       # absolute, in-scope literal → fall through to block
      *..*|*/.*) ;;               # absolute path with unresolved `..` or `/.` → stay in-scope
      /*) exit 0 ;;                # absolute, out-of-scope, fully resolved → allow
      *) ;;                        # relative or unknown → stay in-scope (safe default)
    esac
  fi
fi

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
