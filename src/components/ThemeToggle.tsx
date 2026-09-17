import { useEffect, useState } from "react";
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
    return <span className="size-11 shrink-0" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-fg"
      aria-label={
        locale === "pl"
          ? dark
            ? "Tryb jasny"
            : "Tryb ciemny"
          : dark
            ? "Light mode"
            : "Dark mode"
      }
      aria-pressed={dark}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
