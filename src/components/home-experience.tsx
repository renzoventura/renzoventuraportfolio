"use client";

import { useEffect, useRef, useState } from "react";

import { Hero } from "@/src/components/hero";
import { RecentProjects } from "@/src/components/recent-projects";
import type { Profile } from "@/src/data/profile";
import type { Project } from "@/src/data/projects";

type HomeExperienceProps = {
  profile: Profile;
  projects: Project[];
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function HomeExperience({ profile, projects }: HomeExperienceProps) {
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const [heroProgress, setHeroProgress] = useState(0);
  const [projectsInView, setProjectsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp(window.scrollY / viewportHeight, 0, 1);
      setHeroProgress(progress);
      scrollFrameRef.current = null;
    };

    const onScroll = () => {
      if (scrollFrameRef.current !== null) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const section = projectsSectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProjectsInView(entry.isIntersecting);
      },
      { threshold: 0.55 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const heroOpacity = prefersReducedMotion ? 1 : 1 - heroProgress * 0.35;
  const heroScale = prefersReducedMotion ? 1 : 1 - heroProgress * 0.015;
  const projectsOpacity = prefersReducedMotion
    ? 1
    : clamp(0.72 + heroProgress * 0.45 + (projectsInView ? 0.05 : 0), 0, 1);
  const projectsTranslateY = prefersReducedMotion ? 0 : Math.max(0, 28 - heroProgress * 28);
  const indicatorOpacity = prefersReducedMotion ? 1 : clamp(1 - heroProgress * 4, 0, 1);

  const handleScrollToProjects = () => {
    const projectsSection = projectsSectionRef.current;

    if (!projectsSection) {
      return;
    }

    projectsSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <section className="relative flex min-h-screen snap-start items-center justify-center">
        <div
          style={{ opacity: heroOpacity, transform: `scale(${heroScale})` }}
          className="w-full transition-[opacity,transform] duration-300 ease-out"
        >
          <Hero profile={profile} />
        </div>

        <button
          type="button"
          onClick={handleScrollToProjects}
          aria-label="Scroll to projects section"
          style={{ opacity: indicatorOpacity }}
          className="group absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 transition-opacity duration-300"
        >
          <span className="scroll-indicator-chevron block h-6 w-6 border-b-2 border-r-2 border-zinc-400" />
        </button>
      </section>

      <section
        id="recent-projects"
        ref={projectsSectionRef}
        className="flex min-h-screen snap-start items-center py-20"
      >
        <div
          style={{ opacity: projectsOpacity, transform: `translateY(${projectsTranslateY}px)` }}
          className="w-full transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <RecentProjects projects={projects} />
        </div>
      </section>
    </main>
  );
}
