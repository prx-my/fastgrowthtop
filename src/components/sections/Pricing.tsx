"use client";

import { useState } from "react";
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Plan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  scopeLabel: string;
  description: string;
  priceDisplay: string;
  priceNote: string;
  coreFeatures: string[];
  expandedFeatures: string[];
  ctaText: string;
  ctaHref: string;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    scopeLabel: "3–5 Pages",
    description:
      "A clean, fast website that looks great on every phone and turns visitors into phone calls.",
    priceDisplay: "$599",
    priceNote: "One-time payment · Turnkey launch",
    coreFeatures: [
      "3 to 5 custom-designed pages",
      "Lightning-fast loading on phones & computers",
      "Easy quote request & contact form",
      "Google Maps & business location setup",
    ],
    expandedFeatures: [
      "Secure hosting & domain setup included",
      "Built-in Google search setup (SEO)",
      "Direct 1-on-1 collaboration with me",
      "2 weeks of free edits after launch",
    ],
    ctaText: "Get Started",
    ctaHref: "#contact",
  },
  {
    id: "growth",
    name: "Growth Engine",
    badge: "Most Popular",
    isPopular: true,
    scopeLabel: "10–12 Pages",
    description:
      "Built to help you rank higher on Google, show off all your services, and bring in steady leads.",
    priceDisplay: "$1,499",
    priceNote: "One-time payment · Most popular",
    coreFeatures: [
      "Up to 12 pages for your services & areas",
      "Local Google ranking & profile optimization",
      "Instant text (SMS) & email alerts for new leads",
      "Interactive booking or instant quote calculator",
    ],
    expandedFeatures: [
      "Automated system to get more 5-star Google reviews",
      "Connects to your calendar & customer software",
      "High-resolution photo & project galleries",
      "30 days of priority edits & support after launch",
    ],
    ctaText: "Choose Growth Engine",
    ctaHref: "#contact",
  },
  {
    id: "custom",
    name: "Custom Plan",
    badge: "Tailored Scope",
    scopeLabel: "Custom Scope",
    description:
      "For established companies that need custom features, customer portals, or multi-location setups.",
    priceDisplay: "Custom",
    priceNote: "Tailored quote · Based on your project",
    coreFeatures: [
      "As many pages and sections as you need",
      "Custom client portals, booking, or calculators",
      "Connects directly with your business tools",
      "Direct phone & messaging access with me",
    ],
    expandedFeatures: [
      "Multi-location setup for growing businesses",
      "Custom product catalogs or filterable galleries",
      "Simple visitor & lead tracking reports",
      "Dedicated rollout plan tailored to your timeline",
    ],
    ctaText: "Talk About Your Project",
    ctaHref: "#contact",
  },
];

const guarantees = [
  {
    icon: Zap,
    title: "Guaranteed Fast",
    desc: "Loads instantly on mobile so you never lose an impatient customer.",
  },
  {
    icon: UserCheck,
    title: "Work Directly With Me",
    desc: "No middlemen or junior handoffs. You talk straight to the person building it.",
  },
  {
    icon: ShieldCheck,
    title: "100% Yours Forever",
    desc: "No monthly platform lock-ins. You own your website, code, and content entirely.",
  },
];

