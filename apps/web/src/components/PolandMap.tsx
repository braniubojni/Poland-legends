import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import PolandCityList from "@/components/PolandCityList";
import { citiesQueryOptions } from "@/lib/api";
import { useChrome } from "@/lib/chrome";
import { t } from "@/lib/copy";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";
import MapLoadingOverlay from "./map/MapLoadingOverlay";
import {
  nextMapLoadState,
  shouldShowSkeleton,
  type MapLoadEvent,
  type MapLoadState,
} from "./map/loading-helpers";

const PolandLibre = lazy(() => import("./map/PolandLibre"));

const PolandMap = () => {
  const locale = useLocale();
  const c = useChrome();
  const lockedLabel = c("city.locked");
  const navigate = useNavigate();
  const { data: cities, isPending, isError } = useQuery(citiesQueryOptions());
  const [notice, setNotice] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<MapLoadState>("loading");
  const onLoadEvent = useCallback(
    (event: MapLoadEvent) => setLoadState(nextMapLoadState(event)),
    [],
  );

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(id);
  }, [notice]);

  const onSelect = useCallback(
    (cityId: string) => {
      const city = cities?.find((item) => item.id === cityId);
      if (!city) return;
      if (city.unlocked) {
        void navigate({ to: "/krakow" });
        return;
      }
      // Matches the pre-009 notice copy exactly: "<name> — Coming next."
      setNotice(`${t(city.name, locale)} — ${lockedLabel}.`);
    },
    [cities, navigate, locale, lockedLabel],
  );

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box className="op-map-stage" aria-busy={loadState === "loading"}>
        <Suspense fallback={null}>
          <PolandLibre
            locale={locale}
            cities={cities ?? []}
            onSelect={onSelect}
            onLoadEvent={onLoadEvent}
          />
        </Suspense>
        {loadState === "loading" ? <MapLoadingOverlay label={c("map.loading")} /> : null}
        {notice ? (
          <Typography
            role="status"
            sx={{
              pointerEvents: "none",
              position: "absolute",
              insetInline: 12,
              bottom: 12,
              zIndex: 10,
              px: 1.5,
              py: 1,
              border: 1,
              borderColor: "divider",
              borderRadius: `${RADIUS.sm}px`,
              bgcolor: "color-mix(in srgb, var(--op-surface) 95%, transparent)",
              fontSize: "0.875rem",
            }}
          >
            {notice}
          </Typography>
        ) : null}
      </Box>
      <PolandCityList
        cities={cities ?? []}
        locale={locale}
        onSelect={onSelect}
        showSkeleton={shouldShowSkeleton(isPending, isError)}
      />
    </Paper>
  );
};

export { PolandMap };
