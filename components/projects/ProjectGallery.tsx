"use client";

import { useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import type { CmsProject } from "@/lib/cms/types";

export default function ProjectGallery({ items }: { items: CmsProject[] }) {
  const categories = ["Tümü", ...Array.from(new Set(items.map((item) => item.category))).filter(Boolean)];
  const [category, setCategory] = useState("Tümü");
  const filtered =
    category === "Tümü" ? items : items.filter((project) => project.category === category);

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
