"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePhotoTheme } from "./photo-theme-provider";

export function PhotoNav() {
  const { theme, toggle } = usePhotoTheme();
  const dark = theme === "dark";
  const pathname = usePathname();
  const isAbout = pathname === "/photo/about";

  const linkClass = (active: boolean) =>
    `text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
      active
        ? dark ? "text-stone-100" : "text-stone-900"
        : dark ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-600"
    }`;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 backdrop-blur-sm transition-colors duration-300 sm:px-10 ${
        dark ? "bg-[#1c1917]/90" : "bg-[#f7f4f0]/90"
      }`}
    >
      <div className="flex items-center gap-6">
        <Link href="/photo" className={linkClass(!isAbout)}>Work</Link>
        <Link href="/photo/about" className={linkClass(isAbout)}>About</Link>
      </div>

      <button
        onClick={toggle}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className={`transition-colors duration-200 ${
          dark ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700"
        }`}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
