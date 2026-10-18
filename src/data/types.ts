// Pazarlama sayfalarının tek kaynağı. Aynı veri HTML sayfayı, /<sayfa>.md Markdown sürümünü,
// llms-full.txt dosyasını ve JSON-LD'yi üretir; insanlar ve AI ajanları aynı bilgiyi görür.

export type Link = { label: string; href: string };
export type Faq = { q: string; a: string };

export type MarketingPage = {
  path: string;
  metaTitle: string;
  description: string;
  hero: {
    /** Fotoğrafın üstünden geçen dev kelime. */
    word: string;
    /** h1'in ekran okuyucu ve arama motorları için tam hali. */
    h1: string;
    statement: string;
    action: Link;
    secondary?: Link;
    photo: string;
    photoAlt: string;
  };
  intro: {
    heading: string;
    body: string[];
    /** Büyük rakam (ör. "0 €") ve açıklaması. */
    figure?: { value: string; caption: string };
    facts?: { term: string; detail: string }[];
    table?: { caption: string; head: [string, string]; rows: [string, string][] };
  };
  steps: {
    heading: string;
    items: { title: string; text: string }[];
  };
  showcase: {
    heading: string;
    items: { name: string; text: string }[];
  };
  list: {
    heading: string;
    lead: string;
    items: { name: string; meta: string; text: string; photo: string; alt: string }[];
  };
  faq: { heading: string; items: Faq[] };
  cta: { heading: string; text: string };
};
