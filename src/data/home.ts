import type { MarketingPage } from './types';
import { SITE } from '../config/site';

export const home: MarketingPage = {
  path: '/',
  metaTitle: 'CatchIt: Yakınındaki kampanyaları anında yakala',
  description:
    'CatchIt, yürüme mesafendeki kafe, fırın, pastane, pazar tezgâhı ve çiçekçilerin o saate özel kampanyalarını gösteren mobil uygulamadır. Fırsatı yakala, kodu kasada göster.',
  hero: {
    word: 'catchit',
    h1: 'CatchIt, yakınındaki kampanyaları gösteren mobil uygulama',
    statement: 'Yakınındaki dükkânların o saate özel kampanyaları. Yakala, kodu kasada göster.',
    action: { label: 'Uygulamayı indir', href: '#indir' },
    secondary: { label: 'İşletmeler için', href: '/merchants' },
    photo: 'pazar-sebze',
    photoAlt: 'Bir hafta pazarında tezgâha dizilmiş havuç demetleri, karnabahar, pırasa ve yeşillikler',
  },
  intro: {
    heading: 'Saat saat değişen fırsatlar',
    body: [
      'CatchIt, kafe, fırın, pastane, pazar tezgâhı ve çiçekçi gibi yerel işletmelerin sınırlı süreli kampanyalarını konumuna göre gösteren bir mobil uygulamadır.',
      'Kampanyaları işletmeler kendi panellerinden yayınlar. CatchIt’te gördüğün fırsat, kasada geçerli olan fırsattır.',
    ],
    facts: [
      { term: 'Nerede', detail: 'Yürüme mesafende, metreye göre sıralı' },
      { term: 'Ne zaman', detail: 'Öğle arası, akşamüstü, kapanışa bir saat kala' },
      { term: 'Nasıl', detail: 'Tek kullanımlık kod, kasada gösterilir' },
      { term: 'Hangi telefon', detail: 'iPhone ve Android' },
    ],
  },
  steps: {
    heading: 'Nasıl çalışır',
    items: [
      { title: 'Önce çevrene bak.', text: 'Uygulamayı açtığında yakınındaki aktif kampanyalar mesafeye ve kalan süreye göre sıralanır.' },
      { title: 'Sonra fırsatı yakala.', text: 'Bir kampanyaya dokunup “Yakala” dediğinde CatchIt onu senin adına ayırır ve tek kullanımlık bir kod üretir.' },
      { title: 'Kasada kodu göster.', text: 'İşletme kodu onaylar, indirim anında uygulanır. Kart, kupon ya da üyelik gerekmez.' },
    ],
  },
  showcase: {
    heading: 'Uygulamada neler var',
    items: [
      { name: 'Bildirim', text: 'Seçtiğin kategorilerde yakınında yeni bir kampanya açıldığında CatchIt haber verir. Sıklığı sen belirlersin.' },
      { name: 'Favoriler', text: 'Sevdiğin kafeyi ya da fırını favorilere ekle; yeni kampanyaları listenin en üstüne gelsin.' },
      { name: 'Kategoriler', text: 'Kahve, fırın, pastane, pazar, çiçekçi, restoran. CatchIt yalnızca ilgilendiğin fırsatları gösterir.' },
      { name: 'Konum izni', text: 'CatchIt konumunu yalnızca yakındaki fırsatları göstermek için kullanır. İzin vermeden semt seçerek de kullanabilirsin.' },
    ],
  },
  list: {
    heading: 'Ne yakalanır',
    lead: 'Mahalledeki dükkânların en sık açtığı kampanyalar ve genelde açıldıkları saatler.',
    items: [
      { name: 'Kafe', meta: '08.00–11.00', text: 'Sabah kahvesinde ilk müşterilere açılan indirimler: filtre kahve, cappuccino, yanında kruvasan.', photo: 'kafe-teras', alt: 'Taş kemerlerin altında sıra sıra dizilmiş hasır kafe sandalyeleri ve yuvarlak masalar' },
      { name: 'Fırın ve pastane', meta: 'Kapanışa 1 saat', text: 'Gün sonunda kalan ekmek, kruvasan ve tartlar, çöpe gitmeden indirimli.', photo: 'firin', alt: 'Yeşil cepheli bir fırın ve pastanenin vitrinleri, kapısının iki yanında ahşap fıçılar' },
      { name: 'Pazar ve manav', meta: 'Gün sonu', text: 'Tezgâhta kalan meyve ve sebze, ertesi güne kalmadan uygun fiyata.', photo: 'pazar-tezgah', alt: 'Pazar tezgâhında kasalarla dizilmiş balkabakları, domates, zencefil ve taze soğan' },
      { name: 'Çiçekçi', meta: 'Akşamüstü', text: 'Günün sonunda kalan buketler ve saksı çiçekleri, solmadan indirimli.', photo: 'cicekci', alt: 'Çiçekçinin önünde büyük seramik saksılar ve kırmızı, pembe çiçekler' },
      { name: 'Restoran', meta: 'Öğle arası', text: 'Öğle menüsünde ve sakin saatlerde günün yemeğine özel indirimler.', photo: 'restoran-teras', alt: 'Ağaçlı bir meydanda kırmızı tenteli restoran terasları' },
    ],
  },
  faq: {
    heading: 'Sorular',
    items: [
      { q: 'CatchIt nedir?', a: 'CatchIt, yakınındaki kafe, fırın, pastane, pazar tezgâhı ve çiçekçilerin sınırlı süreli kampanyalarını konumuna göre gösteren bir mobil uygulamadır.' },
      { q: 'Hangi telefonlarda çalışır?', a: 'CatchIt, iPhone (App Store) ve Android (Google Play) telefonlarda çalışır.' },
      { q: 'Bir kampanyayı nasıl kullanırım?', a: 'Kampanyaya dokunup “Yakala” dersin, uygulama tek kullanımlık bir kod verir. Kodu kasada gösterdiğinde indirim uygulanır.' },
      { q: 'Kod ne kadar geçerli?', a: 'Kod, kampanyanın süresi boyunca geçerlidir. Kalan süre ve kalan adet uygulamada her zaman görünür.' },
      { q: 'Kampanyaları kim yayınlıyor?', a: 'Kampanyaları doğrudan işletmelerin kendisi CatchIt işletme paneli üzerinden yayınlar.' },
      { q: 'Konumum ne için kullanılıyor?', a: 'Yalnızca yakınındaki kampanyaları göstermek ve izin verdiysen yakındaki fırsatlar için bildirim göndermek için. CatchIt konum geçmişini satmaz.' },
      { q: 'Kampanya kasada uygulanmazsa?', a: 'Durumu uygulama içinden ya da e-postayla bildirebilirsin. CatchIt, kurallara uymayan kampanyaları yayından kaldırır.' },
      { q: 'İşletmemi nasıl eklerim?', a: 'İşletmeler sayfasından kayıt olabilirsin. CatchIt işletmeler için tamamen ücretsizdir: kurulum, abonelik ve komisyon yoktur.' },
    ],
  },
  cta: {
    heading: 'Fırsat köşede',
    text: `${SITE.name}’i App Store ya da Google Play’den indir. Açtığın an yakınındaki kampanyalar listelenir.`,
  },
};
