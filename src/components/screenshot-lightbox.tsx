"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  screenshots: string[];
  initialIndex: number | null;
  projectTitle: string;
  onClose: () => void;
};

const THUMB_H = 64;
const ASPECT = 390 / 844;

export function ScreenshotLightbox({ screenshots, initialIndex, projectTitle, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex ?? 0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  const goTo = useCallback((next: number) => {
    setLoaded(false);
    setIndex(next);
  }, []);

  const prev = useCallback(() => goTo((index - 1 + screenshots.length) % screenshots.length), [index, screenshots.length, goTo]);
  const next = useCallback(() => goTo((index + 1) % screenshots.length), [index, screenshots.length, goTo]);

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

  // Scroll filmstrip to keep active thumb centred
  useEffect(() => {
    const el = filmstripRef.current;
    if (!el) return;
    const thumb = el.children[index] as HTMLElement | undefined;
    if (!thumb) return;
    el.scrollTo({ left: thumb.offsetLeft - el.clientWidth / 2 + thumb.offsetWidth / 2, behavior: "smooth" });
  }, [index]);

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

  const src = screenshots[index];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} screenshot ${index + 1}`}
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
        {screenshots.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/40 transition-colors duration-150 hover:text-white sm:left-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="relative flex flex-col items-center">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border border-white/15 border-t-white/50" />
            </div>
          )}
          <Image
            key={src}
            src={src}
            alt={`${projectTitle} screenshot ${index + 1}`}
            width={390}
            height={844}
            className={`h-auto w-auto max-h-[82vh] max-w-[80vw] shadow-2xl transition-opacity duration-500 sm:max-w-[60vw] lg:max-w-[30vw] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            quality={30}
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 320px"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Next */}
        {screenshots.length > 1 && (
          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/40 transition-colors duration-150 hover:text-white sm:right-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Filmstrip */}
      {screenshots.length > 1 && (
        <div className="relative z-10 w-full pb-6 pt-3">
          <div
            ref={filmstripRef}
            className="flex gap-1.5 overflow-x-auto px-6 touch-pan-x"
            style={{ scrollbarWidth: "none" }}
          >
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`relative shrink-0 overflow-hidden rounded transition-opacity duration-200 ${
                  i === index ? "opacity-100 ring-1 ring-white/60" : "opacity-35 hover:opacity-60"
                }`}
                style={{ height: THUMB_H, width: Math.round(THUMB_H * ASPECT) }}
              >
                <Image
                  src={s}
                  alt={`${projectTitle} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  priority
                  quality={20}
                  sizes="32px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
