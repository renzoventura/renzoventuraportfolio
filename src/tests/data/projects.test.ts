import { describe, it, expect } from "vitest";

import { projects } from "@/src/data/projects";
import { strideScreenshots } from "@/src/data/projects/stride";

describe("project data integrity", () => {
  it("projects array is non-empty", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    for (const project of projects) {
      expect(project.id, `project id missing`).toBeTruthy();
      expect(project.title, `project[${project.id}]: title missing`).toBeTruthy();
      expect(project.category, `project[${project.id}]: category missing`).toBeTruthy();
      expect(project.description, `project[${project.id}]: description missing`).toBeTruthy();
      expect(project.stack.length, `project[${project.id}]: stack must not be empty`).toBeGreaterThan(0);
    }
  });

  it("project IDs are unique", () => {
    const ids = projects.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size, "duplicate project IDs found").toBe(ids.length);
  });

  it("demoImageUrl starts with / when present", () => {
    for (const project of projects) {
      if (project.demoImageUrl) {
        expect(
          project.demoImageUrl,
          `project[${project.id}]: demoImageUrl must start with /`
        ).toMatch(/^\//);
      }
    }
  });

  it("screenshots are non-empty strings when present", () => {
    for (const project of projects) {
      if (project.screenshots) {
        expect(
          project.screenshots.length,
          `project[${project.id}]: screenshots array must not be empty`
        ).toBeGreaterThan(0);
        for (const src of project.screenshots) {
          expect(src, `project[${project.id}]: screenshot path must start with /`).toMatch(/^\//);
        }
      }
    }
  });

  it("project date is a valid ISO date string", () => {
    for (const project of projects) {
      const d = new Date(project.date);
      expect(isNaN(d.getTime()), `project[${project.id}]: invalid date "${project.date}"`).toBe(false);
    }
  });
});

describe("stride screenshots", () => {
  it("strideScreenshots is non-empty", () => {
    expect(strideScreenshots.length).toBeGreaterThan(0);
  });

  it("all entries start with /", () => {
    for (const src of strideScreenshots) {
      expect(src, `screenshot path must start with /`).toMatch(/^\//);
    }
  });

  it("no duplicate screenshot paths", () => {
    const unique = new Set(strideScreenshots);
    expect(unique.size, "duplicate screenshot paths found").toBe(strideScreenshots.length);
  });
});
