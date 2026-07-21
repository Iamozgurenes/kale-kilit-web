"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/ui/BlogCard";
import { apiGet } from "@/lib/api-client";
import type { Post } from "@/lib/types/content";

type PostsResponse = {
  items: Post[];
  categories?: string[];
};

export default function BlogGallery() {
  const [category, setCategory] = useState("Tümü");
  const [categories, setCategories] = useState<string[]>(["Tümü"]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ categories: "1" });
        if (category !== "Tümü") params.set("category", category);
        const data = await apiGet<PostsResponse>(`/api/posts?${params}`);
        if (cancelled) return;
        setPosts(data.items);
        if (data.categories?.length) setCategories(data.categories);
      } catch {
        if (!cancelled) setError("Yazılar yüklenemedi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-navy text-white"
                  : "bg-neutral-100 text-navy/70 hover:bg-neutral-200"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white"
            >
              <div className="aspect-[16/10] animate-pulse bg-neutral-100" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-100" />
                <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-sm text-black/50">
          Henüz yayınlanmış yazı yok. PocketBase&apos;e içerik ekleyin.
        </p>
      )}

      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              date={post.publishedAt}
              category={post.category}
              excerpt={post.excerpt}
              href={`/blog/${post.slug}`}
              coverImage={post.coverImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
