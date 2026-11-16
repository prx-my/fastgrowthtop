// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// Static build straight into the Next app's public folder; next.config.js rewrites the URL to its index.html.
export default defineConfig({
  site: "https://fastgrowth.top",
  base: "/insulation/jsw-insulation",
  outDir: "../../public/insulation/jsw-insulation",
  build: { inlineStylesheets: "always" },
  fonts: [
    {
      name: "Open Sans",
      cssVariable: "--font-open-sans",
      provider: fontProviders.local(),
      fallbacks: ["Arial", "sans-serif"],
      options: {
        variants: [
          { src: ["@fontsource-variable/open-sans/files/open-sans-latin-wght-normal.woff2"], weight: "300 800", style: "normal", display: "swap" },
        ],
      },
    },
  ],
});
