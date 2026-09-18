import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Volume2 } from "lucide-react";
import { useLocale } from "@/lib/progress";
import { RADIUS } from "@/theme/tokens";

function playHejnal(ctx: AudioContext) {
  const notes = [349.23, 440, 523.25, 587.33, 523.25, 440, 392];
  const start = ctx.currentTime + 0.05;
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    const t0 = start + i * 0.28;
    const t1 = t0 + 0.22;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.08, t0 + 0.03);
    if (i === notes.length - 1) {
      gain.gain.linearRampToValueAtTime(0.08, t0 + 0.08);
      gain.gain.setValueAtTime(0, t0 + 0.09);
      osc.start(t0);
      osc.stop(t0 + 0.12);
    } else {
      gain.gain.linearRampToValueAtTime(0.001, t1);
      osc.start(t0);
      osc.stop(t1 + 0.02);
    }
  });
}

export function HejnalPlayer() {
  const locale = useLocale();
  const ctxRef = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);

  function onPlay() {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctxRef.current) ctxRef.current = new AC();
    const ctx = ctxRef.current;
    void ctx.resume();
    playHejnal(ctx);
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 2200);
  }

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
}
