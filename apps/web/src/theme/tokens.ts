export const TOKENS = {
  light: {
    bg: "#F3EEE6",
    surface: "#FAF6F0",
    fg: "#1C1917",
    muted: "#6F6458",
    primary: "#9C1C2C",
    primaryFg: "#FAF6F0",
    border: "#D9CFC3",
    inkSoft: "#3A322C",
    success: "#2F5D3A",
  },
  dark: {
    bg: "#161310",
    surface: "#1F1B18",
    fg: "#F3EEE6",
    muted: "#A89888",
    primary: "#C4454A",
    primaryFg: "#FAF6F0",
    border: "#3A322C",
    inkSoft: "#D4C4B4",
    success: "#7AAF82",
  },
} as const;

export const FONT_DISPLAY = '"Fraunces", "Times New Roman", serif';
export const FONT_SANS = '"Source Sans 3", ui-sans-serif, system-ui, sans-serif';

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
} as const;
