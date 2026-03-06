"use client";

import Image from "next/image";

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
      <PhotoNav />

      <main className="flex min-h-screen flex-col px-6 pt-28 pb-24 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:pt-0">
        <div className="w-full shrink-0 lg:w-[420px]">
          <Image
            src="/about/portrait.JPG"
            alt="Renzo Ventura"
            width={1741}
            height={2150}
            className="w-full rounded-sm"
            sizes="(max-width: 1024px) 100vw, 420px"
            priority
          />
        </div>

        <div className="mt-10 lg:mt-0">
          <h1
            className={`mb-6 text-3xl font-light tracking-tight sm:text-4xl ${
              dark ? "text-stone-200" : "text-stone-900"
            }`}
          >
            About
          </h1>
          <div
            className={`space-y-4 text-base font-light leading-relaxed ${
              dark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            <p>
              Renzo Ventura is a photographer based in Melbourne, Australia. His work is drawn to landscape, travel, and the rhythms of everyday life. This site exists in place of social media, a quieter home for his work.
            </p>
            <p>
              <a
                href="mailto:renzoventura96@gmail.com"
                className={`transition-colors duration-200 ${
                  dark ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700"
                }`}
              >
                renzoventura96@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export function PhotoAboutContent() {
  return (
    <PhotoThemeProvider>
      <PageContent />
    </PhotoThemeProvider>
  );
}
