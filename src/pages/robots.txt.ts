import type { APIRoute } from 'astro';
import { abs } from '../config/site';

// AI arama ve ajan tarayıcılarına açıkça izin veriyoruz: amaç, CatchIt'in yanıtlarda kaynak gösterilmesi.
const aiBots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'Bingbot', 'DuckAssistBot', 'meta-externalagent', 'MistralAI-User',
];

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${abs('/sitemap-index.xml')}`,
    '',
    `# AI ajanları için: ${abs('/llms.txt')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
