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
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
            <Image
              src="/about/portrait.jpg"
              alt="Renzo Ventura"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <h1
            className={`mb-6 text-3xl font-light tracking-tight sm:text-4xl ${
              dark ? "text-stone-200" : "text-stone-900"
            }`}
          >
            Renzo Ventura
          </h1>
          <div
            className={`space-y-4 text-base font-light leading-relaxed ${
              dark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            <p>
              Add your bio here.
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
