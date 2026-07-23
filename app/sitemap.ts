import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getPosts } from "@/lib/posts";
import { getServices } from "@/lib/services";
import { AUTHORIZED_BRANDS } from "@/lib/data/authorized-brands";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/hizmetler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/yetkili-servis`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/projeler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sss`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kvkk`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/gizlilik-politikasi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cerez-politikasi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/kullanim-kosullari`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const [services, posts] = await Promise.all([
    getServices().catch(() => []),
    getPosts().catch(() => []),
  ]);

  const brandRoutes: MetadataRoute.Sitemap = AUTHORIZED_BRANDS.map((brand) => ({
    url: `${base}/yetkili-servis/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.88,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/hizmetler/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...brandRoutes, ...serviceRoutes, ...postRoutes];
}
