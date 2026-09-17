import { createTheme, type Shadows } from "@mui/material/styles";
import type { Theme } from "@/lib/theme";
import { FONT_DISPLAY, FONT_SANS, RADIUS, TOKENS } from "./tokens";

export function createOpTheme(mode: Theme) {
  const t = TOKENS[mode];
  return createTheme({
    palette: {
      mode,
      primary: { main: t.primary, contrastText: t.primaryFg },
      success: { main: t.success, contrastText: t.primaryFg },
      background: { default: t.bg, paper: t.surface },
      text: { primary: t.fg, secondary: t.muted },
      divider: t.border,
    },
    typography: {
      fontFamily: FONT_SANS,
      h1: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        fontSize: "2.25rem",
      },
      h2: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        fontSize: "1.5rem",
      },
      h3: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.3,
      },
      button: {
        fontFamily: FONT_SANS,
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: { borderRadius: RADIUS.sm },
    shadows: Array(25).fill("none") as Shadows,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.bg,
            color: t.fg,
            fontFamily: FONT_SANS,
            lineHeight: 1.55,
          },
          button: { cursor: "pointer" },
          '[role="button"]': { cursor: "pointer" },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: false },
        styleOverrides: {
          root: {
            minHeight: 44,
            borderRadius: RADIUS.sm,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
          contained: {
            backgroundColor: t.primary,
            color: t.primaryFg,
            "&:hover": { backgroundColor: t.primary, opacity: 0.92 },
          },
          outlined: {
            borderColor: t.border,
            backgroundColor: t.surface,
            color: t.fg,
            "&:hover": { borderColor: t.fg, backgroundColor: t.bg },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: 44,
            height: 44,
            borderRadius: RADIUS.sm,
            border: `1px solid ${t.border}`,
            backgroundColor: t.surface,
            color: t.fg,
            "&:hover": { backgroundColor: t.bg },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            minWidth: 40,
            minHeight: 36,
            padding: "0 8px",
            border: "none",
            color: t.muted,
            fontSize: "0.875rem",
            "&.Mui-selected": {
              backgroundColor: t.fg,
              color: t.bg,
              "&:hover": { backgroundColor: t.fg },
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: RADIUS.xl,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
    },
  });
}
