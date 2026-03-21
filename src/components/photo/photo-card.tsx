"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";

import type { Photo } from "@/src/data/photos";

import { usePhotoTheme } from "./photo-theme-provider";

type Props = {
  photo: Photo;
  rowSpan: number;
  topPadding?: number;
  priority?: boolean;
  onSelect: (photo: Photo) => void;
};

export function PhotoCard({ photo, rowSpan, topPadding = 0, priority = false, onSelect }: Props) {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";
  const [loaded, setLoaded] = useState(false);

  // Preload lightbox-quality image on pointer down — fires ~200ms before click
  const handlePointerDown = useCallback(() => {
    const vw = window.innerWidth;
    const dpr = window.devicePixelRatio || 1;
    const estimated = Math.round(vw * 0.80 * dpr);
    const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    const w = deviceSizes.find((s) => s >= estimated) ?? 1920;
    const img = new window.Image();
    img.src = `/_next/image?url=${encodeURIComponent(photo.src)}&w=${w}&q=85`;
  }, [photo.src]);

  return (
    <article
      className="group cursor-pointer"
      style={{ gridRowEnd: `span ${rowSpan}`, paddingTop: topPadding > 0 ? `${topPadding}px` : undefined }}
      onPointerDown={handlePointerDown}
      onClick={() => onSelect(photo)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(photo)}
      role="button"
      tabIndex={0}
      aria-label={`View ${photo.title}`}
    >
      <div
        className={`relative w-full transition-colors duration-500 ${
          !loaded ? (dark ? "animate-pulse bg-stone-800" : "animate-pulse bg-stone-200") : ""
        }`}
        style={{ aspectRatio: `${photo.width} / ${photo.height}`, WebkitTouchCallout: "none" } as React.CSSProperties}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className={`h-auto w-full transition-opacity duration-700 ease-in-out group-hover:opacity-85 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={65}
          priority={priority}
          title=""
          draggable={false}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="mt-2 px-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={`text-xs tracking-wide transition-colors duration-300 ${
              dark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            {photo.title}
          </p>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 ${dark ? "text-stone-600" : "text-stone-400"}`}
          >
            <polyline points="6.5 1 9 1 9 3.5" />
            <polyline points="3.5 9 1 9 1 6.5" />
            <line x1="9" y1="1" x2="5.5" y2="4.5" />
            <line x1="1" y1="9" x2="4.5" y2="5.5" />
          </svg>
        </div>
        {photo.location && (
          <p
            className={`mt-0.5 text-xs transition-colors duration-300 ${
              dark ? "text-stone-600" : "text-stone-400"
            }`}
          >
            {photo.location}
          </p>
        )}
      </div>
    </article>
  );
}
