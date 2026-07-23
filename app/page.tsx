import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Testimonials from "@/components/home/Testimonials";
import FaqPreview from "@/components/home/FaqPreview";
import HomeDynamicSections from "@/components/home/HomeDynamicSections";
import AuthorizedBrandsPreview from "@/components/home/AuthorizedBrandsPreview";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
  description:
    "Adana çilingir ve anahtarcı: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde ortalama 15 dakikada yanınızdayız.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AuthorizedBrandsPreview />
      <HomeDynamicSections />
      <Stats />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <FaqPreview />
    </>
  );
}
