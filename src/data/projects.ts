export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  demoImageUrl?: string;
  recent: boolean;
  featured: boolean;
  date: string;
};

export const projects: Project[] = [
  {
    id: "lastk",
    title: "LastK",
    shortDescription: "Your performance is art. LastK is the brush.",
    description:
      "iOS app that transforms Strava run data into premium, share-ready graphics: choose a run, add data-driven stickers, overlay on a photo, and export to Instagram or your camera roll.",
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
    githubUrl: "https://github.com/renzoventura/lastk",
    liveUrl: "https://github.com/user-attachments/assets/0beaf45c-fbfe-4d19-985d-9008ee2cae51",
    demoImageUrl: "/projects/lastk_screenshot.jpg",
    recent: true,
    featured: true,
    date: "2026-02-17",
  },
];
