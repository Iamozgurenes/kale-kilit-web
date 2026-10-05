import { Flag, Eye, MapPinned, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Testimonials from "@/components/home/Testimonials";
import Process from "@/components/home/Process";
import { metadataForPage } from "@/lib/seo";
import { getBlocks, getPage, getSiteSettings, getTestimonials } from "@/lib/cms/queries";
import { asStringList, pageContent } from "@/lib/cms/types";
import { getIcon } from "@/lib/icons";

export const runtime = "edge";

export async function generateMetadata() {
  return metadataForPage("about", {
    title: "Hakkımızda",
    description:
      "Adana çilingir ve anahtarcı firması Kale Kilit: hikayemiz, misyonumuz ve vizyonumuz. 10 yılı aşkın tecrübeyle Adana’da 7/24 güvenilir hizmet.",
    path: "/hakkimizda",
  });
}

export default async function AboutPage() {
  const [page, blocks, testimonials, site] = await Promise.all([
    getPage("about"),
    getBlocks(),
    getTestimonials(),
    getSiteSettings(),
  ]);
  const content = pageContent(page, {
    story_title: "Hikayemiz",
    story: [
      "Kale Kilit & Çilingir, küçük bir çilingir atölyesi olarak başladığı yolculuğunda bugün Adana'nın dört bir yanına ulaşan bir ekibe dönüştü.",
      "Bugün ev, oto ve kasa çilingirliğinin yanı sıra modern güvenlik sistemleri kurulumuyla da müşterilerimizin güvenliğini bir adım öteye taşıyoruz.",
    ],
    mission:
      "Acil anlarda hızlı, hasarsız ve şeffaf çözümler sunarak insanların güven duygusunu yeniden kazanmalarını sağlamak.",
    vision:
      "Adana'nın en güvenilir çilingir ve güvenlik sistemleri markası olmak; her çağrıda aynı kaliteyi standartlaştırmak.",
    timeline_title: "Yolculuğumuz",
    timeline_subtitle: "Küçük bir atölyeden şehir genelinde hizmet veren bir ekibe.",
    values_title: "Değerlerimiz",
    values_subtitle: "Her işimizde bizi yönlendiren dört temel ilke.",
    team_title: "Uzman Ekibimiz",
    team_text:
      "Saha ekiplerimiz ev, oto ve kasa çilingirliği ile güvenlik sistemleri konularında düzenli eğitim alır.",
    areas_title: "Hizmet Verdiğimiz Bölgeler",
    areas_note: "Listede olmayan bölgeler için de arayın; en yakın ekibi yönlendirelim.",
  });
  const stats = blocks.filter((block) => block.group === "stats");
  const values = blocks.filter((block) => block.group === "about_values");
  const timeline = blocks.filter((block) => block.group === "about_timeline");
  const process = blocks.filter((block) => block.group === "process");
  const story = asStringList(content.story);

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || "Hakkımızda"}
        title={page?.title || "Güvenliğiniz İçin Yola Çıktık"}
        description={
          page?.description ||
          "2015 yılından bu yana Adana genelinde ev, oto ve kasa çilingirliği alanında binlerce müşteriye hızlı ve güvenilir çözümler sunuyoruz."
        }
        path="/hakkimizda"
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              {String(content.story_title)}
            </h2>
            {story.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-black/60">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.id} value={stat.value} label={stat.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Flag className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-navy">Misyonumuz</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/60">{String(content.mission)}</p>
          </div>
          <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-navy">Vizyonumuz</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/60">{String(content.vision)}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              {String(content.timeline_title)}
            </h2>
            <p className="mt-4 text-black/60">{String(content.timeline_subtitle)}</p>
          </div>
          <ol className="relative grid gap-8 border-l border-navy/15 pl-8 md:grid-cols-2 md:border-l-0 md:pl-0 md:gap-6">
            {timeline.map((item) => (
              <li
                key={item.id}
                className="relative rounded-2xl bg-neutral-50 p-6 md:ring-1 md:ring-black/5"
              >
                <span className="absolute -left-[2.4rem] top-7 h-3 w-3 rounded-full bg-accent md:hidden" />
                <p className="text-sm font-bold text-accent-ink">{item.year}</p>
                <h3 className="mt-2 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              {String(content.values_title)}
            </h2>
            <p className="mt-4 text-black/60">{String(content.values_subtitle)}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <div key={value.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm text-black/60">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
                {String(content.team_title)}
              </h2>
              <p className="mt-4 leading-relaxed text-black/60">{String(content.team_text)}</p>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-2 text-navy">
                <MapPinned className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-bold">{String(content.areas_title)}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {site.serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-xl bg-neutral-100 px-3 py-1.5 text-sm font-medium text-navy/80"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-black/50">{String(content.areas_note)}</p>
            </div>
          </div>
        </div>
      </section>

      <Process items={process} />
      <Testimonials items={testimonials} />
    </>
  );
}
