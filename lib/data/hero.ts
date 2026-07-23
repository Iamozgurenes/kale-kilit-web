export type HeroSlide = {
  id: string;
  image: string;
  title: string;
  highlight: string;
  description: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "acil",
    image: "/images/hero/slide-1.jpg",
    title: "Kale Kilit",
    highlight: "Yetkili Servis",
    description:
      "Adana’da ev, oto ve kasa çilingir hizmetlerinde 7/24 hızlı ve güvenilir çözüm.",
  },
  {
    id: "ev",
    image: "/images/hero/slide-2.jpg",
    title: "Ev çilingirinde",
    highlight: "Hasarsız Açılış",
    description:
      "Kapı ve kasanıza zarar vermeden acil müdahale. 7/24 profesyonel destek.",
  },
  {
    id: "oto",
    image: "/images/hero/slide-3.jpg",
    title: "Oto çilingirde",
    highlight: "Anında Çözüm",
    description:
      "Araç içinde kalan anahtar ve immobilizer sorunlarına hızlı, güvenli müdahale.",
  },
];
