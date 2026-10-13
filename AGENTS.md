# Opowieści — agent contract

Map of Polish stories. Kraków first. Legend beside the record, then a short game.

Read `specs/000-global.md` before writing code. Implement **one** child spec at a time.

## Stack lock

- Web: Vite SPA in `apps/web` — React 19, TypeScript, TanStack Router, **MUI v9** (custom parchment theme), React Context persist `opowiesci-v1`.
- No TanStack Start. No Next.js. No SSR. No auth.
- Lint/format: **oxlint** + **oxfmt**. Unused code: **Knip**. Tests: **Vitest v5**.
- No backend, local or in prod (018 removed the Go/SQLite dev API) — `pnpm dev` reads the same static content dev and prod, via TanStack Query + Zod (spec 008). Public host is **Netlify Free** static (007c / 010). `content/{seed,chrome}.json` is the source of truth (spec 009, relocated by 018); `apps/web/src/data/{cities,krakow,chrome}.ts` are **generated** from it via `pnpm gen:content` — do not hand-edit them. Do not invent a Node API.
- Maps: MapLibre + OpenFreeMap. No Mapbox / CARTO / MapTiler keys.

## Commands

```
pnpm --filter web dev
pnpm --filter web test
pnpm --filter web typecheck
pnpm --filter web lint
pnpm --filter web fmt:check
pnpm --filter web knip
pnpm gen:content    # regenerate apps/web/src/data/*.ts from content/
```

## Rules

- Do not add features that are not in the active spec.
- When discussing, drafting, reviewing, or amending a spec, change only files in `specs/`. Do not edit `apps/`, tests, content JSON, generated data, or config until the user explicitly asks to implement that spec.
- MUI must not look like a default dashboard (no Roboto, no purple, no elevated AppBar).
- Keep the six Kraków stories’ facts/legend copy except for typos.
- After implementing a spec, cover **at least 70%** of the new behaviour with tests (aim **80%**), tick Done checkboxes, and mark 000 / README.

## Out of scope until a spec exists

Accounts, Postgres, other cities, native apps.
