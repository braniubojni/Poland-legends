import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Copy } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";

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
        {locale === "pl" ? "Wskaż" : "Point"}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>
        {t(prompt, locale)}
      </Typography>
      <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
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
      </Box>
      {pick ? (
        <Typography variant="body2" sx={{ mt: 2, color: "var(--op-ink-soft)" }}>
          {pick === "tall"
            ? locale === "pl"
              ? "Tak. "
              : "Yes. "
            : locale === "pl"
              ? "Nie ta. "
              : "Not that one. "}
          {t(explanation, locale)}
        </Typography>
      ) : null}
    </Box>
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
  const borderColor =
    state === "right" ? "success.main" : state === "wrong" ? "primary.main" : "divider";
  const bgcolor =
    state === "right"
      ? "color-mix(in srgb, var(--op-success) 10%, transparent)"
      : state === "wrong"
        ? "color-mix(in srgb, var(--op-primary) 10%, transparent)"
        : "background.default";

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        display: "flex",
        minHeight: 176,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 1.5,
        px: 1.5,
        py: 2,
        borderRadius: `${RADIUS.md}px`,
        border: 1,
        borderColor,
        bgcolor,
        color: "text.primary",
        fontFamily: "inherit",
        opacity: state === "dim" ? 0.6 : 1,
        outline: selected ? "1px solid color-mix(in srgb, var(--op-fg) 10%, transparent)" : "none",
        "&:hover":
          state === "idle"
            ? { borderColor: "color-mix(in srgb, var(--op-fg) 30%, transparent)" }
            : undefined,
      }}
    >
      <svg width="72" height={height} viewBox={`0 0 72 ${height}`} aria-hidden="true">
        <rect x="22" y={height - 90} width="28" height="90" fill="var(--op-primary)" />
        <polygon
          points={`22,${height - 90} 36,${height - 114} 50,${height - 90}`}
          fill="var(--op-fg)"
        />
        {height > 140 ? (
          <rect x="32" y={height - 78} width="8" height="10" fill="var(--op-bg)" />
        ) : null}
      </svg>
      <Typography component="span" sx={{ fontSize: "0.875rem", textAlign: "center" }}>
        {label}
      </Typography>
    </Box>
  );
}
