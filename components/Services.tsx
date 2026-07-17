"use client";

import { motion } from "framer-motion";
import { Home, Car, Lock, KeyRound } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import { staggerContainer } from "@/lib/animations";

const SERVICES = [
  {
    icon: Home,
    title: "Ev Çilingiri",
    description: "Kapıda kalma, anahtar kırılması ve kilit arızalarına anında müdahale.",
  },
  {
    icon: Car,
    title: "Oto Çilingir",
    description: "Araç içinde kalan anahtarlar ve immobilizer sorunlarına hızlı çözüm.",
  },
  {
    icon: Lock,
    title: "Kasa Açma",
    description: "Şifresi unutulan veya arızalanan kasalarda hasarsız açılış.",
  },
  {
    icon: KeyRound,
    title: "Kilit Değişimi",
    description: "Güvenlik seviyenizi artıran çelik kapı ve göbek kilit değişimi.",
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-black/60">
            İhtiyacınız olan her çilingirlik hizmeti tek çatı altında.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
