import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import LegalHtml from "@/components/legal/LegalHtml";
import { metadataForPage } from "@/lib/seo";
import { getPage, getSiteSettings } from "@/lib/cms/queries";


export async function generateMetadata() {
  return metadataForPage("terms", {
    title: "Kullanım Koşulları",
    description:
      "Adana çilingir ve anahtarcı Kale Kilit web sitesi kullanım koşulları ve yasal bilgilendirme.",
    path: "/kullanim-kosullari",
  });
}

export default async function TermsPage() {
  const [page, site] = await Promise.all([getPage("terms"), getSiteSettings()]);
  if (page?.body) return <LegalHtml page={page} path="/kullanim-kosullari" />;

  return (
    <LegalPage
      eyebrow="Yasal"
      title="Kullanım Koşulları"
      description="Web sitemizi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız."
      updatedAt="21 Temmuz 2026"
      path="/kullanim-kosullari"
      sections={[
        {
          title: "1. Genel",
          content: (
            <p>
              {site.name} web sitesi bilgilendirme ve iletişim amaçlıdır. Sitede
              yer alan içerikler genel niteliklidir; somut bir hizmet taahhüdü
              yerine geçmez. Hizmet koşulları çağrı veya yerinde keşif sonrası
              netleştirilir.
            </p>
          ),
        },
        {
          title: "2. Hizmet Bilgileri",
          content: (
            <p>
              Ulaşım süreleri, fiyatlar ve teknik çözümler; konum, trafik, kapı /
              kilit tipi ve işin niteliğine göre değişiklik gösterebilir. Web
              sitesindeki örnek süre ve ifadeler bilgilendirme amaçlıdır.
            </p>
          ),
        },
        {
          title: "3. Fikri Mülkiyet",
          content: (
            <p>
              Sitedeki metin, görsel, logo ve tasarım unsurları {site.name}’e
              aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla
              kullanılamaz.
            </p>
          ),
        },
        {
          title: "4. Kullanıcı Yükümlülükleri",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>İletişim formunda doğru ve güncel bilgi paylaşmak</li>
              <li>Siteyi hukuka aykırı amaçlarla kullanmamak</li>
              <li>Sistem güvenliğini bozacak girişimlerde bulunmamak</li>
            </ul>
          ),
        },
        {
          title: "5. Sorumluluk Sınırı",
          content: (
            <p>
              Site içeriğinin kesintisiz veya hatasız olacağı garanti edilmez.
              Dolaylı zararlardan, üçüncü taraf bağlantılarından veya kullanıcı
              hatalarından doğabilecek sonuçlardan Şirket sorumlu tutulamaz.
            </p>
          ),
        },
        {
          title: "6. Değişiklikler",
          content: (
            <p>
              Kullanım koşulları önceden haber verilmeksizin güncellenebilir.
              Güncel metin bu sayfada yayınlandığı anda yürürlüğe girer.
            </p>
          ),
        },
        {
          title: "7. İletişim",
          content: (
            <p>
              Sorularınız için{" "}
              <a href={site.phoneHref} className="text-accent-ink hover:underline">
                {site.phone}
              </a>
              ,{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent-ink hover:underline"
              >
                {site.email}
              </a>{" "}
              veya{" "}
              <Link href="/iletisim" className="text-accent-ink hover:underline">
                iletişim formu
              </Link>{" "}
              kullanılabilir.
            </p>
          ),
        },
      ]}
    />
  );
}
