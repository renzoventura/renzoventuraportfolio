import Link from "next/link";

import type { Project } from "@/src/data/projects";

type ProjectTileProps = {
  project: Project;
};

export function ProjectTile({ project }: ProjectTileProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <article className="flex items-start justify-between gap-4 rounded-sm bg-stone-800/30 px-5 py-4 transition-colors duration-200 hover:bg-stone-800/50">
        <div className="min-w-0">
          <h3 className="text-sm font-light tracking-tight text-stone-200 sm:text-base">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">{project.shortDescription}</p>
        </div>
        <span className="mt-0.5 shrink-0 text-stone-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-stone-400">
          →
        </span>
      </article>
    </Link>
  );
}
