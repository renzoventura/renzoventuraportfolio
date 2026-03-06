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
    <article className="flex flex-col gap-3">
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-light tracking-tight text-stone-100">{project.title}</h3>
          <p className="mt-0.5 text-sm text-stone-500">{project.shortDescription}</p>
        </div>

        <p className="text-sm leading-relaxed text-stone-400">{project.description}</p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={`${project.id}-${item}`}
              className="rounded border border-stone-800 px-2 py-0.5 text-xs text-stone-600"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-900 transition-colors duration-200 hover:bg-white"
          >
            Watch Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded border border-stone-700 px-3 py-1.5 text-xs font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-stone-100"
          >
            GitHub
          </a>
        </div>
      </div>

      {project.demoImageUrl ? (
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
            className={`h-auto w-full transition-opacity duration-700 ease-in-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setLoaded(true)}
          />
        </div>
      ) : null}
    </article>
  );
}
