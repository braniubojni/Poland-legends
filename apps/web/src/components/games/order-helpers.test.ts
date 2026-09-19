import { describe, expect, it } from "vitest";
import { orderStepTone, shuffle } from "./order-helpers";

describe("shuffle", () => {
  it("returns a permutation of the input", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    const out = shuffle(items);
    expect(out).toHaveLength(items.length);
    expect(out).not.toBe(items);
    expect([...out].sort((a, b) => a - b)).toEqual(items);
  });
});

describe("orderStepTone", () => {
  it("highlights a picked step while playing", () => {
    expect(orderStepTone(0, "play").borderColor).toContain("op-primary");
  });

  it("leaves unpicked steps as the default divider", () => {
    expect(orderStepTone(-1, "play")).toEqual({
      borderColor: "divider",
      bgcolor: "background.default",
    });
  });
});
