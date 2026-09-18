import { describe, expect, it } from "vitest";
import { NotFoundError } from "./client";
import { loadCities, loadCity, loadStory } from "./helpers";

describe("loadCities", () => {
  it("returns the bundled city list", () => {
    const list = loadCities();
    expect(list.some((city) => city.id === "krakow" && city.unlocked)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(6);
  });
});

describe("loadCity", () => {
  it("returns Kraków with six story summaries and no legend field", () => {
    const city = loadCity("krakow");
    expect(city.id).toBe("krakow");
    expect(city.stories).toHaveLength(6);
    expect(city.stories[0]).not.toHaveProperty("legend");
    expect(city.stories[0]).not.toHaveProperty("game");
  });

  it("throws NotFoundError for an unknown city", () => {
    expect(() => loadCity("nope")).toThrow(NotFoundError);
  });
});

describe("loadStory", () => {
  it("returns a full Kraków story", () => {
    const story = loadStory("krakow", "hejnal");
    expect(story.id).toBe("hejnal");
    expect(story.game.kind).toBe("quiz");
  });

  it("throws NotFoundError for an unknown story", () => {
    expect(() => loadStory("krakow", "nope")).toThrow(NotFoundError);
  });
});
