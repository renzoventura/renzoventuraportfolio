import type { Metadata } from "next";
import { PortfolioAboutContent } from "@/src/components/portfolio-about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Renzo Ventura is a Senior Software Engineer at Tabcorp, specialising in building reliable, user-first digital products at scale.",
  openGraph: {
    title: "About | Renzo Ventura",
    description:
      "Senior Software Engineer at Tabcorp, leading the technical delivery and architecture of Australia's premier real-time mobile wagering platform.",
    url: "https://www.renzoventura.com/about",
  },
  twitter: {
    title: "About | Renzo Ventura",
    description:
      "Senior Software Engineer at Tabcorp, building reliable, user-first digital products at scale.",
  },
};

export default function AboutPage() {
  return <PortfolioAboutContent />;
}
