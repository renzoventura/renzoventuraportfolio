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
    <section>
      <h2 className="mb-6 text-2xl font-light tracking-tight text-stone-200 sm:text-3xl">Recent work</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
