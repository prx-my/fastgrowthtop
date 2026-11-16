import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The markup shows every scene finished (reduced motion, no JS). Each builder sets the "before" state and returns the timeline to the finished one.
type Builder = (svg: SVGSVGElement) => gsap.core.Timeline;

const drawFrom = (els: Element[]) =>
  els.forEach((el) => {
    const len = (el as SVGGeometryElement).getTotalLength();
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
  });

const scenes: Record<string, Builder> = {
  wall(svg) {
    const $ = gsap.utils.selector(svg);
    gsap.set($(".foam"), { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set($(".drafts"), { opacity: 1 });
    gsap.set($(".warm"), { opacity: 0 });
    gsap.set($(".mercury"), { scaleY: 0.25, transformOrigin: "50% 100%", fill: "#5D8BB0" });
    gsap.set($(".bulb"), { fill: "#5D8BB0" });
    gsap.set($(".foam-label"), { opacity: 0 });
    // foam: short dense rise, then settles; drafts die the moment the cavity is sealed
    return gsap.timeline()
      .to($(".foam"), { scaleY: 1.03, duration: 1, ease: "power4.out" })
      .to($(".foam"), { scaleY: 1, duration: 0.3, ease: "sine.inOut" })
      .to($(".drafts"), { opacity: 0, duration: 0.25 }, 0.75)
      .to($(".warm"), { opacity: 0.55, duration: 0.8 }, 0.8)
      .to($(".mercury"), { scaleY: 1, fill: "#B5452E", duration: 0.8 }, 0.8)
      .to($(".bulb"), { fill: "#B5452E", duration: 0.8 }, 0.8)
      .to($(".foam-label"), { opacity: 1, duration: 0.3 }, 1.1);
  },

  attic(svg) {
    const $ = gsap.utils.selector(svg);
    gsap.set($(".fill"), { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set($(".flakes"), { opacity: 1 });
    gsap.set($(".depth"), { opacity: 0 });
    gsap.set($(".warm"), { opacity: 0 });
    // blown-in falls softly and stacks
    return gsap.timeline()
      .to($(".fill"), { scaleY: 1, duration: 1.4, ease: "sine.out" })
      .to($(".flakes"), { opacity: 0, duration: 0.3 }, 1.2)
      .to($(".depth"), { opacity: 1, duration: 0.3 }, 1.3)
      .to($(".warm"), { opacity: 0.5, duration: 0.6 }, 1.1);
  },

  barn(svg) {
    const $ = gsap.utils.selector(svg);
    gsap.set($(".post"), { y: -240, opacity: 0 });
    gsap.set($(".truss"), { y: -200, opacity: 0 });
    drawFrom($(".steel, .foam-line"));
    gsap.set($(".warm, .barn-label"), { opacity: 0 });
    // posts and trusses land with weight, then the steel skin, then foam on the inside of the shell
    return gsap.timeline()
      .to($(".post"), { y: 0, opacity: 1, duration: 0.45, ease: "power3.in", stagger: 0.12 })
      .to($(".truss"), { y: 0, opacity: 1, duration: 0.45, ease: "power3.in" })
      .to($(".steel"), { strokeDashoffset: 0, duration: 0.8, ease: "none" })
      .to($(".foam-line"), { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" })
      .to($(".warm"), { opacity: 0.5, duration: 0.5 }, "-=0.3")
      .to($(".barn-label"), { opacity: 1, duration: 0.3 });
  },

  slab(svg) {
    const $ = gsap.utils.selector(svg);
    drawFrom($(".forms"));
    gsap.set($(".pour-mask"), { attr: { height: 0 } });
    gsap.set($(".pour"), { fill: "#7B8187" });
    gsap.set($(".screed"), { y: 0, opacity: 0 });
    gsap.set($(".trowel"), { x: -140, opacity: 0 });
    gsap.set($(".marks, .slab-label"), { opacity: 0 });
    // concrete is slow, heavy and close to linear: no bounce
    return gsap.timeline()
      .to($(".forms"), { strokeDashoffset: 0, duration: 0.6, ease: "none" })
      .to($(".pour-mask"), { attr: { height: 182 }, duration: 1.2, ease: "none" })
      .to($(".screed"), { opacity: 1, duration: 0.1 }, "-=0.9")
      .to($(".screed"), { y: 168, duration: 1, ease: "none" }, "<")
      .to($(".screed"), { opacity: 0, duration: 0.2 })
      .to($(".trowel"), { opacity: 1, duration: 0.15 })
      .to($(".trowel"), { x: 140, duration: 0.7, ease: "sine.inOut" })
      .to($(".trowel"), { x: -60, duration: 0.5, ease: "sine.inOut" })
      .to($(".marks"), { opacity: 1, duration: 0.4 }, "<")
      .to($(".pour"), { fill: "#C9CCCF", duration: 0.8, ease: "none" })
      .to($(".trowel"), { opacity: 0, duration: 0.2 }, "<")
      .to($(".slab-label"), { opacity: 1, duration: 0.3 });
  },
};

const story = document.querySelector<HTMLElement>(".story");
if (story) {
  const chapters = gsap.utils.toArray<HTMLElement>(".chapter", story);
  const steps = gsap.utils.toArray<HTMLElement>(".story-steps li", story);
  const build = (ch: HTMLElement) => scenes[ch.dataset.scene!](ch.querySelector("svg")!);
  const setStep = (i: number) => steps.forEach((s, j) => s.classList.toggle("active", j === i));

  gsap.matchMedia().add(
    {
      desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
    },
    (ctx) => {
      if (!ctx.conditions?.desktop) {
        // phones: no pinning, each chapter plays as it scrolls through
        chapters.forEach((ch) =>
          ScrollTrigger.create({ trigger: ch.querySelector(".ch-art"), start: "top 85%", end: "bottom 45%", scrub: 0.5, animation: build(ch) }));
        return;
      }

      story.classList.add("is-pinned");
      gsap.set(chapters.slice(1), { autoAlpha: 0 });
      const master = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: story.querySelector(".story-pin"),
          start: "top top",
          end: () => `+=${window.innerHeight * chapters.length * 1.2}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // active step = last chapter label the playhead has passed
          onUpdate: () => setStep(chapters.reduce((n, _, i) => (master.time() >= master.labels[`ch${i}`] ? i : n), 0)),
        },
      });
      chapters.forEach((ch, i) => {
        master.addLabel(`ch${i}`);
        if (i > 0) master.fromTo(ch, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.35 });
        master.add(build(ch)).to({}, { duration: 0.5 });
        if (i < chapters.length - 1) master.to(ch, { autoAlpha: 0, y: -24, duration: 0.35 });
      });
      setStep(0);
      return () => story.classList.remove("is-pinned");
    },
  );
}
