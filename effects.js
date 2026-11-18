/* AISEC 2027 — Effects layer (vanilla JS, no dependency) */
(function(){
'use strict';
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

/* ---------- 1. ENTRANCE PAGE ---------- */
let introDone=false;
function finishIntro(){
  if(introDone)return;introDone=true;
  root.classList.remove('has-intro');root.classList.add('intro-done');
  try{sessionStorage.setItem('aisec2027-intro-seen','1')}catch(e){}
  $$('.hero-left.fx-stagger').forEach(el=>el.classList.add('is-in'));
  window.scrollTo(0,0);
  document.dispatchEvent(new Event('intro:done'));
}
function initIntro(){
  const intro=$('#mapIntro');
  if(!intro||!root.classList.contains('has-intro')||reduce){
    intro&&intro.remove();root.classList.remove('has-intro');root.classList.add('intro-done');return;
  }
  window.__introStarted=true;
  const shape=$('#miShape'),outline=$('#miOutline'),pen=$('#miPen');
  const bar=$('#miBar'),pct=$('#miPct'),msg=$('#miMsg'),enter=$('#miEnter'),skip=$('#miSkip');
  const len=shape.getTotalLength();
  outline.style.setProperty('--len',len);
  const mobile=innerWidth<820,DUR=mobile?3000:3800;
  const msgs=[[0,'TRACING THE KINGDOM...'],[34,'MAPPING THE SAHARA...'],[66,'LOCATING DAKHLA...'],[92,'ATLANTIC NODE: ONLINE'],[100,'SIGNAL RECEIVED']];
  let raf,ready=false,leaving=false,t0=null;
  const ease=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;

  function frame(now){
    if(t0===null)t0=now;
    const p=clamp((now-t0-350)/DUR,0,1),e=ease(p);
    outline.style.strokeDashoffset=len*(1-e);
    const pt=shape.getPointAtLength(len*e);
    pen.setAttribute('cx',pt.x);pen.setAttribute('cy',pt.y);pen.style.opacity=p>0&&p<1?1:0;
    const n=Math.round(e*100);
    pct.textContent=String(n).padStart(3,'0')+'%';
    bar.style.transform=`scaleX(${e})`;
    for(const [th,txt] of msgs)if(n>=th)msg.textContent=txt;
    if(p<1)raf=requestAnimationFrame(frame);else traced();
  }
  function traced(){
    outline.style.strokeDashoffset=0;
    intro.classList.add('is-traced');
    setTimeout(()=>{if(leaving)return;ready=true;intro.classList.add('is-ready');enter.tabIndex=0;enter.focus({preventScroll:true})},mobile?1700:2600);
  }
  function leave(fast){
    if(leaving)return;leaving=true;cancelAnimationFrame(raf);
    const dot=$('.mi-dot',intro),map=$('.mi-map',intro);
    if(dot&&map){const a=dot.getBoundingClientRect(),b=map.getBoundingClientRect();
      map.style.setProperty('--zoom-x',(a.left+a.width/2-b.left)+'px');map.style.setProperty('--zoom-y',(a.top+a.height/2-b.top)+'px')}
    if(fast)intro.style.transitionDuration='.45s';
    intro.classList.add('is-leaving');
    setTimeout(finishIntro,fast?250:700);
    setTimeout(()=>intro.remove(),fast?900:1500);
  }
  enter.addEventListener('click',()=>leave(false));
  skip.addEventListener('click',()=>leave(true));
  addEventListener('keydown',e=>{
    if(!root.classList.contains('has-intro'))return;
    if(e.key==='Escape')leave(true);
    else if(ready&&['Enter',' ','ArrowDown'].includes(e.key)){e.preventDefault();leave(false)}
  });
  addEventListener('wheel',e=>{if(ready&&e.deltaY>25)leave(false)},{passive:true});
  let ty=0;
  addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
  addEventListener('touchend',e=>{if(ready&&ty-e.changedTouches[0].clientY>50)leave(false)},{passive:true});

  /* drifting gold dust behind the map */
  const cv=$('#miStars'),cx=cv.getContext('2d');let W,H,parts=[];
  function size(){const d=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*d;H=cv.height=innerHeight*d;parts=Array.from({length:mobile?40:80},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.4+.4)*d,v:(Math.random()*.25+.05)*d,a:Math.random()*.5+.15,p:Math.random()*6}))}
  size();addEventListener('resize',size);
  (function dust(t){
    if(!intro.isConnected)return;
    cx.clearRect(0,0,W,H);
    for(const q of parts){q.y-=q.v;q.x+=Math.sin(t/1800+q.p)*.15;if(q.y<-5){q.y=H+5;q.x=Math.random()*W}
      cx.beginPath();cx.fillStyle=`rgba(214,180,122,${q.a*(.6+.4*Math.sin(t/700+q.p))})`;cx.arc(q.x,q.y,q.r,0,6.283);cx.fill()}
    requestAnimationFrame(dust);
  })(0);
  raf=requestAnimationFrame(frame);
}

