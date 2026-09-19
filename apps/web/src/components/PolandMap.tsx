import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import PolandCityList from "@/components/PolandCityList";
import type { Copy } from "@/data/types";
import { citiesQueryOptions } from "@/lib/api";
import { t } from "@/lib/copy";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";

const PolandLibre = lazy(() => import("./map/PolandLibre"));

const PolandMap = () => {
  const locale = useLocale();
  const navigate = useNavigate();
  const { data: cities } = useQuery(citiesQueryOptions());
  const [notice, setNotice] = useState<Copy | null>(null);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(id);
  }, [notice]);

  const onSelect = useCallback(
    (cityId: string) => {
      const city = cities?.find((c) => c.id === cityId);
      if (!city) return;
      if (city.unlocked) {
        void navigate({ to: "/krakow" });
        return;
      }
      setNotice({
        en: `${city.name.en} — Coming next.`,
        pl: `${city.name.pl} — Wkrótce.`,
      });
    },
    [cities, navigate],
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
            {t(notice, locale)}
          </Typography>
        ) : null}
      </Box>
      <PolandCityList cities={cities ?? []} locale={locale} onSelect={onSelect} />
    </Paper>
  );
};

export { PolandMap };
