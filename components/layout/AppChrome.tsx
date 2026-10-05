"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}
