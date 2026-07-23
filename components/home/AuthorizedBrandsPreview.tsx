"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { AUTHORIZED_BRANDS } from "@/lib/data/authorized-brands";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AuthorizedBrandsPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Yetkili Servis
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Servisini Yaptığımız Markalar
          </h2>
          <p className="mt-4 text-black/60">
            Kale Kilit, Multlock, Desi ve Dortek kapı yetkili servis
            hizmetlerimizle Adana’da yanınızdayız.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {AUTHORIZED_BRANDS.map((brand) => {
            const Icon = brand.icon;
            return (
              <motion.div key={brand.slug} variants={fadeInUp}>
                <Link
                  href={`/yetkili-servis/${brand.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-neutral-50 p-5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:bg-white hover:ring-accent/40"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-navy">
                      <Icon className="h-6 w-6" />
                    </div>
                    <BadgeCheck className="h-5 w-5 text-accent/80" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-navy">
                    {brand.shortTitle}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-black/55">
                    {brand.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/70 transition group-hover:gap-2.5 group-hover:text-accent">
                    İncele
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button
            href="/yetkili-servis"
            variant="secondary"
            className="bg-navy/5! text-navy! ring-navy/15! hover:bg-navy! hover:text-white!"
          >
            Tüm Yetkili Servisler
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
