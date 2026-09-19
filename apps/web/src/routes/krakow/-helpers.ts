import type { StorySummary } from "@/data/types";

export const nextStoryId = (stories: StorySummary[], id: string) => {
  const i = stories.findIndex((s) => s.id === id);
  if (i < 0 || i === stories.length - 1) return null;
  return stories[i + 1]?.id ?? null;
};
