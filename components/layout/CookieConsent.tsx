"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useHasCookieConsent } from "@/lib/useCookieConsent";

const STORAGE_KEY = "kale-kilit-cookie-consent";

export default function CookieConsent() {
  const hasConsent = useHasCookieConsent();

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore storage errors
    }
    window.dispatchEvent(new Event("kale-cookie-accepted"));
  };

  if (hasConsent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-[0_12px_40px_-12px_rgba(11,26,51,0.35)] backdrop-blur-md sm:flex-row sm:items-center sm:p-5">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Cookie className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-navy">Çerez Kullanımı</p>
            <p className="mt-1 text-sm leading-relaxed text-black/60">
              Sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz.
              Devam ederek{" "}
              <Link
                href="/cerez-politikasi"
                className="font-medium text-navy underline decoration-accent/50 underline-offset-2 hover:text-accent"
              >
                Çerez Politikası
              </Link>
              ’nı kabul etmiş olursunuz.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link
            href="/cerez-politikasi"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-navy/70 ring-1 ring-inset ring-navy/10 transition hover:bg-navy/5"
          >
            Detaylar
          </Link>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-accent/90"
          >
            Çerezleri Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
