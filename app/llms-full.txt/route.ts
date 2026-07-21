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

> Bu dosya yapay zeka sistemlerinin siteyi hızlı ve doğru anlaması için hazırlanmıştır.

## İşletme

- Unvan: ${SITE.name}
- Telefon: ${SITE.phone}
- E-posta: ${SITE.email}
- Adres: ${SITE.address}
- Web: ${base}
- WhatsApp: ${SITE.whatsappHref}

## Hizmetler

${serviceLines || "- Henüz hizmet kaydı yok."}

## Blog Yazıları

${postLines || "- Henüz blog yazısı yok."}

## Önemli Bilgiler

- 7/24 acil çilingir hizmeti
- Ortalama ulaşım hedefi: yaklaşık 15 dakika (trafik/konuma göre değişebilir)
- Hasarsız açılış önceliği
- Şeffaf fiyat bilgilendirmesi
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
