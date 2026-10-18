// Sayfanın tek script'i. Hepsi aşamalı geliştirme: script çalışmazsa içerik zaten görünür durumda.

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);
const hasIO = 'IntersectionObserver' in window;

// --- bölüm girişleri: bir kez, görünür olunca ---
{
  const targets = $$('[data-reveal], [data-shutter]');
  if (!hasIO) targets.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );
    targets.forEach((el) => io.observe(el));
    addEventListener('load', () => setTimeout(() => {
      targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
    }, 2500));
  }
}

// --- nasıl çalışır: bölüm bir kaydırma izi; izin neresinde olduğun etkin adımı seçer ---
// Tek bir doğruluk kaynağı var (kaydırma konumu). Başlığa tıklamak ve "Yakala" da o adımın konumuna kaydırır,
// böylece tıklama ile kaydırma hiçbir zaman çakışmaz.
const howTracks: { el: HTMLElement; go: (i: number) => void }[] = [];
for (const track of $$('[data-how]')) {
  const stage = track.querySelector<HTMLElement>('.stage');
  const steps = $$('.step', track);
  if (!stage || !steps.length) continue;
  const n = steps.length;
  let current = 0;
  const set = (i: number) => {
    if (i === current) return;
    current = i;
    steps.forEach((s, k) => {
      s.classList.toggle('is-active', k === i);
      const b = s.querySelector('button');
      if (k === i) b?.setAttribute('aria-current', 'step'); else b?.removeAttribute('aria-current');
    });
    stage.dataset.state = steps[i].dataset.step;
    // açıklamanın açılma geçişi bitince sahne yüksekliği değişmiş olabilir
    setTimeout(() => fit(), 400);
  };
  // izin kaydırılabilir boyu n eşit parçaya bölünür; her parça bir adım
  const span = () => Math.max(1, track.offsetHeight - innerHeight);
  const update = () => {
    const p = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / span()));
    set(Math.min(n - 1, Math.floor(p * n * 0.999)));
  };
  let queued = false;
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }, { passive: true });
  // uygulama parçasını sahneye sığdır: gerçek boyutunu ölç, contain mantığıyla küçült, asla kırpma.
  // Ölçek çok düşerse açıklamalar tek satıra iner ve sahneye yer açılır.
  const ui = stage.querySelector<HTMLElement>(':scope > [data-ui]');
  function fit() {
    if (!ui) return;
    track.classList.remove('is-tight');
    // the note under the fragment may wrap on narrow phones; reserve exactly its height
    const note = stage.querySelector<HTMLElement>('.ui-note');
    if (note) stage.style.setProperty('--note-h', `${note.offsetHeight}px`);
    const box = () => {
      const cs = getComputedStyle(stage);
      return {
        aw: stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
        ah: stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
      };
    };
    const scale = ({ aw, ah }: { aw: number; ah: number }) => Math.min(1, aw / ui.offsetWidth, ah / ui.offsetHeight);
    let b = box();
    let s = scale(b);
    if (s < 0.6) { track.classList.add('is-tight'); b = box(); s = scale(b); }
    s = Math.max(0.3, s);
    ui.style.setProperty('--fit', String(s));
    ui.style.setProperty('--fit-dy', `${Math.max(0, (b.ah - ui.offsetHeight * s) / 2)}px`);
  }
  addEventListener('resize', () => { fit(); update(); });
  addEventListener('load', fit);
  document.fonts?.ready.then(fit);
  fit();
  update();
  const go = (i: number) => {
    const y = track.getBoundingClientRect().top + scrollY + span() * ((i + 0.5) / n);
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTo({ top: y, behavior: calm ? 'auto' : 'smooth' });
  };
  steps.forEach((s, i) => s.querySelector('button')?.addEventListener('click', () => go(i)));
  howTracks.push({ el: track, go });
}

// --- canlı öğe: geri sayım ve "Yakala" ---
{
  const clocks = $$('[data-countdown]');
  const start = Date.now();
  const fmt = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    return (h ? `${h}:${String(m).padStart(2, '0')}` : String(m).padStart(2, '0')) + `:${String(x).padStart(2, '0')}`;
  };
  if (clocks.length) {
    const tick = () => {
      if (document.hidden) return;
      const gone = Math.floor((Date.now() - start) / 1000);
      for (const c of clocks) c.textContent = fmt(Math.max(0, Number(c.dataset.countdown) - gone));
    };
    setInterval(tick, 1000);
  }
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const newCode = () => {
    const pick = () => alphabet[Math.floor(Math.random() * alphabet.length)];
    return `${pick()}${pick()}${pick()} ${pick()}${pick()}${pick()}`;
  };
  // "Yakala": yeni bir kod üretir ve ikinci adıma (kod ekranı) kaydırır
  for (const btn of $$('[data-catch]')) {
    btn.addEventListener('click', () => {
      const track = btn.closest<HTMLElement>('[data-how]');
      if (!track) return;
      const code = newCode();
      $$('[data-code]', track).forEach((el) => (el.textContent = code));
      howTracks.find((t) => t.el === track)?.go(1);
    });
  }
}