export function Pricing() {
  const ref = useScrollReveal();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleAllExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section
      id="pricing"
      className="pt-2 pb-16 lg:pt-4 lg:pb-24 relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle atmospheric accents */}
      <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-[#98C1D9]/25 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-[#F7931E]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Expanded canvas width */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <h2 className="reveal text-section-heading mb-4">
            Simple, clear pricing.
          </h2>

          <p className="reveal reveal-delay-1 text-body-large text-[#3D5A80] max-w-2xl mx-auto">
            Everything you need to get more customers online, with zero monthly platform fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 xl:gap-8 items-stretch mb-8">
          {plans.map((plan, index) => {
            const totalFeaturesCount =
              plan.coreFeatures.length + plan.expandedFeatures.length;

            return (
              <div
                key={plan.id}
                className={`reveal reveal-delay-${(index % 3) + 1} flex flex-col`}
              >
                <div
                  className={`card h-full flex flex-col justify-between p-7 sm:p-8 xl:p-9 relative rounded-[var(--radius-lg)] transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-white border-2 border-[#F7931E] shadow-[0_12px_36px_rgba(247,147,30,0.14)] lg:-translate-y-1.5 hover:shadow-[0_16px_44px_rgba(247,147,30,0.2)]"
                      : "bg-white/95 border border-[#98C1D9] hover:border-[#293241]/50 shadow-[0_4px_24px_rgba(41,50,65,0.05)]"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 bg-[#F7931E] text-white text-[11px] font-bold uppercase tracking-[0.1em] px-3.5 py-1 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Top Section */}
                  <div>
                    {/* Card Top: Name, Scope Pill, Desc */}
                    <div className="mb-5 pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-[24px] lg:text-[26px] text-[#293241] font-medium">
                          {plan.name}
                        </h3>
                        <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-[#E0FBFC] text-[#3D5A80] border border-[#98C1D9]/60">
                          {plan.scopeLabel}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#3D5A80] leading-[1.6]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="mb-6 pb-6 border-b border-[#98C1D9]/40">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-[42px] lg:text-[46px] xl:text-[48px] font-medium text-[#293241] tracking-tight leading-none">
                          {plan.priceDisplay}
                        </span>
                        <span className="text-[14px] font-medium text-[#3D5A80]/80">
                          {plan.priceDisplay === "Custom" ? "quote" : "flat fee"}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#3D5A80]/75 mt-2 font-medium">
                        {plan.priceNote}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mb-7">
                      <a
                        href={plan.ctaHref}
                        className={
                          plan.isPopular
                            ? "btn-primary w-full justify-center text-[14px] py-3.5"
                            : "btn-secondary w-full justify-center text-[14px] py-3.5"
                        }
                      >
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="w-4 h-4 arrow-icon" />
                      </a>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[12px] font-semibold text-[#293241]">
                          What&apos;s Included
                        </span>
                        <span className="text-[11px] text-[#3D5A80]/75">
                          {isExpanded
                            ? `Showing all ${totalFeaturesCount} items`
                            : `Key ${plan.coreFeatures.length} of ${totalFeaturesCount} items`}
                        </span>
                      </div>

                      {/* Core Features */}
                      <ul className="flex flex-col gap-3">
                        {plan.coreFeatures.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                plan.isPopular
                                  ? "bg-[#F7931E]/15 text-[#F7931E]"
                                  : "bg-[#98C1D9]/30 text-[#3D5A80]"
                              }`}
                            >
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="text-[13.5px] leading-[1.5] text-[#293241]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Additional Perks */}
                      {isExpanded && (
                        <div className="mt-4 pt-3.5 border-t border-[#98C1D9]/30">
                          <span className="text-[11px] font-semibold text-[#3D5A80] block mb-2.5">
                            Also Included:
                          </span>
                          <ul className="flex flex-col gap-3">
                            {plan.expandedFeatures.map((feature, eIdx) => (
                              <li key={eIdx} className="flex items-start gap-3">
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    plan.isPopular
                                      ? "bg-[#F7931E]/15 text-[#F7931E]"
                                      : "bg-[#98C1D9]/30 text-[#3D5A80]"
                                  }`}
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                </div>
                                <span className="text-[13.5px] leading-[1.5] text-[#3D5A80]">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Card-level Toggle */}
                    <div className="mt-5 pt-3 border-t border-[#98C1D9]/25">
                      <button
                        type="button"
                        onClick={toggleAllExpansion}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3D5A80] hover:text-[#293241] transition-colors cursor-pointer group"
                      >
                        <span>
                          {isExpanded
                            ? "Hide details"
                            : `See all ${totalFeaturesCount} items`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-[#F7931E]" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-[#F7931E]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Central Expand/Collapse Button Bar */}
        <div className="reveal flex justify-center mb-14">
          <button
            type="button"
            onClick={toggleAllExpansion}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#98C1D9] hover:border-[#293241] text-[#293241] text-[13.5px] font-semibold shadow-sm hover:shadow transition-all cursor-pointer group"
          >
            <span>
              {isExpanded
                ? "Collapse full details across all plans"
                : "Compare all deliverables across all 3 plans"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#F7931E] transition-transform group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#F7931E] transition-transform group-hover:translate-y-0.5" />
            )}
          </button>
        </div>


        {/* Custom Scope Footer Note */}
        <div className="reveal text-center">
          <p className="text-[14px] text-[#3D5A80]">
            Have questions about what your business needs?{" "}
            <a
              href="#contact"
              className="text-[#293241] font-semibold underline underline-offset-4 hover:text-[#F7931E] transition-colors"
            >
              Send a quick message →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
