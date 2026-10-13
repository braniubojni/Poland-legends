import { describe, expect, it } from "vitest";
import { t } from "./copy";

describe("t", () => {
  it("picks the locale string", () => {
    const copy = { en: "Next story", pl: "Następna opowieść" };
    expect(t(copy, "en")).toBe("Next story");
    expect(t(copy, "pl")).toBe("Następna opowieść");
  });
});
