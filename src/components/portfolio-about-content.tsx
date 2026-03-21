"use client";

import Image from "next/image";
import { useState } from "react";

import profilePhoto from "@/assets/profile_photo_optimized.jpg";
import { profile } from "@/src/data/profile";
import { PortfolioNav } from "./portfolio-nav";

export function PortfolioAboutContent() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#1c1917]">
      <PortfolioNav />

      <header className="px-6 pb-4 pt-[59px] sm:pb-8 sm:pt-32 sm:px-10 lg:px-16">
        <h1 className="text-2xl font-light tracking-tight text-stone-200 sm:text-5xl">
          Renzo Ventura{" "}
          <span className="text-stone-500">| about</span>
        </h1>
      </header>

      <main className="flex-1 px-6 pb-24 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div
            className={`relative w-full shrink-0 transition-colors duration-500 lg:w-1/3 ${
              !loaded ? "animate-pulse bg-stone-800" : ""
            }`}
            style={{ aspectRatio: `${profilePhoto.width} / ${profilePhoto.height}` }}
          >
            <Image
              src={profilePhoto}
              alt="Renzo Ventura"
              priority
              className={`h-auto w-full transition-opacity duration-700 ease-in-out ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 33vw"
              onLoad={() => setLoaded(true)}
            />
          </div>

          <div className="max-w-[63ch] text-sm font-light leading-relaxed text-stone-400 sm:text-xl sm:font-normal">
            <p className="mb-8">Renzo Ventura is a Senior Software Engineer at Tabcorp, specialising in building reliable, user-first digital products at scale. Operating within a heavily regulated environment, delivering enterprise-grade systems for Australia's premier real-time mobile wagering platform.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 transition-colors duration-200 hover:text-stone-300"
              >
                LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 transition-colors duration-200 hover:text-stone-300"
              >
                GitHub
              </a>
              <a
                href={`mailto:${profile.links.email}`}
                className="text-stone-500 transition-colors duration-200 hover:text-stone-300"
              >
                {profile.links.email}
              </a>
              <a
                href={profile.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 transition-colors duration-200 hover:text-stone-300"
              >
                CV
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-12 sm:px-10 lg:px-16">
        <p className="text-xs text-stone-600">
          © {new Date().getFullYear()} Renzo Ventura
        </p>
      </footer>
    </div>
  );
}
