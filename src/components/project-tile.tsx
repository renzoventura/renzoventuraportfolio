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
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-light tracking-tight text-stone-200 sm:text-base">
              {project.title}
            </h3>
            <span className="text-xs text-stone-600">{project.category}</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-stone-500 sm:text-sm">{project.description}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded border border-stone-800 px-2 py-0.5 text-xs text-stone-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <span className="mt-0.5 shrink-0 text-stone-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-stone-400">
          →
        </span>
      </article>
    </Link>
  );
}
