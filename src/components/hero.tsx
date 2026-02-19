import type { Profile } from "@/src/data/profile";

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <header className="mx-auto w-full max-w-5xl space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
          {profile.name}
        </h1>
        <h2 className="text-xl font-normal text-zinc-700 sm:text-2xl">{profile.title}</h2>
      </div>
      <p className="mx-auto max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
        {profile.statement}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="#recent-projects"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          View Recent Projects
        </a>
        <a
          href={profile.links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          View CV
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          GitHub
        </a>
        <a
          href={`mailto:${profile.links.email}`}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          {profile.links.email}
        </a>
        <a
          href={`tel:${profile.links.phone.replace(/\s+/g, "")}`}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          {profile.links.phone}
        </a>
      </div>
    </header>
  );
}
