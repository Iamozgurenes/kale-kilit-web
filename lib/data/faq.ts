export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export const FAQS: FaqItem[] = [
  {
    category: "Hizmet",
    question: "Ne kadar sürede geliyorsunuz?",
    answer:
      "Şehir içi çoğu bölgede ortalama 15 dakika içinde konumunuza ulaşıyoruz. Yoğun trafik veya uzak bölgelerde bu süre değişebilir, arama sırasında size tahmini süreyi iletiyoruz.",
  },
  {
    category: "Hizmet",
    question: "Hizmetleriniz 7/24 mü?",
    answer:
      "Evet, ev, oto ve kasa çilingirliği başta olmak üzere tüm acil hizmetlerimiz yılın 365 günü, günün her saati kesintisiz olarak sunulmaktadır.",
  },
  {
    category: "Hizmet",
    question: "Hangi bölgelere hizmet veriyorsunuz?",
    answer:
      "Adana genelinde (Çukurova, Seyhan, Yüreğir, Sarıçam ve çevre ilçeler) hizmet veriyoruz. Çağrı sırasında bulunduğunuz konuma göre en yakın ekibi yönlendiriyoruz.",
  },
  {
    category: "Teknik",
    question: "Kapı veya kilide zarar veriyor musunuz?",
    answer:
      "Hayır. Kilit açma işlemlerimizde öncelikle hasarsız açılış yöntemlerini deniyoruz. Ancak kilit ciddi şekilde arızalıysa, önceden bilgilendirerek kilit değişimi öneriyoruz.",
  },
  {
    category: "Teknik",
    question: "Araç anahtarımı kaybettim, yenisini yapabilir misiniz?",
    answer:
      "Evet, çoğu marka ve model için immobilizer uyumlu yedek anahtar kopyalama ve programlama hizmeti sunuyoruz. Aracınızın ruhsatını yanınızda bulundurmanız yeterlidir.",
  },
  {
    category: "Teknik",
    question: "Akıllı kilit kurulumu ne kadar sürer?",
    answer:
      "Standart bir akıllı kilit montajı genellikle 1–2 saat içinde tamamlanır. Keşif gerektiren sistemlerde süre projeye göre planlanır.",
  },
  {
    category: "Ücret",
    question: "Fiyatlandırmanız nasıl belirleniyor?",
    answer:
      "Fiyatlarımız hizmet türü, saat ve bölgeye göre değişiklik gösterebilir. Arama sırasında size net bir fiyat teklifi sunuyoruz, gizli ücret uygulamıyoruz.",
  },
  {
    category: "Ücret",
    question: "Ödeme yöntemleriniz nelerdir?",
    answer:
      "Nakit ve kredi kartı ile ödeme kabul ediyoruz. Kurumsal müşterilerimiz için fatura karşılığı ödeme seçenekleri de mevcuttur.",
  },
  {
    category: "Ücret",
    question: "Gece veya tatil ücreti alıyor musunuz?",
    answer:
      "Acil çağrılarda saat dilimine göre fark oluşabilir. Arama anında size net ve şeffaf bir teklif iletilir; sürpriz ek ücret uygulanmaz.",
  },
  {
    category: "Güvenlik",
    question: "Personeliniz güvenilir mi?",
    answer:
      "Tüm ekip üyelerimiz kimlik kontrolünden geçer, işlemler kayıt altına alınır. Talep halinde kimlik ve iş bilgisi paylaşılır.",
  },
  {
    category: "Güvenlik",
    question: "Anahtarımı kaybettim, tüm kilitleri değiştirmeli miyim?",
    answer:
      "Güvenlik riskine göre değerlendiriyoruz. Çoğu durumda kritik giriş noktalarında göbek veya silindir değişimi yeterli olur; yerinde net öneri sunuyoruz.",
  },
];

export const FAQ_CATEGORIES = [
  "Tümü",
  ...Array.from(new Set(FAQS.map((f) => f.category))),
];
