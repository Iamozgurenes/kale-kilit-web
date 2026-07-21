"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  coverImage?: string | null;
  index?: number;
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  coverImage,
  index,
}: ServiceCardProps) {
  const card = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:ring-accent/50 hover:shadow-[0_20px_40px_-24px_rgba(11,26,51,0.35)]">
      <div className="relative isolate aspect-[16/10] w-full overflow-hidden bg-neutral-200">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-navy via-navy-light to-[#1c3a6e]" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

        {typeof index === "number" && (
          <span className="absolute left-4 top-4 z-10 font-mono text-xs font-semibold tracking-widest text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        <span className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md ring-1 ring-white/25 transition duration-300 group-hover:bg-accent group-hover:text-navy group-hover:ring-accent">
          <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:rotate-12" />
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-0">
        <div className="-mt-7 mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-navy shadow-lg shadow-accent/30 ring-4 ring-white transition duration-300 group-hover:scale-105">
          <Icon className="h-6 w-6" strokeWidth={2.25} />
        </div>

        <h3 className="text-lg font-bold leading-snug text-navy transition-colors group-hover:text-navy-light sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-black/55">
          {description}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/70 transition group-hover:gap-2.5 group-hover:text-accent">
          Detayı incele
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );

  return (
    <motion.div variants={fadeInUp} className="h-full">
      {href ? (
        <Link href={href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-3xl">
          {card}
        </Link>
      ) : (
        card
      )}
    </motion.div>
  );
}
