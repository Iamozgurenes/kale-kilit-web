import type { Metadata } from "next";
import { getPage, getSiteSettings } from "@/lib/cms/queries";
import { defaultSiteSettings, type SiteSettings } from "@/lib/cms/types";

const DEFAULT_OG_IMAGE = "/genelog.png";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  site?: SiteSettings;
};

function absoluteUrl(path: string, siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function absoluteImage(siteUrl: string, image?: string) {
  const src = image || DEFAULT_OG_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absoluteUrl(src, siteUrl);
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  site = defaultSiteSettings(),
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path, site.url);
  const ogImage = absoluteImage(site.url, image);
  const displayTitle = path === "/" ? title : `${title} | Adana Çilingir | ${site.name}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: site.name,
      locale: "tr_TR",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Adana çilingir ve anahtarcı — ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [ogImage],
    },
  };
}

export async function metadataForPage(
  key: string,
  fallback: Omit<PageSeoInput, "site">,
): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage(key), getSiteSettings()]);
  return createPageMetadata({
    ...fallback,
    title: page?.seoTitle || fallback.title,
    description: page?.seoDescription || fallback.description,
    image: page?.ogImage || fallback.image,
    site,
  });
}

export function getSiteJsonLd(site: SiteSettings = defaultSiteSettings()) {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: site.name,
    alternateName: [
      "Adana Çilingir",
      "Adana Anahtarcı",
      "Adana Acil Çilingir",
      "Kale Kilit Adana",
    ],
    description: site.defaultSeoDescription,
    image: absoluteImage(site.url),
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Çukurova",
      addressRegion: "Adana",
      postalCode: "01360",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: {
      "@type": "City",
      name: "Adana",
    },
    sameAs: [site.whatsappHref.split("?")[0]],
    priceRange: "$$",
  };
}
