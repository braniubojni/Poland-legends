export type Theme = "light" | "dark";

const THEME_COLORS = {
  light: { bg: "#f3eee6" },
  dark: { bg: "#161310" },
} as const;

export const resolveTheme = (stored: Theme | null | undefined): Theme => {
  if (stored === "light" || stored === "dark") return stored;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[theme].bg);
};
