import type { Metadata } from "next";
import { CheckCircle2, PhoneCall, Shield, Clock3, Wallet } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";
import { SERVICES } from "@/lib/data/services";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Kale Kilit & Çilingir",
  description:
    "Ev çilingiri, oto çilingir, kasa açma, kilit değişimi ve güvenlik sistemleri dahil tüm çilingirlik hizmetlerimiz.",
};

const HIGHLIGHTS = [
  {
    icon: Clock3,
    title: "Hızlı Müdahale",
    description: "Ortalama 15 dakikada konumunuza ulaşıyoruz.",
  },
  {
    icon: Shield,
    title: "Hasarsız Açılış",
    description: "Önceliğimiz kapı ve kilidinize zarar vermemek.",
  },
  {
    icon: Wallet,
    title: "Şeffaf Fiyat",
    description: "Arama anında net teklif, gizli ücret yok.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hizmetlerimiz"
        title="İhtiyacınız Olan Her Çilingirlik Hizmeti"
        description="Ev, oto ve kasa çilingirliğinden modern güvenlik sistemlerine kadar geniş hizmet yelpazemizle yanınızdayız."
      />

      <section className="border-b border-black/5 bg-white py-6">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 sm:px-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="shrink-0 rounded-xl bg-neutral-100 px-4 py-2 text-sm font-medium text-navy/80 transition hover:bg-navy hover:text-white"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-navy">{item.title}</h2>
                <p className="mt-1 text-sm text-black/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.slug}
              id={service.slug}
              className={`grid scroll-mt-28 gap-8 rounded-3xl border border-black/5 p-8 shadow-sm lg:grid-cols-5 lg:items-center lg:gap-12 lg:p-12 ${
                index % 2 === 0 ? "bg-neutral-50" : "bg-white"
              }`}
            >
              <div className="lg:col-span-3">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <service.icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 leading-relaxed text-black/60">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={SITE.phoneHref} variant="primary">
                    <PhoneCall className="h-5 w-5" />
                    Hemen Ara
                  </Button>
                  <Button
                    href="/iletisim"
                    variant="secondary"
                    className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
                  >
                    Teklif Al
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy/45">
                  Bu hizmette neler var?
                </p>
                <ul className="space-y-3">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-black/70">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}
