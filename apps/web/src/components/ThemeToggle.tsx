import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Moon, Sun } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { applyTheme, resolveTheme } from "@/lib/theme";

export function ThemeToggle() {
  const locale = useProgress((s) => s.locale);
  const theme = useProgress((s) => s.theme);
  const setTheme = useProgress((s) => s.setTheme);
  const [ready, setReady] = useState(false);
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const next = resolveTheme(theme);
    setResolved(next);
    applyTheme(next);
    setReady(true);
    if (theme) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const os = resolveTheme(null);
      setResolved(os);
      applyTheme(os);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const dark = resolved === "dark";

  if (!ready) {
    return <span style={{ width: 44, height: 44, flexShrink: 0 }} aria-hidden="true" />;
  }

  return (
    <IconButton
      type="button"
      aria-label={
        locale === "pl" ? (dark ? "Tryb jasny" : "Tryb ciemny") : dark ? "Light mode" : "Dark mode"
      }
      aria-pressed={dark}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
