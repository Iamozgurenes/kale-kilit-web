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
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-black/60">
            İhtiyacınız olan her çilingirlik hizmeti tek çatı altında.
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
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featured.map((service) => (
              <ServiceCard
                key={service.id}
                icon={getServiceIcon(service.icon)}
                title={service.title}
                description={service.shortDescription}
                href={`/hizmetler/${service.slug}`}
                coverImage={service.coverImage}
              />
            ))}
          </motion.div>
        )}

        <div className="mt-12 flex justify-center">
          <Button
            href="/hizmetler"
            variant="secondary"
            className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
          >
            Tüm Hizmetleri Gör
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
