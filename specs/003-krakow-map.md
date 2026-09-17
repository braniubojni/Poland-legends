# SPEC 003 — Kraków city map (OpenFreeMap + MapLibre)

Status: in-progress
Covers: **P-02**, **P-03** (Kraków hover)
Depends on: 002
Parent: [000-global.md](./000-global.md)

Same no-key rule as 002. Raster CDNs (CARTO, MapTiler, Mapbox, OSM raster) are out.

## Decision

**OpenFreeMap + MapLibre** (public styles, no API key). Local-only Old Town geometry would hide streets; city orientation needs them.

## Goal

`/krakow` shows a real map of Stare Miasto / Wawel / Zwierzyniec with story pins at lat/lng. Click → `/krakow/$storyId`. List under the map stays the mobile target.

## Out of scope

- Story images (004)
- Stack rewrite (005–009)
- New stories or copy changes beyond pin coordinates
- Mapbox / CARTO / MapTiler / OSM raster keys

## Behaviour

- MapLibre GL + OpenFreeMap `positron` / `dark`. **No API key.**
- `maxBounds` + min zoom around Old Town so the first view is a city, not Poland.
- On mount: center near Rynek, zoom ~14.5. Home control recenters.
- **Ctrl / ⌘ + scroll** to zoom (`cooperativeGestures`).
- Zoom +/−. Metric scale bar.
- Story pins from `krakowStories[].pin` as `{ lat, lng }` (not percent `x/y`).
- Anchors (adjust only to keep pins clickable; do not invent stories):

| id | Approx |
|---|---|
| hejnal | 50.0616, 19.9394 |
| wieze | 50.0617, 19.9395 |
| golebie | 50.0614, 19.9373 |
| rynek | 50.0616, 19.9373 |
| smok | 50.0530, 19.9334 |
| lajkonik | 50.0545, 19.9145 |

- **One** `onSelect(storyId)` → navigate to `/krakow/$storyId`.
- Hover: title + place.
- Completed pin uses existing success color.
- Keep the list under the map.

## Files

- `src/lib/geo.ts` (Kraków bounds / center)
- `src/data/types.ts` (`pin: { lat, lng }`)
- `src/data/krakow.ts` (coords)
- `src/components/map/KrakowLibre.tsx`
- `src/components/KrakowMap.tsx`
- `src/styles.css`

## Done when

- [ ] Schematic Old Town SVG is gone
- [ ] Map shows Kraków streets (OpenFreeMap), not Poland-at-country-zoom
- [ ] Pins sit on Mariacki / Rynek / Wawel / Zwierzyniec (approx)
- [ ] Pin click opens `/krakow/$storyId`
- [ ] Hover shows title + place
- [ ] Completed pin uses success color
- [ ] List under the map still works on mobile
- [ ] Dark mode swaps OpenFreeMap style
- [ ] No Mapbox logo, no API-key watermark
- [ ] Typecheck passes
