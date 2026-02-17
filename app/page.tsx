import { Hero } from "@/src/components/hero";
import { RecentProjects } from "@/src/components/recent-projects";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";

export default function Home() {
  return (
    <div className="bg-stone-50">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 md:gap-16 md:px-10 md:py-16">
        <Hero profile={profile} />
        <RecentProjects projects={projects} />
      </main>
    </div>
  );
}
