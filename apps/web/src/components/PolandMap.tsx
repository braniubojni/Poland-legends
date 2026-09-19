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

const PolandLibre = lazy(() => import("./map/PolandLibre"));

const PolandMap = () => {
  const locale = useLocale();
  const c = useChrome();
  const lockedLabel = c("city.locked");
  const navigate = useNavigate();
  const { data: cities } = useQuery(citiesQueryOptions());
  const [notice, setNotice] = useState<string | null>(null);

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
      <Box className="op-map-stage">
        <Suspense fallback={<Box className="op-map-fallback" aria-hidden />}>
          <PolandLibre locale={locale} cities={cities ?? []} onSelect={onSelect} />
        </Suspense>
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
      <PolandCityList cities={cities ?? []} locale={locale} onSelect={onSelect} />
    </Paper>
  );
};

export { PolandMap };
