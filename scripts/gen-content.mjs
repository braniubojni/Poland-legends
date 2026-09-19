#!/usr/bin/env node
// Regenerates apps/web/src/data/{cities,krakow,chrome}.ts from the plain JSON
// seed (content/{seed,chrome}.json). That JSON is the source of truth — edit
// it, then run `pnpm gen:content`. Do not hand-edit the generated TS files;
// the drift test in src/data/generated.test.ts fails the build if they stop
// matching the seed.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dbDir = `${root}content`;
const dataDir = `${root}apps/web/src/data`;

const seed = JSON.parse(readFileSync(`${dbDir}/seed.json`, "utf8"));
const chrome = JSON.parse(readFileSync(`${dbDir}/chrome.json`, "utf8"));

const banner = `// GENERATED FILE — do not hand-edit.
// Source of truth: content/. Regenerate with \`pnpm gen:content\`.
`;

const krakowStories = seed.stories.filter((story) => story.cityId === "krakow");

writeFileSync(
  `${dataDir}/cities.ts`,
  `${banner}import type { City } from "./types";

export const cities: City[] = ${JSON.stringify(seed.cities, null, 2)};
`,
);

writeFileSync(
  `${dataDir}/krakow.ts`,
  `${banner}import type { Story } from "./types";

export const krakowStories: Story[] = ${JSON.stringify(krakowStories, null, 2)};

export const storyOrder = krakowStories.map((s) => s.id);
`,
);

writeFileSync(
  `${dataDir}/chrome.ts`,
  `${banner}import type { Copy } from "./types";

export const chrome = ${JSON.stringify(chrome, null, 2)} satisfies Record<string, Copy>;
`,
);

console.log("wrote cities.ts, krakow.ts, chrome.ts from content/");
