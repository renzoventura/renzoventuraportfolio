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
    default: "Renzo Ventura | Software Engineer",
    template: "%s | Renzo Ventura",
  },
  description:
    "Software engineer portfolio of Renzo Ventura, featuring recent AI tools, SaaS products, and mobile builds.",
  openGraph: {
    title: "Renzo Ventura | Software Engineer",
    description:
      "Minimal portfolio showcasing AI, SaaS, and mobile projects built by Renzo Ventura.",
    url: "https://www.renzoventura.com",
    siteName: "Renzo Ventura Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renzo Ventura | Software Engineer",
    description:
      "Software engineer portfolio featuring recent projects in AI tools, SaaS, and mobile.",
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
