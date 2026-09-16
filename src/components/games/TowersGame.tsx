import { useState } from "react";
import type { Copy } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Props = {
  prompt: Copy;
  explanation: Copy;
  onComplete: () => void;
};

export function TowersGame({ prompt, explanation, onComplete }: Props) {
  const locale = useProgress((s) => s.locale);
  const [pick, setPick] = useState<"tall" | "short" | null>(null);

  function choose(which: "tall" | "short") {
    if (pick) return;
    setPick(which);
    onComplete();
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">
        {locale === "pl" ? "Wskaż" : "Point"}
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-fg">{t(prompt, locale)}</h3>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <TowerButton
          label={locale === "pl" ? "Ta" : "This one"}
          height={120}
          selected={pick === "short"}
          state={pick === null ? "idle" : pick === "short" ? "wrong" : "dim"}
          onClick={() => choose("short")}
        />
        <TowerButton
          label={locale === "pl" ? "Ta" : "This one"}
          height={168}
          selected={pick === "tall"}
          state={pick === null ? "idle" : pick === "tall" ? "right" : "dim"}
          onClick={() => choose("tall")}
        />
      </div>
      {pick ? (
        <p className="mt-4 text-sm text-ink-soft">
          {pick === "tall"
            ? locale === "pl"
              ? "Tak. "
              : "Yes. "
            : locale === "pl"
              ? "Nie ta. "
              : "Not that one. "}
          {t(explanation, locale)}
        </p>
      ) : null}
    </div>
  );
}

function TowerButton({
  label,
  height,
  selected,
  state,
  onClick,
}: {
  label: string;
  height: number;
  selected: boolean;
  state: "idle" | "right" | "wrong" | "dim";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-44 flex-col items-center justify-end gap-3 rounded-[var(--radius-md)] border px-3 py-4",
        state === "idle" && "border-border bg-bg hover:border-fg/30",
        state === "right" && "border-success bg-success/10",
        state === "wrong" && "border-primary bg-primary/10",
        state === "dim" && "border-border bg-bg opacity-60",
        selected && "ring-1 ring-fg/10",
      )}
    >
      <svg width="72" height={height} viewBox={`0 0 72 ${height}`} aria-hidden="true">
        <rect x="22" y={height - 90} width="28" height="90" fill="currentColor" className="text-primary" />
        <polygon points={`22,${height - 90} 36,${height - 114} 50,${height - 90}`} fill="currentColor" className="text-fg" />
        {height > 140 ? (
          <rect x="32" y={height - 78} width="8" height="10" fill="currentColor" className="text-bg" />
        ) : null}
      </svg>
      <span className="text-center text-sm">{label}</span>
    </button>
  );
}
