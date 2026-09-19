import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Volume2 } from "lucide-react";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";
import { playHejnal } from "./hejnal-helpers";

const HejnalPlayer = () => {
  const locale = useLocale();
  const ctxRef = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);

  const onPlay = () => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctxRef.current) ctxRef.current = new AC();
    const ctx = ctxRef.current;
    void ctx.resume();
    playHejnal(ctx);
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 2200);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderRadius: `${RADIUS.md}px`,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Button
        type="button"
        variant="outlined"
        onClick={onPlay}
        disabled={playing}
        sx={{ minWidth: 176 }}
      >
        <Volume2 size={16} style={{ marginRight: 8 }} />
        {locale === "pl"
          ? playing
            ? "Gra…"
            : "Odtwórz hejnał"
          : playing
            ? "Playing…"
            : "Play the call"}
      </Button>
      <Typography variant="body2" color="text.secondary">
        {locale === "pl"
          ? "Krótki motyw w F-dur. Urwany w pół frazy — tak, jak na wieży."
          : "A short F-major phrase. Cut mid-note — as from the tower."}
      </Typography>
    </Box>
  );
};

export { HejnalPlayer };
