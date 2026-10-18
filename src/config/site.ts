// Sitenin tüm sabit bilgileri tek yerde. Yayına almadan önce TODO işaretli alanları doldurun.
export const SITE = {
  name: 'CatchIt',
  // TODO: gerçek alan adı
  url: 'https://catchit.app',
  locale: 'tr_TR',
  lang: 'tr',
  tagline: 'Yakınındaki fırsatları kaçırma, yakala.',
  description:
    'CatchIt, çevrendeki kafe, restoran ve mağazaların sınırlı süreli kampanyalarını tek uygulamada gösteren ücretsiz bir mobil uygulamadır. İşletmeler için de tamamen ücretsizdir.',
  // TODO: gerçek iletişim bilgileri
  email: 'hello@catchit.app',
  merchantEmail: 'merchants@catchit.app',
  privacyEmail: 'privacy@catchit.app',
  // TODO: şirket unvanı ve adresi (yasal metinlerde de kullanılır)
  legalName: 'CatchIt Teknoloji A.Ş.',
  address: 'İstanbul, Türkiye',
  // TODO: mağaza linkleri
  appStore: 'https://apps.apple.com/app/catchit',
  playStore: 'https://play.google.com/store/apps/details?id=app.catchit',
  merchantSignup: 'https://merchants.catchit.app/signup',
  // TODO: resmi profiller. Bunlar JSON-LD içinde sameAs olarak AI ajanlarına markanın kimliğini doğrular.
  sameAs: [
    'https://www.instagram.com/catchit.app',
    'https://www.linkedin.com/company/catchit-app',
    'https://x.com/catchitapp',
  ],
  updated: '2026-10-17',
} as const;

export const NAV = [
  { href: '/', label: 'Uygulama' },
  { href: '/merchants', label: 'İşletmeler İçin' },
] as const;

export const abs = (path: string) => new URL(path, SITE.url).toString();
