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
import { getServices } from "@/lib/services";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, posts] = await Promise.all([
    getServices({ limit: 4 }).catch(() => []),
    getPosts({ limit: 3 }).catch(() => []),
  ]);

  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview services={services} />
      <Stats />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <FaqPreview />
      <BlogPreview posts={posts} />
      <CTA />
    </>
  );
}
