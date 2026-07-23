import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = SITE.url.replace(/\/$/, "");

  const body = `# ${SITE.name}

> Adana çilingir ve anahtarcı — 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma ve kilit değişimi.

Site: ${base}
Telefon: ${SITE.phone}
E-posta: ${SITE.email}
Adres: ${SITE.address}

## Anahtar Kelimeler

Adana çilingir, Adana anahtarcı, Adana acil çilingir, Çukurova çilingir, oto çilingir Adana, ev çilingiri Adana, anahtar çoğaltma Adana

## Ana Sayfalar

- [Anasayfa](${base}/): Adana çilingir & anahtarcı — acil hizmet özeti
- [Hakkımızda](${base}/hakkimizda): Adana çilingir firması hikayesi ve hizmet bölgeleri
- [Hizmetler](${base}/hizmetler): Adana çilingirlik ve anahtarcılık hizmetleri
- [Yetkili Servis](${base}/yetkili-servis): Kale Kilit, Multlock, Desi, Dortek kapı yetkili servis
- [Kale Kilit Yetkili Servis](${base}/yetkili-servis/adana-kale-kilit-yetkili-servis)
- [Multlock Yetkili Servis](${base}/yetkili-servis/adana-multlock-yetkili-servis)
- [Desi Yetkili Servis](${base}/yetkili-servis/adana-desi-yetkili-servis)
- [Dortek Kapı Yetkili Servis](${base}/yetkili-servis/adana-dortek-kapi-yetkili-servis)
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

- Hizmet alanı: Adana (Çukurova, Seyhan, Yüreğir, Sarıçam ve çevre ilçeler)
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
