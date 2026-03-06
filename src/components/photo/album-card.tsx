"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Album } from "@/src/data/albums";

import { usePhotoTheme } from "./photo-theme-provider";

type Props = {
  album: Album;
  rowSpan: number;
};

export function AlbumCard({ album, rowSpan }: Props) {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";
  const [loaded, setLoaded] = useState(false);

  return (
    <article
      className="group"
      style={{ gridRowEnd: `span ${rowSpan}` }}
    >
      <Link href={album.href} className="block">
        <div
          className={`relative w-full transition-colors duration-500 ${
            !loaded ? (dark ? "animate-pulse bg-stone-800" : "animate-pulse bg-stone-200") : ""
          }`}
          style={{ aspectRatio: `${album.width} / ${album.height}` }}
        >
          <Image
            src={album.thumbnail}
            alt={`${album.title} ${album.subtitle}`}
            width={album.width}
            height={album.height}
            className={`h-auto w-full transition-opacity duration-700 ease-in-out group-hover:opacity-85 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            title=""
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="mt-2 px-0.5">
          <p
            className={`text-xs tracking-wide transition-colors duration-300 ${
              dark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            {album.title}
          </p>
          <p
            className={`mt-0.5 text-xs transition-colors duration-300 ${
              dark ? "text-stone-600" : "text-stone-400"
            }`}
          >
            {album.subtitle}
          </p>
        </div>
      </Link>
    </article>
  );
}
