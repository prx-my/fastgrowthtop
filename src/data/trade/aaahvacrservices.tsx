import { HoursList } from "@/components/trade/Faq";
import type { TradeSite } from "@/components/trade/types";

// Business details from aaahvacrservices.com (footer, About, Service area and Membership pages), Nov 2026.
const img = (f: string) => `/hvac/aaahvacrservices/img/${f}`;
const phone = { display: "(423) 430-6766", tel: "+14234306766" };
const googleUrl = "https://maps.google.com/?cid=8976458535968134705";

const hours = [
  "Normal hours: Mon–Fri, 9am–5pm",
  "After-hours (after-hours rates): Mon–Fri 8–9am and 5–10pm; Sat & Sun 8am–10pm",
  "Emergency service: 10pm–8am, every day",
  "Holidays: closed for normal hours, emergency service available",
];

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export const aaaHvac: TradeSite = {
  name: "AAA+ HVAC/R Services LLC",
  logo: { src: img("logo.webp"), width: 149, height: 112, alt: "AAA+ HVAC/R Services LLC" },
  phone,
  email: "aaahvacrservices@gmail.com",
  address: ["53 Memorial Ave, Ste. 955", "Mountain Home, TN 37684"],
  bookingUrl: "https://aaahvacrservices.com/quick-online-booking-hvac-appointments/",
  rating: { score: "4.8", count: 343, url: googleUrl },
  nav: [
    { label: "How it works", href: "#how" },
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "Service area", href: "#area" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    title: <>Heating and AC repair in Johnson City and the <span style={{ whiteSpace: "nowrap" }}>Tri-Cities</span></>,
    lead: "Locally owned HVAC/R company in Mountain Home, serving Johnson City, Kingsport, Bristol, Erwin and nearby Northeast Tennessee. Residential and commercial. All brands.",
    note: "Emergency service 10pm–8am, every day.",
  },
  form: {
    title: "Request service",
    sub: "Tell us what's going on and how to reach you.",
    services: ["No cooling", "No heat", "Maintenance / tune-up", "New system quote", "Commercial refrigeration", "Parts", "Other"],
  },
  how: {
    title: "One local team for every room in your home",
    lead: "Heating, cooling and air quality, from one call. Here's what happens after you reach out.",
    steps: [
      { title: "Call, text or request online", body: "Tell us what's happening and when works for you." },
      { title: "Consultation and estimate", body: "“We always provide a consultation and estimate,” so you know what's needed before work starts." },
      { title: "Fixed by a stocked van", body: "Our GPS-dispatched vans carry parts, and service repairs come with a 30-day parts warranty." },
    ],
    image: { src: img("rooms.svg"), width: 837, height: 588, alt: "Three rooms of a home, each with its own heating and cooling unit set to its own temperature" },
  },
  services: {
    title: "What we fix and install",
    groups: [
      {
        id: "cooling", title: "Cooling", tone: "cool",
        icon: icon("M12 2v20M3.3 7l17.4 10M20.7 7L3.3 17M9 4l3 3 3-3M9 20l3-3 3 3"),
        items: [
          { label: "AC repair" },
          { label: "AC maintenance", note: "Tune-ups of 30, 60 or 90 minutes." },
          { label: "AC installation and replacement" },
          { label: "Central air conditioners and heat pumps" },
          { label: "Ductless and dual-fuel systems" },
          { label: "Humidity services and smart thermostats", note: "Including Wi-Fi thermostats." },
        ],
      },
      {
        id: "heating", title: "Heating", tone: "warm",
        icon: icon("M12 22c4 0 7-2.8 7-6.8 0-3.6-2.5-6-4.2-8.2-.5 2-1.6 3.2-2.8 3.6.3-3.2-1.2-6.3-3.5-8.6C8 6 5 9.4 5 15.2 5 19.2 8 22 12 22z"),
        items: [
          { label: "Heating repair" },
          { label: "Heating maintenance", note: "Tune-ups of 30, 60 or 90 minutes." },
          { label: "Heating installation and replacement" },
          { label: "Furnaces and heat pumps" },
          { label: "Ductless systems and smart thermostats", note: "Including Wi-Fi thermostats." },
          { label: "Fireplaces and PTAC units" },
        ],
      },
      {
        id: "air-quality", title: "Indoor air quality", tone: "neutral",
        icon: icon("M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"),
        items: [
          { label: "Air filtration systems" },
          { label: "Air purifiers" },
          { label: "Air scrubbers" },
          { label: "UV light" },
          { label: "Monthly filter replacement plans" },
        ],
      },
    ],
    extras: [
      { id: "maintenance", title: "Maintenance plans", body: "Silver ($150, 30-minute tune-ups), Gold ($225, 60-minute) and Platinum ($300, 90-minute). Each includes two maintenance visits a year, dates set to suit you, flat-rate pricing and priority scheduling." },
      { id: "refrigeration", title: "Commercial refrigeration", body: "We service commercial refrigeration as well as residential and commercial heating and cooling." },
      { id: "parts", title: "HVAC parts store", body: "Parts sold direct to the public. We also take parts and equipment requests." },
    ],
    closing: "We service all brands, residential and commercial, and install Goodman heat pump systems.",
  },
  proof: {
    title: "Why Tri-Cities homeowners call us",
    creds: [
      "Licensed, insured and certified service technicians",
      "Universal HVAC/R licensed, factory-trained technicians",
      "Certified First American Home Warranty contractor",
      "Background-checked, Tennessee drug-free workplace",
      "Fully stocked, GPS-dispatched service vans",
      "30-day parts warranty on all service repairs",
      "20+ years of HVAC/R experience",
    ],
    // verbatim Google reviews; Google showed relative dates ("3 months ago" on Nov 3, 2026)
    reviews: [
      { quote: "After a frustrating experience with another HVAC company, I called AAA+ HVACR Services for a second opinion, and I'm so glad I did.", author: "Dustin H.", date: "Aug 2026" },
      { quote: "5 star professionalism.. my AC air back on I can breathe again Thank you soooo much.. trusted Company.", author: "Deborah Z.", date: "Aug 2026" },
    ],
    photos: [
      { src: img("install.webp"), width: 800, height: 600, alt: "Goodman outdoor air conditioner condenser unit", caption: "Goodman equipment (product photo).", placeholder: "Replace with real photo: recent install" },
      { src: img("van.webp"), width: 800, height: 600, alt: "White work van with ladders on the roof rack", caption: "Sample photo.", placeholder: "Replace with real photo: AAA+ service van" },
      { src: img("drain-line.webp"), width: 800, height: 600, alt: "Condensate drain line being flushed during an AC maintenance visit", caption: "Drain line maintenance.", placeholder: "Replace with real photo: technician on a job" },
    ],
  },
  area: {
    title: "Serving the Tri-Cities",
    intro: "Our shop is at 53 Memorial Ave in Mountain Home, so our stocked vans reach the Tri-Cities quickly.",
    towns: ["Johnson City, TN", "Kingsport, TN", "Bristol, TN", "Erwin, TN"],
    note: "Plus the surrounding Northeast Tennessee county areas, including ZIP codes 37601, 37604 and 37684.",
    map: {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.10915334669!2d-82.37789790000001!3d36.3096598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885a7ccf7f9e38b1%3A0x7c92c97aa9675631!2sAAA%2B%20HVACR%20Services%20llc!5e0!3m2!1sen!2sin!4v1793725218759!5m2!1sen!2sin",
      title: "Map showing AAA+ HVAC/R Services in Mountain Home, TN",
    },
  },
  faqs: [
    { q: "Do you work on all brands?", a: <p>Yes. We service all brands, residential and commercial.</p> },
    { q: "Which areas do you serve?", a: <p>Johnson City, Kingsport, Bristol and Erwin, TN, plus surrounding Northeast Tennessee county areas (37601, 37604, 37684).</p> },
    {
      q: "Do you offer after-hours or emergency service?",
      a: <><p>Yes. Call or text the dispatcher at <a href={`tel:${phone.tel}`}>{phone.display}</a> for immediate assistance.</p><HoursList hours={hours} /></>,
    },
    { q: "Is there a warranty on repairs?", a: <p>Yes, a 30-day parts warranty on all service repairs.</p> },
    { q: "Do you have maintenance plans?", a: <p>Yes: Silver ($150), Gold ($225) and Platinum ($300) memberships, each with two maintenance visits a year, flat-rate pricing and priority scheduling.</p> },
    { q: "Can I buy HVAC parts from you?", a: <p>Yes. We sell parts directly to the public and take parts and equipment requests.</p> },
    { q: "Are you a home warranty contractor?", a: <p>We are a certified First American Home Warranty contractor.</p> },
  ],
  hours,
  dispatchNote: <>Call or text the dispatcher at <a href={`tel:${phone.tel}`}>{phone.display}</a> for immediate assistance.</>,
  cta: {
    title: "AC or heat not working? Call now.",
    body: <>Call or text the dispatcher at <a href={`tel:${phone.tel}`}>{phone.display}</a> for immediate assistance. Emergency service 10pm–8am, every day.</>,
  },
  footer: {
    services: [
      { label: "Cooling", href: "#cooling" },
      { label: "Heating", href: "#heating" },
      { label: "Indoor air quality", href: "#air-quality" },
      { label: "Maintenance plans", href: "#maintenance" },
      { label: "Commercial refrigeration", href: "#refrigeration" },
    ],
    company: [
      { label: "About", href: "https://aaahvacrservices.com/about-us/" },
      { label: "Service area", href: "#area" },
      { label: "Membership plans", href: "#maintenance" },
      { label: "Parts store", href: "#parts" },
      { label: "Facebook", href: "https://www.facebook.com/AAAHVACRSERVICES" },
    ],
    extra: "Careers: text JOB6766 to 22100",
    bottom: "© 2026 AAA+ HVAC/R Services LLC · Locally owned · Licensed and insured",
  },
};

// after-hours/emergency hours: add only after owner confirms; aggregateRating: add only from verified Google data
export const aaaHvacJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: aaaHvac.name,
  url: "https://aaahvacrservices.com/",
  logo: "https://aaahvacrservices.com/wp-content/uploads/2021/11/AAA-HVAC-Logo-with-transparent-background-1.png",
  image: "https://aaahvacrservices.com/wp-content/uploads/2021/11/AAA-HVAC-Logo-with-transparent-background-1.png",
  telephone: "+1-423-430-6766",
  email: aaaHvac.email,
  address: { "@type": "PostalAddress", streetAddress: "53 Memorial Ave Ste. 955", addressLocality: "Mountain Home", addressRegion: "TN", postalCode: "37684", addressCountry: "US" },
  areaServed: ["Johnson City, TN", "Kingsport, TN", "Bristol, TN", "Erwin, TN"].map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" }],
  sameAs: ["https://www.facebook.com/AAAHVACRSERVICES"],
};
