import { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import KrakowStoryList from "@/components/KrakowStoryList";
import { cityQueryOptions } from "@/lib/api";
import { useCompleted, useLocale } from "@/lib/progress";

const KrakowLibre = lazy(() => import("./map/KrakowLibre"));

const KrakowMap = () => {
  const locale = useLocale();
  const completed = useCompleted();
  const navigate = useNavigate();
  const { data: city } = useQuery(cityQueryOptions("krakow"));
  const stories = city?.stories ?? [];

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box className="op-map-stage">
        <Suspense fallback={<Box className="op-map-fallback" aria-hidden />}>
          <KrakowLibre
            locale={locale}
            stories={stories}
            completed={completed}
            onSelect={(storyId) => {
              void navigate({ to: "/krakow/$storyId", params: { storyId } });
            }}
          />
        </Suspense>
      </Box>
      <KrakowStoryList stories={stories} completed={completed} locale={locale} />
    </Paper>
  );
};

export { KrakowMap };
