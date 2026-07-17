"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, ShieldCheck } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        paddingTop: isScrolled ? 8 : 20,
        paddingBottom: isScrolled ? 8 : 20,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "bg-navy/95 shadow-lg shadow-black/20 backdrop-blur"
          : "bg-navy"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#hero" className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-7 w-7 text-accent" />
          <span className="text-lg font-bold sm:text-xl">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={SITE.phoneHref}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-navy shadow-md shadow-accent/30 transition-transform active:scale-95 sm:px-5 sm:text-base"
        >
          <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden xs:inline">Acil Destek</span>
          <span className="hidden sm:inline">: {SITE.phone}</span>
        </a>
      </div>
    </motion.header>
  );
}
