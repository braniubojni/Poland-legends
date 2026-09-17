import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/AppLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { krakowStories } from "@/data/krakow";
import { useProgress } from "@/lib/progress";
import { FONT_DISPLAY, RADIUS } from "@/theme/tokens";

export function AppShell({ children }: { children: ReactNode }) {
  const locale = useProgress((s) => s.locale);
  const setLocale = useProgress((s) => s.setLocale);
  const completed = useProgress((s) => s.completed);
  const done = completed.filter((id) => krakowStories.some((s) => s.id === id)).length;

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default", color: "text.primary" }}>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "color-mix(in srgb, var(--op-bg) 90%, transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            mx: "auto",
            maxWidth: 768,
            px: 2,
            py: 1.5,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppLink
            to="/"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "1.125rem",
              letterSpacing: "-0.02em",
            }}
          >
            Opowieści
          </AppLink>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" }, fontVariantNumeric: "tabular-nums" }}
            >
              {done}/{krakowStories.length}
            </Typography>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={locale}
              onChange={(_, next: "pl" | "en" | null) => {
                if (next) setLocale(next);
              }}
              sx={{
                p: 0.5,
                border: 1,
                borderColor: "divider",
                borderRadius: `${RADIUS.sm}px`,
                bgcolor: "background.paper",
                "& .MuiToggleButtonGroup-grouped": { border: 0, borderRadius: "6px" },
              }}
            >
              <ToggleButton value="pl" aria-label="Polski">
                PL
              </ToggleButton>
              <ToggleButton value="en" aria-label="English">
                EN
              </ToggleButton>
            </ToggleButtonGroup>
            <ThemeToggle />
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mx: "auto", maxWidth: 768, px: 2, py: 3 }}>{children}</Box>
    </Box>
  );
}
