"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  Lock,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Monitor,
  MousePointerClick,
  Maximize2,
} from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface ProjectExperienceModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectExperienceModal({
  project,
  isOpen,
  onClose,
}: ProjectExperienceModalProps) {
  const [activeTab, setActiveTab] = useState<"website" | "live">("website");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and prevent background body scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Reset scroll position on project change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setActiveTab("website");
  }, [project]);

  if (!isOpen || !project) return null;

  const displayWebsiteImage = project.fullPageImage || project.desktopImage;
  const isExternalLive =
    project.liveUrl && project.liveUrl.startsWith("http");

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070B10]/95 backdrop-blur-xl p-3 sm:p-6 md:p-8 animate-fullscreen-enter select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-7xl h-[92vh] max-h-[960px] bg-[#0D131C] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F2EEE6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            TOP BAR: Project Header, Controls & Actions
           ======================================================== */}
        <div className="w-full bg-[#121924] border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
          {/* Left: Project Number & Identity */}
          <div className="flex items-center gap-3 truncate">
            <span className="font-mono text-xs font-bold text-[#E99A22] bg-[#E99A22]/15 px-2 py-0.5 rounded border border-[#E99A22]/30 shrink-0">
              {project.number}
            </span>
            <div className="truncate">
              <h2
                id="modal-project-title"
                className="font-serif text-base sm:text-lg font-medium text-white tracking-tight truncate"
              >
                {project.name}
              </h2>
              <p className="text-[11px] font-mono text-[#98C1D9]/80 uppercase tracking-wider truncate">
                {project.locationFormatted || project.location} · {project.industry}
              </p>
            </div>
          </div>

          {/* Right: Actions & Close */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {isExternalLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-[#E99A22] hover:bg-[#FFA94D] text-[#0B1118] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-[#E99A22] hover:bg-[#FFA94D] text-[#0B1118] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <span>Request Build</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close project view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================
            MAIN BODY: Interactive Website Canvas + Strategic Details
           ======================================================== */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* LEFT / CENTER (8 cols on lg): The Full Scrollable Website Experience */}
          <div className="lg:col-span-8 flex flex-col min-h-0 bg-[#070B10] p-3 sm:p-5 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden border border-white/15 bg-[#0B1118] flex flex-col shadow-inner">
              {/* Sleek Browser Top Bar */}
              <div className="w-full bg-[#151D29] border-b border-white/10 px-3 sm:px-4 py-2 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                </div>

                {/* Simulated Address Bar */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#090D13] border border-white/10 text-[11px] font-mono text-white/70 max-w-[340px] w-full justify-center truncate">
                  <Lock className="w-3 h-3 text-[#E99A22]" />
                  <span className="truncate">
                    {project.websiteDomain || `${project.id}.com`}
                  </span>
                </div>

                {/* Scroll Indicator Prompt */}
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-white/50">
                  <MousePointerClick className="w-3.5 h-3.5 text-[#E99A22]" />
                  <span>Scroll below to view full page</span>
                </div>
              </div>

              {/* Scrollable Viewport Container: Full Top-to-Bottom Website Experience */}
              <div
                ref={scrollContainerRef}
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative scroll-smooth select-text"
                tabIndex={0}
              >
                {/* Full-Length Website Image */}
                <div className="relative w-full">
                  <Image
                    src={displayWebsiteImage}
                    alt={`${project.name} Full Website Design`}
                    width={1400}
                    height={7000}
                    className="w-full h-auto object-top block"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT (4 cols on lg): Strategic Transformation & Sales Impact */}
          <div className="lg:col-span-4 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto bg-[#0D131C]">
            <div className="space-y-6">
              {/* Transformation Narrative */}
              <div>
                <span className="text-[10px] font-mono font-semibold tracking-[0.25em] text-[#E99A22] uppercase block mb-2">
                  THE TRANSFORMATION
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-tight mb-3">
                  {project.previewHeading || project.name}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Measurable Results Highlight */}
              {project.resultsHighlight && (
                <div className="p-4 rounded-xl bg-[#E99A22]/10 border border-[#E99A22]/30 flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#E99A22] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-[#E99A22] uppercase block mb-1">
                      KEY OUTCOME
                    </span>
                    <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                      {project.resultsHighlight}
                    </p>
                  </div>
                </div>
              )}

              {/* Key Deliverables & Systems Built */}
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-white/60 uppercase block mb-3">
                  WHAT WE ENGINEERED
                </span>
                <ul className="space-y-2.5">
                  {(
                    project.keyFeatures || [
                      "Custom conversion-engineered UI/UX design",
                      "Mobile-first responsive layout",
                      "Fast CDN hosting & ongoing support",
                      "Traverse City local SEO footprint",
                    ]
                  ).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/85"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E99A22] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Provided Badges */}
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-white/60 uppercase block mb-2">
                  SERVICES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((svc, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Conversion Prompt */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-[#121924] border border-white/10 flex flex-col gap-3">
                <span className="text-xs text-white/80 font-medium">
                  Imagine this level of digital craftsmanship for your business.
                </span>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#E99A22] hover:bg-[#FFA94D] text-[#0B1118] text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Claim Your Free Audit & Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
