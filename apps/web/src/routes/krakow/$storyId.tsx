import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import StoryArticle from "@/components/StoryArticle";
import { StoryStatus } from "@/components/StoryStatus";
import { cityQueryOptions, NotFoundError, storyQueryOptions } from "@/lib/api";
import { useLocale, useProgressActions } from "@/lib/progress";
import { nextStoryId } from "./-helpers";

const StoryPage = () => {
  const { storyId } = Route.useParams();
  const locale = useLocale();
  const { markDone } = useProgressActions();
  const navigate = useNavigate();
  const storyResult = useQuery(storyQueryOptions("krakow", storyId));
  const cityResult = useQuery(cityQueryOptions("krakow"));
  const story = storyResult.data;
  const nextId = nextStoryId(cityResult.data?.stories ?? [], storyId);

  if (storyResult.error instanceof NotFoundError) {
    return <StoryStatus kind="not-found" locale={locale} />;
  }
  if (storyResult.error) {
    return <StoryStatus kind="error" locale={locale} />;
  }
  if (!story) return null;

  return (
    <StoryArticle
      story={story}
      locale={locale}
      nextId={nextId}
      onComplete={() => markDone(story.id)}
      onNext={() => {
        if (!nextId) return;
        void navigate({ to: "/krakow/$storyId", params: { storyId: nextId } });
      }}
      onBack={() => void navigate({ to: "/krakow" })}
    />
  );
};

export const Route = createFileRoute("/krakow/$storyId")({ component: StoryPage });
