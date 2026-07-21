import Link from "next/link";
import { Home, PhoneCall, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-navy-light blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-7xl font-extrabold tracking-tight text-accent sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
          Sayfa bulunamadı
        </h1>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          Ana sayfaya dönebilir veya bizi doğrudan arayabilirsiniz.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            <Home className="h-5 w-5" />
            Ana Sayfa
          </Button>
          <Button href={SITE.phoneHref} variant="secondary">
            <PhoneCall className="h-5 w-5" />
            Hemen Ara
          </Button>
          <Button href="/hizmetler" variant="secondary">
            <Search className="h-5 w-5" />
            Hizmetler
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
          <Link href="/blog" className="transition hover:text-accent">
            Blog
          </Link>
          <Link href="/iletisim" className="transition hover:text-accent">
            İletişim
          </Link>
          <Link href="/sss" className="transition hover:text-accent">
            SSS
          </Link>
          <Link href="/kvkk" className="transition hover:text-accent">
            KVKK
          </Link>
        </div>
      </div>
    </section>
  );
}
