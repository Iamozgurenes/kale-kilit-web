"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import { apiGet } from "@/lib/api-client";
import { getServiceIcon } from "@/lib/icons";
import { SITE } from "@/lib/constants";
import type { Service } from "@/lib/types/content";

export default function ServicesGallery() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet<{ items: Service[] }>("/api/services");
        if (!cancelled) setServices(data.items);
      } catch {
        if (!cancelled) setError("Hizmetler yüklenemedi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-black/5 bg-white"
          >
            <div className="aspect-[16/10] animate-pulse bg-neutral-100" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
              <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-sm text-red-600">{error}</p>;
  }

  if (services.length === 0) {
    return (
      <p className="text-center text-black/50">
        Henüz hizmet eklenmemiş. PocketBase <code>services</code> koleksiyonuna
        kayıt ekleyin.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = getServiceIcon(service.icon);
        return (
          <article
            key={service.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:border-accent/30"
          >
            <Link
              href={`/hizmetler/${service.slug}`}
              className="relative block aspect-[16/10] overflow-hidden bg-navy/5"
            >
              {service.coverImage ? (
                <Image
                  src={service.coverImage}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-accent">
                  <Icon className="h-12 w-12" />
                </div>
              )}
            </Link>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-navy">
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="transition hover:text-accent"
                >
                  {service.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-black/60">
                {service.shortDescription}
              </p>

              {service.details.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.details.slice(0, 3).map((detail) => (
                    <li
                      key={detail}
                      className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-navy/70"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  href={`/hizmetler/${service.slug}`}
                  variant="secondary"
                  className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
                >
                  Detayı Gör
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={SITE.phoneHref} variant="primary">
                  <PhoneCall className="h-4 w-4" />
                  Ara
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
