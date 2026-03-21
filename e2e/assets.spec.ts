import { test, expect } from "@playwright/test";
import { albums } from "../src/data/albums";
import { projects } from "../src/data/projects";

test.describe("Critical assets return 200", () => {
  test("OG image is accessible", async ({ request }) => {
    const res = await request.get("/og/og-main.jpg");
    expect(res.status()).toBe(200);
  });

  for (const album of albums) {
    test(`album thumbnail: ${album.id}`, async ({ request }) => {
      const res = await request.get(album.thumbnail);
      expect(res.status()).toBe(200);
    });
  }

  for (const project of projects) {
    if (project.demoImageUrl) {
      test(`project demoImageUrl: ${project.id}`, async ({ request }) => {
        const res = await request.get(project.demoImageUrl!);
        expect(res.status()).toBe(200);
      });
    }

    if (project.screenshots) {
      for (const src of project.screenshots) {
        test(`screenshot: ${src}`, async ({ request }) => {
          const res = await request.get(src);
          expect(res.status()).toBe(200);
        });
      }
    }
  }
});
