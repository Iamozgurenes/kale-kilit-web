/**
 * PocketBase CMS schema + seed.
 * Usage: PB_EMAIL=... PB_PASSWORD=... node scripts/setup-cms.mjs
 */
import PocketBase from "pocketbase";

const URL = process.env.POCKETBASE_URL || "https://db.kalekilitadana.com";
const EMAIL = process.env.PB_EMAIL;
const PASSWORD = process.env.PB_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error("PB_EMAIL and PB_PASSWORD are required");
  process.exit(1);
}

const pb = new PocketBase(URL);
pb.autoCancellation(false);

const PUBLIC = "";
const ADMIN_ONLY = null;

function text(name, extra = {}) {
  return { name, type: "text", required: Boolean(extra.required), ...extra };
}
function editor(name, extra = {}) {
  return { name, type: "editor", required: Boolean(extra.required), ...extra };
}
function json(name) {
  return { name, type: "json" };
}
function bool(name) {
  return { name, type: "bool" };
}
function number(name) {
  return { name, type: "number" };
}
function file(name) {
  return {
    name,
    type: "file",
    maxSelect: 1,
    maxSize: 10 * 1024 * 1024,
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
    thumbs: ["400x0", "800x0", "1200x0"],
  };
}
function date(name) {
  return { name, type: "date" };
}
function select(name, values, extra = {}) {
  return {
    name,
    type: "select",
    required: Boolean(extra.required),
    maxSelect: 1,
    values,
  };
}

async function upsertCollection(spec) {
  try {
    const existing = await pb.collections.getFirstListItem(`name="${spec.name}"`);
    const byName = Object.fromEntries((existing.fields || []).map((f) => [f.name, f]));
    const merged = [];
    for (const f of existing.fields || []) {
      if (f.system || f.primaryKey || f.name === "id" || f.name === "created" || f.name === "updated") {
        merged.push(f);
      }
    }
    for (const field of spec.fields) {
      const prev = byName[field.name];
      if (prev) {
        merged.push({ ...prev, ...field, id: prev.id, system: prev.system });
      } else {
        merged.push(field);
      }
    }
    const updated = await pb.collections.update(existing.id, {
      name: spec.name,
      type: spec.type || "base",
      listRule: spec.listRule,
      viewRule: spec.viewRule,
      createRule: spec.createRule,
      updateRule: spec.updateRule,
      deleteRule: spec.deleteRule,
      fields: merged,
      indexes: spec.indexes || existing.indexes,
    });
    console.log("updated collection", spec.name);
    return updated;
  } catch (error) {
    if (error?.status !== 404) throw error;
    const created = await pb.collections.create({
      name: spec.name,
      type: spec.type || "base",
      listRule: spec.listRule,
      viewRule: spec.viewRule,
      createRule: spec.createRule,
      updateRule: spec.updateRule,
      deleteRule: spec.deleteRule,
      fields: spec.fields,
      indexes: spec.indexes || [],
    });
    console.log("created collection", spec.name);
    return created;
  }
}

async function seedIfEmpty(collection, records) {
  const existing = await pb.collection(collection).getList(1, 1);
  if (existing.totalItems > 0) {
    console.log("skip seed", collection, `(${existing.totalItems} records)`);
    return;
  }
  for (const record of records) {
    await pb.collection(collection).create(record);
  }
  console.log("seeded", collection, records.length);
}

