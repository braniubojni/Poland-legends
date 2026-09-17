import { useCallback, useEffect, useState, type ComponentType } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { cities, cityById } from "@/data/cities";
import type { Copy, Locale } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type PolandMapView = ComponentType<{
  locale: Locale;
  onSelect: (cityId: string) => void;
}>;

export function PolandMap() {
  const locale = useProgress((s) => s.locale);
  const navigate = useNavigate();
  const [MapView, setMapView] = useState<PolandMapView | null>(null);
  const [notice, setNotice] = useState<Copy | null>(null);

  useEffect(() => {
    let live = true;
    void import("./map/PolandLibre").then((mod) => {
      if (live) setMapView(() => mod.PolandLibre);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(id);
  }, [notice]);

  const onSelect = useCallback(
    (cityId: string) => {
      const city = cityById(cityId);
      if (!city) return;
      if (city.unlocked) {
        void navigate({ to: "/krakow" });
        return;
      }
      setNotice({
        en: `${city.name.en} — Coming next.`,
        pl: `${city.name.pl} — Wkrótce.`,
      });
    },
    [navigate],
  );

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
      <div className="relative aspect-[4/5] w-full bg-map sm:aspect-[5/6]">
        {MapView ? (
          <MapView locale={locale} onSelect={onSelect} />
        ) : (
          <div className="absolute inset-0 bg-map" aria-hidden="true" />
        )}
        {notice ? (
          <p
            role="status"
            className="pointer-events-none absolute inset-x-3 bottom-3 z-10 rounded-[var(--radius-sm)] border border-border bg-surface/95 px-3 py-2 text-sm text-fg shadow-sm"
          >
            {t(notice, locale)}
          </p>
        ) : null}
      </div>
      <ul className="grid gap-2 p-4 sm:grid-cols-2">
        {cities.map((city) => (
          <li key={city.id}>
            {city.unlocked ? (
              <Link
                to="/krakow"
                className="flex min-h-12 items-center justify-between rounded-[var(--radius-md)] border border-primary/30 bg-bg px-4 py-3 text-sm hover:border-primary"
              >
                <span>
                  <span className="block font-medium">{t(city.name, locale)}</span>
                  <span className="text-muted">{t(city.blurb, locale)}</span>
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(city.id)}
                className={cn(
                  "flex min-h-12 w-full items-center justify-between rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-left text-sm text-muted hover:border-fg/20",
                )}
              >
                <span>
                  <span className="block font-medium text-ink-soft">{t(city.name, locale)}</span>
                  <span>{locale === "pl" ? "Wkrótce" : "Coming next"}</span>
                </span>
                <Lock className="size-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
