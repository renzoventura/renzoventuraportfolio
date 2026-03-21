"use client";

import Image from "next/image";
import Link from "next/link";

import { albums } from "@/src/data/albums";
import { usePhotoTheme } from "./photo-theme-provider";

type Props = {
  currentId: string;
};

export function OtherAlbums({ currentId }: Props) {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";
  const others = albums.filter((a) => a.id !== currentId);

  if (others.length === 0) return null;

  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <h2
        className={`mb-6 text-2xl font-light tracking-tight transition-colors duration-300 sm:text-4xl ${
          dark ? "text-stone-500" : "text-stone-400"
        }`}
      >
        Other albums
      </h2>

      <div className={`grid gap-6 ${others.length === 1 ? "grid-cols-1 max-w-xs" : others.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
        {others.map((album) => (
          <Link key={album.id} href={album.href} className="group block">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${album.width} / ${album.height}` }}
            >
              <Image
                src={album.thumbnail}
                alt={`${album.title} ${album.subtitle}`}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-85"
                sizes="(max-width: 640px) 100vw, 33vw"
                quality={50}
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <p
                className={`text-xs tracking-wide transition-colors duration-300 ${
                  dark ? "text-stone-400" : "text-stone-600"
                }`}
              >
                {album.title} {album.subtitle}
              </p>
              <p
                className={`shrink-0 text-xs ${
                  dark ? "text-stone-500" : "text-stone-400"
                }`}
              >
                Go to album →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
