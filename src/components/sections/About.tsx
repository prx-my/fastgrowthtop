"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-[#98C1D9]/20" ref={ref}>
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Content */}
          <div className="lg:col-span-6 xl:col-span-7">


            <h2 className="reveal reveal-delay-1 text-section-heading mb-8">
              Local roots.<br />
              Focused on results.
            </h2>

            <div className="reveal reveal-delay-2 space-y-6">
              <p className="text-body-large">
                I'm based in Traverse City, Michigan, and I work with businesses across Northern Michigan and beyond.
              </p>

              <div className="pt-2">
                <div className="pl-5 border-l-2 border-[#F7931E] max-w-[520px]">
                  <p className="text-[17px] lg:text-[18px] text-[#293241] font-medium leading-[1.55]">
                    Direct collaboration, honest advice, and digital systems built to grow your business.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-6 xl:col-span-5 reveal reveal-delay-2">
            <div className="relative w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden">
              <Image
                src="/images/about_portrait.webp"
                alt="Traverse City, Michigan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

