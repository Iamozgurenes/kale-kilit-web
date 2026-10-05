"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { useHasCookieConsent } from "@/lib/useCookieConsent";
import { useSite } from "@/lib/site-context";

export default function FloatingContact() {
  const site = useSite();
  const lifted = !useHasCookieConsent();

  return (
    <div
      className={`fixed left-4 z-50 flex flex-col gap-3 transition-[bottom] duration-300 sm:left-6 ${
        lifted ? "bottom-36 sm:bottom-28" : "bottom-5 sm:bottom-6"
      }`}
    >
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile yazın"
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe57] active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <a
        href={site.phoneHref}
        aria-label={`Hemen ara: ${site.phone}`}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-navy shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent/90 active:scale-95"
      >
        <PhoneCall className="h-6 w-6" />
      </a>
    </div>
  );
}
