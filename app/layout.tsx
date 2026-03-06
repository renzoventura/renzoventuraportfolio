import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.renzoventura.com"),
  title: {
    default: "Renzo Ventura | Senior Software Engineer",
    template: "%s | Renzo Ventura",
  },
  description:
    "Renzo Ventura is a Senior Software Engineer at Tabcorp, specialising in building reliable, user-first digital products at scale.",
  openGraph: {
    title: "Renzo Ventura | Senior Software Engineer",
    description:
      "Senior Software Engineer at Tabcorp, leading the technical delivery and architecture of Australia's premier real-time mobile wagering platform.",
    url: "https://www.renzoventura.com",
    siteName: "Renzo Ventura",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/og-main.jpg",
        width: 2408,
        height: 1094,
        alt: "Renzo Ventura - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renzo Ventura | Senior Software Engineer",
    description:
      "Senior Software Engineer at Tabcorp, building reliable, user-first digital products at scale.",
    images: ["/og/og-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
