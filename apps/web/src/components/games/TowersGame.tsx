import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Copy } from "@/data/types";
import { useChrome } from "@/lib/chrome";
import { t } from "@/lib/copy";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";
import TowerButton from "./TowerButton";

type Props = {
  prompt: Copy;
  explanation: Copy;
  onComplete: () => void;
};

const TowersGame = ({ prompt, explanation, onComplete }: Props) => {
  const locale = useLocale();
  const c = useChrome();
  const [pick, setPick] = useState<"tall" | "short" | null>(null);

  const choose = (which: "tall" | "short") => {
    if (pick) return;
    setPick(which);
    onComplete();
  };

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
        {c("game.towers.point")}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>
        {t(prompt, locale)}
      </Typography>
      <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        <TowerButton
          label={c("game.towers.thisOne")}
          height={120}
          selected={pick === "short"}
          state={pick === null ? "idle" : pick === "short" ? "wrong" : "dim"}
          onClick={() => choose("short")}
        />
        <TowerButton
          label={c("game.towers.thisOne")}
          height={168}
          selected={pick === "tall"}
          state={pick === null ? "idle" : pick === "tall" ? "right" : "dim"}
          onClick={() => choose("tall")}
        />
      </Box>
      {pick ? (
        <Typography variant="body2" sx={{ mt: 2, color: "var(--op-ink-soft)" }}>
          {pick === "tall" ? c("game.towers.correct") : c("game.towers.incorrect")}
          {t(explanation, locale)}
        </Typography>
      ) : null}
    </Box>
  );
};

export { TowersGame };
