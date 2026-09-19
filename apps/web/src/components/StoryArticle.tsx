import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { HejnalPlayer } from "@/components/HejnalPlayer";
import { StoryArt } from "@/components/StoryArt";
import { StoryGame } from "@/components/games/StoryGame";
import type { Locale, Story } from "@/data/types";
import { t } from "@/lib/copy";
import { RADIUS } from "@/theme/tokens";

type Props = {
  story: Story;
  locale: Locale;
  nextId: string | null;
  onComplete: () => void;
  onNext: () => void;
  onBack: () => void;
};

const StoryArticle = ({ story, locale, nextId, onComplete, onNext, onBack }: Props) => (
  <Box component="article">
    <AppLink
      to="/krakow"
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
      Kraków
    </AppLink>
    <Typography
      variant="overline"
      color="text.secondary"
      sx={{ mt: 2.5, display: "block", letterSpacing: "0.18em" }}
    >
      {t(story.place, locale)}
    </Typography>
    <Typography variant="h1" sx={{ mt: 1 }}>
      {t(story.title, locale)}
    </Typography>
    <Box sx={{ mt: 3 }}>
      <StoryArt story={story} locale={locale} />
    </Box>
    {story.id === "hejnal" ? (
      <Box sx={{ mt: 2.5 }}>
        <HejnalPlayer />
      </Box>
    ) : null}

    <Box component="section" sx={{ mt: 4 }}>
      <Typography variant="h2">{locale === "pl" ? "Legenda" : "The legend"}</Typography>
      <Typography sx={{ mt: 1.5, maxWidth: "65ch", color: "var(--op-ink-soft)" }}>
        {t(story.legend, locale)}
      </Typography>
    </Box>

    <Box
      component="section"
      sx={{
        mt: 4,
        p: 2.5,
        borderRadius: `${RADIUS.lg}px`,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h2">{locale === "pl" ? "Co wiemy" : "What we know"}</Typography>
      <Typography sx={{ mt: 1.5, maxWidth: "65ch", color: "var(--op-ink-soft)" }}>
        {t(story.fact, locale)}
      </Typography>
    </Box>

    <Box component="section" sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {locale === "pl" ? "Gra" : "Play"}
      </Typography>
      <StoryGame game={story.game} onComplete={onComplete} />
    </Box>

    <Box
      component="section"
      sx={{
        mt: 4,
        display: "flex",
        gap: 1.5,
        p: 2.5,
        borderRadius: `${RADIUS.lg}px`,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ color: "primary.main", mt: 0.5, flexShrink: 0 }}>
        <MapPin size={20} />
      </Box>
      <Box>
        <Typography variant="h3">{locale === "pl" ? "Zobacz dziś" : "See it today"}</Typography>
        <Typography sx={{ mt: 1, maxWidth: "65ch", color: "var(--op-ink-soft)" }}>
          {t(story.seeToday, locale)}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ mt: 5, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
      {nextId ? (
        <Button variant="contained" onClick={onNext}>
          {locale === "pl" ? "Następna opowieść" : "Next story"}
          <ArrowRight size={16} style={{ marginLeft: 8 }} />
        </Button>
      ) : (
        <Button variant="contained" onClick={onBack}>
          {locale === "pl" ? "Wróć do mapy" : "Back to the map"}
        </Button>
      )}
    </Box>
  </Box>
);

export default StoryArticle;
