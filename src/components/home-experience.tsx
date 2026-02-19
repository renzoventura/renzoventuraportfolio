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
  const [isMobileViewport, setIsMobileViewport] = useState(false);

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
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
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

  const heroFadeFactor = isMobileViewport ? 0.2 : 0.35;
  const heroScaleFactor = isMobileViewport ? 0.008 : 0.015;
  const projectLiftOffset = isMobileViewport ? 16 : 28;

  const heroOpacity = prefersReducedMotion ? 1 : 1 - heroProgress * heroFadeFactor;
  const heroScale = prefersReducedMotion ? 1 : 1 - heroProgress * heroScaleFactor;
  const projectsOpacity = prefersReducedMotion
    ? 1
    : clamp(0.72 + heroProgress * 0.45 + (projectsInView ? 0.05 : 0), 0, 1);
  const projectsTranslateY = prefersReducedMotion
    ? 0
    : Math.max(0, projectLiftOffset - heroProgress * projectLiftOffset);
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
    <main className="mx-auto w-full max-w-6xl px-3 sm:px-6 md:px-10">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pb-8 pt-[calc(env(safe-area-inset-top)+1rem)] sm:py-0">
        <div
          aria-hidden="true"
          className="hero-radial-glow pointer-events-none absolute inset-0 -z-10"
        />
        <div aria-hidden="true" className="hero-noise pointer-events-none absolute inset-0 -z-10" />
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
          className="group absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full p-2 transition-opacity duration-200 sm:bottom-8 sm:duration-300"
        >
          <span className="scroll-indicator-chevron block h-5 w-5 border-b-2 border-r-2 border-[color:var(--muted-foreground)] sm:h-6 sm:w-6" />
        </button>
      </section>

      <section
        id="recent-projects"
        ref={projectsSectionRef}
        className="my-6 flex items-center rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-3 py-14 shadow-[var(--shadow-soft)] sm:my-8 sm:px-6 sm:py-20 md:px-8"
      >
        <div
          style={{ opacity: projectsOpacity, transform: `translateY(${projectsTranslateY}px)` }}
          className="w-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:duration-500"
        >
          <RecentProjects projects={projects} />
        </div>
      </section>
    </main>
  );
}
