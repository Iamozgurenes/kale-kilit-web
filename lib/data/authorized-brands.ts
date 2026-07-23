import { BadgeCheck, DoorOpen, KeyRound, Lock, type LucideIcon } from "lucide-react";

export type AuthorizedBrand = {
  slug: string;
  brand: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  features: string[];
  services: string[];
  icon: LucideIcon;
  seoTitle: string;
  seoDescription: string;
};

export const AUTHORIZED_BRANDS: AuthorizedBrand[] = [
  {
    slug: "adana-kale-kilit-yetkili-servis",
    brand: "Kale Kilit",
    title: "Kale Kilit Yetkili Servis",
    shortTitle: "Kale Kilit Yetkili Servis",
    summary:
      "Adana Kale Kilit yetkili servisi olarak kilit değişimi, göbek değişimi, anahtar çoğaltma ve acil açılış hizmeti sunuyoruz.",
    description:
      "Adana Kale Kilit yetkili servis noktası olarak ev, iş yeri ve site kapılarında Kale Kilit ürünleri için kurulum, bakım, arıza ve acil müdahale hizmeti veriyoruz. Orijinal parça ve yetkili servis standartlarıyla hasarsız çözüm önceliğimizdir. Çukurova, Seyhan, Yüreğir ve Adana genelinde 7/24 destek sağlıyoruz.",
    features: [
      "Orijinal Kale Kilit parça ve aksesuar",
      "Göbek / silindir değişimi",
      "Anahtar çoğaltma ve yedek anahtar",
      "Acil kapı açma (hasarsız öncelik)",
      "Site ve iş yeri kilit sistemleri",
    ],
    services: [
      "Kale kilit değişimi",
      "Kale göbek değişimi",
      "Kale anahtar çoğaltma",
      "Acil Kale kilit açma",
      "Kale kilit montajı",
    ],
    icon: BadgeCheck,
    seoTitle: "Adana Kale Kilit Yetkili Servis",
    seoDescription:
      "Adana Kale Kilit yetkili servis: kilit değişimi, göbek değişimi, anahtar çoğaltma ve 7/24 acil açılış. Çukurova ve Adana genelinde hızlı hizmet.",
  },
  {
    slug: "adana-multlock-yetkili-servis",
    brand: "Mul-T-Lock",
    title: "Multlock Yetkili Servis",
    shortTitle: "Multlock Yetkili Servis",
    summary:
      "Adana Multlock (Mul-T-Lock) yetkili servisi ile yüksek güvenlikli kilit, anahtar ve göbek çözümleri.",
    description:
      "Adana Multlock yetkili servis olarak Mul-T-Lock yüksek güvenlikli kilit sistemlerinde montaj, arıza, anahtar çoğaltma ve acil müdahale hizmeti sunuyoruz. Konut ve iş yerlerinde güvenliği artırmak için Multlock ürünlerinde uzman ekibimizle Adana genelinde hizmet veriyoruz.",
    features: [
      "Mul-T-Lock / Multlock sistem desteği",
      "Yüksek güvenlikli silindir değişimi",
      "Özel anahtar çoğaltma",
      "Kapı güçlendirme önerileri",
      "7/24 acil müdahale",
    ],
    services: [
      "Multlock kilit değişimi",
      "Multlock göbek değişimi",
      "Multlock anahtar çoğaltma",
      "Acil Multlock açma",
      "Yüksek güvenlik kilit montajı",
    ],
    icon: Lock,
    seoTitle: "Adana Multlock Yetkili Servis",
    seoDescription:
      "Adana Multlock (Mul-T-Lock) yetkili servis: yüksek güvenlikli kilit değişimi, anahtar çoğaltma ve acil açılış. Adana’da 7/24 destek.",
  },
  {
    slug: "adana-desi-yetkili-servis",
    brand: "Desi",
    title: "Desi Yetkili Servis",
    shortTitle: "Desi Yetkili Servis",
    summary:
      "Adana Desi yetkili servisi ile Desi kilit, göbek ve güvenlik ürünlerinde montaj, bakım ve acil servis.",
    description:
      "Adana Desi yetkili servis noktamızda Desi marka kilit ve güvenlik ürünleri için değişim, montaj, anahtar işlemleri ve acil açılış hizmeti veriyoruz. Ev ve iş yerlerinde Desi ürünleri için hızlı, güvenilir ve şeffaf fiyatlı çözümler sunuyoruz.",
    features: [
      "Desi kilit ve göbek değişimi",
      "Desi anahtar çoğaltma",
      "Montaj ve arıza müdahalesi",
      "Hasarsız açılış önceliği",
      "Adana geneli hızlı ulaşım",
    ],
    services: [
      "Desi kilit değişimi",
      "Desi göbek değişimi",
      "Desi anahtar çoğaltma",
      "Acil Desi kilit açma",
      "Desi güvenlik ürün montajı",
    ],
    icon: KeyRound,
    seoTitle: "Adana Desi Yetkili Servis",
    seoDescription:
      "Adana Desi yetkili servis: Desi kilit değişimi, göbek değişimi, anahtar çoğaltma ve acil çilingir. Çukurova / Adana 7/24.",
  },
  {
    slug: "adana-dortek-kapi-yetkili-servis",
    brand: "Dortek",
    title: "Dortek Kapı Yetkili Servis",
    shortTitle: "Dortek Kapı Yetkili Servis",
    summary:
      "Adana Dortek kapı yetkili servisi ile Dortek kapı kilit, menteşe ve açılış sistemlerinde teknik destek.",
    description:
      "Adana Dortek kapı yetkili servis olarak Dortek kapı sistemlerinde kilit arızası, kilit değişimi, ayar, montaj ve acil açılış konularında hizmet veriyoruz. Konut ve ticari alanlarda Dortek kapı çözümlerinde uzman müdahale için bizi arayabilirsiniz.",
    features: [
      "Dortek kapı kilit servisi",
      "Kilit / mekanizma değişimi",
      "Kapı ayar ve arıza giderme",
      "Acil kapı açma",
      "Montaj ve bakım desteği",
    ],
    services: [
      "Dortek kapı kilit değişimi",
      "Dortek kapı arıza müdahalesi",
      "Dortek kapı açma",
      "Mekanizma bakımı",
      "Kapı güvenlik güçlendirme",
    ],
    icon: DoorOpen,
    seoTitle: "Adana Dortek Kapı Yetkili Servis",
    seoDescription:
      "Adana Dortek kapı yetkili servis: Dortek kapı kilit değişimi, arıza, ayar ve acil açılış. Adana genelinde hızlı teknik destek.",
  },
];

export function getAuthorizedBrandBySlug(slug: string) {
  return AUTHORIZED_BRANDS.find((brand) => brand.slug === slug) ?? null;
}

export function getAuthorizedBrandSlugs() {
  return AUTHORIZED_BRANDS.map((brand) => brand.slug);
}
