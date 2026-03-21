import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { PhotoCard } from "@/src/components/photo/photo-card";
import type { Photo } from "@/src/data/photos";

vi.mock("next/image", () => import("@/src/tests/__mocks__/next/image"));
vi.mock("@/src/components/photo/photo-theme-provider", () => ({
  usePhotoTheme: () => ({ theme: "dark", toggle: vi.fn() }),
}));

const photo: Photo = {
  id: "test-1",
  title: "Test Photo",
  location: "Tokyo",
  year: 2023,
  src: "/test/photo.jpg",
  alt: "A test photo",
  category: "travel",
  width: 4000,
  height: 3000,
};

describe("PhotoCard", () => {
  const onSelect = vi.fn();

  beforeEach(() => onSelect.mockClear());

  it("renders the photo title", () => {
    render(<PhotoCard photo={photo} rowSpan={10} onSelect={onSelect} />);
    expect(screen.getByText("Test Photo")).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(<PhotoCard photo={photo} rowSpan={10} onSelect={onSelect} />);
    expect(screen.getByAltText("A test photo")).toBeInTheDocument();
  });

  it("calls onSelect with the photo when clicked", () => {
    render(<PhotoCard photo={photo} rowSpan={10} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: /view test photo/i }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(photo);
  });

  it("calls onSelect when Enter key is pressed", () => {
    render(<PhotoCard photo={photo} rowSpan={10} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button", { name: /view test photo/i }), { key: "Enter" });
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("renders location when provided", () => {
    render(<PhotoCard photo={photo} rowSpan={10} onSelect={onSelect} />);
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });

  it("does not render location when absent", () => {
    const noLocation = { ...photo, location: undefined };
    render(<PhotoCard photo={noLocation} rowSpan={10} onSelect={onSelect} />);
    expect(screen.queryByText("Tokyo")).not.toBeInTheDocument();
  });
});
