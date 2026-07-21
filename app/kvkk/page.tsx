import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Kale Kilit & Çilingir aydınlatma metni.",
  path: "/kvkk",
});

export default function KvkkPage() {
  return (
    <LegalPage
      eyebrow="Yasal"
      title="KVKK Aydınlatma Metni"
      description="6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      updatedAt="21 Temmuz 2026"
      sections={[
        {
          title: "1. Veri Sorumlusu",
          content: (
            <>
              <p>
                Bu aydınlatma metni, veri sorumlusu sıfatıyla{" "}
                <strong>{SITE.name}</strong> (“Şirket”) tarafından
                hazırlanmıştır.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Adres: {SITE.address}</li>
                <li>
                  Telefon:{" "}
                  <a href={SITE.phoneHref} className="text-accent hover:underline">
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  E-posta:{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-accent hover:underline"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "2. İşlenen Kişisel Veriler",
          content: (
            <>
              <p>Hizmetlerimiz kapsamında aşağıdaki veriler işlenebilir:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Kimlik bilgileri (ad, soyad)</li>
                <li>İletişim bilgileri (telefon, e-posta, adres)</li>
                <li>Hizmet talebi ve işlem içeriğine ilişkin bilgiler</li>
                <li>Site kullanımına ilişkin teknik veriler (IP, çerez kayıtları)</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. İşleme Amaçları",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Çilingirlik ve güvenlik hizmetlerinin sunulması</li>
              <li>Taleplerinize yanıt verilmesi ve müşteri ilişkileri yönetimi</li>
              <li>Sözleşme süreçlerinin yürütülmesi ve faturalandırma</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Site güvenliği, performans ve kullanıcı deneyiminin iyileştirilmesi</li>
            </ul>
          ),
        },
        {
          title: "4. Hukuki Sebepler",
          content: (
            <p>
              Kişisel verileriniz; KVKK’nın 5. ve 6. maddelerinde belirtilen
              hukuki sebepler çerçevesinde, özellikle sözleşmenin kurulması/ifası,
              hukuki yükümlülüklerin yerine getirilmesi, meşru menfaat ve
              gerektiğinde açık rızanıza dayanılarak işlenir.
            </p>
          ),
        },
        {
          title: "5. Aktarım",
          content: (
            <p>
              Verileriniz, hizmetin gerektirdiği ölçüde tedarikçilerimize,
              bilişim altyapısı sağlayıcılarına ve yasal zorunluluk halinde yetkili
              kamu kurumlarına aktarılabilir. Yurt dışı aktarım söz konusu
              olduğunda KVKK’nın ilgili hükümlerine uygun hareket edilir.
            </p>
          ),
        },
        {
          title: "6. Saklama Süresi",
          content: (
            <p>
              Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili
              mevzuatta öngörülen zamanaşımı / saklama süreleri boyunca muhafaza
              edilir; süre sonunda silinir, yok edilir veya anonim hale getirilir.
            </p>
          ),
        },
        {
          title: "7. Haklarınız",
          content: (
            <>
              <p>KVKK’nın 11. maddesi uyarınca:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                <li>KVKK’da öngörülen şartlarda silinmesini/yok edilmesini isteme</li>
                <li>İşlemeye itiraz etme ve zararınızın giderilmesini talep etme</li>
              </ul>
              <p>
                Başvurularınızı{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-accent hover:underline"
                >
                  {SITE.email}
                </a>{" "}
                adresine veya{" "}
                <Link href="/iletisim" className="text-accent hover:underline">
                  iletişim formu
                </Link>{" "}
                üzerinden iletebilirsiniz.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
