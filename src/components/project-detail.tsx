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
        <h1 className="text-2xl font-light tracking-tight text-stone-100 sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-base text-stone-500">{project.shortDescription}</p>

        <p className="mt-6 text-sm leading-relaxed text-stone-400 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded border border-stone-800 px-2 py-0.5 text-xs text-stone-500"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-2">
          {project.liveUrl && (
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center rounded bg-stone-100 px-4 py-2 text-xs font-medium text-stone-900 transition-colors duration-200 hover:bg-white"
            >
              Watch Demo
            </button>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded border border-stone-700 px-4 py-2 text-xs font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-stone-100"
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
