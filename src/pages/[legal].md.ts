import type { APIRoute, GetStaticPaths } from 'astro';
import { loadLegal, type LegalSlug } from '../lib/legal';
import { legalToMarkdown, markdownResponse } from '../lib/markdown';

export const getStaticPaths = (() =>
  (['terms', 'privacy'] as const).map((legal) => ({ params: { legal } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.legal as LegalSlug;
  const { entry, body } = await loadLegal(slug);
  return markdownResponse(legalToMarkdown(entry.data.title, body, `/${slug}`, entry.data.updated));
};
