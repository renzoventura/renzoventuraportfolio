type Props = {
  portfolioUrl: string;
};

export function PhotoNav({ portfolioUrl }: Props) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-[#f7f4f0]/90 px-6 py-5 backdrop-blur-sm sm:px-10">
      <div>
        <span className="text-sm font-medium uppercase tracking-widest text-stone-800">
          Renzo Ventura
        </span>
        <span className="ml-2 text-sm text-stone-400">/ Photography</span>
      </div>
      <a
        href={portfolioUrl}
        className="text-sm text-stone-400 transition-colors duration-200 hover:text-stone-800"
      >
        ← Portfolio
      </a>
    </nav>
  );
}
