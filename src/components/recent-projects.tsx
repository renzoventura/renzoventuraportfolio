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
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Recent Projects</h2>
        <p className="text-sm text-zinc-600">Latest work, shipped recently.</p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
        <div className="flex snap-x gap-4 md:grid md:grid-cols-2">
          {recentProjects.map((project) => (
            <div key={project.id} className="w-[85%] shrink-0 snap-start md:w-auto">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
