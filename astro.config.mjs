// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

// Statik çıktı: her sayfa build anında HTML'e dönüşür.
// İstemciye sıfır JavaScript gider; bu, hem tarayıcılar hem de AI ajanları için en hızlı yoldur.
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'never',
  // CSS küçük olduğu için HTML'e gömülür: ek istek yok, ilk boyama daha hızlı.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  prefetch: false,
});
