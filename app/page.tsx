import { headers } from "next/headers";
import { AlbumPageContent } from "@/src/components/photo/album-page-content";
import { HomeExperience } from "@/src/components/home-experience";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  if (host === "photo.renzoventura.com") {
    return <AlbumPageContent />;
  }

  return (
    <div className="bg-[color:var(--background)]">
      <HomeExperience profile={profile} projects={projects} />
    </div>
  );
}
