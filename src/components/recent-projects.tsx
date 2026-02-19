import { ProjectCard } from "@/src/components/project-card";
import type { Project } from "@/src/data/projects";

type RecentProjectsProps = {
  projects: Project[];
};

function sortByDateDesc(items: Project[]): Project[] {
  return [...items].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const recentProjects = sortByDateDesc(projects).filter((project) => project.recent).slice(0, 4);

  return (
    <section className="space-y-7 sm:space-y-6">
      <div className="space-y-2 sm:space-y-1">
        <h2 className="text-[clamp(1.6rem,5vw,2rem)] font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
          Recent Projects
        </h2>
        <p className="max-w-[34ch] text-sm leading-6 text-[color:var(--muted-foreground)]">
          Latest work, shipped recently.
        </p>
      </div>

      <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
          {recentProjects.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard project={project} />
            </div>
          ))}
      </div>
    </section>
  );
}
