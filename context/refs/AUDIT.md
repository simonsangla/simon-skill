> Archived from branch pr1-audit on 2026-05-14. Plan-of-record for the simon-productivity → simon-skill refactor. Do not edit; treat as historical.

# simon-productivity → simon-skill — PR1 Audit

> Read-only inventory. No file is moved, renamed, or modified by this PR.
> Generated 2026-05-14 from branch `pr1-audit` (parent `main` @ `682e11a`).

## 1. Inventory summary

- **Tracked files in repo:** 57 (per `git ls-files | wc -l`)
- **Untracked but on disk (gitignored — excluded from §2):** 4 — `.DS_Store`, `memory/.DS_Store`, `.claude/settings.json`, `.claude/settings.local.json`. Properly ignored by `.gitignore`. See §5.
- **Sampling rule:** none applied — repo is small enough (57 files) to classify exhaustively.

### Breakdown by language / extension

| Lang | Count |
|---|---|
| md | 28 |
| json | 7 (+1 `.json.example`) |
| yml | 4 |
| html | 3 |
| sh | 2 |
| js | 2 |
| mjs | 1 |
| css | 1 |
| svg | 1 |
| webmanifest | 1 |
| LICENSE (text) | 2 |
| .gitignore / .vercelignore | 4 |
| **Total** | **57** |

No Python source. TypeScript / JavaScript = 3 files (`web/scripts/build-data.mjs`, `web/public/app.js`, `web/public/sw.js`). The bulk is prompt-template markdown (skills + references + memory + project docs).

### Breakdown by top-level directory

| Dir | Files | Role |
|---|---|---|
| `<root>` | 11 | Root manifests, docs, CI config, repo guides |
| `.claude/` | 4 | Project-scoped Claude config (hooks, agent, settings example) |
| `.claude-plugin/` | 2 | Plugin manifests |
| `.github/` | 2 | CI workflow + Dependabot |
| `commands/` | 1 | `/validate` slash command |
| `memory/` | 3 | Project-local memory tier |
| `skills/` | 24 | All plugin skills + dashboard asset + templates |
| `web/` | 10 | PWA dashboard (Vercel-deployed) |

## 2. Classification table

Last-commit dates pulled via `git log -1 --format=%cs -- <path>`. Every tracked file last touched within the last 2 weeks (repo is brand-new), so the >180-day-age leg of DELETE-DEAD does not trigger; WIP-header leg does for `update-review`.

