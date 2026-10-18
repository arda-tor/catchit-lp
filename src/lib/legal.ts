import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { SITE } from '../config/site';

export type LegalSlug = 'terms' | 'privacy';

/** Markdown içindeki {{legalName}} gibi yer tutucuları site ayarlarıyla doldurur. */
export const fill = (md: string) =>
  md.replace(/\{\{(\w+)\}\}/g, (m, key: string) =>
    key in SITE ? String(SITE[key as keyof typeof SITE]) : m,
  );

let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | undefined;

export async function loadLegal(slug: LegalSlug) {
  const entry = (await getEntry('legal', slug)) as CollectionEntry<'legal'>;
  const body = fill(entry.body ?? '');
  processor ??= await createMarkdownProcessor({ gfm: true, smartypants: false });
  const { code: html, metadata } = await processor.render(body);
  return { entry, body, html, headings: metadata.headings.filter((h) => h.depth === 2) };
}

export const legalEntries = async () =>
  (await getCollection('legal')).sort((a, b) => a.data.order - b.data.order);
