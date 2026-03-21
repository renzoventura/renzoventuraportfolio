"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Photo } from "@/src/data/photos";

import { PhotoCard } from "./photo-card";
import { PhotoLightbox } from "./photo-lightbox";

const ROW_UNIT = 4;
const GAP = 12;
const TEXT_OFFSET = 50;
const DEFAULT_SPAN = 35;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Orientation = "portrait" | "landscape" | "square";

function getOrientation(p: Photo): Orientation {
  const ratio = p.width / p.height;
  if (ratio > 0.85 && ratio < 1.15) return "square";
  return p.height > p.width ? "portrait" : "landscape";
}

function shufflePhotos(input: Photo[], prevPhoto?: Photo): Photo[] {
  const pools: Record<Orientation, Photo[]> = {
    portrait: fisherYates(input.filter((p) => getOrientation(p) === "portrait")),
    landscape: fisherYates(input.filter((p) => getOrientation(p) === "landscape")),
    square: fisherYates(input.filter((p) => getOrientation(p) === "square")),
  };
  const idx: Record<Orientation, number> = { portrait: 0, landscape: 0, square: 0 };
  const remaining = (o: Orientation) => pools[o].length - idx[o];
  const orientations: Orientation[] = ["portrait", "landscape", "square"];

  const result: Photo[] = [];
  let last: Orientation | null = prevPhoto ? getOrientation(prevPhoto) : null;

  while (orientations.some((o) => remaining(o) > 0)) {
    // Prefer any orientation that differs from last
    const available = orientations.filter((o) => o !== last && remaining(o) > 0);
    // Fallback: if all remaining are the same orientation, use it
    const candidates = available.length > 0 ? available : orientations.filter((o) => remaining(o) > 0);

    // Weight by remaining count so depleted pools are picked less often
    const total = candidates.reduce((s, o) => s + remaining(o), 0);
    let rand = Math.random() * total;
    let chosen = candidates[0];
    for (const o of candidates) {
      rand -= remaining(o);
      if (rand <= 0) { chosen = o; break; }
    }

    result.push(pools[chosen][idx[chosen]++]);
    last = chosen;
  }

  return result;
}

function orderPhotos(regular: Photo[], featured: Photo[]): Photo[] {
  return [...featured, ...regular];
}

function getColCount(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

type Props = {
  photos: Photo[];
};

export function PhotoGallery({ photos: allPhotos }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [orderedPhotos] = useState<Photo[]>(() => {
    const featured = allPhotos.filter((p) => p.featured);
    const regular = allPhotos.filter((p) => !p.featured);
    const lastFeatured = featured.length > 0 ? featured[featured.length - 1] : undefined;
    return orderPhotos(shufflePhotos(regular, lastFeatured), featured);
  });
  const [spanMap, setSpanMap] = useState<Record<string, number>>({});
  const [cols, setCols] = useState(3);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxOpen = useRef(false);

  const handleSelect = useCallback((photo: Photo) => {
    lightboxOpen.current = true;
    setSelectedIndex(orderedPhotos.findIndex((p) => p.id === photo.id));
  }, [orderedPhotos]);

  const handleClose = useCallback(() => {
    lightboxOpen.current = false;
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  const computeSpans = useCallback(() => {
    const el = containerRef.current;
    if (!el || lightboxOpen.current) return;

    const containerWidth = el.getBoundingClientRect().width;
    const colCount = getColCount(containerWidth);
    const colW = (containerWidth - GAP * (colCount - 1)) / colCount;
    const newSpanMap: Record<string, number> = {};

    for (const [i, photo] of orderedPhotos.entries()) {
      const topPadding = colCount === 3
        ? (i % 3 === 0 ? 24 : i % 3 === 2 ? 32 : 0)
        : 0;
      const imageH = colW * (photo.height / photo.width);
      const rowSpan = Math.ceil((imageH + TEXT_OFFSET + GAP + topPadding) / (ROW_UNIT + GAP));
      newSpanMap[photo.id] = rowSpan;
    }

    setCols(colCount);
    setSpanMap(newSpanMap);
  }, [orderedPhotos]);

  useIsomorphicLayoutEffect(() => {
    computeSpans();
  }, [computeSpans]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(computeSpans);
    observer.observe(el);
    return () => observer.disconnect();
  }, [computeSpans]);

  return (
    <>
      <div
        ref={containerRef}
        className={`transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridAutoRows: `${ROW_UNIT}px`,
          gap: `${GAP}px`,
        }}
      >
        {orderedPhotos.map((photo, index) => {
          const topPadding = cols === 3
            ? (index % 3 === 0 ? 24 : index % 3 === 2 ? 32 : 0)
            : 0;
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              rowSpan={spanMap[photo.id] ?? DEFAULT_SPAN}
              topPadding={topPadding}
              priority={index < 6}
              onSelect={handleSelect}
            />
          );
        })}
      </div>

      <PhotoLightbox
        photos={orderedPhotos}
        initialIndex={selectedIndex}
        onClose={handleClose}
      />
    </>
  );
}
