"use client";

import { motion } from "framer-motion";
import FeatureCard from "@/components/ui/FeatureCard";
import { staggerContainer } from "@/lib/animations";
import { getIcon } from "@/lib/icons";
import type { CmsBlock } from "@/lib/cms/types";

export default function Features({
  items,
  title = "Neden Biz?",
  subtitle = "Güvenilirlik ve hız konusunda taviz vermeden, müşterilerimize en iyi hizmeti sunuyoruz.",
}: {
  items?: CmsBlock[];
  title?: string;
  subtitle?: string;
}) {
  const list = items ?? [];
  if (!list.length) return null;

  return (
    <section id="neden-biz" className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-black/60">{subtitle}</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {list.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={getIcon(feature.icon)}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
