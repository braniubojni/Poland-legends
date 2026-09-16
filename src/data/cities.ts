import type { City } from "./types";

export const cities: City[] = [
  {
    id: "krakow",
    name: { en: "Kraków", pl: "Kraków" },
    unlocked: true,
    map: { x: 52, y: 72 },
    blurb: {
      en: "Six living stories. Open a pin, read the legend beside the record, then play.",
      pl: "Sześć żywych opowieści. Otwórz pinezkę, przeczytaj legendę obok faktu i zagraj.",
    },
  },
  {
    id: "warsaw",
    name: { en: "Warsaw", pl: "Warszawa" },
    unlocked: false,
    map: { x: 62, y: 42 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "gdansk",
    name: { en: "Gdańsk", pl: "Gdańsk" },
    unlocked: false,
    map: { x: 48, y: 14 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "wroclaw",
    name: { en: "Wrocław", pl: "Wrocław" },
    unlocked: false,
    map: { x: 28, y: 58 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "poznan",
    name: { en: "Poznań", pl: "Poznań" },
    unlocked: false,
    map: { x: 30, y: 40 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "lublin",
    name: { en: "Lublin", pl: "Lublin" },
    unlocked: false,
    map: { x: 76, y: 54 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
];
