import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ServicesPreview from "@/components/home/ServicesPreview";
import Stats from "@/components/home/Stats";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Testimonials from "@/components/home/Testimonials";
import FaqPreview from "@/components/home/FaqPreview";
import BlogPreview from "@/components/home/BlogPreview";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>

      <Hero />
      <Features />
      <ServicesPreview />
      <Stats />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <FaqPreview />
      <BlogPreview />
      <CTA />
      
    </>
  );
}
