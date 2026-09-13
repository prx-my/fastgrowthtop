"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 20;
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-[50] bg-transparent">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[72px] lg:h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <Image
              src="/logo-dark.png"
              alt="Schrader"
              width={140}
              height={31}
              className="h-8 w-auto object-contain transition-opacity group-hover:opacity-80"
              priority
            />
            <span className="text-[12px] text-[#3D5A80] font-medium tracking-[0.02em] hidden sm:block border-l border-[#98C1D9]/70 pl-3">
              Digital Marketing & Automation
            </span>
          </Link>

          {/* Action CTA */}
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#F7931E] hover:bg-[#E07E0B] text-white text-[13px] font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-[var(--radius-md)] shadow-[0_2px_12px_rgba(247,147,30,0.3)] hover:shadow-[0_4px_16px_rgba(247,147,30,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}
