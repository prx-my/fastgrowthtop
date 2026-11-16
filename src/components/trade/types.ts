import type { ReactNode } from "react";

export type Phone = { display: string; tel: string };
export type NavLink = { label: string; href: string };
export type Img = { src: string; width: number; height: number; alt: string };

/** Everything a trade-business demo page needs; one object per client in src/data/trade/. */
export type TradeSite = {
  name: string;
  logo: Img;
  phone: Phone;
  email: string;
  address: string[];
  bookingUrl?: string;
  /** Brand colours; anything left out keeps the stylesheet default. */
  theme?: { accent?: string; accentDark?: string; navy?: string };
  rating: { score: string; count: number; url: string };
  nav: NavLink[];
  hero: { title: ReactNode; lead: string; note: string };
  form: { title: string; sub: string; services: string[] };
  how: { title: string; lead: string; steps: { title: string; body: ReactNode }[]; image: Img };
  services: {
    title: string;
    groups: { id: string; title: string; tone: "cool" | "warm" | "neutral"; icon: ReactNode; items: { label: string; note?: string }[] }[];
    extras: { id: string; title: string; body: string }[];
    closing: string;
  };
  proof: {
    title: string;
    creds: string[];
    reviews: { quote: string; author: string; date: string }[];
    photos: (Img & { caption: string; placeholder?: string })[];
  };
  area: { title: string; intro: string; towns: string[]; note?: string; map: { src: string; title: string } };
  faqs: { q: string; a: ReactNode }[];
  hours: string[];
  dispatchNote: ReactNode;
  cta: { title: string; body: ReactNode };
  footer: { services: NavLink[]; company: NavLink[]; extra?: string; bottom: string };
};
