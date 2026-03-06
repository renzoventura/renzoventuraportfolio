"use client";

import { eu25photos } from "@/src/data/eu25photos";

import { PhotoGallery } from "../photo/photo-gallery";
import { PhotoNav } from "../photo/photo-nav";
import { PhotoThemeProvider, usePhotoTheme } from "../photo/photo-theme-provider";

function PageContent() {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark ? "bg-[#1c1917]" : "bg-[#f7f4f0]"
      }`}
    >
      <PhotoNav />

      <header className="px-6 pb-8 pt-20 sm:pt-32 sm:px-10 lg:px-16">
        <h1
          className={`text-4xl font-light tracking-tight transition-colors duration-300 sm:text-5xl ${
            dark ? "text-stone-200" : "text-stone-900"
          }`}
        >
          Renzo Ventura{" "}
          <span
            className={`transition-colors duration-300 ${
              dark ? "text-stone-500" : "text-stone-400"
            }`}
          >
            | europe, 2025
          </span>
        </h1>
      </header>

      <main className="px-6 pb-24 sm:px-10 lg:px-16">
        <PhotoGallery photos={eu25photos} />
      </main>

      <footer className="px-6 pb-12 sm:px-10 lg:px-16">
        <p
          className={`text-xs transition-colors duration-300 ${
            dark ? "text-stone-600" : "text-stone-400"
          }`}
        >
          © {new Date().getFullYear()} Renzo Ventura
        </p>
      </footer>
    </div>
  );
}

export function Eu25PageContent() {
  return (
    <PhotoThemeProvider>
      <PageContent />
    </PhotoThemeProvider>
  );
}
