"use client";

import { useState } from "react";

import { photos, type Photo } from "@/src/data/photos";

import { PhotoCard } from "./photo-card";
import { PhotoLightbox } from "./photo-lightbox";

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onSelect={setSelectedPhoto} />
        ))}
      </div>

      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}
