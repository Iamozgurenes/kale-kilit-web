import PageHeader from "@/components/ui/PageHeader";
import BlogGallery from "@/components/blog/BlogGallery";
import { metadataForPage } from "@/lib/seo";
import { getBlocks, getPage } from "@/lib/cms/queries";
import { getPosts } from "@/lib/posts";
import { pageContent } from "@/lib/cms/types";
import { getIcon } from "@/lib/icons";

export async function generateMetadata() {
  return metadataForPage("blog", {
    title: "Blog",
    description:
      "Adana çilingir ve anahtarcı rehberi: ev güvenliği, oto çilingirlik, anahtar çoğaltma ve kilit sistemleri hakkında pratik bilgiler.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const [page, blocks, posts] = await Promise.all([
    getPage("blog"),
    getBlocks(),
    getPosts(),
  ]);
  const topics = blocks.filter((block) => block.group === "blog_topics");
  const content = pageContent(page, {
    list_title: "Tüm Yazılar",
    list_subtitle: "İlgilendiğiniz konuya göre yazıları filtreleyin.",
  });

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || "Blog"}
        title={page?.title || "Güvenlik ve Çilingirlik Rehberi"}
        description={
          page?.description ||
          "Ev, araç ve iş yeri güvenliğinizi artırmanıza yardımcı olacak pratik bilgiler paylaşıyoruz."
        }
        path="/blog"
      />

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {topics.map((topic) => {
            const Icon = getIcon(topic.icon);
            return (
              <div key={topic.id} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-bold text-navy">{topic.title}</h2>
                <p className="mt-2 text-sm text-black/60">{topic.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              {String(content.list_title)}
            </h2>
            <p className="mt-3 text-black/60">{String(content.list_subtitle)}</p>
          </div>
          <BlogGallery posts={posts} />
        </div>
      </section>
    </>
  );
}
