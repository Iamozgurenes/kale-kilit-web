import { MapPin } from "lucide-react";

type ProjectCardProps = {
  title: string;
  category: string;
  location: string;
  description: string;
};

export default function ProjectCard({
  title,
  category,
  location,
  description,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <span className="w-fit rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
        {category}
      </span>
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-black/60">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-black/50">
        <MapPin className="h-4 w-4 text-accent" />
        {location}
      </div>
    </div>
  );
}
