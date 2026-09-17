import { useCallback, useEffect, useState, type ComponentType } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { krakowStories } from "@/data/krakow";
import type { Locale } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";

type KrakowMapView = ComponentType<{
  locale: Locale;
  completed: string[];
  onSelect: (storyId: string) => void;
}>;

export function KrakowMap() {
  const locale = useProgress((s) => s.locale);
  const completed = useProgress((s) => s.completed);
  const navigate = useNavigate();
  const [MapView, setMapView] = useState<KrakowMapView | null>(null);

  useEffect(() => {
    let live = true;
    void import("./map/KrakowLibre").then((mod) => {
      if (live) setMapView(() => mod.KrakowLibre);
    });
    return () => {
      live = false;
    };
  }, []);

  const onSelect = useCallback(
    (storyId: string) => {
      void navigate({ to: "/krakow/$storyId", params: { storyId } });
    },
    [navigate],
  );

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
      <div className="op-map-stage">
        {MapView ? (
          <MapView locale={locale} completed={completed} onSelect={onSelect} />
        ) : (
          <div className="absolute inset-0 bg-map" aria-hidden="true" />
        )}
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
