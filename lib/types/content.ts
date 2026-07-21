export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  details: string[];
  coverImage: string | null;
  sortOrder: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  publishedAt: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
};
