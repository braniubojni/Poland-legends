import { describe, expect, it, vi } from "vitest";
import { errorMessage, errorMode, retryRoute } from "./error-helpers";

describe("errorMessage", () => {
  it("uses an Error message", () => {
    expect(errorMessage(new Error("boom"))).toBe("boom");
  });

  it("uses a non-empty string", () => {
    expect(errorMessage("loader failed")).toBe("loader failed");
  });

  it("falls back when the error has nothing to show", () => {
    expect(errorMessage(new Error(""))).toBe("An unexpected error occurred.");
    expect(errorMessage("")).toBe("An unexpected error occurred.");
    expect(errorMessage(null)).toBe("An unexpected error occurred.");
  });
});

describe("errorMode", () => {
  it("keeps an explicit document theme", () => {
    expect(errorMode("light")).toBe("light");
    expect(errorMode("dark")).toBe("dark");
  });

  it("resolves from the stored default when the document has no theme", () => {
    expect(errorMode(undefined)).toBe("light");
    expect(errorMode("parchment")).toBe("light");
  });
});

describe("retryRoute", () => {
  it("reloads route data and then clears the error", async () => {
    const order: string[] = [];
    const invalidate = vi.fn(async () => {
      order.push("invalidate");
    });
    const reset = vi.fn(() => {
      order.push("reset");
    });

    retryRoute(invalidate, reset);
    await vi.waitFor(() => expect(reset).toHaveBeenCalledOnce());
    expect(invalidate).toHaveBeenCalledOnce();
    expect(order).toEqual(["invalidate", "reset"]);
  });

  it("still clears the error when reload fails, and does not retry again", async () => {
    const invalidate = vi.fn(async () => {
      throw new Error("still broken");
    });
    const reset = vi.fn();

    retryRoute(invalidate, reset);
    await vi.waitFor(() => expect(reset).toHaveBeenCalledOnce());
    expect(invalidate).toHaveBeenCalledOnce();
  });
});
