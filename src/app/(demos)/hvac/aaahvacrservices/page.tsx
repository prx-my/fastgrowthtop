import type { Metadata } from "next";
import { TradeSitePage } from "@/components/trade/TradeSitePage";
import { aaaHvac, aaaHvacJsonLd } from "@/data/trade/aaahvacrservices";

const description =
  "Locally owned HVAC/R company in Mountain Home serving Johnson City, Kingsport, Bristol & Erwin. All brands, residential & commercial. Call (423) 430-6766.";

export const metadata: Metadata = {
  title: "AC & Heating Repair in Johnson City, TN | AAA+ HVAC/R",
  description,
  alternates: { canonical: "https://aaahvacrservices.com/" },
  icons: { icon: "/hvac/aaahvacrservices/img/logo.webp" },
  openGraph: {
    type: "website",
    url: "https://aaahvacrservices.com/",
    title: "AC & Heating Repair in Johnson City, TN | AAA+ HVAC/R",
    description,
    images: ["https://aaahvacrservices.com/wp-content/uploads/2021/11/AAA-HVAC-Logo-with-transparent-background-1.png"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aaaHvacJsonLd).replace(/</g, "\\u003c") }}
      />
      <TradeSitePage site={aaaHvac} />
    </>
  );
}
