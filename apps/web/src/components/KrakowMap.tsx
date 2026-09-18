import { useCallback, useEffect, useState, type ComponentType } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AppLink } from "@/components/AppLink";
import { Check } from "lucide-react";
import type { Locale, StorySummary } from "@/data/types";
import { cityQueryOptions } from "@/lib/api";
import { t } from "@/lib/copy";
import { useCompleted, useLocale } from "@/lib/progress";

type KrakowMapView = ComponentType<{
  locale: Locale;
  stories: StorySummary[];
  completed: string[];
  onSelect: (storyId: string) => void;
}>;

export function KrakowMap() {
  const locale = useLocale();
  const completed = useCompleted();
  const navigate = useNavigate();
  const { data: city } = useQuery(cityQueryOptions("krakow"));
  const stories = city?.stories ?? [];
  const [MapView, setMapView] = useState<KrakowMapView | null>(null);

  useEffect(() => {
    let live = true;
    void import("./map/KrakowLibre").then((mod) => {
      if (live) setMapView(() => mod.KrakowLibre);
    });
    return () => {
      live = false;
    };
  }, []);

  const onSelect = useCallback(
    (storyId: string) => {
      void navigate({ to: "/krakow/$storyId", params: { storyId } });
    },
    [navigate],
  );

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box className="op-map-stage">
        {MapView ? (
          <MapView locale={locale} stories={stories} completed={completed} onSelect={onSelect} />
        ) : (
          <Box className="op-map-fallback" aria-hidden />
        )}
      </Box>
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
        {stories.map((story) => {
          const done = completed.includes(story.id);
          return (
            <Box component="li" key={story.id} sx={{ borderTop: 1, borderColor: "divider" }}>
              <AppLink
                to="/krakow/$storyId"
                params={{ storyId: story.id }}
                style={{ display: "block" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    minHeight: 56,
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    "&:hover": { bgcolor: "background.default" },
                  }}
                >
                  <span>
                    <Typography component="span" sx={{ display: "block", fontWeight: 500 }}>
                      {t(story.title, locale)}
                    </Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {t(story.place, locale)}
                    </Typography>
                  </span>
                  {done ? (
                    <Box sx={{ color: "success.main", display: "flex" }}>
                      <Check size={16} />
                    </Box>
                  ) : (
                    <Typography component="span" color="primary" sx={{ fontSize: "0.875rem" }}>
                      {locale === "pl" ? "Otwórz" : "Open"}
                    </Typography>
                  )}
                </Box>
              </AppLink>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
