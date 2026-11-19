const AISEC_CONFIG={
  eventDate:'2027-05-04T09:00:00+01:00',   // countdown target
  startDate:'2027-05-04T00:00:00+01:00'    // when the countdown disappears and "Day 01" starts
};
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar?.classList.toggle('scrolled',window.scrollY>40),{passive:true});
document.querySelectorAll('img:not([fetchpriority="high"]):not([loading])').forEach(img=>{img.loading='lazy'});
function toggleMenu(){const menu=document.getElementById('mobileMenu');const button=document.getElementById('hamburger');const open=menu?.classList.toggle('open');button?.setAttribute('aria-expanded',String(Boolean(open)))}
function closeMenu(){document.getElementById('mobileMenu')?.classList.remove('open');document.getElementById('hamburger')?.setAttribute('aria-expanded','false')}

// Lowest common ancestor of the four countdown elements
function getCountdownBox(){
  const els=['days','hours','mins','secs'].map(id=>document.getElementById(id)).filter(Boolean);
  if(!els.length)return null;
  let node=els[0].parentElement;
  while(node&&!els.every(el=>node.contains(el)))node=node.parentElement;
  return node;
}

const countdownBox=getCountdownBox();
let statusEl=null;

function showStatus(text){
  if(!countdownBox)return;
  countdownBox.style.display='none';
  if(!statusEl){
    statusEl=document.createElement('div');
    statusEl.className='event-status';
    statusEl.setAttribute('aria-live','polite');
    countdownBox.insertAdjacentElement('afterend',statusEl);
  }
  if(statusEl.textContent!==text)statusEl.textContent=text;
}

let timer=null;
function tick(){
  const now=Date.now();
  const start=new Date(AISEC_CONFIG.startDate).getTime();

  // Before May 4, 2027: normal countdown
  if(now<start){
    const remaining=new Date(AISEC_CONFIG.eventDate).getTime()-now;
    const values={
      days:Math.floor(remaining/86400000),
      hours:Math.floor(remaining%86400000/3600000),
      mins:Math.floor(remaining%3600000/60000),
      secs:Math.floor(remaining%60000/1000)
    };
    Object.entries(values).forEach(([id,value])=>{
      const el=document.getElementById(id);
      if(el)el.textContent=String(value).padStart(2,'0');
    });
    return;
  }

  // From May 4, 2027: countdown hidden, day labels
  const dayIndex=Math.floor((now-start)/86400000); // 0 = May 4, 1 = May 5, 2 = May 6
  if(dayIndex<=2){
    showStatus('Day '+String(dayIndex+1).padStart(2,'0'));
  }else{
    showStatus('7th edition is done');
    clearInterval(timer); // nothing left to update
  }
}

tick();
timer=setInterval(tick,1000);

function switchTab(btn,id){document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});document.querySelectorAll('.program-content').forEach(c=>c.classList.remove('active'));btn.classList.add('active');btn.setAttribute('aria-selected','true');document.getElementById(id).classList.add('active')}
let cur=0;
const track=document.getElementById('editionsTrack');
const slides=track.querySelectorAll('.edition-slide');
const dotsEl=document.getElementById('sliderDots');
function pv(){return window.innerWidth<600?1:window.innerWidth<900?2:3}
function buildDots(){dotsEl.innerHTML='';const tot=Math.ceil(slides.length/pv());for(let i=0;i<tot;i++){const d=document.createElement('div');d.className='slider-dot'+(i===cur?' active':'');d.onclick=()=>goTo(i);dotsEl.appendChild(d)}}
function goTo(idx){cur=Math.max(0,Math.min(idx,Math.ceil(slides.length/pv())-1));track.style.transform=`translateX(-${cur*(slides[0].offsetWidth+24)*pv()}px)`;buildDots()}
function slideEditions(d){goTo(cur+d)}
buildDots();
window.addEventListener('resize',()=>{buildDots();goTo(0)});
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));

const statObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const value=entry.target;
    const target=Number(value.dataset.target||0);
    const suffix=value.dataset.suffix||'';
    const start=performance.now();
    const duration=900;
    function render(now){
      const progress=Math.min(1,(now-start)/duration);
      const eased=1-Math.pow(1-progress,3);
      const current=Math.round(target*eased);
      value.textContent=`${target<10?String(current).padStart(2,'0'):current}${suffix}`;
      if(progress<1)requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    statObserver.unobserve(value);
  });
},{threshold:.5});
document.querySelectorAll('.stat-value').forEach(el=>statObserver.observe(el));

document.querySelector('[role="tablist"]')?.addEventListener('keydown',event=>{
  const tabs=[...event.currentTarget.querySelectorAll('[role="tab"]')];
  const index=tabs.indexOf(document.activeElement);
  if(index<0||!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
  event.preventDefault();
  const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  tabs[next].focus();tabs[next].click();
});

(function(){
  const track   = document.getElementById('spTrack');
  const dotsEl  = document.getElementById('spDots');
  if(!track || !dotsEl) return;
  /* Phase 4 uses native scroll-snap; keep the legacy controller dormant. */
  if(track.closest('#team')) return;

  let spCur = 0;

  /* how many columns are visible at once */
  function visibleCols(){
    const vw = document.querySelector('.sp-viewport').offsetWidth;
    const cardW = parseInt(getComputedStyle(track).gridAutoColumns) || 220;
    const gap   = 20;
    return Math.max(1, Math.floor((vw + gap) / (cardW + gap)));
  }

  /* total columns in the grid  */
  function totalCols(){
    const cards  = track.querySelectorAll('.speaker-card');
    const rows   = window.innerWidth <= 600 ? 1 : 2;
    return Math.ceil(cards.length / rows);
  }

  function maxStep(){ return Math.max(0, totalCols() - visibleCols()); }

  function buildSpDots(){
    dotsEl.innerHTML='';
    const steps = maxStep() + 1;
    for(let i=0;i<steps;i++){
      const b=document.createElement('button');
      b.className='sp-dot'+(i===spCur?' active':'');
      b.onclick=()=>goSp(i);
      dotsEl.appendChild(b);
    }
  }

  function goSp(idx){
    spCur = Math.max(0, Math.min(idx, maxStep()));
    const cardW = parseInt(getComputedStyle(track).gridAutoColumns) || 220;
    const gap   = 20;
    track.style.transform = `translateX(-${spCur * (cardW + gap)}px)`;
    buildSpDots();
  }

  window.shiftSpeakers = function(dir){ goSp(spCur + dir); };

  /* auto-advance every 3 s */
  let autoTimer = setInterval(()=>{
    goSp(spCur >= maxStep() ? 0 : spCur + 1);
  }, 3000);

  /* pause on hover */
  const wrapper = document.querySelector('.speakers-slider-wrapper');
  if(wrapper){
    wrapper.addEventListener('mouseenter',()=>clearInterval(autoTimer));
    wrapper.addEventListener('mouseleave',()=>{
      autoTimer = setInterval(()=>{
        goSp(spCur >= maxStep() ? 0 : spCur + 1);
      }, 3000);
    });
  }

  /* touch/swipe */
  let touchX=0;
  track.addEventListener('touchstart',e=>{ touchX=e.touches[0].clientX; },{passive:true});
  track.addEventListener('touchend',e=>{
    const dx=touchX-e.changedTouches[0].clientX;
    if(Math.abs(dx)>40) goSp(spCur + (dx>0?1:-1));
  },{passive:true});

  buildSpDots();
  window.addEventListener('resize',()=>{ buildSpDots(); goSp(0); });
})();
