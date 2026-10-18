# catchit-lp

CatchIt tanıtım sitesi. Astro ile statik üretilir. Her sayfa tam HTML olarak gelir; tek küçük script yalnızca etkileşim ve hareket ekler, içerik onsuz da görünür.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # çıktı: dist/
npm run preview
```

## ngrok ile geçici paylaşım

ngrok kurulu olmalı. İlk kullanımda [ngrok panelindeki token'ı](https://dashboard.ngrok.com/get-started/your-authtoken) kendi terminalinizde ekleyin:

```bash
ngrok config add-authtoken TOKENINIZ
```

Site `npm run dev` ile çalışırken ayrı bir terminalde tüneli açın:

```bash
npm run share
```

ngrok'un gösterdiği HTTPS adresini paylaşın. Site ve ngrok çalıştığı sürece bağlantı açık kalır; tüneli kapatmak için `Ctrl+C` kullanın.

`ngrok-policy.yml`, gelen isteğin `Host` başlığını yerel adrese çevirerek Astro'nun alan adı kontrolüyle uyum sağlar.

## Sayfalar

| Adres | Kaynak | Markdown sürümü |
| --- | --- | --- |
| `/` | `src/data/home.ts` | `/index.md` |
| `/merchants` | `src/data/merchants.ts` | `/merchants.md` |
| `/terms` | `src/content/legal/terms.md` | `/terms.md` |
| `/privacy` | `src/content/legal/privacy.md` | `/privacy.md` |

Metni değiştirmek için yalnızca bu kaynak dosyaları düzenleyin. HTML, Markdown, `llms.txt`, `llms-full.txt` ve JSON-LD aynı kaynaktan üretilir.

Yasal metinlerdeki `{{legalName}}`, `{{email}}` gibi yer tutucular `src/config/site.ts` içinden doldurulur.

## Tasarım

Tasarım `.agents/skills/design-taste-frontend` skill'iyle yapıldı. Çekilen yön "split stage" (seed 140134724).

- **Palet:** açık taş-yeşil zemin, koyu şişe yeşili yazı, tek vurgu yaprak yeşili, kapanışta koyu yeşil alan. Tokenlar `src/styles/global.css` başında.
- **Yazı:** tek aile, Clash Grotesk (Fontshare). Türkçe karakterlerin hepsini içeriyor.
- **Kurallar:** sayfa genelinde köşe, gölge, ince çizgi, gradyan ve etiket rozeti yok. Uygulama ekranı parçaları `[data-ui]` altında kendi kurallarıyla çizilir (`src/styles/ui.css`).
- **Canlı öğe:** ana sayfadaki uygulama ekranında fırsatlar gerçek zamanlı geri sayar, "Yakala" butonu kod üretir.
- **Denetim:** `node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4321/` ile ölçülür. Mutlak `/photos/...` yolları yüzünden `dist/index.html` dosyasını değil, çalışan sunucunun adresini verin.

### Fotoğraflar

`public/photos/` altındaki fotoğraflar Avrupa şehirlerinden (Toulouse, Paris, Monschau, Münster), Wikimedia Commons'tan ticari kullanıma izin veren lisanslarla alındı. Kaynakları `src/data/photos.json` içinde ve her sayfanın footer'ında otomatik olarak gösteriliyor. CatchIt'e ya da bir müşteri işletmeye ait değiller. Gerçek fotoğraflar gelince değiştirin ve `photos.json` dosyasını güncelleyin.

### Örnek içerik

Uygulama ekranlarındaki işletme ve ürün adları (Bäckerei Morgenrot, Café Lindgrün, Bistro Zwölf, Blumen Weide; ekşi mayalı ekmek, elmalı turta, kruvasan), fiyatlar, kodlar ve kampanyalar örnektir. İşletme paneli parçası ürünün gerçek "Kampanyalar" ekranındaki alanlara göre çizildi. Yayından önce gerçek ekranlarla karşılaştırın. Bu yüzden her uygulama ekranı alanının köşesinde "Temsili görsel. Uygulamanın gerçek arayüzü farklılık gösterebilir." notu var (`src/components/HowItWorks.astro`, `src/components/Showcase.astro`).

## AI / ajan optimizasyonu (ASO)

- **Hafif sayfa:** CSS gömülü, script küçük, içerik scriptsiz de okunur.
- **Bağımsız bölümler:** Her bölüm başlığı tek başına anlamlı; ilk cümle doğrudan cevap. Zamir yerine "CatchIt" adı kullanılır.
- **JSON-LD bilgi grafiği:** `Organization`, `WebSite`, `MobileApplication`, `Service` (işletmeler için `price: 0`), `FAQPage`, `BreadcrumbList`. Varlıklar sabit `@id` ile birbirine bağlıdır.
- **`/llms.txt` ve `/llms-full.txt`:** [llmstxt.org](https://llmstxt.org) formatında.
- **Markdown uçları:** Her sayfanın `.md` sürümü var ve `<link rel="alternate" type="text/markdown">` ile duyurulur.
- **İçerik müzakeresi:** `vercel.json`, `Accept: text/markdown` başlığıyla gelen isteklere aynı adreste Markdown döndürür.
- **robots.txt:** Arama ve AI tarayıcılarına açıkça izin verir.

## Yayın

Vercel'e olduğu gibi bağlanabilir. İçerik müzakeresi `vercel.json` kurallarına dayanır. Başka bir sağlayıcıda (Netlify, Cloudflare) `.md` uçları çalışır ama `Accept` başlığına göre yönlendirme için o sağlayıcının edge kuralı ayrıca yazılmalıdır.

## Yayından önce yapılacaklar

- [ ] `src/config/site.ts` içindeki TODO alanları: alan adı, şirket unvanı, adres, e-postalar, mağaza linkleri, işletme kayıt linki, sosyal profiller.
- [ ] Ürün metinlerini ve uygulama ekranlarını gerçek ürünle karşılaştırın (`src/data/*.ts`, `src/components/ui/`).
- [ ] Kullanım Koşulları ve Gizlilik Politikası taslaktır. Bir hukukçuya kontrol ettirin.
- [ ] `public/logo.png`, `public/favicon.svg` geçici işarettir. Gerçek logoyla değiştirin.
- [ ] Yayından sonra Google Search Console ve Bing Webmaster Tools'a sitemap gönderin.
