import { HomeExperience } from "@/src/components/home-experience";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";

export default function Home() {
  return (
    <div className="bg-stone-50">
      <HomeExperience profile={profile} projects={projects} />
    </div>
  );
}
