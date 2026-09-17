import { useCallback, useEffect, useState, type ComponentType } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";
import { AppLink } from "@/components/AppLink";
import { Lock } from "lucide-react";
import { cities, cityById } from "@/data/cities";
import type { Copy, Locale } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";

type PolandMapView = ComponentType<{
  locale: Locale;
  onSelect: (cityId: string) => void;
}>;

export function PolandMap() {
  const locale = useProgress((s) => s.locale);
  const navigate = useNavigate();
  const [MapView, setMapView] = useState<PolandMapView | null>(null);
  const [notice, setNotice] = useState<Copy | null>(null);

  useEffect(() => {
    let live = true;
    void import("./map/PolandLibre").then((mod) => {
      if (live) setMapView(() => mod.PolandLibre);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(id);
  }, [notice]);

  const onSelect = useCallback(
    (cityId: string) => {
      const city = cityById(cityId);
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
    [navigate],
  );

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box className="op-map-stage">
        {MapView ? (
          <MapView locale={locale} onSelect={onSelect} />
        ) : (
          <Box className="op-map-fallback" aria-hidden />
        )}
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
      <Box
        component="ul"
        sx={{
          display: "grid",
          gap: 1,
          p: 2,
          m: 0,
          listStyle: "none",
          gridTemplateColumns: { sm: "1fr 1fr" },
        }}
      >
        {cities.map((city) => (
          <Box component="li" key={city.id}>
            {city.unlocked ? (
              <AppLink to="/krakow" style={{ display: "block" }}>
                <Box
                  sx={{
                    display: "flex",
                    minHeight: 48,
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.5,
                    borderRadius: `${RADIUS.md}px`,
                    border: 1,
                    borderColor: "color-mix(in srgb, var(--op-primary) 30%, transparent)",
                    bgcolor: "background.default",
                    fontSize: "0.875rem",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <span>
                    <Typography component="span" sx={{ display: "block", fontWeight: 500 }}>
                      {t(city.name, locale)}
                    </Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {t(city.blurb, locale)}
                    </Typography>
                  </span>
                </Box>
              </AppLink>
            ) : (
              <Box
                component="button"
                type="button"
                onClick={() => onSelect(city.id)}
                sx={{
                  display: "flex",
                  minHeight: 48,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.5,
                  borderRadius: `${RADIUS.md}px`,
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "background.default",
                  color: "text.secondary",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  "&:hover": { borderColor: "color-mix(in srgb, var(--op-fg) 20%, transparent)" },
                }}
              >
                <span>
                  <Typography
                    component="span"
                    sx={{ display: "block", fontWeight: 500, color: "var(--op-ink-soft)" }}
                  >
                    {t(city.name, locale)}
                  </Typography>
                  <Typography component="span" sx={{ fontSize: "0.875rem" }}>
                    {locale === "pl" ? "Wkrótce" : "Coming next"}
                  </Typography>
                </span>
                <Lock size={16} />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
