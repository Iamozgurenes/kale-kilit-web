"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/ui/BlogCard";
import type { Post } from "@/lib/types/content";

export default function BlogGallery({ posts }: { posts: Post[] }) {
  const categories = useMemo(
    () => ["Tümü", ...Array.from(new Set(posts.map((post) => post.category))).filter(Boolean).sort()],
    [posts],
  );
  const [category, setCategory] = useState("Tümü");
  const visible = useMemo(
    () => (category === "Tümü" ? posts : posts.filter((post) => post.category === category)),
    [category, posts],
  );

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

      {visible.length === 0 && (
        <p className="text-sm text-black/50">
          Henüz yayınlanmış yazı yok. PocketBase&apos;e içerik ekleyin.
        </p>
      )}

      {visible.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
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
