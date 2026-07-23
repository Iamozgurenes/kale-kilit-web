import Link from "next/link";
import { ArrowRight, BadgeCheck, PhoneCall } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { AUTHORIZED_BRANDS } from "@/lib/data/authorized-brands";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Yetkili Servis",
  description:
    "Adana yetkili servis: Kale Kilit, Multlock, Desi ve Dortek kapı yetkili servis. Kilit değişimi, anahtar çoğaltma ve 7/24 acil destek.",
  path: "/yetkili-servis",
});

export default function AuthorizedServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yetkili Servis"
        title="Marka Yetkili Servislerimiz"
        description="Kale Kilit, Multlock, Desi ve Dortek kapı yetkili servis noktalarımızla Adana genelinde orijinal parça ve uzman müdahale sunuyoruz."
        path="/yetkili-servis"
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Servisini Yaptığımız Markalar
            </h2>
            <p className="mt-3 text-black/60">
              Her marka için ayrı detay sayfası hazırladık. İhtiyacınıza uygun
              yetkili servisi seçerek hızlıca iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {AUTHORIZED_BRANDS.map((brand) => {
              const Icon = brand.icon;
              return (
                <Link
                  key={brand.slug}
                  href={`/yetkili-servis/${brand.slug}`}
                  className="group flex flex-col rounded-3xl bg-neutral-50 p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:bg-white hover:ring-accent/40 hover:shadow-[0_20px_40px_-24px_rgba(11,26,51,0.35)] sm:p-8"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-navy shadow-lg shadow-accent/25">
                      <Icon className="h-7 w-7" strokeWidth={2.25} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy/70">
                      <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                      Yetkili Servis
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-navy group-hover:text-navy-light">
                    {brand.shortTitle}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-black/60">
                    {brand.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition group-hover:gap-3 group-hover:text-accent">
                    Detayı incele
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-navy p-7 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Acil Destek
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">
                Yetkili servis için hemen arayın
              </h3>
              <p className="mt-2 text-sm text-white/65">
                Adana genelinde 7/24 hızlı müdahale.
              </p>
            </div>
            <Button href={SITE.phoneHref} variant="primary">
              <PhoneCall className="h-5 w-5" />
              {SITE.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
