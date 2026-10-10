import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { QuizQuestion } from "@/data/types";
import { useChrome } from "@/lib/chrome";
import { t } from "@/lib/copy";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";
import QuizOption from "./QuizOption";

type Props = {
  questions: QuizQuestion[];
  onComplete: () => void;
};

const QuizGame = ({ questions, onComplete }: Props) => {
  const locale = useLocale();
  const c = useChrome();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  if (!q) return null;

  const revealed = picked !== null;
  const correct = picked === q.correctId;

  const choose = (id: string) => {
    if (picked) return;
    setPicked(id);
    if (id === q.correctId) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      onComplete();
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

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
        <Typography variant="h3">{c("game.quiz.done")}</Typography>
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
        {c("game.quiz.question")} {index + 1} / {questions.length}
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
        {q.options.map((opt) => (
          <QuizOption
            key={opt.id}
            label={opt.label}
            locale={locale}
            revealed={revealed}
            isCorrect={opt.id === q.correctId}
            isPick={opt.id === picked}
            onChoose={() => choose(opt.id)}
          />
        ))}
      </Box>
      {revealed ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: "var(--op-ink-soft)" }}>
            {correct ? c("game.quiz.correct") : c("game.quiz.incorrect")} {t(q.explanation, locale)}
          </Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={next}>
            {index + 1 >= questions.length ? c("game.quiz.finish") : c("game.quiz.next")}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export { QuizGame };
