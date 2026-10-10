import Box from "@mui/material/Box";
import { useState } from "react";
import type { Locale, Story } from "@/data/types";
import { t } from "@/lib/copy";
import { useStoredTheme } from "@/lib/progress";
import { resolveTheme, type Theme } from "@/lib/theme";
import { RADIUS } from "@/theme/tokens";
import { initStoryArtState, nextStoryArtState } from "./story-art-helpers";

const plateTheme = (stored: Theme | null): Theme => {
  if (stored === "light" || stored === "dark") return stored;
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }
  return resolveTheme(stored);
};

const StoryArt = ({ story, locale }: { story: Story; locale: Locale }) => {
  const storedTheme = useStoredTheme();
  const theme = plateTheme(storedTheme);
  const src = story.image[theme];
  const paired = story.image.light !== story.image.dark;
  const alt = `${t(story.place, locale)} — ${t(story.title, locale)}`;

  const [state, setState] = useState(() => initStoryArtState(src));
  const derived = nextStoryArtState(state, src);
  if (derived !== state) setState(derived);

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
      {state.status !== "error" && (
        <img
          src={src}
          alt={alt}
          width={1280}
          height={320}
          data-story={story.id}
          className={`op-story-still${state.status === "loaded" ? " is-loaded" : ""}`}
          onLoad={() => setState((s) => nextStoryArtState(s, src, "load"))}
          onError={() => setState((s) => nextStoryArtState(s, src, "error"))}
        />
      )}
      {state.status === "loading" && <span className="op-story-skeleton" aria-hidden="true" />}
      {state.status === "error" && (
        <Box component="span" className="op-story-fallback" role="img" aria-label={alt}>
          {alt}
        </Box>
      )}
    </Box>
  );
};

export { StoryArt };
