import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  AUTHORIZED_BRANDS,
  getAuthorizedBrandBySlug,
  getAuthorizedBrandSlugs,
} from "@/lib/data/authorized-brands";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { getBannerImage } from "@/lib/banner";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAuthorizedBrandSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getAuthorizedBrandBySlug(slug);
  if (!brand) return { title: "Yetkili Servis" };

  return createPageMetadata({
    title: brand.seoTitle,
    description: brand.seoDescription,
    path: `/yetkili-servis/${brand.slug}`,
  });
}

export default async function AuthorizedBrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = getAuthorizedBrandBySlug(slug);
  if (!brand) notFound();

  const Icon = brand.icon;
  const others = AUTHORIZED_BRANDS.filter((item) => item.slug !== brand.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
        <Image
          src={getBannerImage("/yetkili-servis/[slug]")}
          alt=""
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/80 to-navy/40" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-transparent to-navy/45" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/yetkili-servis"
            className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm Yetkili Servisler
          </Link>

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-inset ring-accent/30">
            <Icon className="h-6 w-6" />
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">
            {brand.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            {brand.summary}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-extrabold text-navy sm:text-2xl">
              {brand.brand} Yetkili Servis Hakkında
            </h2>
            <p className="mt-5 leading-relaxed text-black/70">{brand.description}</p>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-navy">Öne Çıkanlar</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {brand.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl bg-neutral-50 px-4 py-3 ring-1 ring-black/5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-navy/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-navy">Verdiğimiz Hizmetler</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {brand.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-xl bg-navy/5 px-3.5 py-2 text-sm font-medium text-navy"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-2xl bg-navy p-6 text-white sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {brand.brand} Yetkili Servis
                </p>
                <h3 className="mt-3 text-xl font-bold">
                  Bu marka için hemen arayın
                </h3>
                <p className="mt-2 text-sm text-white/65">
                  Adana genelinde hızlı müdahale. Net fiyat, profesyonel çözüm.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={SITE.phoneHref} variant="primary" className="w-full">
                    <PhoneCall className="h-5 w-5" />
                    {SITE.phone}
                  </Button>
                  <Button href="/iletisim" variant="secondary" className="w-full">
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
            <h2 className="text-2xl font-extrabold text-navy">
              Diğer Yetkili Servisler
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {others.map((item) => {
                const OtherIcon = item.icon;
                return (
                  <Link
                    key={item.slug}
                    href={`/yetkili-servis/${item.slug}`}
                    className="group rounded-2xl bg-white p-5 ring-1 ring-black/5 transition hover:ring-accent/40"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <OtherIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-navy">{item.shortTitle}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-black/60">
                      {item.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