const PAGES = [
  {
    key: "home",
    path: "/",
    label: "Anasayfa",
    eyebrow: "Kale Kilit & Çilingir",
    title: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
    description:
      "Adana çilingir ve anahtarcı: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma.",
    seo_title: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
    seo_description:
      "Adana çilingir ve anahtarcı: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde ortalama 15 dakikada yanınızdayız.",
    content: {
      features_title: "Neden Biz?",
      features_subtitle:
        "Güvenilirlik ve hız konusunda taviz vermeden, müşterilerimize en iyi hizmeti sunuyoruz.",
      process_title: "Nasıl Çalışıyoruz?",
      process_subtitle: "Acil anlarda süreci sade tutuyoruz: arayın, gelelim, çözelim.",
      testimonials_title: "Müşterilerimiz Ne Diyor?",
      testimonials_subtitle: "Güven ve hız konusunda bizimle çalışanlardan kısa notlar.",
      faq_title: "Sıkça Sorulan Sorular",
      faq_subtitle: "Ulaşım süresi, fiyat ve hasarsız açılış hakkında en çok sorulanlar.",
    },
  },
  {
    key: "about",
    path: "/hakkimizda",
    label: "Hakkımızda",
    eyebrow: "Hakkımızda",
    title: "Güvenliğiniz İçin Yola Çıktık",
    description:
      "2015 yılından bu yana Adana genelinde ev, oto ve kasa çilingirliği alanında binlerce müşteriye hızlı ve güvenilir çözümler sunuyoruz.",
    seo_title: "Hakkımızda",
    seo_description:
      "Adana çilingir ve anahtarcı firması Kale Kilit: hikayemiz, misyonumuz ve vizyonumuz. 10 yılı aşkın tecrübeyle Adana’da 7/24 güvenilir hizmet.",
    content: {
      story_title: "Hikayemiz",
      story: [
        "Kale Kilit & Çilingir, küçük bir çilingir atölyesi olarak başladığı yolculuğunda bugün Adana'nın dört bir yanına ulaşan, onlarca uzman çilingirden oluşan bir ekibe dönüştü. Kapıda kalan bir ailenin gece yarısı yaşadığı çaresizliği görerek yola çıktık ve o günden beri tek bir hedefimiz oldu: İnsanların en çaresiz anında yanlarında olmak.",
        "Bugün ev, oto ve kasa çilingirliğinin yanı sıra modern güvenlik sistemleri kurulumuyla da müşterilerimizin güvenliğini bir adım öteye taşıyoruz.",
      ],
      mission: "Acil anlarda hızlı, hasarsız ve şeffaf çözümler sunarak insanların güven duygusunu yeniden kazanmalarını sağlamak.",
      vision: "Adana'nın en güvenilir çilingir ve güvenlik sistemleri markası olmak; her çağrıda aynı kaliteyi standartlaştırmak.",
      timeline_title: "Yolculuğumuz",
      timeline_subtitle: "Küçük bir atölyeden şehir genelinde hizmet veren bir ekibe.",
      values_title: "Değerlerimiz",
      values_subtitle: "Her işimizde bizi yönlendiren dört temel ilke.",
      team_title: "Uzman Ekibimiz",
      team_text:
        "Saha ekiplerimiz ev, oto ve kasa çilingirliği ile güvenlik sistemleri konularında düzenli eğitim alır. Her çağrıda kimlik doğrulama, hasarsız müdahale ve net fiyat bilgilendirmesi standartlarımızdır.",
      areas_title: "Hizmet Verdiğimiz Bölgeler",
      areas_note: "Listede olmayan bölgeler için de arayın; en yakın ekibi yönlendirelim.",
    },
  },
  {
    key: "services",
    path: "/hizmetler",
    label: "Hizmetler",
    eyebrow: "Hizmetlerimiz",
    title: "İhtiyacınız Olan Her Çilingirlik Hizmeti",
    description:
      "Ev, oto ve kasa çilingirliğinden modern güvenlik sistemlerine kadar geniş hizmet yelpazemizle yanınızdayız.",
    seo_title: "Hizmetlerimiz",
    seo_description:
      "Adana çilingir ve anahtarcı hizmetleri: ev çilingiri, oto çilingir, kasa açma, anahtar çoğaltma, kilit değişimi ve güvenlik sistemleri. 7/24 acil müdahale.",
  },
  {
    key: "authorized",
    path: "/yetkili-servis",
    label: "Yetkili Servis",
    eyebrow: "Yetkili Servis",
    title: "Marka Yetkili Servislerimiz",
    description:
      "Kale Kilit, Multlock, Desi ve Dortek kapı yetkili servis noktalarımızla Adana genelinde orijinal parça ve uzman müdahale sunuyoruz.",
    seo_title: "Yetkili Servis",
    seo_description:
      "Adana yetkili servis: Kale Kilit, Multlock, Desi ve Dortek kapı yetkili servis. Kilit değişimi, anahtar çoğaltma ve 7/24 acil destek.",
    content: {
      list_title: "Servisini Yaptığımız Markalar",
      list_subtitle:
        "Her marka için ayrı detay sayfası hazırladık. İhtiyacınıza uygun yetkili servisi seçerek hızlıca iletişime geçebilirsiniz.",
      cta_eyebrow: "Acil Destek",
      cta_title: "Yetkili servis için hemen arayın",
      cta_text: "Adana genelinde 7/24 hızlı müdahale.",
    },
  },
  {
    key: "projects",
    path: "/projeler",
    label: "Projeler",
    eyebrow: "Projelerimiz",
    title: "Tamamladığımız İşlerden Örnekler",
    description:
      "Ev, iş yeri ve site projelerinde gerçekleştirdiğimiz çilingirlik ve güvenlik sistemi kurulumlarından bazı örnekler.",
    seo_title: "Projelerimiz",
    seo_description:
      "Adana çilingir ve anahtarcı işlerimizden örnekler: ev, oto, kasa açma ve güvenlik sistemi kurulumları. Çukurova ve Adana genelinde tamamlanan projeler.",
    content: {
      gallery_title: "Proje Galerisi",
      gallery_subtitle: "Kategoriye göre filtreleyerek tamamladığımız işleri inceleyin.",
      cta_title: "Sizin projeniz de burada olsun",
      cta_text:
        "Site, ofis veya bireysel ihtiyaçlarınız için keşif ve teklif almak üzere bize ulaşın. Kurumsal işlerde faturalı hizmet sunuyoruz.",
    },
  },
  {
    key: "blog",
    path: "/blog",
    label: "Blog",
    eyebrow: "Blog",
    title: "Güvenlik ve Çilingirlik Rehberi",
    description:
      "Ev, araç ve iş yeri güvenliğinizi artırmanıza yardımcı olacak pratik bilgiler paylaşıyoruz.",
    seo_title: "Blog",
    seo_description:
      "Adana çilingir ve anahtarcı rehberi: ev güvenliği, oto çilingirlik, anahtar çoğaltma ve kilit sistemleri hakkında pratik bilgiler.",
    content: {
      list_title: "Tüm Yazılar",
      list_subtitle: "İlgilendiğiniz konuya göre yazıları filtreleyin.",
    },
  },
  {
    key: "faq",
    path: "/sss",
    label: "SSS",
    eyebrow: "SSS",
    title: "Sıkça Sorulan Sorular",
    description: "Hizmetlerimiz hakkında en çok merak edilen soruları sizin için yanıtladık.",
    seo_title: "Sıkça Sorulan Sorular",
    seo_description:
      "Adana çilingir ve anahtarcı hakkında SSS: ulaşım süresi, 7/24 hizmet, fiyatlandırma, hasarsız açılış ve hizmet bölgeleri.",
    content: {
      empty_title: "Cevabını bulamadınız mı?",
      empty_text:
        "Acil durumlar için hemen arayın; diğer sorularınız için WhatsApp veya iletişim formundan yazın.",
    },
  },
  {
    key: "contact",
    path: "/iletisim",
    label: "İletişim",
    eyebrow: "İletişim",
    title: "Bize Ulaşın",
    description: "Acil durumlar için hemen arayın, diğer talepleriniz için formu doldurun.",
    seo_title: "İletişim",
    seo_description:
      "Adana çilingir ve anahtarcı iletişimi: telefon, WhatsApp veya form ile hemen ulaşın. Çukurova / Adana’da 7/24 acil çilingir hattı açık.",
    content: {
      banner_text:
        "Acil çilingir desteği için 7/24 hattımız açık — ortalama 15 dakikada yanınızdayız.",
      info_title: "İletişim Bilgileri",
      info_subtitle: "Telefon ve WhatsApp en hızlı kanallarımızdır.",
      form_title: "Mesaj Gönderin",
      areas_title: "Hizmet Bölgelerimiz",
      areas_subtitle: "Adana merkez ve çevre ilçelerde geniş bir alanda hizmet veriyoruz.",
      faq_title: "Hızlı Yanıtlar",
      faq_subtitle: "Aramadan önce merak ettiğiniz birkaç nokta.",
    },
  },
  {
    key: "kvkk",
    path: "/kvkk",
    label: "KVKK",
    eyebrow: "Yasal",
    title: "KVKK Aydınlatma Metni",
    description:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verilerinizin işlenmesine ilişkin bilgilendirme.",
    seo_title: "KVKK Aydınlatma Metni",
    seo_description:
      "Adana çilingir ve anahtarcı firması Kale Kilit KVKK aydınlatma metni. 6698 sayılı Kanun kapsamında kişisel verilerin işlenmesi hakkında bilgilendirme.",
    content: { updated_at: "21 Temmuz 2026" },
  },
  {
    key: "privacy",
    path: "/gizlilik-politikasi",
    label: "Gizlilik Politikası",
    eyebrow: "Yasal",
    title: "Gizlilik Politikası",
    description:
      "Web sitemizi ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda gizliliğinizi nasıl koruduğumuzu açıklıyoruz.",
    seo_title: "Gizlilik Politikası",
    seo_description:
      "Adana çilingir Kale Kilit gizlilik politikası: web sitesi ziyaretinde ve hizmetlerde kişisel verilerin korunmasına ilişkin bilgilendirme.",
    content: { updated_at: "21 Temmuz 2026" },
  },
  {
    key: "cookies",
    path: "/cerez-politikasi",
    label: "Çerez Politikası",
    eyebrow: "Yasal",
    title: "Çerez Politikası",
    description: "Sitemizde kullanılan çerez türleri, amaçları ve yönetimine ilişkin bilgilendirme.",
    seo_title: "Çerez Politikası",
    seo_description:
      "Adana çilingir Kale Kilit web sitesinde kullanılan çerezler, amaçları ve tercihlerinizi yönetme hakkında bilgilendirme.",
    content: { updated_at: "21 Temmuz 2026" },
  },
  {
    key: "terms",
    path: "/kullanim-kosullari",
    label: "Kullanım Koşulları",
    eyebrow: "Yasal",
    title: "Kullanım Koşulları",
    description: "Web sitemizi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.",
    seo_title: "Kullanım Koşulları",
    seo_description:
      "Adana çilingir ve anahtarcı Kale Kilit web sitesi kullanım koşulları ve yasal bilgilendirme.",
    content: { updated_at: "21 Temmuz 2026" },
  },
];

