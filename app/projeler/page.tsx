import { Building2, Clock3, MapPinned, Wrench } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProjectGallery from "@/components/projects/ProjectGallery";
import CTA from "@/components/home/CTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projelerimiz",
  description:
    "Adana çilingir ve anahtarcı işlerimizden örnekler: ev, oto, kasa açma ve güvenlik sistemi kurulumları. Çukurova ve Adana genelinde tamamlanan projeler.",
  path: "/projeler",
});

const HIGHLIGHTS = [
  {
    icon: Wrench,
    value: "8.500+",
    label: "Tamamlanan işlem",
  },
  {
    icon: Building2,
    value: "120+",
    label: "Site & iş yeri projesi",
  },
  {
    icon: MapPinned,
    value: "Adana",
    label: "Geniş hizmet ağı",
  },
  {
    icon: Clock3,
    value: "15 dk",
    label: "Ortalama ulaşım",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projelerimiz"
        title="Tamamladığımız İşlerden Örnekler"
        description="Ev, iş yeri ve site projelerinde gerçekleştirdiğimiz çilingirlik ve güvenlik sistemi kurulumlarından bazı örnekler."
      />

      <section className="bg-navy py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="text-center">
              <item.icon className="mx-auto h-5 w-5 text-accent" />
              <p className="mt-3 text-2xl font-extrabold text-white">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Proje Galerisi
            </h2>
            <p className="mt-3 text-black/60">
              Kategoriye göre filtreleyerek tamamladığımız işleri inceleyin.
            </p>
          </div>
          <ProjectGallery />
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Sizin projeniz de burada olsun
          </h2>
          <p className="mt-4 text-black/60">
            Site, ofis veya bireysel ihtiyaçlarınız için keşif ve teklif almak
            üzere bize ulaşın. Kurumsal işlerde faturalı hizmet sunuyoruz.
          </p>
        </div>
      </section>

      {/* <CTA /> */}
    </>
  );
}
