import type { MarketingPage } from './types';
import { SITE } from '../config/site';

// Özellikler ürünün gerçek işletme panelindeki "Kampanyalar" ekranından alındı:
// ürüne bağlı kampanya, stok sınırı, yüzde ya da sabit € indirim, canlı fiyat önizlemesi,
// tek seferlik / her gün / haftalık / aylık tekrar, saat aralığı, başlangıç ve isteğe bağlı bitiş tarihi.
export const merchants: MarketingPage = {
  path: '/merchants',
  metaTitle: 'CatchIt İşletmeler: Fazla ürününü gün bitmeden sat, ücretsiz',
  description:
    'CatchIt işletmeler için ücretsizdir. Ürününü seç, yüzde ya da sabit tutar indirim belirle, ne zaman geçerli olacağını seç. Fazla ürün çöpe gitmeden yakındaki müşterilere ulaşır. Kurulum, abonelik ve komisyon yok.',
  hero: {
    word: 'ücretsiz',
    h1: 'CatchIt işletmeler için ücretsiz',
    statement: 'Zaman sınırlı indirimlerle satışını hızlandır, fazla ürünü gün bitmeden değerlendir. CatchIt işletmeler için ücretsiz.',
    action: { label: 'Ücretsiz kayıt ol', href: SITE.merchantSignup },
    secondary: { label: 'Uygulama', href: '/' },
    photo: 'pastane-vitrin',
    photoAlt: 'Pastane vitrininde cam raflara dizilmiş üzümlü çörekler ve 9,80 € yazan fiyat etiketi',
  },
  intro: {
    heading: 'Ne ödersin? Hiçbir şey.',
    body: [
      'CatchIt işletmeler için ücretsizdir. Kampanya yayınlamak için kurulum ücreti, aylık abonelik ya da satış komisyonu ödenmez.',
      'Taahhüt de yok. Kampanyanı istediğin an durdurur, hesabını istediğin zaman kapatırsın.',
    ],
    figure: { value: '0 €', caption: 'Kurulum, abonelik ve satış başına komisyon dahil' },
    table: {
      caption: 'CatchIt işletme ücretleri',
      head: ['Kalem', 'Ücret'],
      rows: [
        ['Kayıt ve kurulum', 'Ücretsiz'],
        ['Aylık veya yıllık abonelik', 'Yok'],
        ['Satış başına komisyon', '%0'],
        ['Kampanya yayınlama', 'Ücretsiz'],
        ['Kredi kartı', 'İstenmez'],
        ['Sözleşme süresi', 'Yok'],
      ],
    },
  },
  steps: {
    heading: 'Nasıl çalışır',
    items: [
      { title: 'Ürününü seç, indirimi yaz.', text: 'Kataloğundaki bir ürünü seç, yüzde ya da sabit tutar indirim belirle. Fiyat önizlemesi indirimli fiyatı anında gösterir. İstersen kaç adet satacağını sınırla.' },
      { title: 'Ne zaman geçerli, sen seç.', text: 'Tek seferlik, her gün, haftalık ya da aylık tekrarla. İstersen belirli bir saat aralığıyla sınırla. Bitiş tarihi koymazsan kampanya süresiz devam eder.' },
      { title: 'Yayında, sen yönet.', text: 'Aktif kampanyaların tek listede durur. Düzenle, kopyala ya da sil; istediğin an durdur.' },
    ],
  },
  showcase: {
    heading: 'Kampanya türleri',
    items: [
      { name: 'Yüzde indirim', text: 'Ürünün fiyatından yüzde indirim. Örneğin 3,20 € filtre kahvede %30 ile 2,24 €.' },
      { name: 'Sabit indirim', text: 'Fiyattan sabit bir tutar düş. Örneğin 6,50 € günün çorbasında 2 € indirimle 4,50 €.' },
      { name: 'Stok sınırlı', text: 'Kaç adetin kampanyada satışa çıkacağını sen belirlersin. Gün sonunda kalan ekmekler için birebir.' },
      { name: 'Tekrarlayan', text: 'Her gün, haftanın seçtiğin günlerinde ya da ayın belirli günlerinde kendiliğinden tekrarlanır.' },
    ],
  },
  list: {
    heading: 'Kimler katılabilir',
    lead: 'Fiziksel bir adreste müşteri ağırlayan her işletme. Hepsi için ücret aynı: sıfır.',
    items: [
      { name: 'Kafe', meta: 'Ücretsiz', text: 'Öğleden sonra boşalan masalar için kahve ve tatlı kampanyası aç.', photo: 'kafe-teras', alt: 'Taş kemerlerin altında sıra sıra dizilmiş hasır kafe sandalyeleri ve yuvarlak masalar' },
      { name: 'Fırın ve pastane', meta: 'Ücretsiz', text: 'Kapanışa bir saat kala kalan ekmek ve kruvasanı stok sınırıyla indirime koy.', photo: 'firin', alt: 'Yeşil cepheli bir fırın ve pastanenin vitrinleri, kapısının iki yanında ahşap fıçılar' },
      { name: 'Pazar ve manav', meta: 'Ücretsiz', text: 'Gün sonunda tezgâhta kalan meyve ve sebzeyi ertesi güne bırakmadan sat.', photo: 'pazar-tezgah', alt: 'Pazar tezgâhında kasalarla dizilmiş balkabakları, domates, zencefil ve taze soğan' },
      { name: 'Çiçekçi', meta: 'Ücretsiz', text: 'Akşamüstü kalan buketleri her gün aynı saatte tekrarlayan bir kampanyayla değerlendir.', photo: 'cicekci', alt: 'Çiçekçinin önünde büyük seramik saksılar ve kırmızı, pembe çiçekler' },
      { name: 'Restoran', meta: 'Ücretsiz', text: 'Hafta içi öğle arası için günün yemeğine sabit tutar indirim koy.', photo: 'restoran-teras', alt: 'Ağaçlı bir meydanda kırmızı tenteli restoran terasları' },
    ],
  },
  faq: {
    heading: 'Sorular',
    items: [
      { q: 'CatchIt işletmeler için ücretsiz mi, komisyon var mı?', a: 'CatchIt işletmeler için ücretsizdir. Kurulum ücreti, aylık abonelik ve satış komisyonu yoktur.' },
      { q: 'Kayıt için kredi kartı gerekiyor mu?', a: 'Hayır. İşletme kaydında kredi kartı veya ödeme bilgisi istenmez.' },
      { q: 'İleride ücret gelecek mi?', a: 'Mevcut özellikler ücretli hale getirilmez. İleride isteğe bağlı ücretli bir özellik gelirse otomatik açılmaz ve en az 30 gün önceden bildirilir.' },
      { q: 'Hangi indirim türlerini kullanabilirim?', a: 'Ürün fiyatından yüzde indirim ya da sabit bir tutar indirim. Fiyat önizlemesi, müşterinin göreceği indirimli fiyatı kaydetmeden önce gösterir.' },
      { q: 'Kampanyamı belirli gün ve saatlerde çalıştırabilir miyim?', a: 'Evet. Kampanya tek seferlik olabilir ya da her gün, haftanın seçtiğin günlerinde veya ayın belirli günlerinde tekrarlanabilir. İstersen belirli bir saat aralığıyla da sınırlarsın.' },
      { q: 'Bitiş tarihi koymak zorunda mıyım?', a: 'Hayır. Bitiş tarihini boş bırakırsan kampanya süresiz devam eder; istediğin an durdurabilirsin.' },
      { q: 'Kaç adet satacağımı sınırlayabilir miyim?', a: 'Evet. Stok sınırını açıp kullanılabilir adedi yazarsın; kampanyada yalnızca o kadar ürün satışa çıkar.' },
      { q: 'Bırakmak istersem ne olur?', a: 'Taahhüt veya sözleşme süresi yoktur. Kampanyalarını istediğin an durdurur, hesabını istediğin zaman kapatırsın.' },
    ],
  },
  cta: {
    heading: 'Bugün yayına çık',
    text: `Kayıt ücretsiz ve birkaç dakika sürer. Butona bastığında işletmenin adıyla kayıt sayfası açılır. Sorun olursa ${SITE.merchantEmail} adresine yaz.`,
  },
};
