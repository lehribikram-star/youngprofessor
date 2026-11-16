/* Student Zone helper (16 Nov 2026): "Your journey" + search across the zone.
   Loaded with <script src="zone.js" defer> on every room page and on student.html.
   - On a room page it only remembers, on this phone, that the room was opened.
   - On student.html (an element with id="zoneTools") it also shows the journey strip and the search box.
   Nothing leaves the device. No ranks, no badges. */
(function(){
var ROOMS=[
 {k:'fit',e:'🧭',n:'Find Your Fit',u:'fit.html',kw:'specialisation specialization choose path marketing finance hr operations analytics which career quiz certificate'},
 {k:'cu',e:'🔓',n:'Career Unlock',u:'career-unlock.html',kw:'jobs roles specialisation career salary doors opens openings'},
 {k:'word',e:'📘',n:'Concept Corner',u:'word.html',kw:'word dictionary meaning term glossary concept daily vocabulary business'},
 {k:'case',e:'📰',n:'Crack the Case',u:'case.html',kw:'case study cases weekly practice decision real company'},
 {k:'prep',e:'🎯',n:'Placement Prep Room',u:'placement.html',kw:'placement interview company brief cv resume offer letter salary job prepare know before you go'},
 {k:'lounge',e:'🌿',n:'The Lounge',u:'lounge.html',kw:'stress talk mind wellbeing ask professor opportunities unsaid anonymous note listen'},
 {k:'circle',e:'🌱',n:'Push Circle',u:'circle.html',kw:'alumni former students stories inspiration seniors'}
];
var TOOLS=[
 {n:'CV builder (Get Shortlisted)',u:'cv.html',kw:'cv resume ats shortlisted',r:'prep'},
 {n:'Know Before You Go (company briefs)',u:'prep.html',kw:'company interview research brief',r:'prep'},
 {n:'Before You Sign (offer letter check)',u:'offer.html',kw:'offer letter salary in hand ctc red flags',r:'prep'},
 {n:'Things I Never Said (anonymous wall)',u:'unsaid.html',kw:'unsaid anonymous note wall',r:'lounge'},
 {n:'Opportunities',u:'opportunities.html',kw:'courses listings opportunities',r:'lounge'}
];
var FILE={'fit':'fit','career-unlock':'cu','word':'word','case':'case','placement':'prep','prep':'prep','cv':'prep','offer':'prep','lounge':'lounge','unsaid':'lounge','opportunities':'lounge','circle':'circle'};
var KEY='yp_journey_v1';
function get(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}}
function put(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9& ]/g,' ').replace(/\s+/g,' ').trim()}
function today(){var n=new Date(),m=n.getMonth()+1,d=n.getDate();return n.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(d<10?'0':'')+d}

/* 1. remember this room */
var m=location.pathname.match(/([a-z-]+?)(?:\.html)?\/?$/),f=m&&m[1],room=FILE[f];
if(room){var j=get();j.v=j.v||{};j.v[room]=Date.now();j.last={k:room,u:f+'.html',t:Date.now()};put(j)}

