# SPEC 015 — Poland and Kraków playable borders

Status: **written** (not implemented)
Covers: **P-07**
Depends on: 002, 003
Parent: [000-global.md](./000-global.md)

OpenFreeMap already draws `boundary_2_*` for **every** country. Recoloring those layers would highlight Germany, Czechia, Slovakia, Ukraine, and the rest the same as Poland. The Kraków map is cropped to Stare Miasto / Wawel / Zwierzyniec (`KRAKOW_BOUNDS`); the municipal city border is off-screen.

## Goal

Home map: a visible outline of **Poland only**. City map: a visible outline of the **current playable box** (Stare Miasto + Wawel + Zwierzyniec). Cameras and `maxBounds` from 002 / 003 stay as they are.

## Out of scope

- Zooming out to Kraków’s municipality
- Planty / freehand Old Town silhouette
- Restyling OpenFreeMap `admin_level=2` (or other) style layers
- Map loaders (013), attribution “i” (014)
- New map keys, tile proxies, or runtime GeoJSON fetches
- Changing pin coordinates or story copy

## Behaviour

- Vendor two small GeoJSON polygons in the web app (no tile CDN, no Mapbox/MapTiler/CARTO key, no fetch on mount).
  - Poland: simplified country polygon (public-domain Natural Earth or equivalent). Not all neighbour borders.
  - Kraków: rectangle from existing `KRAKOW_BOUNDS` in `apps/web/src/lib/geo.ts` (`[[19.908, 50.048], [19.952, 50.068]]`).
- On MapLibre `load` and after `setStyle`, `addSource` + line layer. Re-apply the same way pins are re-applied today.
- Stroke uses theme primary (light `#9C1C2C` / dark `#C4454A`). Optional very light fill of the same hue.
- Stroke sits **inside** the viewport (padding so `fitBounds` / `maxBounds` do not clip it).
- Do not invent a second camera. Do not change `POLAND_BOUNDS` / `KRAKOW_BOUNDS` / `*_MAX_BOUNDS`.

## Files

- `apps/web/src/lib/geo.ts` (paint tokens only if needed; do not change cameras)
- Vendored GeoJSON next to the map code (not mixed into 007 / 007c city seed)
- `apps/web/src/components/map/poland-helpers.ts`
- `apps/web/src/components/map/krakow-helpers.ts`
- Shared `addBorderOverlay` (or equivalent) helper + colocated `*.test.ts`

## Done when

- [ ] Home map shows a Poland-only outline (neighbours are not the same highlight)
- [ ] Kraków map shows the playable `KRAKOW_BOUNDS` rectangle, visible at today’s camera
- [ ] Outline uses theme primary in light and dark
- [ ] Overlay survives theme `setStyle` restyle
- [ ] Stroke is not clipped off the viewport
- [ ] Cameras / bounds / pins unchanged from 002 / 003
- [ ] No new map API key; GeoJSON is vendored
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): GeoJSON matches `KRAKOW_BOUNDS`, Poland feature is a single polygon (not all countries), overlay helper adds/re-adds source + layer ids. Skip live tile rendering.
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 015 **done**
