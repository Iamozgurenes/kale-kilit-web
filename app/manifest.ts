import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms/queries";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteSettings();
  return {
    name: site.name,
    short_name: "Kale Kilit",
    description: site.defaultSeoDescription,
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
