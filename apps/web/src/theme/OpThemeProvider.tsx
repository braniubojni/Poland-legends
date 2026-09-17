import { useEffect, useMemo, useState, type ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useProgress } from "@/lib/progress";
import { resolveTheme, type Theme } from "@/lib/theme";
import { createOpTheme } from "./opowiesci";

export function OpThemeProvider({ children }: { children: ReactNode }) {
  const stored = useProgress((s) => s.theme);
  const [mode, setMode] = useState<Theme>(() => resolveTheme(stored));

  useEffect(() => {
    const sync = () => {
      const attr = document.documentElement.dataset.theme;
      if (attr === "light" || attr === "dark") {
        setMode(attr);
        return;
      }
      setMode(resolveTheme(stored));
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => obs.disconnect();
  }, [stored]);

  const theme = useMemo(() => createOpTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
