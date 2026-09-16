import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Props = {
  questions: QuizQuestion[];
  onComplete: () => void;
};

export function QuizGame({ questions, onComplete }: Props) {
  const locale = useProgress((s) => s.locale);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  if (!q) return null;

  const revealed = picked !== null;
  const correct = picked === q.correctId;

  function choose(id: string) {
    if (picked) return;
    setPicked(id);
    if (id === q.correctId) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= questions.length) {
      setDone(true);
      onComplete();
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  if (done) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
        <p className="font-display text-xl text-fg">
          {locale === "pl" ? "Gotowe" : "Done"}
        </p>
        <p className="mt-2 text-muted">
          {score}/{questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">
        {locale === "pl" ? "Pytanie" : "Question"} {index + 1} / {questions.length}
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-fg">{t(q.prompt, locale)}</h3>
      <ul className="mt-4 flex flex-col gap-2">
        {q.options.map((opt) => {
          const isCorrect = opt.id === q.correctId;
          const isPick = opt.id === picked;
          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => choose(opt.id)}
                className={cn(
                  "flex min-h-12 w-full items-center rounded-[var(--radius-sm)] border px-4 py-3 text-left text-sm transition-colors duration-150",
                  !revealed && "border-border bg-bg hover:border-fg/30",
                  revealed && isCorrect && "border-success bg-success/10 text-fg",
                  revealed && isPick && !isCorrect && "border-primary bg-primary/10 text-fg",
                  revealed && !isCorrect && !isPick && "border-border bg-bg text-muted",
                )}
              >
                {t(opt.label, locale)}
              </button>
            </li>
          );
        })}
      </ul>
      {revealed ? (
        <div className="mt-4">
          <p className="text-sm text-ink-soft">
            {correct
              ? locale === "pl"
                ? "Tak."
                : "Yes."
              : locale === "pl"
                ? "Nie ten."
                : "Not that one."}{" "}
            {t(q.explanation, locale)}
          </p>
          <Button className="mt-4" onClick={next}>
            {index + 1 >= questions.length
              ? locale === "pl"
                ? "Zakończ"
                : "Finish"
              : locale === "pl"
                ? "Dalej"
                : "Next"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
