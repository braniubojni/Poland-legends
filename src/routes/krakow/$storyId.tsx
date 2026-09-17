import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { HejnalPlayer } from "@/components/HejnalPlayer";
import { StoryArt } from "@/components/StoryArt";
import { StoryGame } from "@/components/games/StoryGame";
import { Button } from "@/components/ui/button";
import { getStory, nextStoryId } from "@/data/krakow";
import { t } from "@/lib/copy";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/krakow/$storyId")({ component: StoryPage });

function StoryPage() {
  const { storyId } = Route.useParams();
  const locale = useProgress((s) => s.locale);
  const markDone = useProgress((s) => s.markDone);
  const story = getStory(storyId);
  const nextId = nextStoryId(storyId);

  if (!story) {
    return (
      <main>
        <p>{locale === "pl" ? "Nie ma takiej opowieści." : "No such story."}</p>
        <Link to="/krakow" className="mt-4 inline-flex text-primary">
          Kraków
        </Link>
      </main>
    );
  }

  return (
    <article>
      <Link to="/krakow" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        Kraków
      </Link>
      <p className="mt-5 text-xs font-medium tracking-[0.18em] text-muted uppercase">{t(story.place, locale)}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight">{t(story.title, locale)}</h1>
      <div className="mt-6">
        <StoryArt story={story} locale={locale} />
      </div>
      {story.id === "hejnal" ? (
        <div className="mt-5">
          <HejnalPlayer />
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="font-display text-2xl">{locale === "pl" ? "Legenda" : "The legend"}</h2>
        <p className="mt-3 max-w-prose text-ink-soft">{t(story.legend, locale)}</p>
      </section>

      <section className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-5">
        <h2 className="font-display text-2xl">{locale === "pl" ? "Co wiemy" : "What we know"}</h2>
        <p className="mt-3 max-w-prose text-ink-soft">{t(story.fact, locale)}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-2xl">{locale === "pl" ? "Gra" : "Play"}</h2>
        <StoryGame game={story.game} onComplete={() => markDone(story.id)} />
      </section>

      <section className="mt-8 flex gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-5">
        <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <h2 className="font-display text-xl">{locale === "pl" ? "Zobacz dziś" : "See it today"}</h2>
          <p className="mt-2 max-w-prose text-ink-soft">{t(story.seeToday, locale)}</p>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        {nextId ? (
          <Button asChild>
            <Link to="/krakow/$storyId" params={{ storyId: nextId }}>
              {locale === "pl" ? "Następna opowieść" : "Next story"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/krakow">{locale === "pl" ? "Wróć do mapy" : "Back to the map"}</Link>
          </Button>
        )}
      </div>
    </article>
  );
}
