import { z } from "zod";

const copySchema = z.object({ en: z.string(), pl: z.string() });
const coordsSchema = z.object({ lat: z.number(), lng: z.number() });

export const citySchema = z.object({
  id: z.string(),
  name: copySchema,
  unlocked: z.boolean(),
  coords: coordsSchema,
  blurb: copySchema,
});

const storySummarySchema = z.object({
  id: z.string(),
  title: copySchema,
  place: copySchema,
  pin: coordsSchema,
});

export const cityDetailSchema = citySchema.extend({
  stories: z.array(storySummarySchema),
});

const storyImageSchema = z.object({ light: z.string(), dark: z.string() });

const quizOptionSchema = z.object({ id: z.string(), label: copySchema });

const quizQuestionSchema = z.object({
  id: z.string(),
  prompt: copySchema,
  options: z.array(quizOptionSchema),
  correctId: z.string(),
  explanation: copySchema,
});

const orderStepSchema = z.object({ id: z.string(), label: copySchema });

const gameSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("quiz"), questions: z.array(quizQuestionSchema) }),
  z.object({
    kind: z.literal("order"),
    prompt: copySchema,
    steps: z.array(orderStepSchema),
    correct: z.array(z.string()),
  }),
  z.object({ kind: z.literal("towers"), prompt: copySchema, explanation: copySchema }),
]);

export const storySchema = z.object({
  id: z.string(),
  cityId: z.string(),
  title: copySchema,
  place: copySchema,
  pin: coordsSchema,
  image: storyImageSchema,
  legend: copySchema,
  fact: copySchema,
  seeToday: copySchema,
  game: gameSchema,
});
