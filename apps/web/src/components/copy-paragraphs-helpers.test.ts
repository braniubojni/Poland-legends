import { describe, expect, it } from "vitest";
import { splitCopyParagraphs } from "@/components/copy-paragraphs-helpers";
import { krakowStories } from "@/data/krakow";
import type { Story } from "@/data/types";

const IDS = ["hejnal", "smok", "wieze", "lajkonik", "golebie", "rynek"] as const;

const answerKey = (story: Story): string[] => {
  if (story.game.kind === "quiz") return story.game.questions.map((question) => question.correctId);
  if (story.game.kind === "order") return story.game.correct;
  return [];
};

describe("splitCopyParagraphs", () => {
  it("splits on a blank line and trims each paragraph", () => {
    expect(splitCopyParagraphs("  First.\n\n  Second.  ")).toEqual(["First.", "Second."]);
  });

  it("keeps a single paragraph when there is no blank line", () => {
    expect(splitCopyParagraphs("One line.\nStill one.")).toEqual(["One line.\nStill one."]);
  });

  it("drops empty pieces", () => {
    expect(splitCopyParagraphs("\n\nOnly.\n\n")).toEqual(["Only."]);
  });
});

describe("017 Kraków copy", () => {
  it("keeps the six story ids and no others", () => {
    expect(krakowStories.map((story) => story.id)).toEqual([...IDS]);
  });

  it("has non-empty legend, fact, and see-today in both locales", () => {
    for (const story of krakowStories) {
      for (const field of ["legend", "fact", "seeToday"] as const) {
        expect(story[field].en.trim().length).toBeGreaterThan(0);
        expect(story[field].pl.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("splits every legend into at least two paragraphs", () => {
    for (const story of krakowStories) {
      expect(splitCopyParagraphs(story.legend.en).length).toBeGreaterThanOrEqual(2);
      expect(splitCopyParagraphs(story.legend.pl).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps quiz and order answers, and the towers game", () => {
    const byId = Object.fromEntries(krakowStories.map((story) => [story.id, story]));
    expect(answerKey(byId.hejnal)).toEqual(["b", "a", "b", "b"]);
    expect(answerKey(byId.smok)).toEqual(["den", "tribute", "sulfur", "burst"]);
    expect(answerKey(byId.lajkonik)).toEqual(["camp", "rafts", "dress", "square"]);
    expect(answerKey(byId.golebie)).toEqual(["a", "b", "b"]);
    expect(answerKey(byId.rynek)).toEqual(["b", "a", "b", "b"]);
    expect(byId.wieze.game.kind).toBe("towers");
  });

  it("names Henryk IV Probus in the pigeon quiz, not Henryk II Pobożny", () => {
    const pigeons = krakowStories.find((story) => story.id === "golebie");
    if (pigeons?.game.kind !== "quiz") throw new Error("golebie quiz missing");
    const ruler = pigeons.game.questions.find((question) => question.id === "g3");
    const label = ruler?.options.find((option) => option.id === "b")?.label.pl;
    expect(label).toBe("Henrykiem IV Probusem (Prawym)");
    expect(ruler?.correctId).toBe("b");
  });
});
