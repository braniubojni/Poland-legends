import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import webPkg from "../../../package.json";
import {
  hasForbiddenUnusedCodeTool,
  hasKnipScript,
  hasRequiredEntries,
  ignoresSpecFolders,
  isKnipDevDep,
  knipConfig,
  vitestIsEnabled,
  type PkgJson,
} from "./helpers";

const rootPkg = JSON.parse(
  readFileSync(fileURLToPath(new URL("../../../../../package.json", import.meta.url)), "utf8"),
) as PkgJson;

describe("knip wiring", () => {
  it("is a web devDependency with a knip script", () => {
    expect(isKnipDevDep(webPkg.devDependencies)).toBe(true);
    expect(hasKnipScript(webPkg.scripts, "knip")).toBe(true);
  });

  it("has a root alias like lint and test", () => {
    expect(hasKnipScript(rootPkg.scripts, "pnpm --filter web knip")).toBe(true);
  });

  it("uses Vite SPA entries, TanStack file routes, and Vitest", () => {
    expect(hasRequiredEntries(knipConfig.entry)).toBe(true);
    expect(knipConfig.entry).toEqual(
      expect.arrayContaining(["index.html", "src/main.tsx", "src/routes/**/*.tsx"]),
    );
    expect(vitestIsEnabled(knipConfig)).toBe(true);
  });

  it("ignores .grok, artifacts, and specs", () => {
    expect(ignoresSpecFolders(knipConfig.ignore)).toBe(true);
    expect(knipConfig.ignore).toEqual(
      expect.arrayContaining([".grok/**", "artifacts/**", "specs/**"]),
    );
  });

  it("does not add a second unused-code tool", () => {
    expect(hasForbiddenUnusedCodeTool(webPkg.dependencies)).toBe(false);
    expect(hasForbiddenUnusedCodeTool(webPkg.devDependencies)).toBe(false);
    expect(hasForbiddenUnusedCodeTool(rootPkg.dependencies)).toBe(false);
    expect(hasForbiddenUnusedCodeTool(rootPkg.devDependencies)).toBe(false);
  });
});
