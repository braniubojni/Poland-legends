import type { Copy, Locale } from "@/data/types";

// Falls back to the key itself so a missing chrome entry shows up as a
// visible label in the UI, never a blank string.
export const pick = (map: Record<string, Copy>, key: string, locale: Locale): string =>
  map[key]?.[locale] ?? key;
