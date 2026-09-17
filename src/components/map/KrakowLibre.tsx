import { useEffect, useRef } from "react";
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
import { krakowStories } from "@/data/krakow";
import type { Locale } from "@/data/types";
import { t } from "@/lib/copy";
import {
  KRAKOW_BOUNDS,
  KRAKOW_FIT,
  KRAKOW_LNG_LAT,
  KRAKOW_MAX_BOUNDS,
  KRAKOW_ZOOM,
  MAP_STYLES,
} from "@/lib/geo";
import { useProgress } from "@/lib/progress";
import { resolveTheme } from "@/lib/theme";

setWorkerUrl(maplibreWorkerUrl);

type Props = {
  locale: Locale;
  completed: string[];
  onSelect: (storyId: string) => void;
};

function localeBag(locale: Locale): Record<string, string> {
  if (locale === "pl") {
    return {
      "CooperativeGesturesHandler.WindowsHelpText": "Użyj Ctrl + przewijania, aby zmienić powiększenie",
      "CooperativeGesturesHandler.MacHelpText": "Użyj ⌘ + przewijania, aby zmienić powiększenie",
      "CooperativeGesturesHandler.MobileHelpText": "Przesuń mapę dwoma palcami",
    };
  }
  return {
    "CooperativeGesturesHandler.WindowsHelpText": "Use Ctrl + scroll to zoom the map",
    "CooperativeGesturesHandler.MacHelpText": "Use ⌘ + scroll to zoom the map",
    "CooperativeGesturesHandler.MobileHelpText": "Use two fingers to move the map",
  };
}

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

function placePins(
  map: MlMap,
  locale: Locale,
  completed: string[],
  onSelect: (id: string) => void,
) {
  const markers: Marker[] = [];
  for (const story of krakowStories) {
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
}

export function KrakowLibre({ locale, completed, onSelect }: Props) {
  const storedTheme = useProgress((s) => s.theme);
  const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : resolveTheme(storedTheme);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  const localeRef = useRef(locale);
  const completedRef = useRef(completed);
  const styleRef = useRef(MAP_STYLES[theme]);
  onSelectRef.current = onSelect;
  localeRef.current = locale;
  completedRef.current = completed;

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const map = new MlMap({
      container: root,
      style: styleRef.current,
      center: KRAKOW_LNG_LAT,
      zoom: KRAKOW_ZOOM,
      minZoom: 12.8,
      maxZoom: 17.5,
      maxBounds: KRAKOW_MAX_BOUNDS,
      cooperativeGestures: true,
      attributionControl: { compact: true },
      locale: localeBag(localeRef.current),
      fadeDuration: 0,
    });
    mapRef.current = map;

    map.addControl(new NavigationControl({ showCompass: false }), "top-left");
    map.addControl(new KrakowHomeControl(), "top-left");
    map.addControl(new ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-left");

    map.on("load", () => {
      map.resize();
      map.fitBounds(KRAKOW_BOUNDS, { ...KRAKOW_FIT, duration: 0 });
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = placePins(map, localeRef.current, completedRef.current, (id) =>
        onSelectRef.current(id),
      );
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
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const next = MAP_STYLES[theme];
    if (!map || styleRef.current === next) return;
    styleRef.current = next;
    map.setStyle(next, { diff: false });
    map.once("style.load", () => {
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = placePins(map, localeRef.current, completedRef.current, (id) =>
        onSelectRef.current(id),
      );
    });
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const marker of markersRef.current) marker.remove();
    markersRef.current = placePins(map, locale, completed, (id) => onSelectRef.current(id));
  }, [locale, completed]);

  return (
    <div
      ref={wrapRef}
      className={`op-map absolute inset-0 ${theme === "dark" ? "op-map-dark" : "op-map-light"}`}
    />
  );
}
