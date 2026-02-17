import type { Profile } from "@/src/data/profile";

type LinksSectionProps = {
  profile: Profile;
};

export function LinksSection({ profile }: LinksSectionProps) {
  return (
    <section id="links" className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Links</h2>
        <p className="text-sm text-zinc-600">Connect, explore my work, or download my CV.</p>
      </div>

      <div className="flex flex-wrap gap-3">
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
          href={profile.links.cv}
          download
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Download CV
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
    </section>
  );
}
