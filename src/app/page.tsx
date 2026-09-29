import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { SiteAudit } from "@/components/sections/SiteAudit";
import { RecentWork } from "@/components/sections/RecentWork";
import { Reviews } from "@/components/sections/Reviews";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { getWorkProjects } from "@/lib/workProjects";

export default function Home() {
  const workProjects = getWorkProjects();

  return (
    <div className="min-h-screen flex flex-col bg-[#E0FBFC]">
      <Header />
      <main className="flex-grow">
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — Audit */}
        <div id="audit">
          <SiteAudit />
        </div>

        {/* 04 — Recent Work */}
        <RecentWork initialProjects={workProjects} />


        {/* 06 — Google Reviews */}
        <Reviews />

        {/* 07 — Pricing */}
        <Pricing />

        {/* 08 — Contact */}
        <Contact />
      </main>

      {/* 08 — Footer */}
      <Footer />
    </div>
  );
}
