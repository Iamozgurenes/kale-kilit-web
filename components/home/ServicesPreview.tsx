"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import { staggerContainer } from "@/lib/animations";
import { getServiceIcon } from "@/lib/icons";
import type { Service } from "@/lib/types/content";

export default function ServicesPreview({
  services,
}: {
  services: Service[];
}) {
  const featured = services.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-navy/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">
            Adana Çilingir
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-black/60">
            Ev, oto ve kasa ihtiyaçlarınız için hızlı, hasarsız ve güvenilir
            çözümler.
          </p>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-sm text-black/50">
            Hizmetler yükleniyor veya henüz eklenmedi.
          </p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {featured.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={getServiceIcon(service.icon)}
                title={service.title}
                description={service.shortDescription}
                href={`/hizmetler/${service.slug}`}
                coverImage={service.coverImage}
                index={index}
              />
            ))}
          </motion.div>
        )}

        <div className="mt-12 flex justify-center">
          <Button
            href="/hizmetler"
            variant="secondary"
            className="bg-white! text-navy! ring-navy/10! hover:bg-navy! hover:text-white! hover:ring-navy!"
          >
            Tüm Hizmetleri Gör
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
