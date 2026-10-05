import { cache } from "react";
import type { RecordModel } from "pocketbase";
import { createPocketBase } from "@/lib/pocketbase";
import { pbEquals } from "@/lib/pb-filter";
import { ensureLive } from "@/lib/cms/live";
import {
  asStringList,
  defaultSiteSettings,
  phoneHrefFrom,
  whatsappHrefFrom,
  type CmsBlock,
  type CmsBrand,
  type CmsFaq,
  type CmsPage,
  type CmsProject,
  type CmsTestimonial,
  type HeroSlide,
  type SiteSettings,
} from "@/lib/cms/types";

function fileUrl(pb: ReturnType<typeof createPocketBase>, record: RecordModel, field?: string) {
  if (!field) return null;
  try {
    return pb.files.getURL(record, field, { thumb: "1200x0" }) || null;
  } catch {
    return null;
  }
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  await ensureLive();
  const fallback = defaultSiteSettings();
  try {
    const pb = createPocketBase();
    const record = await pb.collection("site_settings").getFirstListItem("key = \"default\"");
    const phone = String(record.phone || fallback.phone);
    const whatsappNumber = String(record.whatsapp_number || fallback.whatsappNumber);
    const whatsappMessage = String(record.whatsapp_message || fallback.whatsappMessage);
    return {
      name: String(record.site_name || fallback.name),
      phone,
      phoneHref: phoneHrefFrom(phone),
      whatsappNumber,
      whatsappHref: whatsappHrefFrom(whatsappNumber, whatsappMessage),
      whatsappMessage,
      email: String(record.email || fallback.email),
      address: String(record.address || fallback.address),
      url: String(record.url || fallback.url),
      geo: {
        lat: Number(record.geo_lat || fallback.geo.lat),
        lng: Number(record.geo_lng || fallback.geo.lng),
      },
      footerTagline: String(record.footer_tagline || fallback.footerTagline),
      workingHours: String(record.working_hours || fallback.workingHours),
      serviceAreas: asStringList(record.service_areas).length
        ? asStringList(record.service_areas)
        : fallback.serviceAreas,
      defaultSeoTitle: String(record.default_seo_title || fallback.defaultSeoTitle),
      defaultSeoDescription: String(record.default_seo_description || fallback.defaultSeoDescription),
      gaId: String(record.ga_id || fallback.gaId),
      adsId: String(record.ads_id || fallback.adsId),
      gtmId: String(record.gtm_id || fallback.gtmId),
    };
  } catch {
    return fallback;
  }
});

function mapPage(pb: ReturnType<typeof createPocketBase>, record: RecordModel): CmsPage {
  return {
    id: record.id,
    key: String(record.key || ""),
    path: String(record.path || ""),
    label: String(record.label || ""),
    eyebrow: String(record.eyebrow || ""),
    title: String(record.title || ""),
    description: String(record.description || ""),
    body: String(record.body || ""),
    seoTitle: String(record.seo_title || record.title || ""),
    seoDescription: String(record.seo_description || record.description || ""),
    ogImage: fileUrl(pb, record, record.og_image),
    content:
      record.content && typeof record.content === "object" && !Array.isArray(record.content)
        ? (record.content as Record<string, unknown>)
        : {},
    isPublished: record.is_published !== false,
  };
}

export const getPage = cache(async (key: string): Promise<CmsPage | null> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const record = await pb
      .collection("pages")
      .getFirstListItem(`${pbEquals("key", key)} && is_published = true`);
    return mapPage(pb, record);
  } catch {
    return null;
  }
});

export const getPages = cache(async (): Promise<CmsPage[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("pages").getFullList({ sort: "label" });
    return result.map((record) => mapPage(pb, record));
  } catch {
    return [];
  }
});

export const getBlocks = cache(async (group?: string): Promise<CmsBlock[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("site_blocks").getFullList({
      filter: group ? `${pbEquals("group", group)} && is_active = true` : "is_active = true",
      sort: "sort_order,title",
    });
    return result.map((record) => ({
      id: record.id,
      group: String(record.group || ""),
      title: String(record.title || ""),
      description: String(record.description || ""),
      value: String(record.value || ""),
      icon: String(record.icon || ""),
      year: String(record.year || ""),
      sortOrder: Number(record.sort_order || 0),
    }));
  } catch {
    return [];
  }
});

export const getHeroSlides = cache(async (): Promise<HeroSlide[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("hero_slides").getFullList({
      filter: "is_active = true",
      sort: "sort_order",
    });
    return result.map((record, index) => ({
      id: record.id,
      image: fileUrl(pb, record, record.image) || `/images/hero/slide-${(index % 3) + 1}.jpg`,
      title: String(record.title || ""),
      highlight: String(record.highlight || ""),
      description: String(record.description || ""),
    }));
  } catch {
    return [];
  }
});

export const getProjects = cache(async (): Promise<CmsProject[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("projects").getFullList({
      filter: "is_active = true",
      sort: "sort_order,title",
    });
    return result.map((record) => ({
      id: record.id,
      title: String(record.title || ""),
      category: String(record.category || ""),
      location: String(record.location || ""),
      description: String(record.description || ""),
      coverImage: fileUrl(pb, record, record.cover_image),
    }));
  } catch {
    return [];
  }
});

export const getFaqs = cache(async (): Promise<CmsFaq[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("faqs").getFullList({
      filter: "is_active = true",
      sort: "sort_order,question",
    });
    return result.map((record) => ({
      id: record.id,
      question: String(record.question || ""),
      answer: String(record.answer || ""),
      category: String(record.category || "Genel"),
    }));
  } catch {
    return [];
  }
});

export const getTestimonials = cache(async (): Promise<CmsTestimonial[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("testimonials").getFullList({
      filter: "is_active = true",
      sort: "sort_order",
    });
    return result.map((record) => ({
      id: record.id,
      name: String(record.name || ""),
      role: String(record.role || ""),
      quote: String(record.quote || ""),
    }));
  } catch {
    return [];
  }
});

function mapBrand(record: RecordModel): CmsBrand {
  return {
    id: record.id,
    slug: String(record.slug || ""),
    brand: String(record.brand || ""),
    title: String(record.title || ""),
    shortTitle: String(record.short_title || record.title || ""),
    summary: String(record.summary || ""),
    description: String(record.description || ""),
    features: asStringList(record.features),
    services: asStringList(record.services),
    icon: String(record.icon || "BadgeCheck"),
    seoTitle: String(record.seo_title || record.title || ""),
    seoDescription: String(record.seo_description || record.summary || ""),
  };
}

export const getAuthorizedBrands = cache(async (): Promise<CmsBrand[]> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const result = await pb.collection("authorized_brands").getFullList({
      filter: "is_active = true",
      sort: "sort_order,title",
    });
    return result.map(mapBrand);
  } catch {
    return [];
  }
});

export const getAuthorizedBrandBySlug = cache(async (slug: string): Promise<CmsBrand | null> => {
  await ensureLive();
  try {
    const pb = createPocketBase();
    const record = await pb
      .collection("authorized_brands")
      .getFirstListItem(`${pbEquals("slug", slug)} && is_active = true`);
    return mapBrand(record);
  } catch {
    return null;
  }
});
