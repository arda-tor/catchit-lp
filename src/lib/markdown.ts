import { SITE, abs } from '../config/site';
import type { MarketingPage } from '../data/types';

const cell = (s: string) => s.replace(/\|/g, '\\|');

/** Pazarlama sayfasını, ajanların az token harcayarak okuyabileceği temiz Markdown'a çevirir. */
export function pageToMarkdown(p: MarketingPage) {
  const out: string[] = [
    `# ${p.hero.h1}`,
    `> ${p.description}`,
    p.hero.statement,
    `[${p.hero.action.label}](${p.hero.action.href.startsWith('#') ? abs(p.path) + p.hero.action.href : p.hero.action.href})`,
    `## ${p.intro.heading}`,
    ...p.intro.body,
  ];
  if (p.intro.figure) out.push(`**${p.intro.figure.value}**: ${p.intro.figure.caption}.`);
  if (p.intro.facts) out.push(p.intro.facts.map((f) => `- **${f.term}:** ${f.detail}`).join('\n'));
  if (p.intro.table) {
    const t = p.intro.table;
    out.push(
      [`| ${t.head.map(cell).join(' | ')} |`, '| --- | --- |', ...t.rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n'),
    );
  }
  out.push(
    `## ${p.steps.heading}`,
    p.steps.items.map((s, i) => `${i + 1}. **${s.title}** ${s.text}`).join('\n'),
    `## ${p.showcase.heading}`,
    p.showcase.items.map((s) => `- **${s.name}:** ${s.text}`).join('\n'),
    `## ${p.list.heading}`,
    p.list.lead,
    ['| Tür | Ne zaman / ücret | Açıklama |', '| --- | --- | --- |', ...p.list.items.map((r) => `| ${cell(r.name)} | ${cell(r.meta)} | ${cell(r.text)} |`)].join('\n'),
    `## ${p.faq.heading}`,
    p.faq.items.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n'),
    `## ${p.cta.heading}`,
    p.cta.text,
    '---',
    `Kaynak: ${abs(p.path)} · Son güncelleme: ${SITE.updated}`,
  );
  return out.join('\n\n') + '\n';
}

export function legalToMarkdown(title: string, body: string, path: string, updated: Date) {
  return `# ${title}\n\nSon güncelleme: ${updated.toISOString().slice(0, 10)}\n\n${body.trim()}\n\n---\n\nKaynak: ${abs(path)}\n`;
}

export const markdownResponse = (md: string) =>
  new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
