import { ProjectCard } from "@/src/components/project-card";
import type { Project } from "@/src/data/projects";

type FeaturedProjectsProps = {
  projects: Project[];
};

function sortByDateDesc(items: Project[]): Project[] {
  return [...items].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = sortByDateDesc(projects).filter(
    (project) => project.featured && !project.recent,
  );

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section id="featured-projects" className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Featured Projects</h2>
        <p className="text-sm text-zinc-600">Selected builds beyond the most recent releases.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
