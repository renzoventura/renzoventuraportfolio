"use client";

import Image from "next/image";

import { PhotoNav } from "./photo-nav";
import { PhotoThemeProvider, usePhotoTheme } from "./photo-theme-provider";

function PageContent() {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 ${
        dark ? "bg-[#1c1917]" : "bg-[#f7f4f0]"
      }`}
    >
      <PhotoNav />

      <header className="px-6 pb-12 pt-32 sm:px-10 lg:px-16">
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
            | about
          </span>
        </h1>
      </header>

      <main className="flex-1 px-6 pb-24 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="w-full shrink-0 lg:w-1/3">
            <Image
              src="/about/portrait.JPG"
              alt="Renzo Ventura"
              width={1741}
              height={2150}
              className="w-full"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>

          <div className={`space-y-6 text-xl font-normal leading-relaxed ${
            dark ? "text-stone-400" : "text-stone-600"
          }`}>
            <p>Renzo Ventura is a photographer based in Melbourne, Australia.</p>
            <p>His work is drawn to landscape, travel, and the rhythms of everyday life.</p>
            <p>This site exists in place of social media, a quieter home for his work.</p>
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

export function PhotoAboutContent() {
  return (
    <PhotoThemeProvider>
      <PageContent />
    </PhotoThemeProvider>
  );
}
