import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { QuizQuestion } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";

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
      <Box
        sx={{
          p: 2.5,
          borderRadius: `${RADIUS.lg}px`,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h3">{locale === "pl" ? "Gotowe" : "Done"}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {score}/{questions.length}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: `${RADIUS.lg}px`,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.08em" }}>
        {locale === "pl" ? "Pytanie" : "Question"} {index + 1} / {questions.length}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>
        {t(q.prompt, locale)}
      </Typography>
      <Box
        component="ul"
        sx={{
          mt: 2,
          p: 0,
          m: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {q.options.map((opt) => {
          const isCorrect = opt.id === q.correctId;
          const isPick = opt.id === picked;
          let borderColor = "divider";
          let bgcolor = "background.default";
          let color = "text.primary";
          if (revealed && isCorrect) {
            borderColor = "success.main";
            bgcolor = "color-mix(in srgb, var(--op-success) 10%, transparent)";
          } else if (revealed && isPick && !isCorrect) {
            borderColor = "primary.main";
            bgcolor = "color-mix(in srgb, var(--op-primary) 10%, transparent)";
          } else if (revealed && !isCorrect && !isPick) {
            color = "text.secondary";
          }
          return (
            <Box component="li" key={opt.id}>
              <Box
                component="button"
                type="button"
                onClick={() => choose(opt.id)}
                sx={{
                  display: "flex",
                  minHeight: 48,
                  width: "100%",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                  borderRadius: `${RADIUS.sm}px`,
                  border: 1,
                  borderColor,
                  bgcolor,
                  color,
                  textAlign: "left",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  "&:hover": revealed
                    ? undefined
                    : { borderColor: "color-mix(in srgb, var(--op-fg) 30%, transparent)" },
                }}
              >
                {t(opt.label, locale)}
              </Box>
            </Box>
          );
        })}
      </Box>
      {revealed ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: "var(--op-ink-soft)" }}>
            {correct
              ? locale === "pl"
                ? "Tak."
                : "Yes."
              : locale === "pl"
                ? "Nie ten."
                : "Not that one."}{" "}
            {t(q.explanation, locale)}
          </Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={next}>
            {index + 1 >= questions.length
              ? locale === "pl"
                ? "Zakończ"
                : "Finish"
              : locale === "pl"
                ? "Dalej"
                : "Next"}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