/* ---------- 2. GLOBAL UX ---------- */
function initProgress(){
  const bar=document.createElement('div');bar.className='fx-progress';document.body.appendChild(bar);
  const top=document.createElement('button');top.className='fx-top';top.type='button';top.setAttribute('aria-label','Back to top');
  top.innerHTML='<svg viewBox="0 0 46 46" aria-hidden="true"><circle class="trk" cx="23" cy="23" r="21"/><circle class="bar" cx="23" cy="23" r="21"/></svg><span aria-hidden="true">↑</span>';
  document.body.appendChild(top);
  const ring=$('.bar',top);
  top.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
  return p=>{bar.style.transform=`scaleX(${p})`;ring.style.strokeDashoffset=132*(1-p);top.classList.toggle('is-visible',scrollY>innerHeight*.8)};
}
function initCursor(){
  if(!finePointer||reduce)return;
  const ring=document.createElement('div'),dot=document.createElement('div');
  ring.className='fx-cursor';dot.className='fx-cursor-dot';document.body.append(ring,dot);
  let x=-100,y=-100,rx=-100,ry=-100;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;ring.classList.add('is-on');dot.classList.add('is-on')},{passive:true});
  document.addEventListener('mouseleave',()=>{ring.classList.remove('is-on');dot.classList.remove('is-on')});
  document.addEventListener('mouseover',e=>ring.classList.toggle('is-hover',!!e.target.closest('a,button,.speaker-card,.edition-slide,.tab-btn,.sp-arrow')));
  (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;
    ring.style.transform=`translate(${rx}px,${ry}px)`;dot.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(loop)})();
}
function initNavSpy(){
  const links=$$('.nav-links a[href^="#"]');
  const map=links.map(a=>({a,s:$(a.getAttribute('href'))})).filter(o=>o.s);
  return()=>{let cur=map[0];const line=innerHeight*.38;
    for(const o of map)if(o.s.getBoundingClientRect().top<=line)cur=o;
    links.forEach(a=>a.classList.toggle('active',cur&&a===cur.a))};
}

/* ---------- 3. HERO ---------- */
function splitTitle(){
  const span=$('.hero-title span');if(!span)return;
  const text=span.textContent;span.setAttribute('aria-label',text);
  span.textContent='';let i=0;
  text.split(' ').forEach((w,wi,arr)=>{
    const word=document.createElement('span');word.className='fx-word';word.setAttribute('aria-hidden','true');
    [...w].forEach(ch=>{const c=document.createElement('span');c.className='fx-char';c.style.setProperty('--c',i++);c.textContent=ch;word.appendChild(c)});
    span.appendChild(word);if(wi<arr.length-1){span.appendChild(document.createTextNode(' '));i++}
  });
}
function initSand(){
  const hero=$('#home');if(!hero||reduce)return;
  const cv=document.createElement('canvas');cv.className='fx-sand';cv.setAttribute('aria-hidden','true');
  const glow=document.createElement('div');glow.className='hero-glow';glow.setAttribute('aria-hidden','true');
  hero.prepend(cv);hero.prepend(glow);
  const cx=cv.getContext('2d');let W,H,d,ps=[],on=true;
  const mk=(init)=>({x:init?Math.random()*W:-10,y:Math.random()*H,r:(Math.random()*1.6+.4)*d,vx:(Math.random()*1.1+.35)*d,vy:(Math.random()-.4)*.25*d,a:Math.random()*.5+.15,p:Math.random()*6,s:Math.random()<.08});
  function size(){d=Math.min(devicePixelRatio||1,2);W=cv.width=hero.clientWidth*d;H=cv.height=hero.clientHeight*d;ps=Array.from({length:Math.round(clamp(hero.clientWidth/14,30,120))},()=>mk(true))}
  size();addEventListener('resize',size);
  new IntersectionObserver(e=>{on=e[0].isIntersecting}).observe(hero);
  (function loop(t){
    if(on){cx.clearRect(0,0,W,H);
      for(const q of ps){q.x+=q.vx+Math.sin(t/900+q.p)*.3;q.y+=q.vy+Math.cos(t/1300+q.p)*.2;
        if(q.x>W+10||q.y<-10||q.y>H+10)Object.assign(q,mk(false));
        cx.beginPath();cx.fillStyle=q.s?`rgba(40,224,208,${q.a*.7})`:`rgba(214,180,122,${q.a})`;cx.arc(q.x,q.y,q.r,0,6.283);cx.fill()}}
    requestAnimationFrame(loop);
  })(0);
  if(finePointer)hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();glow.style.setProperty('--mx',(e.clientX-r.left)+'px');glow.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
}
function initDunes(){
  const hero=$('#home');if(!hero)return;
  const wave=(w,amp,base,seg)=>{let p=`M0,${base} Q${seg/2},${base-amp} ${seg},${base}`;for(let x=seg*2;x<=2400;x+=seg)p+=` T${x},${base}`;return p};
  const wrap=document.createElement('div');wrap.className='fx-dunes';wrap.setAttribute('aria-hidden','true');
  const a=wave(0,70,120,600),b=wave(0,45,140,300);
  wrap.innerHTML=`<svg class="d2" viewBox="0 0 2400 200" preserveAspectRatio="none"><path d="${b} L2400,200 L0,200 Z"/></svg><svg class="d1" viewBox="0 0 2400 200" preserveAspectRatio="none"><path d="${a} L2400,200 L0,200 Z"/><path d="${a}"/></svg>`;
  hero.appendChild(wrap);
  const cue=document.createElement('a');cue.className='fx-scroll';cue.href='#about';cue.setAttribute('aria-label','Scroll to content');cue.innerHTML='Scroll<i></i>';hero.appendChild(cue);
}
function initCountdown(){
  const last={};
  const mo=new MutationObserver(ms=>ms.forEach(m=>{const el=m.target.parentElement;if(!el||last[el.id]===el.textContent)return;last[el.id]=el.textContent;el.classList.remove('is-tick');void el.offsetWidth;el.classList.add('is-tick')}));
  ['days','hours','mins','secs'].forEach(id=>{const el=document.getElementById(id);if(el)mo.observe(el,{childList:true})});
}

