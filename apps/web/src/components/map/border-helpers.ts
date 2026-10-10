import type { Map as MlMap } from "maplibre-gl";
import type { Theme } from "@/lib/theme";
import { TOKENS } from "@/theme/tokens";

export type BorderFeature = GeoJSON.Feature<GeoJSON.Polygon>;

/** Closed rectangle ring from a `[[west, south], [east, north]]` box, e.g. `KRAKOW_BOUNDS`. */
export const rectangleFeature = (bounds: [[number, number], [number, number]]): BorderFeature => {
  const [[w, s], [e, n]] = bounds;
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [w, s],
          [e, s],
          [e, n],
          [w, n],
          [w, s],
        ],
      ],
    },
  };
};

/** Unconditional remove + re-add, mirroring how pins are re-applied on load/restyle. */
export const addBorderOverlay = (map: MlMap, id: string, feature: BorderFeature, theme: Theme) => {
  const lineId = `${id}-line`;
  const fillId = `${id}-fill`;
  const color = TOKENS[theme].primary;
  if (map.getLayer(lineId)) map.removeLayer(lineId);
  if (map.getLayer(fillId)) map.removeLayer(fillId);
  if (map.getSource(id)) map.removeSource(id);
  map.addSource(id, { type: "geojson", data: feature });
  map.addLayer({
    id: fillId,
    type: "fill",
    source: id,
    paint: { "fill-color": color, "fill-opacity": 0.05 },
  });
  map.addLayer({
    id: lineId,
    type: "line",
    source: id,
    paint: { "line-color": color, "line-width": 2 },
  });
};
