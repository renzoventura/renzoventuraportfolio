"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

type ScreenshotFilmstripProps = {
  screenshots: string[];
  projectTitle: string;
  embedded?: boolean;
};

function ScreenshotImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative h-full w-full transition-colors duration-500 ${
        !loaded ? "animate-pulse bg-stone-700" : ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="195px"
        quality={30}
        priority={priority}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

const PER_PAGE = 4;
const GAP = 12;

function NavButton({
  onClick,
  disabled,
  label,
  direction,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  direction: "left" | "right";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`shrink-0 rounded-full bg-stone-200 p-2 text-stone-800 transition-all duration-200 hover:bg-white ${
        disabled ? "cursor-not-allowed opacity-20" : "cursor-pointer opacity-100"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

export function ScreenshotFilmstrip({ screenshots, projectTitle, embedded = false }: ScreenshotFilmstripProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(screenshots.length / PER_PAGE);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  // Desktop carousel measurement
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Math.floor prevents fractional pixels causing the 5th image to peek
  const itemWidth = containerWidth > 0 ? Math.floor((containerWidth - GAP * (PER_PAGE - 1)) / PER_PAGE) : 0;
  const pageShift = PER_PAGE * (itemWidth + GAP);
  const offset = page * pageShift;

  // Mobile scroll state
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateMobileScroll = useCallback(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    updateMobileScroll();
    el.addEventListener("scroll", updateMobileScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateMobileScroll);
  }, [updateMobileScroll]);

  const scrollMobile = (dir: "left" | "right") => {
    mobileScrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div>
      {/* Mobile: free-flowing scroll */}
      <div className={`lg:hidden ${embedded ? "py-2" : "-mx-6 bg-stone-900 py-8 sm:-mx-10"}`}>
        <div className="relative">
          <div
            ref={mobileScrollRef}
            className={`flex gap-3 overflow-x-auto ${embedded ? "" : "px-6 sm:px-10"}`}
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {screenshots.map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 overflow-hidden rounded-2xl"
                style={{ width: "clamp(150px, 50vw, 195px)", aspectRatio: "9 / 19.5" }}
              >
                <ScreenshotImage src={src} alt={`${projectTitle} screenshot ${i + 1}`} priority={i < 2} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollMobile("left")}
            aria-label="Scroll left"
            className={`absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-stone-200 p-1 text-stone-800 transition-opacity duration-200 hover:bg-white sm:left-2 ${
              canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() => scrollMobile("right")}
            aria-label="Scroll right"
            className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-stone-200 p-1 text-stone-800 transition-opacity duration-200 hover:bg-white sm:right-2 ${
              canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: [prev] [4-up carousel] [next] */}
      <div className="hidden items-center gap-1.5 lg:flex">
        <NavButton
          onClick={() => setPage((p) => p - 1)}
          disabled={!canPrev}
          label="Previous screenshots"
          direction="left"
        />

        <div ref={containerRef} className={`flex-1 overflow-hidden rounded-2xl py-4 ${embedded ? "" : "bg-stone-900 py-6"}`}>
          <div
            className="flex"
            style={{
              gap: GAP,
              transform: `translateX(-${offset}px)`,
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {screenshots.map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 overflow-hidden rounded-xl"
                style={{
                  width: itemWidth > 0 ? `${itemWidth}px` : `calc((100% - ${GAP * (PER_PAGE - 1)}px) / ${PER_PAGE})`,
                  aspectRatio: "9 / 19.5",
                }}
              >
                <ScreenshotImage src={src} alt={`${projectTitle} screenshot ${i + 1}`} priority={i < 4} />
              </div>
            ))}
          </div>
        </div>

        <NavButton
          onClick={() => setPage((p) => p + 1)}
          disabled={!canNext}
          label="Next screenshots"
          direction="right"
        />
      </div>
    </div>
  );
}
