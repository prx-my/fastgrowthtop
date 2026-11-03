import { Inter, Newsreader } from "next/font/google";
import "@/components/trade/trade.css";

// Client demo sites get their own root layout: no agency styles, Tailwind reset or smooth-scroll library.
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Newsreader({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export default function DemosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
