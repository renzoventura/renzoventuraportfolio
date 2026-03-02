"use client";

import Image from "next/image";

import type { Photo } from "@/src/data/photos";

import { usePhotoTheme } from "./photo-theme-provider";

type Props = {
  photo: Photo;
  rowSpan: number;
  colSpan: number;
  onSelect: (photo: Photo) => void;
};

export function PhotoCard({ photo, rowSpan, colSpan, onSelect }: Props) {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";

  return (
    <article
      className="group flex cursor-pointer flex-col"
      style={{ gridColumnEnd: `span ${colSpan}`, gridRowEnd: `span ${rowSpan}` }}
      onClick={() => onSelect(photo)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(photo)}
      role="button"
      tabIndex={0}
      aria-label={`View ${photo.title}`}
    >
      <div className="flex-1 overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
          sizes={
            colSpan === 2
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>
      <div className="mt-2 shrink-0 px-0.5">
        <p
          className={`text-xs tracking-wide transition-colors duration-300 ${
            dark ? "text-stone-400" : "text-stone-600"
          }`}
        >
          {photo.title}
        </p>
        {photo.location && (
          <p
            className={`mt-0.5 text-xs transition-colors duration-300 ${
              dark ? "text-stone-600" : "text-stone-400"
            }`}
          >
            {photo.location}
          </p>
        )}
      </div>
    </article>
  );
}
