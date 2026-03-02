import { PhotoGallery } from "@/src/components/photo/photo-gallery";
import { PhotoNav } from "@/src/components/photo/photo-nav";

export default function PhotoPage() {
  return (
    <div className="min-h-screen bg-[#f7f4f0]">
      <PhotoNav portfolioUrl="https://www.renzoventura.com" />

      <header className="px-6 pb-12 pt-32 sm:px-10 lg:px-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-400">
          Photography
        </p>
        <h1 className="text-4xl font-light tracking-tight text-stone-900 sm:text-5xl">
          Renzo Ventura
        </h1>
      </header>

      <main className="px-6 pb-24 sm:px-10 lg:px-16">
        <PhotoGallery />
      </main>

      <footer className="px-6 pb-12 sm:px-10 lg:px-16">
        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} Renzo Ventura
        </p>
      </footer>
    </div>
  );
}
