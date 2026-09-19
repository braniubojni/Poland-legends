import type { Copy, Locale } from "@/data/types";

export const t = (copy: Copy, locale: Locale) => copy[locale];
