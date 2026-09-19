import { chrome } from "@/data/chrome";
import { cities } from "@/data/cities";
import { krakowStories } from "@/data/krakow";
import type { City, CityDetail, Copy, Story } from "@/data/types";
import { chromeSchema, cityDetailSchema, citySchema, storySchema } from "./schemas";

export class NotFoundError extends Error {}

const toSummary = (story: Story) => ({
  id: story.id,
  title: story.title,
  place: story.place,
  pin: story.pin,
});

export const loadCities = (): City[] => citySchema.array().parse(cities);

export const loadChrome = (): Record<string, Copy> => chromeSchema.parse(chrome);

export const loadCity = (id: string): CityDetail => {
  const city = cities.find((item) => item.id === id);
  if (!city) throw new NotFoundError(`not found: /v1/cities/${id}`);
  const stories = krakowStories.filter((story) => story.cityId === id).map(toSummary);
  return cityDetailSchema.parse({ ...city, stories });
};

export const loadStory = (cityId: string, storyId: string): Story => {
  const story = krakowStories.find((item) => item.cityId === cityId && item.id === storyId);
  if (!story) {
    throw new NotFoundError(`not found: /v1/cities/${cityId}/stories/${storyId}`);
  }
  return storySchema.parse(story);
};
