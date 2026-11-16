/* Room entry animations (16 Nov 2026).
   One themed opening per Student Zone room. Add to a room page, right after <body>:
   <script src="room-intro.js" data-room="fit"></script>
   Rooms: fit, cu, word, prep, lounge, circle.
   Plays when a student arrives from the Student Zone, or the first time in a visit. Tap to skip. */
(function(){
var s=document.currentScript,k=s&&s.getAttribute('data-room');
var R={
 fit:{c:'226,184,92',l:'#F6DFA4',n:'Find Your Fit',t:"I'll bring the clarity.",a:'<i class="rrg"></i><i class="rtk"></i><b class="rnd"></b><u></u>'},
 cu:{c:'96,150,255',l:'#B9D2FF',n:'Career Unlock',t:'Every door your specialisation opens.',a:'<i class="rsh"></i><b class="rbd"><u></u></b>'},
 word:{c:'245,150,66',l:'#FFD0A1',n:'Concept Corner',t:"I'll bring the meaning.",a:'<span class="rbk">📖</span>'},
 prep:{c:'227,22,30',l:'#FFB4B7',n:'Placement Prep Room',t:"I'll bring the preparation.",a:'<i class="rr1"></i><i class="rr2"></i><i class="rr3"></i><u class="rht"></u><b class="rdt"></b>'},
 lounge:{c:'70,180,160',l:'#B5E8DC',n:'The Lounge',t:"I'll bring a listening ear.",a:'<i class="rgl"></i><u></u><u></u><u></u><span class="rcup">☕</span>'},
 circle:{c:'180,110,255',l:'#E2C2FF',n:'Push Circle',t:'Where the push took them.',a:'<i class="rrg"></i>'+[0,1,2,3,4,5,6,7].map(function(i){return '<b style="--a:'+i*45+'deg;--i:'+i+'"></b>'}).join('')+'<span class="rsp">🌱</span>'}
};
var r=R[k];if(!r||!document.body)return;
try{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 var nv=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
 if(nv&&nv.type==='back_forward')return;
 var from=/student(\.html)?([?#]|$)/.test(document.referrer),key='ri_'+k;
 if(sessionStorage.getItem(key)&&!from)return;
 sessionStorage.setItem(key,'1');
}catch(e){}
var E='cubic-bezier(.2,.7,.2,1)',S='cubic-bezier(.3,1.5,.5,1)';
var css='#ri{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;overflow:hidden;color:#F4EFEA;font-family:"DM Serif Display",Georgia,serif;cursor:pointer;--c:'+r.c+';--l:'+r.l+'}'
+'#ri .ri-bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,rgba(var(--c),.36),transparent 62%),#0B0A0A}'
+'#ri .ri-in{position:relative;text-align:center;padding:0 24px}'
+'#ri .ri-art{position:relative;width:170px;height:170px;margin:0 auto 24px}'
+'#ri .ri-art *{position:absolute;display:block;font-style:normal;text-decoration:none}'
+'#ri .ri-n{font-size:clamp(30px,7vw,46px);line-height:1.05;opacity:0;animation:riUp .5s .8s '+E+' forwards}'
+'#ri .ri-t{font-style:italic;font-size:clamp(17px,4vw,22px);color:var(--l);margin-top:8px;opacity:0;animation:riUp .5s 1s '+E+' forwards}'
+'@keyframes riUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}'
+'@keyframes riPop{from{opacity:0;transform:scale(0)}to{opacity:1;transform:none}}'
+'@keyframes riFade{to{opacity:0}}';
/* 1. Find Your Fit: a compass needle spins, then settles on a direction */
if(k==='fit')css+='.ri-fit .rrg{inset:0;border-radius:50%;border:3px solid var(--l);background:rgba(var(--c),.1);box-shadow:0 0 44px rgba(var(--c),.55);animation:riPop .5s '+S+' both}'
+'.ri-fit .rtk{inset:9px;border-radius:50%;background:repeating-conic-gradient(from -1.5deg,var(--l) 0 3deg,transparent 3deg 45deg);-webkit-mask:radial-gradient(circle,transparent 60%,#000 61%);mask:radial-gradient(circle,transparent 60%,#000 61%);opacity:.8;animation:riPop .5s .1s '+S+' both}'
+'.ri-fit .rnd{left:50%;top:50%;width:22px;height:124px;margin:-62px -11px;background:linear-gradient(#E3161E 50%,#F4EFEA 50%);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);animation:riNeedle 1.25s .15s ease-out both}'
+'.ri-fit u{left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:#0B0A0A;border:2px solid var(--l)}'
+'@keyframes riNeedle{0%{transform:rotate(-560deg)}55%{transform:rotate(74deg)}72%{transform:rotate(22deg)}86%{transform:rotate(49deg)}100%{transform:rotate(40deg)}}'
+'#ri.out{animation:riIris .6s cubic-bezier(.7,0,.3,1) forwards}@keyframes riIris{from{clip-path:circle(150% at 50% 42%)}to{clip-path:circle(0% at 50% 42%)}}';
/* 2. Career Unlock: the lock opens, then two doors slide apart */
if(k==='cu')css+='#ri .ri-bg{display:none}#ri .ri-d{position:absolute;top:0;bottom:0;width:50.2%;background:radial-gradient(circle at var(--x) 42%,rgba(var(--c),.36),transparent 62vmax),#0B0A0A;transition:transform .65s cubic-bezier(.7,0,.2,1)}'
+'#ri .ri-d.l{left:0;--x:100%;border-right:1px solid rgba(var(--c),.5)}#ri .ri-d.r{right:0;--x:0%;border-left:1px solid rgba(var(--c),.5)}'
+'.ri-cu .rbd{left:28px;right:28px;bottom:6px;height:98px;border-radius:20px;background:linear-gradient(#8fb4ff,#3d68c8);box-shadow:0 0 44px rgba(var(--c),.6);animation:riBody 1.2s both}'
+'.ri-cu .rbd u{left:50%;top:30px;width:20px;height:20px;margin-left:-10px;border-radius:50%;background:#0B0A0A}.ri-cu .rbd u::after{content:"";position:absolute;left:6px;top:14px;width:8px;height:22px;border-radius:3px;background:#0B0A0A}'
+'.ri-cu .rsh{left:46px;right:46px;top:6px;height:78px;border:13px solid var(--l);border-bottom:0;border-radius:42px 42px 0 0;transform-origin:calc(100% - 6px) 100%;animation:riShackle 1.2s both}'
+'@keyframes riShackle{0%,30%{transform:none}36%{transform:translateX(-3px)}42%{transform:translateX(3px)}48%{transform:none}66%{transform:translateY(-22px)}100%{transform:translateY(-22px) rotate(30deg)}}'
+'@keyframes riBody{0%{opacity:0;transform:scale(.6)}18%{opacity:1;transform:none}48%{transform:none}60%{transform:scale(1.08)}75%,100%{transform:none}}'
+'#ri.out .ri-d.l{transform:translateX(-101%)}#ri.out .ri-d.r{transform:translateX(101%)}#ri.out .ri-in{animation:riFade .25s forwards}';
/* 3. Concept Corner: the name is typed out like a dictionary entry, then the page turns */
if(k==='word')css+='#ri .ri-art{height:96px;margin-bottom:10px}.ri-word .rbk{left:0;right:0;top:0;font-size:78px;line-height:1.2;animation:riPop .5s '+S+' both}'
+'#ri .ri-n{opacity:1;animation:none;display:inline-block;position:relative;padding-bottom:8px}#ri .ri-n span{opacity:0;animation:riType .01s forwards;animation-delay:calc(.35s + var(--i)*.055s)}'
+'#ri .ri-n::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:2px;background:var(--l);transform:scaleX(0);transform-origin:left;animation:riLine .4s 1.15s '+E+' forwards}'
+'#ri .ri-t{animation-delay:1.25s}@keyframes riType{to{opacity:1}}@keyframes riLine{to{transform:scaleX(1)}}'
+'#ri.out{transform-origin:left center;animation:riPage .65s cubic-bezier(.6,0,.3,1) forwards}@keyframes riPage{to{transform:perspective(1600px) rotateY(-96deg);opacity:.25}}';
/* 4. Placement Prep Room: a target appears and the dart hits the centre */
if(k==='prep')css+='.ri-prep i{border-radius:50%;animation:riPop .45s '+S+' both}.ri-prep .rr1{inset:0;background:#E3161E;box-shadow:0 0 50px rgba(227,22,30,.6)}.ri-prep .rr2{inset:28px;background:#F4EFEA;animation-delay:.12s}.ri-prep .rr3{inset:57px;background:#E3161E;animation-delay:.24s}'
+'.ri-prep .rdt{left:50%;top:50%;width:104px;height:7px;margin-top:-3.5px;border-radius:0 4px 4px 0;background:linear-gradient(90deg,#1a1414,#F6DFA4 30%,#E2B85C);transform-origin:0 50%;animation:riDart .26s .62s cubic-bezier(.5,0,1,.7) both}'
+'.ri-prep .rdt::after{content:"";position:absolute;right:-4px;top:-11px;width:30px;height:29px;background:#6096FF;clip-path:polygon(0 50%,45% 0,100% 0,70% 50%,100% 100%,45% 100%)}'
+'@keyframes riDart{from{opacity:0;transform:translate(46vmax,-40vmax) rotate(-41deg)}to{opacity:1;transform:rotate(-41deg)}}'
+'.ri-prep .rht{left:50%;top:50%;width:40px;height:40px;margin:-20px;border-radius:50%;border:3px solid #fff;opacity:0;animation:riHit .5s .86s ease-out both}@keyframes riHit{from{opacity:.9;transform:scale(.3)}to{opacity:0;transform:scale(5.5)}}'
+'#ri .ri-art.ri-prep{animation:riShake .3s .86s both}@keyframes riShake{20%{transform:translate(-5px,4px)}45%{transform:translate(4px,-3px)}70%{transform:translate(-2px,2px)}}'
+'#ri.out{animation:riLift .55s cubic-bezier(.7,0,.2,1) forwards}@keyframes riLift{to{transform:translateY(-100%)}}';
/* 5. The Lounge: a warm lamp glow and a cup of chai, slow and calm */
if(k==='lounge')css+='.ri-lounge .rgl{inset:-110px;border-radius:50%;background:radial-gradient(circle,rgba(255,206,120,.5),rgba(255,206,120,.12) 45%,transparent 68%);animation:riGlow 1.5s ease-out both}@keyframes riGlow{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}'
+'.ri-lounge .rcup{left:0;right:0;bottom:6px;font-size:92px;line-height:1;animation:riUp .7s .1s '+E+' both}'
+'.ri-lounge u{top:8px;left:50%;width:12px;height:34px;border-left:3px solid rgba(244,239,234,.65);border-radius:50%;opacity:0;animation:riSteam 1.5s .45s ease-out infinite}.ri-lounge u:nth-of-type(1){margin-left:-30px}.ri-lounge u:nth-of-type(2){margin-left:-8px;animation-delay:.7s}.ri-lounge u:nth-of-type(3){margin-left:14px;animation-delay:.95s}'
+'@keyframes riSteam{0%{opacity:0;transform:translateY(16px)}35%{opacity:1}100%{opacity:0;transform:translateY(-22px)}}'
+'#ri .ri-n{animation-duration:.8s}#ri .ri-t{animation-duration:.8s}#ri.out{animation:riFade .8s ease forwards}';
/* 6. Push Circle: scattered students come together into one circle and a sprout grows */
if(k==='circle')css+='.ri-circle b{left:50%;top:50%;width:18px;height:18px;margin:-9px;border-radius:50%;background:var(--l);box-shadow:0 0 14px rgba(var(--c),.9);animation:riJoin .85s '+E+' both;animation-delay:calc(var(--i)*.05s)}'
+'@keyframes riJoin{from{opacity:0;transform:rotate(calc(var(--a) + 170deg)) translateY(-46vmax) scale(.3)}to{opacity:1;transform:rotate(var(--a)) translateY(-76px)}}'
+'.ri-circle .rrg{inset:9px;border-radius:50%;border:2px dashed rgba(var(--c),.8);opacity:0;animation:riRing .6s .85s ease forwards}@keyframes riRing{from{opacity:0;transform:rotate(-40deg)}to{opacity:1;transform:none}}'
+'.ri-circle .rsp{left:0;right:0;top:44px;font-size:70px;line-height:1.2;transform-origin:50% 90%;animation:riPop .6s .8s '+S+' both}'
+'#ri.out{animation:riThrough .6s cubic-bezier(.6,0,.4,1) forwards}@keyframes riThrough{to{transform:scale(5);opacity:0}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var name=k==='word'?r.n.split('').map(function(ch,i){return '<span style="--i:'+i+'">'+(ch===' '?'&nbsp;':ch)+'</span>'}).join(''):r.n;
var o=document.createElement('div');o.id='ri';o.setAttribute('aria-hidden','true');
o.innerHTML=(k==='cu'?'<div class="ri-d l"></div><div class="ri-d r"></div>':'')+'<div class="ri-bg"></div><div class="ri-in"><div class="ri-art ri-'+k+'">'+r.a+'</div><div class="ri-n">'+name+'</div><div class="ri-t">'+r.t+'</div></div>';
document.body.appendChild(o);
var done=false,t=setTimeout(out,k==='lounge'?1900:1750);
function out(){if(done)return;done=true;clearTimeout(t);o.classList.add('out');setTimeout(function(){o.remove();st.remove()},850)}
o.addEventListener('click',out);
})();
