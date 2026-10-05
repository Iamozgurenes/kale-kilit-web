import PageHeader from "@/components/ui/PageHeader";
import Process from "@/components/home/Process";
import ServicesGallery from "@/components/services/ServicesGallery";
import { metadataForPage } from "@/lib/seo";
import { getBlocks, getPage } from "@/lib/cms/queries";
import { getServices } from "@/lib/services";
import { getIcon } from "@/lib/icons";

export const runtime = "edge";

export async function generateMetadata() {
  return metadataForPage("services", {
    title: "Hizmetlerimiz",
    description:
      "Adana çilingir ve anahtarcı hizmetleri: ev çilingiri, oto çilingir, kasa açma, anahtar çoğaltma, kilit değişimi ve güvenlik sistemleri. 7/24 acil müdahale.",
    path: "/hizmetler",
  });
}

export default async function ServicesPage() {
  const [page, blocks, services] = await Promise.all([
    getPage("services"),
    getBlocks(),
    getServices(),
  ]);
  const highlights = blocks.filter((block) => block.group === "services_highlights");
  const process = blocks.filter((block) => block.group === "process");

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || "Hizmetlerimiz"}
        title={page?.title || "İhtiyacınız Olan Her Çilingirlik Hizmeti"}
        description={
          page?.description ||
          "Ev, oto ve kasa çilingirliğinden modern güvenlik sistemlerine kadar geniş hizmet yelpazemizle yanınızdayız."
        }
        path="/hizmetler"
      />

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-navy">{item.title}</h2>
                  <p className="mt-1 text-sm text-black/60">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServicesGallery services={services} />
        </div>
      </section>

      <Process items={process} />
    </>
  );
}
