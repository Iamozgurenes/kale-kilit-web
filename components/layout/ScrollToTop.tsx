"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useHasCookieConsent } from "@/lib/useCookieConsent";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lifted = !useHasCookieConsent();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Yukarı çık"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/30 transition-[bottom,transform] duration-300 hover:-translate-y-0.5 hover:bg-navy-light active:scale-95 sm:right-6 ${
        lifted ? "bottom-36 sm:bottom-28" : "bottom-5 sm:bottom-6"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
