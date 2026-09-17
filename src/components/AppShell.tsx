import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { krakowStories } from "@/data/krakow";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const locale = useProgress((s) => s.locale);
  const setLocale = useProgress((s) => s.setLocale);
  const completed = useProgress((s) => s.completed);
  const done = completed.filter((id) => krakowStories.some((s) => s.id === id)).length;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="font-display text-lg tracking-tight">
            Opowieści
          </Link>
          <div className="flex items-center gap-2">
            <p className="hidden text-sm text-muted tabular-nums sm:block">
              {done}/{krakowStories.length}
            </p>
            <div className="flex rounded-[var(--radius-sm)] border border-border bg-surface p-0.5">
              <button
                type="button"
                className={cn(
                  "h-9 min-w-10 rounded-[6px] px-2 text-sm",
                  locale === "pl" ? "bg-fg text-bg" : "text-muted",
                )}
                onClick={() => setLocale("pl")}
              >
                PL
              </button>
              <button
                type="button"
                className={cn(
                  "h-9 min-w-10 rounded-[6px] px-2 text-sm",
                  locale === "en" ? "bg-fg text-bg" : "text-muted",
                )}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-6">{children}</div>
    </div>
  );
}
