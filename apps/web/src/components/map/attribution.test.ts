import { describe, expect, it } from "vitest";
import { OP_MAP_ATTRIBUTION_CONTROL } from "./attribution";

describe("OP_MAP_ATTRIBUTION_CONTROL", () => {
  it("keeps attribution expanded (no compact info toggle)", () => {
    expect(OP_MAP_ATTRIBUTION_CONTROL.compact).toBe(false);
  });

  it("is not a disabled control (credit text stays visible)", () => {
    expect(OP_MAP_ATTRIBUTION_CONTROL).not.toBe(false);
    expect(typeof OP_MAP_ATTRIBUTION_CONTROL).toBe("object");
  });
});
