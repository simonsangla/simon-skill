# Context Hierarchy

This project uses Cavekit's context hierarchy.

## Tiers
- refs/ — Source material (Tier 1: what IS). Read-only.
- kits/ — Requirements (Tier 2: what MUST BE). Start at cavekit-overview.md.
- designs/ — Visual design system (cross-cutting constraint). Start at /DESIGN.md (project root).
- plans/ — Task graphs (Tier 3: HOW). Start at plan-overview.md.
- impl/ — Progress tracking (Tier 4: what WAS DONE). Start at impl-overview.md.

## Navigation
Start at the overview file in whichever tier is relevant to your task.
Only load domain-specific files when the overview points you there.
For UI work, read /DESIGN.md at the project root first if it exists. (Not present yet — create via /ck:design when a UI domain is added.)

## Command-prefix note
The Cavekit skill exposes both `/ck:*` (canonical, per the upstream spec) and `/2.0.0:*` (version-pinned alias) for the same commands. Either works; this hierarchy's docs use `/ck:*` to match the skill's own spec wording.