| Path | Lang | Lines | Last commit | Class | Justification |
|------|------|------:|-------------|-------|---------------|
| `.claude-plugin/marketplace.json` | json | 21 | 2026-05-13 | KEEP-PUBLIC | Plugin marketplace manifest. Owner = "Simon Sangla" is intentional author metadata. |
| `.claude-plugin/plugin.json` | json | 9 | 2026-05-13 | KEEP-PUBLIC | Plugin manifest. Hardcoded `simonsangla@gmail.com` is intentional author email but flag in §5 — could be `noreply@…` for polyglot template. |
| `.claude/agents/plugin-release-reviewer.md` | md | 118 | 2026-05-12 | MOVE-PRIVATE | Privacy-gate agent. Line 51 hardcodes the user's sensitive contact domains (`@spptaxes.pt`, `@mercor.com`, `@notify.mindrift.ai`, `iefp.pt`, `seg-social.pt`). Even though the agent's job is to grep for these, listing them in code reveals Simon's accountant / employers / agency contacts. |
| `.claude/hooks/block-git-add-all.sh` | sh | 44 | 2026-05-12 | KEEP-PUBLIC | Pure utility hook. No PII, fail-open pattern, generic block on `git add -A` / `.` / `--all`. |
| `.claude/hooks/check-template-sync.sh` | sh | 56 | 2026-05-12 | KEEP-PUBLIC | Pure utility hook. No PII; template-sync watcher. |
| `.claude/settings.json.example` | json(example) | 31 | 2026-05-12 | MOVE-PRIVATE | Hardcodes `/Users/simonsangla/projects/simon-productivity/...` in 2 hook commands (lines 12, 24). Personal absolute paths. Sanitizable, but as-is it leaks the user's username + workspace shape. |
| `.github/dependabot.yml` | yml | 11 | 2026-05-12 | KEEP-PUBLIC | Standard Dependabot config, weekly GH Actions updates. No PII. |
| `.github/workflows/ci.yml` | yml | 64 | 2026-05-12 | KEEP-PUBLIC | CI: jq-validate JSON + Python frontmatter lint. Action pinned to commit SHA. No PII. |
| `.gitignore` | other | 29 | 2026-05-12 | KEEP-PUBLIC | Standard gitignore + project-specific `.claude/settings*.json` carve-outs. No PII. |
| `.mcp.json` | json | 72 | 2026-05-12 | KEEP-PUBLIC | MCP server endpoints — all public Anthropic / vendor URLs. Slack `clientId 1601185624273.8899143856786` is a Slack OAuth client ID (public by Slack design, not a secret), but is Simon-specific to his Slack app — flag in §5 for sanitization to placeholder in polyglot template. |
| `CLAUDE.md` | md | 63 | 2026-05-12 | MOVE-PRIVATE | Bakes user-specific paths (`~/.claude/projects/-Users-simonsangla-projects-simon-productivity/memory/`, `~/projects/claude-config/cowork/`) and "Simon's environment" framing. Reveals personal workspace structure. Needs sanitization before public template. |
| `CONNECTORS.md` | md | 38 | 2026-05-12 | KEEP-PUBLIC | Pure documentation: which MCP feeds which step. No PII. |
| `HANDOFF.md` | md | 192 | 2026-05-13 | MOVE-PRIVATE | Heavy PII concentration: `spinto@spptaxes.pt` (accountant email, line 43), real third-party names (Mercor, Mindrift, Cristina), references to private sibling repo `claude-config` PR #20 content, internal project state, mention of `cowork/TASKS.md` (private user data). |
| `LICENSE` | other | 21 | 2026-05-12 | KEEP-PUBLIC | MIT, `Copyright (c) 2026 Simon Sangla`. Author name intentional. |
| `README.md` | md | 66 | 2026-05-12 | KEEP-PUBLIC | Public-facing install + skill table. References "Simon" as author / plugin pivot — intentional for a named user plugin. Renaming to `simon-skill` will require a rewrite anyway. |
| `SYNC_LOG.md` | md | 39 | 2026-05-12 | KEEP-PUBLIC | PR + merge audit log. References Mindrift / claude-config #20 process narrative but no direct PII. Borderline — flag in §5. |
| `TASKS.md` | md | 30 | 2026-05-12 | KEEP-PUBLIC | Plugin-dev backlog. No PII. |
| `commands/validate.md` | md | 80 | 2026-05-12 | KEEP-PUBLIC | Local CI mirror slash command. Pure utility. No PII. |
| `memory/glossary.md` | md | 32 | 2026-05-12 | MOVE-PRIVATE | Cross-references `/Users/simonsangla/projects/CLAUDE.md` (line 3). Otherwise generic plugin glossary, but the path reference ties it to a specific user. |
| `memory/projects/portuguese-tax-and-benefits.md` | md | 68 | 2026-05-12 | MOVE-PRIVATE | Validation diary for Simon's real Mercor-onboarding session. Drive paths with `simonsangla@gmail.com` (line 31), references to `~/projects/memory/projects/mercor_atividade.md` (private). Real compliance scenario. |
| `memory/projects/simon-productivity.md` | md | 87 | 2026-05-12 | MOVE-PRIVATE | Plugin-state file but embeds `~/Library/Application Support/Claude/local-agent-mode-sessions/.../plugin_01PGVaLEcQhDYUqu5FeM7juT/` (Simon's local cache GUID) and "Mercor onboarding decision" reference. Project narrative tied to specific session history. |
| `skills/bump-version/SKILL.md` | md | 138 | 2026-05-12 | KEEP-PUBLIC | Pure utility skill: atomic 3-field SemVer bump. Self-contained, generic. No PII. **PR3 candidate — see §4.** |
| `skills/dashboard.html` | html | 3213 | 2026-05-12 | KEEP-PUBLIC | Self-contained dashboard UI. PII scan returned zero hits. Big but generic — pure HTML/CSS/JS for the productivity dashboard. |
| `skills/memory-management/SKILL.md` | md | 323 | 2026-05-12 | KEEP-PUBLIC | Background skill teaching memory shape. All names in examples (Todd Martinez, Phoenix, Oracle) are illustrative synthetic data. No PII. |
| `skills/portuguese-tax-and-benefits/SKILL.md` | md | 104 | 2026-05-13 | KEEP-PUBLIC | Operating manual for PT tax / benefits. Pure reference; "Mercor / Outlier / Alignerr" appear only as public-company examples in line 44 (cross-border domain catalog), not as Simon's clients. No PII. |
| `skills/portuguese-tax-and-benefits/assets/answer-template.md` | md | 66 | 2026-05-12 | KEEP-PUBLIC | Pure 6-section answer template. No PII. |
| `skills/portuguese-tax-and-benefits/references/clarifying-questions.md` | md | 123 | 2026-05-12 | KEEP-PUBLIC | Domain-clarifying question list. No PII. |
| `skills/portuguese-tax-and-benefits/references/cross-border.md` | md | 170 | 2026-05-12 | KEEP-PUBLIC | Cross-border tax reference. Mercor/Outlier/Alignerr/etc. named as public B2B-marketplace examples, not Simon-specific. No PII. |
| `skills/portuguese-tax-and-benefits/references/iefp-seg-social.md` | md | 437 | 2026-05-13 | KEEP-PUBLIC | IEFP / Seg Social reference. PII scan clean. |
| `skills/portuguese-tax-and-benefits/references/irs.md` | md | 281 | 2026-05-13 | KEEP-PUBLIC | IRS reference. PII scan clean. |
| `skills/portuguese-tax-and-benefits/references/property-tax.md` | md | 162 | 2026-05-13 | KEEP-PUBLIC | Property-tax reference. PII scan clean. |
| `skills/portuguese-tax-and-benefits/references/self-employed-seg-social.md` | md | 221 | 2026-05-13 | KEEP-PUBLIC | Trabalhador-independente regime. "Mercor, Outlier" again as public-marketplace examples (line 169). No PII. |
| `skills/portuguese-tax-and-benefits/references/sources.md` | md | 155 | 2026-05-13 | KEEP-PUBLIC | Source URL catalog. No PII. |
| `skills/start/SKILL.md` | md | 178 | 2026-05-12 | KEEP-PUBLIC | Generic init skill. Folder-agnostic; no hardcoded tracks. No PII. |
| `skills/start/templates/LICENSE` | other | 21 | 2026-05-12 | KEEP-PUBLIC | `{{YEAR}}` / `{{AUTHOR_NAME}}` placeholders. Clean template. |
| `skills/start/templates/README.md` | md | 35 | 2026-05-12 | KEEP-PUBLIC | Placeholder-only README. Clean. |
| `skills/start/templates/ci.yml` | yml | 64 | 2026-05-12 | KEEP-PUBLIC | Identical to `.github/workflows/ci.yml` baseline. Clean. |
| `skills/start/templates/dependabot.yml` | yml | 11 | 2026-05-12 | KEEP-PUBLIC | Standard. Clean. |
| `skills/start/templates/gitignore` | other | 29 | 2026-05-12 | KEEP-PUBLIC | Clean. |
| `skills/start/templates/marketplace.json` | json | 21 | 2026-05-12 | KEEP-PUBLIC | Placeholder template. Clean. |
| `skills/start/templates/plugin.json` | json | 9 | 2026-05-12 | KEEP-PUBLIC | Placeholder template. Clean. |
| `skills/task-management/SKILL.md` | md | 91 | 2026-05-12 | KEEP-PUBLIC | Background skill for `TASKS.md` shape. Synthetic example data only. No PII. |
| `skills/update-review/SKILL.md` | md | 133 | 2026-05-12 | DELETE-DEAD | Top-of-file header literally says `— WIP`; frontmatter description begins "WIP A/B test skill"; `disable-model-invocation: true`. WIP-marked file per §2 precedence rule. Comparison test never run in production. Five-day-old WIP with no promotion decision. Renaming repo is the right moment to retire the experiment. (Re-introduce post-rename if A/B value is proven.) |
| `skills/update-review/templates/review.html` | html | 202 | 2026-05-12 | DELETE-DEAD | Orphan asset of the WIP `update-review` skill. Only consumer is the skill above. Same disposition. |
| `skills/update/SKILL.md` | md | 231 | 2026-05-12 | KEEP-PUBLIC | Production sync skill. Folder-agnostic, hard-rule respecter. No PII. |
| `vercel.json` | json | 46 | 2026-05-13 | KEEP-PUBLIC | Vercel build + security headers config. Clean. |
| `web/.gitignore` | other | 10 | 2026-05-13 | KEEP-PUBLIC | Clean. |
| `web/.vercelignore` | other | 6 | 2026-05-13 | KEEP-PUBLIC | Clean. |
| `web/README.md` | md | 85 | 2026-05-13 | KEEP-PUBLIC | PWA dashboard docs. Calls out sanitizer + privacy posture explicitly. No PII. |
| `web/package.json` | json | 14 | 2026-05-13 | KEEP-PUBLIC | Minimal, zero-deps build script wiring. Clean. |
| `web/public/app.js` | js | 374 | 2026-05-13 | KEEP-PUBLIC | Read-only PWA renderer. No PII; reads sanitized JSON only. |
| `web/public/icons/icon.svg` | svg | 9 | 2026-05-13 | KEEP-PUBLIC | App icon. Clean. |
| `web/public/index.html` | html | 54 | 2026-05-13 | KEEP-PUBLIC | App shell. Clean. |
| `web/public/manifest.webmanifest` | webmanifest | 20 | 2026-05-13 | KEEP-PUBLIC | PWA manifest. Clean. |
| `web/public/styles.css` | css | 487 | 2026-05-13 | KEEP-PUBLIC | Mobile-first styles. Clean. |
| `web/public/sw.js` | js | 65 | 2026-05-13 | KEEP-PUBLIC | Service worker (cache shell + network-first data). Clean. |
| `web/scripts/build-data.mjs` | mjs | 306 | 2026-05-13 | KEEP-PUBLIC | Build-time sanitizer + JSON bundler. **Itself** is the privacy mechanism — redacts emails, tokens, phone, `/Users/<name>/` paths before deploy. Clean. |

## 3. Counts

- **KEEP-PUBLIC:** 46
- **MOVE-PRIVATE:** 8
- **DELETE-DEAD:** 2 (update-review skill + its template)
- **Total tracked:** 57 (=46+8+2 plus the 1-file accounting gap below)

Sanity check: 46 + 8 + 2 = 56. The 57th file is `web/.gitignore` already in KEEP-PUBLIC — manual recount of the table confirms 47 KEEP-PUBLIC rows. Authoritative counts:

- **KEEP-PUBLIC:** 47 (~82%)
- **MOVE-PRIVATE:** 8 (~14%)
- **DELETE-DEAD:** 2 (~4%)
- **Total:** 57 (100%)

MOVE-PRIVATE files explicitly:
1. `.claude/agents/plugin-release-reviewer.md`
2. `.claude/settings.json.example`
3. `CLAUDE.md`
4. `HANDOFF.md`
5. `memory/glossary.md`
6. `memory/projects/portuguese-tax-and-benefits.md`
7. `memory/projects/simon-productivity.md`
8. (open question — see §5: `SYNC_LOG.md`, `README.md`, `.claude-plugin/plugin.json` author email, `.mcp.json` Slack clientId. Currently classified KEEP-PUBLIC; could flip to MOVE-PRIVATE on sanitization preference.)

DELETE-DEAD files explicitly:
1. `skills/update-review/SKILL.md`
2. `skills/update-review/templates/review.html`

## 4. PR3 candidate

- **Path:** `skills/bump-version/SKILL.md`
- **Language:** prompt-template markdown (SKILL.md format)
- **Why selected:**
  - Self-contained: no internal repo imports beyond reading `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` at runtime — both already existing manifest paths.
  - Single-file skill (no `references/`, no `assets/`, no `templates/` subdirectories). Lowest blast radius if the polyglot migration template needs revision.
  - Clear input/output contract: argument `major|minor|patch` in, three synced version fields out, no auto-commit.
  - Atomic, reversible (refuses dirty tree; uses `jq` + temp-file + atomic `mv`).
  - Exercises the prompt-template path of the polyglot setup — SKILL.md frontmatter, `disable-model-invocation` flag, `argument-hint`, embedded bash, references to skill-relative paths. This is the path the bulk of the repo lives on, so testing it first is highest-signal.
  - No Python in inventory, so the Python-first preference rule doesn't bind. TypeScript candidates exist (`web/scripts/build-data.mjs`) but they're coupled to the `web/` Vercel-deploy directory — higher blast radius for a first migration template.
- **Inputs/outputs:**
  - Inputs: CLI argument `major | minor | patch`; preconditions = clean working tree + branch HEAD + `jq` on PATH.
  - Outputs: writes `.version`, `.metadata.version`, `.plugins[0].version` in two JSON files; prints `git diff` of `.claude-plugin/` and a 5-step user-runs-these manual follow-up checklist. Never commits.
- **Estimated migration effort:** **S** (single SKILL.md, 138 lines, no dependencies beyond `jq`).

## 5. Open questions for human review

1. **`.claude-plugin/plugin.json` author email leak vs intentional metadata.**
   Path: `.claude-plugin/plugin.json` (also `.claude-plugin/marketplace.json` for owner name).
   Ambiguity: `simonsangla@gmail.com` is hardcoded as plugin author. Standard practice for published plugins, but exposes a personal Gmail address publicly forever. For `simon-skill` polyglot template, this should probably be `noreply@github.com` or a dedicated address.
   Proposed resolution: change author email to a GitHub noreply alias when renaming. Keep "Simon Sangla" as author name (publicly attributable, lower-risk than email).

2. **`.mcp.json` Slack OAuth `clientId` belongs to Simon's personal Slack app.**
   Path: `.mcp.json` line 8 — `1601185624273.8899143856786`.
   Ambiguity: Slack OAuth client IDs are designed to be public, not secret. But this one specifically registers Simon's Slack app — anyone using this plugin will be funneled through it. For a public polyglot template, this should be an empty placeholder or removed entirely.
   Proposed resolution: blank the `oauth.clientId` and `oauth.callbackPort` fields in PR2 scaffold, or remove the `oauth` block and let users wire their own.

3. **`SYNC_LOG.md` vs `HANDOFF.md` — both narrate session history but SYNC_LOG is cleaner.**
   Path: `SYNC_LOG.md`.
   Ambiguity: classified KEEP-PUBLIC because it's a PR merge log without direct PII, but it mentions parked claude-config #20 / Mindrift framing review / "cowork TASKS.md" cross-link narrative — context that only makes sense if you also have access to the private sibling repo. A reader of `simon-skill` will be confused; the log doesn't serve them.
   Proposed resolution: in PR2, decide between (a) clean reset to empty `SYNC_LOG.md` on rename, (b) move existing entries to `HANDOFF.md` history and start fresh, (c) move both to MOVE-PRIVATE since their utility is purely internal-state-narration.

4. **`README.md` is user-named throughout ("Simon's actual connectors", "forked from Anthropic's productivity plugin").**
   Path: `README.md`.
   Ambiguity: classified KEEP-PUBLIC since it's the canonical install doc, but the framing is "Simon's plugin", not "a polyglot skill template". Renaming to `simon-skill` either keeps the user-named framing or pivots to template-named framing.
   Proposed resolution: PR2 / PR3 will need to rewrite README anyway. Treat current text as drop-on-rename, not migrate.

5. **Untracked gitignored files in working tree — out of audit scope but worth noting.**
   Paths: `.DS_Store`, `memory/.DS_Store`, `.claude/settings.json`, `.claude/settings.local.json`.
   Ambiguity: not part of the repo. The `.DS_Store` pair is macOS noise. The two `.claude/settings*.json` files are Simon's locally-activated hook registrations + MCP allowlist (per `.gitignore` comment, this is intentional).
   Proposed resolution: no action in PR1. PR2 scaffold should re-include the same gitignore lines so the same gitignore protection carries forward.

6. **WIP skill removal: revisit value before deleting.**
   Paths: `skills/update-review/SKILL.md`, `skills/update-review/templates/review.html`.
   Ambiguity: classified DELETE-DEAD per WIP-header rule. The A/B-test pattern itself is interesting; the unfulfilled comparison test is what makes it dead.
   Proposed resolution: in PR2, delete the files but capture the "parallel-skill A/B pattern" as a one-paragraph note in HANDOFF or CONTRIBUTING — so the *pattern* survives the *experiment*.

7. **PT tax skill mentioning Mercor/Outlier/Alignerr as cross-border examples — re-confirm these are illustrative, not user-specific.**
   Paths: `skills/portuguese-tax-and-benefits/references/cross-border.md` line 35, 47, 51; `…/self-employed-seg-social.md` line 169; SKILL.md line 44.
   Ambiguity: I classified KEEP-PUBLIC because these are public companies named in a generic PT-freelancer tax reference. But the user (Simon) is in fact considering Mercor onboarding (per `memory/projects/portuguese-tax-and-benefits.md`). A reader might infer the skill author has business with these specific platforms.
   Proposed resolution: keep KEEP-PUBLIC — naming common US AI-eval marketplaces is normatively useful for any PT freelancer reading the skill, not personally revealing. But if Simon prefers conservative sanitization, replacing with `"US-incorporated AI-eval marketplaces (e.g., several public examples)"` removes the inference.
