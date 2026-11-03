import type { CSSProperties } from "react";
import { Faq } from "./Faq";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Proof } from "./Proof";
import { Section } from "./Section";
import { ServiceArea } from "./ServiceArea";
import { Services } from "./Services";
import { CtaBand, SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import type { TradeSite } from "./types";

/** The standard trade demo page. A new client only needs a TradeSite data file; compose the sections by hand for a custom order. */
export function TradeSitePage({ site }: { site: TradeSite }) {
  const theme = {
    "--red": site.theme?.accent,
    "--red-dark": site.theme?.accentDark,
    "--navy": site.theme?.navy,
  } as CSSProperties;

  return (
    <div className="trade" style={theme}>
      <a className="skip" href="#main">Skip to main content</a>
      <div className="note"><div className="wrap">Concept mockup prepared by Schrader Web Solutions. Not the live site.</div></div>
      <SiteHeader site={site} />
      <main id="main">
        <Section className="hero" tone="navy" waveTo="linen" labelledBy="hero-title"><Hero site={site} /></Section>
        <Section id="how" tone="linen" waveTo="white" flip labelledBy="how-title"><HowItWorks site={site} /></Section>
        <Section id="services" waveTo="linen" labelledBy="services-title"><Services site={site} /></Section>
        <Section id="reviews" tone="linen" waveTo="tint" flip labelledBy="reviews-title"><Proof site={site} /></Section>
        <Section id="area" tone="tint" waveTo="navy" labelledBy="area-title">
          <ServiceArea site={site} />
          <Faq site={site} />
        </Section>
      </main>
      <div className="dark">
        <CtaBand site={site} />
        <SiteFooter site={site} />
      </div>
    </div>
  );
}
