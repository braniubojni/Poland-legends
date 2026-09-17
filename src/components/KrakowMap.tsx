import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { krakowStories } from "@/data/krakow";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function KrakowMap() {
  const locale = useProgress((s) => s.locale);
  const completed = useProgress((s) => s.completed);

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
      <div className="relative aspect-[4/5] w-full bg-bg">
        <svg viewBox="0 0 320 400" className="h-full w-full" aria-hidden="true">
          <path d="M20 300 C 80 280 140 310 200 290 C 250 275 300 300 320 285 L 320 400 L 0 400 Z" fill="var(--color-map-water)" />
          <ellipse cx="168" cy="168" rx="118" ry="96" fill="var(--color-map)" stroke="var(--color-fg)" strokeWidth="1.2" />
          <rect x="128" y="128" width="86" height="78" fill="var(--color-surface)" stroke="var(--color-fg)" strokeWidth="1.2" />
          <rect x="152" y="148" width="38" height="14" fill="var(--color-map-built)" />
          <rect x="148" y="248" width="52" height="36" fill="var(--color-map-earth)" stroke="var(--color-fg)" strokeWidth="1" />
          <text x="24" y="28" fill="var(--color-muted)" fontSize="11" fontFamily="Source Sans 3, sans-serif">
            {locale === "pl" ? "Stare Miasto" : "Old Town"}
          </text>
        </svg>
        {krakowStories.map((story) => {
          const done = completed.includes(story.id);
          return (
            <Link
              key={story.id}
              to="/krakow/$storyId"
              params={{ storyId: story.id }}
              className={cn(
                "absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-medium shadow-sm",
                done ? "border-success bg-success text-primary-fg" : "border-primary bg-primary text-primary-fg",
              )}
              style={{ left: `${story.pin.x}%`, top: `${story.pin.y}%` }}
              aria-label={t(story.title, locale)}
            >
              {done ? <Check className="size-4" /> : story.id.slice(0, 1).toUpperCase()}
            </Link>
          );
        })}
      </div>
      <ul className="divide-y divide-border">
        {krakowStories.map((story) => {
          const done = completed.includes(story.id);
          return (
            <li key={story.id}>
              <Link
                to="/krakow/$storyId"
                params={{ storyId: story.id }}
                className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 hover:bg-bg"
              >
                <span>
                  <span className="block font-medium">{t(story.title, locale)}</span>
                  <span className="text-sm text-muted">{t(story.place, locale)}</span>
                </span>
                {done ? (
                  <Check className="size-4 text-success" />
                ) : (
                  <span className="text-sm text-primary">{locale === "pl" ? "Otwórz" : "Open"}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
