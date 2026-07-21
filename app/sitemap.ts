import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const routes = [
    "",
    "/hakkimizda",
    "/hizmetler",
    "/projeler",
    "/blog",
    "/sss",
    "/iletisim",
    "/kvkk",
    "/gizlilik-politikasi",
    "/cerez-politikasi",
    "/kullanim-kosullari",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
