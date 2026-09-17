import type { City } from "./types";

export const cities: City[] = [
  {
    id: "krakow",
    name: { en: "Kraków", pl: "Kraków" },
    unlocked: true,
    coords: { lat: 50.0614, lng: 19.9373 },
    blurb: {
      en: "Six living stories. Open a pin, read the legend beside the record, then play.",
      pl: "Sześć żywych opowieści. Otwórz pinezkę, przeczytaj legendę obok faktu i zagraj.",
    },
  },
  {
    id: "warsaw",
    name: { en: "Warsaw", pl: "Warszawa" },
    unlocked: false,
    coords: { lat: 52.2297, lng: 21.0122 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "gdansk",
    name: { en: "Gdańsk", pl: "Gdańsk" },
    unlocked: false,
    coords: { lat: 54.352, lng: 18.6466 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "wroclaw",
    name: { en: "Wrocław", pl: "Wrocław" },
    unlocked: false,
    coords: { lat: 51.1079, lng: 17.0385 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "poznan",
    name: { en: "Poznań", pl: "Poznań" },
    unlocked: false,
    coords: { lat: 52.4064, lng: 16.9252 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
  {
    id: "lublin",
    name: { en: "Lublin", pl: "Lublin" },
    unlocked: false,
    coords: { lat: 51.2465, lng: 22.5684 },
    blurb: {
      en: "Coming next.",
      pl: "Wkrótce.",
    },
  },
];

export function cityById(id: string) {
  return cities.find((city) => city.id === id);
}