const BLOCKS = [
  { group: "features", title: "7/24 Hizmet", description: "Gece veya gündüz fark etmez, her an yanınızdayız.", icon: "Clock3", sort_order: 1 },
  { group: "features", title: "Yetkili Servis", description: "Alanında uzman, sertifikalı ve güvenilir ekip.", icon: "BadgeCheck", sort_order: 2 },
  { group: "features", title: "Hızlı Ulaşım", description: "Ortalama 15 dakikada konumunuza ulaşıyoruz.", icon: "Zap", sort_order: 3 },
  { group: "features", title: "Uygun Fiyat", description: "Şeffaf fiyatlandırma, sürpriz ücret yok.", icon: "Wallet", sort_order: 4 },
  { group: "stats", title: "Yıllık Tecrübe", value: "10+", sort_order: 1 },
  { group: "stats", title: "Tamamlanan İşlem", value: "8.500+", sort_order: 2 },
  { group: "stats", title: "Ortalama Ulaşım", value: "15 dk", sort_order: 3 },
  { group: "stats", title: "Kesintisiz Hizmet", value: "7/24", sort_order: 4 },
  { group: "process", title: "Bizi Arayın", description: "Durumu kısaca anlatın, ihtiyacınıza göre yönlendirelim.", icon: "PhoneCall", sort_order: 1 },
  { group: "process", title: "Konumunuza Gelelim", description: "Ortalama 15 dakikada ekibimiz adresinize ulaşır.", icon: "MapPin", sort_order: 2 },
  { group: "process", title: "Hasarsız Müdahale", description: "Uzman ekip kapı ve kilidinize zarar vermeden çözüm üretir.", icon: "Wrench", sort_order: 3 },
  { group: "process", title: "Güvenle Devam", description: "İşlem biter, şeffaf ücretle güvenle yolunuza devam edersiniz.", icon: "CheckCircle2", sort_order: 4 },
  { group: "about_values", title: "Güvenilirlik", description: "Her çalışanımız kimlik kontrolünden geçer, işlemlerimiz şeffaf ve kayıt altındadır.", icon: "ShieldCheck", sort_order: 1 },
  { group: "about_values", title: "Hız", description: "Acil durumlarda dakikaların önemini biliyoruz, bu yüzden ortalama 15 dakikada yerinizdeyiz.", icon: "Target", sort_order: 2 },
  { group: "about_values", title: "Uzmanlık", description: "Ekibimiz düzenli eğitimlerden geçer, en güncel kilit ve güvenlik sistemlerine hakimdir.", icon: "BadgeCheck", sort_order: 3 },
  { group: "about_values", title: "Müşteri Memnuniyeti", description: "Şeffaf fiyatlandırma ve dürüst iletişimle uzun soluklu güven ilişkileri kuruyoruz.", icon: "HeartHandshake", sort_order: 4 },
  { group: "about_timeline", title: "Kuruluş", description: "Küçük bir atölyede, kapıda kalan ailelere hızlı destek verme hedefiyle yola çıktık.", year: "2015", sort_order: 1 },
  { group: "about_timeline", title: "Ekip Genişlemesi", description: "Çukurova ve çevre ilçelerde eş zamanlı müdahale için saha ekibimizi büyüttük.", year: "2018", sort_order: 2 },
  { group: "about_timeline", title: "Güvenlik Sistemleri", description: "Akıllı kilit ve kartlı geçiş kurulumlarını hizmet portföyümüze ekledik.", year: "2021", sort_order: 3 },
  { group: "about_timeline", title: "Bugün", description: "8.500+ tamamlanan işlem ve 7/24 kesintisiz hizmetle Adana genelinde yanınızdayız.", year: "2026", sort_order: 4 },
  { group: "services_highlights", title: "Hızlı Müdahale", description: "Ortalama 15 dakikada konumunuza ulaşıyoruz.", icon: "Clock3", sort_order: 1 },
  { group: "services_highlights", title: "Hasarsız Açılış", description: "Önceliğimiz kapı ve kilidinize zarar vermemek.", icon: "Shield", sort_order: 2 },
  { group: "services_highlights", title: "Şeffaf Fiyat", description: "Arama anında net teklif, gizli ücret yok.", icon: "Wallet", sort_order: 3 },
  { group: "blog_topics", title: "Ev Güvenliği", description: "Kilit seçimi, anahtar kaybı ve günlük güvenlik ipuçları.", icon: "ShieldCheck", sort_order: 1 },
  { group: "blog_topics", title: "Oto & Teknik", description: "Çip anahtar, immobilizer ve araç açılışı hakkında rehberler.", icon: "BookOpen", sort_order: 2 },
  { group: "blog_topics", title: "Pratik Çözümler", description: "Acil anlarda doğru adımları bilmek için kısa okumalar.", icon: "Lightbulb", sort_order: 3 },
  { group: "projects_highlights", title: "Tamamlanan işlem", value: "8.500+", icon: "Wrench", sort_order: 1 },
  { group: "projects_highlights", title: "Site & iş yeri projesi", value: "120+", icon: "Building2", sort_order: 2 },
  { group: "projects_highlights", title: "Geniş hizmet ağı", value: "Adana", icon: "MapPinned", sort_order: 3 },
  { group: "projects_highlights", title: "Ortalama ulaşım", value: "15 dk", icon: "Clock3", sort_order: 4 },
].map((block) => ({ ...block, is_active: true, description: block.description || "", value: block.value || "", icon: block.icon || "", year: block.year || "" }));

