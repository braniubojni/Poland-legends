import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { KrakowMap } from "@/components/KrakowMap";
import { cityQueryOptions } from "@/lib/api";
import { useCompleted, useLocale } from "@/lib/progress";

export const Route = createFileRoute("/krakow/")({ component: KrakowPage });

function KrakowPage() {
  const locale = useLocale();
  const completed = useCompleted();
  const { data: city } = useQuery(cityQueryOptions("krakow"));
  const stories = city?.stories ?? [];
  const done = completed.filter((id) => stories.some((s) => s.id === id)).length;

  return (
    <Box component="main">
      <AppLink
        to="/"
        style={{
          display: "inline-flex",
          minHeight: 44,
          alignItems: "center",
          gap: 8,
          fontSize: "0.875rem",
          color: "var(--op-muted)",
        }}
      >
        <ArrowLeft size={16} />
        {locale === "pl" ? "Polska" : "Poland"}
      </AppLink>
      <Typography variant="h1" sx={{ mt: 2 }}>
        Kraków
      </Typography>
      <Typography sx={{ mt: 1.5, maxWidth: "65ch", color: "var(--op-ink-soft)" }}>
        {locale === "pl"
          ? "Otwórz pinezkę. Przeczytaj, co ludzie opowiadają, i co da się sprawdzić. Zagraj minutę. Potem idź na miejsce."
          : "Open a pin. Read what people tell, and what can be checked. Play for a minute. Then go stand there."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, fontVariantNumeric: "tabular-nums" }}
      >
        {done}/{stories.length}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <KrakowMap />
      </Box>
    </Box>
  );
}
