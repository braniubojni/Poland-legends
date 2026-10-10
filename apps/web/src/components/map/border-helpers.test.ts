import { describe, expect, it, vi } from "vitest";
import type { Map as MlMap } from "maplibre-gl";
import { KRAKOW_BOUNDS } from "@/lib/geo";
import { addBorderOverlay, rectangleFeature } from "./border-helpers";
import polandBorder from "./poland-border.json";

const fakeMap = () => {
  const layers = new Set<string>();
  const sources = new Set<string>();
  return {
    getLayer: vi.fn((id: string) => (layers.has(id) ? {} : undefined)),
    addLayer: vi.fn((spec: { id: string }) => layers.add(spec.id)),
    removeLayer: vi.fn((id: string) => layers.delete(id)),
    getSource: vi.fn((id: string) => (sources.has(id) ? {} : undefined)),
    addSource: vi.fn((id: string) => sources.add(id)),
    removeSource: vi.fn((id: string) => sources.delete(id)),
  } as unknown as MlMap & {
    getLayer: ReturnType<typeof vi.fn>;
    addLayer: ReturnType<typeof vi.fn>;
    removeLayer: ReturnType<typeof vi.fn>;
    getSource: ReturnType<typeof vi.fn>;
    addSource: ReturnType<typeof vi.fn>;
    removeSource: ReturnType<typeof vi.fn>;
  };
};

describe("rectangleFeature", () => {
  it("builds a closed ring matching the given bounds", () => {
    const feature = rectangleFeature(KRAKOW_BOUNDS);
    const [w, s] = KRAKOW_BOUNDS[0];
    const [e, n] = KRAKOW_BOUNDS[1];
    expect(feature.geometry.type).toBe("Polygon");
    expect(feature.geometry.coordinates).toEqual([
      [
        [w, s],
        [e, s],
        [e, n],
        [w, n],
        [w, s],
      ],
    ]);
  });
});

describe("vendored Poland border", () => {
  it("is a single polygon, not a country collection", () => {
    expect(polandBorder.type).toBe("Feature");
    expect(polandBorder.geometry.type).toBe("Polygon");
    expect(polandBorder.geometry.coordinates).toHaveLength(1);
  });
});

describe("addBorderOverlay", () => {
  it("adds a geojson source and fill + line layers", () => {
    const map = fakeMap();
    const feature = rectangleFeature(KRAKOW_BOUNDS);
    addBorderOverlay(map, "krakow-border", feature, "light");

    expect(map.addSource).toHaveBeenCalledWith("krakow-border", { type: "geojson", data: feature });
    expect(map.addLayer).toHaveBeenCalledWith(
      expect.objectContaining({ id: "krakow-border-fill", type: "fill" }),
    );
    expect(map.addLayer).toHaveBeenCalledWith(
      expect.objectContaining({ id: "krakow-border-line", type: "line" }),
    );
  });

  it("re-applies cleanly, removing any prior source/layers first", () => {
    const map = fakeMap();
    const feature = rectangleFeature(KRAKOW_BOUNDS);
    addBorderOverlay(map, "krakow-border", feature, "light");
    addBorderOverlay(map, "krakow-border", feature, "dark");

    expect(map.removeLayer).toHaveBeenCalledWith("krakow-border-line");
    expect(map.removeLayer).toHaveBeenCalledWith("krakow-border-fill");
    expect(map.removeSource).toHaveBeenCalledWith("krakow-border");
    expect(map.addSource).toHaveBeenCalledTimes(2);
  });
});
