"use client";

import { useState } from "react";
import BlogCard from "@/components/ui/BlogCard";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/data/blog";

export default function BlogGallery() {
  const [category, setCategory] = useState("Tümü");
  const filtered =
    category === "Tümü"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === category);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((item) => {
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
}
