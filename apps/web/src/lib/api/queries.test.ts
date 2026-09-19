import { describe, expect, it } from "vitest";
import { NotFoundError } from "./helpers";
import {
  chromeQueryOptions,
  citiesQueryOptions,
  cityQueryOptions,
  storyQueryOptions,
} from "./queries";

// queryFn ignores its context (loaders read from static data), so calling
// it with no context is fine at runtime — cast past the type-only ctx arg.
// Wrapped in an async fn so a synchronous throw becomes a rejected promise.
const run = async <T>(fn: unknown) => (fn as () => T)();

describe("chromeQueryOptions", () => {
  it("resolves the static chrome map", async () => {
    const opts = chromeQueryOptions();
    expect(opts.queryKey).toEqual(["chrome"]);
    const chrome = await run<Awaited<ReturnType<NonNullable<typeof opts.queryFn>>>>(opts.queryFn);
    expect(chrome?.["story.legend"]?.en).toBeTruthy();
  });
});

describe("citiesQueryOptions", () => {
  it("resolves the static city list", async () => {
    const opts = citiesQueryOptions();
    expect(opts.queryKey).toEqual(["cities"]);
    const cities = await run<Awaited<ReturnType<NonNullable<typeof opts.queryFn>>>>(opts.queryFn);
    expect(cities?.some((city) => city.id === "krakow")).toBe(true);
  });
});

describe("cityQueryOptions", () => {
  it("resolves Kraków with six stories", async () => {
    const opts = cityQueryOptions("krakow");
    expect(opts.queryKey).toEqual(["city", "krakow"]);
    const city = await run<Awaited<ReturnType<NonNullable<typeof opts.queryFn>>>>(opts.queryFn);
    expect(city?.stories).toHaveLength(6);
  });

  it("rejects with NotFoundError for an unknown city", async () => {
    await expect(run(cityQueryOptions("nope").queryFn)).rejects.toThrow(NotFoundError);
  });
});

describe("storyQueryOptions", () => {
  it("resolves a full Kraków story", async () => {
    const opts = storyQueryOptions("krakow", "hejnal");
    expect(opts.queryKey).toEqual(["story", "krakow", "hejnal"]);
    const story = await run<Awaited<ReturnType<NonNullable<typeof opts.queryFn>>>>(opts.queryFn);
    expect(story?.id).toBe("hejnal");
  });

  it("rejects with NotFoundError for an unknown story", async () => {
    await expect(run(storyQueryOptions("krakow", "nope").queryFn)).rejects.toThrow(NotFoundError);
  });
});
