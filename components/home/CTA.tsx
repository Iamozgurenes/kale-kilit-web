"use client";

import { motion } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";
import { SITE } from "@/lib/constants";

export default function CTA() {
  return (
    <section id="iletisim" className="bg-navy py-20 sm:py-28">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6"
      >
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Acil Durumlarda Beklemeyin
        </h2>
        <p className="mt-4 text-white/70">
          Kilit ve anahtar sorunlarınız için hemen arayın ya da WhatsApp
          üzerinden yazın, size en kısa sürede ulaşalım.
        </p>

        <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button href={SITE.phoneHref} variant="primary" className="w-full sm:w-auto">
            <PhoneCall className="h-5 w-5" />
            Hemen Ara: {SITE.phone}
          </Button>
          <Button href={SITE.whatsappHref} variant="secondary" className="w-full sm:w-auto">
            <MessageCircle className="h-5 w-5" />
            WhatsApp&apos;tan Yaz
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
