import type { Profile } from "@/src/data/profile";

type AboutSectionProps = {
  profile: Profile;
};

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">About</h2>
        <p className="text-sm text-zinc-600">What I focus on and how I build.</p>
      </div>

      <p className="max-w-3xl text-base leading-7 text-zinc-700">{profile.about}</p>

      <ul className="flex flex-wrap gap-2">
        {profile.focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700"
          >
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}
