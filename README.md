# simon-skill

A personal Claude plugin: opinionated SKILL.md packages for productivity and PT-freelancer tax/benefits work.

## Skills

- `bump-version` — atomic 3-field SemVer bump (no auto-commit)
- `memory-management` — background context for plugin-local memory
- `portuguese-tax-and-benefits` — operating manual for PT freelancer tax and benefits decisions
- `start` — generic init skill with template scaffold
- `task-management` — background context for `TASKS.md`
- `update` — sync skill for plugin updates

## Install

Via Claude plugin marketplace (once published):
1. In Claude Code or Cowork: `/plugin install simonsangla/simon-skill`
2. Confirm permissions
3. Skills become available as background context or invokable commands

## Local development

1. Clone this repo
2. `cp .claude/settings.json.example .claude/settings.json` and edit paths
3. Optional: set `SIMON_SKILL_PRIVATE_PATH` if you have access to the private companion repo with personal fixtures

## Slack integration

`.mcp.json` ships with the Slack OAuth `clientId` and `callbackPort` blank. To enable Slack:
1. Create your own Slack app at https://api.slack.com/apps
2. Set `clientId` and `callbackPort` in `.mcp.json` under `servers.slack.oauth`
3. Or remove the Slack server block entirely

## License

MIT. See LICENSE.
