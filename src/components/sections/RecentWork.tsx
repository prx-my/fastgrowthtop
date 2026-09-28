"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
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
      if (isModalOpen) return;
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
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
      className="relative w-full bg-[#E0FBFC] text-[#293241] py-8 sm:py-12 lg:py-16 select-none"
      aria-label="Works showcase"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. SECTION TITLE: "Works"
           ======================================================== */}
        <div className="text-center mb-5 sm:mb-7">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#293241] font-normal tracking-tight">
            Works
          </h2>
        </div>

        {/* ========================================================
            2. MAIN SHOWCASE: Clean, Crisp Image Cover + Edge Arrows (< >)
               (No dark backgrounds, perfectly integrated into site)
           ======================================================== */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#98C1D9]/70 bg-white shadow-[0_16px_40px_rgba(41,50,65,0.08)]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrow — Left (<) */}
          <button
            type="button"
            onClick={handlePrevProject}
            className="absolute left-2.5 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[#293241] hover:text-[#F7931E] border border-[#98C1D9]/80 hover:border-[#F7931E] shadow-[0_4px_16px_rgba(41,50,65,0.12)] backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Navigation Arrow — Right (>) */}
          <button
            type="button"
            onClick={handleNextProject}
            className="absolute right-2.5 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[#293241] hover:text-[#F7931E] border border-[#98C1D9]/80 hover:border-[#F7931E] shadow-[0_4px_16px_rgba(41,50,65,0.12)] backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Display Viewport: Clean, Large, Edge-to-Edge Image */}
          <div
            className="relative w-full aspect-[16/9.2] sm:aspect-[16/9] lg:aspect-[16/8.8] overflow-hidden bg-[#F0FAFA] cursor-pointer"
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
              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1400px"
              className="object-cover object-top transition-opacity duration-300"
            />
          </div>
        </div>

        {/* ========================================================
            3. BOTTOM METADATA BAR (Directly matching wireframe)
            Left: business name (1/6)
            Center: 1/3 (Pages)
            Right: Visit site
           ======================================================== */}
        <div className="w-full mt-3.5 sm:mt-5 flex items-center justify-between gap-3 text-[#293241] px-1 sm:px-2">
          {/* LEFT: business name (1/6) */}
          <div className="flex items-baseline gap-2 shrink-0">
            <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-[#293241] font-normal tracking-tight truncate max-w-[200px] sm:max-w-none">
              {currentProject.name}
            </h3>
            <span className="font-mono text-xs sm:text-sm text-[#3D5A80]/70 tracking-wider">
              ({activeProjectIndex + 1}/{totalProjects})
            </span>
          </div>

          {/* CENTER: 1/3 (Pages) with Interactive Page Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white border border-[#98C1D9]/70 rounded-full px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm font-mono shadow-sm">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-[#3D5A80] hover:text-[#293241] hover:bg-[#E0FBFC] transition-colors p-0.5 rounded-full cursor-pointer"
              aria-label="Previous page of this website"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <span className="tracking-wide text-[#293241]">
              <span className="text-[#F7931E] font-semibold">{activePageIndex + 1}</span>/
              {totalPages}{" "}
              <span className="text-[#3D5A80] font-sans text-xs">(Pages)</span>
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="text-[#3D5A80] hover:text-[#293241] hover:bg-[#E0FBFC] transition-colors p-0.5 rounded-full cursor-pointer"
              aria-label="Next page of this website"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* RIGHT: Visit site */}
          <div className="shrink-0 flex justify-end">
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
              className="group inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-[#F7931E] hover:text-[#D97706] tracking-wide transition-colors cursor-pointer py-1"
              aria-label={`Visit site for ${currentProject.name}`}
            >
              <span>Visit site</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
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
