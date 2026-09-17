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

export const MAP_STYLES: Record<Theme, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};
