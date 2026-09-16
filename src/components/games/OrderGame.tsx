import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Copy, OrderStep } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Props = {
  prompt: Copy;
  steps: OrderStep[];
  correct: string[];
  onComplete: () => void;
};

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = next[i];
    const b = next[j];
    if (a === undefined || b === undefined) continue;
    next[i] = b;
    next[j] = a;
  }
  return next;
}

export function OrderGame({ prompt, steps, correct, onComplete }: Props) {
  const locale = useProgress((s) => s.locale);
  const pool = useMemo(() => shuffle(steps), [steps]);
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"play" | "wrong" | "right">("play");

  function tap(id: string) {
    if (status !== "play") return;
    if (picked.includes(id)) return;
    const next = [...picked, id];
    setPicked(next);
    if (next.length !== correct.length) return;
    const ok = next.every((stepId, i) => stepId === correct[i]);
    if (ok) {
      setStatus("right");
      onComplete();
    } else {
      setStatus("wrong");
    }
  }

  function reset() {
    setPicked([]);
    setStatus("play");
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">
        {locale === "pl" ? "Kolejność" : "Order"}
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-fg">{t(prompt, locale)}</h3>
      <ol className="mt-4 flex flex-col gap-2">
        {pool.map((step) => {
          const order = picked.indexOf(step.id);
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => tap(step.id)}
                disabled={order >= 0 || status !== "play"}
                className={cn(
                  "flex min-h-12 w-full items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 text-left text-sm",
                  order < 0 && "border-border bg-bg hover:border-fg/30",
                  order >= 0 && status === "play" && "border-primary/40 bg-primary/10",
                  order >= 0 && status === "right" && "border-success bg-success/10",
                  order >= 0 && status === "wrong" && "border-primary bg-primary/10",
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs tabular-nums">
                  {order >= 0 ? order + 1 : ""}
                </span>
                {t(step.label, locale)}
              </button>
            </li>
          );
        })}
      </ol>
      {status === "wrong" ? (
        <div className="mt-4">
          <p className="text-sm text-ink-soft">
            {locale === "pl" ? "Prawie. Spróbuj od nowa." : "Almost. Try again."}
          </p>
          <Button className="mt-3" variant="outline" onClick={reset}>
            {locale === "pl" ? "Jeszcze raz" : "Reset"}
          </Button>
        </div>
      ) : null}
      {status === "right" ? (
        <p className="mt-4 text-sm text-success">
          {locale === "pl" ? "Taka jest kolej rzeczy." : "That is the order of things."}
        </p>
      ) : null}
    </div>
  );
}
