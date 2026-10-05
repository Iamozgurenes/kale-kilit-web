import PageHeader from "@/components/ui/PageHeader";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { metadataForPage } from "@/lib/seo";
import { getBlocks, getPage, getProjects } from "@/lib/cms/queries";
import { pageContent } from "@/lib/cms/types";
import { getIcon } from "@/lib/icons";

export async function generateMetadata() {
  return metadataForPage("projects", {
    title: "Projelerimiz",
    description:
      "Adana çilingir ve anahtarcı işlerimizden örnekler: ev, oto, kasa açma ve güvenlik sistemi kurulumları. Çukurova ve Adana genelinde tamamlanan projeler.",
    path: "/projeler",
  });
}

export default async function ProjectsPage() {
  const [page, blocks, projects] = await Promise.all([
    getPage("projects"),
    getBlocks(),
    getProjects(),
  ]);
  const highlights = blocks.filter((block) => block.group === "projects_highlights");
  const content = pageContent(page, {
    gallery_title: "Proje Galerisi",
    gallery_subtitle: "Kategoriye göre filtreleyerek tamamladığımız işleri inceleyin.",
    cta_title: "Sizin projeniz de burada olsun",
    cta_text:
      "Site, ofis veya bireysel ihtiyaçlarınız için keşif ve teklif almak üzere bize ulaşın. Kurumsal işlerde faturalı hizmet sunuyoruz.",
  });

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || "Projelerimiz"}
        title={page?.title || "Tamamladığımız İşlerden Örnekler"}
        description={
          page?.description ||
          "Ev, iş yeri ve site projelerinde gerçekleştirdiğimiz çilingirlik ve güvenlik sistemi kurulumlarından bazı örnekler."
        }
        path="/projeler"
      />

      <section className="bg-navy py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.id} className="text-center">
                <Icon className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 text-2xl font-extrabold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-white/60">{item.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              {String(content.gallery_title)}
            </h2>
            <p className="mt-3 text-black/60">{String(content.gallery_subtitle)}</p>
          </div>
          <ProjectGallery items={projects} />
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            {String(content.cta_title)}
          </h2>
          <p className="mt-4 text-black/60">{String(content.cta_text)}</p>
        </div>
      </section>
    </>
  );
}
