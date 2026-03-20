"use client";

import { useState } from "react";

import type { Project } from "@/src/data/projects";
import { ScreenshotFilmstrip } from "@/src/components/screenshot-filmstrip";
import { VideoModal } from "@/src/components/video-modal";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <div className="max-w-2xl">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-light tracking-tight text-stone-200 sm:text-4xl">
            {project.title}
          </h1>
          <span className="text-sm text-stone-600 sm:text-base">{project.category}</span>
        </div>

        {project.shortDescription && (
          <p className="mt-1 text-sm italic text-stone-600 sm:text-base">"{project.shortDescription}"</p>
        )}

        <p className="mt-1 text-sm leading-relaxed text-stone-500 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded border border-stone-700 px-1.5 py-0 text-[10px] text-stone-500"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-1.5">
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
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className="mt-2">
          <ScreenshotFilmstrip screenshots={project.screenshots} projectTitle={project.title} />
        </div>
      )}

      {showVideo && project.liveUrl && (
        <VideoModal src={project.liveUrl} onClose={() => setShowVideo(false)} />
      )}
    </div>
  );
}
