export interface ProjectPage {
  title: string;
  image: string;
  label?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  industry: string;
  location: string;
  locationFormatted: string;
  categoryTag: string;
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
  pages: ProjectPage[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "grace-electric",
    number: "01",
    name: "Grace Electric",
    industry: "Residential & Commercial Electrical",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "ELECTRICAL / NORTHERN MI",
    description:
      "Michigan's trusted electrical experts. A modern digital platform engineered to capture residential and commercial service calls, emergency requests, and quote estimates across Grand Traverse and surrounding counties.",
    services: ["Website Design", "Lead Capture", "Fast Hosting", "Local SEO"],
    servicesTag: "WEB DESIGN · DEVELOPMENT · DEPLOYMENT",
    heroImage: "/images/projects/desktop/grace-desktop.webp",
    desktopImage: "/images/projects/desktop/grace-desktop.webp",
    mobileImage: "/images/projects/grace-hero.webp",
    thumbnailImage: "/images/projects/desktop/grace-desktop.webp",
    websiteDomain: "graceelectricmi.com",
    liveUrl: "#contact",
    previewHeading: "Northern Michigan's Trusted Electricians",
    previewSubheading: "Residential & Commercial Electrical Service.",
    keyFeatures: [
      "Frictionless online estimate request funnel",
      "Instant phone & emergency dispatch integration",
      "Local service area SEO targeting Northern Michigan",
      "Mobile-optimized technician booking flow",
    ],
    resultsHighlight: "+280% increase in inbound estimate requests within 45 days.",
    pages: [
      {
        title: "Home",
        image: "/images/projects/desktop/grace-desktop.webp",
        label: "Estimate & Overview",
      },
      {
        title: "Services",
        image: "/images/projects/desktop/grace-residential.webp",
        label: "Residential Services",
      },
      {
        title: "Contact",
        image: "/images/projects/desktop/grace-contact.webp",
        label: "Request Estimate",
      },
    ],
  },
  {
    id: "tj-waterfront",
    number: "02",
    name: "TJ Waterfront",
    industry: "Waterfront Dining & Hospitality",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "RESTAURANT / WATERFRONT",
    description:
      "A modern, high-converting digital presence for a premier waterfront dining destination, engineered to showcase panoramic lakeside views, seasonal menus, and drive reservations.",
    services: ["Website Design", "Development", "Hosting", "Ongoing Support"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/hero_waterfront.webp",
    desktopImage: "/images/projects/desktop/tj-waterfront-desktop.webp",
    mobileImage: "/images/projects/mobile/tj-waterfront-mobile.webp",
    thumbnailImage: "/images/projects/thumbnails/tj-waterfront-thumb.webp",
    fullPageImage: "/images/tj-front.webp",
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
    pages: [
      {
        title: "Home",
        image: "/images/projects/desktop/tj-waterfront-desktop.webp",
        label: "Overview & Booking",
      },
      {
        title: "Lakeside",
        image: "/images/hero_waterfront.webp",
        label: "Waterfront Dining",
      },
      {
        title: "Experience",
        image: "/images/tj-front.webp",
        label: "Full Menu Experience",
      },
    ],
  },
  {
    id: "aces-marine",
    number: "03",
    name: "Aces Marine & Salvage",
    industry: "Marine / Boat & Dock Services",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "MARINE SERVICES / MICHIGAN",
    description:
      "A robust, service-driven digital platform for Northern Michigan's premier boat lift and dock team, built to capture quote requests and drive commercial salvage contracts.",
    services: ["Website Design", "Lead Capture", "Fast Hosting", "Local SEO"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/aces-dock.webp",
    desktopImage: "/images/projects/desktop/aces-desktop.webp",
    mobileImage: "/images/projects/mobile/aces-mobile.webp",
    thumbnailImage: "/images/projects/thumbnails/aces-thumb.webp",
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
    pages: [
      {
        title: "Home",
        image: "/images/projects/desktop/aces-desktop.webp",
        label: "Dock & Marine Platform",
      },
      {
        title: "Boat Lifts",
        image: "/images/projects/aces-dock.webp",
        label: "Lift Installation",
      },
      {
        title: "Salvage",
        image: "/images/projects/aces-hero.webp",
        label: "Commercial Contracts",
      },
    ],
  },
  {
    id: "beartooth-construction",
    number: "04",
    name: "Beartooth Construction",
    industry: "Custom Home Building",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "CONSTRUCTION / CUSTOM HOMES",
    description:
      "An architectural portfolio and custom builder website engineered to showcase luxury lakeside residences, master craftsmanship, and client testimonials that win high-value contracts.",
    services: ["Website Design", "Portfolio Gallery", "Development", "SEO Strategy"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/beartooth-fireplace.webp",
    desktopImage: "/images/projects/desktop/beartooth-desktop.webp",
    mobileImage: "/images/projects/mobile/beartooth-mobile.webp",
    thumbnailImage: "/images/projects/thumbnails/beartooth-thumb.webp",
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
    pages: [
      {
        title: "Portfolio",
        image: "/images/projects/desktop/beartooth-desktop.webp",
        label: "Luxury Residences",
      },
      {
        title: "Craft",
        image: "/images/projects/beartooth-fireplace.webp",
        label: "Architectural Details",
      },
      {
        title: "Residences",
        image: "/images/projects/beartooth-hero.webp",
        label: "Timeless Custom Homes",
      },
    ],
  },
  {
    id: "moving-co",
    number: "05",
    name: "Ascension Moving Co.",
    industry: "Residential & Commercial Moving",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "LOGISTICS / MOVING SERVICES",
    description:
      "A frictionless, mobile-first booking experience for residential and commercial relocation, featuring instant quote estimation and automated lead dispatch.",
    services: ["Website Design", "Conversion Funnel", "Mobile First", "Hosting"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/moving-hero.webp",
    desktopImage: "/images/projects/desktop/moving-desktop.webp",
    mobileImage: "/images/projects/mobile/moving-mobile.webp",
    thumbnailImage: "/images/projects/thumbnails/moving-thumb.webp",
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
    pages: [
      {
        title: "Home",
        image: "/images/projects/desktop/moving-desktop.webp",
        label: "Instant Quote Estimator",
      },
      {
        title: "Booking",
        image: "/images/projects/moving-hero.webp",
        label: "Relocation Funnel",
      },
      {
        title: "Fleet",
        image: "/images/projects/desktop/moving-about.webp",
        label: "Northern Michigan Crew",
      },
    ],
  },
  {
    id: "hottub-solutions",
    number: "06",
    name: "Hot Tub Solutions",
    industry: "Spa Sales, Service & Repair",
    location: "Traverse City, MI",
    locationFormatted: "TRAVERSE CITY, MICHIGAN",
    categoryTag: "RETAIL & SERVICE / TRAVERSE CITY",
    description:
      "An interactive product catalog and rapid service-booking platform for hot tub sales, seasonal maintenance, and water care across Northern Michigan.",
    services: ["Website Design", "Product Catalog", "Service Booking", "Local SEO"],
    servicesTag: "WEB DESIGN · DEVELOPMENT",
    heroImage: "/images/projects/hottub-hero.webp",
    desktopImage: "/images/projects/desktop/hottub-desktop.webp",
    mobileImage: "/images/projects/mobile/hottub-mobile.webp",
    thumbnailImage: "/images/projects/thumbnails/hottub-thumb.webp",
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
    pages: [
      {
        title: "Catalog",
        image: "/images/projects/desktop/hottub-desktop.webp",
        label: "Spa Models & Specs",
      },
      {
        title: "Gold Series",
        image: "/images/projects/desktop/hottub-gold.webp",
        label: "Luxury Spa Collection",
      },
      {
        title: "Service",
        image: "/images/projects/desktop/hottub-about.webp",
        label: "Maintenance & Care",
      },
    ],
  },
];
