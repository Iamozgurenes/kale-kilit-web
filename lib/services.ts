import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";
import { createPocketBase } from "@/lib/pocketbase";
import { pbEquals } from "@/lib/pb-filter";
import type { Service } from "@/lib/types/content";

type ServiceRecord = RecordModel & {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon?: string;
  details?: string[] | string | { features?: unknown; [key: string]: unknown };
  cover_image?: string;
  sort_order?: number;
  is_active?: boolean;
  seo_title?: string;
  seo_description?: string;
};

function parseDetails(value: ServiceRecord["details"]): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === "object") {
    const features = value.features;
    if (Array.isArray(features)) {
      return features.map(String).filter(Boolean);
    }

    const firstArray = Object.values(value).find((item) => Array.isArray(item));
    if (Array.isArray(firstArray)) {
      return firstArray.map(String).filter(Boolean);
    }
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value) as ServiceRecord["details"];
      return parseDetails(parsed);
    } catch {
      return value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function mapService(pb: PocketBase, record: ServiceRecord): Service {
  const coverImage = record.cover_image
    ? pb.files.getURL(record, record.cover_image)
    : null;

  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    shortDescription: record.short_description,
    description: record.description,
    icon: record.icon || "Wrench",
    details: parseDetails(record.details),
    coverImage,
    sortOrder: record.sort_order ?? 0,
    isActive: record.is_active !== false,
    seoTitle: record.seo_title || undefined,
    seoDescription: record.seo_description || undefined,
  };
}

export async function getServices(options?: {
  limit?: number;
}): Promise<Service[]> {
  const pb = createPocketBase();
  const result = await pb.collection("services").getList<ServiceRecord>(1, options?.limit ?? 50, {
    filter: "is_active = true",
    sort: "sort_order,title",
  });
  return result.items.map((record) => mapService(pb, record));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const pb = createPocketBase();
  try {
    const record = await pb
      .collection("services")
      .getFirstListItem<ServiceRecord>(
        `${pbEquals("slug", slug)} && is_active = true`,
      );
    return mapService(pb, record);
  } catch {
    return null;
  }
}
