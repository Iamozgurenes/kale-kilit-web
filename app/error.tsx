"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, PhoneCall, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Bir sorun oluştu
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
          Sayfa yüklenirken hata oluştu
        </h1>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Geçici bir sorun olabilir. Tekrar deneyebilir veya ana sayfaya
          dönebilirsiniz.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-navy transition hover:bg-accent/90"
          >
            <RotateCcw className="h-5 w-5" />
            Tekrar Dene
          </button>
          <Button href="/" variant="secondary">
            <Home className="h-5 w-5" />
            Ana Sayfa
          </Button>
          <Button href={SITE.phoneHref} variant="secondary">
            <PhoneCall className="h-5 w-5" />
            Hemen Ara
          </Button>
        </div>

        <p className="mt-10 text-sm text-white/45">
          Sorun devam ederse{" "}
          <Link href="/iletisim" className="text-accent hover:underline">
            iletişim
          </Link>{" "}
          sayfasından bize yazın.
        </p>
      </div>
    </section>
  );
}
