import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Testimonials from "@/components/home/Testimonials";
import FaqPreview from "@/components/home/FaqPreview";
import HomeDynamicSections from "@/components/home/HomeDynamicSections";

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
