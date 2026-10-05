"use client";

import { useMemo, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import type { CmsFaq } from "@/lib/cms/types";

export default function FaqSections({ items }: { items: CmsFaq[] }) {
  const categories = useMemo(
    () => ["Tümü", ...Array.from(new Set(items.map((item) => item.category))).filter(Boolean)],
    [items],
  );
  const [category, setCategory] = useState("Tümü");

  const visible = useMemo(() => {
    const list = category === "Tümü" ? items : items.filter((item) => item.category === category);
    return list.map(({ question, answer }) => ({ question, answer }));
  }, [category, items]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
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
                  : "bg-white text-navy/70 ring-1 ring-black/5 hover:bg-neutral-100"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <Accordion key={category} items={visible} />
    </div>
  );
}
