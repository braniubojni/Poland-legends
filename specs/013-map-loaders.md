# SPEC 013 — Map loaders

Status: **written** (not implemented)
Covers: **P-05**
Depends on: 002, 003, 008
Parent: [000-global.md](./000-global.md)

Today `/` and `/krakow` wait on a lazy MapLibre chunk and the style `load` event with only an empty parchment box. Lists under the maps render `[]` until TanStack Query returns.

## Goal

Both map pages show a parchment-themed loader until the map is actually painted, and skeleton rows in the list while city/story data is pending. Chrome stays Opowieści (crimson on parchment), not a default MUI purple spinner.

## Out of scope

- Story-detail image loaders (`/krakow/$storyId`)
- Games, Hejnał player, API / Query key changes
- Attribution “i” (014), border overlays (015)
- Changing cameras, pins, or OpenFreeMap styles

## Behaviour

- Overlay on `.op-map-stage` for `/` and `/krakow`.
- Show while the lazy MapLibre chunk is loading (`Suspense`) **and** until MapLibre fires `load` (style + first paint).
- Dismiss on `load`. Show again if `setStyle` restyle starts; dismiss when that style has loaded.
- Visual: parchment surface (`--op-map` / theme surface), crimson progress (theme `primary`, not MUI default purple).
- `aria-busy` on the stage. Bilingual status (PL/EN) matching `locale`.
- Honor existing `prefers-reduced-motion` (static indicator, no spin).
- Home city list and Kraków story list: MUI `Skeleton` rows while `useQuery` is **pending**. On error, keep current empty/error behaviour — no skeleton.
- Shared overlay stays small (house 150-line cap). Mount/load wiring stays in colocated helpers.

## Files

- `apps/web/src/components/PolandMap.tsx`
- `apps/web/src/components/KrakowMap.tsx`
- `apps/web/src/components/map/PolandLibre.tsx`
- `apps/web/src/components/map/KrakowLibre.tsx`
- `apps/web/src/components/map/poland-helpers.ts`
- `apps/web/src/components/map/krakow-helpers.ts`
- Shared overlay / skeleton helper next to the maps (keep the component files as wiring)
- `apps/web/src/styles.css`
- Colocated `*.test.ts` for overlay/skeleton visibility helpers

## Done when

- [ ] `/` map stage shows a parchment loader until MapLibre `load`
- [ ] `/krakow` map stage does the same
- [ ] Loader returns during theme `setStyle` restyle and dismisses when that style loads
- [ ] Progress uses theme crimson, not default MUI purple
- [ ] Stage is `aria-busy` with bilingual status while loading
- [ ] `prefers-reduced-motion` stops the spin
- [ ] City list and story list show skeleton rows only while the query is pending
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): overlay visibility (suspense / pre-load / loaded / restyle) and list skeleton vs pending/error
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 013 **done**
