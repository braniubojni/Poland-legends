import type { Locale } from "../../data/types";
import type { Theme } from "../theme";

const STORAGE_KEY = "opowiesci-v1";
const SAVE_VERSION = 1;

export type Snapshot = {
  version: number;
  locale: Locale;
  theme: Theme | null;
  completed: string[];
};

export const defaultSnapshot = (): Snapshot => ({
  version: SAVE_VERSION,
  locale: "en",
  theme: null,
  completed: [],
});

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

const unwrapPayload = (parsed: Record<string, unknown>): Record<string, unknown> => {
  const inner = asRecord(parsed.state);
  return inner ?? parsed;
};

const parseLocale = (value: unknown, fallback: Locale): Locale =>
  value === "pl" || value === "en" ? value : fallback;

const parseTheme = (value: unknown, fallback: Theme | null): Theme | null =>
  value === "light" || value === "dark" || value === null ? value : fallback;

const parseCompleted = (value: unknown, fallback: string[]): string[] => {
  if (!Array.isArray(value)) return fallback;
  return value.filter((id): id is string => typeof id === "string");
};

export const parseSnapshot = (raw: string | null): Snapshot => {
  const defaults = defaultSnapshot();
  if (!raw) return defaults;
  try {
    const parsed = asRecord(JSON.parse(raw));
    if (!parsed) return defaults;
    const inner = unwrapPayload(parsed);
    return {
      version: SAVE_VERSION,
      locale: parseLocale(inner.locale, defaults.locale),
      theme: parseTheme(inner.theme, defaults.theme),
      completed: parseCompleted(inner.completed, defaults.completed),
    };
  } catch {
    return defaults;
  }
};

export const loadSnapshot = (): Snapshot => {
  if (typeof localStorage === "undefined") return defaultSnapshot();
  try {
    return parseSnapshot(localStorage.getItem(STORAGE_KEY));
  } catch {
    return defaultSnapshot();
  }
};

export const saveSnapshot = (snapshot: Snapshot) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
};

export const appendDone = (completed: string[], storyId: string): string[] =>
  completed.includes(storyId) ? completed : [...completed, storyId];
