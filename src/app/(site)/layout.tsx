import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import "lenis/dist/lenis.css";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Schrader.co — Digital Marketing & Automation | Traverse City, MI",
  description:
    "Independent creative studio based in Traverse City, Michigan. High-end web design, SEO, lead generation, and automations that bring real business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
