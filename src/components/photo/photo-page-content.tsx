"use client";

import { PhotoGallery } from "./photo-gallery";
import { PhotoNav } from "./photo-nav";
import { PhotoThemeProvider, usePhotoTheme } from "./photo-theme-provider";

function PageContent() {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark ? "bg-[#1c1917]" : "bg-[#f7f4f0]"
      }`}
    >
      <PhotoNav portfolioUrl="https://www.renzoventura.com" />

      <header className="px-6 pb-12 pt-32 sm:px-10 lg:px-16">
        <p
          className={`mb-3 text-xs uppercase tracking-[0.3em] transition-colors duration-300 ${
            dark ? "text-stone-500" : "text-stone-400"
          }`}
        >
          Photography
        </p>
        <h1
          className={`text-4xl font-light tracking-tight transition-colors duration-300 sm:text-5xl ${
            dark ? "text-stone-200" : "text-stone-900"
          }`}
        >
          Renzo Ventura
        </h1>
      </header>

      <main className="px-6 pb-24 sm:px-10 lg:px-16">
        <PhotoGallery />
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

export function PhotoPageContent() {
  return (
    <PhotoThemeProvider>
      <PageContent />
    </PhotoThemeProvider>
  );
}
