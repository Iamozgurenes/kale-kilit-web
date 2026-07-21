"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, PhoneCall, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [renderedPathname, setRenderedPathname] = useState(pathname);

  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-0 z-[100] flex h-dvh w-screen flex-col bg-white lg:hidden"
            aria-label="Mobil menü"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/5 px-4 sm:h-[4.25rem] sm:px-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-navy"
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
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy/65">
                    Çilingir · 7/24
                  </span>
                </span>
              </Link>

              <button
                type="button"
                aria-label="Menüyü kapat"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-navy ring-1 ring-inset ring-navy/10 transition hover:bg-navy/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-8 sm:px-6">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy/65">
                Menü
              </p>

              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.045,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center justify-between border-b border-black/5 py-4 text-2xl font-bold tracking-tight transition-colors ${
                          active
                            ? "text-navy"
                            : "text-navy/55 hover:text-navy"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {active && (
                            <span className="h-2 w-2 rounded-full bg-accent" />
                          )}
                          {link.label}
                        </span>
                        <span
                          className={`text-sm font-medium transition ${
                            active
                              ? "text-accent"
                              : "text-navy/60 group-hover:text-navy/80"
                          }`}
                        >
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                className="mt-auto pt-10 pb-6"
              >
                <a
                  href={SITE.phoneHref}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-5 py-4 text-base font-bold text-navy transition hover:bg-accent/90"
                >
                  <PhoneCall className="h-5 w-5" />
                  Acil Destek · {SITE.phone}
                </a>
                <p className="mt-4 text-center text-xs text-navy/65">
                  7/24 kesintisiz çilingir hizmeti
                </p>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${
          isScrolled
            ? "border-b border-black/8 bg-white/90 shadow-[0_8px_30px_-16px_rgba(11,26,51,0.18)] backdrop-blur-xl"
            : "border-b border-black/5 bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 text-navy"
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
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-base font-bold tracking-tight sm:text-lg">
                Kale Kilit
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy/65">
                Çilingir · 7/24
              </span>
            </span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Ana menü">
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors xl:px-3.5 ${
                        active
                          ? "text-navy"
                          : "text-navy/55 hover:text-navy"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-3 rounded-xl bg-accent px-3.5 py-2 text-navy transition hover:bg-accent/90 active:scale-[0.98] md:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10">
                <PhoneCall className="h-4 w-4" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/65">
                  Acil Destek
                </span>
                <span className="mt-0.5 text-sm font-bold tabular-nums">
                  {SITE.phone}
                </span>
              </span>
            </a>

            <a
              href={SITE.phoneHref}
              aria-label={`Hemen ara: ${SITE.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-navy transition hover:bg-accent/90 active:scale-[0.98] md:hidden"
            >
              <PhoneCall className="h-5 w-5" />
            </a>

            <button
              type="button"
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-navy ring-1 ring-inset ring-navy/10 transition hover:bg-navy/5 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
