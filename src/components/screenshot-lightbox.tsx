"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  screenshots: string[];
  initialIndex: number | null;
  projectTitle: string;
  onClose: () => void;
};

export function ScreenshotLightbox({ screenshots, initialIndex, projectTitle, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex ?? 0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Reset loaded when navigating
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

  if (initialIndex === null) return null;

  const src = screenshots[index];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} screenshot ${index + 1}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Content */}
      <div
        className={`relative z-10 flex items-center gap-4 transition-transform duration-300 ease-in-out ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous screenshot"
          className="shrink-0 rounded-full bg-white/10 p-2 text-white/60 transition-colors duration-150 hover:bg-white/20 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image area */}
        <div className="relative flex flex-col items-center">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center text-white/50 transition-colors duration-150 hover:text-white"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative">
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
              className={`h-auto w-auto max-h-[82vh] max-w-[70vw] shadow-2xl transition-opacity duration-400 sm:max-w-[50vw] lg:max-w-xs ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              priority
              quality={30}
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 320px"
              onLoad={() => setLoaded(true)}
            />
          </div>

          <p className="mt-4 text-center text-xs tracking-widest text-white/40">
            {index + 1} / {screenshots.length}
          </p>
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next screenshot"
          className="shrink-0 rounded-full bg-white/10 p-2 text-white/60 transition-colors duration-150 hover:bg-white/20 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
