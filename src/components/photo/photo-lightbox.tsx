"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Photo } from "@/src/data/photos";

type Props = {
  photos: Photo[];
  initialIndex: number | null;
  onClose: () => void;
};

export function PhotoLightbox({ photos, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex ?? 0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Open/close animation
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (initialIndex !== null) {
      setIndex(initialIndex);
      setLoaded(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      timerRef.current = setTimeout(() => {}, 350);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [initialIndex]);

  // Reset loaded when index changes
  const goTo = useCallback((next: number) => {
    setLoaded(false);
    setIndex(next);
  }, []);

  const prev = useCallback(() => goTo((index - 1 + photos.length) % photos.length), [index, photos.length, goTo]);
  const next = useCallback(() => goTo((index + 1) % photos.length), [index, photos.length, goTo]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }, [onClose, prev, next]);

  useEffect(() => {
    if (initialIndex === null) return;
    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [initialIndex, handleKeyDown]);

  // Scroll filmstrip to keep active thumb visible
  useEffect(() => {
    const el = filmstripRef.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | undefined;
    const thumb = inner?.children[index] as HTMLElement | undefined;
    if (!inner || !thumb) return;
    el.scrollTo({
      left: inner.offsetLeft + thumb.offsetLeft - el.clientWidth / 2 + thumb.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  // Swipe gestures
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (filmstripRef.current?.contains(e.target as Node)) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [prev, next]);

  if (initialIndex === null) return null;

  const displayed = photos[index];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={displayed.title}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Main image area */}
      <div
        className={`relative z-10 flex w-full flex-1 items-center justify-center px-12 transition-transform duration-300 ease-in-out ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-white/50 transition-colors duration-150 hover:text-white"
          aria-label="Close lightbox"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Prev */}
        {photos.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/40 transition-colors duration-150 hover:text-white sm:left-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="relative flex flex-col items-center">
          {/* Container sized to the image's aspect ratio upfront — prevents caption jump */}
          <div
            className="relative max-h-[82vh] max-w-[85vw] shadow-2xl"
            style={{
              aspectRatio: `${displayed.width} / ${displayed.height}`,
              width: `min(85vw, calc(82vh * ${(displayed.width / displayed.height).toFixed(6)}))`,
              WebkitTouchCallout: "none",
            } as React.CSSProperties}
            onContextMenu={(e) => e.preventDefault()}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border border-white/15 border-t-white/50" />
              </div>
            )}
            <Image
              key={displayed.src}
              src={displayed.src}
              alt={displayed.alt}
              fill
              className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              style={{ objectFit: "contain" }}
              priority
              quality={85}
              sizes="(max-width: 640px) 88vw, 2048px"
              draggable={false}
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Caption */}
          <p className="mt-3 flex flex-wrap justify-center text-xs uppercase tracking-widest text-white/45">
            <span className="whitespace-nowrap">{displayed.title}</span>
            {displayed.location && (
              <span className="whitespace-nowrap">
                <span className="mx-2 opacity-40">·</span>
                {displayed.location}
              </span>
            )}
            <span className="whitespace-nowrap">
              <span className="mx-2 opacity-40">·</span>
              {displayed.year}
            </span>
          </p>
        </div>

        {/* Next */}
        {photos.length > 1 && (
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/40 transition-colors duration-150 hover:text-white sm:right-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Filmstrip */}
      {photos.length > 1 && (
        <div className="relative z-10 w-full pb-6 pt-3">
          <div
            ref={filmstripRef}
            className="overflow-x-auto touch-pan-x sm:text-center"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="inline-flex gap-1.5 px-6">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`relative shrink-0 overflow-hidden rounded transition-opacity duration-200 ${
                  i === index ? "opacity-100 ring-1 ring-white/60" : "opacity-35 hover:opacity-60"
                }`}
                style={{ height: 48, width: 48 * (photo.width / photo.height) }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  priority
                  quality={20}
                  sizes="64px"
                />
              </button>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
