/* Hackathon · AISEC 2027 — Sahara : interactions & effets */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v)), root = document.documentElement;

  /* lettres du titre */
  $$('[data-split]').forEach(el => {
    const base = parseFloat(el.dataset.delay || 0), txt = el.textContent; el.textContent = ''; el.setAttribute('aria-label', txt);
    [...txt].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden', 'true'); s.style.animationDelay = (base + i * .06) + 's'; s.textContent = c === ' ' ? ' ' : c; el.appendChild(s); });
  });

  /* préloader */
  const pre = $('#preloader'), ready = () => { document.body.classList.remove('loading'); document.body.classList.add('ready'); };
  let seen = false; try { seen = sessionStorage.getItem('sh-boot') === '1'; } catch (e) {}
  if (reduce || seen) { pre.remove(); ready(); }
  else {
    const fill = $('#pl-fill'), pct = $('#pl-pct'), D = 2600, t0 = performance.now();
    (function p(t) { const k = clamp((t - t0) / D, 0, 1); fill.style.width = k * 100 + '%'; pct.textContent = Math.round(k * 100) + '%'; if (k < 1) requestAnimationFrame(p); })(t0);
    setTimeout(() => { pre.classList.add('done'); ready(); try { sessionStorage.setItem('sh-boot', '1'); } catch (e) {} setTimeout(() => pre.remove(), 800); }, D + 300);
  }

  /* étoiles + sable + réseau */
  const cvs = $('#fx'), ctx = cvs.getContext('2d'); let W, H, stars = [], sand = [], boost = 0, lastY = scrollY;
  const size = () => {
    W = cvs.width = innerWidth; H = cvs.height = innerHeight;
    stars = Array.from({ length: clamp(Math.round(W / 9), 60, 170) }, () => ({ x: Math.random() * W, y: Math.random() * H * .62, r: Math.random() * 1.3 + .3, p: Math.random() * 6.28, s: Math.random() * .03 + .008, c: Math.random() > .7 ? '#28E0D0' : '#ffffff' }));
    sand = Array.from({ length: clamp(Math.round(W / 24), 25, 70) }, () => ({ x: Math.random() * W, y: H * (.5 + Math.random() * .5), r: Math.random() * 1.8 + .5, vx: Math.random() * 1.1 + .3, a: Math.random() * .5 + .2, w: Math.random() * 6.28 }));
  };
  size(); addEventListener('resize', size);
  (function loop() {
    ctx.clearRect(0, 0, W, H); boost *= .94;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]; s.p += s.s; ctx.globalAlpha = .25 + .65 * Math.abs(Math.sin(s.p)); ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < stars.length; j++) { const t = stars[j], dx = s.x - t.x, dy = s.y - t.y, d = dx * dx + dy * dy; if (d < 9000) { ctx.globalAlpha = .08 * (1 - d / 9000); ctx.strokeStyle = '#28E0D0'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(t.x, t.y); ctx.stroke(); } }
    }
    for (const p of sand) { p.w += .02; p.x += p.vx + boost * .6; p.y += Math.sin(p.w) * .3; if (p.x > W + 5) { p.x = -5; p.y = H * (.5 + Math.random() * .5); } ctx.globalAlpha = p.a; ctx.fillStyle = '#D6B47A'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
    ctx.globalAlpha = 1; if (!reduce) requestAnimationFrame(loop);
  })();

  /* parallaxe souris + lueur */
  if (fine && !reduce) {
    addEventListener('mousemove', e => { root.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3)); root.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3)); }, { passive: true });
    const g = $('.glow'); let gx = 0, gy = 0, tx = 0, ty = 0;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; g.classList.add('on'); }, { passive: true });
    (function f() { gx += (tx - gx) * .12; gy += (ty - gy) * .12; g.style.transform = `translate(${gx}px,${gy}px)`; requestAnimationFrame(f); })();
  }

  /* scroll */
  const nav = $('#navbar'), btt = $('#btt'), prog = $('#progress'), hero = $('#hero');
  const onScroll = () => {
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`; nav.classList.toggle('scrolled', y > 40); btt.classList.toggle('on', y > 400);
    root.style.setProperty('--tint', clamp((y - vh * .1) / (vh * .7), 0, 1).toFixed(3)); root.style.setProperty('--sy', y);
    if (!reduce) { const k = clamp(y / vh, 0, 1), t = $('.hero-text'); t.style.transform = `translateY(${k * -40}px)`; t.style.opacity = 1 - k * 1.1; }
    boost = Math.min(10, boost + Math.abs(y - lastY) * .08); lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  btt.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  const ham = $('#ham'), mob = $('#mobnav');
  ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
  $$('a', mob).forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));
  const links = $$('.nav-links a[data-s]');
  const so = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(l => l.classList.toggle('active', l.dataset.s === e.target.id))), { rootMargin: '-45% 0px -50% 0px' });
  $$('main [id]').forEach(s => so.observe(s));

  /* reveal, décodage, compteurs */
  const CH = '01#$%&@?<>/{}[]ABCDEFGHJKLMNPQRSTUVWXYZ';
  const scramble = el => { const fin = el.dataset.final; let f = 0; const t = setInterval(() => { f++; let o = ''; for (let i = 0; i < fin.length; i++) o += (fin[i] === ' ' || i < f / 22 * fin.length) ? fin[i] : CH[Math.random() * CH.length | 0]; el.textContent = o; if (f >= 22) { clearInterval(t); el.textContent = fin; } }, 40); };
  const count = el => { const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(); (function s(t) { const k = clamp((t - t0) / 1400, 0, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(s); })(t0); };
  $$('.sc').forEach(e => e.dataset.final = e.textContent);
  const ro = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target; el.classList.add('in'); ro.unobserve(el);
    if (!reduce) { $$('.sc', el).forEach(scramble); if (el.matches('.sc')) scramble(el); }
  }), { threshold: .15 });
  $$('.rv, .rule, .h2').forEach(e => ro.observe(e));
  const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { if (!reduce) count(e.target); co.unobserve(e.target); } }), { threshold: .6 });
  $$('[data-count]').forEach(e => co.observe(e));

  /* tilt, boutons */
  if (fine && !reduce) $$('.card').forEach(c => {
    c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.setProperty('--gx', x * 100 + '%'); c.style.setProperty('--gy', y * 100 + '%'); c.style.transform = `perspective(900px) rotateX(${(.5 - y) * 6}deg) rotateY(${(x - .5) * 8}deg) translateY(-4px)`; });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
  $$('.btn').forEach(b => {
    if (fine && !reduce) { b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; }); b.addEventListener('mouseleave', () => b.style.transform = ''); }
    b.addEventListener('click', e => { const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span'); s.className = 'ripple'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`; b.appendChild(s); setTimeout(() => s.remove(), 750); });
  });
})();
