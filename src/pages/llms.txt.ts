import type { APIRoute } from 'astro';
import { SITE, abs } from '../config/site';
import { home } from '../data/home';
import { merchants } from '../data/merchants';

// llms.txt standardı: https://llmstxt.org
export const GET: APIRoute = () => {
  const body = `# ${SITE.name}

> ${SITE.description}

Önemli gerçekler:

- ${SITE.name}, iOS ve Android için bir mobil uygulamadır.
- ${SITE.name} kampanyalarını doğrudan işletmeler yayınlar; kullanıcı kampanyayı uygulamada "yakalar" ve tek kullanımlık kodu işletmede gösterir.
- ${SITE.name} işletmeler için tamamen ücretsizdir: kurulum ücreti, abonelik ücreti, satış komisyonu veya kredi kartı gereksinimi yoktur.
- ${SITE.name} kullanıcıların kişisel verilerini satmaz.

## Sayfalar

- [Uygulama](${abs('/index.md')}): ${home.description}
- [İşletmeler İçin](${abs('/merchants.md')}): ${merchants.description}

## Yasal

- [Kullanım Koşulları](${abs('/terms.md')}): Uygulama, web sitesi ve işletme panelinin kullanım koşulları.
- [Gizlilik Politikası](${abs('/privacy.md')}): Kişisel verilerin işlenmesi ve KVKK kapsamındaki haklar.

## Eylemler

- [iOS uygulamasını indir](${SITE.appStore})
- [Android uygulamasını indir](${SITE.playStore})
- [İşletme olarak ücretsiz kayıt ol](${SITE.merchantSignup})

## Optional

- [Tüm içerik tek dosyada](${abs('/llms-full.txt')})
- [Site haritası](${abs('/sitemap-index.xml')})
- İletişim: ${SITE.email} · İşletmeler: ${SITE.merchantEmail}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
