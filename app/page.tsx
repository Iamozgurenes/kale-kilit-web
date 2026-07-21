import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Testimonials from "@/components/home/Testimonials";
import FaqPreview from "@/components/home/FaqPreview";
import HomeDynamicSections from "@/components/home/HomeDynamicSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kale Kilit & Çilingir | 7/24 Acil Çilingir Hizmeti Adana",
  description:
    "Kapıda mı kaldınız? Adana’da 15 dakikada yanınızdayız. Ev, oto ve kasa çilingir hizmetlerinde 7/24 hızlı çözüm.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HomeDynamicSections />
      <Stats />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <FaqPreview />
    </>
  );
}
