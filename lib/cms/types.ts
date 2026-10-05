import { SITE } from "@/lib/constants";

export type SiteSettings = {
  name: string;
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  whatsappMessage: string;
  email: string;
  address: string;
  url: string;
  geo: { lat: number; lng: number };
  footerTagline: string;
  workingHours: string;
  serviceAreas: string[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  gaId: string;
  adsId: string;
  gtmId: string;
};

export type CmsPage = {
  id: string;
  key: string;
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string | null;
  content: Record<string, unknown>;
  isPublished: boolean;
};

export type CmsBlock = {
  id: string;
  group: string;
  title: string;
  description: string;
  value: string;
  icon: string;
  year: string;
  sortOrder: number;
};

export type HeroSlide = {
  id: string;
  image: string;
  title: string;
  highlight: string;
  description: string;
};

export type CmsProject = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  coverImage: string | null;
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type CmsTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export type CmsBrand = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  features: string[];
  services: string[];
  icon: string;
  seoTitle: string;
  seoDescription: string;
};

export function phoneHrefFrom(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  const local = digits.replace(/^0/, "90");
  return `tel:+${local}`;
}

export function whatsappHrefFrom(number: string, message: string) {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function defaultSiteSettings(): SiteSettings {
  return {
    name: SITE.name,
    phone: SITE.phone,
    phoneHref: SITE.phoneHref,
    whatsappNumber: SITE.whatsappNumber,
    whatsappHref: SITE.whatsappHref,
    whatsappMessage: SITE.whatsappMessage,
    email: SITE.email,
    address: SITE.address,
    url: SITE.url,
    geo: SITE.geo,
    footerTagline:
      "Adana genelinde ev, oto ve kasa çilingirliği ile güvenlik sistemlerinde hızlı, hasarsız ve şeffaf hizmet.",
    workingHours: "7/24 Kesintisiz Hizmet",
    serviceAreas: [
      "Çukurova",
      "Seyhan",
      "Yüreğir",
      "Sarıçam",
      "Karaisalı",
      "Ceyhan",
      "Kozan",
      "İmamoğlu",
      "Pozantı",
      "Karataş",
      "Yumurtalık",
      "Aladağ",
    ],
    defaultSeoTitle: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
    defaultSeoDescription:
      "Adana çilingir ve anahtarcı hizmeti: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde ortalama 15 dakikada yanınızdayız.",
    gaId: "G-Z5V58P8ZQZ",
    adsId: "AW-11397710707",
    gtmId: "GTM-NSRJSVK8",
  };
}

export function asStringList(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      return asStringList(JSON.parse(trimmed));
    } catch {
      return trimmed
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    }
  }
  return [];
}

export function pageContent<T extends Record<string, unknown>>(
  page: CmsPage | null,
  fallback: T,
): T {
  return { ...fallback, ...(page?.content ?? {}) } as T;
}
