"use client";

import { motion } from "framer-motion";
import { PhoneCall, Wrench, Clock3 } from "lucide-react";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-navy py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-navy-light blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6"
      >
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-inset ring-white/20"
        >
          <Clock3 className="h-4 w-4" />
          7/24 Acil Çilingir Hizmeti
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Kapıda mı kaldınız?
          <br />
          <span className="text-accent">15 Dakikada</span> Oradayız
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
        >
          Ev, oto ve kasa çilingir hizmetlerinde şehrinizin en hızlı ve
          güvenilir ekibi. Tek telefonla dakikalar içinde yanınızdayız.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
        >
          <Button href={SITE.phoneHref} variant="primary" className="w-full sm:w-auto">
            <PhoneCall className="h-5 w-5" />
            Hemen Ara
          </Button>
          <Button href="#hizmetler" variant="secondary" className="w-full sm:w-auto">
            <Wrench className="h-5 w-5" />
            Hizmetlerimiz
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
