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
import { cities } from "@/data/cities";
import type { Locale } from "@/data/types";
import { t } from "@/lib/copy";
import {
  applyMapTone,
  MAP_STYLES,
  POLAND_BOUNDS,
  POLAND_FIT,
  POLAND_LNG_LAT,
  POLAND_MAX_BOUNDS,
  POLAND_ZOOM,
} from "@/lib/geo";
import { useProgress } from "@/lib/progress";
import { resolveTheme } from "@/lib/theme";

setWorkerUrl(maplibreWorkerUrl);

type Props = {
  locale: Locale;
  onSelect: (cityId: string) => void;
};

function localeBag(locale: Locale): Record<string, string> {
  if (locale === "pl") {
    return {
      "CooperativeGesturesHandler.WindowsHelpText":
        "Użyj Ctrl + przewijania, aby zmienić powiększenie",
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

function placePins(map: MlMap, locale: Locale, onSelect: (id: string) => void) {
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
}

export function PolandLibre({ locale, onSelect }: Props) {
  const storedTheme = useProgress((s) => s.theme);
  const theme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : resolveTheme(storedTheme);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  const localeRef = useRef(locale);
  const styleRef = useRef(MAP_STYLES[theme]);
  onSelectRef.current = onSelect;
  localeRef.current = locale;

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const map = new MlMap({
      container: root,
      style: styleRef.current,
      center: POLAND_LNG_LAT,
      zoom: POLAND_ZOOM,
      minZoom: 4.4,
      maxZoom: 12,
      maxBounds: POLAND_MAX_BOUNDS,
      cooperativeGestures: true,
      attributionControl: { compact: true },
      locale: localeBag(localeRef.current),
      fadeDuration: 0,
    });
    mapRef.current = map;

    map.addControl(new NavigationControl({ showCompass: false }), "top-left");
    map.addControl(new PolandHomeControl(), "top-left");
    map.addControl(new ScaleControl({ maxWidth: 180, unit: "metric" }), "bottom-left");

    map.on("load", () => {
      map.resize();
      map.fitBounds(POLAND_BOUNDS, { ...POLAND_FIT, duration: 0 });
      applyMapTone(map, theme);
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = placePins(map, localeRef.current, (id) => onSelectRef.current(id));
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
      applyMapTone(map, theme);
      for (const marker of markersRef.current) marker.remove();
      markersRef.current = placePins(map, localeRef.current, (id) => onSelectRef.current(id));
    });
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const marker of markersRef.current) marker.remove();
    markersRef.current = placePins(map, locale, (id) => onSelectRef.current(id));
  }, [locale]);

  return (
    <div ref={wrapRef} className={`op-map ${theme === "dark" ? "op-map-dark" : "op-map-light"}`} />
  );
}
