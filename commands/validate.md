---
description: Run the CI validation locally (jq-validate JSON manifests + lint SKILL.md frontmatter). Use before pushing a branch to catch what CI would catch.
argument-hint: (no arguments)
---

# /validate

Run the same checks `.github/workflows/ci.yml` runs in CI, on the local working tree. Useful for the loop: `edit → /validate → commit → push`. Catches issues before CI does.

## What it checks

1. **JSON manifest validity** — `jq empty` on every JSON file in `.claude-plugin/` plus `.mcp.json`.
2. **SKILL.md frontmatter** — every `skills/<name>/SKILL.md` has a YAML frontmatter block with at least the required keys (`name`, `description`).

Both checks come straight from the CI workflow; if CI changes, this command should be kept in sync.

## Run

```bash
set -euo pipefail

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(git rev-parse --show-toplevel)"

echo "→ Validating JSON manifests"
fail=0
for f in .claude-plugin/plugin.json .claude-plugin/marketplace.json .mcp.json; do
  if [ -f "$f" ]; then
    if jq empty "$f"; then
      echo "  ✓ $f"
    else
      echo "  ✗ $f — invalid JSON"
      fail=1
    fi
  else
    echo "  · $f missing (warn only)"
  fi
done

echo
echo "→ Linting SKILL.md frontmatter"
python3 - <<'PY'
import re, sys, pathlib
REQUIRED = ("name", "description")
errors = []
skills = list(pathlib.Path("skills").glob("*/SKILL.md"))
if not skills:
    print("  · no SKILL.md files under skills/ (warn only)")
else:
    for f in skills:
        text = f.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
        if not m:
            errors.append(f"{f}: missing YAML frontmatter block")
            continue
        block = m.group(1)
        for key in REQUIRED:
            if not re.search(rf"^{key}\s*:\s*\S", block, re.MULTILINE):
                errors.append(f"{f}: missing required key '{key}'")
        print(f"  ✓ {f}")
    for e in errors:
        print(f"  ✗ {e}")
    sys.exit(1 if errors else 0)
PY
py_status=$?

if [ "$fail" -ne 0 ] || [ "$py_status" -ne 0 ]; then
  echo
  echo "FAIL: validation failed — see above"
  exit 1
fi

echo
echo "PASS: all manifests valid + all SKILL.md frontmatter has required keys"
```

## Notes

- This command is a faithful local mirror of the CI workflow. If CI grows checks (template validity, no-leftover-placeholders, etc.), add them here too.
- Does NOT run network checks (Dependabot, GitHub Actions SHA verification). Only static file checks.
- Exit code: `0` on pass, `1` on any failure. Suitable for chaining: `/validate && git push`.
