import type { Project } from "@/src/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-elevated)] p-5 shadow-[var(--shadow-soft)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--foreground)]">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-[color:var(--muted-foreground)]">
            {project.shortDescription}
          </p>
        </div>
        <span className="shrink-0 text-xs text-[color:var(--muted-foreground)]">{project.date}</span>
      </div>

      <p className="mb-4 text-sm leading-6 text-[color:var(--muted-foreground)]">{project.description}</p>

      <ul className="mb-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={`${project.id}-${item}`}
            className="rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-2.5 py-1 text-xs text-[color:var(--muted-foreground)]"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.demoVideoUrl ? (
        <div className="mb-5 overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]">
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
          className="rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-3 py-1.5 text-[color:var(--foreground)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent-start)] hover:text-white"
        >
          GitHub
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gradient-to-r from-[color:var(--accent-start)] to-[color:var(--accent-end)] px-3 py-1.5 text-sm font-semibold text-slate-950 transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          {project.demoVideoUrl === project.liveUrl ? "Open Video" : "Live Demo"}
        </a>
      </div>
    </article>
  );
}
