import { describe, expect, it } from "vitest";
import { appendDone, defaultSnapshot, parseSnapshot } from "./helpers";

describe("parseSnapshot", () => {
  it("unwraps a zustand persist blob", () => {
    const raw = JSON.stringify({
      state: { version: 1, locale: "pl", theme: "dark", completed: ["hejnal"] },
      version: 1,
    });
    expect(parseSnapshot(raw)).toEqual({
      version: 1,
      locale: "pl",
      theme: "dark",
      completed: ["hejnal"],
    });
  });

  it("accepts a flat snapshot", () => {
    const raw = JSON.stringify({
      version: 1,
      locale: "en",
      theme: "light",
      completed: ["smok", "wieze"],
    });
    expect(parseSnapshot(raw)).toEqual({
      version: 1,
      locale: "en",
      theme: "light",
      completed: ["smok", "wieze"],
    });
  });

  it("returns defaults for junk", () => {
    expect(parseSnapshot(null)).toEqual(defaultSnapshot());
    expect(parseSnapshot("nope")).toEqual(defaultSnapshot());
    expect(parseSnapshot("[]")).toEqual(defaultSnapshot());
  });

  it("falls back unknown locale, theme, and non-array completed", () => {
    const raw = JSON.stringify({ locale: "de", theme: "neon", completed: "hejnal" });
    expect(parseSnapshot(raw)).toEqual(defaultSnapshot());
  });
});

describe("appendDone", () => {
  it("appends a story once", () => {
    expect(appendDone([], "hejnal")).toEqual(["hejnal"]);
    expect(appendDone(["hejnal"], "hejnal")).toEqual(["hejnal"]);
    expect(appendDone(["hejnal"], "smok")).toEqual(["hejnal", "smok"]);
  });
});