/* 2. the tools, only where the page asks for them */
function init(){
 var host=document.getElementById('zoneTools');if(!host)return;
 var css=document.createElement('style');
 css.textContent='#zoneTools{max-width:1080px;margin:0 auto;padding:6px 16px 8px;display:grid;gap:14px}'
 +'.zt-box{background:var(--panel,#171414);border:1px solid var(--line2,#2A2323);border-radius:22px;padding:16px}'
 +'.zt-h{font:800 12px/1 Manrope,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#E2B85C;margin:0 0 10px}'
 +'.zt-s{position:relative}.zt-s input{width:100%;height:52px;border-radius:16px;border:1px solid var(--line2,#2A2323);background:rgba(255,255,255,.05);color:inherit;font:500 16px Manrope,system-ui,sans-serif;padding:0 16px 0 46px}'
 +'.zt-s input:focus{outline:2px solid #E2B85C;outline-offset:1px}.zt-s i{position:absolute;left:16px;top:14px;font-style:normal;font-size:20px;opacity:.8}'
 +'.zt-r{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:6px}.zt-r a{display:flex;align-items:center;gap:12px;min-height:52px;padding:8px 12px;border-radius:14px;background:rgba(255,255,255,.04);color:inherit;text-decoration:none;font:600 15px/1.3 Manrope,system-ui,sans-serif}'
 +'.zt-r a:hover,.zt-r a:focus-visible{background:rgba(226,184,92,.16);outline:none}.zt-r small{display:block;font-weight:500;font-size:12.5px;color:var(--muted,#A39A94);margin-top:2px}'
 +'.zt-t{flex:none;font:800 10.5px/1 Manrope,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;border:1px solid rgba(226,184,92,.5);color:#E2B85C;border-radius:8px;padding:5px 7px;min-width:62px;text-align:center}'
 +'.zt-none{margin:10px 0 0;font-size:14.5px;color:var(--muted,#A39A94)}.zt-none a{color:#E2B85C;font-weight:700}'
 +'.zt-j{display:flex;flex-wrap:wrap;gap:8px}.zt-j a{display:inline-flex;align-items:center;gap:7px;min-height:44px;padding:0 14px;border-radius:999px;border:1px solid var(--line2,#2A2323);color:inherit;text-decoration:none;font:600 14px Manrope,system-ui,sans-serif;opacity:.55;transition:transform .25s,opacity .25s,border-color .25s}'
 +'.zt-j a.on{opacity:1;border-color:#E2B85C;background:rgba(226,184,92,.12)}.zt-j a:hover,.zt-j a:focus-visible{opacity:1;transform:translateY(-2px);outline:none}'
 +'.zt-p{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-top:12px;font-size:14.5px}.zt-p a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:999px;background:#E2B85C;color:#1a1410;font:800 14px Manrope,system-ui,sans-serif;text-decoration:none}'
 +'.zt-p span{color:var(--muted,#A39A94)}.zt-n{margin-top:10px;font-size:12.5px;color:var(--dim,#6F6661)}.zt-n button{background:none;border:0;color:inherit;text-decoration:underline;font:inherit;cursor:pointer;min-height:32px}'
 +'@media (min-width:860px){#zoneTools{grid-template-columns:1fr 1fr;align-items:start;padding-top:14px}}'
 +'@media (prefers-reduced-motion:reduce){.zt-j a{transition:none}}';
 document.head.appendChild(css);
 host.innerHTML='<div class="zt-box"><p class="zt-h">Search the Student Zone</p><div class="zt-s"><i aria-hidden="true">🔎</i><input id="ztq" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Word, company, case or tool" aria-label="Search the Student Zone"></div><ul class="zt-r" id="ztr" aria-live="polite"></ul></div>'
 +'<div class="zt-box"><p class="zt-h">Your journey</p><div class="zt-j" id="ztj"></div><div class="zt-p" id="ztp"></div><p class="zt-n">Saved only on this phone. <button type="button" id="ztc">Clear</button></p></div>';
 /* journey */
 function paint(){var j=get(),v=j.v||{},n=0;
  document.getElementById('ztj').innerHTML=ROOMS.map(function(r){var on=!!v[r.k];if(on)n++;return '<a href="'+r.u+'" class="'+(on?'on':'')+'"><span aria-hidden="true">'+r.e+'</span>'+esc(r.n)+(on?'<span class="sr" style="position:absolute;left:-9999px"> visited</span>':'')+'</a>'}).join('');
  var p=document.getElementById('ztp'),last=j.last,lr=last&&ROOMS.filter(function(r){return r.k===last.k})[0];
  p.innerHTML=n?'<span>'+n+' of '+ROOMS.length+' rooms explored</span>'+(lr?'<a href="'+esc(last.u)+'">Continue in '+esc(lr.n)+' →</a>':''):'<span>You have not opened a room yet.</span><a href="fit.html">Start with Find Your Fit →</a>'}
 paint();
 document.getElementById('ztc').onclick=function(){try{localStorage.removeItem(KEY)}catch(e){}paint()};
 /* search */
 var DATA=null,loading=null,q=document.getElementById('ztq'),out=document.getElementById('ztr');
 function load(){if(loading)return loading;var t=today();
  function J(u){return fetch(u).then(function(r){if(!r.ok)throw 0;return r.json()}).catch(function(){return null})}
  loading=Promise.all([J('words.json'),J('glossary.json'),J('cases.json'),J('briefs/index.json')]).then(function(a){
   var items=[];
   (a[0]||[]).forEach(function(x){if(x.w&&x.d<=t)items.push({t:'Word',n:x.w,s:[x.f,x.t].filter(Boolean).join(' · '),u:'word.html?w='+encodeURIComponent(x.s),k:norm([x.w,x.f,x.t,x.h].join(' '))})});
   (a[1]||[]).forEach(function(x){if(x.w)items.push({t:'Term',n:x.w,s:x.f||x.t||'',u:'word.html?q='+encodeURIComponent(x.w),k:norm([x.w,x.f,x.t].join(' '))})});
   ((a[2]||{}).cases||[]).forEach(function(c){if(c.date<=t)items.push({t:'Case',n:c.company+': '+c.title,s:c.field||'',u:'case.html?case='+encodeURIComponent(c.id),k:norm([c.company,c.title,c.field,(c.terms||[]).map(function(x){return x[0]}).join(' ')].join(' '))})});
   ((a[3]||{}).companies||[]).forEach(function(c){items.push({t:'Company',n:c.name,s:c.sector||'',u:'brief.html?c='+encodeURIComponent(c.id),k:norm([c.name,c.sector,(c.aliases||[]).join(' ')].join(' '))})});
   ROOMS.forEach(function(r){items.push({t:'Room',n:r.n,s:'Student Zone',u:r.u,k:norm(r.n+' '+r.kw)})});
   TOOLS.forEach(function(r){items.push({t:'Tool',n:r.n,s:'Placement and wellbeing tools',u:r.u,k:norm(r.n+' '+r.kw)})});
   DATA=items;return items})
  return loading}
 function score(it,w){var n=norm(it.n),s=0;w.forEach(function(x){if(n===x)s+=10;else if(n.indexOf(x)===0)s+=6;else if(n.indexOf(' '+x)>-1)s+=4;else if(it.k.indexOf(x)>-1)s+=2;else s=-999});return s}
 function run(){var raw=q.value.trim(),w=norm(raw).split(' ').filter(Boolean);
  if(!w.length){out.innerHTML='';return}
  if(!DATA){out.innerHTML='<li class="zt-none">Searching…</li>';load().then(run);return}
  var r=DATA.map(function(it){return{it:it,s:score(it,w)}}).filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s}).slice(0,8);
  out.innerHTML=r.length?r.map(function(x){var i=x.it;return '<li><a href="'+esc(i.u)+'"><span class="zt-t">'+esc(i.t)+'</span><span>'+esc(i.n)+(i.s?'<small>'+esc(i.s)+'</small>':'')+'</span></a></li>'}).join('')
  :'<li class="zt-none">Nothing found for “'+esc(raw)+'”. <a href="word.html?q='+encodeURIComponent(raw)+'">Look it up in the Business Dictionary →</a></li>'}
 q.addEventListener('focus',load,{once:true});q.addEventListener('input',run);
 q.addEventListener('keydown',function(e){if(e.key==='Enter'){var a=out.querySelector('a');if(a)location.href=a.getAttribute('href')}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
