import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProjectCard } from "@/src/components/project-card";
import type { Project } from "@/src/data/projects";

vi.mock("next/image", () => import("@/src/tests/__mocks__/next/image"));

const baseProject: Project = {
  id: "stride",
  title: "Stride",
  category: "iOS App",
  shortDescription: "Your performance is art.",
  description: "Transforms your Strava runs into premium graphics.",
  stack: ["SwiftUI", "MapKit", "Strava API"],
  githubUrl: "https://github.com/renzoventura/stride",
  liveUrl: "https://example.com/demo",
  recent: true,
  featured: true,
  date: "2026-02-17",
};

describe("ProjectCard", () => {
  it("renders title and description", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Stride")).toBeInTheDocument();
    expect(screen.getByText("Transforms your Strava runs into premium graphics.")).toBeInTheDocument();
  });

  it("renders all stack items", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("SwiftUI")).toBeInTheDocument();
    expect(screen.getByText("MapKit")).toBeInTheDocument();
    expect(screen.getByText("Strava API")).toBeInTheDocument();
  });

  it("renders GitHub and demo links", () => {
    render(<ProjectCard project={baseProject} />);
    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("href", "https://github.com/renzoventura/stride");
    expect(screen.getByRole("link", { name: /watch demo/i })).toBeInTheDocument();
  });

  it("renders demo image when demoImageUrl is provided", () => {
    const project = { ...baseProject, demoImageUrl: "/screenshots/stride/1.PNG" };
    render(<ProjectCard project={project} />);
    expect(screen.getByAltText("Stride screenshot")).toBeInTheDocument();
  });

  it("does not render demo image when demoImageUrl is absent", () => {
    const project = { ...baseProject, demoImageUrl: undefined };
    render(<ProjectCard project={project} />);
    expect(screen.queryByAltText("Stride screenshot")).not.toBeInTheDocument();
  });
});
