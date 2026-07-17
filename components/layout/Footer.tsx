import Link from "next/link";
import { MapPin, Mail, PhoneCall, ShieldCheck } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-light">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold">{SITE.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            7/24 hizmet veren, güvenilir ve yetkili çilingir ekibi. Ev, oto ve
            kasa çilingirliğinde şehrinizin ilk tercihi.
          </p>
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
