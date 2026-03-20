"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SiteSwitcher } from "@/src/components/site-switcher";

export function PortfolioNav() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  const linkClass = (active: boolean) =>
    `text-sm sm:text-lg font-light tracking-tight transition-colors duration-300 ${
      active ? "text-stone-100" : "text-stone-500 hover:text-stone-300"
    }`;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-[#1c1917]/90 px-6 py-5 backdrop-blur-sm sm:px-10">
      <div>
        <Link
          href="/"
          className={`text-sm sm:text-lg font-light tracking-tight text-stone-500 transition-colors duration-300 hover:text-stone-300 ${isAbout ? "visible" : "invisible pointer-events-none"}`}
        >
          ← back
        </Link>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className={linkClass(!isAbout)}>
            work
          </Link>
          <Link href="/about" className={linkClass(isAbout)}>
            about
          </Link>
        </div>
        <SiteSwitcher active="code" dark />
      </div>
    </nav>
  );
}
