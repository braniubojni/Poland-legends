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
import type { City, Locale } from "@/data/types";
import { t } from "@/lib/copy";
import {
  applyMapTone,
  POLAND_BOUNDS,
  POLAND_FIT,
  POLAND_LNG_LAT,
  POLAND_MAX_BOUNDS,
  POLAND_ZOOM,
} from "@/lib/geo";
import type { Theme } from "@/lib/theme";
import { localeBag } from "./localeBag";

setWorkerUrl(maplibreWorkerUrl);

export type PolandPinState = {
  locale: Locale;
  cities: City[];
  onSelect: (id: string) => void;
  theme: Theme;
};

class PolandHomeControl implements IControl {
  private wrap?: HTMLDivElement;

  onAdd(map: MlMap) {
    const wrap = document.createElement("div");
    wrap.className = "maplibregl-ctrl maplibregl-ctrl-group";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "op-map-home";
    btn.setAttribute("aria-label", "Poland");
    btn.title = "Poland";
    btn.textContent = "PL";
    btn.addEventListener("click", () => {
      map.fitBounds(POLAND_BOUNDS, { ...POLAND_FIT, duration: 650 });
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

const placePins = (map: MlMap, locale: Locale, cities: City[], onSelect: (id: string) => void) => {
  const markers: Marker[] = [];
  for (const city of cities) {
    const label = city.unlocked
      ? t(city.name, locale)
      : `${t(city.name, locale)} — ${locale === "pl" ? "Wkrótce" : "Coming next"}`;
    const el = document.createElement("button");
    el.type = "button";
    el.className = `op-city-pin ${city.unlocked ? "is-open" : "is-locked"}${city.coords.lat > 53.2 ? " is-north" : ""}`;
    el.setAttribute("aria-label", label);
    el.innerHTML = `<span class="op-city-dot"></span><span class="op-city-tip">${label}</span>`;
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      onSelect(city.id);
    });
    markers.push(
      new Marker({ element: el, anchor: "center" })
        .setLngLat([city.coords.lng, city.coords.lat])
        .addTo(map),
    );
  }
  return markers;
};

export const replacePolandPins = (
  map: MlMap,
  markersRef: RefObject<Marker[]>,
  state: PolandPinState,
) => {
  for (const marker of markersRef.current) marker.remove();
  markersRef.current = placePins(map, state.locale, state.cities, state.onSelect);
};

export const mountPolandMap = ({
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
  latest: () => PolandPinState;
}) => {
  const map = new MlMap({
    container: root,
    style: styleUrl,
    center: POLAND_LNG_LAT,
    zoom: POLAND_ZOOM,
    minZoom: 4.4,
    maxZoom: 12,
    maxBounds: POLAND_MAX_BOUNDS,
    cooperativeGestures: true,
    attributionControl: { compact: true },
    locale: localeBag(latest().locale),
    fadeDuration: 0,
  });
  mapRef.current = map;

  map.addControl(new NavigationControl({ showCompass: false }), "top-left");
  map.addControl(new PolandHomeControl(), "top-left");
  map.addControl(new ScaleControl({ maxWidth: 180, unit: "metric" }), "bottom-left");

  map.on("load", () => {
    map.resize();
    map.fitBounds(POLAND_BOUNDS, { ...POLAND_FIT, duration: 0 });
    const state = latest();
    applyMapTone(map, state.theme);
    replacePolandPins(map, markersRef, state);
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

export const restylePolandMap = (
  map: MlMap,
  markersRef: RefObject<Marker[]>,
  styleUrl: string,
  latest: () => PolandPinState,
) => {
  map.setStyle(styleUrl, { diff: false });
  map.once("style.load", () => {
    const state = latest();
    applyMapTone(map, state.theme);
    replacePolandPins(map, markersRef, state);
  });
};
