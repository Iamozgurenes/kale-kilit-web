import type { Metadata } from "next";
import {
  BadgeCheck,
  Eye,
  Flag,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Testimonials from "@/components/home/Testimonials";
import Process from "@/components/home/Process";
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

const TIMELINE = [
  {
    year: "2015",
    title: "Kuruluş",
    description:
      "Küçük bir atölyede, kapıda kalan ailelere hızlı destek verme hedefiyle yola çıktık.",
  },
  {
    year: "2018",
    title: "Ekip Genişlemesi",
    description:
      "Anadolu ve Avrupa yakasında eş zamanlı müdahale için saha ekibimizi büyüttük.",
  },
  {
    year: "2021",
    title: "Güvenlik Sistemleri",
    description:
      "Akıllı kilit ve kartlı geçiş kurulumlarını hizmet portföyümüze ekledik.",
  },
  {
    year: "2026",
    title: "Bugün",
    description:
      "8.500+ tamamlanan işlem ve 7/24 kesintisiz hizmetle İstanbul genelinde yanınızdayız.",
  },
];

const AREAS = [
  "Kadıköy",
  "Ataşehir",
  "Üsküdar",
  "Maltepe",
  "Kartal",
  "Şişli",
  "Beşiktaş",
  "Bakırköy",
  "Levent",
  "Beykoz",
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
              Kale Kilit & Çilingir, küçük bir çilingir atölyesi olarak başladığı
              yolculuğunda bugün İstanbul&apos;un dört bir yanına ulaşan, onlarca
              uzman çilingirden oluşan bir ekibe dönüştü. Kapıda kalan bir
              ailenin gece yarısı yaşadığı çaresizliği görerek yola çıktık ve o
              günden beri tek bir hedefimiz oldu: İnsanların en çaresiz anında
              yanlarında olmak.
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
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Flag className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-navy">Misyonumuz</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              Acil anlarda hızlı, hasarsız ve şeffaf çözümler sunarak
              insanların güven duygusunu yeniden kazanmalarını sağlamak.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-navy">Vizyonumuz</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              İstanbul&apos;un en güvenilir çilingir ve güvenlik sistemleri
              markası olmak; her çağrıda aynı kaliteyi standartlaştırmak.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Yolculuğumuz
            </h2>
            <p className="mt-4 text-black/60">
              Küçük bir atölyeden şehir genelinde hizmet veren bir ekibe.
            </p>
          </div>

          <ol className="relative grid gap-8 border-l border-navy/15 pl-8 md:grid-cols-2 md:border-l-0 md:pl-0 md:gap-6">
            {TIMELINE.map((item) => (
              <li
                key={item.year}
                className="relative rounded-2xl bg-neutral-50 p-6 md:ring-1 md:ring-black/5"
              >
                <span className="absolute -left-[2.4rem] top-7 h-3 w-3 rounded-full bg-accent md:hidden" />
                <p className="text-sm font-bold text-accent">{item.year}</p>
                <h3 className="mt-2 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
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
                <p className="mt-2 text-sm text-black/60">{value.description}</p>
              </div>
            ))}
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
                Uzman Ekibimiz
              </h2>
              <p className="mt-4 leading-relaxed text-black/60">
                Saha ekiplerimiz ev, oto ve kasa çilingirliği ile güvenlik
                sistemleri konularında düzenli eğitim alır. Her çağrıda kimlik
                doğrulama, hasarsız müdahale ve net fiyat bilgilendirmesi
                standartlarımızdır.
              </p>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-2 text-navy">
                <MapPinned className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-bold">Hizmet Verdiğimiz Bölgeler</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {AREAS.map((area) => (
                  <li
                    key={area}
                    className="rounded-xl bg-neutral-100 px-3 py-1.5 text-sm font-medium text-navy/80"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-black/50">
                Listede olmayan bölgeler için de arayın; en yakın ekibi
                yönlendirelim.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
