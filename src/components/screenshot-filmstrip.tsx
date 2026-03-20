"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

type ScreenshotFilmstripProps = {
  screenshots: string[];
  projectTitle: string;
};

function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
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
        sizes="(max-width: 640px) 55vw, 220px"
        quality={50}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function ScreenshotFilmstrip({ screenshots, projectTitle }: ScreenshotFilmstripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-screenshot]");
    const itemWidth = item ? item.offsetWidth + 12 : 200;
    el.scrollBy({ left: dir === "left" ? -itemWidth : itemWidth, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile: full-bleed filmstrip with arrows */}
      <div className="-mx-6 bg-stone-900 py-8 sm:-mx-10 lg:hidden">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto px-6 sm:px-10"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {screenshots.map((src, i) => (
              <div
                key={i}
                data-screenshot
                className="relative shrink-0 overflow-hidden rounded-2xl"
                style={{
                  width: "clamp(150px, 50vw, 210px)",
                  aspectRatio: "9 / 19.5",
                  scrollSnapAlign: "start",
                }}
              >
                <ScreenshotImage src={src} alt={`${projectTitle} screenshot ${i + 1}`} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={`absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-stone-800/80 p-2 text-stone-300 backdrop-blur-sm transition-opacity duration-200 hover:bg-stone-700/90 hover:text-white sm:left-2 ${
              canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-stone-800/80 p-2 text-stone-300 backdrop-blur-sm transition-opacity duration-200 hover:bg-stone-700/90 hover:text-white sm:right-2 ${
              canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: 3-column grid, same width as content above */}
      <div className="hidden rounded-2xl bg-stone-900 py-8 lg:block">
        <div className="grid grid-cols-3 gap-1.5">
          {screenshots.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl"
              style={{ aspectRatio: "9 / 19.5", maxHeight: "220px" }}
            >
              <ScreenshotImage src={src} alt={`${projectTitle} screenshot ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
