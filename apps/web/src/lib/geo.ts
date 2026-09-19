import type { Map as MapLibreMap } from "maplibre-gl";
import type { Theme } from "@/lib/theme";

/** WGS84 box that just contains Poland (west/south → east/north). */
export const POLAND_BOUNDS: [[number, number], [number, number]] = [
  [14.07, 49.0],
  [24.15, 54.84],
];

export const POLAND_FIT = { padding: 36, bearing: 0, pitch: 0 } as const;

/** Fallback center / zoom before `fitBounds` runs. */
export const POLAND_ZOOM = 5.2;
export const POLAND_LNG_LAT: [number, number] = [19.12, 51.92];

export const POLAND_MAX_BOUNDS: [[number, number], [number, number]] = [
  [11.2, 47.15],
  [26.8, 56.55],
];

/** Stare Miasto + Wawel + Zwierzyniec — city, not country. */
export const KRAKOW_BOUNDS: [[number, number], [number, number]] = [
  [19.908, 50.048],
  [19.952, 50.068],
];

export const KRAKOW_FIT = { padding: 28, bearing: 0, pitch: 0 } as const;

export const KRAKOW_ZOOM = 14.4;
export const KRAKOW_LNG_LAT: [number, number] = [19.9373, 50.0614];

export const KRAKOW_MAX_BOUNDS: [[number, number], [number, number]] = [
  [19.88, 50.035],
  [19.98, 50.085],
];

export const MAP_STYLES: Record<Theme, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

/** Paint overrides so Positron stays paper-warm but water / parks / blocks stay distinct. */
const MAP_TONE = {
  light: {
    background: "#f1ebe3",
    water: "#b4c2c6",
    waterway: "#8ea0a6",
    park: "#cdd8c4",
    wood: "#c0ceb8",
    residential: "#ece4d8",
    building: "#ddd0c2",
    buildingOutline: "#c3b4a4",
  },
  dark: {
    background: "#1c1815",
    water: "#3a4a4f",
    waterway: "#4d5f65",
    park: "#2d3a2c",
    wood: "#334133",
    residential: "#26211c",
    building: "#3a322b",
    buildingOutline: "#52483e",
  },
} as const;

export const applyMapTone = (map: MapLibreMap, theme: Theme) => {
  const tone = MAP_TONE[theme];
  const paint = (id: string, name: string, value: string) => {
    if (!map.getLayer(id)) return;
    (map.setPaintProperty as (layer: string, prop: string, next: string) => void)(id, name, value);
  };
  paint("background", "background-color", tone.background);
  paint("water", "fill-color", tone.water);
  paint("waterway", "line-color", tone.waterway);
  paint("park", "fill-color", tone.park);
  paint("landcover_wood", "fill-color", tone.wood);
  paint("landuse_residential", "fill-color", tone.residential);
  paint("building", "fill-color", tone.building);
  paint("building", "fill-outline-color", tone.buildingOutline);
};
