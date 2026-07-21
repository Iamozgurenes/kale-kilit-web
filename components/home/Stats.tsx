"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const STATS = [
  { value: "10+", label: "Yıllık Tecrübe" },
  { value: "8.500+", label: "Tamamlanan İşlem" },
  { value: "15 dk", label: "Ortalama Ulaşım" },
  { value: "7/24", label: "Kesintisiz Hizmet" },
];

export default function Stats() {
  return (
    <section className="bg-navy py-14 sm:py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-3xl font-extrabold text-accent sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-white/65">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
