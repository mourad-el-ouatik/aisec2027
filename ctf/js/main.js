/* AISEC CTF 2027 — Dakhla · interactions & effets */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const root = document.documentElement;
  const inner = document.body.dataset.page === 'inner';

  /* ── Split text en lettres (animation d'entrée) ── */
  $$('[data-split]').forEach(el => {
    const base = parseFloat(el.dataset.delay || 0);
    const txt = el.textContent; el.textContent = ''; el.setAttribute('aria-label', txt);
    [...txt].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
      s.style.animationDelay = (base + i * 0.055) + 's';
      s.textContent = c === ' ' ? ' ' : c; el.appendChild(s);
    });
  });

  /* ── Preloader ── */
  const pre = $('#preloader');
  const start = () => { document.body.classList.remove('loading'); document.body.classList.add('ready'); };
  let seen = false; try { seen = sessionStorage.getItem('dk-boot') === '1'; } catch (e) {}
  if (!pre || reduce || seen) { if (pre) pre.remove(); start(); }
  else {
    document.body.classList.add('loading');
    const log = $('#bootlog'), bar = $('.pl-bar i');
    const L = [
      [0, 'Initialisation du noyau — AISEC-CTF-2027', 'ok'],
      [320, 'Chargement des modules cryptographiques', 'ok'],
      [640, 'Tempête de sable détectée — pare-feu activé', 'warn'],
      [960, 'Liaison satellite · Dakhla 23.68°N 15.96°W', 'ok'],
      [1280, 'Moteur de challenges : PRÊT', 'ok'],
      [1600, '> SECURE THE DUNE — que le jeu commence.', 'go'],
    ];
    requestAnimationFrame(() => bar.style.width = '100%');
    L.forEach(([ms, t, c]) => setTimeout(() => { const d = document.createElement('div'); d.className = c; d.textContent = t; log.appendChild(d); }, ms));
    setTimeout(() => { pre.classList.add('done'); start(); try { sessionStorage.setItem('dk-boot', '1'); } catch (e) {} setTimeout(() => pre.remove(), 800); }, 2500);
  }

  /* ── Sable en suspension (canvas) ── */
  const cvs = $('#sand');
  if (cvs && !reduce) {
    const ctx = cvs.getContext('2d'); let W, H, P = [];
    const mk = (init) => ({ x: Math.random() * W, y: init ? Math.random() * H : Math.random() * H, r: Math.random() * 1.8 + .4,
      vx: Math.random() * 1.1 + .35, vy: (Math.random() - .5) * .25, a: Math.random() * .55 + .15, w: Math.random() * 6.28 });
    const size = () => { W = cvs.width = innerWidth; H = cvs.height = innerHeight; P = Array.from({ length: clamp(Math.round(W / 11), 50, 160) }, () => mk(true)); };
    size(); addEventListener('resize', size);
    let boost = 0, lastY = scrollY;
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      boost *= .94;
      for (const p of P) {
        p.w += .02; p.x += p.vx + boost * .6; p.y += p.vy + Math.sin(p.w) * .25;
        if (p.x > W + 5) { p.x = -5; p.y = Math.random() * H; } if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5;
        ctx.globalAlpha = p.a; ctx.fillStyle = p.r > 1.5 ? '#fff0c8' : '#f4c97a';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(loop);
    })();
    addEventListener('scroll', () => { boost = Math.min(10, boost + Math.abs(scrollY - lastY) * .08); lastY = scrollY; }, { passive: true });
  }

  /* ── Parallax souris sur le fond fixe ── */
  if (fine && !reduce) addEventListener('mousemove', e => {
    root.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3));
    root.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3));
  }, { passive: true });

  /* ── Lueur curseur ── */
  const glow = $('.cursor-glow');
  if (glow && fine && !reduce) {
    let gx = 0, gy = 0, tx = 0, ty = 0;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; glow.classList.add('on'); }, { passive: true });
    document.addEventListener('mouseleave', () => glow.classList.remove('on'));
    (function f() { gx += (tx - gx) * .12; gy += (ty - gy) * .12; glow.style.transform = `translate(${gx}px,${gy}px)`; requestAnimationFrame(f); })();
  }

  /* ── Scroll : progression, couche de couleur, navbar, back-to-top ── */
  const nav = $('#navbar'), btt = $('#btt'), prog = $('#progress'), hero = $('#hero');
  const onScroll = () => {
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('scrolled', y > 40);
    btt.classList.toggle('on', y > 400);
    if (!inner) root.style.setProperty('--tint', clamp((y - vh * .12) / (vh * .75), 0, 1).toFixed(3));
    if (hero && !reduce) { const k = clamp(y / vh, 0, 1); hero.querySelector('.hero-text').style.transform = `translateY(${k * -40}px)`; hero.querySelector('.hero-text').style.opacity = 1 - k * 1.1; }
  };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
  btt.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* ── Menu mobile ── */
  const ham = $('#ham'), mob = $('#mobnav');
  ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
  $$('a', mob).forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));

  /* ── Lien actif selon la section visible ── */
  const secs = $$('main section[id], #hero').filter(s => s.id);
  if (secs.length) {
    const links = $$('.nav-links a[data-s]');
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.dataset.s === e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => so.observe(s));
  }

  /* ── Reveal au scroll + décodage des titres + compteurs ── */
  const CH = '01#$%&@?<>/\\{}[]ABCDEFGHJKLMNPQRSTUVWXYZ';
  const scramble = el => {
    const final = el.dataset.final; let f = 0; const total = 22;
    const t = setInterval(() => {
      f++; let out = '';
      for (let i = 0; i < final.length; i++) out += (final[i] === ' ' || i < (f / total) * final.length) ? final[i] : CH[Math.random() * CH.length | 0];
      el.textContent = out; if (f >= total) { clearInterval(t); el.textContent = final; }
    }, 40);
  };
  const count = el => {
    const to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', pre = el.dataset.prefix || '', t0 = performance.now(), dur = 1500;
    (function s(t) { const k = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(s); })(t0);
  };
  $$('.sc').forEach(el => { el.dataset.final = el.textContent; });
  const ro = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target; el.classList.add('in'); ro.unobserve(el);
    $$('.sc', el).forEach(s => !reduce && scramble(s)); $$('[data-count]', el).forEach(c => !reduce && count(c));
    if (el.matches('.sc')) !reduce && scramble(el);
  }), { threshold: .18 });
  $$('.rv, .sec-head, .rule').forEach(el => ro.observe(el));

  /* ── Tilt 3D + halo sur les cartes ── */
  if (fine && !reduce) $$('.card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--gx', x * 100 + '%'); c.style.setProperty('--gy', y * 100 + '%');
      c.style.transform = `perspective(900px) rotateX(${(.5 - y) * 6}deg) rotateY(${(x - .5) * 8}deg) translateY(-4px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });

  /* ── Boutons : magnétique + ripple ── */
  $$('.btn').forEach(b => {
    if (fine && !reduce) {
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      b.addEventListener('mouseleave', () => b.style.transform = '');
    }
    b.addEventListener('click', e => {
      const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span');
      s.className = 'ripple'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      b.appendChild(s); setTimeout(() => s.remove(), 750);
    });
  });

  /* ── Compte à rebours : 8 mai 2027 à 21h00 ── */
  const ids = ['d', 'h', 'm', 's'].map(k => $('#cd-' + k));
  if (ids[0]) {
    const target = new Date('2027-05-08T21:00:00+01:00').getTime(); const prev = [];
    const upd = () => {
      let diff = Math.max(0, target - Date.now());
      const v = [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60].map(n => String(n).padStart(2, '0'));
      v.forEach((t, i) => { if (prev[i] !== t) { ids[i].textContent = t; if (prev[i] !== undefined && !reduce) { ids[i].classList.remove('tick'); void ids[i].offsetWidth; ids[i].classList.add('tick'); } prev[i] = t; } });
    };
    upd(); setInterval(upd, 1000);
  }

  /* ── Galerie + lightbox ── */
  const items = $$('.g-item img');
  if (items.length) {
    const lb = $('#lb'), img = $('img', lb), cnt = $('.count', lb); let i = 0;
    const show = n => { i = (n + items.length) % items.length; img.src = items[i].currentSrc || items[i].src; cnt.textContent = `${i + 1} / ${items.length}`; };
    const open = n => { show(n); lb.classList.add('open'); }; const close = () => lb.classList.remove('open');
    items.forEach((im, n) => im.parentElement.addEventListener('click', () => open(n)));
    $('.x', lb).onclick = close; $('.p', lb).onclick = () => show(i - 1); $('.n', lb).onclick = () => show(i + 1);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
    let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); });
  }
})();