const HERO = [
  { title: "Kale Kilit", highlight: "Yetkili Servis", description: "Adana’da ev, oto ve kasa çilingir hizmetlerinde 7/24 hızlı ve güvenilir çözüm.", sort_order: 1, is_active: true },
  { title: "Ev çilingirinde", highlight: "Hasarsız Açılış", description: "Kapı ve kasanıza zarar vermeden acil müdahale. 7/24 profesyonel destek.", sort_order: 2, is_active: true },
  { title: "Oto çilingirde", highlight: "Anında Çözüm", description: "Araç içinde kalan anahtar ve immobilizer sorunlarına hızlı, güvenli müdahale.", sort_order: 3, is_active: true },
];

const PROJECTS = [
  { title: "Site Girişi Kartlı Geçiş Sistemi", category: "Güvenlik Sistemleri", location: "Çukurova, Adana", description: "120 daireli sitenin ana giriş kapılarına kartlı geçiş ve otomatik kilit sistemi kurulumu yapıldı.", sort_order: 1 },
  { title: "Acil Kapı Açma Operasyonu", category: "Ev Çilingiri", location: "Seyhan, Adana", description: "Gece yarısı kapıda kalan aile için 12 dakikada hasarsız kapı açılışı sağlandı.", sort_order: 2 },
  { title: "Çelik Kasa Şifre Yenileme", category: "Kasa Açma", location: "Yüreğir, Adana", description: "İş yerindeki arızalı çelik kasa hasarsız açılıp yeni şifreleme sistemi kuruldu.", sort_order: 3 },
  { title: "Filo Araçları İçin Yedek Anahtar", category: "Oto Çilingir", location: "Sarıçam, Adana", description: "Bir kargo firmasının 8 araçlık filosu için immobilizer uyumlu yedek anahtar kopyalama projesi.", sort_order: 4 },
  { title: "Apartman Göbek Kilit Yenileme", category: "Kilit Değişimi", location: "Çukurova, Adana", description: "24 daireli apartmanın tüm giriş kapılarında yüksek güvenlikli göbek kilit değişimi tamamlandı.", sort_order: 5 },
  { title: "Ofis Akıllı Kilit Kurulumu", category: "Güvenlik Sistemleri", location: "Seyhan, Adana", description: "Bir yazılım ofisine parmak izi ve şifreli akıllı kilit sistemi kurularak erişim kayıt altına alındı.", sort_order: 6 },
  { title: "Villa Çelik Kapı Güçlendirme", category: "Kilit Değişimi", location: "Karaisalı, Adana", description: "Müstakil villada çelik kapı kilit mekanizması yenilenerek ek güvenlik noktaları eklendi.", sort_order: 7 },
  { title: "Otopark Acil Araç Açılışı", category: "Oto Çilingir", location: "Ceyhan, Adana", description: "AVM otoparkında kilitli kalan araç hasarsız açıldı, yedek anahtar aynı gün teslim edildi.", sort_order: 8 },
  { title: "Mağaza Kasa Acil Müdahale", category: "Kasa Açma", location: "Kozan, Adana", description: "Perakende mağazasında sabah açılışı öncesi arızalanan kasa hızlı ve hasarsız şekilde açıldı.", sort_order: 9 },
].map((item) => ({ ...item, is_active: true }));

