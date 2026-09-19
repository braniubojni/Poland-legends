# Opowieści — agent contract

Map of Polish stories. Kraków first. Legend beside the record, then a short game.

Read `specs/000-global.md` before writing code. Implement **one** child spec at a time.

## Stack lock

- Web: Vite SPA in `apps/web` — React 19, TypeScript, TanStack Router, **MUI v9** (custom parchment theme), React Context persist `opowiesci-v1`.
- No TanStack Start. No Next.js. No SSR. No auth.
- Lint/format: **oxlint** + **oxfmt**. Unused code: **Knip**. Tests: **Vitest v5**.
- Go API (`apps/api`, Fiber + SQLite, spec 007, done) — local `pnpm dev:full` talks to it via `fetch` + TanStack Query + Zod (spec 008). Public host is **Netlify Free** static (007c / 010); do not wrap Fiber as a Function. `apps/web/src/data/` is 007's seed + 007c's production data path. Do not invent a second Node API.
- Maps: MapLibre + OpenFreeMap. No Mapbox / CARTO / MapTiler keys.

## Commands

```
pnpm --filter web dev
pnpm --filter web test
pnpm --filter web typecheck
pnpm --filter web lint
pnpm --filter web fmt:check
pnpm --filter web knip
pnpm dev:api        # cd apps/api && go run .
pnpm dev:full       # web + api together
```

## Rules

- Do not add features that are not in the active spec.
- MUI must not look like a default dashboard (no Roboto, no purple, no elevated AppBar).
- Keep the six Kraków stories’ facts/legend copy except for typos.
- After implementing a spec, cover **at least 70%** of the new behaviour with tests (aim **80%**), tick Done checkboxes, and mark 000 / README.

## Out of scope until a spec exists

Accounts, Postgres, other cities, native apps.
