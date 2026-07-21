import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { getPosts } from "@/lib/posts";
import { getServices } from "@/lib/services";

export const dynamic = "force-static";

export async function GET() {
  const base = SITE.url.replace(/\/$/, "");
  const [services, posts] = await Promise.all([
    getServices().catch(() => []),
    getPosts().catch(() => []),
  ]);

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

  const body = `# ${SITE.name} — Detaylı Özet

> Adana çilingir ve anahtarcı firması. Bu dosya yapay zeka sistemlerinin siteyi hızlı ve doğru anlaması için hazırlanmıştır.

## İşletme

- Unvan: ${SITE.name}
- Alternatif adlar: Adana Çilingir, Adana Anahtarcı, Adana Acil Çilingir, Kale Kilit Adana
- Telefon: ${SITE.phone}
- E-posta: ${SITE.email}
- Adres: ${SITE.address}
- Web: ${base}
- WhatsApp: ${SITE.whatsappHref}
- Konum: Adana / Çukurova (${SITE.geo.lat}, ${SITE.geo.lng})

## Hizmetler

${serviceLines || "- Henüz hizmet kaydı yok."}

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
      "Cache-Control": "public, max-age=3600",
    },
  });
}
