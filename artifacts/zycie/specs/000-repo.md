# SPEC 000 — Repository bootstrap

Status: ready-to-implement
Owner: scaffold

## Goal

Empty monorepo that Cursor can extend without inventing a second architecture.

## Layout

```
zycie/
  AGENTS.md
  docs/
  specs/
  .cursor/rules/
  .cursor/skills/
  apps/web/          # created in SPEC 001
  apps/api/          # created in SPEC 003
  packages/content/  # created in SPEC 002
  package.json       # pnpm workspaces
  pnpm-workspace.yaml
  README.md
```

## Done when

- [ ] pnpm-workspace includes `apps/*` and `packages/*`
- [ ] README states product, stack lock, and “read AGENTS.md”
- [ ] No application code yet except placeholders if required by pnpm
- [ ] `.gitignore` covers node_modules, dist, .env, IDE junk
