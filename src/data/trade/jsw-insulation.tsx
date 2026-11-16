import type { TradeSite } from "@/components/trade/types";

// Business details from the Google Business Profile, Facebook page and BBB profile, Nov 2026.
// No website, street address, hours or Google reviews exist yet, so those stay out or are marked for Schrader to confirm.
const img = (f: string) => `/insulation/jsw-insulation/img/${f}`;
const phone = { display: "(231) 920-5777", tel: "+12319205777" };
const facebook = "https://www.facebook.com/profile.php?id=61561305614764";
const towns = ["LeRoy, MI", "Reed City, MI", "Evart, MI", "Marion, MI", "Tustin, MI", "Hersey, MI", "Sears, MI"];

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export const jswInsulation: TradeSite = {
  name: "JSW Construction & Foam Insulation Inc.",
  logo: { src: img("logo.webp"), width: 252, height: 112, alt: "JSW Foam Insulation Inc." },
  phone,
  email: "jswfoam@gmail.com",
  address: ["LeRoy, MI 49655"],
  theme: {
    accent: "#C2410C",
    accentDark: "#9A3412",
    navy: "#1B1F24",
    heroBg: "radial-gradient(60% 80% at 85% 10%,rgba(194,65,12,.38),transparent 70%),radial-gradient(45% 60% at 0% 100%,rgba(255,255,255,.06),transparent 70%),linear-gradient(180deg,#262B31 0%,#1B1F24 100%)",
  },
  nav: [
    { label: "How it works", href: "#how" },
    { label: "Services", href: "#services" },
    { label: "Recent jobs", href: "#reviews" },
    { label: "Service area", href: "#area" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    title: <>Spray foam insulation and pole barns in <span style={{ whiteSpace: "nowrap" }}>Northern Michigan</span></>,
    lead: "Open- and closed-cell spray foam, cellulose attic insulation and pole building construction from LeRoy, serving Osceola County and about 70 miles around. Residential and commercial. Licensed and insured.",
    note: "Call or text for an estimate.",
  },
  form: {
    title: "Request an estimate",
    sub: "Tell us about the building and how to reach you.",
    services: ["Spray foam: pole barn or shop", "Spray foam: home or addition", "Cellulose attic insulation", "Pole building construction", "Concrete flat work", "Addition or remodel", "Other"],
  },
  how: {
    title: "Insulation and the building, from one crew",
    lead: "We insulate pole barns, shops and homes, and we build pole buildings too. Here's how a job goes.",
    steps: [
      { title: "Call, text or request online", body: "Tell us what you're building or insulating, and where." },
      { title: "Walk-through and quote", body: "We look at the space and recommend open-cell, closed-cell or blown-in for it." },
      { title: "Spray, blow or build", body: "Our crew does the work. On a new pole building we can frame it and foam it." },
    ],
    image: { src: img("spraying.webp"), width: 414, height: 414, alt: "JSW crew on a lift spraying closed-cell foam on the walls of a pole building" },
  },
  services: {
    title: "What we insulate and build",
    groups: [
      {
        id: "spray-foam", title: "Spray foam", tone: "warm",
        icon: icon("M4 20h4l9-9-4-4-9 9v4zM13 7l4 4M17 3l4 4M19 3l-1 1M21 5l-1 1"),
        items: [
          { label: "Closed-cell spray foam", note: "Dense, adds an air and moisture barrier. Common on metal-sided pole barns." },
          { label: "Open-cell spray foam", note: "Lighter and lower cost per inch. Fills walls and rooflines and quiets sound." },
          { label: "Pole barns and shops" },
          { label: "Garages" },
          { label: "Homes, additions and new builds" },
          { label: "Commercial buildings" },
        ],
      },
      {
        id: "blown-in", title: "Blown-in insulation", tone: "cool",
        icon: icon("M3 10l9-7 9 7M5 9v11h14V9M8 14h.01M12 13h.01M16 14h.01M10 17h.01M14 17h.01"),
        items: [
          { label: "Cellulose attic insulation" },
          { label: "Loose-fill and blown-in insulation" },
          { label: "Topping up existing attic insulation" },
        ],
      },
      {
        id: "construction", title: "Construction", tone: "neutral",
        icon: icon("M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6"),
        items: [
          { label: "Pole building construction" },
          { label: "Garage buildings" },
          { label: "Concrete flat work" },
          { label: "Additions" },
          { label: "Remodeling" },
          { label: "General contracting" },
        ],
      },
    ],
    extras: [
      { id: "pole-barns", title: "Pole barns, start to finish", body: "We build pole buildings and spray-foam them, so one crew handles the frame, the concrete and the insulation." },
      { id: "residential", title: "Residential", body: "Homes, additions, garages and attics, from new construction to older houses that need more insulation." },
      { id: "commercial", title: "Commercial", body: "Shops, storage and commercial buildings, insulated with open- or closed-cell foam to suit how they're used." },
    ],
    closing: "Licensed and insured for residential and commercial work. In business since 2017.",
  },
  proof: {
    title: "Recent pole barn and shop jobs",
    creds: [
      "Licensed and insured",
      "Residential and commercial",
      "In business since 2017",
      "A+ rating with the BBB",
      "Open-cell, closed-cell and cellulose",
      "Builds pole buildings, not just insulates them",
    ],
    reviews: [],
    photos: [
      { src: img("barn-walls.webp"), width: 414, height: 414, alt: "Pole building with closed-cell spray foam on every wall", caption: "Closed-cell foam on pole barn walls." },
      { src: img("barn-wide.webp"), width: 414, height: 414, alt: "Large pole building interior with foamed walls and open trusses", caption: "Large pole building, walls foamed." },
      { src: img("open-bay.webp"), width: 414, height: 414, alt: "Open bay of a pole building with foamed walls and ceiling purlins", caption: "Open-bay shop, ready for doors." },
      { src: img("barn-gable.webp"), width: 414, height: 414, alt: "Pole building gable end and walls covered in spray foam", caption: "Gable end and side walls." },
      { src: img("house-framing.webp"), width: 414, height: 414, alt: "Framed interior walls with spray foam on the exterior wall", caption: "Interior framing, foam on the outside wall." },
      { src: img("barn-trusses.webp"), width: 414, height: 414, alt: "Wide pole building interior under trusses, walls foamed", caption: "Shop interior under the trusses." },
    ],
  },
  area: {
    title: "Serving Osceola County and Northern Michigan",
    intro: "We're based in LeRoy and work within about 70 miles, from Reed City and Evart out across Northern Michigan.",
    towns,
    note: "Roughly a 70-mile radius from LeRoy.",
    map: {
      src: "https://maps.google.com/maps?q=LeRoy,+MI+49655&z=9&output=embed",
      title: "Map of LeRoy, Michigan and the surrounding area",
    },
  },
  faqs: [
    { q: "Open-cell or closed-cell: which do I need?", a: <p>Closed-cell is denser, adds an air and moisture barrier and stiffens the wall, which is why it's common on metal-sided pole barns. Open-cell is lighter, costs less per inch and is good for walls and rooflines inside heated homes. We'll recommend one when we see the building.</p> },
    { q: "Do you insulate pole barns and shops?", a: <p>Yes. Pole barns, shops and garages are most of our spray foam work.</p> },
    { q: "Can you build the pole barn too?", a: <p>Yes. We build pole buildings and garage buildings, pour concrete flat work, and insulate them.</p> },
    { q: "Do you do attic insulation?", a: <p>Yes, blown-in cellulose and loose-fill attic insulation.</p> },
    { q: "Which areas do you serve?", a: <p>LeRoy, Reed City, Evart, Marion, Tustin, Hersey, Sears and the rest of Osceola County, within about 70 miles of LeRoy.</p> },
    { q: "Are you licensed and insured?", a: <p>Yes, for residential and commercial work.</p> },
    { q: "How do I get an estimate?", a: <p>Call or text <a href={`tel:${phone.tel}`}>{phone.display}</a>, email <a href="mailto:jswfoam@gmail.com">jswfoam@gmail.com</a>, or use the form at the top of this page.</p> },
  ],
  hours: ["Call or text for an estimate"],
  dispatchNote: <>Call or text <a href={`tel:${phone.tel}`}>{phone.display}</a> or email <a href="mailto:jswfoam@gmail.com">jswfoam@gmail.com</a>.</>,
  cta: {
    title: "Ready to insulate or build? Get a quote.",
    body: <>Call or text <a href={`tel:${phone.tel}`}>{phone.display}</a> and tell us about the building.</>,
  },
  footer: {
    services: [
      { label: "Spray foam", href: "#spray-foam" },
      { label: "Blown-in insulation", href: "#blown-in" },
      { label: "Pole barns", href: "#pole-barns" },
      { label: "Construction", href: "#construction" },
      { label: "Commercial", href: "#commercial" },
    ],
    company: [
      { label: "Recent jobs", href: "#reviews" },
      { label: "Service area", href: "#area" },
      { label: "FAQ", href: "#faq" },
      { label: "Facebook", href: facebook },
    ],
    bottom: "© 2026 JSW Construction & Foam Insulation Inc. · LeRoy, Michigan · Licensed and insured",
  },
};

export const jswInsulationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: jswInsulation.name,
  telephone: "+1-231-920-5777",
  email: jswInsulation.email,
  foundingDate: "2017",
  address: { "@type": "PostalAddress", addressLocality: "LeRoy", addressRegion: "MI", postalCode: "49655", addressCountry: "US" },
  areaServed: towns.map((name) => ({ "@type": "City", name })),
  sameAs: [facebook],
};
