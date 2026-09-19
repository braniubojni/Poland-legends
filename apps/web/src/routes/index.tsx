import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { PolandMap } from "@/components/PolandMap";
import { useChrome } from "@/lib/chrome";

const Home = () => {
  const c = useChrome();

  return (
    <Box component="main">
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.18em" }}>
        {c("home.eyebrow")}
      </Typography>
      <Typography variant="h1" sx={{ mt: 1 }}>
        {c("home.title")}
      </Typography>
      <Typography sx={{ mt: 2, maxWidth: "65ch", color: "var(--op-ink-soft)" }}>
        {c("home.intro")}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <PolandMap />
      </Box>
    </Box>
  );
};

export const Route = createFileRoute("/")({ component: Home });
