"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { CmsBlock } from "@/lib/cms/types";

export default function Stats({ items }: { items?: CmsBlock[] }) {
  const list = items ?? [];
  if (!list.length) return null;

  return (
    <section className="bg-navy py-14 sm:py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4"
      >
        {list.map((stat) => (
          <motion.div key={stat.id} variants={fadeInUp} className="text-center">
            <p className="text-3xl font-extrabold text-accent sm:text-4xl">
              {stat.value || stat.title}
            </p>
            <p className="mt-2 text-sm font-medium text-white/65">
              {stat.value ? stat.title : stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
