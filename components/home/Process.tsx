"use client";

import { motion } from "framer-motion";
import { PhoneCall, MapPin, Wrench, CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Bizi Arayın",
    description: "Durumu kısaca anlatın, ihtiyacınıza göre yönlendirelim.",
  },
  {
    icon: MapPin,
    title: "Konumunuza Gelelim",
    description: "Ortalama 15 dakikada ekibimiz adresinize ulaşır.",
  },
  {
    icon: Wrench,
    title: "Hasarsız Müdahale",
    description: "Uzman ekip kapı ve kilidinize zarar vermeden çözüm üretir.",
  },
  {
    icon: CheckCircle2,
    title: "Güvenle Devam",
    description: "İşlem biter, şeffaf ücretle güvenle yolunuza devam edersiniz.",
  },
];

export default function Process() {
  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="mt-4 text-black/60">
            Acil anlarda süreci sade tutuyoruz: arayın, gelelim, çözelim.
          </p>
        </div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              variants={fadeInUp}
              className="relative"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-accent">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold tabular-nums text-accent">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
