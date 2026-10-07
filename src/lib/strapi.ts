const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function strapiGet<T>(path: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  const res = await fetch(`${STRAPI_URL}/api${path}`, { headers });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);
  return res.json();
}
