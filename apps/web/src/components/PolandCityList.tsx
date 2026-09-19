import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/AppLink";
import { Lock } from "lucide-react";
import type { City, Locale } from "@/data/types";
import { useChrome } from "@/lib/chrome";
import { t } from "@/lib/copy";
import { RADIUS } from "@/theme/tokens";

const SKELETON_ROWS = 4;

type Props = {
  cities: City[];
  locale: Locale;
  onSelect: (cityId: string) => void;
  showSkeleton: boolean;
};

const PolandCityList = ({ cities, locale, onSelect, showSkeleton }: Props) => {
  const c = useChrome();
  return (
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
      {showSkeleton
        ? Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <Box component="li" key={i}>
              <Skeleton variant="rounded" height={48} sx={{ borderRadius: `${RADIUS.md}px` }} />
            </Box>
          ))
        : cities.map((city) => (
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
                      {c("city.locked")}
                    </Typography>
                  </span>
                  <Lock size={16} />
                </Box>
              )}
            </Box>
          ))}
    </Box>
  );
};

export default PolandCityList;
