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
    default: "Renzo Ventura | Senior Software Engineer @ Tabcorp",
    template: "%s | Renzo Ventura",
  },
  description:
    "Renzo Ventura - Senior Software Engineer @ Tabcorp. Building high-performance mobile systems and AI-powered products.",
  openGraph: {
    title: "Renzo Ventura | Senior Software Engineer @ Tabcorp",
    description:
      "Senior Software Engineer @ Tabcorp. Portfolio featuring high-performance mobile and AI product work.",
    url: "https://www.renzoventura.com",
    siteName: "Renzo Ventura Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/renzo-ventura-preview.jpg",
        width: 663,
        height: 800,
        alt: "Renzo Ventura - Senior Software Engineer @ Tabcorp",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Renzo Ventura | Senior Software Engineer @ Tabcorp",
    description:
      "Senior Software Engineer @ Tabcorp. High-performance mobile systems and AI product work.",
    images: ["/og/renzo-ventura-preview.jpg"],
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
