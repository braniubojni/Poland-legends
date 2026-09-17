import type { Theme } from "@/lib/theme";

/** geojson.io `?map=5.63/50.3295/18.00527` is zoom / lat / lng */
export const POLAND_ZOOM = 5.63;
export const POLAND_LNG_LAT: [number, number] = [18.00527, 50.3295];

export const POLAND_MAX_BOUNDS: [[number, number], [number, number]] = [
  [11.2, 47.15],
  [26.8, 56.55],
];

export const MAP_STYLES: Record<Theme, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};
