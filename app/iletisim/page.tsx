import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/ui/Accordion";
import { metadataForPage } from "@/lib/seo";
import { getFaqs, getPage, getSiteSettings } from "@/lib/cms/queries";
import { pageContent } from "@/lib/cms/types";

export async function generateMetadata() {
  return metadataForPage("contact", {
    title: "İletişim",
    description:
      "Adana çilingir ve anahtarcı iletişimi: telefon, WhatsApp veya form ile hemen ulaşın. Çukurova / Adana’da 7/24 acil çilingir hattı açık.",
    path: "/iletisim",
  });
}

export default async function ContactPage() {
  const [page, site, faqs] = await Promise.all([
    getPage("contact"),
    getSiteSettings(),
    getFaqs(),
  ]);
  const content = pageContent(page, {
    banner_text:
      "Acil çilingir desteği için 7/24 hattımız açık — ortalama 15 dakikada yanınızdayız.",
    info_title: "İletişim Bilgileri",
    info_subtitle: "Telefon ve WhatsApp en hızlı kanallarımızdır.",
    form_title: "Mesaj Gönderin",
    areas_title: "Hizmet Bölgelerimiz",
    areas_subtitle: "Adana merkez ve çevre ilçelerde geniş bir alanda hizmet veriyoruz.",
    faq_title: "Hızlı Yanıtlar",
    faq_subtitle: "Aramadan önce merak ettiğiniz birkaç nokta.",
  });
  const contactItems = [
    { icon: PhoneCall, label: "Telefon", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "E-posta", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Adres", value: site.address },
    { icon: Clock3, label: "Çalışma Saatleri", value: site.workingHours },
  ];
  const mapSrc = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`;

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || "İletişim"}
        title={page?.title || "Bize Ulaşın"}
        description={
          page?.description ||
          "Acil durumlar için hemen arayın, diğer talepleriniz için formu doldurun."
        }
        path="/iletisim"
      />

      <section className="bg-accent py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-3 text-navy">
            <ShieldCheck className="h-6 w-6 shrink-0" />
            <p className="text-sm font-semibold sm:text-base">{String(content.banner_text)}</p>
          </div>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-light"
          >
            <PhoneCall className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-extrabold text-navy">{String(content.info_title)}</h2>
            <p className="mt-2 text-sm text-black/60">{String(content.info_subtitle)}</p>

            <div className="mt-6 flex flex-col gap-4">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-2xl bg-neutral-50 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{item.label}</p>
                    {"href" in item && item.href ? (
                      <a href={item.href} className="text-sm text-black/60 hover:text-accent">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-black/60">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} variant="primary" className="w-full sm:w-auto">
                <PhoneCall className="h-5 w-5" />
                Hemen Ara
              </Button>
              <Button
                href={site.whatsappHref}
                variant="secondary"
                className="w-full bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10! sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 text-xl font-extrabold text-navy">{String(content.form_title)}</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy">{String(content.areas_title)}</h2>
            <p className="mt-3 text-black/60">{String(content.areas_subtitle)}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {site.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-navy ring-1 ring-black/5"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-navy">{String(content.faq_title)}</h2>
            <p className="mt-3 text-black/60">{String(content.faq_subtitle)}</p>
          </div>
          <Accordion items={faqs.slice(0, 4).map(({ question, answer }) => ({ question, answer }))} />
        </div>
      </section>

      <section className="bg-navy py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <iframe
              title={`${site.name} konum haritası`}
              src={mapSrc}
              className="h-[280px] w-full border-0 sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex items-start gap-3 bg-navy-light px-5 py-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-white">Adresimiz</p>
                <p className="mt-1 text-sm text-white/70">{site.address}</p>
                <a
                  href={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Google Maps’te aç
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
