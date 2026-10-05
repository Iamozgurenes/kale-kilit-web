import { NextResponse } from "next/server";
import { LIVE_CACHE_CONTROL } from "@/lib/cms/live";
import { getAuthorizedBrands, getSiteSettings } from "@/lib/cms/queries";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [site, brands] = await Promise.all([getSiteSettings(), getAuthorizedBrands()]);
  const base = site.url.replace(/\/$/, "");
  const brandLines = brands
    .map((brand) => `- [${brand.shortTitle}](${base}/yetkili-servis/${brand.slug})`)
    .join("\n");

  const body = `# ${site.name}

> Adana çilingir ve anahtarcı — 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma ve kilit değişimi.

Site: ${base}
Telefon: ${site.phone}
E-posta: ${site.email}
Adres: ${site.address}

## Anahtar Kelimeler

Adana çilingir, Adana anahtarcı, Adana acil çilingir, Çukurova çilingir, oto çilingir Adana, ev çilingiri Adana, anahtar çoğaltma Adana

## Ana Sayfalar

- [Anasayfa](${base}/): Adana çilingir & anahtarcı — acil hizmet özeti
- [Hakkımızda](${base}/hakkimizda): Adana çilingir firması hikayesi ve hizmet bölgeleri
- [Hizmetler](${base}/hizmetler): Adana çilingirlik ve anahtarcılık hizmetleri
- [Yetkili Servis](${base}/yetkili-servis): Marka yetkili servisler
${brandLines}
- [Projeler](${base}/projeler): Adana’da tamamlanan iş örnekleri
- [Blog](${base}/blog): Adana çilingir rehber yazıları
- [SSS](${base}/sss): Adana çilingir sıkça sorulan sorular
- [İletişim](${base}/iletisim): Adana çilingir telefon, WhatsApp ve form

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

- Hizmet alanı: Adana (${site.serviceAreas.join(", ")})
- Çalışma: ${site.workingHours}
- İletişim önceliği: telefon ve WhatsApp
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": LIVE_CACHE_CONTROL,
    },
  });
}
