"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, PhoneCall, ShieldCheck, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [renderedPathname, setRenderedPathname] = useState(pathname);

  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: isScrolled ? 8 : 16,
        paddingBottom: isScrolled ? 8 : 16,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "bg-navy/95 shadow-lg shadow-black/20 backdrop-blur"
          : "bg-navy"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-7 w-7 text-accent" />
          <span className="text-lg font-bold sm:text-xl">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? "text-accent" : "text-white/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-navy shadow-md shadow-accent/30 transition-transform active:scale-95 sm:flex sm:px-5 sm:text-base"
          >
            <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Acil Destek: {SITE.phone}</span>
          </a>
          <a
            href={SITE.phoneHref}
            aria-label="Hemen ara"
            className="flex items-center justify-center rounded-full bg-accent p-3 text-navy shadow-md shadow-accent/30 transition-transform active:scale-95 sm:hidden"
          >
            <PhoneCall className="h-5 w-5" />
          </a>
          <button
            type="button"
            aria-label="Menüyü aç/kapat"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center justify-center rounded-full p-2 text-white lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4 pt-2 sm:px-6">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-accent"
                        : "text-white/80 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
