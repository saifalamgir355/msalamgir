/* =====================================================
   M/S ALAMGIR — website script (EN / বাংলা)
   ===================================================== */
'use strict';

const WHATSAPP_NUMBER = '8801819917560';

const SERVICE_OPTIONS = {
  en: [
    ['', 'Select a service…'],
    ['Land & Hill Measurement', 'Land & Hill Measurement'],
    ['Digital Survey (GPS)', 'Digital Survey (GPS)'],
    ['Deed Registration', 'Deed Registration'],
    ['Mutation (Namjari)', 'Mutation (Namjari)'],
    ['Land / Flat Registration', 'Land / Flat Registration'],
    ['Property Legal Help', 'Property Legal Help'],
    ['Land Partition & Bontonnama', 'Land Partition & Bontonnama'],
    ['Flat Registration', 'Flat Registration'],
    ['Layout & CDA Plans', 'Layout & CDA Plans'],
    ['Other', 'Other']
  ],
  bn: [
    ['', 'একটি সেবা নির্বাচন করুন…'],
    ['Land & Hill Measurement', 'জমি ও পাহাড় পরিমাপ'],
    ['Digital Survey (GPS)', 'ডিজিটাল সার্ভে (জিপিএস)'],
    ['Deed Registration', 'দলিল রেজিস্ট্রি'],
    ['Mutation (Namjari)', 'নামজারি (মিউটেশন)'],
    ['Land / Flat Registration', 'জমি / ফ্ল্যাট রেজিস্ট্রেশন'],
    ['Property Legal Help', 'জমির আইনি সহায়তা'],
    ['Land Partition & Bontonnama', 'জমির ভাগ-বাটোয়ারা ও বণ্টননামা'],
    ['Flat Registration', 'ফ্ল্যাট রেজিস্ট্রেশন'],
    ['Layout & CDA Plans', 'লে-আউট ও সিডিএ প্ল্যান'],
    ['Other', 'অন্যান্য']
  ]
};

const PAGE_TITLES = document.body && document.body.dataset.page ? null : {
  en: 'দলিল লেখক ও জমি সার্ভেয়ার, চট্টগ্রাম | M/S Alamgir',
  bn: 'দলিল লেখক ও জমি সার্ভেয়ার, চট্টগ্রাম | মেসার্স আলমগীর'
};

function storageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

/* =====================================================
   TOOLS — document checklist + land area converter
   ===================================================== */
