import { headers } from "next/headers";
import type { Metadata } from "next";
import { AlbumPageContent } from "@/src/components/photo/album-page-content";
import { HomeExperience } from "@/src/components/home-experience";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  if (host === "photo.renzoventura.com") {
    return {
      title: "Renzo Ventura | work",
      description: "Photography by Renzo Ventura.",
    };
  }
  return {};
}

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
