import { describe, expect, it } from "vitest";
import type { StorySummary } from "@/data/types";
import { nextStoryId } from "./-helpers";

const stories = [{ id: "hejnal" }, { id: "smok" }, { id: "wieze" }] as StorySummary[];

describe("nextStoryId", () => {
  it("returns the following story", () => {
    expect(nextStoryId(stories, "hejnal")).toBe("smok");
  });

  it("returns null for the last story", () => {
    expect(nextStoryId(stories, "wieze")).toBeNull();
  });

  it("returns null when the id is missing", () => {
    expect(nextStoryId(stories, "nope")).toBeNull();
    expect(nextStoryId([], "hejnal")).toBeNull();
  });
});
