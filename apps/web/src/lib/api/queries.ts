import { queryOptions } from "@tanstack/react-query";
import { fetchJson, usesStaticContent } from "./client";
import { loadCities, loadCity, loadStory } from "./helpers";
import { cityDetailSchema, citySchema, storySchema } from "./schemas";

export const queryKeys = {
  cities: ["cities"] as const,
  city: (id: string) => ["city", id] as const,
  story: (cityId: string, storyId: string) => ["story", cityId, storyId] as const,
};

export const citiesQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.cities,
    queryFn: () =>
      usesStaticContent() ? loadCities() : fetchJson("/v1/cities", citySchema.array()),
  });

export const cityQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.city(id),
    queryFn: () =>
      usesStaticContent() ? loadCity(id) : fetchJson(`/v1/cities/${id}`, cityDetailSchema),
  });

export const storyQueryOptions = (cityId: string, storyId: string) =>
  queryOptions({
    queryKey: queryKeys.story(cityId, storyId),
    queryFn: () =>
      usesStaticContent()
        ? loadStory(cityId, storyId)
        : fetchJson(`/v1/cities/${cityId}/stories/${storyId}`, storySchema),
  });
