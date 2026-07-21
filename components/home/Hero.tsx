"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, PhoneCall, Wrench } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { HERO_SLIDES } from "@/lib/data/hero";

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[index];
  const total = HERO_SLIDES.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [next, paused]);

  return (
    <section
      id="hero"
      className="relative min-h-[min(48vh,460px)] overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Ana sayfa vitrin"
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={`${slide.title} ${slide.highlight}`}
              fill
              unoptimized
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/80 to-navy/35" />
          <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-transparent to-navy/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[min(48vh,460px)] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
              {SITE.name}
            </p>

            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              {slide.title}
              <br />
              <span className="text-accent">{slide.highlight}</span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-white/75 sm:text-lg">
              {slide.description}
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href={SITE.phoneHref}
                variant="primary"
                className="w-full sm:w-auto"
              >
                <PhoneCall className="h-5 w-5" />
                Hemen Ara
              </Button>
              <Button
                href="/hizmetler"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Wrench className="h-5 w-5" />
                Hizmetlerimiz
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Slaytlar">
            {HERO_SLIDES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slayt ${i + 1}`}
                onClick={() => goTo(i)}
                className="group flex h-6 min-w-6 items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-10 bg-accent"
                      : "w-2.5 bg-white/35 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Önceki slayt"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Sonraki slayt"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
