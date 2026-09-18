export type Theme = "light" | "dark";

export const THEME_COLORS = {
  light: { bg: "#f3eee6" },
  dark: { bg: "#161310" },
} as const;

const BOOT = `(function(){try{var t=null;var r=localStorage.getItem("opowiesci-v1");if(r){var p=JSON.parse(r);t=(p&&p.state&&p.state.theme)||(p&&p.theme);}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var d=t==="dark";var e=document.documentElement;e.classList.toggle("dark",d);e.dataset.theme=t;e.style.colorScheme=t;}catch(e){}})();`;

export const themeBootScript = BOOT;

export function resolveTheme(stored: Theme | null | undefined): Theme {
  if (stored === "light" || stored === "dark") return stored;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[theme].bg);
}
