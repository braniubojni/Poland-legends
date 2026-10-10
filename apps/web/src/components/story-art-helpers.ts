type StoryArtStatus = "loading" | "loaded" | "error";
export type StoryArtState = { src: string; status: StoryArtStatus };
export type StoryArtEvent = "load" | "error";

export const initStoryArtState = (src: string): StoryArtState => ({ src, status: "loading" });

export const nextStoryArtState = (
  state: StoryArtState,
  src: string,
  event?: StoryArtEvent,
): StoryArtState => {
  if (state.src !== src) return initStoryArtState(src);
  if (event === "load") return { src, status: "loaded" };
  if (event === "error") return { src, status: "error" };
  return state;
};
