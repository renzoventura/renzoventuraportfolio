import { ProjectTile } from "@/src/components/project-tile";
import type { Project } from "@/src/data/projects";

type RecentProjectsProps = {
  projects: Project[];
};

function sortByDateDesc(items: Project[]): Project[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const recentProjects = sortByDateDesc(projects).filter((p) => p.recent).slice(0, 8);

  return (
    <section>
      <div className="flex flex-col gap-2">
        {recentProjects.map((project) => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
