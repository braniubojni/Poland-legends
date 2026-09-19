import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Copy, OrderStep } from "@/data/types";
import { t } from "@/lib/copy";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";
import OrderStepButton from "./OrderStepButton";
import { shuffle } from "./order-helpers";

type Props = {
  prompt: Copy;
  steps: OrderStep[];
  correct: string[];
  onComplete: () => void;
};

const OrderGame = ({ prompt, steps, correct, onComplete }: Props) => {
  const locale = useLocale();
  const pool = useMemo(() => shuffle(steps), [steps]);
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"play" | "wrong" | "right">("play");

  const tap = (id: string) => {
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
  };

  const reset = () => {
    setPicked([]);
    setStatus("play");
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
        {locale === "pl" ? "Kolejność" : "Order"}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>
        {t(prompt, locale)}
      </Typography>
      <Box
        component="ol"
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
        {pool.map((step) => (
          <OrderStepButton
            key={step.id}
            label={step.label}
            locale={locale}
            order={picked.indexOf(step.id)}
            status={status}
            onTap={() => tap(step.id)}
          />
        ))}
      </Box>
      {status === "wrong" ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: "var(--op-ink-soft)" }}>
            {locale === "pl" ? "Prawie. Spróbuj od nowa." : "Almost. Try again."}
          </Typography>
          <Button sx={{ mt: 1.5 }} variant="outlined" onClick={reset}>
            {locale === "pl" ? "Jeszcze raz" : "Reset"}
          </Button>
        </Box>
      ) : null}
      {status === "right" ? (
        <Typography variant="body2" sx={{ mt: 2, color: "success.main" }}>
          {locale === "pl" ? "Taka jest kolej rzeczy." : "That is the order of things."}
        </Typography>
      ) : null}
    </Box>
  );
};

export { OrderGame };
