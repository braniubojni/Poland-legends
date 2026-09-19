import { lazy, Suspense, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import KrakowStoryList from "@/components/KrakowStoryList";
import { cityQueryOptions } from "@/lib/api";
import { useChrome } from "@/lib/chrome";
import { useCompleted, useLocale } from "@/lib/progress";
import MapLoadingOverlay from "./map/MapLoadingOverlay";
import {
  nextMapLoadState,
  shouldShowSkeleton,
  type MapLoadEvent,
  type MapLoadState,
} from "./map/loading-helpers";

const KrakowLibre = lazy(() => import("./map/KrakowLibre"));

const KrakowMap = () => {
  const locale = useLocale();
  const c = useChrome();
  const completed = useCompleted();
  const navigate = useNavigate();
  const { data: city, isPending, isError } = useQuery(cityQueryOptions("krakow"));
  const stories = city?.stories ?? [];
  const [loadState, setLoadState] = useState<MapLoadState>("loading");
  const onLoadEvent = useCallback(
    (event: MapLoadEvent) => setLoadState(nextMapLoadState(event)),
    [],
  );

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box className="op-map-stage" aria-busy={loadState === "loading"}>
        <Suspense fallback={null}>
          <KrakowLibre
            locale={locale}
            stories={stories}
            completed={completed}
            onSelect={(storyId) => {
              void navigate({ to: "/krakow/$storyId", params: { storyId } });
            }}
            onLoadEvent={onLoadEvent}
          />
        </Suspense>
        {loadState === "loading" ? <MapLoadingOverlay label={c("map.loading")} /> : null}
      </Box>
      <KrakowStoryList
        stories={stories}
        completed={completed}
        locale={locale}
        showSkeleton={shouldShowSkeleton(isPending, isError)}
      />
    </Paper>
  );
};

export { KrakowMap };
