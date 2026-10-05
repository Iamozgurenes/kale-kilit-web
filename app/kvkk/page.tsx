import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import LegalHtml from "@/components/legal/LegalHtml";
import { metadataForPage } from "@/lib/seo";
import { getPage, getSiteSettings } from "@/lib/cms/queries";

export async function generateMetadata() {
  return metadataForPage("kvkk", {
    title: "KVKK Aydınlatma Metni",
    description:
      "Adana çilingir ve anahtarcı firması Kale Kilit KVKK aydınlatma metni. 6698 sayılı Kanun kapsamında kişisel verilerin işlenmesi hakkında bilgilendirme.",
    path: "/kvkk",
  });
}

export default async function KvkkPage() {
  const [page, site] = await Promise.all([getPage("kvkk"), getSiteSettings()]);
  if (page?.body) return <LegalHtml page={page} path="/kvkk" />;

  return (
    <LegalPage
      eyebrow="Yasal"
      title="KVKK Aydınlatma Metni"
      description="6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      updatedAt="21 Temmuz 2026"
      path="/kvkk"
      sections={[
        {
          title: "1. Veri Sorumlusu",
          content: (
            <>
              <p>
                Bu aydınlatma metni, veri sorumlusu sıfatıyla{" "}
                <strong>{site.name}</strong> (“Şirket”) tarafından
                hazırlanmıştır.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Adres: {site.address}</li>
                <li>
                  Telefon:{" "}
                  <a href={site.phoneHref} className="text-accent-ink hover:underline">
                    {site.phone}
                  </a>
                </li>
                <li>
                  E-posta:{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent-ink hover:underline"
                  >
                    {site.email}
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
                  href={`mailto:${site.email}`}
                  className="text-accent-ink hover:underline"
                >
                  {site.email}
                </a>{" "}
                adresine veya{" "}
                <Link href="/iletisim" className="text-accent-ink hover:underline">
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
