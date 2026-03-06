"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePhotoTheme } from "./photo-theme-provider";

export function PhotoNav() {
  const { theme } = usePhotoTheme();
  const dark = theme === "dark";
  const pathname = usePathname();
  const isAbout = pathname === "/photo/about";

  const linkClass = (active: boolean) =>
    `text-base font-light tracking-tight transition-colors duration-300 ${
      active
        ? dark ? "text-stone-100" : "text-stone-900"
        : dark ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-600"
    }`;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center px-6 py-5 backdrop-blur-sm transition-colors duration-300 sm:px-10 ${
        dark ? "bg-[#1c1917]/90" : "bg-[#f7f4f0]/90"
      }`}
    >
      <div className="flex items-center gap-6">
        <Link href="/photo" className={linkClass(!isAbout)}>work</Link>
        <Link href="/photo/about" className={linkClass(isAbout)}>about</Link>
      </div>
    </nav>
  );
}
