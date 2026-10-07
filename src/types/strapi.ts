export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  mime: string;
  name: string;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  avatar: StrapiMedia | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

// Block types for the dynamic zone
export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

export interface MediaBlock {
  __component: 'shared.media';
  id: number;
  file: StrapiMedia;
}

export interface QuoteBlock {
  __component: 'shared.quote';
  id: number;
  title: string;
  body: string;
}

export interface SliderBlock {
  __component: 'shared.slider';
  id: number;
  files: StrapiMedia[];
}

export type Block = RichTextBlock | MediaBlock | QuoteBlock | SliderBlock;

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  cover: StrapiMedia | null;
  author: Author | null;
  category: Category | null;
  blocks: Block[];
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