const FAQS = [
  { category: "Hizmet", question: "Ne kadar sürede geliyorsunuz?", answer: "Şehir içi çoğu bölgede ortalama 15 dakika içinde konumunuza ulaşıyoruz. Yoğun trafik veya uzak bölgelerde bu süre değişebilir, arama sırasında size tahmini süreyi iletiyoruz." },
  { category: "Hizmet", question: "Hizmetleriniz 7/24 mü?", answer: "Evet, ev, oto ve kasa çilingirliği başta olmak üzere tüm acil hizmetlerimiz yılın 365 günü, günün her saati kesintisiz olarak sunulmaktadır." },
  { category: "Hizmet", question: "Hangi bölgelere hizmet veriyorsunuz?", answer: "Adana genelinde (Çukurova, Seyhan, Yüreğir, Sarıçam ve çevre ilçeler) hizmet veriyoruz. Çağrı sırasında bulunduğunuz konuma göre en yakın ekibi yönlendiriyoruz." },
  { category: "Teknik", question: "Kapı veya kilide zarar veriyor musunuz?", answer: "Hayır. Kilit açma işlemlerimizde öncelikle hasarsız açılış yöntemlerini deniyoruz. Ancak kilit ciddi şekilde arızalıysa, önceden bilgilendirerek kilit değişimi öneriyoruz." },
  { category: "Teknik", question: "Araç anahtarımı kaybettim, yenisini yapabilir misiniz?", answer: "Evet, çoğu marka ve model için immobilizer uyumlu yedek anahtar kopyalama ve programlama hizmeti sunuyoruz. Aracınızın ruhsatını yanınızda bulundurmanız yeterlidir." },
  { category: "Teknik", question: "Akıllı kilit kurulumu ne kadar sürer?", answer: "Standart bir akıllı kilit montajı genellikle 1–2 saat içinde tamamlanır. Keşif gerektiren sistemlerde süre projeye göre planlanır." },
  { category: "Ücret", question: "Fiyatlandırmanız nasıl belirleniyor?", answer: "Fiyatlarımız hizmet türü, saat ve bölgeye göre değişiklik gösterebilir. Arama sırasında size net bir fiyat teklifi sunuyoruz, gizli ücret uygulamıyoruz." },
  { category: "Ücret", question: "Ödeme yöntemleriniz nelerdir?", answer: "Nakit ve kredi kartı ile ödeme kabul ediyoruz. Kurumsal müşterilerimiz için fatura karşılığı ödeme seçenekleri de mevcuttur." },
  { category: "Ücret", question: "Gece veya tatil ücreti alıyor musunuz?", answer: "Acil çağrılarda saat dilimine göre fark oluşabilir. Arama anında size net ve şeffaf bir teklif iletilir; sürpriz ek ücret uygulanmaz." },
  { category: "Güvenlik", question: "Personeliniz güvenilir mi?", answer: "Tüm ekip üyelerimiz kimlik kontrolünden geçer, işlemler kayıt altına alınır. Talep halinde kimlik ve iş bilgisi paylaşılır." },
  { category: "Güvenlik", question: "Anahtarımı kaybettim, tüm kilitleri değiştirmeli miyim?", answer: "Güvenlik riskine göre değerlendiriyoruz. Çoğu durumda kritik giriş noktalarında göbek veya silindir değişimi yeterli olur; yerinde net öneri sunuyoruz." },
].map((item, index) => ({ ...item, sort_order: index + 1, is_active: true }));

