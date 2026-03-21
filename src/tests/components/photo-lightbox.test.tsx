import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";

import { PhotoLightbox } from "@/src/components/photo/photo-lightbox";
import type { Photo } from "@/src/data/photos";

vi.mock("next/image", () => import("@/src/tests/__mocks__/next/image"));

const photos: Photo[] = [
  {
    id: "1",
    title: "Kifune Shrine",
    location: "Kyoto",
    year: 2023,
    src: "/japan23/shrine.jpg",
    alt: "Torii gates",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
  {
    id: "2",
    title: "Mt Fuji",
    location: "Yamanashi",
    year: 2023,
    src: "/japan23/fuji.jpg",
    alt: "Mount Fuji",
    category: "landscape",
    width: 4410,
    height: 5450,
  },
  {
    id: "3",
    title: "Okayama Castle",
    location: "Okayama",
    year: 2023,
    src: "/japan23/castle.jpg",
    alt: "Okayama Castle",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
];

// Helper: get the title shown in the lightbox dialog's aria-label
function getDialogTitle() {
  return screen.getByRole("dialog").getAttribute("aria-label");
}

describe("PhotoLightbox", () => {
  const onClose = vi.fn();

  beforeEach(() => onClose.mockClear());

  it("renders nothing when initialIndex is null", () => {
    const { container } = render(
      <PhotoLightbox photos={photos} initialIndex={null} onClose={onClose} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the correct photo at the initial index", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    expect(getDialogTitle()).toBe("Kifune Shrine");
  });

  it("shows the second photo when initialIndex is 1", () => {
    render(<PhotoLightbox photos={photos} initialIndex={1} onClose={onClose} />);
    expect(getDialogTitle()).toBe("Mt Fuji");
  });

  it("calls onClose when Escape key is pressed", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.querySelector(".absolute.inset-0.bg-black\\/85")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when close button is clicked", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /close lightbox/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("navigates to next photo with ArrowRight key", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(getDialogTitle()).toBe("Mt Fuji");
  });

  it("navigates to previous photo with ArrowLeft key", () => {
    render(<PhotoLightbox photos={photos} initialIndex={1} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(getDialogTitle()).toBe("Kifune Shrine");
  });

  it("wraps around to last photo when pressing ArrowLeft on first", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(getDialogTitle()).toBe("Okayama Castle");
  });

  it("wraps around to first photo when pressing ArrowRight on last", () => {
    render(<PhotoLightbox photos={photos} initialIndex={2} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(getDialogTitle()).toBe("Kifune Shrine");
  });

  it("navigates via next button click", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /next photo/i }));
    expect(getDialogTitle()).toBe("Mt Fuji");
  });

  it("navigates via prev button click", () => {
    render(<PhotoLightbox photos={photos} initialIndex={1} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /previous photo/i }));
    expect(getDialogTitle()).toBe("Kifune Shrine");
  });

  it("renders caption with title, location, and year", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Kifune Shrine")).toBeInTheDocument();
    expect(within(dialog).getByText("Kyoto")).toBeInTheDocument();
    expect(within(dialog).getByText("2023")).toBeInTheDocument();
  });

  it("renders filmstrip thumbnails for all photos", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    const thumbButtons = screen.getAllByRole("button", { name: /go to photo/i });
    expect(thumbButtons).toHaveLength(photos.length);
  });

  it("navigates to photo when filmstrip thumbnail is clicked", () => {
    render(<PhotoLightbox photos={photos} initialIndex={0} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /go to photo 3/i }));
    expect(getDialogTitle()).toBe("Okayama Castle");
  });
});
