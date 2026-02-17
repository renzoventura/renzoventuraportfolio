import type { Profile } from "@/src/data/profile";

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <header className="space-y-6 border-b border-zinc-200 pb-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          {profile.name}
        </h1>
        <h2 className="text-lg font-normal text-zinc-700 sm:text-xl">{profile.title}</h2>
      </div>
      <p className="max-w-2xl text-base leading-7 text-zinc-600">{profile.statement}</p>
      <div className="flex flex-wrap gap-3">
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
      <div className="flex flex-wrap gap-3 pt-1">
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
        <a
          href={profile.links.photography}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          Photography
        </a>
      </div>
    </header>
  );
}
