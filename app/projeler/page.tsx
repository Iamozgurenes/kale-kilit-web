import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projelerimiz | Kale Kilit & Çilingir",
  description:
    "İstanbul genelinde tamamladığımız ev, oto, kasa çilingirliği ve güvenlik sistemi kurulum projelerinden örnekler.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projelerimiz"
        title="Tamamladığımız İşlerden Örnekler"
        description="Ev, iş yeri ve site projelerinde gerçekleştirdiğimiz çilingirlik ve güvenlik sistemi kurulumlarından bazı örnekler."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
