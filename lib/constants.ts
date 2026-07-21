const WHATSAPP_MESSAGE =
  "Merhaba, Kale Kilit & Çilingir’den yazıyorum. Çilingir hizmeti hakkında bilgi almak istiyorum.";

export const SITE = {
  name: "Kale Kilit & Çilingir",
  phone: "0535 528 24 22",
  phoneHref: "tel:+905355282422",
  whatsappHref: `https://wa.me/905355282422?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  whatsappMessage: WHATSAPP_MESSAGE,
  email: "info@kalecilik.com",
  address: "Yurt, Kurttepe Cd. Unalır AP zemin KT. 8/C, 01360 Çukurova/Adana",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kalekilitadana.com",
};

export const NAV_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Blog", href: "/blog" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];
