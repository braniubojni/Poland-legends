import { describe, expect, it } from "vitest";
import { krakowStories, storyOrder } from "@/data/krakow";
import { resolveTheme } from "@/lib/theme";

describe("resolveTheme", () => {
  it("returns an explicit stored choice", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("falls back to light when window is missing", () => {
    expect(resolveTheme(null)).toBe("light");
    expect(resolveTheme(undefined)).toBe("light");
  });
});

describe("krakowStories", () => {
  it("has six stories with lat/lng pins", () => {
    expect(krakowStories).toHaveLength(6);
    expect(storyOrder).toHaveLength(6);
    for (const story of krakowStories) {
      expect(story.pin.lat).toBeGreaterThan(50);
      expect(story.pin.lat).toBeLessThan(51);
      expect(story.pin.lng).toBeGreaterThan(19);
      expect(story.pin.lng).toBeLessThan(20);
      expect(story.image.light).toMatch(/^\/stories\/.+\.webp$/);
    }
  });
});