const TESTIMONIALS = [
  { name: "Ayşe K.", role: "Çukurova", quote: "Gece 02:00'de kapıda kaldık. 15 dakikada geldiler, kapıya zarar vermeden açtılar. Gerçekten profesyonel bir ekip.", sort_order: 1, is_active: true },
  { name: "Murat D.", role: "Seyhan", quote: "Araç anahtarım içeride kaldı. Hem hızlı geldiler hem de fiyatı önceden net söylediler. Tavsiye ederim.", sort_order: 2, is_active: true },
  { name: "Elif S.", role: "Yüreğir", quote: "Ofis kasamızın şifresi unutulmuştu. Hasarsız açıp yeni sistem kurdular. İşlerini bilen bir firma.", sort_order: 3, is_active: true },
];

const BRANDS = [
  {
    slug: "adana-kale-kilit-yetkili-servis",
    brand: "Kale Kilit",
    title: "Kale Kilit Yetkili Servis",
    short_title: "Kale Kilit Yetkili Servis",
    summary: "Adana Kale Kilit yetkili servisi olarak kilit değişimi, göbek değişimi, anahtar çoğaltma ve acil açılış hizmeti sunuyoruz.",
    description: "<p>Adana Kale Kilit yetkili servis noktası olarak ev, iş yeri ve site kapılarında Kale Kilit ürünleri için kurulum, bakım, arıza ve acil müdahale hizmeti veriyoruz. Orijinal parça ve yetkili servis standartlarıyla hasarsız çözüm önceliğimizdir.</p>",
    features: ["Orijinal Kale Kilit parça ve aksesuar", "Göbek / silindir değişimi", "Anahtar çoğaltma ve yedek anahtar", "Acil kapı açma (hasarsız öncelik)", "Site ve iş yeri kilit sistemleri"],
    services: ["Kale kilit değişimi", "Kale göbek değişimi", "Kale anahtar çoğaltma", "Acil Kale kilit açma", "Kale kilit montajı"],
    icon: "BadgeCheck",
    seo_title: "Adana Kale Kilit Yetkili Servis",
    seo_description: "Adana Kale Kilit yetkili servis: kilit değişimi, göbek değişimi, anahtar çoğaltma ve 7/24 acil açılış. Çukurova ve Adana genelinde hızlı hizmet.",
    sort_order: 1,
  },
  {
    slug: "adana-multlock-yetkili-servis",
    brand: "Mul-T-Lock",
    title: "Multlock Yetkili Servis",
    short_title: "Multlock Yetkili Servis",
    summary: "Adana Multlock (Mul-T-Lock) yetkili servisi ile yüksek güvenlikli kilit, anahtar ve göbek çözümleri.",
    description: "<p>Adana Multlock yetkili servis olarak Mul-T-Lock yüksek güvenlikli kilit sistemlerinde montaj, arıza, anahtar çoğaltma ve acil müdahale hizmeti sunuyoruz.</p>",
    features: ["Mul-T-Lock / Multlock sistem desteği", "Yüksek güvenlikli silindir değişimi", "Özel anahtar çoğaltma", "Kapı güçlendirme önerileri", "7/24 acil müdahale"],
    services: ["Multlock kilit değişimi", "Multlock göbek değişimi", "Multlock anahtar çoğaltma", "Acil Multlock açma", "Yüksek güvenlik kilit montajı"],
    icon: "Lock",
    seo_title: "Adana Multlock Yetkili Servis",
    seo_description: "Adana Multlock (Mul-T-Lock) yetkili servis: yüksek güvenlikli kilit değişimi, anahtar çoğaltma ve acil açılış. Adana’da 7/24 destek.",
    sort_order: 2,
  },
  {
    slug: "adana-desi-yetkili-servis",
    brand: "Desi",
    title: "Desi Yetkili Servis",
    short_title: "Desi Yetkili Servis",
    summary: "Adana Desi yetkili servisi ile Desi kilit, göbek ve güvenlik ürünlerinde montaj, bakım ve acil servis.",
    description: "<p>Adana Desi yetkili servis noktamızda Desi marka kilit ve güvenlik ürünleri için değişim, montaj, anahtar işlemleri ve acil açılış hizmeti veriyoruz.</p>",
    features: ["Desi kilit ve göbek değişimi", "Desi anahtar çoğaltma", "Montaj ve arıza müdahalesi", "Hasarsız açılış önceliği", "Adana geneli hızlı ulaşım"],
    services: ["Desi kilit değişimi", "Desi göbek değişimi", "Desi anahtar çoğaltma", "Acil Desi kilit açma", "Desi güvenlik ürün montajı"],
    icon: "KeyRound",
    seo_title: "Adana Desi Yetkili Servis",
    seo_description: "Adana Desi yetkili servis: Desi kilit değişimi, göbek değişimi, anahtar çoğaltma ve acil çilingir. Çukurova / Adana 7/24.",
    sort_order: 3,
  },
  {
    slug: "adana-dortek-kapi-yetkili-servis",
    brand: "Dortek",
    title: "Dortek Kapı Yetkili Servis",
    short_title: "Dortek Kapı Yetkili Servis",
    summary: "Adana Dortek kapı yetkili servisi ile Dortek kapı kilit, menteşe ve açılış sistemlerinde teknik destek.",
    description: "<p>Adana Dortek kapı yetkili servis olarak Dortek kapı sistemlerinde kilit arızası, kilit değişimi, ayar, montaj ve acil açılış konularında hizmet veriyoruz.</p>",
    features: ["Dortek kapı kilit servisi", "Kilit / mekanizma değişimi", "Kapı ayar ve arıza giderme", "Acil kapı açma", "Montaj ve bakım desteği"],
    services: ["Dortek kapı kilit değişimi", "Dortek kapı arıza müdahalesi", "Dortek kapı açma", "Mekanizma bakımı", "Kapı güvenlik güçlendirme"],
    icon: "DoorOpen",
    seo_title: "Adana Dortek Kapı Yetkili Servis",
    seo_description: "Adana Dortek kapı yetkili servis: Dortek kapı kilit değişimi, arıza, ayar ve acil açılış. Adana genelinde hızlı teknik destek.",
    sort_order: 4,
  },
].map((item) => ({ ...item, is_active: true }));