const CHECKLIST = [
  { icon: 'ph-handshake', en: 'Buying land / Deed registration', bn: 'জমি ক্রয় / দলিল রেজিস্ট্রি', items: [
    ['Seller’s original title deed', 'বিক্রেতার মূল দলিল'],
    ['Previous chain deeds (bia deeds)', 'বায়া দলিল (পূর্ববর্তী দলিলসমূহ)'],
    ['Khatian copies — CS, SA, RS, BS / city survey', 'খতিয়ানের কপি — সিএস, এসএ, আরএস, বিএস / সিটি জরিপ'],
    ['Mutation khatian & DCR in the seller’s name', 'বিক্রেতার নামে নামজারি খতিয়ান ও ডিসিআর'],
    ['Up-to-date land tax (khajna) receipt', 'হালনাগাদ খাজনার রসিদ'],
    ['NID of buyer and seller', 'ক্রেতা ও বিক্রেতার জাতীয় পরিচয়পত্র'],
    ['Passport-size photographs', 'পাসপোর্ট সাইজের ছবি'],
    ['Warish certificate, if the land was inherited', 'উত্তরাধিকার সূত্রে প্রাপ্ত হলে ওয়ারিশ সনদ']
  ] },
  { icon: 'ph-stamp', en: 'Mutation (Namjari)', bn: 'নামজারি (মিউটেশন)', items: [
    ['Certified copy of the registered deed', 'রেজিস্ট্রিকৃত দলিলের সার্টিফাইড কপি'],
    ['Latest khatian copy', 'সর্বশেষ খতিয়ানের কপি'],
    ['Land tax (khajna) receipt', 'খাজনার রসিদ'],
    ['NID and photo of the applicant', 'আবেদনকারীর জাতীয় পরিচয়পত্র ও ছবি'],
    ['Warish certificate, for inherited land', 'উত্তরাধিকারের ক্ষেত্রে ওয়ারিশ সনদ'],
    ['Active mobile number for e-namjari', 'ই-নামজারির জন্য সচল মোবাইল নম্বর']
  ] },
  { icon: 'ph-users-three', en: 'Family partition / Bontonnama', bn: 'পারিবারিক বণ্টন / বণ্টননামা', items: [
    ['Death certificate of the owner', 'মালিকের মৃত্যু সনদ'],
    ['Warish (succession) certificate', 'ওয়ারিশ সনদ'],
    ['All deeds and khatian of the property', 'সম্পত্তির সকল দলিল ও খতিয়ান'],
    ['NID and photos of every heir', 'প্রত্যেক ওয়ারিশের জাতীয় পরিচয়পত্র ও ছবি'],
    ['Land tax (khajna) receipt', 'খাজনার রসিদ'],
    ['The shares the family has agreed', 'পরিবারের সম্মত অংশের তালিকা']
  ] },
  { icon: 'ph-buildings', en: 'Flat registration', bn: 'ফ্ল্যাট রেজিস্ট্রেশন', items: [
    ['Agreement or allotment letter from the developer', 'ডেভেলপারের চুক্তিপত্র বা বরাদ্দপত্র'],
    ['Payment receipts', 'মূল্য পরিশোধের রসিদ'],
    ['Copies of the landowner’s deed and developer’s power of attorney', 'জমির মালিকের দলিল ও ডেভেলপারের আমমোক্তারনামার কপি'],
    ['Approved building plan (CDA) copy', 'অনুমোদিত নকশার (সিডিএ) কপি'],
    ['Buyer’s NID, TIN (if applicable) and photos', 'ক্রেতার জাতীয় পরিচয়পত্র, টিআইএন (প্রযোজ্য হলে) ও ছবি']
  ] },
  { icon: 'ph-ruler', en: 'Land measurement / GPS survey', bn: 'জমি পরিমাপ / জিপিএস সার্ভে', items: [
    ['Copies of deed and khatian', 'দলিল ও খতিয়ানের কপি'],
    ['Mouza map sheet, if you have it', 'মৌজা ম্যাপ (থাকলে)'],
    ['Dag (plot) numbers', 'দাগ নম্বর'],
    ['Names of neighbouring owners', 'পার্শ্ববর্তী মালিকদের নাম'],
    ['Access to the land on survey day', 'জরিপের দিন জমিতে প্রবেশের ব্যবস্থা']
  ] }
];

/* Area units, value = square feet per unit */
const AREA_UNITS = [
  { id: 'decimal', en: 'Decimal', bn: 'শতাংশ',   short: { en: 'decimal', bn: 'শতাংশ' },  sqft: 435.6 },
  { id: 'katha',   en: 'Katha',   bn: 'কাঠা',    short: { en: 'katha', bn: 'কাঠা' },     sqft: 720 },
  { id: 'gonda',   en: 'Gonda',   bn: 'গন্ডা',    short: { en: 'gonda', bn: 'গন্ডা' },     sqft: 864 },
  { id: 'kani',    en: 'Kani',    bn: 'কানি',    short: { en: 'kani', bn: 'কানি' },      sqft: 17280 },
  { id: 'bigha',   en: 'Bigha',   bn: 'বিঘা',    short: { en: 'bigha', bn: 'বিঘা' },     sqft: 14400 },
  { id: 'acre',    en: 'Acre',    bn: 'একর',     short: { en: 'acre', bn: 'একর' },       sqft: 43560 },
  { id: 'sqft',    en: 'Sq feet', bn: 'বর্গফুট',  short: { en: 'sq ft', bn: 'বর্গফুট' },   sqft: 1 },
  { id: 'sqm',     en: 'Sq metre', bn: 'বর্গমিটার', short: { en: 'm²', bn: 'বর্গমিটার' }, sqft: 10.7639104 },
  { id: 'ojut',    en: 'Ojutangsho', bn: 'অযুতাংশ', short: { en: 'ojutangsho', bn: 'অযুতাংশ' }, sqft: 4.356 }
];

