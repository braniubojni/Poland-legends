import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";
import { resolveTheme, type Theme } from "@/lib/theme";

export function useResolvedTheme(): Theme {
  const stored = useProgress((s) => s.theme);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(stored));

  useEffect(() => {
    const read = () => {
      const attr = document.documentElement.dataset.theme;
      if (attr === "light" || attr === "dark") {
        setTheme(attr);
        return;
      }
      setTheme(resolveTheme(stored));
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, [stored]);

  return theme;
}
