import type { Metadata } from "next";
import { Clock3, Shield, Wallet } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Process from "@/components/home/Process";
import ServicesGallery from "@/components/services/ServicesGallery";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Kale Kilit & Çilingir",
  description:
    "Ev çilingiri, oto çilingir, kasa açma, kilit değişimi ve güvenlik sistemleri dahil tüm çilingirlik hizmetlerimiz.",
};

const HIGHLIGHTS = [
  {
    icon: Clock3,
    title: "Hızlı Müdahale",
    description: "Ortalama 15 dakikada konumunuza ulaşıyoruz.",
  },
  {
    icon: Shield,
    title: "Hasarsız Açılış",
    description: "Önceliğimiz kapı ve kilidinize zarar vermemek.",
  },
  {
    icon: Wallet,
    title: "Şeffaf Fiyat",
    description: "Arama anında net teklif, gizli ücret yok.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hizmetlerimiz"
        title="İhtiyacınız Olan Her Çilingirlik Hizmeti"
        description="Ev, oto ve kasa çilingirliğinden modern güvenlik sistemlerine kadar geniş hizmet yelpazemizle yanınızdayız."
      />

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-navy">{item.title}</h2>
                <p className="mt-1 text-sm text-black/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServicesGallery />
        </div>
      </section>

      <Process />
    </>
  );
}
