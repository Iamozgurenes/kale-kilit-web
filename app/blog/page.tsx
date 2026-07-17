import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/ui/BlogCard";
import { BLOG_POSTS } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog | Kale Kilit & Çilingir",
  description:
    "Ev güvenliği, oto çilingirlik ve kilit sistemleri hakkında faydalı bilgiler ve öneriler.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Güvenlik ve Çilingirlik Rehberi"
        description="Ev, araç ve iş yeri güvenliğinizi artırmanıza yardımcı olacak pratik bilgiler paylaşıyoruz."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
