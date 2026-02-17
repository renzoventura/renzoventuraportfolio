import type { Project } from "@/src/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-zinc-300">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900">{project.title}</h3>
          <p className="text-sm font-medium text-zinc-700">{project.shortDescription}</p>
        </div>
        <span className="shrink-0 text-xs text-zinc-500">{project.date}</span>
      </div>

      <p className="mb-4 text-sm leading-6 text-zinc-500">{project.description}</p>

      <ul className="mb-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={`${project.id}-${item}`}
            className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.demoVideoUrl ? (
        <div className="mb-5 overflow-hidden rounded-xl border border-zinc-200">
          <video
            controls
            preload="metadata"
            playsInline
            className="h-auto w-full"
            aria-label={`${project.title} demo video`}
          >
            <source src={project.demoVideoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-3 text-sm font-medium">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100"
        >
          GitHub
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-white transition-colors hover:bg-zinc-700"
        >
          {project.demoVideoUrl === project.liveUrl ? "Open Video" : "Live Demo"}
        </a>
      </div>
    </article>
  );
}
