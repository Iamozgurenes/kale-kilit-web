import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Testimonials from "@/components/home/Testimonials";
import FaqPreview from "@/components/home/FaqPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import BlogPreview from "@/components/home/BlogPreview";
import AuthorizedBrandsPreview from "@/components/home/AuthorizedBrandsPreview";
import { metadataForPage } from "@/lib/seo";
import {
  getBlocks,
  getFaqs,
  getHeroSlides,
  getPage,
  getProjects,
  getTestimonials,
} from "@/lib/cms/queries";
import { getPosts } from "@/lib/posts";
import { getServices } from "@/lib/services";
import { pageContent } from "@/lib/cms/types";

export const runtime = "edge";

export async function generateMetadata() {
  return metadataForPage("home", {
    title: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
    description:
      "Adana çilingir ve anahtarcı: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde ortalama 15 dakikada yanınızdayız.",
    path: "/",
  });
}

export default async function Home() {
  const [page, slides, blocks, testimonials, faqs, projects, services, posts] = await Promise.all([
    getPage("home"),
    getHeroSlides(),
    getBlocks(),
    getTestimonials(),
    getFaqs(),
    getProjects(),
    getServices(),
    getPosts(),
  ]);
  const content = pageContent(page, {
    features_title: "Neden Biz?",
    features_subtitle:
      "Güvenilirlik ve hız konusunda taviz vermeden, müşterilerimize en iyi hizmeti sunuyoruz.",
    process_title: "Nasıl Çalışıyoruz?",
    process_subtitle: "Acil anlarda süreci sade tutuyoruz: arayın, gelelim, çözelim.",
    testimonials_title: "Müşterilerimiz Ne Diyor?",
    testimonials_subtitle: "Güven ve hız konusunda bizimle çalışanlardan kısa notlar.",
    faq_title: "Sıkça Sorulan Sorular",
    faq_subtitle: "Ulaşım süresi, fiyat ve hasarsız açılış hakkında en çok sorulanlar.",
  });
  const byGroup = (group: string) => blocks.filter((block) => block.group === group);

  return (
    <>
      <Hero slides={slides} />
      <Features
        items={byGroup("features")}
        title={String(content.features_title)}
        subtitle={String(content.features_subtitle)}
      />
      <AuthorizedBrandsPreview />
      <ServicesPreview services={services} />
      <BlogPreview posts={posts} />
      <Stats items={byGroup("stats")} />
      <Process
        items={byGroup("process")}
        title={String(content.process_title)}
        subtitle={String(content.process_subtitle)}
      />
      <ProjectsPreview items={projects} />
      <Testimonials
        items={testimonials}
        title={String(content.testimonials_title)}
        subtitle={String(content.testimonials_subtitle)}
      />
      <FaqPreview
        items={faqs}
        title={String(content.faq_title)}
        subtitle={String(content.faq_subtitle)}
      />
    </>
  );
}
