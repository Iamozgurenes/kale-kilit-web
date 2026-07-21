import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Kale Kilit",
    description:
      "Adana çilingir ve anahtarcı: 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova / Adana.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1a33",
    lang: "tr",
    icons: [
      {
        src: "/logoico.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
