import { queryOptions } from "@tanstack/react-query";
import { loadChrome, loadCities, loadCity, loadStory } from "./helpers";

const queryKeys = {
  cities: ["cities"] as const,
  city: (id: string) => ["city", id] as const,
  story: (cityId: string, storyId: string) => ["story", cityId, storyId] as const,
  chrome: ["chrome"] as const,
};

export const chromeQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.chrome,
    queryFn: () => loadChrome(),
  });

export const citiesQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.cities,
    queryFn: () => loadCities(),
  });

export const cityQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.city(id),
    queryFn: () => loadCity(id),
  });

export const storyQueryOptions = (cityId: string, storyId: string) =>
  queryOptions({
    queryKey: queryKeys.story(cityId, storyId),
    queryFn: () => loadStory(cityId, storyId),
  });
