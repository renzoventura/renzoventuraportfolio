import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renzo Ventura | Daylesford 2025",
  description: "Photography by Renzo Ventura — Daylesford, 2025.",
};

export default function DaylesfordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
