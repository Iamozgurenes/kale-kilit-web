import Link from "next/link";
import { MapPin, Mail, PhoneCall, ShieldCheck } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-light">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
        <Link
          href="/"
          className="group flex min-w-0 bg-white p-2 rounded-full ring-1 ring-inset ring-white/10 items-center gap-3 text-navy"
          aria-label={SITE.name}
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <Image src="/logoico.svg" alt="Kale Kilit" width={30} height={30} className="w-full h-full object-contain" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-base font-bold tracking-tight sm:text-lg">
              Kale Kilit
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy/40">
              Çilingir · 7/24
            </span>
          </span>
        </Link>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Sayfalar
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            İletişim
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={SITE.phoneHref} className="hover:text-accent">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-sm text-white/50">
          © {new Date().getFullYear()} {SITE.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
