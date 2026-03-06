import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renzo Ventura | Europe 2025",
  description: "Photography by Renzo Ventura — Europe, 2025.",
};

export default function Eu25Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
