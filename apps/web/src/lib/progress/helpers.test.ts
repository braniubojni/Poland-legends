import { afterEach, describe, expect, it, vi } from "vitest";
import { appendDone, defaultSnapshot, loadSnapshot, parseSnapshot, saveSnapshot } from "./helpers";

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

  it("keeps an explicit null theme and drops non-string completed ids", () => {
    const raw = JSON.stringify({
      locale: "pl",
      theme: null,
      completed: ["hejnal", 1, null],
    });
    expect(parseSnapshot(raw)).toEqual({
      version: 1,
      locale: "pl",
      theme: null,
      completed: ["hejnal"],
    });
  });
});

describe("loadSnapshot / saveSnapshot", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns defaults when localStorage is missing", () => {
    vi.stubGlobal("localStorage", undefined);
    expect(loadSnapshot()).toEqual(defaultSnapshot());
    expect(() => saveSnapshot(defaultSnapshot())).not.toThrow();
  });

  it("round-trips a snapshot", () => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    });
    const snapshot = { ...defaultSnapshot(), locale: "pl" as const, completed: ["hejnal"] };
    saveSnapshot(snapshot);
    expect(loadSnapshot()).toEqual(snapshot);
  });

  it("returns defaults when storage throws", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    expect(loadSnapshot()).toEqual(defaultSnapshot());
    expect(() => saveSnapshot(defaultSnapshot())).toThrow("blocked");
  });
});

describe("appendDone", () => {
  it("appends a story once", () => {
    expect(appendDone([], "hejnal")).toEqual(["hejnal"]);
    expect(appendDone(["hejnal"], "hejnal")).toEqual(["hejnal"]);
    expect(appendDone(["hejnal"], "smok")).toEqual(["hejnal", "smok"]);
  });
});
