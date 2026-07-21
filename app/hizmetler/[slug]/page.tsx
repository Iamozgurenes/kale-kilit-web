import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import CTA from "@/components/home/CTA";
import { getServiceBySlug, getServices } from "@/lib/services";
import { getServiceIcon } from "@/lib/icons";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  if (!service) return { title: "Hizmet | Kale Kilit & Çilingir" };

  return {
    title: `${service.seoTitle || service.title} | Kale Kilit & Çilingir`,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);
  const others = (await getServices().catch(() => []))
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  return (
    <>
      <section className="relative min-h-[320px] overflow-hidden bg-navy sm:min-h-[420px]">
        {service.coverImage ? (
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-navy/30" />

        <div className="relative mx-auto flex min-h-[320px] max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[420px] sm:px-6 sm:py-16">
          <Link
            href="/hizmetler"
            className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm Hizmetler
          </Link>

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-inset ring-accent/30">
            <Image src={`/icons/${service.icon}.svg`} alt={service.title} width={48} height={48} className="w-full h-full object-contain" />
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-extrabold text-navy sm:text-2xl">
              Hizmet Hakkında
            </h2>
            <div
              className="prose prose-neutral mt-5 max-w-none text-black/70 prose-headings:text-navy prose-a:text-accent prose-li:marker:text-accent"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />

            {service.details.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-navy">Öne Çıkanlar</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 rounded-xl bg-neutral-50 px-4 py-3 ring-1 ring-black/5"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-medium text-navy/80">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">
              {service.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5">
                  <Image
                    src={service.coverImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              )}

              <div className="rounded-2xl bg-navy p-6 text-white sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Acil Destek
                </p>
                <h3 className="mt-3 text-xl font-bold">
                  Bu hizmet için hemen arayın
                </h3>
                <p className="mt-2 text-sm text-white/65">
                  Adana genelinde hızlı müdahale. Net fiyat, hasarsız çözüm.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={SITE.phoneHref} variant="primary" className="w-full">
                    <PhoneCall className="h-5 w-5" />
                    {SITE.phone}
                  </Button>
                  <Button
                    href="/iletisim"
                    variant="secondary"
                    className="w-full"
                  >
                    İletişim Formu
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-navy">Diğer Hizmetler</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {others.map((item) => {
                const OtherIcon = getServiceIcon(item.icon);
                return (
                  <Link
                    key={item.id}
                    href={`/hizmetler/${item.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:ring-accent/40"
                  >
                    <div className="relative aspect-[16/10] bg-navy/5">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-accent">
                          <OtherIcon className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-navy">{item.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-black/60">
                        {item.shortDescription}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
