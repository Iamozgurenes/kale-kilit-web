import { Car, Home, KeyRound, Lock, ShieldCheck, Wrench } from "lucide-react";

export const SERVICES = [
  {
    slug: "ev-cilingiri",
    icon: Home,
    title: "Ev Çilingiri",
    shortDescription:
      "Kapıda kalma, anahtar kırılması ve kilit arızalarına anında müdahale.",
    description:
      "Evinizin kapısında kaldığınızda dakikalar içinde yanınızdayız. Kırılan anahtar çıkarma, donmuş veya sıkışmış kilit açma ve acil kapı açma işlemlerini kapı ve kasanıza zarar vermeden gerçekleştiriyoruz.",
    details: [
      "Kapıda kalma ve acil kapı açma",
      "Kırık anahtar çıkarma",
      "Donmuş / sıkışmış kilit açma",
      "Apartman ve site giriş kapıları",
    ],
  },
  {
    slug: "oto-cilingir",
    icon: Car,
    title: "Oto Çilingir",
    shortDescription:
      "Araç içinde kalan anahtarlar ve immobilizer sorunlarına hızlı çözüm.",
    description:
      "Aracınızın içinde anahtar unuttuğunuzda veya immobilizer/çip anahtar sorunu yaşadığınızda, aracınıza zarar vermeden açılış ve yedek anahtar kopyalama hizmeti sunuyoruz.",
    details: [
      "Araç içinde kalan anahtar açma",
      "Immobilizer ve çip anahtar kopyalama",
      "Kumandalı anahtar programlama",
      "Kontak anahtarı arızaları",
    ],
  },
  {
    slug: "kasa-acma",
    icon: Lock,
    title: "Kasa Açma",
    shortDescription:
      "Şifresi unutulan veya arızalanan kasalarda hasarsız açılış.",
    description:
      "Ev veya iş yerinizdeki çelik kasalarda şifre unutma, mekanizma arızası veya anahtar kaybı durumlarında kasanıza zarar vermeden açılış sağlıyoruz.",
    details: [
      "Şifreli kasa açma",
      "Anahtarlı kasa açma",
      "Kasa şifre değişimi",
      "Arızalı kasa tamiri",
    ],
  },
  {
    slug: "kilit-degisimi",
    icon: KeyRound,
    title: "Kilit Değişimi",
    shortDescription:
      "Güvenlik seviyenizi artıran çelik kapı ve göbek kilit değişimi.",
    description:
      "Çalınma veya kaybolma sonrası güvenliğinizi yeniden sağlamak için göbek kilit değişimi, çelik kapı kilit sistemleri ve yüksek güvenlikli kilit montajı yapıyoruz.",
    details: [
      "Göbek kilit değişimi",
      "Çelik kapı kilit sistemleri",
      "Yüksek güvenlikli kilit montajı",
      "Kilit bakımı ve yağlama",
    ],
  },
  {
    slug: "guvenlik-sistemleri",
    icon: ShieldCheck,
    title: "Güvenlik Sistemleri",
    shortDescription:
      "Kartlı geçiş, şifreli kilit ve akıllı kilit kurulumu.",
    description:
      "Ev ve iş yerleriniz için kartlı geçiş sistemleri, şifreli/parmak izli akıllı kilitler ve merkezi kilit sistemleri kurarak güvenliğinizi modernleştiriyoruz.",
    details: [
      "Akıllı kilit kurulumu",
      "Kartlı / şifreli geçiş sistemleri",
      "Merkezi kilit sistemleri",
      "Danışmanlık ve keşif",
    ],
  },
  {
    slug: "genel-cilingirlik",
    icon: Wrench,
    title: "Genel Çilingirlik",
    shortDescription:
      "Anahtar çoğaltma, kilit tamiri ve bakım hizmetleri.",
    description:
      "Günlük çilingirlik ihtiyaçlarınız için anahtar çoğaltma, kilit tamiri, menteşe ve kapı ayarı gibi genel bakım hizmetlerini de sunuyoruz.",
    details: [
      "Anahtar çoğaltma",
      "Kilit tamiri ve bakımı",
      "Kapı ve menteşe ayarı",
      "Yerinde keşif ve danışmanlık",
    ],
  },
];
