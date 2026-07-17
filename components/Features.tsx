"use client";

import { motion } from "framer-motion";
import { Clock3, BadgeCheck, Zap, Wallet } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import { staggerContainer } from "@/lib/animations";

const FEATURES = [
  {
    icon: Clock3,
    title: "7/24 Hizmet",
    description: "Gece veya gündüz fark etmez, her an yanınızdayız.",
  },
  {
    icon: BadgeCheck,
    title: "Yetkili Servis",
    description: "Alanında uzman, sertifikalı ve güvenilir ekip.",
  },
  {
    icon: Zap,
    title: "Hızlı Ulaşım",
    description: "Ortalama 15 dakikada konumunuza ulaşıyoruz.",
  },
  {
    icon: Wallet,
    title: "Uygun Fiyat",
    description: "Şeffaf fiyatlandırma, sürpriz ücret yok.",
  },
];

export default function Features() {
  return (
    <section id="neden-biz" className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Neden Biz?
          </h2>
          <p className="mt-4 text-black/60">
            Güvenilirlik ve hız konusunda taviz vermeden, müşterilerimize en
            iyi hizmeti sunuyoruz.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
