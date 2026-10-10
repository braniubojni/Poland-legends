import { describe, expect, it } from "vitest";
import { nextMapLoadState, shouldShowSkeleton } from "./loading-helpers";

describe("nextMapLoadState", () => {
  it("shows the loader when the map mounts", () => {
    expect(nextMapLoadState("mount")).toBe("loading");
  });

  it("shows the loader again when a restyle starts", () => {
    expect(nextMapLoadState("restyle")).toBe("loading");
  });

  it("dismisses the loader once the map has painted", () => {
    expect(nextMapLoadState("load")).toBe("ready");
  });

  it("dismisses the loader once the new style has loaded", () => {
    expect(nextMapLoadState("style-load")).toBe("ready");
  });
});

describe("shouldShowSkeleton", () => {
  it("shows skeleton rows while the query is pending", () => {
    expect(shouldShowSkeleton(true, false)).toBe(true);
  });

  it("hides skeleton rows once data has loaded", () => {
    expect(shouldShowSkeleton(false, false)).toBe(false);
  });

  it("never shows skeleton rows on error", () => {
    expect(shouldShowSkeleton(true, true)).toBe(false);
    expect(shouldShowSkeleton(false, true)).toBe(false);
  });
});
