import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Accordion from "@/components/ui/Accordion";
import CTA from "@/components/home/CTA";
import { FAQS } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Kale Kilit & Çilingir",
  description:
    "Çilingirlik hizmetlerimiz, ulaşım süremiz, fiyatlandırma ve daha fazlası hakkında merak edilenler.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="SSS"
        title="Sıkça Sorulan Sorular"
        description="Hizmetlerimiz hakkında en çok merak edilen soruları sizin için yanıtladık."
      />

      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Accordion items={FAQS} />
        </div>
      </section>

      <CTA />
    </>
  );
}
