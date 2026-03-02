import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://photo.renzoventura.com"),
  title: {
    default: "Renzo Ventura | Photography",
    template: "%s | Renzo Ventura Photography",
  },
  description:
    "Photography by Renzo Ventura — street, landscape, and travel photography.",
  openGraph: {
    title: "Renzo Ventura | Photography",
    description:
      "Photography by Renzo Ventura — street, landscape, and travel photography.",
    url: "https://photo.renzoventura.com",
    siteName: "Renzo Ventura Photography",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Renzo Ventura | Photography",
    description:
      "Photography by Renzo Ventura — street, landscape, and travel photography.",
  },
};

export default function PhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
