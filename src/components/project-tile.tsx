"use client";

import { useState } from "react";
import Link from "next/link";

import type { Project } from "@/src/data/projects";
import { ScreenshotFilmstrip } from "@/src/components/screenshot-filmstrip";
import { VideoModal } from "@/src/components/video-modal";

type ProjectTileProps = {
  project: Project;
};

export function ProjectTile({ project }: ProjectTileProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <article className="flex flex-col gap-3 rounded-sm bg-stone-700/30 px-5 py-4">
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

      <ul className="flex flex-wrap gap-1">
        {project.stack.map((item, i) => (
          <li
            key={item}
            className={`rounded border border-stone-700 px-1.5 py-0 text-[10px] text-stone-500 ${i >= 3 ? "hidden sm:flex" : ""}`}
          >
            {item}
          </li>
        ))}
        {project.stack.length > 3 && (
          <li className="rounded border border-stone-700 px-1.5 py-0 text-[10px] text-stone-500 sm:hidden">
            +{project.stack.length - 3}
          </li>
        )}
      </ul>

      <div className="flex gap-1.5">
        {project.liveUrl && (
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center rounded bg-stone-100 px-3 py-1 text-xs font-medium text-stone-900 transition-colors duration-200 hover:bg-white"
          >
            Watch Demo
          </button>
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

      {showVideo && project.liveUrl && (
        <VideoModal src={project.liveUrl} onClose={() => setShowVideo(false)} />
      )}
    </article>
  );
}
