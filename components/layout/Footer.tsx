import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { LEGAL_LINKS } from "@/lib/data/legal";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { getServices } from "@/lib/services";
import FooterServices from "@/components/layout/FooterServices";

const FOOTER_NAV = NAV_LINKS.filter((link) => link.href !== "/");

export default async function Footer() {
  const services = await getServices({ limit: 100 }).catch(() => []);

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-light blur-3xl"
      />

      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              7/24 Acil Destek
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Kapıda mı kaldınız? Hemen arayın.
            </h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-navy transition hover:bg-accent/90"
            >
              <PhoneCall className="h-4 w-4" />
              {SITE.phone}
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-3 py-2 text-navy"
            aria-label={SITE.name}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src="/logoico.svg"
                alt="Kale Kilit"
                width={30}
                height={30}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight">
                Kale Kilit
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy/40">
                Çilingir · 7/24
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Adana genelinde ev, oto ve kasa çilingirliği ile güvenlik
            sistemlerinde hızlı, hasarsız ve şeffaf hizmet.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-3">
              <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={SITE.phoneHref} className="transition hover:text-accent">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href={`mailto:${SITE.email}`}
                className="transition hover:text-accent"
              >
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Kurumsal
          </h3>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterServices
            services={services.map((service) => ({
              id: service.id,
              title: service.title,
              slug: service.slug,
            }))}
          />
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Yasal
          </h3>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} {SITE.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-white/35">
            Adana · Çukurova · 7/24 Çilingir Hizmeti
          </p>
        </div>
      </div>
    </footer>
  );
}
