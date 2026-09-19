# SPEC 014 — Hide compact attribution “i”

Status: **written** (not implemented)
Covers: **P-06**
Depends on: 002, 003
Parent: [000-global.md](./000-global.md)

MapLibre `AttributionControlOptions` is only `compact` and `customAttribution`. There is no flag to hide the info button. Both maps currently pass `attributionControl: { compact: true }`, which always uses the compact “i” toggle (`maplibregl-ctrl-attrib-button`) even when the credit text is expanded.

## Goal

The compact info icon is gone on `/` and `/krakow`. OpenFreeMap / OpenMapTiles / OpenStreetMap credit **text stays visible** (license).

## Out of scope

- Map loaders (013), border overlays (015)
- Custom React attribution UI
- Removing credit text, Mapbox logos (already absent), or swapping tile styles
- Changing control positions, scale bar, or home buttons

## Behaviour

Apply in this order on **both** Poland and Kraków mounts:

1. **Library:** `attributionControl: { compact: false }` — official way to keep expanded attribution and skip compact mode (no “i” toggle).
2. **Fallback if the button still shows:** CSS `.op-map .maplibregl-ctrl-attrib-button { display: none }`.
3. **Do not** set `attributionControl: false` without a visible replacement. OSM / OpenFreeMap require the inner credit.

Keep existing `.maplibregl-ctrl-attrib` parchment styling. Credit links stay readable in light and dark.

## Files

- `apps/web/src/components/map/poland-helpers.ts`
- `apps/web/src/components/map/krakow-helpers.ts`
- `apps/web/src/styles.css`
- Shared attribution options constant (if extracted so both mounts cannot drift)
- Colocated `*.test.ts` for that constant / helper

## Done when

- [ ] Both maps use `{ compact: false }` (not `true`)
- [ ] Compact “i” is not visible on `/` and `/krakow`
- [ ] Attribution **text** remains visible (OpenFreeMap / OpenMapTiles / OSM)
- [ ] `attributionControl` is not `false` without a replacement
- [ ] CSS fallback hides `.maplibregl-ctrl-attrib-button` if the library still renders it
- [ ] Existing attrib parchment styling still applies
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): shared options are `compact: false` and not a disabled control. Skip live MapLibre tile/DOM clicks.
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 014 **done**
