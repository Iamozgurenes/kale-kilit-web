import { HelpCircle, MessageCircle, PhoneCall } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import FaqSections from "@/components/faq/FaqSections";
import CTA from "@/components/home/CTA";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sıkça Sorulan Sorular",
  description:
    "Çilingirlik hizmetlerimiz, ulaşım süremiz, fiyatlandırma ve daha fazlası hakkında merak edilenler.",
  path: "/sss",
});

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
          <FaqSections />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Cevabını bulamadınız mı?
          </h2>
          <p className="mt-4 text-black/60">
            Acil durumlar için hemen arayın; diğer sorularınız için WhatsApp
            veya iletişim formundan yazın.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={SITE.phoneHref} variant="primary">
              <PhoneCall className="h-5 w-5" />
              Hemen Ara
            </Button>
            <Button
              href={SITE.whatsappHref}
              variant="secondary"
              className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
            <Button
              href="/iletisim"
              variant="secondary"
              className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
            >
              İletişim Formu
            </Button>
          </div>
        </div>
      </section>

      {/* <CTA /> */}
    </>
  );
}
