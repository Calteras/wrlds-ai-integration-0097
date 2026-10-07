import { useQuery } from '@tanstack/react-query';
import { strapiGet, getStrapiMedia } from '@/lib/strapi';
import { blogPosts } from '@/data/blogPosts';
import type { StrapiListResponse, Article, Block } from '@/types/strapi';
import type { ContentSection } from '@/data/blogPosts';

export interface DisplayPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  source: 'strapi' | 'static';
  strapiBlocks?: Block[];
  staticContent?: ContentSection[];
}

const FALLBACK_IMAGE = '/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png';

function formatStrapiDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function normalizeArticle(article: Article): DisplayPost {
  return {
    id: String(article.id),
    title: article.title,
    slug: article.slug,
    excerpt: article.description,
    date: formatStrapiDate(article.publishedAt),
    author: article.author?.name ?? 'Calterras Holdings',
    category: article.category?.name ?? 'Uncategorized',
    imageUrl: getStrapiMedia(article.cover?.url) ?? FALLBACK_IMAGE,
    source: 'strapi',
    strapiBlocks: article.blocks,
  };
}

function normalizeStatic(): DisplayPost[] {
  return blogPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    date: p.date,
    author: p.author,
    category: p.category,
    imageUrl: p.imageUrl ?? FALLBACK_IMAGE,
    source: 'static',
    staticContent: p.content,
  }));
}

// ── List hook (used by Blog.tsx and BlogPreview.tsx) ──────────────────────────
export function useBlogPosts() {
  return useQuery<DisplayPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        const data = await strapiGet<StrapiListResponse<Article>>(
          '/articles?populate[0]=cover&populate[1]=author&populate[2]=category&sort=publishedAt:desc',
        );
        if (data.data.length > 0) {
          return data.data.map(normalizeArticle);
        }
      } catch {
        // Strapi unavailable — fall through to static data
      }
      return normalizeStatic();
    },
    staleTime: 60_000,
  });
}

// ── Single post hook (used by BlogPostDetail.tsx) ─────────────────────────────
export function useBlogPost(slug: string | undefined) {
  return useQuery<DisplayPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) return null;

      try {
        const params = new URLSearchParams({
          'filters[slug][$eq]': slug,
          // Top-level media fields need explicit field selection in Strapi v5 —
          // populate=* on media expands the internal `related` polymorphic field (blocked).
          'populate[cover][fields][0]': 'url',
          'populate[cover][fields][1]': 'alternativeText',
          'populate[cover][fields][2]': 'width',
          'populate[cover][fields][3]': 'height',
          'populate[author][fields][0]': 'name',
          'populate[author][fields][1]': 'email',
          'populate[category][fields][0]': 'name',
          'populate[category][fields][1]': 'slug',
          // Dynamic zone blocks: populate=* works fine here (media inside
          // components doesn't trigger the `related` restriction).
          'populate[blocks][populate]': '*',
        });
        const data = await strapiGet<StrapiListResponse<Article>>(
          `/articles?${params.toString()}`,
        );
        if (data.data.length > 0) {
          return normalizeArticle(data.data[0]);
        }
      } catch {
        // fall through
      }

      // Fallback to static data
      const staticPost = blogPosts.find((p) => p.slug === slug);
      if (!staticPost) return null;

      return {
        id: staticPost.id,
        title: staticPost.title,
        slug: staticPost.slug,
        excerpt: staticPost.excerpt,
        date: staticPost.date,
        author: staticPost.author,
        category: staticPost.category,
        imageUrl: staticPost.imageUrl ?? FALLBACK_IMAGE,
        source: 'static',
        staticContent: staticPost.content,
      };
    },
    enabled: !!slug,
    staleTime: 60_000,
  });
}
