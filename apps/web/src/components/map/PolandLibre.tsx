import { useEffect, useEffectEvent, useRef } from "react";
import { Map as MlMap, Marker } from "maplibre-gl";
import type { City, Locale } from "@/data/types";
import { MAP_STYLES } from "@/lib/geo";
import { useStoredTheme } from "@/lib/progress";
import { resolveTheme } from "@/lib/theme";
import { mountPolandMap, replacePolandPins, restylePolandMap } from "./poland-helpers";

type Props = {
  locale: Locale;
  cities: City[];
  onSelect: (cityId: string) => void;
};

const PolandLibre = ({ locale, cities, onSelect }: Props) => {
  const storedTheme = useStoredTheme();
  const theme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : resolveTheme(storedTheme);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const styleRef = useRef(MAP_STYLES[theme]);

  const latest = useEffectEvent(() => ({ locale, cities, onSelect, theme }));

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    return mountPolandMap({
      root,
      mapRef,
      markersRef,
      styleUrl: styleRef.current,
      latest,
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const next = MAP_STYLES[theme];
    if (!map || styleRef.current === next) return;
    styleRef.current = next;
    restylePolandMap(map, markersRef, next, latest);
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    replacePolandPins(map, markersRef, latest());
  }, [locale, cities]);

  return (
    <div ref={wrapRef} className={`op-map ${theme === "dark" ? "op-map-dark" : "op-map-light"}`} />
  );
};

export default PolandLibre;
