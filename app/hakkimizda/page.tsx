import type { Metadata } from "next";
import { BadgeCheck, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Hakkımızda | Kale Kilit & Çilingir",
  description:
    "Kale Kilit & Çilingir'in hikayesi, misyonu ve vizyonu. 10 yılı aşkın tecrübeyle 7/24 güvenilir çilingir hizmeti.",
};

const STATS = [
  { value: "10+", label: "Yıllık Tecrübe" },
  { value: "8.500+", label: "Tamamlanan İşlem" },
  { value: "15 dk", label: "Ortalama Ulaşım Süresi" },
  { value: "7/24", label: "Kesintisiz Hizmet" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Güvenilirlik",
    description:
      "Her çalışanımız kimlik kontrolünden geçer, işlemlerimiz şeffaf ve kayıt altındadır.",
  },
  {
    icon: Target,
    title: "Hız",
    description:
      "Acil durumlarda dakikaların önemini biliyoruz, bu yüzden ortalama 15 dakikada yerinizdeyiz.",
  },
  {
    icon: BadgeCheck,
    title: "Uzmanlık",
    description:
      "Ekibimiz düzenli eğitimlerden geçer, en güncel kilit ve güvenlik sistemlerine hakimdir.",
  },
  {
    icon: HeartHandshake,
    title: "Müşteri Memnuniyeti",
    description:
      "Şeffaf fiyatlandırma ve dürüst iletişimle uzun soluklu güven ilişkileri kuruyoruz.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hakkımızda"
        title="Güvenliğiniz İçin Yola Çıktık"
        description="2015 yılından bu yana İstanbul genelinde ev, oto ve kasa çilingirliği alanında binlerce müşteriye hızlı ve güvenilir çözümler sunuyoruz."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Hikayemiz
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              Kale Kilit & Çilingir, küçük bir çilingir atölyesi olarak başladığı yolculuğunda
              bugün İstanbul&apos;un dört bir yanına ulaşan, onlarca uzman çilingirden
              oluşan bir ekibe dönüştü. Kapıda kalan bir ailenin gece yarısı
              yaşadığı çaresizliği görerek yola çıktık ve o günden beri tek bir
              hedefimiz oldu: İnsanların en çaresiz anında yanlarında olmak.
            </p>
            <p className="mt-4 leading-relaxed text-black/60">
              Bugün ev, oto ve kasa çilingirliğinin yanı sıra modern güvenlik
              sistemleri kurulumuyla da müşterilerimizin güvenliğini bir adım
              öteye taşıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Değerlerimiz
            </h2>
            <p className="mt-4 text-black/60">
              Her işimizde bizi yönlendiren dört temel ilke.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-black/60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
