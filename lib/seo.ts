import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

const DEFAULT_OG_IMAGE = "/genelog.png";

export const DEFAULT_KEYWORDS = [
  "Adana çilingir",
  "Adana anahtarcı",
  "Adana acil çilingir",
  "Çukurova çilingir",
  "Seyhan çilingir",
  "oto çilingir Adana",
  "ev çilingiri Adana",
  "anahtar çoğaltma Adana",
  "kasa açma Adana",
  "kilit değişimi Adana",
  "Kale Kilit Adana",
];

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
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

function brandedTitle(title: string) {
  return `${title} | Adana Çilingir | ${SITE.name}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  keywords,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteImage(image);
  const displayTitle = path === "/" ? title : brandedTitle(title);

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords: keywords?.length
      ? [...keywords, ...DEFAULT_KEYWORDS]
      : DEFAULT_KEYWORDS,
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
      siteName: SITE.name,
      locale: "tr_TR",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Adana çilingir ve anahtarcı — ${SITE.name}`,
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

export function getSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: SITE.name,
    alternateName: [
      "Adana Çilingir",
      "Adana Anahtarcı",
      "Adana Acil Çilingir",
      "Kale Kilit Adana",
    ],
    description:
      "Adana çilingir ve anahtarcı: 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma ve kilit değişimi. Çukurova ve çevre ilçelerde hızlı hizmet.",
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
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
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
