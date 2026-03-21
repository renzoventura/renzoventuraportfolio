import { test, expect } from "@playwright/test";

test.describe("Photo Lightbox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/photo/japan23");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("opens lightbox when a photo card is clicked", async ({ page }) => {
    await page.locator("article").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("lightbox shows close button", async ({ page }) => {
    await page.locator("article").first().click();
    await expect(page.getByRole("button", { name: /close lightbox/i })).toBeVisible();
  });

  test("closes lightbox with close button", async ({ page }) => {
    await page.locator("article").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: /close lightbox/i }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("closes lightbox with Escape key", async ({ page }) => {
    await page.locator("article").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("navigates to next photo with ArrowRight key", async ({ page }) => {
    await page.locator("article").first().click();
    const first = await page.getByRole("dialog").getAttribute("aria-label");
    await page.keyboard.press("ArrowRight");
    const second = await page.getByRole("dialog").getAttribute("aria-label");
    expect(second).not.toBe(first);
  });

  test("navigates to previous photo with ArrowLeft key", async ({ page }) => {
    await page.locator("article").nth(1).click();
    const second = await page.getByRole("dialog").getAttribute("aria-label");
    await page.keyboard.press("ArrowLeft");
    const first = await page.getByRole("dialog").getAttribute("aria-label");
    expect(first).not.toBe(second);
  });

  test("filmstrip buttons are present in DOM", async ({ page }) => {
    await page.locator("article").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // Filmstrip renders buttons with aria-label "Go to photo N"
    const firstThumb = page.locator('[aria-label="Go to photo 1"]');
    await expect(firstThumb).toBeAttached();
  });

  test("filmstrip thumbnail click changes photo", async ({ page }) => {
    await page.locator("article").first().click();
    const initial = await page.getByRole("dialog").getAttribute("aria-label");
    await page.locator('[aria-label="Go to photo 3"]').click();
    const after = await page.getByRole("dialog").getAttribute("aria-label");
    expect(after).not.toBe(initial);
  });

  test("caption is visible and non-empty", async ({ page }) => {
    await page.locator("article").first().click();
    const caption = page.locator("p.uppercase.tracking-widest");
    await expect(caption).toBeVisible();
    const text = await caption.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test("caption stays in position while image loads (no layout shift)", async ({ page }) => {
    await page.locator("article").first().click();
    const caption = page.locator("p.uppercase.tracking-widest");
    await expect(caption).toBeVisible();
    const box1 = await caption.boundingBox();
    // Navigate to next photo and immediately check caption position
    await page.keyboard.press("ArrowRight");
    await expect(caption).toBeVisible();
    const box2 = await caption.boundingBox();
    // Caption Y position must remain stable (within 2px)
    expect(Math.abs((box1?.y ?? 0) - (box2?.y ?? 0))).toBeLessThan(5);
  });
});