/* ---------- 4. REVEALS ---------- */
function initReveals(){
  $$('.fade-in').forEach(el=>{const sibs=[...el.parentElement.children].filter(c=>c.classList.contains('fade-in'));el.style.setProperty('--d',Math.min(sibs.indexOf(el),8))});
  const targets=['.hero-left','.sponsors-row','.manifesto-columns','.timeline','.venue-pillars'];
  const stag=$$(targets.join(','));
  stag.forEach(c=>{c.classList.add('fx-stagger');[...c.children].forEach((k,i)=>k.style.setProperty('--i',Math.min(i,10)))});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.12});
  stag.forEach(c=>{if(c.classList.contains('hero-left')){if(!root.classList.contains('has-intro')||reduce)setTimeout(()=>c.classList.add('is-in'),120)}else io.observe(c)});
  /* section heads: the existing observer adds .visible to .fade-in; heads are .fade-in already */
}

/* ---------- 5. INTERACTIONS ---------- */
function initTilt(){
  if(!finePointer||reduce)return;
  const bind=el=>{
    el.classList.add('fx-tilt');
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
      el.classList.add('is-tilting');
      el.style.transform=`perspective(800px) rotateY(${(px-.5)*10}deg) rotateX(${(.5-py)*10}deg) translateY(-4px)`;
      el.style.setProperty('--gx',px*100+'%');el.style.setProperty('--gy',py*100+'%')});
    el.addEventListener('mouseleave',()=>{el.classList.remove('is-tilting');el.style.transform=''});
  };
  $$('.speaker-card,.edition-slide').forEach(bind);
}
function initMagnet(){
  if(!finePointer||reduce)return;
  $$('.btn-primary,.nav-cta').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});
    b.addEventListener('mouseleave',()=>{b.style.transform=''});
  });
}

/* ---------- 6. SCROLL LOOP ---------- */
function initScroll(){
  const progress=initProgress(),spy=initNavSpy();
  const hero=$('#home'),media=$('.hero-media'),content=$('#home .hero-content'),cta=$('.registration-cta>img'),ctaSec=$('.registration-cta');
  let ticking=false;
  function update(){
    ticking=false;
    const y=scrollY,h=innerHeight,max=document.documentElement.scrollHeight-h;
    progress(max>0?y/max:0);spy();
    if(!reduce){
      if(hero&&y<h*1.3){const t=clamp(y/h,0,1.3);
        if(media)media.style.transform=`translate3d(0,${y*.22}px,0)`;
        if(content){content.style.transform=`translate3d(0,${y*-.1}px,0)`;content.style.opacity=clamp(1-t*1.25,0,1)}}
      if(cta&&ctaSec){const r=ctaSec.getBoundingClientRect();if(r.top<h&&r.bottom>0)cta.style.transform=`translate3d(0,${(r.top-h/2)*-.08}px,0) scale(1.12)`}
    }
  }
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  addEventListener('resize',update);update();
}

function boot(){
  splitTitle();
  const hl=$('#home .hero-left');if(hl)hl.classList.add('fx-stagger');
  initReveals();initIntro();
  if(!root.classList.contains('has-intro'))$$('.hero-left.fx-stagger').forEach(el=>setTimeout(()=>el.classList.add('is-in'),120));
  initSand();initDunes();initCountdown();initTilt();initMagnet();initCursor();initScroll();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
