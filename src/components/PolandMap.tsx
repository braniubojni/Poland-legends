import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { cities } from "@/data/cities";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function PolandMap() {
  const locale = useProgress((s) => s.locale);

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
      <svg viewBox="0 0 360 400" className="h-auto w-full" role="img" aria-label={locale === "pl" ? "Mapa Polski" : "Map of Poland"}>
        <path
          d="M70 108 L96 86 L128 90 L152 78 L176 84 L198 64 L226 74 L248 58 L276 66 L304 84 L322 112 L330 146 L324 176 L338 206 L336 242 L318 276 L296 308 L268 336 L236 356 L200 364 L166 356 L136 338 L108 314 L86 284 L70 250 L58 214 L62 178 L54 148 L66 124 Z"
          fill="#ebe3d6"
          stroke="#1c1917"
          strokeWidth="1.6"
        />
        {cities.map((city) => {
          const cx = city.map.x * 3.6;
          const cy = city.map.y * 4;
          return (
            <g key={city.id}>
              <circle
                cx={cx}
                cy={cy}
                r={city.unlocked ? 7 : 5}
                fill={city.unlocked ? "#9c1c2c" : "#6f6458"}
              />
              {city.unlocked ? (
                <circle cx={cx} cy={cy} r="12" fill="none" stroke="#9c1c2c" strokeWidth="1.2" opacity="0.45" />
              ) : null}
            </g>
          );
        })}
      </svg>
      <ul className="grid gap-2 p-4 sm:grid-cols-2">
        {cities.map((city) => (
          <li key={city.id}>
            {city.unlocked ? (
              <Link
                to="/krakow"
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-[var(--radius-md)] border border-primary/30 bg-bg px-4 py-3 text-sm hover:border-primary",
                )}
              >
                <span>
                  <span className="block font-medium">{t(city.name, locale)}</span>
                  <span className="text-muted">{t(city.blurb, locale)}</span>
                </span>
              </Link>
            ) : (
              <div className="flex min-h-12 items-center justify-between rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-sm text-muted">
                <span>
                  <span className="block font-medium text-ink-soft">{t(city.name, locale)}</span>
                  <span>{locale === "pl" ? "Wkrótce" : "Coming next"}</span>
                </span>
                <Lock className="size-4" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
