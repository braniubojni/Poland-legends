import { describe, expect, it } from "vitest";
import { initStoryArtState, nextStoryArtState } from "./story-art-helpers";

describe("nextStoryArtState", () => {
  it("starts loading for a fresh src", () => {
    expect(initStoryArtState("a.webp")).toEqual({ src: "a.webp", status: "loading" });
  });

  it("moves to loaded on a load event for the current src", () => {
    const state = initStoryArtState("a.webp");
    expect(nextStoryArtState(state, "a.webp", "load")).toEqual({
      src: "a.webp",
      status: "loaded",
    });
  });

  it("moves to error on an error event for the current src", () => {
    const state = initStoryArtState("a.webp");
    expect(nextStoryArtState(state, "a.webp", "error")).toEqual({
      src: "a.webp",
      status: "error",
    });
  });

  it("resets to loading when src changes (theme swap), ignoring a stale event", () => {
    const state = { src: "a.webp", status: "loaded" } as const;
    expect(nextStoryArtState(state, "b.webp")).toEqual({ src: "b.webp", status: "loading" });
    expect(nextStoryArtState(state, "b.webp", "load")).toEqual({
      src: "b.webp",
      status: "loading",
    });
  });

  it("returns the same reference when nothing changes", () => {
    const state = initStoryArtState("a.webp");
    expect(nextStoryArtState(state, "a.webp")).toBe(state);
  });
});
