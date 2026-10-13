import { expect, test } from "@playwright/test";

const answers = [
  "1392, in city pay records",
  /Hungarian hajnal/,
  "City firefighters",
  "A 1928 American novel",
];

test("a story pin opens the legend, and finishing the quiz stays done", async ({ page }) => {
  await page.goto("/krakow");
  const pin = page.getByRole("button", { name: /The broken call/ });
  await pin.waitFor();
  // Overlapping old-town markers fail Playwright's hit-test. The pin's own listener still runs.
  await pin.evaluate((el) => (el as HTMLButtonElement).click());
  await expect(page).toHaveURL(/\/krakow\/hejnal$/);
  await expect(page.getByRole("heading", { name: "The legend" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What we know" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Play" })).toBeVisible();

  for (const [index, answer] of answers.entries()) {
    await page.getByRole("button", { name: answer }).click();
    const advance = index === answers.length - 1 ? "Finish" : "Next";
    await page.getByRole("button", { name: advance, exact: true }).click();
  }

  await expect(page.getByRole("heading", { name: "Done" })).toBeVisible();
  await expect(page.getByText("1/6")).toBeVisible();

  await page.reload();
  await expect(page.getByText("1/6")).toBeVisible();
  const saved = await page.evaluate(() => localStorage.getItem("opowiesci-v1"));
  expect(saved).toContain("hejnal");

  await page.getByRole("button", { name: "Next story" }).click();
  await expect(page).toHaveURL(/\/krakow\/smok$/);
  await expect(page.getByRole("heading", { name: "The Wawel dragon" })).toBeVisible();
});
