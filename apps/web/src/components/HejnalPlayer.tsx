import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Volume2 } from "lucide-react";
import { useChrome } from "@/lib/chrome";
import { RADIUS } from "@/theme/tokens";
import { playHejnal } from "./hejnal-helpers";

const HejnalPlayer = () => {
  const c = useChrome();
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
        {playing ? c("hejnal.playing") : c("hejnal.play")}
      </Button>
      <Typography variant="body2" color="text.secondary">
        {c("hejnal.caption")}
      </Typography>
    </Box>
  );
};

export { HejnalPlayer };
