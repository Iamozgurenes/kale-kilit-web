"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { CmsTestimonial } from "@/lib/cms/types";

export default function Testimonials({
  items,
  title = "Müşterilerimiz Ne Diyor?",
  subtitle = "Güven ve hız konusunda bizimle çalışanlardan kısa notlar.",
}: {
  items: CmsTestimonial[];
  title?: string;
  subtitle?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-black/60">{subtitle}</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {items.map((item) => (
            <motion.blockquote
              key={item.id}
              variants={fadeInUp}
              className="flex flex-col border-l-2 border-accent bg-white px-6 py-6"
            >
              <Quote className="h-6 w-6 text-accent/70" aria-hidden />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-black/70">
                “{item.quote}”
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <span className="block font-bold text-navy">{item.name}</span>
                  <span className="text-xs text-black/60">{item.role}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
