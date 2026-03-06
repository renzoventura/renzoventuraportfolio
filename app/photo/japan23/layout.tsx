import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renzo Ventura | Japan 2023",
  description: "Photography by Renzo Ventura — Japan, 2023.",
};

export default function Japan23Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
