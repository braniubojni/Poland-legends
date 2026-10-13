import { describe, expect, it } from "vitest";
import { TOKENS } from "./tokens";
import { createOpTheme } from "./opowiesci";

const MUI_PURPLE = "#9c27b0";

describe("createOpTheme", () => {
  it("uses parchment tokens in both modes", () => {
    for (const mode of ["light", "dark"] as const) {
      const theme = createOpTheme(mode);
      expect(theme.palette.primary.main.toLowerCase()).toBe(TOKENS[mode].primary.toLowerCase());
      expect(theme.palette.primary.main.toLowerCase()).not.toBe(MUI_PURPLE);
      expect(theme.palette.background.default.toLowerCase()).toBe(TOKENS[mode].bg.toLowerCase());
      expect(theme.typography.fontFamily).not.toMatch(/roboto/i);
    }
  });
});
