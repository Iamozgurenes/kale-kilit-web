export type FieldType =
  | "text"
  | "textarea"
  | "editor"
  | "number"
  | "bool"
  | "date"
  | "file"
  | "select"
  | "list"
  | "slug";

export type AdminField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
  rows?: number;
};

export type AdminResource = {
  key: string;
  collection: string;
  title: string;
  singular: string;
  description: string;
  sort?: string;
  fields: AdminField[];
  columns: { key: string; label: string }[];
  defaults: Record<string, unknown>;
};

export const ADMIN_NAV = [
  { href: "/admin", label: "Özet" },
  { href: "/admin/sayfalar", label: "Sayfalar & SEO" },
  { href: "/admin/ayarlar", label: "Site ayarları" },
  { href: "/admin/hero", label: "Hero slaytları" },
  { href: "/admin/hizmetler", label: "Hizmetler" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/yetkili-servis", label: "Yetkili servis" },
  { href: "/admin/projeler", label: "Projeler" },
  { href: "/admin/sss", label: "SSS" },
  { href: "/admin/yorumlar", label: "Yorumlar" },
  { href: "/admin/bloklar", label: "Sayfa blokları" },
  { href: "/admin/mesajlar", label: "Mesajlar" },
];

const ICON_OPTIONS = [
  "Home",
  "Car",
  "Lock",
  "KeyRound",
  "ShieldCheck",
  "Shield",
  "Wrench",
  "Clock3",
  "BadgeCheck",
  "Zap",
  "Wallet",
  "PhoneCall",
  "MapPin",
  "MapPinned",
  "CheckCircle2",
  "Target",
  "HeartHandshake",
  "BookOpen",
  "Lightbulb",
  "Building2",
  "DoorOpen",
].map((value) => ({ value, label: value }));

export const RESOURCES: Record<string, AdminResource> = {
  hero: {
    key: "hero",
    collection: "hero_slides",
    title: "Hero slaytları",
    singular: "Slayt",
    description: "Anasayfa üst slaytları. Görsel yoksa sitedeki varsayılan fotoğraf kullanılır.",
    sort: "sort_order",
    columns: [
      { key: "title", label: "Başlık" },
      { key: "highlight", label: "Vurgu" },
      { key: "sort_order", label: "Sıra" },
      { key: "is_active", label: "Aktif" },
    ],
    defaults: { title: "", highlight: "", description: "", sort_order: 0, is_active: true },
    fields: [
      { name: "title", label: "Başlık", type: "text", required: true },
      { name: "highlight", label: "Vurgu satırı", type: "text" },
      { name: "description", label: "Açıklama", type: "textarea", rows: 3 },
      { name: "image", label: "Görsel", type: "file" },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
    ],
  },
  hizmetler: {
    key: "hizmetler",
    collection: "services",
    title: "Hizmetler",
    singular: "Hizmet",
    description: "Hizmet kartları, detay sayfaları ve SEO alanları.",
    sort: "sort_order,title",
    columns: [
      { key: "title", label: "Başlık" },
      { key: "slug", label: "Slug" },
      { key: "sort_order", label: "Sıra" },
      { key: "is_active", label: "Aktif" },
    ],
    defaults: {
      title: "",
      slug: "",
      short_description: "",
      description: "",
      icon: "Wrench",
      details: [],
      sort_order: 0,
      is_active: true,
      seo_title: "",
      seo_description: "",
    },
    fields: [
      { name: "title", label: "Başlık", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", required: true },
      { name: "short_description", label: "Kısa açıklama", type: "textarea", rows: 2 },
      { name: "description", label: "Detay (HTML)", type: "editor", rows: 10 },
      { name: "icon", label: "İkon", type: "select", options: ICON_OPTIONS },
      { name: "details", label: "Öne çıkanlar (her satır bir madde)", type: "list", rows: 6 },
      { name: "cover_image", label: "Kapak görseli", type: "file" },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
      { name: "seo_title", label: "SEO başlığı", type: "text" },
      { name: "seo_description", label: "SEO açıklaması", type: "textarea", rows: 3 },
    ],
  },
  blog: {
    key: "blog",
    collection: "posts",
    title: "Blog yazıları",
    singular: "Yazı",
    description: "Blog listesi, içerik ve yazı SEO’su.",
    sort: "-published_at",
    columns: [
      { key: "title", label: "Başlık" },
      { key: "category", label: "Kategori" },
      { key: "is_published", label: "Yayında" },
    ],
    defaults: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Çilingir Rehberi",
      published_at: new Date().toISOString().slice(0, 10),
      is_published: true,
      seo_title: "",
      seo_description: "",
    },
    fields: [
      { name: "title", label: "Başlık", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", required: true },
      { name: "category", label: "Kategori", type: "text" },
      { name: "excerpt", label: "Özet", type: "textarea", rows: 3 },
      { name: "content", label: "İçerik (HTML)", type: "editor", rows: 14 },
      { name: "cover_image", label: "Kapak görseli", type: "file" },
      { name: "published_at", label: "Yayın tarihi", type: "date" },
      { name: "is_published", label: "Yayında", type: "bool" },
      { name: "seo_title", label: "SEO başlığı", type: "text" },
      { name: "seo_description", label: "SEO açıklaması", type: "textarea", rows: 3 },
    ],
  },
  "yetkili-servis": {
    key: "yetkili-servis",
    collection: "authorized_brands",
    title: "Yetkili servisler",
    singular: "Marka",
    description: "Yetkili servis markaları, içerik ve SEO.",
    sort: "sort_order,title",
    columns: [
      { key: "title", label: "Başlık" },
      { key: "slug", label: "Slug" },
      { key: "is_active", label: "Aktif" },
    ],
    defaults: {
      slug: "",
      brand: "",
      title: "",
      short_title: "",
      summary: "",
      description: "",
      features: [],
      services: [],
      icon: "BadgeCheck",
      seo_title: "",
      seo_description: "",
      sort_order: 0,
      is_active: true,
    },
    fields: [
      { name: "title", label: "Başlık", type: "text", required: true },
      { name: "short_title", label: "Kısa başlık", type: "text" },
      { name: "brand", label: "Marka adı", type: "text" },
      { name: "slug", label: "URL slug", type: "slug", required: true },
      { name: "summary", label: "Özet", type: "textarea", rows: 3 },
      { name: "description", label: "Detay (HTML)", type: "editor", rows: 10 },
      { name: "features", label: "Özellikler (her satır bir madde)", type: "list", rows: 6 },
      { name: "services", label: "Hizmetler (her satır bir madde)", type: "list", rows: 6 },
      { name: "icon", label: "İkon", type: "select", options: ICON_OPTIONS },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
      { name: "seo_title", label: "SEO başlığı", type: "text" },
      { name: "seo_description", label: "SEO açıklaması", type: "textarea", rows: 3 },
    ],
  },
  projeler: {
    key: "projeler",
    collection: "projects",
    title: "Projeler",
    singular: "Proje",
    description: "Proje galerisi kartları.",
    sort: "sort_order,title",
    columns: [
      { key: "title", label: "Başlık" },
      { key: "category", label: "Kategori" },
      { key: "location", label: "Konum" },
    ],
    defaults: {
      title: "",
      category: "",
      location: "",
      description: "",
      sort_order: 0,
      is_active: true,
    },
    fields: [
      { name: "title", label: "Başlık", type: "text", required: true },
      { name: "category", label: "Kategori", type: "text" },
      { name: "location", label: "Konum", type: "text" },
      { name: "description", label: "Açıklama", type: "textarea", rows: 4 },
      { name: "cover_image", label: "Görsel", type: "file" },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
    ],
  },
  sss: {
    key: "sss",
    collection: "faqs",
    title: "Sıkça sorulan sorular",
    singular: "Soru",
    description: "SSS sayfası ve anasayfa / iletişim önizlemeleri.",
    sort: "sort_order,question",
    columns: [
      { key: "question", label: "Soru" },
      { key: "category", label: "Kategori" },
      { key: "is_active", label: "Aktif" },
    ],
    defaults: {
      question: "",
      answer: "",
      category: "Hizmet",
      sort_order: 0,
      is_active: true,
    },
    fields: [
      { name: "question", label: "Soru", type: "text", required: true },
      { name: "answer", label: "Cevap (HTML)", type: "editor", rows: 6 },
      { name: "category", label: "Kategori", type: "text", help: "Örn: Hizmet, Teknik, Ücret, Güvenlik" },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
    ],
  },
  yorumlar: {
    key: "yorumlar",
    collection: "testimonials",
    title: "Müşteri yorumları",
    singular: "Yorum",
    description: "Anasayfa ve hakkımızda yorum kartları.",
    sort: "sort_order",
    columns: [
      { key: "name", label: "İsim" },
      { key: "role", label: "Bölge / rol" },
    ],
    defaults: { name: "", role: "", quote: "", sort_order: 0, is_active: true },
    fields: [
      { name: "name", label: "İsim", type: "text", required: true },
      { name: "role", label: "Bölge / rol", type: "text" },
      { name: "quote", label: "Yorum", type: "textarea", rows: 4 },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
    ],
  },
  bloklar: {
    key: "bloklar",
    collection: "site_blocks",
    title: "Sayfa blokları",
    singular: "Blok",
    description: "Neden biz, istatistik, süreç, hakkımızda değerleri ve sayfa öne çıkanları.",
    sort: "group,sort_order,title",
    columns: [
      { key: "group", label: "Grup" },
      { key: "title", label: "Başlık" },
      { key: "value", label: "Değer" },
    ],
    defaults: {
      group: "features",
      title: "",
      description: "",
      value: "",
      icon: "BadgeCheck",
      year: "",
      sort_order: 0,
      is_active: true,
    },
    fields: [
      {
        name: "group",
        label: "Grup",
        type: "select",
        required: true,
        options: [
          { value: "features", label: "Anasayfa: Neden biz" },
          { value: "stats", label: "Anasayfa: İstatistikler" },
          { value: "process", label: "Anasayfa: Süreç" },
          { value: "about_values", label: "Hakkımızda: Değerler" },
          { value: "about_timeline", label: "Hakkımızda: Yolculuk" },
          { value: "services_highlights", label: "Hizmetler: Öne çıkanlar" },
          { value: "blog_topics", label: "Blog: Konular" },
          { value: "projects_highlights", label: "Projeler: Öne çıkanlar" },
        ],
      },
      { name: "title", label: "Başlık", type: "text", required: true },
      { name: "description", label: "Açıklama", type: "textarea", rows: 3 },
      { name: "value", label: "Değer (istatistik için)", type: "text" },
      { name: "year", label: "Yıl (zaman çizelgesi)", type: "text" },
      { name: "icon", label: "İkon", type: "select", options: ICON_OPTIONS },
      { name: "sort_order", label: "Sıra", type: "number" },
      { name: "is_active", label: "Yayında", type: "bool" },
    ],
  },
  mesajlar: {
    key: "mesajlar",
    collection: "contact_messages",
    title: "İletişim mesajları",
    singular: "Mesaj",
    description: "Siteden gelen form kayıtları.",
    sort: "-id",
    columns: [
      { key: "name", label: "Ad" },
      { key: "phone", label: "Telefon" },
      { key: "subject", label: "Konu" },
      { key: "is_read", label: "Okundu" },
    ],
    defaults: { name: "", phone: "", subject: "", message: "", is_read: false },
    fields: [
      { name: "name", label: "Ad Soyad", type: "text", required: true },
      { name: "phone", label: "Telefon", type: "text" },
      { name: "subject", label: "Konu", type: "text" },
      { name: "message", label: "Mesaj", type: "textarea", rows: 6 },
      { name: "is_read", label: "Okundu", type: "bool" },
    ],
  },
};

export function getResource(key: string) {
  return RESOURCES[key] ?? null;
}
