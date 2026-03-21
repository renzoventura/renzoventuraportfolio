import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { AlbumCard } from "@/src/components/photo/album-card";
import type { Album } from "@/src/data/albums";

vi.mock("next/image", () => import("@/src/tests/__mocks__/next/image"));
vi.mock("next/link", () => import("@/src/tests/__mocks__/next/link"));
vi.mock("@/src/components/photo/photo-theme-provider", () => ({
  usePhotoTheme: () => ({ theme: "dark", toggle: vi.fn() }),
}));

const album: Album = {
  id: "japan23",
  title: "Japan",
  subtitle: "2023",
  href: "/photo/japan23",
  thumbnail: "/japan23/THUMBNAIL.JPEG",
  width: 4410,
  height: 5450,
};

describe("AlbumCard", () => {
  it("renders the album title and subtitle", () => {
    render(<AlbumCard album={album} rowSpan={10} />);
    expect(screen.getByText("Japan 2023")).toBeInTheDocument();
  });

  it("renders a link pointing to the album href", () => {
    render(<AlbumCard album={album} rowSpan={10} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/photo/japan23");
  });

  it("renders the thumbnail image", () => {
    render(<AlbumCard album={album} rowSpan={10} />);
    expect(screen.getByAltText("Japan 2023")).toBeInTheDocument();
  });
});
