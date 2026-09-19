import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/AppLink";
import type { Locale } from "@/data/types";

const StoryStatus = ({ kind, locale }: { kind: "not-found" | "error"; locale: Locale }) => {
  if (kind === "not-found") {
    return (
      <Box component="main">
        <Typography>{locale === "pl" ? "Nie ma takiej opowieści." : "No such story."}</Typography>
        <AppLink
          to="/krakow"
          style={{ marginTop: 16, display: "inline-flex", color: "var(--op-primary)" }}
        >
          Kraków
        </AppLink>
      </Box>
    );
  }
  return (
    <Box component="main">
      <Typography>
        {locale === "pl" ? "Nie udało się wczytać opowieści." : "Could not load this story."}
      </Typography>
    </Box>
  );
};

export { StoryStatus };
