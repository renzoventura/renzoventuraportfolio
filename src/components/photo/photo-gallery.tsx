"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { photos as allPhotos, type Photo } from "@/src/data/photos";

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

function shufflePhotos(input: Photo[]): Photo[] {
  const portraits = input.filter((p) => p.height >= p.width);
  const landscapes = input.filter((p) => p.height < p.width);
  const shuffledP = fisherYates(portraits);
  const shuffledL = fisherYates(landscapes);

  const result: Photo[] = [];
  let pi = 0;
  let li = 0;
  let streak = 0;
  let lastWasPortrait = false;

  while (pi < shuffledP.length || li < shuffledL.length) {
    const hasPortrait = pi < shuffledP.length;
    const hasLandscape = li < shuffledL.length;
    let takePortrait: boolean;

    if (!hasPortrait) {
      takePortrait = false;
    } else if (!hasLandscape) {
      takePortrait = true;
    } else if (streak >= 2 && lastWasPortrait) {
      takePortrait = false;
    } else if (streak >= 2 && !lastWasPortrait) {
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

function distributeFeatures(regular: Photo[], featured: Photo[]): Photo[] {
  if (featured.length === 0) return regular;

  const count = featured.length;
  const rCount = regular.length;
  const positions: number[] = [];

  for (let i = 0; i < count; i++) {
    let pos = Math.round(((i + 1) / (count + 1)) * rCount);
    if (i > 0 && pos - positions[i - 1] < 2) {
      pos = positions[i - 1] + 2;
    }
    positions.push(pos);
  }

  const result = [...regular];
  for (let i = count - 1; i >= 0; i--) {
    result.splice(positions[i], 0, featured[i]);
  }

  return result;
}

function getColCount(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [orderedPhotos, setOrderedPhotos] = useState<Photo[]>(allPhotos);
  const [spanMap, setSpanMap] = useState<Record<string, number>>({});
  const [colMap, setColMap] = useState<Record<string, number>>({});
  const [cols, setCols] = useState(3);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shuffle once on mount — avoids SSR hydration mismatch (SSR uses original order)
  useEffect(() => {
    const featured = allPhotos.filter((p) => p.featured);
    const regular = allPhotos.filter((p) => !p.featured);
    const shuffledRegular = shufflePhotos(regular);
    const withFeatured = distributeFeatures(shuffledRegular, featured);
    setOrderedPhotos(withFeatured);
    setReady(true);
  }, []);

  const computeSpans = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const containerWidth = el.getBoundingClientRect().width;
    const colCount = getColCount(containerWidth);
    const newSpanMap: Record<string, number> = {};
    const newColMap: Record<string, number> = {};

    for (const photo of orderedPhotos) {
      const colSpan = photo.featured && colCount > 1 ? 2 : 1;
      const colW = (containerWidth - GAP * (colCount - 1)) / colCount;
      const itemW = colW * colSpan + GAP * (colSpan - 1);
      const imageH = itemW * (photo.height / photo.width);
      const rowSpan = Math.ceil((imageH + TEXT_OFFSET + GAP) / (ROW_UNIT + GAP));
      newSpanMap[photo.id] = rowSpan;
      newColMap[photo.id] = colSpan;
    }

    setCols(colCount);
    setSpanMap(newSpanMap);
    setColMap(newColMap);
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
        {orderedPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            rowSpan={spanMap[photo.id] ?? DEFAULT_SPAN}
            colSpan={colMap[photo.id] ?? 1}
            onSelect={setSelectedPhoto}
          />
        ))}
      </div>

      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}
