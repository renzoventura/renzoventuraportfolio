import { describe, it, expect } from "vitest";

import { albums } from "@/src/data/albums";

describe("album data integrity", () => {
  it("albums array is non-empty", () => {
    expect(albums.length).toBeGreaterThan(0);
  });

  it("every album has required fields", () => {
    for (const album of albums) {
      expect(album.id, `album id missing`).toBeTruthy();
      expect(album.title, `album[${album.id}]: title missing`).toBeTruthy();
      expect(album.subtitle, `album[${album.id}]: subtitle missing`).toBeTruthy();
      expect(album.href, `album[${album.id}]: href missing`).toBeTruthy();
      expect(album.thumbnail, `album[${album.id}]: thumbnail missing`).toBeTruthy();
    }
  });

  it("every album href matches /photo/[id]", () => {
    for (const album of albums) {
      expect(album.href, `album[${album.id}]: href should be /photo/${album.id}`).toBe(
        `/photo/${album.id}`
      );
    }
  });

  it("every album thumbnail starts with /", () => {
    for (const album of albums) {
      expect(album.thumbnail, `album[${album.id}]: thumbnail must start with /`).toMatch(/^\//);
    }
  });

  it("every album has positive width and height", () => {
    for (const album of albums) {
      expect(album.width, `album[${album.id}]: width must be positive`).toBeGreaterThan(0);
      expect(album.height, `album[${album.id}]: height must be positive`).toBeGreaterThan(0);
    }
  });

  it("album IDs are unique", () => {
    const ids = albums.map((a) => a.id);
    const unique = new Set(ids);
    expect(unique.size, "duplicate album IDs found").toBe(ids.length);
  });
});
