"use client";

import Image from "next/image";
import { useState } from "react";

type ScreenshotFilmstripProps = {
  screenshots: string[];
  projectTitle: string;
};

function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative h-full w-full transition-colors duration-500 ${
        !loaded ? "animate-pulse bg-stone-800" : ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 1024px) 42vw, 33vw"
        quality={50}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function ScreenshotFilmstrip({ screenshots, projectTitle }: ScreenshotFilmstripProps) {
  return (
    <>
      {/* Mobile: horizontal filmstrip */}
      <div
        className="flex gap-3 overflow-x-auto pb-3 lg:hidden"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {screenshots.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden rounded-xl"
            style={{
              width: "clamp(160px, 42vw, 220px)",
              aspectRatio: "9 / 19.5",
              scrollSnapAlign: "start",
            }}
          >
            <ScreenshotImage src={src} alt={`${projectTitle} screenshot ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden grid-cols-3 gap-4 lg:grid">
        {screenshots.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl"
            style={{ aspectRatio: "9 / 19.5" }}
          >
            <ScreenshotImage src={src} alt={`${projectTitle} screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
    </>
  );
}
