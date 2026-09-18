# SPEC 008 — TanStack Query + fetch + Zod

Status: done
Covers: **S-04**
Depends on: 006, 007
Parent: [000-global.md](./000-global.md)

007 stood up the Go API next to the frontend, unused. This spec wires `apps/web` to it: every screen that today reads `data/cities.ts` / `data/krakow.ts` directly switches to `fetch` against `apps/api`, validated with Zod, cached with TanStack Query. `data/cities.ts` and `data/krakow.ts` stay in the repo (007's seed source, and `theme.test.ts` still asserts against `krakowStories`), but the UI no longer imports them.

## Goal

- `QueryClientProvider` wraps the app.
- `apps/web/src/lib/api/`: `client.ts` (`fetch` wrapper + `NotFoundError`), `schemas.ts` (Zod mirrors of `data/types.ts`, parsed on every response), `queries.ts` (`queryOptions` builders).
- Query keys exactly as S-04: `['cities']`, `['city', id]`, `['story', cityId, storyId]`.
- Every component that rendered from `cities`/`krakowStories`/`getStory`/`nextStoryId`/`cityById` now reads from the API through these hooks: `PolandMap`, `PolandLibre`, `KrakowMap`, `KrakowLibre`, `AppShell`, `routes/krakow/index.tsx`, `routes/krakow/$storyId.tsx`.
- Map components (`PolandLibre`, `KrakowLibre`) take `cities` / `stories` as props instead of importing static arrays — same pattern already used for `locale`/`completed`.
- Loading: plain `useQuery` (not suspense) — matches the existing "lazy-loaded map" fallback pattern already in `PolandMap`/`KrakowMap`, no new async-boundary machinery needed for six fast local rows.
- 404 (`GET /v1/cities/:id/stories/:storyId` unknown id) surfaces as `NotFoundError`; the story route renders the existing "no such story" copy for it and a plain error message for anything else.
- API base URL: `VITE_API_URL`, default `http://localhost:8080` (matches `apps/api`'s default `PORT`).

## Out of scope

- Moving `cities`/`krakowStories` into SQLite as the source of truth, deleting `apps/web/src/data/` (that's 009)
- Netlify Free prep (007c); Netlify Free publish (010)
- Progress/completion storage — stays client-only (`ProgressProvider`, unchanged)
- POSTing quiz/game answers
- Suspense/`use()` adoption (011 house-style pass, not this spec)

## Files

- `specs/008-query-fetch-zod.md` (this)
- `apps/web/package.json` (`@tanstack/react-query`)
- `apps/web/src/main.tsx` (`QueryClientProvider`)
- `apps/web/src/lib/api/client.ts`, `schemas.ts`, `queries.ts`, `index.ts`
- `apps/web/src/data/types.ts` (add `StorySummary`, `CityDetail`)
- `apps/web/src/components/PolandMap.tsx`, `components/map/PolandLibre.tsx`
- `apps/web/src/components/KrakowMap.tsx`, `components/map/KrakowLibre.tsx`
- `apps/web/src/components/AppShell.tsx`
- `apps/web/src/routes/krakow/index.tsx`, `routes/krakow/$storyId.tsx`
- `AGENTS.md`, `specs/000-global.md`, `specs/README.md`

## Done when

- [x] No component under `apps/web/src/{components,routes}` imports `@/data/cities` or `@/data/krakow`
- [x] `pnpm dev:full` (API + web) shows the Poland map, Kraków map, and a story page all loaded from `apps/api`
- [x] Killing `apps/api` shows a plain error state on each screen, not a crash
- [x] Unknown `storyId` renders the existing "no such story" copy (via `NotFoundError`, not a generic error)
- [x] Zod parses every response; a shape mismatch throws instead of rendering `undefined` fields
- [x] `apps/web/src/data/cities.ts` / `krakow.ts` / `theme.test.ts` untouched and still green
- [x] `pnpm --filter web typecheck` / `lint` / `fmt:check` / `test` pass
- [x] 000 / README mark 008 **done**
