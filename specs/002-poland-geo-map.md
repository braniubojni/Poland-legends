# SPEC 002 — Poland map (OpenFreeMap + MapLibre)

Status: done
Covers: **P-01**, **P-03** (Poland hover)
Depends on: 001
Parent: [000-global.md](./000-global.md)

Raster CDNs (CARTO, MapTiler, Mapbox) watermark **API key required**. This map uses **OpenFreeMap** vector tiles + **MapLibre** (no token, no Mapbox logo).

## Goal

Home map is a real map of Poland, neighbours visible, city pins. Camera matches [geojson.io Poland view](https://geojson.io/?map=5.63/50.3295/18.00527). Kraków is open.

## Out of scope

- Kraków Old Town streets (003)
- Story images (004)
- Stack rewrite (005–009)
- Unlocking more cities
- Mapbox / CARTO / MapTiler / OSM raster keys

## Behaviour

- MapLibre GL + OpenFreeMap `positron` / `dark`. **No API key.**
- On mount: `center [18.00527, 50.3295]`, `zoom 5.63`, bearing 0. PL button recenters.
- `maxBounds` around Central Europe. No world as the first view.
- **Ctrl / ⌘ + scroll** to zoom (`cooperativeGestures`). Page scroll is not stolen.
- Zoom +/− control. Metric **scale bar** (`maxWidth: 100`, ~100 km at this zoom).
- Cities from `cities[]` as HTML pins.
- **One** `onSelect(cityId)`.
- Unlocked (Kraków) → `/krakow`.
- Locked → “Wkrótce / Coming next”. Stay on `/`.
- Hover: scale + name.
- List under the map stays the mobile target.

## Files

- `src/lib/geo.ts`
- `src/components/map/PolandLibre.tsx`
- `src/components/PolandMap.tsx`
- `src/styles.css`

## Done when

- [x] Map shows Poland + neighbours (not a pile of labels)
- [x] First paint matches zoom 5.63 / 50.33 N / 18.00 E
- [x] Zoom +/− works
- [x] Wheel zoom needs Ctrl or ⌘
- [x] Metric scale bar visible
- [x] No Mapbox logo, no API-key watermark
- [x] Kraków click opens the city page
- [x] Locked click stays home and shows the notice
- [x] Dark mode swaps the OpenFreeMap style
- [x] Typecheck passes
