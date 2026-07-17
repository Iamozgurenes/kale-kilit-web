import type { Metadata } from "next";
import { CheckCircle2, PhoneCall } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Kale Kilit & Çilingir",
  description:
    "Ev çilingiri, oto çilingir, kasa açma, kilit değişimi ve güvenlik sistemleri dahil tüm çilingirlik hizmetlerimiz.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hizmetlerimiz"
        title="İhtiyacınız Olan Her Çilingirlik Hizmeti"
        description="Ev, oto ve kasa çilingirliğinden modern güvenlik sistemlerine kadar geniş hizmet yelpazemizle yanınızdayız."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="grid gap-8 rounded-3xl border border-black/5 bg-neutral-50 p-8 shadow-sm lg:grid-cols-5 lg:items-center lg:gap-12 lg:p-12"
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
                <div className="mt-6">
                  <Button href={SITE.phoneHref} variant="primary">
                    <PhoneCall className="h-5 w-5" />
                    Hemen Ara
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2">
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
    </>
  );
}
