"use client";

import Image from "next/image";
import { useState } from "react";

import type { Project } from "@/src/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="group">
      {project.demoImageUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
          <div
            className={`relative w-full transition-colors duration-500 ${
              !loaded ? "animate-pulse bg-stone-800" : ""
            }`}
            style={{ aspectRatio: "473 / 1024" }}
          >
            <Image
              src={project.demoImageUrl}
              alt={`${project.title} screenshot`}
              width={473}
              height={1024}
              className={`h-auto w-full transition-opacity duration-700 ease-in-out group-hover:opacity-85 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </a>
      ) : null}

      <div className="mt-2 px-0.5">
        <p className="text-xs tracking-wide text-stone-400">{project.title}</p>
        <p className="mt-0.5 text-xs text-stone-600">{project.shortDescription}</p>
        <div className="mt-2 flex gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-600 transition-colors duration-200 hover:text-stone-400"
          >
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-600 transition-colors duration-200 hover:text-stone-400"
          >
            Demo
          </a>
        </div>
      </div>
    </article>
  );
}
