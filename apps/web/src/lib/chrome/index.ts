import { use } from "react";
import { chrome } from "@/data/chrome";
import { useLocale } from "@/lib/progress";
import { ChromeContext } from "./ChromeProvider";
import { pick } from "./helpers";

export { ChromeProvider } from "./ChromeProvider";

export type ChromeKey = keyof typeof chrome;

// Typo'd key -> TS error, not a silent blank label.
export const useChrome = () => {
  const map = use(ChromeContext);
  const locale = useLocale();
  return (key: ChromeKey) => pick(map, key, locale);
};
