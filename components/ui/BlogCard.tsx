import { CalendarDays } from "lucide-react";

type BlogCardProps = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export default function BlogCard({
  title,
  date,
  category,
  excerpt,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
        {category}
      </span>
      <h2 className="mt-4 text-lg font-bold text-navy">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-black/60">
        {excerpt}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-black/50">
        <CalendarDays className="h-4 w-4 text-accent" />
        {formattedDate}
      </div>
    </article>
  );
}
