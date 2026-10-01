"use client";


import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Hero() {
  const ref = useScrollReveal();

  return (
    <section id="hero" className="relative pt-[114px] pb-[32px] lg:pt-[136px] lg:pb-[48px] overflow-hidden" ref={ref}>
      {/* Subtle Atmospheric Lighting */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#98C1D9]/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[25%] left-[-10%] w-[450px] h-[450px] bg-[#F7931E]/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Headline Area */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="reveal text-hero mb-6 lg:mb-8">
            Your website<br />
            should be bringing<br />
            you <span className="ochre-underline reveal">business</span>.
          </h1>

          <p className="reveal reveal-delay-1 text-body-large max-w-[560px] mb-8 lg:mb-10 text-[#3D5A80]">
            If it isn't, I can help. I build websites, improve your visibility, generate more leads, and automate the busywork so you can focus on running your business.
          </p>


        </div>
      </div>
    </section>
  );
}
