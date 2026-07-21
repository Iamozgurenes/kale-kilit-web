import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = SITE.url.replace(/\/$/, "");

  const body = `# ${SITE.name}

> Adana’da 7/24 acil çilingir hizmeti. Ev, oto, kasa çilingirliği ve güvenlik sistemleri.

Site: ${base}
Telefon: ${SITE.phone}
E-posta: ${SITE.email}
Adres: ${SITE.address}

## Ana Sayfalar

- [Anasayfa](${base}/): Acil çilingir hizmeti ve şirket özeti
- [Hakkımızda](${base}/hakkimizda): Firma hikayesi, değerler ve hizmet bölgeleri
- [Hizmetler](${base}/hizmetler): Tüm çilingirlik hizmetleri
- [Projeler](${base}/projeler): Tamamlanan iş örnekleri
- [Blog](${base}/blog): Güvenlik ve çilingirlik rehber yazıları
- [SSS](${base}/sss): Sıkça sorulan sorular
- [İletişim](${base}/iletisim): Telefon, WhatsApp ve iletişim formu

## Yasal

- [KVKK Aydınlatma Metni](${base}/kvkk)
- [Gizlilik Politikası](${base}/gizlilik-politikasi)
- [Çerez Politikası](${base}/cerez-politikasi)
- [Kullanım Koşulları](${base}/kullanim-kosullari)

## Teknik

- [Sitemap](${base}/sitemap.xml)
- [Robots](${base}/robots.txt)
- [Manifest](${base}/manifest.webmanifest)
- [Detaylı LLM özeti](${base}/llms-full.txt)

## Notlar

- Hizmet alanı: Adana (Çukurova ve çevre ilçeler)
- Çalışma: 7/24 kesintisiz acil destek
- İletişim önceliği: telefon ve WhatsApp
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
