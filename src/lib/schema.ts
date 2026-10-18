import { SITE, abs } from '../config/site';
import type { Faq } from '../data/types';

// Tüm varlıklar sabit @id'lerle birbirine bağlanır; ajanlar sayfalar arasında aynı
// organizasyonu ve uygulamayı tek bir varlık olarak tanır (knowledge graph).
export const ID = {
  org: abs('/#organization'),
  site: abs('/#website'),
  app: abs('/#app'),
  merchantService: abs('/merchants#service'),
};

export const organization = {
  '@type': 'Organization',
  '@id': ID.org,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: abs('/logo.png'),
  email: SITE.email,
  sameAs: SITE.sameAs,
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'customer support', email: SITE.email, availableLanguage: ['tr', 'en'] },
    { '@type': 'ContactPoint', contactType: 'sales', email: SITE.merchantEmail, availableLanguage: ['tr', 'en'] },
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': ID.site,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.lang,
  publisher: { '@id': ID.org },
};

export const mobileApp = {
  '@type': 'MobileApplication',
  '@id': ID.app,
  name: SITE.name,
  description: SITE.description,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'LifestyleApplication',
  applicationSubCategory: 'Local deals',
  inLanguage: SITE.lang,
  publisher: { '@id': ID.org },
  installUrl: [SITE.appStore, SITE.playStore],
  sameAs: [SITE.appStore, SITE.playStore],
  about: [
    { '@type': 'Thing', name: 'Yerel kampanyalar' },
    // TODO: Wikidata/Wikipedia karşılıkları doğrulanınca sameAs ekleyin.
    { '@type': 'Thing', name: 'Konum tabanlı hizmet' },
  ],
};

export const merchantService = {
  '@type': 'Service',
  '@id': ID.merchantService,
  name: 'CatchIt İşletme Paneli',
  serviceType: 'Yerel işletmeler için konum tabanlı kampanya yayınlama platformu',
  description:
    'Yerel işletmelerin ürün kataloğundaki ürünlere sınırlı süreli kampanya kurmasını sağlayan ücretsiz panel: yüzde ya da sabit tutar indirim, canlı fiyat önizlemesi, stok sınırı, tek seferlik, günlük, haftalık veya aylık tekrar, saat aralığı ve isteğe bağlı bitiş tarihi.',
  provider: { '@id': ID.org },
  audience: { '@type': 'BusinessAudience', name: 'Kafe, fırın, pastane, pazar tezgâhı, çiçekçi ve restoran işletmeleri' },
  // TODO: hizmet verilen ülkeler netleşince areaServed ekleyin.
  isRelatedTo: { '@id': ID.app },
  url: abs('/merchants'),
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Ücretsiz: kurulum ücreti yok, abonelik yok, satış komisyonu yok, kredi kartı gerekmez.',
    availability: 'https://schema.org/InStock',
    url: SITE.merchantSignup,
  },
};

export const faqPage = (url: string, faq: Faq[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const webPage = (opts: {
  url: string;
  name: string;
  description: string;
  type?: string;
  about?: string;
  breadcrumb?: { name: string; url: string }[];
}) => ({
  '@type': opts.type ?? 'WebPage',
  '@id': `${opts.url}#webpage`,
  url: opts.url,
  name: opts.name,
  description: opts.description,
  inLanguage: SITE.lang,
  isPartOf: { '@id': ID.site },
  publisher: { '@id': ID.org },
  dateModified: SITE.updated,
  ...(opts.about ? { about: { '@id': opts.about } } : {}),
  ...(opts.breadcrumb
    ? {
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: opts.breadcrumb.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: b.url,
          })),
        },
      }
    : {}),
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