const MSTools = (() => {
  const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
  const toBn = s => String(s).replace(/[0-9]/g, d => BN_DIGITS[d]);
  let L = 'en';
  let active = 0;
  const ticked = CHECKLIST.map(m => m.items.map(() => false));
  let els = {};

  function fmt(n) {
    if (!isFinite(n)) return '—';
    const digits = n >= 1000 ? 2 : n >= 1 ? 3 : 5;
    const s = Number(n.toFixed(digits)).toLocaleString('en-US', { maximumFractionDigits: digits });
    return L === 'bn' ? toBn(s) : s;
  }

  function renderTabs() {
    els.tabs.innerHTML = '';
    CHECKLIST.forEach((m, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cl-tab';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(i === active));
      b.setAttribute('aria-controls', 'clPanel');
      b.innerHTML = '<i class="ph ' + m.icon + '" aria-hidden="true"></i><span></span>';
      b.querySelector('span').textContent = m[L];
      b.addEventListener('click', () => { active = i; renderTabs(); renderList(); });
      els.tabs.appendChild(b);
    });
  }

  function renderProgress() {
    const done = ticked[active].filter(Boolean).length;
    const total = ticked[active].length;
    els.prog.textContent = L === 'bn' ? toBn(done) + ' / ' + toBn(total) + ' সংগৃহীত' : done + ' of ' + total + ' collected';
    els.bar.style.width = (done / total * 100) + '%';
  }

  function renderList() {
    const m = CHECKLIST[active];
    els.title.textContent = m[L];
    els.list.innerHTML = '';
    m.items.forEach((pair, j) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = ticked[active][j];
      input.addEventListener('change', () => { ticked[active][j] = input.checked; renderProgress(); });
      const box = document.createElement('span');
      box.className = 'cl-box';
      box.innerHTML = '<i class="ph-bold ph-check" aria-hidden="true"></i>';
      const text = document.createElement('span');
      text.className = 'cl-text';
      text.textContent = L === 'bn' ? pair[1] : pair[0];
      label.append(input, box, text);
      li.appendChild(label);
      els.list.appendChild(li);
    });
    renderProgress();
    const msg = (L === 'bn' ? 'আসসালামু আলাইকুম, এই বিষয়ে সহায়তা প্রয়োজন: ' : 'Hello, I need help with: ') + m[L];
    els.wa.href = 'https://wa.me/8801819917560?text=' + encodeURIComponent(msg);
  }

  let fromUnit = 'decimal';

  function renderUnits() {
    els.units.innerHTML = '';
    AREA_UNITS.forEach(u => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'unit-chip';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(u.id === fromUnit));
      b.textContent = u[L];
      b.addEventListener('click', () => { fromUnit = u.id; renderUnits(); convert(); });
      els.units.appendChild(b);
    });
  }

  let lastSummary = '';
  function convert() {
    const v = parseFloat(els.value.value);
    const val = isNaN(v) || v < 0 ? 0 : v;
    const from = AREA_UNITS.find(u => u.id === fromUnit);
    const sqft = val * from.sqft;
    els.suffix.textContent = from.short[L];
    els.out.innerHTML = '';
    const lines = [];
    AREA_UNITS.forEach(u => {
      if (u.id === from.id) return;
      const li = document.createElement('li');
      const strong = document.createElement('strong');
      strong.textContent = fmt(sqft / u.sqft);
      const span = document.createElement('span');
      span.textContent = u[L];
      li.append(strong, span);
      els.out.appendChild(li);
      lines.push(fmt(sqft / u.sqft) + ' ' + u.short[L]);
    });
    lastSummary = fmt(val) + ' ' + from.short[L] + ' = ' + lines.join(', ');
    const msg = (L === 'bn' ? 'জমির মাপ: ' : 'Land area: ') + lastSummary + (L === 'bn' ? '\nসঠিক পরিমাপের জন্য যোগাযোগ করতে চাই।' : '\nI would like a certified measurement.');
    els.share.href = 'https://wa.me/8801819917560?text=' + encodeURIComponent(msg);
  }

  function init() {
    els = {
      tabs: document.getElementById('clTabs'), list: document.getElementById('clList'),
      title: document.getElementById('clTitle'), prog: document.getElementById('clProgress'),
      bar: document.getElementById('clBar'), wa: document.getElementById('clWa'),
      value: document.getElementById('convValue'), units: document.getElementById('convUnits'),
      out: document.getElementById('convOut'), suffix: document.getElementById('convSuffix'),
      share: document.getElementById('convShare'), copy: document.getElementById('convCopy')
    };
    if (els.tabs) document.getElementById('clPrint').addEventListener('click', () => window.print());
    if (els.value) {
      els.value.addEventListener('input', convert);
      els.copy.addEventListener('click', () => {
        const label = els.copy.querySelector('span');
        const done = () => { const t = label.textContent; label.textContent = L === 'bn' ? 'কপি হয়েছে ✓' : 'Copied ✓'; setTimeout(() => { label.textContent = t; }, 1600); };
        if (navigator.clipboard) navigator.clipboard.writeText(lastSummary).then(done).catch(() => {});
      });
    }
  }

  function render(lang) {
    L = lang;
    if (!els.tabs) init();
    if (els.tabs) { renderTabs(); renderList(); }
    if (els.value) { renderUnits(); convert(); }
  }

  return { render };
})();

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const $ = id => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const M = window.Motion;
  const canMotion = !!(M && M.animate && M.inView && !reduceMotion);
  if (canMotion) root.classList.add('motion-ok');
  const EASE = [0.22, 1, 0.36, 1];

  /* ---------- Hero title: split into words for Motion ---------- */
  function splitHero() {
    if (!canMotion) return;
    document.querySelectorAll('.hero-line, .hero-em').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(w => '<span class="w"><span>' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>').join(' ');
    });
  }
  let heroPlayed = false;
  function playHero() {
    if (!canMotion) return;
    const words = document.querySelectorAll('.hero-title .w > span');
    if (!words.length) return;
    M.animate(words, { y: ['110%', '0%'] }, { duration: heroPlayed ? 0.6 : 1, delay: M.stagger(0.07, { startDelay: heroPlayed ? 0 : 0.15 }), ease: EASE });
    heroPlayed = true;
  }

  /* ---------- 1. Language ---------- */
  const langBtn = $('langToggle');
  const langLabel = $('langLabel');
  const select = $('service');

  function buildSelect(lang) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = '';
    SERVICE_OPTIONS[lang].forEach(([value, label], i) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      if (i === 0) opt.disabled = true;
      if (value === current) opt.selected = true;
      select.appendChild(opt);
    });
    if (!current) select.selectedIndex = 0;
  }

  function applyLanguage(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'bn' ? 'bn' : 'en');
    if (PAGE_TITLES) document.title = PAGE_TITLES[lang];
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) el.innerHTML = text;
    });
    document.querySelectorAll('[data-en-ph]').forEach(el => {
      el.placeholder = el.getAttribute('data-' + lang + '-ph') || el.getAttribute('data-en-ph');
    });
    buildSelect(lang);
    MSTools.render(lang);
    if (langLabel) langLabel.textContent = lang === 'bn' ? 'English' : 'বাংলা';
    storageSet('ms-alamgir-lang', lang);
    splitHero();
    if (heroPlayed) playHero();
  }

  if (langBtn) langBtn.addEventListener('click', () => {
    applyLanguage(root.getAttribute('data-lang') === 'bn' ? 'en' : 'bn');
  });
  applyLanguage(storageGet('ms-alamgir-lang') === 'bn' ? 'bn' : 'en');
  root.classList.add('split-ready');
  playHero();

  /* ---------- 2. Hero rotating services ---------- */
  const rot = $('heroWords');
  if (rot) {
    const items = rot.querySelectorAll('.hr-word');
    let idx = 0;
    if (!reduceMotion && items.length > 1) {
      setInterval(() => {
        if (document.hidden) return;
        const cur = items[idx];
        cur.classList.remove('is-on'); cur.classList.add('is-out');
        setTimeout(() => cur.classList.remove('is-out'), 600);
        idx = (idx + 1) % items.length;
        items[idx].classList.add('is-on');
      }, 2400);
    }
  }

  /* ---------- 3. Navbar + back-to-top ---------- */
  const navbar = $('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const backTop = $('backTop');

  function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 50 || document.body.dataset.page);
    if (backTop) backTop.classList.toggle('visible', y > 600);
    let currentId = '';
    sections.forEach(sec => { if (y >= sec.offsetTop - 130) currentId = sec.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + currentId));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- 4. Mobile menu ---------- */
  const hamburger = $('hamburger');
  const mobileNav = $('mobileNav');
  if (hamburger && mobileNav) {
    const setMenu = open => {
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) navbar.classList.add('scrolled'); else onScroll();
      if (open && canMotion) {
        M.animate(mobileNav.querySelectorAll('.mob-link, .mob-actions, .mob-info'), { opacity: [0, 1], x: [-16, 0] }, { duration: 0.4, delay: M.stagger(0.035), ease: EASE });
      }
    };
    hamburger.addEventListener('click', () => setMenu(mobileNav.hidden));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 960) setMenu(false); });
  }

  /* ---------- 5. Reveal (Motion with CSS fallback) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (canMotion) {
    reveals.forEach(el => {
      M.inView(el, () => {
        const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal')) : [el];
        const i = Math.max(0, sibs.indexOf(el));
        el.classList.add('visible');
        M.animate(el, { opacity: [0, 1], y: [44, 0], filter: ['blur(6px)', 'blur(0px)'] }, { duration: 0.9, delay: Math.min(i, 6) * 0.08, ease: EASE });
      }, { margin: '0px 0px -60px 0px' });
    });
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- 6. Motion extras: progress, parallax, tilt, magnetic, icons ---------- */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    if (canMotion && M.scroll) {
      M.scroll(M.animate(progress, { scaleX: [0, 1] }, { ease: 'linear' }));
    } else {
      const upd = () => { const h = document.documentElement.scrollHeight - innerHeight; progress.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; };
      addEventListener('scroll', upd, { passive: true }); upd();
    }
  }
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canMotion) {
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-bg-img');
    if (hero && heroImg && M.scroll) {
      heroImg.style.animation = 'none';
      M.scroll(M.animate(heroImg, { y: [0, 160], scale: [1.08, 1.18] }, { ease: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      const heroInner = document.querySelector('.hero-inner');
      if (heroInner) M.scroll(M.animate(heroInner, { opacity: [1, 0.15], y: [0, -60] }, { ease: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
    }
    const card = $('heroCard');
    if (card && finePointer) {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        M.animate(card, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 900 }, { type: 'spring', stiffness: 200, damping: 20 });
      });
      card.addEventListener('pointerleave', () => M.animate(card, { rotateY: 0, rotateX: 0 }, { type: 'spring', stiffness: 160, damping: 18 }));
    }
    if (finePointer) {
      document.querySelectorAll('.hero-actions .btn, .cta-actions .btn, .nav-call').forEach(btn => {
        btn.classList.add('magnetic');
        btn.addEventListener('pointermove', e => {
          const r = btn.getBoundingClientRect();
          M.animate(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35 }, { type: 'spring', stiffness: 260, damping: 18 });
        });
        btn.addEventListener('pointerleave', () => M.animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 220, damping: 16 }));
      });
    }
    document.querySelectorAll('.svc-icon, .lg-icon, .why-icon').forEach(ic => {
      M.inView(ic, () => { M.animate(ic, { scale: [0.6, 1], rotate: [-12, 0] }, { type: 'spring', stiffness: 260, damping: 14, delay: 0.2 }); });
    });
    const steps = document.querySelector('.steps');
    if (steps) M.inView(steps, () => {
      M.animate(steps.querySelectorAll('.step-no'), { scale: [0, 1] }, { type: 'spring', stiffness: 240, damping: 15, delay: M.stagger(0.18) });
    });
    const cta = document.querySelector('.cta-bg');
    if (cta && M.scroll) M.scroll(M.animate(cta, { scale: [1.15, 1] }, { ease: 'linear' }), { target: document.querySelector('.cta'), offset: ['start end', 'end start'] });
  }

  /* ---------- 7. Count-up ---------- */
  const counters = document.querySelectorAll('.count-up');
  function runCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const set = v => { counter.textContent = Math.round(v).toLocaleString('en-US'); };
      if (reduceMotion) { set(target); return; }
      if (canMotion) { M.animate(0, target, { duration: 2, ease: EASE, onUpdate: set }); return; }
      const steps = 60; let step = 0;
      const timer = setInterval(() => {
        step++;
        set((1 - Math.pow(1 - step / steps, 3)) * target);
        if (step >= steps) clearInterval(timer);
      }, 1800 / steps);
    });
  }
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { runCounters(); so.disconnect(); }
    }, { threshold: 0.4 });
    so.observe(statsEl);
  }

  /* ---------- 8. FAQ: one open at a time + smooth open ---------- */
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('details.qa');
    items.forEach(d => {
      d.querySelector('summary').addEventListener('click', e => {
        if (!canMotion) return;
        e.preventDefault();
        const body = d.querySelector('p');
        if (d.open) {
          M.animate(body, { height: [body.offsetHeight + 'px', '0px'], opacity: [1, 0] }, { duration: 0.3, ease: EASE }).then(() => { d.open = false; body.style.height = ''; body.style.opacity = ''; });
        } else {
          items.forEach(o => { if (o !== d && o.open) o.open = false; });
          d.open = true;
          const h = body.offsetHeight;
          M.animate(body, { height: ['0px', h + 'px'], opacity: [0, 1] }, { duration: 0.4, ease: EASE }).then(() => { body.style.height = ''; });
        }
      });
    });
  });

  /* ---------- 9. Map office tabs ---------- */
  const mapFrame = $('mapFrame');
  const mapOpen = $('mapOpen');
  document.querySelectorAll('.map-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.map-tab').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      const q = encodeURIComponent(tab.dataset.q);
      if (mapFrame) mapFrame.src = 'https://maps.google.com/maps?q=' + q + '&z=16&output=embed';
      if (mapOpen) mapOpen.href = 'https://www.google.com/maps/search/?api=1&query=' + q;
    });
  });

  /* ---------- 10. Contact form → WhatsApp ---------- */
  const form = $('contactForm');
  const formError = $('formError');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fields = ['name', 'phone', 'message'].map(id => $(id));
      let ok = true;
      fields.forEach(f => {
        const empty = !f.value.trim();
        f.classList.toggle('invalid', empty);
        f.setAttribute('aria-invalid', String(empty));
        if (empty) ok = false;
      });
      formError.hidden = ok;
      if (!ok) {
        if (canMotion) M.animate(form, { x: [0, -10, 10, -6, 6, 0] }, { duration: 0.45 });
        return;
      }
      const [name, phone, message] = fields.map(f => f.value.trim());
      const service = select && select.value ? select.value : '—';
      const text = 'Enquiry from www.msalamgir.com\n\nName: ' + name + '\nPhone: ' + phone + '\nService: ' + service + '\n\n' + message;
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
    form.querySelectorAll('input, textarea').forEach(f => {
      f.addEventListener('input', () => {
        if (f.value.trim()) { f.classList.remove('invalid'); f.removeAttribute('aria-invalid'); }
      });
    });
  }

  /* ---------- 11. Year ---------- */
  const year = $('year');
  if (year) year.textContent = new Date().getFullYear();
});
