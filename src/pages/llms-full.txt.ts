import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { home } from '../data/home';
import { merchants } from '../data/merchants';
import { loadLegal } from '../lib/legal';
import { pageToMarkdown, legalToMarkdown } from '../lib/markdown';

// Sitenin tüm içeriği tek istekte; ajanlar sayfa sayfa gezmek zorunda kalmaz.
export const GET: APIRoute = async () => {
  const legal = await Promise.all(
    (['terms', 'privacy'] as const).map(async (slug) => {
      const { entry, body } = await loadLegal(slug);
      return legalToMarkdown(entry.data.title, body, `/${slug}`, entry.data.updated);
    }),
  );
  const parts = [
    `# ${SITE.name}: tam içerik\n\n> ${SITE.description}\n`,
    pageToMarkdown(home),
    pageToMarkdown(merchants),
    ...legal,
  ];
  return new Response(parts.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
