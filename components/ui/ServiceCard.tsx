import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, cardHover } from "@/lib/animations";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group rounded-2xl border border-black/5 bg-white p-8 shadow-sm"
    >
      <motion.div variants={cardHover}>
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-navy">{title}</h3>
        <p className="mt-2 text-sm text-black/60">{description}</p>
      </motion.div>
    </motion.div>
  );
}
