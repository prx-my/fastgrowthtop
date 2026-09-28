"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";
import { ProjectExperienceModal } from "@/components/sections/ProjectExperienceModal";

export function RecentWork() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

  const totalProjects = projectsData.length;
  const currentProject = projectsData[activeProjectIndex];
  const pages = currentProject.pages || [
    { title: "Home", image: currentProject.desktopImage, label: "Overview" },
  ];
  const totalPages = pages.length;
  const currentPage = pages[activePageIndex] || pages[0];

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Navigate Projects
  const handlePrevProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
    setActivePageIndex(0);
  }, [totalProjects]);

  const handleNextProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
    setActivePageIndex(0);
  }, [totalProjects]);

  // Navigate Pages within current project
  const handlePrevPage = useCallback(() => {
    setActivePageIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const handleNextPage = useCallback(() => {
    setActivePageIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input or textarea is active or modal is open
      if (isModalOpen) return;
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      if (e.key === "ArrowLeft") {
        handlePrevProject();
      } else if (e.key === "ArrowRight") {
        handleNextProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevProject, handleNextProject, isModalOpen]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only swipe if horizontal movement is dominant and > 45px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handlePrevProject();
      } else {
        handleNextProject();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const isExternalLive = currentProject.liveUrl && currentProject.liveUrl.startsWith("http");

  return (
    <section
      id="work"
      className="relative w-full bg-[#0B1118] text-[#F2EEE6] py-16 sm:py-24 lg:py-32 select-none overflow-hidden"
      aria-label="Works showcase"
    >
      {/* Background Ambience (subtle and non-intrusive) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#3D5A80]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#F7931E]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. SECTION TITLE: "Works"
           ======================================================== */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#F7931E] uppercase font-semibold block mb-2 sm:mb-3">
            Selected Portfolio
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Works
          </h2>
        </div>

        {/* ========================================================
            2. MAIN SHOWCASE: Realistic Browser Screen + Arrows (< >)
           ======================================================== */}
        <div
          className="relative max-w-[1140px] mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrow — Left (<) */}
          <button
            type="button"
            onClick={handlePrevProject}
            className="absolute -left-3 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#121924]/90 hover:bg-[#1C2738] text-white/80 hover:text-white border border-white/20 hover:border-[#F7931E]/60 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Navigation Arrow — Right (>) */}
          <button
            type="button"
            onClick={handleNextProject}
            className="absolute -right-3 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#121924]/90 hover:bg-[#1C2738] text-white/80 hover:text-white border border-white/20 hover:border-[#F7931E]/60 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Browser Display Frame */}
          <div className="relative rounded-2xl sm:rounded-[24px] lg:rounded-[28px] overflow-hidden bg-[#121924] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
            {/* Sleek Browser Top Bar */}
            <div className="w-full bg-[#17202E] border-b border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]/85" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]/85" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]/85" />
              </div>

              {/* Simulated Address Bar */}
              <div className="flex items-center gap-2 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#0B1118]/85 border border-white/10 text-xs sm:text-[13px] font-mono text-white/70 max-w-[420px] w-full justify-center truncate">
                <Lock className="w-3 h-3 text-[#F7931E] shrink-0" />
                <span className="truncate">
                  https://{currentProject.websiteDomain || `${currentProject.id}.com`}
                </span>
              </div>

              {/* Quick Tag */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/50 uppercase tracking-wider shrink-0">
                <span>{currentProject.categoryTag}</span>
              </div>
            </div>

            {/* Viewport Area — Zero Overlay, 100% Crisp Website Content */}
            <div
              className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden bg-[#0D131C] cursor-pointer group"
              onClick={() => {
                setSelectedProjectForModal(currentProject);
                setIsModalOpen(true);
              }}
              title="Click to view full case study & interactive experience"
            >
              <Image
                key={`${currentProject.id}-${currentPage.image}`}
                src={currentPage.image}
                alt={`${currentProject.name} — ${currentPage.title}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1140px"
                className="object-cover object-top transition-opacity duration-300"
              />

              {/* Subtle hover prompt to view details without obscuring the site */}
              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] tracking-wide shadow-lg">
                  <Sparkles className="w-3 h-3 text-[#F7931E]" />
                  Click to Expand
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. BOTTOM METADATA BAR (Directly matching wireframe)
            Left: business name (1/6)
            Center: 1/3 (Pages)
            Right: Visit site
           ======================================================== */}
        <div className="max-w-[1140px] mx-auto mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-4 px-2 sm:px-4">
          {/* LEFT: business name (1/6) */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-baseline gap-2.5">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-tight">
                {currentProject.name}
              </h3>
              <span className="font-mono text-xs sm:text-sm text-white/50 tracking-wider">
                ({activeProjectIndex + 1}/{totalProjects})
              </span>
            </div>
            <span className="sm:hidden font-mono text-[11px] text-[#F7931E] uppercase tracking-wider">
              {currentProject.location}
            </span>
          </div>

          {/* CENTER: 1/3 (Pages) with Interactive Page Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#121924] border border-white/10 rounded-full px-3 sm:px-4 py-1.5 shadow-sm">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Previous page of this website"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Counter & Label */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm text-white tracking-wide">
                <span className="text-[#F7931E] font-semibold">{activePageIndex + 1}</span>/
                {totalPages}{" "}
                <span className="text-white/60 font-sans text-xs">(Pages)</span>
              </span>

              {/* Clickable Page Dots / Pills */}
              <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/15">
                {pages.map((p, pIdx) => {
                  const isCurrent = pIdx === activePageIndex;
                  return (
                    <button
                      key={`${p.title}-${pIdx}`}
                      type="button"
                      onClick={() => setActivePageIndex(pIdx)}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[#F7931E] text-[#0B1118] font-semibold"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                      title={p.label || p.title}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextPage}
              className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Next page of this website"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: Visit site */}
          <div className="w-full sm:w-auto flex justify-end">
            <a
              href={currentProject.liveUrl || "#contact"}
              target={isExternalLive ? "_blank" : undefined}
              rel={isExternalLive ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!isExternalLive) {
                  e.preventDefault();
                  setSelectedProjectForModal(currentProject);
                  setIsModalOpen(true);
                }
              }}
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#F7931E] hover:text-[#FFA94D] tracking-wide transition-colors cursor-pointer py-1"
              aria-label={`Visit site for ${currentProject.name}`}
            >
              <span>Visit site</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F7931E] group-hover:text-[#FFA94D]" />
            </a>
          </div>
        </div>

        {/* Project Quick Selector Pills (Direct jumping between 1 to 6) */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-2">
          {projectsData.map((project, idx) => {
            const isCurrent = idx === activeProjectIndex;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setActiveProjectIndex(idx);
                  setActivePageIndex(0);
                }}
                className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer border ${
                  isCurrent
                    ? "bg-[#F7931E]/20 text-[#F7931E] border-[#F7931E]/60 shadow-[0_0_12px_rgba(247,147,30,0.25)]"
                    : "bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10"
                }`}
                aria-label={`Jump to ${project.name}`}
              >
                0{idx + 1} · {project.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal for Full Page Details & Walkthrough */}
      <ProjectExperienceModal
        project={selectedProjectForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
