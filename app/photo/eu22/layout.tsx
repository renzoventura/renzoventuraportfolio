import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renzo Ventura | Europe 2022",
  description: "Photography by Renzo Ventura — Europe, 2022.",
};

export default function Eu22Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
