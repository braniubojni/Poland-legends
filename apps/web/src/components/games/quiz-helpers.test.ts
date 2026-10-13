import { describe, expect, it } from "vitest";
import { quizOptionTone } from "./quiz-helpers";

describe("quizOptionTone", () => {
  it("stays neutral before a pick", () => {
    expect(quizOptionTone(false, true, false)).toEqual({
      borderColor: "divider",
      bgcolor: "background.default",
      color: "text.primary",
    });
  });

  it("marks the correct option after reveal", () => {
    expect(quizOptionTone(true, true, true).borderColor).toBe("success.main");
  });

  it("marks a wrong pick", () => {
    expect(quizOptionTone(true, false, true).borderColor).toBe("primary.main");
  });

  it("dims the options that were neither correct nor picked", () => {
    expect(quizOptionTone(true, false, false).color).toBe("text.secondary");
  });
});
