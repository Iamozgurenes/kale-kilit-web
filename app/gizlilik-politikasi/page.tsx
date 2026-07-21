import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gizlilik Politikası",
  description:
    "Adana çilingir Kale Kilit gizlilik politikası: web sitesi ziyaretinde ve hizmetlerde kişisel verilerin korunmasına ilişkin bilgilendirme.",
  path: "/gizlilik-politikasi",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Yasal"
      title="Gizlilik Politikası"
      description="Web sitemizi ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda gizliliğinizi nasıl koruduğumuzu açıklıyoruz."
      updatedAt="21 Temmuz 2026"
      path="/gizlilik-politikasi"
      sections={[
        {
          title: "1. Kapsam",
          content: (
            <p>
              Bu politika, {SITE.name} tarafından işletilen web sitesi ve ilgili
              dijital kanallar üzerinden toplanan bilgilere uygulanır. KVKK
              kapsamındaki ayrıntılı bilgilendirme için{" "}
              <Link href="/kvkk" className="text-accent-ink hover:underline">
                KVKK Aydınlatma Metni
              </Link>
              ’ni inceleyebilirsiniz.
            </p>
          ),
        },
        {
          title: "2. Topladığımız Bilgiler",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>İletişim formuna girdiğiniz ad, telefon ve mesaj içeriği</li>
              <li>Telefon / WhatsApp üzerinden paylaştığınız hizmet bilgileri</li>
              <li>Site trafiğine ilişkin teknik kayıtlar ve çerez verileri</li>
            </ul>
          ),
        },
        {
          title: "3. Bilgilerin Kullanımı",
          content: (
            <p>
              Bilgileriniz yalnızca talebinizi karşılamak, hizmet sunmak, yasal
              yükümlülükleri yerine getirmek ve site deneyimini iyileştirmek için
              kullanılır. Pazarlama amaçlı paylaşım yapılmaz; üçüncü taraflara
              satılmaz.
            </p>
          ),
        },
        {
          title: "4. Güvenlik",
          content: (
            <p>
              Verilerinizin yetkisiz erişime karşı korunması için makul teknik ve
              idari tedbirler alınır. İnternet üzerinden yapılan iletimlerde
              mutlak güvenlik garanti edilemese de önlemlerimizi sürekli gözden
              geçiririz.
            </p>
          ),
        },
        {
          title: "5. Üçüncü Taraf Bağlantılar",
          content: (
            <p>
              Sitemizde üçüncü taraf sitelere yönlendiren bağlantılar
              bulunabilir. Bu sitelerin gizlilik uygulamalarından Şirket sorumlu
              değildir; ilgili politikaları ayrıca incelemenizi öneririz.
            </p>
          ),
        },
        {
          title: "6. İletişim",
          content: (
            <p>
              Gizlilik politikamızla ilgili sorularınız için{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-accent-ink hover:underline"
              >
                {SITE.email}
              </a>{" "}
              veya{" "}
              <Link href="/iletisim" className="text-accent-ink hover:underline">
                iletişim sayfası
              </Link>{" "}
              üzerinden bize ulaşabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
