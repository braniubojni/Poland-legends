# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product

Opowieści — map of Polish legends. Poland map → city → story pin → legend + fact + one short game + "see it today". v1 city: Kraków, 6 pins (hejnal, smok, wieze, lajkonik, golebie, rynek). Bilingual PL/EN, no accounts.

## Spec-driven workflow — read before coding

`specs/000-global.md` is the locked backlog + architecture lock; it is **not** an implementation spec. Real work happens in numbered child specs (`specs/001-…md` … `specs/006-…md`, see `specs/README.md` for status). Rules:

- Implement **one** child spec at a time. No drive-by stack rewrites, no features outside the active spec.
- If a child spec would conflict with `000-global.md`, stop and amend 000 first — don't just diverge in code.
- After implementing a spec, tick its Done checkboxes and update the status table in `specs/README.md` / `000-global.md`.
- Keep the six Kraków stories' facts/legend copy unchanged except for typos (explicit non-goal to alter them).
- Out of scope until a spec exists: accounts, Postgres, other cities, Netlify deploy, native apps, react-router, axios, react-icons, Next.js.

## Stack lock (do not swap without a spec amendment)

- Vite SPA at `apps/web` — React 19, TypeScript, TanStack Router (file-based routes), MUI v9 (custom parchment theme — must not look like a default dashboard: no Roboto, no purple, no elevated AppBar).
- State: React Context (`ProgressProvider`), persisted to `localStorage` key `opowiesci-v1` (versioned, with migration).
- Maps: MapLibre + OpenFreeMap public styles only — no Mapbox/CARTO/MapTiler keys, ever.
- Data is static TS in `apps/web/src/data/` until specs 007–009 (Go + SQLite API); do not invent a Node API in the meantime.
- Lint/format: oxlint + oxfmt. Tests: Vitest v5.
- No SSR, no auth, no TanStack Start, no Next.js.

## Commands

Run from repo root (pnpm workspace, single app `apps/web`):

```
pnpm --filter web dev          # vite dev server
pnpm --filter web build
pnpm --filter web preview
pnpm --filter web typecheck    # tsc --noEmit
pnpm --filter web lint         # oxlint .
pnpm --filter web fmt          # oxfmt (write)
pnpm --filter web fmt:check    # oxfmt --check
pnpm --filter web test         # vitest run
pnpm dev:api                    # cd apps/api && go run . (spec 007, not wired to the web app yet)
pnpm dev:full                   # web + api together
```

Root `package.json` scripts (`dev`/`build`/`typecheck`/`lint`/`fmt`/`test`) just forward to the same `--filter web` commands. To run a single test file: `pnpm --filter web test <path-or-pattern>` (Vitest picks up args after `run`).

## House code-style rules (`.cursor/rules/`, always-on for new code)

- **Function expressions, not declarations**: `const name = () => {}`, never `function name() {}`. Exceptions: class methods, object literal methods, generators.
- **Component size**: ~100 lines per component file, **150 hard cap** (counting imports + helpers + component). Split before growing further — extract a child component, a hook, or move logic to `helpers.ts`.
- **Colocated helpers**: pure helpers, one-off controls/classes, and long `useEffect` bodies (mount/listeners/cleanup) live in a `helpers.ts` next to the component (e.g. `components/map/helpers.ts`), not a global `src/helpers.ts`. The component file should be wiring + JSX calling a named helper.
- **React 19 APIs**: use `useEffectEvent` instead of the `ref.current = value` stale-callback pattern, `<Activity>` for offscreen-but-alive UI, `<Suspense>` for async boundaries, `use()` for reading a Promise/Context in render, and `ref` as a plain prop instead of `forwardRef`. No RSC, no `use server`.

Note: existing older files (e.g. `components/map/KrakowLibre.tsx`) may still violate these — spec 011 is the retrofit pass; don't "fix" unrelated files as a side effect of an unrelated change.

## Architecture

- **Routes** (`apps/web/src/routes/`, TanStack file-based router, tree generated into `routeTree.gen.ts`): `/` (Poland map, `index.tsx`), `/krakow` (city map + story list, `krakow/index.tsx`), `/krakow/$storyId` (story detail + game, `krakow/$storyId.tsx`), plus `__root.tsx` for shell/providers.
- **Maps** (`apps/web/src/components/map/`): `PolandLibre.tsx` (home) and `KrakowLibre.tsx` (city) wrap MapLibre GL against OpenFreeMap tiles. Camera, bounds, and pin coordinates are spec-defined (see `specs/002-…` / `003-…`) — don't invent new anchors without updating the spec table.
- **Data model** (`apps/web/src/data/types.ts`): `City` and `Story` are bilingual via a `Copy = { en, pl }` shape used throughout (titles, blurbs, facts, legends, quiz copy). `Game` is a discriminated union: `quiz` | `order` | `towers`, each rendered by a matching component in `components/games/`. Static content lives in `data/cities.ts` and `data/krakow.ts`.
- **Progress/state** (`apps/web/src/lib/progress/`): `ProgressProvider.tsx` is the Context provider for `locale`, `theme`, `completed: string[]`; `helpers.ts` has the pure persist/migrate logic (tested in `helpers.test.ts`); consumed via `index.ts`. This replaced zustand — do not reintroduce a global store library.
- **Theme** (`apps/web/src/theme/`): `opowiesci.ts` builds the MUI theme from `tokens.ts` (parchment/ink/crimson design tokens shared with map styling); `OpThemeProvider.tsx` wires light/dark, `prefers-color-scheme` is only a default on first visit — after that the explicit user choice wins.
- **Story art**: static WebP stills in `apps/web/public/stories/{id}.webp` and `{id}-dark.webp`, referenced via `Story.image.{light,dark}`.

## Other agent configs in this repo

`AGENTS.md` (repo root) carries the same stack-lock/rules summary for other tools (Cursor, Grok Build) — keep both in sync if the stack lock changes. `.grok/` holds Grok-specific status/skill files; treat as informational, not authoritative over `specs/`.
