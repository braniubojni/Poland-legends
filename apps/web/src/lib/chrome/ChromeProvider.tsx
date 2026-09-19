import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode } from "react";
import { chrome as bundledChrome } from "@/data/chrome";
import type { Copy } from "@/data/types";
import { chromeQueryOptions } from "@/lib/api";

// Seeded with the bundled dump, so chrome is never "pending" — dev swaps in
// the live API response on mount; prod keeps the bundled dump as-is.
export const ChromeContext = createContext<Record<string, Copy>>(bundledChrome);

export const ChromeProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useQuery({ ...chromeQueryOptions(), initialData: bundledChrome });
  return <ChromeContext value={data}>{children}</ChromeContext>;
};
