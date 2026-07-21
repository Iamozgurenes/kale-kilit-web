import type { ReactNode } from "react";
import Image from "next/image";
import { getBannerImage, type BannerPath } from "@/lib/banner";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Sayfa yolu — sabit banner görseli için */
  path: BannerPath;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  path,
}: PageHeaderProps) {
  const background = getBannerImage(path);

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
      <Image
        src={background}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/80 to-navy/40" />
      <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-transparent to-navy/45" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-inset ring-white/20">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
