import Image from "next/image";

import type { Photo } from "@/src/data/photos";

type Props = {
  photo: Photo;
  onSelect: (photo: Photo) => void;
};

export function PhotoCard({ photo, onSelect }: Props) {
  return (
    <article
      className="group mb-3 break-inside-avoid cursor-pointer sm:mb-4"
      onClick={() => onSelect(photo)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(photo)}
      role="button"
      tabIndex={0}
      aria-label={`View ${photo.title}`}
    >
      <div className="overflow-hidden rounded-sm bg-stone-100">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="block h-auto w-full transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-xs tracking-wide text-stone-600">{photo.title}</p>
        {photo.location && (
          <p className="mt-0.5 text-xs text-stone-400">{photo.location}</p>
        )}
      </div>
    </article>
  );
}
