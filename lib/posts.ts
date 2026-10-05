import { cache } from "react";
import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";
import { createPocketBase } from "@/lib/pocketbase";
import { pbEquals } from "@/lib/pb-filter";
import { ensureLive } from "@/lib/cms/live";
import type { Post } from "@/lib/types/content";

type PostRecord = RecordModel & {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image?: string;
  published_at: string;
  is_published?: boolean;
  seo_title?: string;
  seo_description?: string;
};

function mapPost(pb: PocketBase, record: PostRecord): Post {
  const coverImage = record.cover_image
    ? pb.files.getURL(record, record.cover_image, { thumb: "1000x0" })
    : null;

  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    content: record.content,
    category: record.category,
    coverImage,
    publishedAt: record.published_at,
    isPublished: record.is_published !== false,
    seoTitle: record.seo_title || undefined,
    seoDescription: record.seo_description || undefined,
  };
}

export const getPosts = cache(async (options?: {
  category?: string;
  limit?: number;
}): Promise<Post[]> => {
  await ensureLive();
  const pb = createPocketBase();
  const filters = ["is_published = true"];
  if (options?.category && options.category !== "Tümü") {
    filters.push(pbEquals("category", options.category));
  }

  const result = await pb.collection("posts").getList<PostRecord>(1, options?.limit ?? 50, {
    filter: filters.join(" && "),
    sort: "-published_at",
  });
  return result.items.map((record) => mapPost(pb, record));
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  await ensureLive();
  const pb = createPocketBase();
  try {
    const record = await pb
      .collection("posts")
      .getFirstListItem<PostRecord>(
        `${pbEquals("slug", slug)} && is_published = true`,
      );
    return mapPost(pb, record);
  } catch {
    return null;
  }
});

export const getPostCategories = cache(async (): Promise<string[]> => {
  const posts = await getPosts();
  return ["Tümü", ...Array.from(new Set(posts.map((p) => p.category))).sort()];
});
