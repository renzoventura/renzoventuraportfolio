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

function shufflePhotos(input: Photo[], prevPhoto?: Photo): Photo[] {
  const portraits = input.filter((p) => p.height >= p.width);
  const landscapes = input.filter((p) => p.height < p.width);
  const shuffledP = fisherYates(portraits);
  const shuffledL = fisherYates(landscapes);

  const result: Photo[] = [];
  let pi = 0;
  let li = 0;
  // Seed streak from the last photo before this sequence (e.g. last featured photo)
  let lastWasPortrait = prevPhoto ? prevPhoto.height >= prevPhoto.width : false;
  let streak = prevPhoto ? 1 : 0;

  while (pi < shuffledP.length || li < shuffledL.length) {
    const hasPortrait = pi < shuffledP.length;
    const hasLandscape = li < shuffledL.length;
    let takePortrait: boolean;

    if (!hasPortrait) {
      takePortrait = false;
    } else if (!hasLandscape) {
      takePortrait = true;
    } else if (streak >= 1 && lastWasPortrait) {
      takePortrait = false;
    } else if (streak >= 1 && !lastWasPortrait) {
      takePortrait = true;
    } else {
      const remainingP = shuffledP.length - pi;
      const remainingL = shuffledL.length - li;
      takePortrait = remainingP >= remainingL
        ? Math.random() < 0.6
        : Math.random() < 0.4;
    }

    if (takePortrait) {
      result.push(shuffledP[pi++]);
      streak = lastWasPortrait ? streak + 1 : 1;
      lastWasPortrait = true;
    } else {
      result.push(shuffledL[li++]);
      streak = !lastWasPortrait ? streak + 1 : 1;
      lastWasPortrait = false;
    }
  }

  return result;
}

// Featured photos always appear first (positions 1, 2, ...)
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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [orderedPhotos, setOrderedPhotos] = useState<Photo[]>(allPhotos);
  const [spanMap, setSpanMap] = useState<Record<string, number>>({});
  const [cols, setCols] = useState(3);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shuffle once on mount — avoids SSR hydration mismatch (SSR uses original order)
  useEffect(() => {
    const featured = allPhotos.filter((p) => p.featured);
    const regular = allPhotos.filter((p) => !p.featured);
    const lastFeatured = featured.length > 0 ? featured[featured.length - 1] : undefined;
    const shuffledRegular = shufflePhotos(regular, lastFeatured);
    const withFeatured = orderPhotos(shuffledRegular, featured);
    setOrderedPhotos(withFeatured);
    setReady(true);
  }, []);

  const computeSpans = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

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

  // Compute spans before first paint
  useIsomorphicLayoutEffect(() => {
    computeSpans();
  }, [computeSpans]);

  // ResizeObserver for responsive updates
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
              onSelect={setSelectedPhoto}
            />
          );
        })}
      </div>

      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}
