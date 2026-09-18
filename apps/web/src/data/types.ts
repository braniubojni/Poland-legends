export type Locale = "en" | "pl";

export type Copy = {
  en: string;
  pl: string;
};

export type QuizOption = {
  id: string;
  label: Copy;
};

export type QuizQuestion = {
  id: string;
  prompt: Copy;
  options: QuizOption[];
  correctId: string;
  explanation: Copy;
};

export type OrderStep = {
  id: string;
  label: Copy;
};

export type Game =
  | { kind: "quiz"; questions: QuizQuestion[] }
  | { kind: "order"; prompt: Copy; steps: OrderStep[]; correct: string[] }
  | { kind: "towers"; prompt: Copy; explanation: Copy };

export type StoryImage = {
  light: string;
  dark: string;
};

export type Story = {
  id: string;
  cityId: string;
  title: Copy;
  place: Copy;
  pin: { lat: number; lng: number };
  image: StoryImage;
  legend: Copy;
  fact: Copy;
  seeToday: Copy;
  game: Game;
};

export type City = {
  id: string;
  name: Copy;
  unlocked: boolean;
  coords: { lat: number; lng: number };
  blurb: Copy;
};

export type StorySummary = {
  id: string;
  title: Copy;
  place: Copy;
  pin: { lat: number; lng: number };
};

export type CityDetail = City & {
  stories: StorySummary[];
};
