---
name: bump-version
description: Atomically bump the plugin version across all three locations it lives in (.claude-plugin/plugin.json, .claude-plugin/marketplace.json's metadata.version AND plugins[0].version). Use before tagging a release. Accepts an argument of `major`, `minor`, or `patch`. Refuses to run on a dirty working tree to avoid silently bundling unrelated changes into the bump commit.
disable-model-invocation: true
argument-hint: major | minor | patch
---

# bump-version

Coordinated SemVer bump for the simon-productivity plugin. Three files store the version and they must all agree — this skill keeps them in sync.

## Where the version lives

| File | Field |
|---|---|
| `.claude-plugin/plugin.json` | `.version` |
| `.claude-plugin/marketplace.json` | `.metadata.version` |
| `.claude-plugin/marketplace.json` | `.plugins[0].version` |

All three must match. Drift between them produces confusing `/plugin install` behavior — the marketplace shows one version, the installed plugin reports another.

## Usage

```text
/simon-productivity:bump-version patch    # 0.2.1 → 0.2.2
/simon-productivity:bump-version minor    # 0.2.1 → 0.3.0
/simon-productivity:bump-version major    # 0.2.1 → 1.0.0
```

## Preconditions

1. Working tree must be **clean** (no unstaged or staged changes). Run `git status -sb`; abort if not clean. Reason: a dirty tree means the bump commit would bundle unrelated changes, making rollback hard.
2. On a **branch**, not detached HEAD. The bump should land via PR.
3. `jq` available on PATH.

If any precondition fails, stop and tell the user what to fix.

## Steps

### 1. Read current version

```bash
cd "$CLAUDE_PROJECT_DIR" || cd "$(git rev-parse --show-toplevel)"
current="$(jq -r '.version' .claude-plugin/plugin.json)"
echo "Current version: $current"
```

Validate `$current` matches `^[0-9]+\.[0-9]+\.[0-9]+$`. Abort if not (file is corrupt or non-SemVer).

### 2. Compute next version

Parse `$current` into `major.minor.patch`. Based on the argument:

| Arg | Result |
|---|---|
| `patch` | `major.minor.(patch+1)` |
| `minor` | `major.(minor+1).0` |
| `major` | `(major+1).0.0` |

### 3. Cross-check the other two locations match `$current` BEFORE writing

```bash
mp_meta="$(jq -r '.metadata.version' .claude-plugin/marketplace.json)"
mp_plug="$(jq -r '.plugins[0].version' .claude-plugin/marketplace.json)"

if [ "$mp_meta" != "$current" ] || [ "$mp_plug" != "$current" ]; then
  echo "DRIFT DETECTED — bump aborted."
  echo "  plugin.json .version             = $current"
  echo "  marketplace.json .metadata.version    = $mp_meta"
  echo "  marketplace.json .plugins[0].version  = $mp_plug"
  echo "Fix drift first, then re-run bump."
  exit 1
fi
```

This catches the case where a previous bump only updated 2 of 3 fields.

### 4. Write the new version atomically

Use `jq` with a temp file (never write back to the same path that's open for read):

```bash
next="<computed>"

jq --arg v "$next" '.version = $v' .claude-plugin/plugin.json > .claude-plugin/plugin.json.tmp \
  && mv .claude-plugin/plugin.json.tmp .claude-plugin/plugin.json

jq --arg v "$next" '.metadata.version = $v | .plugins[0].version = $v' \
  .claude-plugin/marketplace.json > .claude-plugin/marketplace.json.tmp \
  && mv .claude-plugin/marketplace.json.tmp .claude-plugin/marketplace.json
```

Re-validate both files with `jq empty` after the rewrite. Abort + rollback (via `git checkout --`) if either fails to parse.

### 5. Verify the bump

```bash
echo "After bump:"
jq -r '.version' .claude-plugin/plugin.json
jq -r '.metadata.version' .claude-plugin/marketplace.json
jq -r '.plugins[0].version' .claude-plugin/marketplace.json
```

All three must print `$next`.

### 6. Surface to the user, do NOT auto-commit

Print the diff (`git diff .claude-plugin/`) and tell the user the next steps:

```text
Version bumped: $current → $next

Next steps (user runs these — bump-version intentionally does NOT auto-commit):
  1. Update HANDOFF.md with a row for $next (what landed since $current)
  2. /validate              # local CI mirror
  3. git add .claude-plugin/plugin.json .claude-plugin/marketplace.json HANDOFF.md
  4. git commit -m "chore(release): bump to v$next"
  5. Open PR, merge, then on main:
       git tag v$next && git push origin v$next
```

## Why no auto-commit

- HANDOFF.md needs a manual changelog entry per HANDOFF convention — the skill can't infer "what landed".
- The user picks the right time to flip to a release branch / tag.
- Staying out of the commit step keeps this skill testable in isolation.

## Common failure modes

- **Drift between the three fields** (step 3 catches this): caused by a previous run that only updated 2/3. The skill refuses to compound the drift.
- **Dirty working tree**: refused at step 0 — bundling unrelated changes into a release commit makes hotfix rollback messy.
- **Non-SemVer current version**: refused at step 1. Manually fix the file before bumping.

## Coupled artifacts (NOT touched by this skill, but check after)

- `README.md` install snippet — usually evergreen, but verify it doesn't pin a specific version.
- `HANDOFF.md` "Current progress" table — append a row for the new version with what landed.
- `skills/start/templates/plugin.json` + `skills/start/templates/marketplace.json` — these are scaffolding templates for *new* plugins; their version is `{{VERSION_PLACEHOLDER}}` and should NOT change with each bump. If they don't have placeholders, that's a bug in the template — file it.
