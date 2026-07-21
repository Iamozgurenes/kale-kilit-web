import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

type BlogCardProps = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  href?: string;
  coverImage?: string | null;
};

export default function BlogCard({
  title,
  date,
  category,
  excerpt,
  href,
  coverImage,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              Blog
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy shadow-sm">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-lg font-bold text-navy transition-colors group-hover:text-accent">
          {title}
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-black/60">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-black/50">
          <CalendarDays className="h-4 w-4 text-accent" />
          {formattedDate}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:border-accent/30"
      >
        {body}
      </Link>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      {body}
    </article>
  );
}
