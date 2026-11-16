import type { Metadata } from "next";
import { TradeSitePage } from "@/components/trade/TradeSitePage";
import { jswInsulation, jswInsulationJsonLd } from "@/data/trade/jsw-insulation";

const title = "Spray Foam Insulation & Pole Barns in LeRoy, MI | JSW Foam Insulation";
const description =
  "Open- and closed-cell spray foam, cellulose attic insulation and pole building construction in LeRoy, Reed City, Evart and Osceola County. Call (231) 920-5777.";

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/insulation/jsw-insulation/img/logo.webp" },
  openGraph: { type: "website", title, description },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jswInsulationJsonLd).replace(/</g, "\\u003c") }}
      />
      <TradeSitePage site={jswInsulation} />
    </>
  );
}
