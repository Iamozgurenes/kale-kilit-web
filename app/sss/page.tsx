import { HelpCircle, MessageCircle, PhoneCall } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import FaqSections from "@/components/faq/FaqSections";
import { metadataForPage } from "@/lib/seo";
import { getFaqs, getPage, getSiteSettings } from "@/lib/cms/queries";
import { pageContent } from "@/lib/cms/types";

export const runtime = "edge";

export async function generateMetadata() {
  return metadataForPage("faq", {
    title: "Sıkça Sorulan Sorular",
    description:
      "Adana çilingir ve anahtarcı hakkında SSS: ulaşım süresi, 7/24 hizmet, fiyatlandırma, hasarsız açılış ve hizmet bölgeleri.",
    path: "/sss",
  });
}

export default async function FaqPage() {
  const [page, faqs, site] = await Promise.all([
    getPage("faq"),
    getFaqs(),
    getSiteSettings(),
  ]);
  const content = pageContent(page, {
    empty_title: "Cevabını bulamadınız mı?",
    empty_text:
      "Acil durumlar için hemen arayın; diğer sorularınız için WhatsApp veya iletişim formundan yazın.",
  });

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || "SSS"}
        title={page?.title || "Sıkça Sorulan Sorular"}
        description={
          page?.description ||
          "Hizmetlerimiz hakkında en çok merak edilen soruları sizin için yanıtladık."
        }
        path="/sss"
      />

      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FaqSections items={faqs} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            {String(content.empty_title)}
          </h2>
          <p className="mt-4 text-black/60">{String(content.empty_text)}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.phoneHref} variant="primary">
              <PhoneCall className="h-5 w-5" />
              Hemen Ara
            </Button>
            <Button
              href={site.whatsappHref}
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
    </>
  );
}