async function main() {
  await pb.collection("_superusers").authWithPassword(EMAIL, PASSWORD);
  console.log("authenticated as", EMAIL);

  await upsertCollection({
    name: "posts",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("title", { required: true }),
      text("slug", { required: true }),
      text("excerpt"),
      editor("content"),
      text("category"),
      file("cover_image"),
      date("published_at"),
      bool("is_published"),
      text("seo_title"),
      text("seo_description"),
    ],
  });

  await upsertCollection({
    name: "services",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("title", { required: true }),
      text("slug", { required: true }),
      text("short_description"),
      editor("description"),
      text("icon"),
      json("details"),
      file("cover_image"),
      number("sort_order"),
      bool("is_active"),
      text("seo_title"),
      text("seo_description"),
    ],
  });

  await upsertCollection({
    name: "site_settings",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("key", { required: true }),
      text("site_name"),
      text("phone"),
      text("email"),
      text("address"),
      text("whatsapp_number"),
      text("whatsapp_message"),
      text("url"),
      number("geo_lat"),
      number("geo_lng"),
      text("footer_tagline"),
      text("working_hours"),
      json("service_areas"),
      text("default_seo_title"),
      text("default_seo_description"),
      text("ga_id"),
      text("ads_id"),
      text("gtm_id"),
    ],
    indexes: ["CREATE UNIQUE INDEX `idx_site_settings_key` ON `site_settings` (`key`)"],
  });

  await upsertCollection({
    name: "pages",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("key", { required: true }),
      text("path"),
      text("label"),
      text("eyebrow"),
      text("title"),
      text("description"),
      editor("body"),
      text("seo_title"),
      text("seo_description"),
      file("og_image"),
      json("content"),
      bool("is_published"),
    ],
    indexes: ["CREATE UNIQUE INDEX `idx_pages_key` ON `pages` (`key`)"],
  });

  await upsertCollection({
    name: "hero_slides",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("title", { required: true }),
      text("highlight"),
      text("description"),
      file("image"),
      number("sort_order"),
      bool("is_active"),
    ],
  });

  await upsertCollection({
    name: "site_blocks",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      select("group", [
        "features",
        "stats",
        "process",
        "about_values",
        "about_timeline",
        "services_highlights",
        "blog_topics",
        "projects_highlights",
      ], { required: true }),
      text("title", { required: true }),
      text("description"),
      text("value"),
      text("icon"),
      text("year"),
      number("sort_order"),
      bool("is_active"),
    ],
  });

  await upsertCollection({
    name: "projects",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("title", { required: true }),
      text("category"),
      text("location"),
      text("description"),
      file("cover_image"),
      number("sort_order"),
      bool("is_active"),
    ],
  });

  await upsertCollection({
    name: "faqs",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("question", { required: true }),
      editor("answer"),
      text("category"),
      number("sort_order"),
      bool("is_active"),
    ],
  });

  await upsertCollection({
    name: "testimonials",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("name", { required: true }),
      text("role"),
      text("quote"),
      number("sort_order"),
      bool("is_active"),
    ],
  });

  await upsertCollection({
    name: "authorized_brands",
    listRule: PUBLIC,
    viewRule: PUBLIC,
    createRule: ADMIN_ONLY,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("slug", { required: true }),
      text("brand"),
      text("title", { required: true }),
      text("short_title"),
      text("summary"),
      editor("description"),
      json("features"),
      json("services"),
      text("icon"),
      text("seo_title"),
      text("seo_description"),
      number("sort_order"),
      bool("is_active"),
    ],
    indexes: ["CREATE UNIQUE INDEX `idx_authorized_brands_slug` ON `authorized_brands` (`slug`)"],
  });

  await upsertCollection({
    name: "contact_messages",
    listRule: ADMIN_ONLY,
    viewRule: ADMIN_ONLY,
    createRule: PUBLIC,
    updateRule: ADMIN_ONLY,
    deleteRule: ADMIN_ONLY,
    fields: [
      text("name", { required: true }),
      text("phone"),
      text("subject"),
      text("message"),
      bool("is_read"),
    ],
  });

  try {
    const users = await pb.collections.getFirstListItem('name="users"');
    await pb.collections.update(users.id, { createRule: null });
    console.log("locked users registration");
  } catch {
    console.log("users collection skipped");
  }

  await seedIfEmpty("site_settings", [
    {
      key: "default",
      site_name: "Kale Kilit & Çilingir",
      phone: "0530 990 85 80",
      email: "info@kalekilitadana.com",
      address: "Yurt, Kurttepe Cd. Unalır AP zemin KT. 8/C, 01360 Çukurova/Adana",
      whatsapp_number: "905309908580",
      whatsapp_message:
        "Merhaba, Kale Kilit & Çilingir’den yazıyorum. Çilingir hizmeti hakkında bilgi almak istiyorum.",
      url: "https://kalekilitadana.com",
      geo_lat: 37.0498135272186,
      geo_lng: 35.2798258172829,
      footer_tagline:
        "Adana genelinde ev, oto ve kasa çilingirliği ile güvenlik sistemlerinde 7/24 hızlı ve güvenilir çözüm.",
      working_hours: "7/24 Kesintisiz Hizmet",
      service_areas: [
        "Çukurova",
        "Seyhan",
        "Yüreğir",
        "Sarıçam",
        "Karaisalı",
        "Ceyhan",
        "Kozan",
        "İmamoğlu",
        "Pozantı",
        "Karataş",
        "Yumurtalık",
        "Aladağ",
      ],
      default_seo_title: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
      default_seo_description:
        "Adana çilingir ve anahtarcı hizmeti: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde ortalama 15 dakikada yanınızdayız.",
      ga_id: "G-Z5V58P8ZQZ",
      ads_id: "AW-11397710707",
      gtm_id: "GTM-NSRJSVK8",
    },
  ]);

  await seedIfEmpty(
    "pages",
    PAGES.map((page) => ({
      ...page,
      body: "",
      is_published: true,
      content: page.content || {},
    })),
  );
  await seedIfEmpty("hero_slides", HERO);
  await seedIfEmpty("site_blocks", BLOCKS);
  await seedIfEmpty("projects", PROJECTS);
  await seedIfEmpty("faqs", FAQS);
  await seedIfEmpty("testimonials", TESTIMONIALS);
  await seedIfEmpty("authorized_brands", BRANDS);

  console.log("CMS setup complete");
}

main().catch((error) => {
  console.error(error?.response || error);
  process.exit(1);
});
