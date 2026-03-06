import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { HomeExperience } from "@/src/components/home-experience";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  if (host === "photo.renzoventura.com") {
    redirect("/photo");
  }

  return (
    <div className="bg-[color:var(--background)]">
      <HomeExperience profile={profile} projects={projects} />
    </div>
  );
}
