"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { RecordModel } from "pocketbase";
import { getAdminPb } from "@/lib/admin/client";

export default function PagesAdminPage() {
  const [pages, setPages] = useState<RecordModel[]>([]);

  useEffect(() => {
    void getAdminPb()
      .collection("pages")
      .getFullList({ sort: "label" })
      .then(setPages);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Sayfalar & SEO</h1>
      <p className="mt-2 max-w-2xl text-sm text-black/60">
        Her sayfanın başlığı, açıklaması ve Google meta bilgileri burada. Yasal sayfalara HTML
        gövde de ekleyebilirsiniz.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/sayfalar/${page.key}`}
            className="rounded-2xl bg-white p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-accent/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-ink">
              {page.path}
            </p>
            <h2 className="mt-2 text-lg font-bold">{String(page.label || page.title)}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-black/60">
              {String(page.seo_title || page.title)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
