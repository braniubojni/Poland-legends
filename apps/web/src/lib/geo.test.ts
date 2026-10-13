import type { Map as MapLibreMap } from "maplibre-gl";
import { describe, expect, it } from "vitest";
import { applyMapTone, KRAKOW_BOUNDS, KRAKOW_LNG_LAT, POLAND_BOUNDS, POLAND_LNG_LAT } from "./geo";

const boxContains = (box: [[number, number], [number, number]], lng: number, lat: number) => {
  const [[w, s], [e, n]] = box;
  return lng >= w && lng <= e && lat >= s && lat <= n;
};

describe("map bounds", () => {
  it("keeps Kraków inside Poland", () => {
    expect(boxContains(POLAND_BOUNDS, POLAND_LNG_LAT[0], POLAND_LNG_LAT[1])).toBe(true);
    expect(boxContains(POLAND_BOUNDS, KRAKOW_LNG_LAT[0], KRAKOW_LNG_LAT[1])).toBe(true);
    const [[w, s], [e, n]] = KRAKOW_BOUNDS;
    expect(e).toBeGreaterThan(w);
    expect(n).toBeGreaterThan(s);
  });
});

describe("applyMapTone", () => {
  const paintFor = (present: string[], theme: "light" | "dark") => {
    const paints: [string, string, string][] = [];
    const layers = new Set(present);
    const map = {
      getLayer: (id: string) => (layers.has(id) ? {} : undefined),
      setPaintProperty: (id: string, name: string, value: string) => {
        paints.push([id, name, value]);
      },
    };
    applyMapTone(map as unknown as MapLibreMap, theme);
    return paints;
  };

  it("skips layers the style does not have", () => {
    const paints = paintFor(["background", "building"], "light");
    expect(paints.map(([id]) => id)).toEqual(["background", "building", "building"]);
    expect(paints[0]?.[2]).toBe("#f1ebe3");
  });

  it("paints the dark water tone when that layer exists", () => {
    const paints = paintFor(["water"], "dark");
    expect(paints).toEqual([["water", "fill-color", "#3a4a4f"]]);
  });
});
