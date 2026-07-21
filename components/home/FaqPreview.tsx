"use client";

import { ArrowRight } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { FAQS } from "@/lib/data/faq";

export default function FaqPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-black/60">
            Ulaşım süresi, fiyat ve hasarsız açılış hakkında en çok sorulanlar.
          </p>
        </div>

        <Accordion items={FAQS.slice(0, 4)} />

        <div className="mt-10 flex justify-center">
          <Button
            href="/sss"
            variant="secondary"
            className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
          >
            Tüm Soruları Gör
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
