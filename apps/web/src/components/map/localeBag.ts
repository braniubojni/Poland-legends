import type { Locale } from "@/data/types";

export const localeBag = (locale: Locale): Record<string, string> => {
  if (locale === "pl") {
    return {
      "CooperativeGesturesHandler.WindowsHelpText":
        "Użyj Ctrl + przewijania, aby zmienić powiększenie",
      "CooperativeGesturesHandler.MacHelpText": "Użyj ⌘ + przewijania, aby zmienić powiększenie",
      "CooperativeGesturesHandler.MobileHelpText": "Przesuń mapę dwoma palcami",
    };
  }
  return {
    "CooperativeGesturesHandler.WindowsHelpText": "Use Ctrl + scroll to zoom the map",
    "CooperativeGesturesHandler.MacHelpText": "Use ⌘ + scroll to zoom the map",
    "CooperativeGesturesHandler.MobileHelpText": "Use two fingers to move the map",
  };
};
