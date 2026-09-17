import Box from "@mui/material/Box";
import type { Locale, Story } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { resolveTheme, type Theme } from "@/lib/theme";
import { RADIUS } from "@/theme/tokens";

function plateTheme(stored: Theme | null): Theme {
  if (stored === "light" || stored === "dark") return stored;
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }
  return resolveTheme(stored);
}

export function StoryArt({ story, locale }: { story: Story; locale: Locale }) {
  const storedTheme = useProgress((s) => s.theme);
  const theme = plateTheme(storedTheme);
  const src = story.image[theme];
  const paired = story.image.light !== story.image.dark;
  const alt = `${t(story.place, locale)} — ${t(story.title, locale)}`;

  return (
    <Box
      component="figure"
      className={`op-story-still-wrap${paired ? " is-paired" : ""}`}
      sx={{
        m: 0,
        overflow: "hidden",
        borderRadius: `${RADIUS.lg}px`,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <img
        src={src}
        alt={alt}
        width={1280}
        height={320}
        data-story={story.id}
        className="op-story-still"
      />
    </Box>
  );
}
