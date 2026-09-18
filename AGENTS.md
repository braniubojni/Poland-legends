# Opowieści — agent contract

Map of Polish stories. Kraków first. Legend beside the record, then a short game.

Read `specs/000-global.md` before writing code. Implement **one** child spec at a time.

## Stack lock

- Web: Vite SPA in `apps/web` — React 19, TypeScript, TanStack Router, **MUI v9** (custom parchment theme), React Context persist `opowiesci-v1`.
- No TanStack Start. No Next.js. No SSR. No auth.
- Lint/format: **oxlint** + **oxfmt**. Tests: **Vitest v5**.
- Data is static TS until spec 008/009. Go API is spec 007 — do not invent a Node API.
- Maps: MapLibre + OpenFreeMap. No Mapbox / CARTO / MapTiler keys.

## Commands

```
pnpm --filter web dev
pnpm --filter web test
pnpm --filter web typecheck
pnpm --filter web lint
pnpm --filter web fmt:check
```

## Rules

- Do not add features that are not in the active spec.
- MUI must not look like a default dashboard (no Roboto, no purple, no elevated AppBar).
- Keep the six Kraków stories’ facts/legend copy except for typos.
- After implementing a spec, tick its Done checkboxes and mark 000 / README.

## Out of scope until a spec exists

Accounts, Postgres, other cities, Netlify (010), native apps.
