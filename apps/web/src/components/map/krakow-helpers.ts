import type { RefObject } from "react";
import {
  Map as MlMap,
  Marker,
  NavigationControl,
  ScaleControl,
  setWorkerUrl,
  type IControl,
} from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale, StorySummary } from "@/data/types";
import { t } from "@/lib/copy";
import {
  applyMapTone,
  KRAKOW_BOUNDS,
  KRAKOW_FIT,
  KRAKOW_LNG_LAT,
  KRAKOW_MAX_BOUNDS,
  KRAKOW_ZOOM,
} from "@/lib/geo";
import type { Theme } from "@/lib/theme";
import { localeBag } from "./localeBag";

setWorkerUrl(maplibreWorkerUrl);

export type KrakowPinState = {
  locale: Locale;
  stories: StorySummary[];
  completed: string[];
  onSelect: (id: string) => void;
  theme: Theme;
};

class KrakowHomeControl implements IControl {
  private wrap?: HTMLDivElement;

  onAdd(map: MlMap) {
    const wrap = document.createElement("div");
    wrap.className = "maplibregl-ctrl maplibregl-ctrl-group";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "op-map-home";
    btn.setAttribute("aria-label", "Kraków");
    btn.title = "Kraków";
    btn.textContent = "KR";
    btn.addEventListener("click", () => {
      map.fitBounds(KRAKOW_BOUNDS, { ...KRAKOW_FIT, duration: 650 });
    });
    wrap.appendChild(btn);
    this.wrap = wrap;
    return wrap;
  }

  onRemove() {
    this.wrap?.remove();
    this.wrap = undefined;
  }
}

const placePins = (
  map: MlMap,
  locale: Locale,
  stories: StorySummary[],
  completed: string[],
  onSelect: (id: string) => void,
) => {
  const markers: Marker[] = [];
  for (const story of stories) {
    const done = completed.includes(story.id);
    const title = t(story.title, locale);
    const place = t(story.place, locale);
    const tip = `${title} · ${place}`;
    const el = document.createElement("button");
    el.type = "button";
    el.className = `op-story-pin ${done ? "is-done" : "is-open"}`;
    el.setAttribute("aria-label", tip);
    const mark = done ? "✓" : story.id.slice(0, 1).toUpperCase();
    el.innerHTML = `<span class="op-story-dot" aria-hidden="true">${mark}</span><span class="op-story-tip">${tip}</span>`;
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      onSelect(story.id);
    });
    markers.push(
      new Marker({ element: el, anchor: "center" })
        .setLngLat([story.pin.lng, story.pin.lat])
        .addTo(map),
    );
  }
  return markers;
};

export const replaceKrakowPins = (
  map: MlMap,
  markersRef: RefObject<Marker[]>,
  state: KrakowPinState,
) => {
  for (const marker of markersRef.current) marker.remove();
  markersRef.current = placePins(map, state.locale, state.stories, state.completed, state.onSelect);
};

export const mountKrakowMap = ({
  root,
  mapRef,
  markersRef,
  styleUrl,
  latest,
}: {
  root: HTMLDivElement;
  mapRef: RefObject<MlMap | null>;
  markersRef: RefObject<Marker[]>;
  styleUrl: string;
  latest: () => KrakowPinState;
}) => {
  const map = new MlMap({
    container: root,
    style: styleUrl,
    center: KRAKOW_LNG_LAT,
    zoom: KRAKOW_ZOOM,
    minZoom: 12.8,
    maxZoom: 17.5,
    maxBounds: KRAKOW_MAX_BOUNDS,
    cooperativeGestures: true,
    attributionControl: { compact: true },
    locale: localeBag(latest().locale),
    fadeDuration: 0,
  });
  mapRef.current = map;

  map.addControl(new NavigationControl({ showCompass: false }), "top-left");
  map.addControl(new KrakowHomeControl(), "top-left");
  map.addControl(new ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-left");

  map.on("load", () => {
    map.resize();
    map.fitBounds(KRAKOW_BOUNDS, { ...KRAKOW_FIT, duration: 0 });
    const state = latest();
    applyMapTone(map, state.theme);
    replaceKrakowPins(map, markersRef, state);
  });

  const resize = () => map.resize();
  const ro = new ResizeObserver(resize);
  ro.observe(root);
  if (root.parentElement) ro.observe(root.parentElement);
  requestAnimationFrame(resize);

  return () => {
    ro.disconnect();
    for (const marker of markersRef.current) marker.remove();
    markersRef.current = [];
    map.remove();
    mapRef.current = null;
  };
};

export const restyleKrakowMap = (
  map: MlMap,
  markersRef: RefObject<Marker[]>,
  styleUrl: string,
  latest: () => KrakowPinState,
) => {
  map.setStyle(styleUrl, { diff: false });
  map.once("style.load", () => {
    const state = latest();
    applyMapTone(map, state.theme);
    replaceKrakowPins(map, markersRef, state);
  });
};
