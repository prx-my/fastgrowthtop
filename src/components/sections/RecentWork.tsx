"use client";

import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, ProjectItem } from "@/data/projects";
import { ProjectExperienceModal } from "@/components/sections/ProjectExperienceModal";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

interface Scene {
  slide: HTMLElement;
  imgWrap: HTMLElement;
  veil: HTMLElement;
  content: HTMLElement;
  baseLeft: number;
  slideW: number;
  panMax: number;
}

export function RecentWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

  const totalProjects = projectsData.length;
  const activeProject = projectsData[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const scenesRef = useRef<Scene[]>([]);
  const distRef = useRef(1);
  const progressRef = useRef(0);
  const isDesktopRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  const hintRef = useRef<HTMLDivElement>(null);
  const hintTitleRef = useRef<HTMLSpanElement>(null);
  const hintIdxRef = useRef(-1);
  const markerRef = useRef<HTMLDivElement>(null);

  const updateActive = useCallback(
    (progress: number) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      let idx = 0;
      if (track && viewport) {
        const d = Math.max(1, track.scrollWidth - viewport.clientWidth);
        let best = Infinity;
        for (let i = 0; i < totalProjects; i++) {
          const slide = track.children[i * 2] as HTMLElement | undefined;
          if (!slide) continue;
          const center = (slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2) / d;
          const diff = Math.abs(center - progress);
          if (diff < best) {
            best = diff;
            idx = i;
          }
        }
      }
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    },
    [totalProjects]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    const mq = window.matchMedia(DESKTOP_BREAKPOINT);

    const buildScenes = () => {
      const d = Math.max(1, track.scrollWidth - viewport.clientWidth);
      distRef.current = d;
      scenesRef.current = projectsData.map((_, i) => {
        const slide = track.children[i * 2] as HTMLElement;
        return {
          slide,
          imgWrap: slide.querySelector<HTMLElement>("[data-scene-img-wrap]")!,
          veil: slide.querySelector<HTMLElement>("[data-scene-veil]")!,
          content: slide.querySelector<HTMLElement>("[data-scene-content]")!,
          baseLeft: slide.offsetLeft,
          slideW: slide.offsetWidth,
          panMax: slide.offsetWidth * 0.15,
        };
      });
    };

    const hideSceneCopy = (slide: HTMLElement) => {
      const words = slide.querySelectorAll("[data-title-word]");
      gsap.set(words, { yPercent: 115 });
      const extras = slide.querySelectorAll("[data-scene-reveal]");
      gsap.set(extras, { opacity: 0, y: 14 });
    };

    const playSceneReveal = (idx: number) => {
      const slide = track.children[idx * 2] as HTMLElement | undefined;
      if (!slide) return;
      const words = slide.querySelectorAll("[data-title-word]");
      gsap.set(words, { yPercent: 115 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: "power4.out",
      });
      const extras = slide.querySelectorAll("[data-scene-reveal]");
      gsap.set(extras, { opacity: 0, y: 14 });
      gsap.to(extras, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.3,
        ease: "power3.out",
      });
    };

    const resetScenes = () => {
      for (const s of scenesRef.current) {
        gsap.set(s.slide.querySelectorAll("[data-title-word]"), { clearProps: "all" });
        gsap.set(s.slide.querySelectorAll("[data-scene-reveal]"), { clearProps: "all" });
        s.imgWrap.style.transform = "";
        s.veil.style.opacity = "";
        s.content.style.opacity = "";
        s.content.style.transform = "";
      }
      scenesRef.current = [];
      if (hintRef.current) hintRef.current.style.opacity = "";
      if (markerRef.current) markerRef.current.style.top = "";
    };

    const applyFrame = (p: number) => {
      const vw = viewport.clientWidth;
      const trackX = -p * distRef.current;

      for (const s of scenesRef.current) {
        const left = s.baseLeft + trackX;
        if (left > vw || left < -s.slideW) continue; // fully off-screen

        const lp = clamp01((vw - left) / (vw + s.slideW));

        const scrollPan = -s.panMax * lp;
        const my = mouseRef.current.y * 9;
        s.imgWrap.style.transform = `translate3d(${scrollPan.toFixed(2)}px, ${my.toFixed(2)}px, 0) scale(${scaleAt(lp).toFixed(4)})`;

        const entryVeil = 1 - easeOutCubic(clamp01(lp / 0.38));
        const exitVeil = easeOutCubic(clamp01((lp - 0.62) / 0.3));
        s.veil.style.opacity = Math.max(entryVeil, exitVeil).toFixed(3);

        const fadeIn = easeOutQuint(clamp01((lp - 0.2) / 0.3));
        const fadeOut = 1 - easeOutCubic(clamp01((lp - 0.58) / 0.28));
        const op = Math.min(fadeIn, fadeOut);
        s.content.style.opacity = op.toFixed(3);

        const rise = (1 - fadeIn) * 34 - (1 - fadeOut) * 26;
        const drift = -scrollPan * 0.3;
        s.content.style.transform = `translate3d(${drift.toFixed(2)}px, ${rise.toFixed(2)}px, 0)`;
      }

      // NEXT PROJECT hint during the void
      if (hintRef.current && hintTitleRef.current) {
        const step = scenesRef.current.length > 1 ? scenesRef.current[1].baseLeft : 1;
        const sceneShare = scenesRef.current[0] ? scenesRef.current[0].slideW / step : 0.5;
        const px = -trackX;
        const chapter = Math.floor(px / step);
        const frac = px / step - chapter;
        const voidZone = 1 - sceneShare;
        const hintOp = Math.sin(Math.PI * clamp01((frac - sceneShare) / voidZone));
        hintRef.current.style.opacity = hintOp.toFixed(3);
        const idx = (chapter + 1) % totalProjects;
        if (idx !== hintIdxRef.current) {
          hintIdxRef.current = idx;
          hintTitleRef.current.textContent = projectsData[idx].name;
        }
      }

      // continuous rail marker
      if (markerRef.current) {
        markerRef.current.style.top = `${(p * 100).toFixed(2)}%`;
      }
    };

    const buildST = () => {
      scenesRef.current.forEach((s) => hideSceneCopy(s.slide));
      playSceneReveal(0);
      progressRef.current = 0;
      applyFrame(0);

      const tween = gsap.to(track, {
        x: () => -distRef.current,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distRef.current,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            buildScenes();
            applyFrame(self.progress);
          },
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });
      stRef.current = tween.scrollTrigger ?? null;

      gsap.ticker.add(tick);
    };

    const tick = () => {
      const p = progressRef.current;
      applyFrame(p);
      updateActive(p);
    };

    const destroyST = () => {
      gsap.ticker.remove(tick);
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
      gsap.set(track, { x: 0 });
      resetScenes();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / vwWidth()) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    const vwWidth = () => window.innerWidth;

    if (mq.matches) {
      isDesktopRef.current = true;
      buildScenes();
      buildST();
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        isDesktopRef.current = true;
        buildScenes();
        buildST();
        window.addEventListener("mousemove", onMouseMove, { passive: true });
      } else {
        isDesktopRef.current = false;
        window.removeEventListener("mousemove", onMouseMove);
        destroyST();
        setActiveIndex(0);
      }
    };

    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMouseMove);
      destroyST();
    };
  }, [updateActive]);

  // Play the per-scene "elements" reveal whenever the active scene changes (desktop)
  useEffect(() => {
    if (!isDesktopRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[activeIndex * 2] as HTMLElement | undefined;
    if (!slide) return;
    const words = slide.querySelectorAll("[data-title-word]");
    gsap.set(words, { yPercent: 115 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1.0,
      stagger: 0.07,
      ease: "power4.out",
    });
    const extras = slide.querySelectorAll("[data-scene-reveal]");
    gsap.set(extras, { opacity: 0, y: 14 });
    gsap.to(extras, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      delay: 0.25,
      ease: "power3.out",
    });
  }, [activeIndex]);

  const goToProject = useCallback(
    (targetIndex: number) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const i = Math.min(Math.max(targetIndex, 0), totalProjects - 1);

      if (!window.matchMedia(DESKTOP_BREAKPOINT).matches) {
        const slide = track.children[i * 2] as HTMLElement | undefined;
        if (!slide) return;
        const targetLeft = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
        track.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
        return;
      }

      const st = stRef.current;
      if (!st) return;
      const slide = track.children[i * 2] as HTMLElement | undefined;
      if (!slide) return;
      const distance = Math.max(1, track.scrollWidth - viewport.clientWidth);
      const progress =
        (slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2) / distance;
      const targetY = st.start + progress * (st.end - st.start);

      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (target: number, options?: object) => void };
        }
      ).__lenis;

      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.4 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [totalProjects]
  );

  const handlePrev = useCallback(() => {
    goToProject(activeIndex === 0 ? totalProjects - 1 : activeIndex - 1);
  }, [activeIndex, totalProjects, goToProject]);

  const handleNext = useCallback(() => {
    goToProject(activeIndex === totalProjects - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, totalProjects, goToProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-x-clip"
      aria-label="Selected Projects Showcase"
    >
      <div
        ref={viewportRef}
        className="relative h-[100svh] w-full overflow-hidden bg-[#0B1118] text-[#F2EEE6] select-none"
      >
        {/* ===================== HORIZONTAL SCENE TRACK ===================== */}
        <div
          ref={trackRef}
          className="flex h-full items-stretch will-change-transform overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x lg:snap-none lg:overflow-visible lg:touch-auto"
        >
          {projectsData.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Fragment key={project.id}>
                {/* PROJECT SCENE — full-screen on desktop */}
                <div
                  className="relative w-[82vw] lg:w-screen shrink-0 snap-center h-full overflow-hidden"
                  aria-hidden={!isActive}
                >
                  {/* Image wrapper: pans right-to-left, floats with the mouse */}
                  <div
                    data-scene-img-wrap
                    className="absolute left-0 -top-[4%] -bottom-[4%] w-[115%] will-change-transform"
                  >
                    <Image
                      src={project.heroImage}
                      alt={`${project.name} Hero Photography`}
                      fill
                      priority={idx < 2}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>

                  {/* Readability gradients */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0B1118]/92 via-[#0B1118]/55 to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0B1118]/60 via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  {/* Cinematic dark veil — scene fades into/out of the void */}
                  <div data-scene-veil className="absolute inset-0 z-10 bg-[#0B1118]" aria-hidden="true" />

                  <div
                    data-scene-content
                    className="relative z-20 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 will-change-transform"
                  >
                    {/* Top row: counter + services */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-baseline gap-2 font-mono text-xs sm:text-sm tracking-wider">
                        <span className="text-[#E99A22] font-semibold">{project.number}</span>
                        <span className="text-white/45">/ 0{totalProjects}</span>
                      </div>
                      <span
                        data-scene-reveal
                        className="hidden sm:block font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase"
                      >
                        {project.servicesTag}
                      </span>
                    </div>

                    {/* Middle: editorial title, vertically centered */}
                    <div className="max-w-3xl lg:max-w-4xl my-auto py-6">
                      <span
                        data-scene-reveal
                        className="inline-block font-mono text-[11px] tracking-[0.3em] text-[#E99A22] uppercase mb-4 sm:mb-6"
                      >
                        {project.locationFormatted || project.location}
                      </span>
                      <h3 className="font-serif text-5xl sm:text-7xl lg:text-[110px] lg:leading-[0.98] font-normal text-white tracking-tight">
                        {project.name.split(" ").map((word, wi) => (
                          <span
                            key={`${word}-${wi}`}
                            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
                          >
                            <span data-title-word className="inline-block will-change-transform">
                              {word}
                              {"\u00A0"}
                            </span>
                          </span>
                        ))}
                      </h3>
                      <button
                        type="button"
                        data-scene-reveal
                        onClick={() => {
                          setSelectedProjectForModal(project);
                          setIsModalOpen(true);
                        }}
                        className="group inline-flex items-center gap-2.5 text-[#E99A22] hover:text-[#FFA94D] tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase transition-colors cursor-pointer bg-transparent border-0 p-0 mt-8"
                        aria-label={`Experience full website view for ${project.name}`}
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          VIEW PROJECT
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-2"
                          aria-hidden="true"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom: film-credit description */}
                    <p
                      data-scene-reveal
                      className="font-sans text-sm sm:text-base text-white/70 leading-relaxed max-w-md font-light"
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* EMPTY VOID — the wait between projects (no trailing gap) */}
                {idx < totalProjects - 1 && (
                  <div className="w-[8vw] lg:w-[140vw] shrink-0" aria-hidden="true" />
                )}
              </Fragment>
            );
          })}
        </div>

        {/* ===================== NEXT PROJECT HINT (appears in the void) ===================== */}
        <div
          ref={hintRef}
          className="hidden lg:flex absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 pointer-events-none select-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] tracking-[0.32em] text-white/40 uppercase">
            NEXT PROJECT
          </span>
          <span ref={hintTitleRef} className="font-serif text-2xl lg:text-3xl italic text-white/90">
            —
          </span>
        </div>



        {/* ===================== RIGHT-SIDE PROGRESS RAIL (desktop) ===================== */}
        <div
          className="hidden lg:flex absolute right-5 lg:right-12 top-1/2 -translate-y-1/2 z-30 flex-col items-center pointer-events-auto select-none"
          aria-label="Project slider navigation"
        >
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-3 sm:mb-4">
            SCROLL
          </span>
          <div className="relative w-px h-48 sm:h-56 bg-white/20 flex flex-col justify-between items-center">
            <div
              ref={markerRef}
              className="absolute left-1/2 w-[3px] h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-[#E99A22] to-[#FFD08A] shadow-[0_0_10px_rgba(233,154,34,0.8)]"
              style={{ top: "0%" }}
            />
            {projectsData.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={project.id}
                  onClick={() => goToProject(idx)}
                  className={`group relative flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                    isActive ? "scale-125" : "scale-100 hover:scale-125"
                  }`}
                  aria-label={`Jump to project 0${idx + 1}: ${project.name}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-[#E99A22] shadow-[0_0_10px_rgba(233,154,34,0.7)] transition-all duration-300" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full border border-white/45 bg-[#0B1118]/80 group-hover:border-white group-hover:bg-white/40 transition-all duration-200" />
                  )}
                  <span className="absolute right-6 px-2 py-1 rounded bg-[#0B1118]/90 text-white font-mono text-[10px] tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 hidden sm:block">
                    {project.number} · {project.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================== BOTTOM-RIGHT ARROWS (desktop) ===================== */}
        <div className="hidden lg:flex absolute right-6 lg:right-14 bottom-6 lg:bottom-10 z-30 items-center gap-5 lg:gap-6 pointer-events-auto select-none">
          <button
            onClick={handlePrev}
            className="text-white/60 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full hover:bg-white/10"
            aria-label="Previous Project"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="text-white/60 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full hover:bg-white/10"
            aria-label="Next Project"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Bottom-left ethos (desktop) */}
        <div className="hidden lg:block absolute left-10 lg:left-16 bottom-6 lg:bottom-10 z-30 pointer-events-none select-none">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-white/45 uppercase">
            REAL BUSINESSES. REMARKABLE RESULTS.
          </span>
        </div>
      </div>

      <ProjectExperienceModal
        project={selectedProjectForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

function scaleAt(lp: number) {
  const entry = easeOutCubic(clamp01(lp / 0.55));
  const exitP = easeInOutSine(clamp01((lp - 0.55) / 0.45));
  return 1.07 - 0.07 * entry + 0.04 * exitP;
}
