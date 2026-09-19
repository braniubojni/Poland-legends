import Box from "@mui/material/Box";
import type { Copy, Locale } from "@/data/types";
import { t } from "@/lib/copy";
import { RADIUS } from "@/theme/tokens";
import { quizOptionTone } from "./quiz-helpers";

type Props = {
  label: Copy;
  locale: Locale;
  revealed: boolean;
  isCorrect: boolean;
  isPick: boolean;
  onChoose: () => void;
};

const QuizOption = ({ label, locale, revealed, isCorrect, isPick, onChoose }: Props) => {
  const { borderColor, bgcolor, color } = quizOptionTone(revealed, isCorrect, isPick);
  return (
    <Box component="li">
      <Box
        component="button"
        type="button"
        onClick={onChoose}
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
        {t(label, locale)}
      </Box>
    </Box>
  );
};

export default QuizOption;
