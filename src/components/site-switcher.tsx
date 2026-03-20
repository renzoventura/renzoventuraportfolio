"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type SiteSwitcherProps = {
  active: "code" | "photos";
  dark?: boolean;
};

export function SiteSwitcher({ active, dark = true }: SiteSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const otherLabel = active === "code" ? "FILM" : "CODE";

  // When on the photo subdomain, "/" stays on the photo site — use an absolute URL to cross back to the portfolio.
  const otherHref =
    active === "code"
      ? "/photo"
      : typeof window !== "undefined" && window.location.hostname === "photo.localhost"
        ? `${window.location.protocol}//localhost:${window.location.port}`
        : "https://www.renzoventura.com";

  const labelClass = `text-xs sm:text-sm font-light tracking-widest transition-colors duration-300 cursor-pointer select-none ${
    dark ? "text-stone-100 hover:text-stone-300" : "text-stone-900 hover:text-stone-600"
  }`;
  const chevronClass = `transition-transform duration-200 ${open ? "rotate-180" : ""} ${
    dark ? "text-stone-500" : "text-stone-400"
  }`;
  const dropdownClass = `absolute right-0 top-full mt-2 min-w-[80px] rounded-sm py-1 text-xs font-light tracking-widest ${
    dark ? "bg-[#2a2522] text-stone-400 hover:text-stone-200" : "bg-[#ece9e4] text-stone-500 hover:text-stone-700"
  }`;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-14 items-center gap-1 ${labelClass}`}
      >
        {active === "code" ? "CODE" : "FILM"}
        <svg
          className={chevronClass}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className={dropdownClass}>
          <a
            href={otherHref}
            className={`block px-4 py-1.5 transition-colors duration-200 ${
              dark ? "hover:text-stone-200" : "hover:text-stone-700"
            }`}
            onClick={() => setOpen(false)}
          >
            {otherLabel}
          </a>
        </div>
      )}
    </div>
  );
}
