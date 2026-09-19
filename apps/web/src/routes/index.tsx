import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { PolandMap } from "@/components/PolandMap";
import { useLocale } from "@/lib/progress";

const Home = () => {
  const locale = useLocale();

  return (
    <Box component="main">
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.18em" }}>
        {locale === "pl" ? "Polska, miasto po mieście" : "Poland, city by city"}
      </Typography>
      <Typography variant="h1" sx={{ mt: 1 }}>
        {locale === "pl" ? "Opowieści, które wciąż stoją." : "Stories that still stand."}
      </Typography>
      <Typography sx={{ mt: 2, maxWidth: "65ch", color: "var(--op-ink-soft)" }}>
        {locale === "pl"
          ? "Mapa polskich opowieści. Zaczynamy od Krakowa: sześć miejsc, sześć krótkich gier. Legenda obok faktu. Potem kolejne miasta."
          : "A map of Polish stories. We start in Kraków: six places, six short games. Legend beside the record. Other cities later."}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <PolandMap />
      </Box>
    </Box>
  );
};

export const Route = createFileRoute("/")({ component: Home });
