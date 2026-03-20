import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProjectDetail } from "@/src/components/project-detail";
import { PortfolioNav } from "@/src/components/portfolio-nav";
import { projects } from "@/src/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return { title: project.title, description: project.shortDescription };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#1c1917]">
      <PortfolioNav />
      <main className="px-6 pb-16 pt-24 sm:px-10 sm:pt-32 lg:px-16">
        <ProjectDetail project={project} />
      </main>
    </div>
  );
}
