"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PROJECTS } from "@/lib/data/projects";

export default function ProjectsPreview() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
              Son Projelerimiz
            </h2>
            <p className="mt-4 text-black/60">
              Adana genelinde tamamladığımız bazı işlerden örnekler.
            </p>
          </div>
          <Button
            href="/projeler"
            variant="secondary"
            className="bg-navy/5! text-navy! ring-navy/20! hover:bg-navy/10!"
          >
            Tüm Projeler
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {featured.map((project) => (
            <motion.div key={project.title} variants={fadeInUp}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
