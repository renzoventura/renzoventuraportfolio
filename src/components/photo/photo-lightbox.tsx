"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Photo } from "@/src/data/photos";

type Props = {
  photo: Photo | null;
  onClose: () => void;
};

export function PhotoLightbox({ photo, onClose }: Props) {
  const [displayed, setDisplayed] = useState<Photo | null>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (photo) {
      setDisplayed(photo);
      setLoaded(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
    } else {
      setVisible(false);
      timerRef.current = setTimeout(() => setDisplayed(null), 350);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [photo]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!displayed) return;
    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [displayed, handleKeyDown]);

  if (!displayed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={displayed.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-transform duration-300 ease-in-out ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center text-white/50 transition-colors duration-150 hover:text-white"
          aria-label="Close lightbox"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Image + spinner */}
        <div className="relative">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border border-white/15 border-t-white/50" />
            </div>
          )}
          <Image
            src={displayed.src}
            alt={displayed.alt}
            width={displayed.width}
            height={displayed.height}
            className={`h-auto w-auto max-h-[82vh] max-w-[88vw] shadow-2xl transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            quality={85}
            sizes="(max-width: 640px) 88vw, 2048px"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Caption */}
        <p className="mt-4 text-center text-xs uppercase tracking-widest text-white/45">
          {displayed.title}
          {displayed.location ? (
            <>
              <span className="mx-2 opacity-40">·</span>
              {displayed.location}
            </>
          ) : null}
          <span className="mx-2 opacity-40">·</span>
          {displayed.year}
        </p>
      </div>
    </div>
  );
}
