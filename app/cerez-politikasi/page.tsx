import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import LegalHtml from "@/components/legal/LegalHtml";
import { metadataForPage } from "@/lib/seo";
import { getPage, getSiteSettings } from "@/lib/cms/queries";


export async function generateMetadata() {
  return metadataForPage("cookies", {
    title: "Çerez Politikası",
    description:
      "Adana çilingir Kale Kilit web sitesinde kullanılan çerezler, amaçları ve tercihlerinizi yönetme hakkında bilgilendirme.",
    path: "/cerez-politikasi",
  });
}

export default async function CookiePolicyPage() {
  const [page, site] = await Promise.all([getPage("cookies"), getSiteSettings()]);
  if (page?.body) return <LegalHtml page={page} path="/cerez-politikasi" />;

  return (
    <LegalPage
      eyebrow="Yasal"
      title="Çerez Politikası"
      description="Sitemizde kullanılan çerez türleri, amaçları ve yönetimine ilişkin bilgilendirme."
      updatedAt="21 Temmuz 2026"
      path="/cerez-politikasi"
      sections={[
        {
          title: "1. Çerez Nedir?",
          content: (
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız
              tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Site
              işlevselliği, performans ölçümü ve kullanıcı deneyiminin
              iyileştirilmesi için kullanılabilir.
            </p>
          ),
        },
        {
          title: "2. Kullandığımız Çerez Türleri",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için
                gereklidir.
              </li>
              <li>
                <strong>Performans / analitik çerezler:</strong> Trafik ve
                kullanım istatistiklerini anlamamıza yardımcı olur.
              </li>
              <li>
                <strong>İşlevsel çerezler:</strong> Tercihlerinizi hatırlayarak
                deneyimi iyileştirir.
              </li>
            </ul>
          ),
        },
        {
          title: "3. Çerezleri Yönetme",
          content: (
            <p>
              Tarayıcı ayarlarınız üzerinden çerezleri silebilir, engelleyebilir
              veya uyarı alacak şekilde yapılandırabilirsiniz. Zorunlu çerezlerin
              engellenmesi halinde sitenin bazı bölümleri düzgün çalışmayabilir.
            </p>
          ),
        },
        {
          title: "4. Güncellemeler",
          content: (
            <p>
              Bu politika gerektiğinde güncellenebilir. Güncel metin her zaman
              bu sayfada yayınlanır.
            </p>
          ),
        },
        {
          title: "5. İletişim",
          content: (
            <p>
              Çerez politikası hakkında sorularınız için{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent-ink hover:underline"
              >
                {site.email}
              </a>{" "}
              adresine yazabilir veya{" "}
              <Link href="/kvkk" className="text-accent-ink hover:underline">
                KVKK metnimizi
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
