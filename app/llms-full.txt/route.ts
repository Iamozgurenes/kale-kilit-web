import { NextResponse } from "next/server";
import { LIVE_CACHE_CONTROL } from "@/lib/cms/live";
import { getAuthorizedBrands, getSiteSettings } from "@/lib/cms/queries";
import { getPosts } from "@/lib/posts";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [site, services, posts, brands] = await Promise.all([
    getSiteSettings(),
    getServices().catch(() => []),
    getPosts().catch(() => []),
    getAuthorizedBrands().catch(() => []),
  ]);
  const base = site.url.replace(/\/$/, "");

  const serviceLines = services
    .map(
      (service) =>
        `### ${service.title}\n- URL: ${base}/hizmetler/${service.slug}\n- Özet: ${service.shortDescription}\n`,
    )
    .join("\n");

  const postLines = posts
    .map(
      (post) =>
        `### ${post.title}\n- URL: ${base}/blog/${post.slug}\n- Kategori: ${post.category}\n- Özet: ${post.excerpt}\n`,
    )
    .join("\n");

  const brandLines = brands
    .map(
      (brand) =>
        `### ${brand.title}\n- URL: ${base}/yetkili-servis/${brand.slug}\n- Özet: ${brand.summary}\n`,
    )
    .join("\n");

  const body = `# ${site.name} — Detaylı Özet

> Adana çilingir ve anahtarcı firması. Bu dosya yapay zeka sistemlerinin siteyi hızlı ve doğru anlaması için hazırlanmıştır.

## İşletme

- Unvan: ${site.name}
- Alternatif adlar: Adana Çilingir, Adana Anahtarcı, Adana Acil Çilingir, Kale Kilit Adana
- Telefon: ${site.phone}
- E-posta: ${site.email}
- Adres: ${site.address}
- Web: ${base}
- WhatsApp: ${site.whatsappHref}
- Konum: Adana / Çukurova (${site.geo.lat}, ${site.geo.lng})

## Hizmetler

${serviceLines || "- Henüz hizmet kaydı yok."}

## Yetkili Servisler

${brandLines || "- Henüz yetkili servis kaydı yok."}

## Blog Yazıları

${postLines || "- Henüz blog yazısı yok."}

## Önemli Bilgiler

- Adana genelinde 7/24 acil çilingir ve anahtarcı hizmeti
- Ortalama ulaşım hedefi: yaklaşık 15 dakika (trafik/konuma göre değişebilir)
- Hasarsız açılış önceliği
- Şeffaf fiyat bilgilendirmesi
- Ana hizmetler: ev çilingiri, oto çilingir, kasa açma, anahtar çoğaltma, kilit değişimi
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": LIVE_CACHE_CONTROL,
    },
  });
}
