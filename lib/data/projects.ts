export const PROJECTS = [
  {
    title: "Site Girişi Kartlı Geçiş Sistemi",
    category: "Güvenlik Sistemleri",
    location: "Ataşehir, İstanbul",
    description:
      "120 daireli sitenin ana giriş kapılarına kartlı geçiş ve otomatik kilit sistemi kurulumu yapıldı.",
  },
  {
    title: "Acil Kapı Açma Operasyonu",
    category: "Ev Çilingiri",
    location: "Kadıköy, İstanbul",
    description:
      "Gece yarısı kapıda kalan aile için 12 dakikada hasarsız kapı açılışı sağlandı.",
  },
  {
    title: "Çelik Kasa Şifre Yenileme",
    category: "Kasa Açma",
    location: "Şişli, İstanbul",
    description:
      "İş yerindeki arızalı çelik kasa hasarsız açılıp yeni şifreleme sistemi kuruldu.",
  },
  {
    title: "Filo Araçları İçin Yedek Anahtar",
    category: "Oto Çilingir",
    location: "Kartal, İstanbul",
    description:
      "Bir kargo firmasının 8 araçlık filosu için immobilizer uyumlu yedek anahtar kopyalama projesi.",
  },
  {
    title: "Apartman Göbek Kilit Yenileme",
    category: "Kilit Değişimi",
    location: "Maltepe, İstanbul",
    description:
      "24 daireli apartmanın tüm giriş kapılarında yüksek güvenlikli göbek kilit değişimi tamamlandı.",
  },
  {
    title: "Ofis Akıllı Kilit Kurulumu",
    category: "Güvenlik Sistemleri",
    location: "Levent, İstanbul",
    description:
      "Bir yazılım ofisine parmak izi ve şifreli akıllı kilit sistemi kurularak erişim kayıt altına alındı.",
  },
  {
    title: "Villa Çelik Kapı Güçlendirme",
    category: "Kilit Değişimi",
    location: "Beykoz, İstanbul",
    description:
      "Müstakil villada çelik kapı kilit mekanizması yenilenerek ek güvenlik noktaları eklendi.",
  },
  {
    title: "Otopark Acil Araç Açılışı",
    category: "Oto Çilingir",
    location: "Bakırköy, İstanbul",
    description:
      "AVM otoparkında kilitli kalan araç hasarsız açıldı, yedek anahtar aynı gün teslim edildi.",
  },
  {
    title: "Mağaza Kasa Acil Müdahale",
    category: "Kasa Açma",
    location: "Beşiktaş, İstanbul",
    description:
      "Perakende mağazasında sabah açılışı öncesi arızalanan kasa hızlı ve hasarsız şekilde açıldı.",
  },
];

export const PROJECT_CATEGORIES = [
  "Tümü",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];
