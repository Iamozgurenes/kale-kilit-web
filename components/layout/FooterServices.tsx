"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { apiGet } from "@/lib/api-client";
import type { Service } from "@/lib/types/content";

type FooterServiceItem = {
  id: string;
  title: string;
  slug: string;
};

const VISIBLE_COUNT = 8;

export default function FooterServices() {
  const [services, setServices] = useState<FooterServiceItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await apiGet<{ items: Service[] }>("/api/services?limit=100");
        if (cancelled) return;
        setServices(
          data.items.map((service) => ({
            id: service.id,
            title: service.title,
            slug: service.slug,
          })),
        );
      } catch {
        if (!cancelled) setServices([]);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (services.length === 0) {
    return (
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Hizmetler
        </h3>
        <ul className="mt-4">
          <li>
            <Link
              href="/hizmetler"
              className="block py-1.5 text-sm text-white/65 transition hover:text-accent"
            >
              Tüm hizmetleri gör
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  const visible = services.slice(0, VISIBLE_COUNT);
  const remaining = services.slice(VISIBLE_COUNT);
  const hasMore = remaining.length > 0;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Hizmetler
      </h3>

      <ul className="mt-4">
        {visible.map((service) => (
          <li key={service.id}>
            <Link
              href={`/hizmetler/${service.slug}`}
              className="group inline-flex max-w-full items-center gap-1 py-1.5 text-sm text-white/65 transition hover:text-accent"
            >
              <span className="truncate">{service.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-3">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center gap-1.5 py-1.5 text-xs font-semibold text-accent transition hover:text-accent/80"
          >
            {open ? "Gizle" : `Hepsini göster (${remaining.length})`}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <ul className="scrollbar-dark mt-3 max-h-56 overflow-y-auto border-t border-white/10 pt-3 pr-1">
                  {remaining.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/hizmetler/${service.slug}`}
                        className="group inline-flex max-w-full items-center gap-1 py-1.5 text-sm text-white/65 transition hover:text-accent"
                      >
                        <span className="truncate">{service.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
