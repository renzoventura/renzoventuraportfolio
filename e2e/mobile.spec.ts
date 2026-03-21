/**
 * Mobile-specific E2E tests (iPhone 14 viewport).
 * All other tests run via the desktop project which covers both desktop and mobile viewports
 * through describe-level viewport overrides.
 */
import { test, expect } from "@playwright/test";

test.describe("Mobile — no horizontal overflow", () => {
  test("homepage", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test("photo gallery", async ({ page }) => {
    await page.goto("/photo");
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test("album page", async ({ page }) => {
    await page.goto("/photo/japan23");
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});

test.describe("Mobile — lightbox", () => {
  test("opens and closes", async ({ page }) => {
    await page.goto("/photo/japan23");
    await expect(page.locator("article").first()).toBeVisible();
    await page.locator("article").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: /close lightbox/i }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("filmstrip is present", async ({ page }) => {
    await page.goto("/photo/japan23");
    await expect(page.locator("article").first()).toBeVisible();
    await page.locator("article").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator('[aria-label="Go to photo 1"]')).toBeAttached();
  });

  test("navigates with arrow keys", async ({ page }) => {
    await page.goto("/photo/japan23");
    await expect(page.locator("article").first()).toBeVisible();
    await page.locator("article").first().click();
    const initial = await page.getByRole("dialog").getAttribute("aria-label");
    await page.keyboard.press("ArrowRight");
    const after = await page.getByRole("dialog").getAttribute("aria-label");
    expect(after).not.toBe(initial);
  });
});

test.describe("Mobile — routing", () => {
  for (const [id, path] of [
    ["japan23", "/photo/japan23"],
    ["eu22", "/photo/eu22"],
    ["eu25", "/photo/eu25"],
    ["daylesford", "/photo/daylesford"],
  ] as const) {
    test(`${id} album loads`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("article").first()).toBeVisible();
    });
  }
});
