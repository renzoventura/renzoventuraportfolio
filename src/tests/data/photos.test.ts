import { describe, it, expect } from "vitest";

import { photos } from "@/src/data/photos";
import { eu22photos } from "@/src/data/eu22photos";
import { eu25photos } from "@/src/data/eu25photos";
import { daylesfordphotos } from "@/src/data/daylesfordphotos";

const VALID_CATEGORIES = ["street", "landscape", "travel", "architecture"] as const;

const allCollections = [
  { name: "japan23", data: photos },
  { name: "eu22", data: eu22photos },
  { name: "eu25", data: eu25photos },
  { name: "daylesford", data: daylesfordphotos },
];

describe("photo data integrity", () => {
  it("all collections are non-empty", () => {
    for (const { name, data } of allCollections) {
      expect(data.length, `${name} should have at least one photo`).toBeGreaterThan(0);
    }
  });

  for (const { name, data } of allCollections) {
    describe(`${name} photos`, () => {
      it("every photo has required string fields", () => {
        for (const photo of data) {
          expect(photo.id, `${name}: id missing`).toBeTruthy();
          expect(photo.title, `${name}[${photo.id}]: title missing`).toBeTruthy();
          expect(photo.src, `${name}[${photo.id}]: src missing`).toBeTruthy();
          expect(photo.alt, `${name}[${photo.id}]: alt missing`).toBeTruthy();
        }
      });

      it("every photo src starts with /", () => {
        for (const photo of data) {
          expect(photo.src, `${name}[${photo.id}]: src must start with /`).toMatch(/^\//);
        }
      });

      it("every photo has positive width and height", () => {
        for (const photo of data) {
          expect(photo.width, `${name}[${photo.id}]: width must be positive`).toBeGreaterThan(0);
          expect(photo.height, `${name}[${photo.id}]: height must be positive`).toBeGreaterThan(0);
        }
      });

      it("every photo has a valid category", () => {
        for (const photo of data) {
          expect(
            VALID_CATEGORIES,
            `${name}[${photo.id}]: invalid category "${photo.category}"`
          ).toContain(photo.category);
        }
      });

      it("every photo has a reasonable year", () => {
        for (const photo of data) {
          expect(photo.year, `${name}[${photo.id}]: year must be > 2000`).toBeGreaterThan(2000);
          expect(photo.year, `${name}[${photo.id}]: year must be <= current year`).toBeLessThanOrEqual(
            new Date().getFullYear()
          );
        }
      });

      it("photo IDs are unique within the collection", () => {
        const ids = data.map((p) => p.id);
        const unique = new Set(ids);
        expect(unique.size, `${name}: duplicate photo IDs found`).toBe(ids.length);
      });
    });
  }

  it("photo IDs are unique across all collections", () => {
    const allIds = allCollections.flatMap(({ data }) => data.map((p) => p.id));
    const unique = new Set(allIds);
    expect(unique.size, "duplicate IDs found across collections").toBe(allIds.length);
  });
});
