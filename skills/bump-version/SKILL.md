---
name: bump-version
description: Atomically bump the plugin version across all three locations it lives in (.claude-plugin/plugin.json's .version, .claude-plugin/marketplace.json's .metadata.version, and .claude-plugin/marketplace.json's .plugins[0].version). Use before tagging a release. Accepts an argument of `major`, `minor`, or `patch`. Refuses to run on a dirty working tree, on pre-existing field drift, or when any field holds a non-SemVer value.
disable-model-invocation: true
argument-hint: major | minor | patch
---

# bump-version

Coordinated SemVer bump for the simon-skill plugin. Three files store the version; they must all agree. This skill keeps them in sync atomically, refuses to compound drift, and stops short of `git commit` / `git tag` so the release act stays a deliberate user step.

## Cavekit conformance

This skill is the worked instance of `context/kits/cavekit-invocable-skills.md` R1, anchored to `context/kits/cavekit-skill-contract.md` R1 (frontmatter) and R4 (invocation-mode classification — user-only).

| Kit | Requirement | How this skill satisfies it |
|---|---|---|
| skill-contract | R1 (frontmatter) | `name`, `description`, `disable-model-invocation: true`, `argument-hint` set in YAML above. |
| skill-contract | R4 (invocation classification) | User-only — `disable-model-invocation: true` blocks Claude auto-invoke; the user types the slash command. |
| invocable-skills | R1 ACC1 (identical values post-bump) | Step 5 reads back all three fields and asserts equality with `$next`. |
| invocable-skills | R1 ACC2 (non-zero on dirty tree) | Precondition 1 aborts when `git status --porcelain` is non-empty. |
| invocable-skills | R1 ACC3 (non-zero on pre-bump drift, all three values printed) | Step 3 compares the three fields, prints all three on mismatch, exits 1. |
| invocable-skills | R1 ACC4 (no commits, no tags created by the skill) | Section "Why no auto-commit" + step 6: skill prints next-step checklist; user runs commit + tag manually. |
| invocable-skills | R1 ACC5 (atomic writes) | Step 4 writes via `jq` to a sibling `.tmp` file, then `mv` — no partial-file window is observable. Post-write `jq empty` re-validates; failure triggers `git checkout --` rollback. |

## Where the version lives

| File | Field |
|---|---|
| `.claude-plugin/plugin.json` | `.version` |
| `.claude-plugin/marketplace.json` | `.metadata.version` |
| `.claude-plugin/marketplace.json` | `.plugins[0].version` |

All three must match. Drift produces confusing `/plugin install` behavior — the marketplace shows one version, the installed plugin reports another.

## Usage

```text
/simon-skill:bump-version patch    # 0.2.1 → 0.2.2
/simon-skill:bump-version minor    # 0.2.1 → 0.3.0
/simon-skill:bump-version major    # 0.2.1 → 1.0.0
```

## Preconditions

1. Working tree must be **clean** (no unstaged or staged changes). Run `git status --porcelain`; abort with non-zero exit if non-empty. Reason: a dirty tree means the bump commit would bundle unrelated changes, making rollback hard.
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

Validate `$current` matches `^[0-9]+\.[0-9]+\.[0-9]+$`. Abort with non-zero exit if not (file is corrupt or non-SemVer).

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
  echo "DRIFT DETECTED — bump aborted." >&2
  echo "  plugin.json .version                  = $current" >&2
  echo "  marketplace.json .metadata.version    = $mp_meta" >&2
  echo "  marketplace.json .plugins[0].version  = $mp_plug" >&2
  echo "Fix drift first, then re-run bump." >&2
  exit 1
fi
```

This catches the case where a previous bump only updated 2 of 3 fields. Printing all three current values is required by invocable-skills R1 ACC3.

### 4. Write the new version atomically

Use `jq` with a temp file (never write back to the same path that is open for read):

```bash
next="<computed>"

jq --arg v "$next" '.version = $v' .claude-plugin/plugin.json > .claude-plugin/plugin.json.tmp \
  && mv .claude-plugin/plugin.json.tmp .claude-plugin/plugin.json

jq --arg v "$next" '.metadata.version = $v | .plugins[0].version = $v' \
  .claude-plugin/marketplace.json > .claude-plugin/marketplace.json.tmp \
  && mv .claude-plugin/marketplace.json.tmp .claude-plugin/marketplace.json
```

Re-validate both files with `jq empty` after the rewrite. On parse failure, rollback via `git checkout -- .claude-plugin/plugin.json .claude-plugin/marketplace.json` and exit non-zero.

The temp-file-then-`mv` pattern is what makes the write atomic: a concurrent reader sees either the pre-bump file or the post-bump file, never a partial write (invocable-skills R1 ACC5).

### 5. Verify the bump

```bash
echo "After bump:"
jq -r '.version' .claude-plugin/plugin.json
jq -r '.metadata.version' .claude-plugin/marketplace.json
jq -r '.plugins[0].version' .claude-plugin/marketplace.json
```

All three must print `$next`. If any of the three differs, treat as a failed bump: rollback and exit non-zero.

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

- HANDOFF.md needs a manual changelog entry per HANDOFF convention — the skill cannot infer "what landed".
- The user picks the right time to flip to a release branch / tag.
- Staying out of the commit step keeps this skill testable in isolation and satisfies invocable-skills R1 ACC4 (no commits, no tags attributable to the skill).

## Common failure modes

- **Drift between the three fields** (step 3 catches this): caused by a previous run that only updated 2/3. The skill refuses to compound the drift.
- **Dirty working tree**: refused at preconditions — bundling unrelated changes into a release commit makes hotfix rollback messy.
- **Non-SemVer current version**: refused at step 1. Manually fix the file before bumping.

## Coupled artifacts (NOT touched by this skill, but check after)

- `README.md` install snippet — usually evergreen, but verify it does not pin a specific version.
- `HANDOFF.md` "Current progress" table — append a row for the new version with what landed.
- `skills/start/templates/plugin.json` + `skills/start/templates/marketplace.json` — scaffolding templates for *new* plugins; their version is `{{VERSION_PLACEHOLDER}}` and should NOT change with each bump.

## Migration template

This SKILL.md is the worked pattern PR4–PR8 will follow when migrating the remaining five skills (`start`, `update`, `memory-management`, `task-management`, `portuguese-tax-and-benefits`). Reuse this checklist verbatim per PR.

1. Identify kit requirements the skill instantiates: always skill-contract R1 (frontmatter) and R4 (invocation classification); usually one requirement in invocable-skills or background-skills.
2. Set frontmatter: `name` matches the directory name; `description` is a "use when…" trigger; `disable-model-invocation: true` for side-effect skills; `user-invocable: false` for Claude-only background skills; `argument-hint` when applicable.
3. Add a "Cavekit conformance" table at the top of the body — one row per acceptance criterion, each pointing at the body section that satisfies it.
4. Rename every stale plugin-name reference to the current plugin name in slash-command paths and prose.
5. Side-effect discipline: a Claude-only skill must describe no file writes or external service calls (background-skills R1/R2). A user-invocable side-effect skill must document its safe-failure modes in the body.
6. Asset references resolve via `${CLAUDE_PLUGIN_ROOT}` only — no user-home paths, no parent-directory escape from the skill's own subtree (skill-contract R3).
7. Validate frontmatter parses with a YAML loader; pre-PR grep for the stale plugin name must return zero hits.
