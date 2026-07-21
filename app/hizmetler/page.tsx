import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, PhoneCall, Shield, Wallet } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Process from "@/components/home/Process";
import { getServices } from "@/lib/services";
import { getServiceIcon } from "@/lib/icons";
import { SITE } from "@/lib/constants";

export const runtime = 'edge';
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

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  return (
    <>
      <PageHeader
        eyebrow="Hizmetlerimiz"
        title="İhtiyacınız Olan Her Çilingirlik Hizmeti"
        description="Ev, oto ve kasa çilingirliğinden modern güvenlik sistemlerine kadar geniş hizmet yelpazemizle yanınızdayız."
      />

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {services.length === 0 ? (
            <p className="text-center text-black/50">
              Henüz hizmet eklenmemiş. PocketBase <code>services</code>{" "}
              koleksiyonuna kayıt ekleyin.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = getServiceIcon(service.icon);
                return (
                  <article
                    key={service.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:border-accent/30"
                  >
                    <Link
                      href={`/hizmetler/${service.slug}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-navy/5"
                    >
                      {service.coverImage ? (
                        <Image
                          src={service.coverImage}
                          alt={service.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-accent">
                          <Icon className="h-12 w-12" />
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-bold text-navy">
                        <Link
                          href={`/hizmetler/${service.slug}`}
                          className="transition hover:text-accent"
                        >
                          {service.title}
                        </Link>
                      </h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-black/60">
                        {service.shortDescription}
                      </p>

                      {service.details.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {service.details.slice(0, 3).map((detail) => (
                            <li
                              key={detail}
                              className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-navy/70"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                          href={`/hizmetler/${service.slug}`}
                          variant="secondary"
                          className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
                        >
                          Detayı Gör
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button href={SITE.phoneHref} variant="primary">
                          <PhoneCall className="h-4 w-4" />
                          Ara
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Process />
      {/* <CTA /> */}
    </>
  );
}
