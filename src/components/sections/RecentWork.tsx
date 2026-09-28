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

  const isExternalLive = Boolean(currentProject.liveUrl && currentProject.liveUrl.startsWith("http"));

  // Calculate segment progress for horizontal navigation line (5 intervals between 6 points)
  const segmentCount = Math.max(1, totalProjects - 1);
  const activeSegmentIndex = Math.min(activeProjectIndex, segmentCount - 1);
  const activeLineLeftPercent = (activeSegmentIndex / segmentCount) * 100;
  const activeLineWidthPercent = 100 / segmentCount;

  return (
    <section
      id="work"
      className="relative w-full bg-[#E0FBFC] text-[#293241] pt-6 pb-8 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 select-none overflow-hidden"
      aria-label="Work portfolio showcase"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. SECTION HEADER: "Work"
           ======================================================== */}
        <div className="text-center mb-5 sm:mb-7 lg:mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[52px] text-[#1e2633] font-normal tracking-tight">
            Work
          </h2>
        </div>

        {/* ========================================================
            2. MAIN PROJECT SHOWCASE + OUTSIDE CAROUSEL ARROWS
           ======================================================== */}
        <div className="relative w-full max-w-[1180px] mx-auto">
          {/* Previous Arrow — Vertically Centered OUTSIDE Left */}
          <button
            type="button"
            onClick={handlePrevProject}
            className="absolute -left-2 sm:-left-6 lg:-left-9 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-neutral-50 text-[#1e2633] border border-slate-200/90 shadow-[0_2px_12px_rgba(41,50,65,0.08)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB01B]"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 stroke-[2] transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Next Arrow — Vertically Centered OUTSIDE Right */}
          <button
            type="button"
            onClick={handleNextProject}
            className="absolute -right-2 sm:-right-6 lg:-right-9 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-neutral-50 text-[#1e2633] border border-slate-200/90 shadow-[0_2px_12px_rgba(41,50,65,0.08)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB01B]"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-slate-700 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Centered Rounded Image Preview Container */}
          <div
            className="relative w-full max-w-[1060px] mx-auto rounded-2xl sm:rounded-[26px] lg:rounded-[28px] overflow-hidden bg-white shadow-[0_12px_45px_rgba(41,50,65,0.08)]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative w-full aspect-[16/9.6] sm:aspect-[16/9.7] lg:aspect-[16/9.6] overflow-hidden cursor-pointer bg-neutral-100"
              onClick={() => {
                setSelectedProjectForModal(currentProject);
                setIsModalOpen(true);
              }}
              title="Click to view full project experience"
            >
              <Image
                key={`${currentProject.id}-${currentPage.image}`}
                src={currentPage.image}
                alt={`${currentProject.name} — ${currentPage.title}`}
                fill
                priority
                sizes="(max-width: 768px) 94vw, (max-width: 1200px) 88vw, 1060px"
                className="object-cover object-top transition-opacity duration-300 motion-reduce:transition-none"
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            3. PROJECT INFORMATION BELOW IMAGE
            Desktop: Three-Column Layout (Visit site | Title & Meta | 01/03 Pages)
            Mobile: Centered Stacked Layout
           ======================================================== */}
        <div className="w-full max-w-[1060px] mx-auto mt-5 sm:mt-6 lg:mt-7">
          {/* Desktop & Tablet Layout (md and up) */}
          <div className="hidden md:grid md:grid-cols-3 items-center">
            {/* Left: Yellow Visit Site Button */}
            <div className="flex justify-start">
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
                className="inline-flex items-center gap-2 bg-[#FBB01B] hover:bg-[#F5A30A] active:scale-95 text-[#1e2633] px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB01B]/70"
                aria-label={`Visit site for ${currentProject.name}`}
              >
                <span>Visit site</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>

            {/* Center: Index, Title, Metadata */}
            <div className="flex flex-col items-center text-center">
              <span className="font-mono text-xs text-[#53789E] tracking-[0.2em] font-medium mb-1">
                {currentProject.number} / 0{totalProjects}
              </span>
              <h3 className="font-serif text-3xl lg:text-[34px] text-[#1e2633] font-normal tracking-tight my-0.5">
                {currentProject.name}
              </h3>
              <span className="font-mono text-[11px] text-[#53789E] tracking-[0.22em] uppercase font-medium mt-1">
                {currentProject.servicesTag}
              </span>
            </div>

            {/* Right: Page Navigation Pill (‹ 01 / 03 Pages ›) */}
            <div className="flex justify-end">
              <div className="inline-flex items-center gap-2.5 bg-white border border-[#98C1D9]/60 rounded-full px-4 py-2 shadow-sm font-mono text-xs sm:text-[13px]">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="text-[#3D5A80] hover:text-[#1e2633] p-1 rounded-full transition-colors cursor-pointer focus:outline-none"
                  aria-label="Previous screenshot page"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                <span className="text-[#3D5A80] tracking-wide select-none">
                  <span className="text-[#FBB01B] font-semibold">
                    0{activePageIndex + 1}
                  </span>
                  <span className="mx-1 text-[#3D5A80]/60">/</span>
                  <span>0{totalPages} Pages</span>
                </span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  className="text-[#3D5A80] hover:text-[#1e2633] p-1 rounded-full transition-colors cursor-pointer focus:outline-none"
                  aria-label="Next screenshot page"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Layout (stacked cleanly, matching user hierarchy) */}
          <div className="flex md:hidden flex-col items-center text-center gap-4">
            {/* Title & Metadata */}
            <div className="flex flex-col items-center">
              <h3 className="font-serif text-2xl text-[#1e2633] font-normal tracking-tight mb-1">
                {currentProject.name}
              </h3>
              <span className="font-mono text-xs text-[#53789E] tracking-[0.2em] font-medium mb-1">
                {currentProject.number} / 0{totalProjects}
              </span>
              <span className="font-mono text-[10px] text-[#53789E] tracking-[0.2em] uppercase font-medium">
                {currentProject.servicesTag}
              </span>
            </div>

            {/* Visit Site Button */}
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
              className="inline-flex items-center justify-center gap-2 bg-[#FBB01B] active:scale-95 text-[#1e2633] px-8 py-3 rounded-full text-sm font-semibold tracking-wide shadow-sm w-full max-w-xs cursor-pointer"
              aria-label={`Visit site for ${currentProject.name}`}
            >
              <span>Visit site</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            {/* Compact Page Navigation Pill */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-[#98C1D9]/60 rounded-full px-4 py-2 shadow-sm font-mono text-xs">
              <button
                type="button"
                onClick={handlePrevPage}
                className="text-[#3D5A80] hover:text-[#1e2633] p-1 rounded-full cursor-pointer focus:outline-none"
                aria-label="Previous screenshot page"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <span className="text-[#3D5A80] tracking-wide select-none">
                <span className="text-[#FBB01B] font-semibold">
                  0{activePageIndex + 1}
                </span>
                <span className="mx-1 text-[#3D5A80]/60">/</span>
                <span>0{totalPages} Pages</span>
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                className="text-[#3D5A80] hover:text-[#1e2633] p-1 rounded-full cursor-pointer focus:outline-none"
                aria-label="Next screenshot page"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. PROJECT NAVIGATION / PROGRESS LINE (01 ------- 06)
           ======================================================== */}
        <div className="w-full max-w-[1060px] mx-auto mt-6 sm:mt-8 lg:mt-9">
          <div className="w-full overflow-x-auto no-scrollbar py-2">
            <div className="min-w-[340px] sm:min-w-0">
              {/* Project Numbers Row */}
              <div className="flex items-center justify-between w-full mb-2">
                {projectsData.map((project, idx) => {
                  const isActive = idx === activeProjectIndex;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setActiveProjectIndex(idx);
                        setActivePageIndex(0);
                      }}
                      className={`font-mono text-xs sm:text-sm tracking-wider cursor-pointer transition-colors duration-200 min-w-[36px] sm:min-w-[44px] min-h-[36px] sm:min-h-[44px] flex items-center justify-center focus:outline-none ${
                        isActive
                          ? "text-[#1e2633] font-bold"
                          : "text-[#53789E]/70 hover:text-[#1e2633] font-medium"
                      }`}
                      aria-label={`Jump to project 0${idx + 1}: ${project.name}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {project.number}
                    </button>
                  );
                })}
              </div>

              {/* Progress Line Track */}
              <div className="relative w-full h-[2px] bg-[#98C1D9]/40 rounded-full overflow-hidden">
                {/* Smooth Animated Yellow Active Line Segment */}
                <div
                  className="absolute top-0 h-full bg-[#FBB01B] rounded-full transition-all duration-400 ease-out motion-reduce:transition-none"
                  style={{
                    left: `${activeLineLeftPercent}%`,
                    width: `${activeLineWidthPercent}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal for Full Website Walkthrough */}
      <ProjectExperienceModal
        project={selectedProjectForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
