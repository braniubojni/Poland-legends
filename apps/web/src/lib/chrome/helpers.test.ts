import { describe, expect, it } from "vitest";
import { pick } from "./helpers";

const map = {
  "story.legend": { en: "The legend", pl: "Legenda" },
};

describe("pick", () => {
  it("returns the string for the requested locale", () => {
    expect(pick(map, "story.legend", "en")).toBe("The legend");
    expect(pick(map, "story.legend", "pl")).toBe("Legenda");
  });

  it("falls back to the key itself for a missing entry", () => {
    expect(pick(map, "nope.missing", "en")).toBe("nope.missing");
  });
});
