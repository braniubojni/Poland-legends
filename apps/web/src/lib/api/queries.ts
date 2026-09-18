import { queryOptions } from "@tanstack/react-query";
import type { City, CityDetail, Story } from "@/data/types";
import { fetchJson } from "./client";
import { cityDetailSchema, citySchema, storySchema } from "./schemas";

export const queryKeys = {
  cities: ["cities"] as const,
  city: (id: string) => ["city", id] as const,
  story: (cityId: string, storyId: string) => ["story", cityId, storyId] as const,
};

export const citiesQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.cities,
    queryFn: (): Promise<City[]> => fetchJson("/v1/cities", citySchema.array()),
  });

export const cityQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.city(id),
    queryFn: (): Promise<CityDetail> => fetchJson(`/v1/cities/${id}`, cityDetailSchema),
  });

export const storyQueryOptions = (cityId: string, storyId: string) =>
  queryOptions({
    queryKey: queryKeys.story(cityId, storyId),
    queryFn: (): Promise<Story> =>
      fetchJson(`/v1/cities/${cityId}/stories/${storyId}`, storySchema),
  });
