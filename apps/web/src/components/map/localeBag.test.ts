import { describe, expect, it } from "vitest";
import { localeBag } from "./localeBag";

describe("localeBag", () => {
  it("returns Polish cooperative-gesture copy", () => {
    const bag = localeBag("pl");
    expect(bag["CooperativeGesturesHandler.MacHelpText"]).toMatch(/⌘/);
    expect(bag["CooperativeGesturesHandler.MobileHelpText"]).toMatch(/dwoma palcami/);
  });

  it("returns English cooperative-gesture copy", () => {
    const bag = localeBag("en");
    expect(bag["CooperativeGesturesHandler.MacHelpText"]).toMatch(/⌘/);
    expect(bag["CooperativeGesturesHandler.MobileHelpText"]).toMatch(/two fingers/);
  });
});
