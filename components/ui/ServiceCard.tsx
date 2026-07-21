"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, cardHover } from "@/lib/animations";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  coverImage?: string | null;
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  coverImage,
}: ServiceCardProps) {
  const inner = (
    <motion.div variants={cardHover} className="overflow-hidden">
      {coverImage ? (
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      ) : (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <h3 className="text-xl font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-black/60">{description}</p>
    </motion.div>
  );

  if (href) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <Link
          href={href}
          className="group block rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:border-accent/30 sm:p-6"
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6"
    >
      {inner}
    </motion.div>
  );
}
