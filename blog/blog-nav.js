/* ── ProcessBI blog-nav.js — navigation for blog subdirectory ── */
(function(){
'use strict';

/* ───────────────────────────────────────────────
   1. Inject Three.js canvas (fixed background)
─────────────────────────────────────────────── */
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.insertBefore(canvas, document.body.firstChild);

/* ───────────────────────────────────────────────
   2. Logo SVG
─────────────────────────────────────────────── */
const LOGO_SVG = `<svg viewBox="0 0 132 120" xmlns="http://www.w3.org/2000/svg" width="42" height="38" aria-hidden="true" style="flex:none">
<defs>
  <linearGradient id="nl1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1A4AC2"/><stop offset="1" stop-color="#2E6BF6"/></linearGradient>
  <linearGradient id="nlt" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2E6BF6"/><stop offset="1" stop-color="#46D5FF"/></linearGradient>
  <linearGradient id="nln" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2E6BF6"/><stop offset="1" stop-color="#46D5FF"/></linearGradient>
  <filter id="ngl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <style>.nline{stroke-dasharray:none}.nhalo{transform-box:fill-box;transform-origin:center;animation:npulse 4.4s ease-in-out infinite}@keyframes npulse{0%,100%{opacity:.18}50%{opacity:.42}}</style>
</defs>
<rect x="12" y="78" width="17" height="26" rx="6" fill="url(#nl1)"/>
<rect x="37" y="60" width="17" height="44" rx="6" fill="url(#nl1)"/>
<rect x="62" y="38" width="17" height="66" rx="6" fill="url(#nl1)"/>
<rect x="87" y="16" width="17" height="88" rx="6" fill="url(#nlt)"/>
<path class="nline" d="M20.5 78 L45.5 60 L70.5 38 L95.5 16 L122 5" fill="none" stroke="url(#nln)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#ngl)"/>
<path d="M122 5 L109 6.5 M122 5 L120.5 18" fill="none" stroke="#46D5FF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#ngl)"/>
<g><circle class="nhalo" cx="20.5" cy="78" r="11" fill="#46D5FF"/><circle cx="20.5" cy="78" r="6.2" fill="#0B1A2E" stroke="#46D5FF" stroke-width="3"/><circle cx="20.5" cy="78" r="2.6" fill="#86E6FF"/></g>
<g><circle class="nhalo" cx="45.5" cy="60" r="11" fill="#46D5FF"/><circle cx="45.5" cy="60" r="6.2" fill="#0B1A2E" stroke="#46D5FF" stroke-width="3"/><circle cx="45.5" cy="60" r="2.6" fill="#86E6FF"/></g>
<g><circle class="nhalo" cx="70.5" cy="38" r="11" fill="#46D5FF"/><circle cx="70.5" cy="38" r="6.2" fill="#0B1A2E" stroke="#46D5FF" stroke-width="3"/><circle cx="70.5" cy="38" r="2.6" fill="#86E6FF"/></g>
<g><circle class="nhalo" cx="95.5" cy="16" r="11" fill="#46D5FF"/><circle cx="95.5" cy="16" r="6.2" fill="#0B1A2E" stroke="#46D5FF" stroke-width="3"/><circle cx="95.5" cy="16" r="2.6" fill="#86E6FF"/></g>
</svg>`;

/* ───────────────────────────────────────────────
   3. Nav links — paths relative to /blog/
─────────────────────────────────────────────── */
const NAV_LINKS = [
  {href:'../index.html',        label:'Home'},
  {href:'../services.html',     label:'Services'},
  {href:'../methodology.html',  label:'Methodology'},
  {href:'../case-studies.html', label:'Case Studies'},
  {href:'../technology.html',   label:'Technology'},
  {href:'../about.html',        label:'About'},
  {href:'index.html',           label:'Insights'},
  {href:'../contact.html',      label:'Contact'},
];

/* Insights is active on all blog pages */
const inBlog = location.pathname.includes('/blog') ||
               location.href.includes('/blog/') ||
               location.pathname.endsWith('/blog');

function isActive(href){
  if(href==='index.html') return inBlog;
  const file = href.replace('../','');
  const page = location.pathname.split('/').pop()||'index.html';
  return !inBlog && page===file;
}

const desktopLinks = NAV_LINKS.map(l=>{
  const active = isActive(l.href);
  const col = active ? '#00C2FF' : '#CBD5E1';
  return `<a href="${l.href}" style="color:${col}" class="text-sm font-medium transition-colors" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='${active?'#00C2FF':'#CBD5E1'}'">${l.label}</a>`;
}).join('');

const mobileLinks = NAV_LINKS.map(l=>`<a href="${l.href}" style="color:${isActive(l.href)?'#00C2FF':'#CBD5E1'}" class="block py-2 text-sm font-medium transition-colors">${l.label}</a>`).join('');

/* ───────────────────────────────────────────────
   4. Inject Nav
─────────────────────────────────────────────── */
const navHTML = `<nav id="navbar" class="fixed top-0 w-full z-50 nav-blur transition-all duration-300">
  <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    <a href="../index.html" class="flex items-center gap-3" style="text-decoration:none">
      ${LOGO_SVG}
      <div>
        <span class="font-bold text-lg leading-tight" style="letter-spacing:-0.04em;color:#FFFFFF;font-family:'Space Grotesk',sans-serif">Process<span style="color:#00C2FF">BI</span></span>
        <div style="font-size:9px;letter-spacing:0.16em;line-height:1;margin-top:1px;opacity:0.7;color:#00C2FF;font-weight:600;text-transform:uppercase">PROCESS × INTELLIGENCE</div>
      </div>
    </a>
    <div class="hidden md:flex items-center gap-7">${desktopLinks}</div>
    <div class="flex items-center gap-4">
      <a href="../contact.html" class="hidden md:inline-flex btn-primary" style="padding:10px 22px;font-size:13px">Book a Call</a>
      <button id="mobile-menu-btn" class="md:hidden transition-colors" style="color:#8BB4CC" aria-label="Menu">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden" style="background:rgba(11,26,46,0.98);border-top:1px solid rgba(0,194,255,0.1)">
    <div class="max-w-7xl mx-auto px-6 py-4 space-y-1">${mobileLinks}
      <a href="../contact.html" class="btn-primary block text-center mt-4" style="padding:12px 0;font-size:13px">Book a Call</a>
    </div>
  </div>
</nav>`;

document.body.insertAdjacentHTML('afterbegin', navHTML);

/* ───────────────────────────────────────────────
   5. Inject Footer
─────────────────────────────────────────────── */
const footerLinks = NAV_LINKS.map(l=>`<div><a href="${l.href}" style="color:#8BB4CC;font-size:0.875rem;text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">${l.label}</a></div>`).join('');

const footerHTML = `<footer style="border-top:1px solid rgba(0,194,255,0.12);background:rgba(8,18,36,0.55);backdrop-filter:blur(8px);padding:64px 0 0">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid md:grid-cols-4 gap-10 mb-12">
      <div class="md:col-span-2">
        <a href="../index.html" class="flex items-center gap-3 mb-4" style="text-decoration:none">
          ${LOGO_SVG}
          <span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.125rem;color:#FFFFFF">Process<span style="color:#00C2FF">BI</span></span>
        </a>
        <p style="color:#8BB4CC;font-size:0.875rem;line-height:1.6;max-width:340px">Australia's specialist Microsoft Fabric, Power BI &amp; AI consulting practice. Where process meets intelligence.</p>
        <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#00C2FF;font-weight:600;margin-top:16px">PROCESS × INTELLIGENCE</div>
      </div>
      <div>
        <h4 style="color:#FFFFFF;font-weight:600;font-size:0.875rem;margin-bottom:16px">Navigation</h4>
        <div class="space-y-2">${footerLinks}</div>
      </div>
      <div>
        <h4 style="color:#FFFFFF;font-weight:600;font-size:0.875rem;margin-bottom:16px">Contact</h4>
        <div class="space-y-2">
          <p style="color:#8BB4CC;font-size:0.875rem">hello@processbi.com.au</p>
          <p style="color:#8BB4CC;font-size:0.875rem">Melbourne, Australia</p>
          <a href="https://linkedin.com/in/manish-sharma-processbi" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;color:#8BB4CC;font-size:0.875rem;text-decoration:none;margin-top:8px;transition:color 0.2s" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid rgba(0,194,255,0.08);padding:28px 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px">
      <p style="color:#8BB4CC;font-size:0.8rem">&copy; 2026 ProcessBI. All rights reserved. ABN in progress.</p>
      <div style="display:flex;gap:20px">
        <a href="#" style="color:#8BB4CC;font-size:0.75rem;text-decoration:none" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">Privacy Policy</a>
        <a href="#" style="color:#8BB4CC;font-size:0.75rem;text-decoration:none" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>`;

document.body.insertAdjacentHTML('beforeend', footerHTML);

/* ───────────────────────────────────────────────
   6. Scroll reveal
─────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ───────────────────────────────────────────────
   7. Navbar scroll
─────────────────────────────────────────────── */
window.addEventListener('scroll',()=>{
  const nb=document.getElementById('navbar');
  if(nb) nb.style.borderBottomColor=scrollY>50?'rgba(0,194,255,0.25)':'rgba(0,194,255,0.1)';
},{passive:true});

/* ───────────────────────────────────────────────
   8. Mobile menu
─────────────────────────────────────────────── */
const mmbtn=document.getElementById('mobile-menu-btn');
const mmenu=document.getElementById('mobile-menu');
if(mmbtn&&mmenu) mmbtn.addEventListener('click',()=>mmenu.classList.toggle('hidden'));

/* ───────────────────────────────────────────────
   9. Three.js particle background
─────────────────────────────────────────────── */
if(typeof THREE!=='undefined'){
  (function(){
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
    renderer.setSize(innerWidth,innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.1,1000);
    camera.position.z=30;
    const N=400;
    const pos=new Float32Array(N*3);
    const col=new Float32Array(N*3);
    for(let i=0;i<N*3;i+=3){
      pos[i]=(Math.random()-.5)*80;pos[i+1]=(Math.random()-.5)*80;pos[i+2]=(Math.random()-.5)*40;
      const t=Math.random();
      const c=new THREE.Color(t<0.5?new THREE.Color(0x00C2FF).lerp(new THREE.Color(0x1A7FFF),t*2):new THREE.Color(0x1A7FFF).lerp(new THREE.Color(0x1EAEFF),(t-0.5)*2));
      col[i]=c.r;col[i+1]=c.g;col[i+2]=c.b;
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.BufferAttribute(col,3));
    const mat=new THREE.PointsMaterial({size:0.18,vertexColors:true,transparent:true,opacity:0.5,blending:THREE.AdditiveBlending});
    const pts=new THREE.Points(geo,mat);
    scene.add(pts);
    const MAX_LINES=180;
    const lgeo=new THREE.BufferGeometry();
    const lpos=new Float32Array(MAX_LINES*6);
    lgeo.setAttribute('position',new THREE.BufferAttribute(lpos,3));
    const lmat=new THREE.LineBasicMaterial({color:0x00C2FF,transparent:true,opacity:0.09});
    scene.add(new THREE.LineSegments(lgeo,lmat));
    let mx=0,my=0;
    document.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2;},{passive:true});
    function animate(){
      requestAnimationFrame(animate);
      pts.rotation.y+=0.00015;pts.rotation.x+=0.00008;
      camera.position.x+=(mx*1.5-camera.position.x)*0.006;
      camera.position.y+=(-my*1.5-camera.position.y)*0.006;
      camera.lookAt(scene.position);
      let li=0;
      const p=pts.geometry.attributes.position.array;
      const limit=Math.min(70,N);
      for(let i=0;i<limit&&li<MAX_LINES*6;i++){
        for(let j=i+1;j<limit&&li<MAX_LINES*6;j++){
          const dx=p[i*3]-p[j*3],dy=p[i*3+1]-p[j*3+1],dz=p[i*3+2]-p[j*3+2];
          if(dx*dx+dy*dy+dz*dz<64){lpos[li++]=p[i*3];lpos[li++]=p[i*3+1];lpos[li++]=p[i*3+2];lpos[li++]=p[j*3];lpos[li++]=p[j*3+1];lpos[li++]=p[j*3+2];}
        }
      }
      for(let i=li;i<MAX_LINES*6;i++) lpos[i]=0;
      lgeo.attributes.position.needsUpdate=true;
      renderer.render(scene,camera);
    }
    animate();
    window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);},{passive:true});
  })();
}

})();
