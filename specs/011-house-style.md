# SPEC 011 — House-style pass

Status: **done**
Covers: **S-07**
Depends on: 005
Parent: [000-global.md](./000-global.md)

One-day retrofit of existing `apps/web` UI code to the house rules in `.cursor/rules/`. No new features. Behaviour, copy, and visual language stay as they are.

## Goal

Every file under `apps/web/src` follows:

| Rule | Do |
|---|---|
| function expressions | `const name = () => {}` — no `function` declarations (class methods, object methods, `function*` OK) |
| component size | ~100 lines per component file; **150 hard cap** |
| colocated helpers | pure helpers, one-off controls, long effect mount/cleanup in a nearby `helpers.ts` — not a global `src/helpers.ts` |
| React 19 | `useEffectEvent` (not `fooRef.current = foo`), `<Suspense>` for async children, `use()` for context, `ref` as a prop — no RSC / `use server` / `forwardRef` |

Known first file: `KrakowLibre.tsx` — extract `mountKrakowMap` + pins/controls; replace stale-callback refs with `useEffectEvent`. Then the rest of `apps/web/src` the same way. Split oversized files; do not “fix” by deleting blank lines.

Data blobs (`data/krakow.ts`) and the MUI theme factory are not component files — convert exported functions only; do not split story copy.

`<Activity>` applies when UI is hidden but kept alive. This app has no such slot; do not invent one.

## Out of scope

- New features, copy, map cameras/pins, or chrome
- 006 Context shape, Go, 007c, 010, 009, 012 Knip
- Deleting unused exports (012)
- RSC / `use server` / `forwardRef`

## Files

- `specs/011-house-style.md` (this)
- `apps/web/src/components/map/` (`KrakowLibre.tsx`, `PolandLibre.tsx`, colocated helpers)
- `apps/web/src/components/PolandMap.tsx`, `KrakowMap.tsx` (lazy maps via `<Suspense>`)
- `apps/web/src/components/games/`
- `apps/web/src/components/HejnalPlayer.tsx` + colocated helper
- Remaining `apps/web/src` function declarations (routes, shell, theme, `copy.ts`, `geo.ts`, data accessors)
- `specs/000-global.md`, `specs/README.md`, `CLAUDE.md`

## Done when

- [x] No `function` declarations under `apps/web/src` (class / object methods OK)
- [x] No component file over 150 lines
- [x] Map mount/pins/controls live in colocated helpers; maps use `useEffectEvent` instead of stale callback refs
- [x] Lazy MapLibre views load behind `<Suspense>`
- [x] Behaviour unchanged: maps, lists, games, theme, PL/EN, persist
- [x] typecheck / lint / fmt / test pass
- [x] 000 / README mark 011 **done**
