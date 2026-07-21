"use client";

import { useMemo, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import { FAQ_CATEGORIES, FAQS } from "@/lib/data/faq";

export default function FaqSections() {
  const [category, setCategory] = useState("Tümü");

  const items = useMemo(() => {
    const list =
      category === "Tümü"
        ? FAQS
        : FAQS.filter((item) => item.category === category);
    return list.map(({ question, answer }) => ({ question, answer }));
  }, [category]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FAQ_CATEGORIES.map((item) => {
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

      <Accordion key={category} items={items} />
    </div>
  );
}
