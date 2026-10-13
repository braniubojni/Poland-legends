# SPEC 025 — Remove playable-area and custom country borders

Status: **written** (not implemented)
Covers: **P-13**
Depends on: 015
Parent: [000-global.md](./000-global.md)

**015** drew two custom highlights: a vendored Poland polygon, and a rectangle of `KRAKOW_BOUNDS` on the city map. The city rectangle is the playable camera box, not a city limit, and it reads as a hard frame. The country polygon existed because recoloring OpenFreeMap’s `admin_level=2` lines would paint every neighbour the same way.

## Goal

Drop the Kraków playable-box highlight. Keep a Poland-only highlight only if the current OpenFreeMap style can isolate Poland. It cannot, so drop the vendored country polygon too. Home and city maps use the stock style lines (every country, same stroke).

## Check (OpenFreeMap, 2026-10-11)

Styles `positron` and `dark` both use source `openmaptiles`, source-layer `boundary`.

- Positron `boundary_2` and dark `boundary_country_*` filter on `admin_level == 2` (plus maritime / disputed / `claimed_by`). No country id.
- The TileJSON lists `adm0_l` / `adm0_r` (ISO 3166-1 alpha-3). On the live planet tiles those fields are filled for neighbours (CZE, SVK, LTU, BLR, RUS, …) and are **absent** on Poland’s own `admin_level=2` lines, including the Poland–Germany crossing at zoom 12. `POL` / `PL` / `DEU` do not appear. A filter on those fields would miss Poland and still catch other countries.
- Country identity in the tiles is a `place` point (`iso_a2=PL`), not a border geometry.

There is no built-in Poland-only border to turn on. Do not recolor `boundary_2`. Do not vendor a replacement polygon.

## Out of scope

- Changing `POLAND_BOUNDS` / `KRAKOW_BOUNDS` / cameras / pins (002 / 003)
- Restyling stock boundary colour, width, or dash
- New map keys, tile proxies, or runtime GeoJSON fetches
- Story copy

## Behaviour

- Kraków load and `setStyle` restyle do not add a GeoJSON source or a `krakow-border` layer.
- Poland load and `setStyle` restyle do not add a GeoJSON source or a `poland-border` layer.
- Neither map calls `setPaintProperty` on `boundary_2` or `boundary_country_*`.
- Delete `border-helpers.ts`, `border-helpers.test.ts`, `poland-border.json`, and the unused `@types/geojson` dependency.

## Files

- `apps/web/src/components/map/poland-helpers.ts`
- `apps/web/src/components/map/krakow-helpers.ts`
- `apps/web/src/components/map/border-removal.test.ts`
- `apps/web/tsconfig.json` (drop the `geojson` types entry)
- `apps/web/package.json` (drop `@types/geojson`)

## Done when

- [ ] Kraków map has no playable-box highlight
- [x] OpenFreeMap cannot highlight Poland alone (`adm0_*` missing on Poland’s lines; stock layers are all countries)
- [ ] Vendored Poland polygon and `addBorderOverlay` are removed
- [ ] Stock `boundary_*` layers are not recolored
- [ ] Cameras / bounds / pins unchanged from 002 / 003
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): mount and restyle of both maps add no border source/layer and do not paint stock boundary layers. Skip live tile rendering.
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 025 **done** and note that 015’s overlays are removed
