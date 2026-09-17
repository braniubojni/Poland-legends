import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Copy, OrderStep } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";

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
        {pool.map((step) => {
          const order = picked.indexOf(step.id);
          let borderColor = "divider";
          let bgcolor = "background.default";
          if (order >= 0 && status === "play") {
            borderColor = "color-mix(in srgb, var(--op-primary) 40%, transparent)";
            bgcolor = "color-mix(in srgb, var(--op-primary) 10%, transparent)";
          } else if (order >= 0 && status === "right") {
            borderColor = "success.main";
            bgcolor = "color-mix(in srgb, var(--op-success) 10%, transparent)";
          } else if (order >= 0 && status === "wrong") {
            borderColor = "primary.main";
            bgcolor = "color-mix(in srgb, var(--op-primary) 10%, transparent)";
          }
          return (
            <Box component="li" key={step.id}>
              <Box
                component="button"
                type="button"
                onClick={() => tap(step.id)}
                disabled={order >= 0 || status !== "play"}
                sx={{
                  display: "flex",
                  minHeight: 48,
                  width: "100%",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: `${RADIUS.sm}px`,
                  border: 1,
                  borderColor,
                  bgcolor,
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  "&:hover":
                    order >= 0 || status !== "play"
                      ? undefined
                      : { borderColor: "color-mix(in srgb, var(--op-fg) 30%, transparent)" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    border: 1,
                    borderColor: "divider",
                    fontSize: "0.75rem",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {order >= 0 ? order + 1 : ""}
                </Box>
                {t(step.label, locale)}
              </Box>
            </Box>
          );
        })}
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
}
