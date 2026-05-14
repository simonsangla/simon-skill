# Contributing

## Skill design notes

### Parallel-skill A/B pattern (retired experiment)
An earlier `update-review` skill attempted to run alongside `update` as an A/B test, gated by `disable-model-invocation: true`. The pattern itself — two SKILL.md variants exercised from the same parent flow — is reusable for any skill where output quality is hard to score statically. The specific `update-review` experiment was retired before yielding comparison data; re-introduce if A/B value is proven.

## Adding a skill

1. Create `skills/<name>/SKILL.md` with YAML frontmatter
2. Keep skill self-contained: no internal imports beyond shared assets
3. Document inputs/outputs in the SKILL.md body
4. If your skill needs personal fixtures to demo, put them in the private companion repo
