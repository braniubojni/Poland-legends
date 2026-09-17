import type { Copy, Locale } from "@/data/types";

export function t(copy: Copy, locale: Locale) {
  return copy[locale];
}
