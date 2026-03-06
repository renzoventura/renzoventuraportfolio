import { RecentProjects } from "@/src/components/recent-projects";
import { PortfolioNav } from "@/src/components/portfolio-nav";
import type { Profile } from "@/src/data/profile";
import type { Project } from "@/src/data/projects";

type HomeExperienceProps = {
  profile: Profile;
  projects: Project[];
};

export function HomeExperience({ profile, projects }: HomeExperienceProps) {
  return (
    <div className="min-h-screen bg-[#1c1917]">
      <PortfolioNav />

      <header className="px-6 pb-4 pt-[59px] sm:pb-8 sm:pt-32 sm:px-10 lg:px-16">
        <h1 className="text-2xl font-light tracking-tight text-stone-200 sm:text-5xl">
          Renzo Ventura{" "}
          <span className="text-stone-500">| Senior Software Engineer @ Tabcorp</span>
        </h1>
      </header>

      <main className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 text-sm sm:mb-16">
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

        <RecentProjects projects={projects} />
      </main>

      <footer className="px-6 pb-12 sm:px-10 lg:px-16">
        <p className="text-xs text-stone-600">
          © {new Date().getFullYear()} Renzo Ventura
        </p>
      </footer>
    </div>
  );
}
