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

interface RecentWorkProps {
  initialProjects?: ProjectItem[];
}

export function RecentWork({ initialProjects = projectsData }: RecentWorkProps) {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjects);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setProjectsList(initialProjects);
    }
  }, [initialProjects]);

  useEffect(() => {
    fetch("/api/work")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch(() => {});
  }, []);

  const totalProjects = projectsList.length || 1;
  const safeProjectIndex = Math.min(activeProjectIndex, totalProjects - 1);
  const currentProject = projectsList[safeProjectIndex] || projectsData[0];
  const currentPage = currentProject.pages && currentProject.pages.length > 0
    ? currentProject.pages[0]
    : { title: "Home", image: currentProject.desktopImage, label: "Overview" };

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Navigate Projects
  const handlePrevProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  }, [totalProjects]);

  const handleNextProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  }, [totalProjects]);

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

  // Calculate segment progress for horizontal navigation line (intervals between points)
  const segmentCount = Math.max(1, totalProjects - 1);
  const activeSegmentIndex = Math.min(safeProjectIndex, segmentCount - 1);
  const activeLineLeftPercent = (activeSegmentIndex / segmentCount) * 100;
  const activeLineWidthPercent = 100 / segmentCount;

  return (
    <section
      id="work"
      className="relative w-full bg-[#E0FBFC] text-[#293241] min-h-screen flex flex-col justify-between py-4 sm:py-5 lg:py-6 select-none overflow-hidden"
      aria-label="Work portfolio showcase"
    >
      <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between min-h-0">
        {/* ========================================================
            1. HEADER ROW: [Project Pill] — Work — [Visit site]
           ======================================================== */}
        <div className="w-full max-w-[1360px] mx-auto mb-2 sm:mb-3 shrink-0">
          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 items-center">
            {/* Left: Project Name Pill with refined typography */}
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-[#98C1D9]/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(41,50,65,0.04)] transition-all">
                <span className="font-sans text-xs sm:text-[13.5px] font-semibold text-[#1e2633] tracking-tight">
                  {currentProject.name}
                </span>
                <span className="font-sans text-xs sm:text-[13px] font-medium text-[#53789E]/80 tracking-wide">
                  (<span className="text-[#FBB01B] font-bold">{currentProject.number}</span>
                  <span className="mx-0.5 text-[#98C1D9]">/</span>
                  <span>{String(totalProjects).padStart(2, "0")}</span>)
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#1e2633] font-normal tracking-tight">
                Recent Projects
              </h2>
            </div>

            {/* Right: Visit site button */}
            <div className="flex justify-end">
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
                className="inline-flex items-center gap-2 bg-[#FBB01B] hover:bg-[#F5A30A] active:scale-95 text-[#1e2633] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_2px_10px_rgba(251,176,27,0.28)] hover:shadow-[0_4px_16px_rgba(251,176,27,0.38)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB01B]/70"
                aria-label={`Visit site for ${currentProject.name}`}
              >
                <span>Visit site</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Mobile: Heading + project name + visit site */}
          <div className="md:hidden">
            <h2 className="font-serif text-3xl text-[#1e2633] font-normal tracking-tight text-center mb-2">
              Recent Projects
            </h2>
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 bg-white/80 border border-[#98C1D9]/40 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                <span className="font-sans text-xs font-semibold text-[#1e2633] truncate max-w-[170px]">
                  {currentProject.name}
                </span>
                <span className="font-sans text-xs font-medium text-[#53789E]/80">
                  (<span className="text-[#FBB01B] font-bold">{currentProject.number}</span>/{String(totalProjects).padStart(2, "0")})
                </span>
              </div>
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
                className="inline-flex items-center gap-1.5 bg-[#FBB01B] active:scale-95 text-[#1e2633] px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow-sm cursor-pointer shrink-0"
                aria-label={`Visit site for ${currentProject.name}`}
              >
                <span>Visit site</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MAIN PROJECT SHOWCASE + ARROWS (NEVER COLLIDING FLEX)
           ======================================================== */}
        <div className="w-full max-w-[1520px] mx-auto flex-1 min-h-0 flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 my-auto">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrevProject}
            className="shrink-0 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-neutral-50 text-[#1e2633] border border-slate-200/90 shadow-[0_2px_12px_rgba(41,50,65,0.08)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB01B]"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 stroke-[2] transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Image Preview Container */}
          <div
            className="relative flex-1 max-w-[1360px] min-w-0 rounded-2xl sm:rounded-[26px] lg:rounded-[28px] overflow-hidden bg-white shadow-[0_12px_45px_rgba(41,50,65,0.08)] flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative w-full aspect-[16/9.5] sm:aspect-[16/9] lg:aspect-[16/8.6] max-h-[66vh] sm:max-h-[70vh] lg:max-h-[72vh] min-h-[280px] overflow-hidden cursor-pointer bg-neutral-100"
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
                sizes="(max-width: 768px) 96vw, (max-width: 1400px) 92vw, 1360px"
                className="object-cover object-top transition-opacity duration-300 motion-reduce:transition-none"
              />
            </div>


          </div>

          {/* Next Arrow — Flex sibling, never collides */}
          <button
            type="button"
            onClick={handleNextProject}
            className="shrink-0 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-neutral-50 text-[#1e2633] border border-slate-200/90 shadow-[0_2px_12px_rgba(41,50,65,0.08)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB01B]"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-slate-700 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* ========================================================
            4. PROJECT NAVIGATION / PROGRESS LINE (01 ------- 06)
           ======================================================== */}
        <div className="w-full max-w-[1360px] mx-auto mt-auto pt-2 pb-1 sm:pb-2 shrink-0">
          <div className="w-full overflow-x-auto no-scrollbar py-1">
            <div className="min-w-[340px] sm:min-w-0">
              {/* Project Numbers Row */}
              <div className="flex items-center justify-between w-full mb-1.5">
                {projectsList.map((project, idx) => {
                  const isActive = idx === safeProjectIndex;
                  return (
                    <button
                      key={project.id || idx}
                      type="button"
                      onClick={() => {
                        setActiveProjectIndex(idx);
                      }}
                      className={`font-sans text-xs sm:text-sm tracking-wider cursor-pointer transition-colors duration-200 min-w-[32px] sm:min-w-[40px] min-h-[30px] sm:min-h-[36px] flex items-center justify-center focus:outline-none ${
                        isActive
                          ? "text-[#1e2633] font-bold"
                          : "text-[#53789E]/70 hover:text-[#1e2633] font-medium"
                      }`}
                      aria-label={`Jump to project ${project.number || `0${idx + 1}`}: ${project.name}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {project.number || String(idx + 1).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>

              {/* Progress Line Track */}
              <div className="relative w-full h-[2px] bg-[#98C1D9]/40 rounded-full overflow-hidden">
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
