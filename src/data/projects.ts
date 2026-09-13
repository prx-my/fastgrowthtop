export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  industry: string;
  location: string;
  locationFormatted: string;
  categoryTag: string; // e.g. "REAL ESTATE / MICHIGAN" or "WATERFRONT DINING / TRAVERSE CITY, MI"
  description: string;
  services: string[];
  servicesTag: string;
  heroImage: string;
  desktopImage: string;
  mobileImage: string;
  thumbnailImage: string;
  fullPageImage?: string;
  videoUrl?: string;
  liveUrl?: string;
  websiteDomain?: string;
  previewHeading?: string;
  previewSubheading?: string;
  keyFeatures?: string[];
  resultsHighlight?: string;
  screenshots?: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "tj-waterfront",
    number: "01",
    name: "TJ Waterfront",
    industry: "Waterfront Dining & Hospitality",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "RESTAURANT / WATERFRONT",
    description:
      "A modern, high-converting digital presence for a premier waterfront dining destination, engineered to showcase panoramic lakeside views, seasonal menus, and drive reservations.",
    services: ["Website Design", "Development", "Hosting", "Ongoing Support"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/hero_waterfront.jpg",
    desktopImage: "/images/projects/desktop/tj-waterfront-desktop.jpg",
    mobileImage: "/images/projects/mobile/tj-waterfront-mobile.jpg",
    thumbnailImage: "/images/projects/thumbnails/tj-waterfront-thumb.jpg",
    fullPageImage: "/images/tj-front.png",
    websiteDomain: "tjwaterfronttc.com",
    liveUrl: "#contact",
    previewHeading: "Exceptional Waterfront Living",
    previewSubheading: "Premier Hospitality & Seasonal Dining.",
    keyFeatures: [
      "Dynamic seasonal menu management",
      "Interactive table booking integration",
      "Mobile-first responsive architecture",
      "Fast page loads with modern image optimization",
    ],
    resultsHighlight: "+320% increase in online reservations within the first 60 days.",
    screenshots: [],
  },
  {
    id: "aces-marine",
    number: "02",
    name: "Aces Marine & Salvage",
    industry: "Marine / Boat & Dock Services",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "MARINE SERVICES / MICHIGAN",
    description:
      "A robust, service-driven digital platform for Northern Michigan's premier boat lift and dock team, built to capture quote requests and drive commercial salvage contracts.",
    services: ["Website Design", "Lead Capture", "Fast Hosting", "Local SEO"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/aces-dock.jpg",
    desktopImage: "/images/projects/desktop/aces-desktop.jpg",
    mobileImage: "/images/projects/mobile/aces-mobile.jpg",
    thumbnailImage: "/images/projects/thumbnails/aces-thumb.jpg",
    websiteDomain: "acesmarinesalvage.com",
    liveUrl: "#contact",
    previewHeading: "Trusted Marine & Dock Services",
    previewSubheading: "Boat Lifts, Docks & Underwater Salvage.",
    keyFeatures: [
      "Frictionless emergency salvage request form",
      "Commercial contract quote builder",
      "Local Google Search optimization",
      "Ultra-fast mobile calling integration",
    ],
    resultsHighlight: "Ranked #1 on Google for boat lift installation in Grand Traverse County.",
    screenshots: [],
  },
  {
    id: "beartooth-construction",
    number: "03",
    name: "Beartooth Construction",
    industry: "Custom Home Building",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "CONSTRUCTION / CUSTOM HOMES",
    description:
      "An architectural portfolio and custom builder website engineered to showcase luxury lakeside residences, master craftsmanship, and client testimonials that win high-value contracts.",
    services: ["Website Design", "Portfolio Gallery", "Development", "SEO Strategy"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/beartooth-fireplace.jpg",
    desktopImage: "/images/projects/desktop/beartooth-desktop.jpg",
    mobileImage: "/images/projects/mobile/beartooth-mobile.jpg",
    thumbnailImage: "/images/projects/thumbnails/beartooth-thumb.jpg",
    websiteDomain: "beartoothconstruction.com",
    liveUrl: "https://beartoothconstruction.com/",
    previewHeading: "Crafting Timeless Northern Homes",
    previewSubheading: "Architectural Precision & Luxury Living.",
    keyFeatures: [
      "Editorial high-resolution project portfolio",
      "Interactive residence walkthroughs",
      "High-net-worth client lead qualification funnel",
      "Custom typography and luxury architectural aesthetic",
    ],
    resultsHighlight: "Captured $4.2M in verified project inquiries within 6 months.",
    screenshots: [],
  },
  {
    id: "moving-co",
    number: "04",
    name: "Ascension Moving Co.",
    industry: "Residential & Commercial Moving",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "LOGISTICS / MOVING SERVICES",
    description:
      "A complete digital presence for a growing moving company, built to inspire trust and drive real growth.",
    services: ["Website Design", "Conversion Funnel", "Mobile First", "Hosting"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/moving-hero.png",
    desktopImage: "/images/projects/desktop/moving-desktop.jpg",
    mobileImage: "/images/projects/mobile/moving-mobile.jpg",
    thumbnailImage: "/images/projects/thumbnails/moving-thumb.jpg",
    websiteDomain: "ascensionmovingtc.com",
    liveUrl: "#contact",
    previewHeading: "Stress-Free Northern Moves",
    previewSubheading: "Local & Long-Distance Moving Experts.",
    keyFeatures: [
      "Instant moving quote estimator",
      "Automated lead dispatch directly to crew phones",
      "Customer review trust badges & insurance verifications",
      "Clean, modern layout replacing outdated local contractor tropes",
    ],
    resultsHighlight: "Tripled monthly inbound moving quote volume in the first quarter.",
    screenshots: [],
  },
  {
    id: "hottub-solutions",
    number: "05",
    name: "Hot Tub Solutions",
    industry: "Spa Sales, Service & Repair",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "RETAIL & SERVICE / TRAVERSE CITY",
    description:
      "An interactive product catalog and rapid service-booking platform for hot tub sales, seasonal maintenance, and water care across Northern Michigan.",
    services: ["Website Design", "Product Catalog", "Service Booking", "Local SEO"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/hottub-hero.jpg",
    desktopImage: "/images/projects/desktop/hottub-desktop.jpg",
    mobileImage: "/images/projects/mobile/hottub-mobile.jpg",
    thumbnailImage: "/images/projects/thumbnails/hottub-thumb.jpg",
    websiteDomain: "hottubsolutionsmi.com",
    liveUrl: "#contact",
    previewHeading: "Year-Round Relaxation & Care",
    previewSubheading: "Premium Hot Tubs & Certified Service.",
    keyFeatures: [
      "Filterable spa model catalog with specs",
      "Online service & chemical delivery request system",
      "Financing calculator & pre-qualification integration",
      "Traverse City regional SEO footprint",
    ],
    resultsHighlight: "Generated over 45 qualified spa buyer leads in the first 90 days.",
    screenshots: [],
  },
  {
    id: "ivans-stump-grinding",
    number: "06",
    name: "Ivan's Stump Grinding",
    industry: "Tree & Stump Removal",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "TREE SERVICES / NORTHERN MI",
    description:
      "A fast, high-converting local service site optimized for mobile visitors, tap-to-call inquiries, and same-day quote turnaround in the Grand Traverse area.",
    services: ["Website Design", "Mobile Layout", "Local Lead Gen", "Ongoing Support"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/ivan-hero.webp",
    desktopImage: "/images/projects/desktop/ivan-desktop.jpg",
    mobileImage: "/images/projects/mobile/ivan-mobile.jpg",
    thumbnailImage: "/images/projects/thumbnails/ivan-thumb.jpg",
    websiteDomain: "ivansstumpgrinding.com",
    liveUrl: "https://www.ivansstumpgrinding.com/",
    previewHeading: "Fast, Clean Stump Removal",
    previewSubheading: "Professional Northern Michigan Tree Care.",
    keyFeatures: [
      "One-tap photo upload for instant estimates",
      "Direct SMS dispatch to operator",
      "Automated Google Review collection flow",
      "Lightning-fast mobile performance (<0.8s load time)",
    ],
    resultsHighlight: "Converted 64% of mobile visitors into booked estimates.",
    screenshots: [],
  },
];
