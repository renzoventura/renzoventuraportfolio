import type { Metadata } from "next";
import { ScrollReset } from "@/src/components/photo/scroll-reset";

export const metadata: Metadata = {
  metadataBase: new URL("https://photo.renzoventura.com"),
  icons: {
    icon: "/photo-icon.png",
    apple: "/photo-apple-icon.png",
  },
  title: {
    absolute: "Renzo Ventura | work",
    template: "%s | Renzo Ventura",
  },
  description: "Photography by Renzo Ventura.",
  openGraph: {
    title: "Renzo Ventura | work",
    description: "Photography by Renzo Ventura.",
    url: "https://photo.renzoventura.com",
    siteName: "Renzo Ventura",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/japan23/THUMBNAIL.JPEG",
        width: 4410,
        height: 5450,
        alt: "Renzo Ventura Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renzo Ventura | work",
    description: "Photography by Renzo Ventura.",
    images: ["/japan23/THUMBNAIL.JPEG"],
  },
};

export default function PhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollReset />
      {children}
    </>
  );
}
