import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RADIUS } from "@/theme/tokens";

type Props = {
  label: string;
  height: number;
  selected: boolean;
  state: "idle" | "right" | "wrong" | "dim";
  onClick: () => void;
};

const TowerButton = ({ label, height, selected, state, onClick }: Props) => {
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
};

export default TowerButton;
