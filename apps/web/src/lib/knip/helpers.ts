const FORBIDDEN_UNUSED_CODE_TOOLS = ["ts-prune", "depcheck", "unimported"] as const;

export const knipConfig = {
  entry: ["index.html", "src/main.tsx", "src/routes/**/*.tsx"],
  ignore: [".grok/**", "artifacts/**", "specs/**"],
  vitest: true,
  treatConfigHintsAsErrors: false,
};

export type PkgJson = {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export type KnipJson = {
  entry?: string[];
  ignore?: string[];
  vitest?: boolean | Record<string, unknown>;
};

export const hasRequiredEntries = (entry: string[] | undefined) =>
  knipConfig.entry.every((item) => entry?.includes(item));

export const ignoresSpecFolders = (ignore: string[] | undefined) =>
  knipConfig.ignore.every((folder) => ignore?.includes(folder));

export const hasKnipScript = (scripts: Record<string, string> | undefined, expected: string) =>
  scripts?.knip === expected;

export const isKnipDevDep = (devDependencies: Record<string, string> | undefined) =>
  typeof devDependencies?.knip === "string";

export const hasForbiddenUnusedCodeTool = (deps: Record<string, string> | undefined) =>
  FORBIDDEN_UNUSED_CODE_TOOLS.some((name) => Boolean(deps?.[name]));

export const vitestIsEnabled = (config: KnipJson) => config.vitest === true;
