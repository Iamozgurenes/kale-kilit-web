"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminPb } from "@/lib/admin/client";
import { ADMIN_NAV } from "@/lib/admin/resources";

type Counts = Record<string, number>;

export default function AdminHomePage() {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const pb = getAdminPb();
    const collections = [
      "pages",
      "services",
      "posts",
      "projects",
      "faqs",
      "testimonials",
      "authorized_brands",
      "hero_slides",
      "contact_messages",
    ];
    void Promise.all(
      collections.map(async (name) => {
        try {
          const result = await pb.collection(name).getList(1, 1);
          return [name, result.totalItems] as const;
        } catch {
          return [name, 0] as const;
        }
      }),
    ).then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  const cards = [
    { href: "/admin/sayfalar", label: "Sayfalar", key: "pages" },
    { href: "/admin/hizmetler", label: "Hizmetler", key: "services" },
    { href: "/admin/blog", label: "Blog", key: "posts" },
    { href: "/admin/projeler", label: "Projeler", key: "projects" },
    { href: "/admin/sss", label: "SSS", key: "faqs" },
    { href: "/admin/yorumlar", label: "Yorumlar", key: "testimonials" },
    { href: "/admin/yetkili-servis", label: "Yetkili servis", key: "authorized_brands" },
    { href: "/admin/hero", label: "Hero", key: "hero_slides" },
    { href: "/admin/mesajlar", label: "Mesajlar", key: "contact_messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Kontrol paneli</h1>
      <p className="mt-2 max-w-2xl text-sm text-black/60">
        Sitenin metinleri, SEO bilgileri ve içerikleri buradan yönetilir. Değişiklikler
        kaydedildikten sonra sitede kısa süre içinde görünür.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl bg-white p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-accent/40"
          >
            <p className="text-sm font-medium text-black/50">{card.label}</p>
            <p className="mt-2 text-3xl font-extrabold">{counts[card.key] ?? "—"}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold">Hızlı erişim</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ADMIN_NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold ring-1 ring-black/5 hover:ring-accent/40"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
