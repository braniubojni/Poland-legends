import { afterEach, describe, expect, it, vi } from "vitest";
import { krakowStories, storyOrder } from "@/data/krakow";
import { applyTheme, resolveTheme } from "@/lib/theme";

describe("resolveTheme", () => {
  it("returns an explicit stored choice", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("falls back to light when window is missing", () => {
    expect(resolveTheme(null)).toBe("light");
    expect(resolveTheme(undefined)).toBe("light");
  });

  it("follows the OS preference when nothing is stored", () => {
    vi.stubGlobal("window", { matchMedia: () => ({ matches: true }) });
    expect(resolveTheme(null)).toBe("dark");
    vi.stubGlobal("window", { matchMedia: () => ({ matches: false }) });
    expect(resolveTheme(null)).toBe("light");
  });
});

describe("applyTheme", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does nothing without a document", () => {
    vi.stubGlobal("document", undefined);
    expect(() => applyTheme("dark")).not.toThrow();
  });

  it("sets the root class, dataset, and theme-color", () => {
    const toggle = vi.fn();
    const setAttribute = vi.fn();
    const root = {
      classList: { toggle },
      dataset: {} as Record<string, string>,
      style: {} as { colorScheme?: string },
    };
    vi.stubGlobal("document", {
      documentElement: root,
      querySelector: () => ({ setAttribute }),
    });
    applyTheme("dark");
    expect(toggle).toHaveBeenCalledWith("dark", true);
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
    expect(setAttribute).toHaveBeenCalledWith("content", "#161310");
  });

  it("skips the meta tag when it is absent", () => {
    const root = {
      classList: { toggle: vi.fn() },
      dataset: {} as Record<string, string>,
      style: {} as { colorScheme?: string },
    };
    vi.stubGlobal("document", {
      documentElement: root,
      querySelector: () => null,
    });
    applyTheme("light");
    expect(root.dataset.theme).toBe("light");
    expect(root.classList.toggle).toHaveBeenCalledWith("dark", false);
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
