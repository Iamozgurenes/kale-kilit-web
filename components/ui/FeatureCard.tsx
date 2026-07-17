import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5 sm:items-start sm:text-left"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-black/60">{description}</p>
    </motion.div>
  );
}
