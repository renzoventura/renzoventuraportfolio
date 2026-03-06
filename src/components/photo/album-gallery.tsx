"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Album } from "@/src/data/albums";

import { AlbumCard } from "./album-card";

const ROW_UNIT = 4;
const GAP = 12;
const TEXT_OFFSET = 50;
const DEFAULT_SPAN = 35;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getColCount(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

type Props = {
  albums: Album[];
};

export function AlbumGallery({ albums }: Props) {
  const [spanMap, setSpanMap] = useState<Record<string, number>>({});
  const [cols, setCols] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const computeSpans = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const containerWidth = el.getBoundingClientRect().width;
    const colCount = getColCount(containerWidth);
    const colW = (containerWidth - GAP * (colCount - 1)) / colCount;
    const newSpanMap: Record<string, number> = {};

    for (const album of albums) {
      const imageH = colW * (album.height / album.width);
      const rowSpan = Math.ceil((imageH + TEXT_OFFSET + GAP) / (ROW_UNIT + GAP));
      newSpanMap[album.id] = rowSpan;
    }

    setCols(colCount);
    setSpanMap(newSpanMap);
  }, [albums]);

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
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: `${ROW_UNIT}px`,
        gap: `${GAP}px`,
      }}
    >
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          rowSpan={spanMap[album.id] ?? DEFAULT_SPAN}
        />
      ))}
    </div>
  );
}
