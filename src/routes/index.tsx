import { createFileRoute } from "@tanstack/react-router";
import { PolandMap } from "@/components/PolandMap";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const locale = useProgress((s) => s.locale);

  return (
    <main>
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        {locale === "pl" ? "Polska, miasto po mieście" : "Poland, city by city"}
      </p>
      <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight text-fg">
        {locale === "pl" ? "Opowieści, które wciąż stoją." : "Stories that still stand."}
      </h1>
      <p className="mt-4 max-w-prose text-ink-soft">
        {locale === "pl"
          ? "Mapa polskich opowieści. Zaczynamy od Krakowa: sześć miejsc, sześć krótkich gier. Legenda obok faktu. Potem kolejne miasta."
          : "A map of Polish stories. We start in Kraków: six places, six short games. Legend beside the record. Other cities later."}
      </p>
      <div className="mt-8">
        <PolandMap />
      </div>
    </main>
  );
}
