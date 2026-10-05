"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getIcon } from "@/lib/icons";
import type { CmsBlock } from "@/lib/cms/types";

export default function Process({
  items,
  title = "Nasıl Çalışıyoruz?",
  subtitle = "Acil anlarda süreci sade tutuyoruz: arayın, gelelim, çözelim.",
}: {
  items?: CmsBlock[];
  title?: string;
  subtitle?: string;
}) {
  const list = items ?? [];
  if (!list.length) return null;

  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-black/60">{subtitle}</p>
        </div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {list.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <motion.li key={step.id} variants={fadeInUp} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold tabular-nums text-accent-ink">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
