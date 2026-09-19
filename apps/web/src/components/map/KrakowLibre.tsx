import { useEffect, useEffectEvent, useRef } from "react";
import { Map as MlMap, Marker } from "maplibre-gl";
import type { Locale, StorySummary } from "@/data/types";
import { MAP_STYLES } from "@/lib/geo";
import { useStoredTheme } from "@/lib/progress";
import { resolveTheme } from "@/lib/theme";
import { mountKrakowMap, replaceKrakowPins, restyleKrakowMap } from "./krakow-helpers";

type Props = {
  locale: Locale;
  stories: StorySummary[];
  completed: string[];
  onSelect: (storyId: string) => void;
};

const KrakowLibre = ({ locale, stories, completed, onSelect }: Props) => {
  const storedTheme = useStoredTheme();
  const theme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : resolveTheme(storedTheme);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const styleRef = useRef(MAP_STYLES[theme]);

  const latest = useEffectEvent(() => ({ locale, stories, completed, onSelect, theme }));

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    return mountKrakowMap({
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
    restyleKrakowMap(map, markersRef, next, latest);
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    replaceKrakowPins(map, markersRef, latest());
  }, [locale, stories, completed]);

  return (
    <div ref={wrapRef} className={`op-map ${theme === "dark" ? "op-map-dark" : "op-map-light"}`} />
  );
};

export default KrakowLibre;
