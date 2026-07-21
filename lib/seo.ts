import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

const DEFAULT_OG_IMAGE = "/genelog.png";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

function absoluteUrl(path: string) {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function absoluteImage(image?: string) {
  const src = image || DEFAULT_OG_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absoluteUrl(src);
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteImage(image);
  const fullTitle =
    path === "/" ? title : undefined; // layout template handles inner pages

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
      title: fullTitle ?? `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: "tr_TR",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle ?? `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
  };
}

export function getSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: SITE.name,
    image: absoluteImage(),
    url: SITE.url,
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yurt, Kurttepe Cd. Unalır AP zemin KT. 8/C",
      addressLocality: "Çukurova",
      addressRegion: "Adana",
      postalCode: "01360",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "TR",
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
    sameAs: [SITE.whatsappHref.split("?")[0]],
    priceRange: "$$",
  };
}
