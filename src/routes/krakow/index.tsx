import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { KrakowMap } from "@/components/KrakowMap";
import { krakowStories } from "@/data/krakow";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/krakow/")({ component: KrakowPage });

function KrakowPage() {
  const locale = useProgress((s) => s.locale);
  const completed = useProgress((s) => s.completed);
  const done = completed.filter((id) => krakowStories.some((s) => s.id === id)).length;

  return (
    <main>
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        {locale === "pl" ? "Polska" : "Poland"}
      </Link>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight">Kraków</h1>
      <p className="mt-3 max-w-prose text-ink-soft">
        {locale === "pl"
          ? "Otwórz pinezkę. Przeczytaj, co ludzie opowiadają, i co da się sprawdzić. Zagraj minutę. Potem idź na miejsce."
          : "Open a pin. Read what people tell, and what can be checked. Play for a minute. Then go stand there."}
      </p>
      <p className="mt-2 text-sm tabular-nums text-muted">
        {done}/{krakowStories.length}
      </p>
      <div className="mt-6">
        <KrakowMap />
      </div>
    </main>
  );
}
