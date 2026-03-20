import Link from "next/link";

import type { Project } from "@/src/data/projects";
import { ScreenshotFilmstrip } from "@/src/components/screenshot-filmstrip";

type ProjectTileProps = {
  project: Project;
};

export function ProjectTile({ project }: ProjectTileProps) {
  return (
    <article className="flex flex-col gap-3 rounded-sm bg-stone-800/30 px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-light tracking-tight text-stone-200 sm:text-base">
              {project.title}
            </h3>
            <span className="text-xs text-stone-600">{project.category}</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-stone-500 sm:text-sm">{project.description}</p>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="mt-0.5 shrink-0 text-stone-600 transition-all duration-200 hover:translate-x-0.5 hover:text-stone-400"
          aria-label={`View ${project.title} details`}
        >
          →
        </Link>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((item) => (
          <li
            key={item}
            className="rounded border border-stone-800 px-2 py-0.5 text-xs text-stone-600"
          >
            {item}
          </li>
        ))}
        {project.stack.length > 3 && (
          <li className="rounded border border-stone-800 px-2 py-0.5 text-xs text-stone-600">
            +{project.stack.length - 3}
          </li>
        )}
      </ul>

      <div className="flex gap-1.5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded bg-stone-100 px-3 py-1 text-xs font-medium text-stone-900 transition-colors duration-200 hover:bg-white"
          >
            Watch Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded border border-stone-700 px-3 py-1 text-xs font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-stone-100"
          >
            GitHub
          </a>
        )}
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <ScreenshotFilmstrip screenshots={project.screenshots} projectTitle={project.title} embedded />
      )}
    </article>
  );
}
