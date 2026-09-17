import type { Locale, Story } from "@/data/types";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";
import { resolveTheme, type Theme } from "@/lib/theme";

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
    <figure
      className={`op-story-still-wrap overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface${paired ? " is-paired" : ""}`}
    >
      <img
        src={src}
        alt={alt}
        width={1280}
        height={320}
        data-story={story.id}
        className="op-story-still"
        suppressHydrationWarning
      />
    </figure>
  );
}