// --- vitrin: isim seçilince ekran değişir ---
for (const section of $$('[data-showcase]')) {
  const buttons = $$<HTMLButtonElement>('button[data-i]', section);
  const sheets = $$('[data-sheet]', section);
  const notes = $$('[data-note]', section);
  const select = (i: string) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.i === i)));
    sheets.forEach((s) => (s.hidden = s.dataset.sheet !== i));
    notes.forEach((n) => (n.hidden = n.dataset.note !== i));
  };
  buttons.forEach((b) => b.addEventListener('click', () => select(b.dataset.i!)));
}

// --- kategori listesi: üzerine gelinen, odaklanılan ya da ekranın ortasına gelen satır etkin olur ---
for (const section of $$('[data-list]')) {
  const rows = $$('.cat', section);
  const imgs = $$('.cat-photo img', section);
  let current = '0';
  const activate = (i: string) => {
    if (i === current) return;
    current = i;
    rows.forEach((r) => {
      const on = r.dataset.i === i;
      r.classList.toggle('is-active', on);
      r.querySelector('button')?.setAttribute('aria-expanded', String(on));
    });
    imgs.forEach((im) => im.classList.toggle('is-on', im.dataset.i === i));
  };
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  rows.forEach((r) => {
    const b = r.querySelector('button')!;
    b.addEventListener('click', () => activate(r.dataset.i!));
    b.addEventListener('focus', () => activate(r.dataset.i!));
    if (fine) b.addEventListener('mouseenter', () => activate(r.dataset.i!));
  });
  if (hasIO) {
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) activate((e.target as HTMLElement).dataset.i!); },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    rows.forEach((r) => io.observe(r));
  }
}

// --- mağaza butonları: cihaz tanınırsa onun mağazası birincil, diğeri ikincil olur ---
for (const box of $$('[data-store]')) {
  const ua = navigator.userAgent;
  const platform = /android/i.test(ua) ? 'android' : /iphone|ipad|ipod/i.test(ua) ? 'ios' : '';
  if (!platform) continue;
  for (const btn of $$<HTMLAnchorElement>('.store-btn', box)) {
    const mine = btn.dataset.platform === platform;
    btn.classList.toggle('is-secondary', !mine);
    if (mine) box.querySelector('.stores')?.prepend(btn);
  }
}

// --- işletme paneli: canlı fiyat önizlemesi (gerçek hesap) ---
// Fiyat ve indirim virgüllü ya da noktalı yazılabilir. Yüzde 0–100 arasına, sabit tutar fiyatla sınırlanır.
// Sonuç kuruşa yuvarlanır: 140 € ve %11 → 124,60 €.
{
  const eur = (n: number) => n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const num = (v: string) => {
    const n = parseFloat(v.replace(/\s/g, '').replace(',', '.'));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };
  for (const box of $$('[data-preview]')) {
    const price = box.querySelector<HTMLInputElement>('input[name="price"]');
    const amount = box.querySelector<HTMLInputElement>('input[name="amount"]');
    const types = $$<HTMLInputElement>('input[name="dtype"]', box);
    const was = box.querySelector('[data-was]');
    const now = box.querySelector('[data-now]');
    const badge = box.querySelector('[data-badge]');
    const suffix = box.querySelector('[data-suffix]');
    if (!price || !amount || !was || !now || !badge) continue;
    const calc = () => {
      const p = num(price.value);
      const fixed = types.find((t) => t.checked)?.value === 'fix';
      const a = fixed ? Math.min(num(amount.value), p) : Math.min(num(amount.value), 100);
      const result = Math.round((fixed ? p - a : p * (1 - a / 100)) * 100) / 100;
      was.textContent = eur(p);
      now.textContent = eur(Math.max(0, result));
      badge.textContent = fixed ? `−${eur(a)}` : `−%${a.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}`;
      if (suffix) suffix.textContent = fixed ? '€' : '%';
    };
    [price, amount].forEach((el) => el.addEventListener('input', calc));
    types.forEach((t) => t.addEventListener('change', () => {
      // türe uygun bir örnek değer koy, kullanıcı hemen farkı görsün
      amount.value = t.value === 'fix' ? '1,00' : '40';
      calc();
    }));
    calc();
  }
}
