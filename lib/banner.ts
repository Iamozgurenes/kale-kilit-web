export const BANNER = {
  slide1: "/images/hero/slide-1.jpg",
  slide2: "/images/hero/slide-2.jpg",
  slide3: "/images/hero/slide-3.jpg",
} as const;

/** Her sayfa için sabit banner görseli */
export const PAGE_BANNERS = {
  "/hakkimizda": BANNER.slide1,
  "/hizmetler": BANNER.slide2,
  "/hizmetler/[slug]": BANNER.slide2,
  "/projeler": BANNER.slide3,
  "/blog": BANNER.slide1,
  "/blog/[slug]": BANNER.slide1,
  "/sss": BANNER.slide3,
  "/iletisim": BANNER.slide2,
  "/kvkk": BANNER.slide1,
  "/gizlilik-politikasi": BANNER.slide2,
  "/cerez-politikasi": BANNER.slide3,
  "/kullanim-kosullari": BANNER.slide1,
} as const;

export type BannerPath = keyof typeof PAGE_BANNERS;

export function getBannerImage(path: BannerPath): string {
  return PAGE_BANNERS[path];
}
