import { BookOpen, Lightbulb, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import BlogGallery from "@/components/blog/BlogGallery";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Adana çilingir ve anahtarcı rehberi: ev güvenliği, oto çilingirlik, anahtar çoğaltma ve kilit sistemleri hakkında pratik bilgiler.",
  path: "/blog",
});

const TOPICS = [
  {
    icon: ShieldCheck,
    title: "Ev Güvenliği",
    description: "Kilit seçimi, anahtar kaybı ve günlük güvenlik ipuçları.",
  },
  {
    icon: BookOpen,
    title: "Oto & Teknik",
    description: "Çip anahtar, immobilizer ve araç açılışı hakkında rehberler.",
  },
  {
    icon: Lightbulb,
    title: "Pratik Çözümler",
    description: "Acil anlarda doğru adımları bilmek için kısa okumalar.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Güvenlik ve Çilingirlik Rehberi"
        description="Ev, araç ve iş yeri güvenliğinizi artırmanıza yardımcı olacak pratik bilgiler paylaşıyoruz."
      />

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl bg-white p-6 ring-1 ring-black/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <topic.icon className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-navy">{topic.title}</h2>
              <p className="mt-2 text-sm text-black/60">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Tüm Yazılar
            </h2>
            <p className="mt-3 text-black/60">
              İlgilendiğiniz konuya göre yazıları filtreleyin.
            </p>
          </div>
          <BlogGallery />
        </div>
      </section>

      {/* <CTA /> */}
    </>
  );
}
