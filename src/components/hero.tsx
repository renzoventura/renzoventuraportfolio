import Image from "next/image";

import type { Profile } from "@/src/data/profile";
import profilePhoto from "@/assets/profile_photo_optimized.jpg";

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <header className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-5xl flex-col justify-center space-y-6 px-1 text-center sm:min-h-0 sm:space-y-8 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_28px_rgba(4,9,16,0.34)] sm:h-40 sm:w-40">
          <Image
            src={profilePhoto}
            alt="Portrait of Renzo Ventura"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.035em] text-[color:var(--foreground)]">
          {profile.name}
        </h1>
        <h2 className="text-[clamp(1.05rem,2.8vw,1.5rem)] font-normal tracking-[-0.012em] text-[color:var(--muted-foreground)]">
          {profile.title}
        </h2>
      </div>
      <p className="mx-auto max-w-[32ch] text-base leading-7 text-[color:var(--muted-foreground)] sm:max-w-3xl sm:text-lg">
        {profile.statement}
      </p>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
        <a
          href="#recent-projects"
          className="inline-flex min-h-11 min-w-[12rem] items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--accent-start)] to-[color:var(--accent-end)] px-8 py-2.5 text-sm font-medium text-slate-950 transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          View Recent Projects
        </a>
        <a
          href={profile.links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 min-w-[12rem] items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-8 py-2.5 text-sm font-medium text-[color:var(--foreground)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)] hover:text-white"
        >
          View CV
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)] hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)] hover:text-white"
        >
          GitHub
        </a>
        <a
          href={`mailto:${profile.links.email}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)] hover:text-white"
        >
          {profile.links.email}
        </a>
        <a
          href={`tel:${profile.links.phone.replace(/\s+/g, "")}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)] hover:text-white"
        >
          {profile.links.phone}
        </a>
      </div>
    </header>
  );
}
