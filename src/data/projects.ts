import { strideScreenshots } from "@/src/data/projects/stride";

export type Project = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  demoImageUrl?: string;
  screenshots?: string[];
  recent: boolean;
  featured: boolean;
  date: string;
};

export const projects: Project[] = [
  {
    id: "stride",
    title: "Stride",
    category: "iOS App",
    shortDescription: "Your performance is art. Stride is the brush.",
    description:
      "Transforms your Strava runs into premium, share-ready graphics. Overlay a live map of your route or a photo, add data-driven stickers, and export straight to Instagram.",
    stack: [
      "SwiftUI",
      "@Observable",
      "MapKit",
      "Strava API",
      "Interactive Photo Editor",
      "Gestures & Stickers",
      "async/await",
      "Keychain",
      "iOS 26+",
    ],
    githubUrl: "https://github.com/renzoventura/stride",
    liveUrl: "https://github.com/user-attachments/assets/33605762-77ba-4292-964b-517586f2a8a4",
    demoImageUrl: "/screenshots/stride/1.PNG",
    screenshots: strideScreenshots,
    recent: true,
    featured: true,
    date: "2026-02-17",
  },
];
