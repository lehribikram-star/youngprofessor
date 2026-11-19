/* youngprofessor.in · Follow & Grow Together on every page (web push via OneSignal).
   Same 2-tap flow as the homepage: tap Follow -> browser Allow. Never asks without a tap.
   Shares localStorage keys with index.html (yp_follow_state, yp_follow_card_later). */
(function(){
  'use strict';
  if(window.__ypFollow)return;window.__ypFollow=true;
  var d=document,APP_ID='e66bc870-e40b-4d6e-b0db-d5188b2db31c',FKEY='yp_follow_state',LATER='yp_follow_card_later';
  var LI='https://www.linkedin.com/in/drbikrampaulsingh';
  function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  var ua=navigator.userAgent;
  var isiOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var standalone=(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
  var inApp=/Instagram|FBAN|FBAV|FB_IAB|Line\/|LinkedInApp|Snapchat|Twitter|MicroMessenger|WhatsApp/i.test(ua)||(!isiOS&&(!('Notification' in window)||!('serviceWorker' in navigator)||/; wv\)/.test(ua)));
  var safariV=+((ua.match(/Version\/(\d+)/)||[])[1]||0);

  var css=''+
  '.ypf-pill{position:fixed;left:14px;bottom:16px;z-index:9990;display:inline-flex;align-items:center;gap:7px;border:0;border-radius:999px;padding:11px 18px 11px 14px;background:#E3161E;color:#fff;font:800 14px/1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;box-shadow:0 10px 28px -6px rgba(227,22,30,.75),0 0 0 3px rgba(255,255,255,.12);cursor:pointer;animation:ypfNudge 4s ease-in-out 3s infinite;-webkit-tap-highlight-color:transparent}'+
  '.ypf-pill[hidden]{display:none}.ypf-pill:active{transform:scale(.96)}'+
  '@keyframes ypfNudge{0%,84%,100%{translate:0 0}88%{translate:0 -8px}92%{translate:0 0}96%{translate:0 -3px}}'+
  '@media (prefers-reduced-motion:reduce){.ypf-pill{animation:none}}'+
  '.ypf-m{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(8,6,6,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}.ypf-m[hidden]{display:none}'+
  '.ypf-b{width:100%;max-width:380px;background:#151313;color:#F4EFEA;border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:26px 22px 20px;text-align:center;font:400 15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:ypfIn .3s ease-out}'+
  '@keyframes ypfIn{from{transform:translateY(16px);opacity:0}}'+
  '.ypf-b img{width:72px;height:72px;border-radius:50%;box-shadow:0 0 0 3px #E3161E;display:block;margin:0 auto 12px}'+
  '.ypf-b h3{font:400 24px/1.2 Georgia,"DM Serif Display",serif;margin:0 0 8px;color:#fff}.ypf-b h3 i{color:#FF3B42}'+
  '.ypf-b p{margin:0 0 10px;color:#d8cfc8}.ypf-b b{color:#fff}'+
  '.ypf-b ol{text-align:left;margin:12px 0 16px;padding-left:22px;font-size:16px;line-height:1.55}.ypf-b li{margin-bottom:9px}'+
  '.ypf-yes{display:block;width:100%;border:0;border-radius:999px;padding:14px 18px;margin:12px 0 6px;background:#E3161E;color:#fff;font:800 16px system-ui,-apple-system,sans-serif;cursor:pointer;text-decoration:none;box-shadow:0 12px 30px -8px rgba(227,22,30,.8)}'+
  '.ypf-no{border:0;background:none;color:#a99f98;font:600 14px system-ui,sans-serif;text-decoration:underline;cursor:pointer;padding:6px}'+
  '.ypf-li{display:block;margin-top:10px;font-size:13px;color:#9fc4ee;text-decoration:none}'+
  '.ypf-shr{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:6px;background:#0a84ff;color:#fff;font-size:13px;vertical-align:middle}'+
  '.ypf-k3{display:inline-grid;place-items:center;min-width:28px;height:24px;padding:0 6px;border-radius:7px;background:#3a3a3c;color:#fff;font-weight:800;vertical-align:middle}'+
  '.ypf-arrow{position:fixed;left:50%;bottom:10px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;color:#fff;font:800 30px/1 system-ui,sans-serif;text-shadow:0 0 14px #E3161E;pointer-events:none;animation:ypfB 1.1s ease-in-out infinite}'+
  '.ypf-arrow span{font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:2px}.ypf-arrow.r{left:auto;right:14px;transform:none}'+
  '@keyframes ypfB{50%{translate:0 10px}}'+
  '.ypf-q{position:fixed;left:10px;right:10px;top:10px;z-index:10001;background:#fff;color:#111;border-radius:16px;padding:14px 40px 14px 16px;font:500 15px/1.4 system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.45);border:2px solid #E3161E;animation:ypfIn .35s ease-out}.ypf-q[hidden]{display:none}'+
  '.ypf-q span{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#f1f3f4;margin:0 2px}.ypf-q button{position:absolute;right:8px;top:8px;border:0;background:none;font-size:16px;color:#666}'+
  '.ypf-t{position:fixed;left:50%;bottom:84px;transform:translateX(-50%) translateY(20px);z-index:10002;max-width:92vw;background:#151313;color:#fff;border:1px solid rgba(227,22,30,.6);border-radius:14px;padding:12px 18px;font:600 14px system-ui,sans-serif;opacity:0;pointer-events:none;transition:.3s;text-align:center}.ypf-t.on{opacity:1;transform:translateX(-50%) translateY(0)}';
  css+='.yg-why{font-size:14px;color:#cfc6bf;margin:4px 0 10px}.yg-st{display:flex;gap:10px;text-align:left;margin:10px 0;font-size:15px;line-height:1.45;color:#e6ded8}.yg-st>b{flex:none;width:26px;height:26px;border-radius:50%;background:#E3161E;color:#fff;display:grid;place-items:center;font-size:14px}.yg-st b{color:#fff}.yg-bar{display:flex;align-items:center;justify-content:space-around;gap:6px;margin-top:8px;padding:8px 10px;border-radius:16px;background:#2c2c2e;color:#0a84ff;font:600 18px system-ui,sans-serif}.yg-url{flex:1;background:#3a3a3c;color:#ddd;border-radius:10px;padding:6px 10px;font:500 13px system-ui,sans-serif;text-align:center}.yg-i{min-width:28px;text-align:center}.yg-hl{color:#fff;background:#E3161E;border-radius:10px;padding:2px 8px;animation:ygP 1.2s ease-out infinite}@keyframes ygP{0%{box-shadow:0 0 0 0 rgba(227,22,30,.85)}100%{box-shadow:0 0 0 14px rgba(227,22,30,0)}}.yg-hint{font-size:13px;color:#ffd27a;margin:8px 0 0}.yg-ptr{position:fixed;z-index:10003;display:flex;flex-direction:column;align-items:center;pointer-events:none;color:#fff;font:800 13px system-ui,sans-serif;text-shadow:0 2px 8px #000}.yg-ptr.br{right:2px;bottom:2px}.yg-ptr.bc{left:50%;bottom:2px;transform:translateX(-50%)}.yg-ptr.tr{right:2px;top:2px;flex-direction:column-reverse}.yg-lb{background:#E3161E;border-radius:999px;padding:6px 12px;white-space:nowrap;box-shadow:0 6px 20px rgba(227,22,30,.6);text-shadow:none}.yg-ar{font-size:34px;line-height:1;animation:ygB 1s ease-in-out infinite}.yg-ptr.tr .yg-ar{animation-name:ygT}@keyframes ygB{50%{transform:translateY(8px)}}@keyframes ygT{50%{transform:translateY(-8px)}}.yg-ring{width:46px;height:46px;border:3px solid #E3161E;border-radius:50%;margin-top:-6px;animation:ygR 1.2s ease-out infinite}.yg-ptr.tr .yg-ring{margin:0 0 -6px}@keyframes ygR{0%{transform:scale(.6);opacity:1}100%{transform:scale(1.4);opacity:0}}'+'body:has(.ygopen:not([hidden])){overflow:hidden}'+'html,body{overflow-x:clip}@media (pointer:coarse){input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea,select{font-size:16px!important}}@media (max-width:400px){.nav .back{padding:7px 11px;font-size:13px;gap:5px}}';
  var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);

  function ypIosGuide(){
   var ua=navigator.userAgent,v=+((ua.match(/Version\/(\d+)/)||[])[1]||0);
   var k=/CriOS/.test(ua)?'chrome':(/FxiOS/.test(ua)?'firefox':(v>=26?'s26':'s'));
   var B={s26:'<span class="yg-i">‹</span><span class="yg-url">youngprofessor.in</span><span class="yg-i yg-hl">⋯</span>',
    s:'<span class="yg-i">‹</span><span class="yg-i">›</span><span class="yg-i yg-hl">⬆︎</span><span class="yg-i">📖</span><span class="yg-i">⧉</span>',
    chrome:'<span class="yg-url">youngprofessor.in</span><span class="yg-i yg-hl">⬆︎</span>',
    firefox:'<span class="yg-i">‹</span><span class="yg-i">›</span><span class="yg-i">＋</span><span class="yg-i">⧉</span><span class="yg-i yg-hl">☰</span>'}[k];
   var top=k==='chrome';
   var S1={s26:'Tap <b>⋯</b> in Safari’s bar at the <b>very bottom of your screen</b> (not the end of the page):',
    s:'Tap <b>Share ⬆︎</b> in Safari’s bar at the <b>very bottom of your screen</b> (not the end of the page):',
    chrome:'Tap <b>Share ⬆︎</b> in the address bar at the <b>top right of your screen</b>:',
    firefox:'Tap <b>☰</b> at the <b>bottom right of your screen</b>, then <b>Share</b>:'}[k];
   var S2=(k==='s26'?'Tap <b>Share</b>, then scroll down and tap <b>Add to Home Screen</b> → <b>Add</b>':'Scroll down, tap <b>Add to Home Screen</b> → <b>Add</b>');
   var hint=top?'':'<p class="yg-hint">Can’t see Safari’s bar? <b>Tap the bottom edge of your screen once</b> and it appears.</p>';
   var pos={s26:'br',s:'bc',chrome:'tr',firefox:'br'}[k];
   var lbl={s26:'Tap ⋯ here',s:'Tap Share here',chrome:'Tap Share here',firefox:'Tap ☰ here'}[k];
   var body='<h3>Follow on iPhone 🌱</h3><p class="yg-why">Apple allows updates only from your <b>Home Screen</b>. 3 quick steps:</p>'+
    '<div class="yg-st"><b>1</b><div>'+S1+'<div class="yg-bar">'+B+'</div></div></div>'+
    '<div class="yg-st"><b>2</b><div>'+S2+'</div></div>'+
    '<div class="yg-st"><b>3</b><div>Open <b>Dr. Lehri</b> from your Home Screen, tap <b>Follow</b>, then <b>Allow</b></div></div>'+hint;
   var ptr='<div class="yg-ptr '+pos+'" aria-hidden="true"><span class="yg-lb">'+lbl+'</span><span class="yg-ar">'+(top?'⬆︎':'⬇︎')+'</span><span class="yg-ring"></span></div>';
   return {body:body,ptr:ptr};
  }
  
  var G_=ypIosGuide();
  var shareTxt=(isiOS&&safariV>=26)?'Tap <span class="ypf-k3">⋯</span> at the <b>bottom right</b> of Safari, then <b>Share</b> <span class="ypf-shr">⬆︎</span>':'Tap <b>Share</b> <span class="ypf-shr">⬆︎</span> at the bottom of Safari';
  var here=location.origin+location.pathname;
  var intent='intent://'+location.host+location.pathname+'?follow=1#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(here+'?follow=1')+';end';
  var html=''+
  '<button type="button" class="ypf-pill" id="ypfPill" hidden aria-label="Follow Dr. Lehri">🌱 Follow</button>'+
  '<div class="ypf-m" id="ypfPre" hidden><div class="ypf-b" role="dialog" aria-modal="true"><img src="/logo-mark.webp" alt="" width="72" height="72">'+
    '<h3><i>You bring the dreams,</i><br>I’ll bring the push.</h3><p>Be the first to get my new lessons, opportunities and updates, right on your phone.</p>'+
    '<p><b>On the next box, tap “Allow”</b> so my push can reach you. 🌱</p>'+
    '<button type="button" class="ypf-yes" id="ypfYes">🌱 Yes, follow &amp; grow together</button><button type="button" class="ypf-no" id="ypfNo">Maybe later</button></div></div>'+
  '<div class="ypf-m ygopen" id="ypfIos" hidden><div class="ypf-b" role="dialog" aria-modal="true" style="max-height:calc(100vh - 120px);overflow:auto"><img src="/logo-mark.webp" alt="" width="72" height="72">'+G_.body+
    '<button type="button" class="ypf-yes" id="ypfIosOk">Done, I’ve added it</button><a class="ypf-li" href="'+LI+'" target="_blank" rel="noopener">Prefer LinkedIn? Follow me there →</a></div>'+G_.ptr+'</div>'+
  '<div class="ypf-m" id="ypfWv" hidden><div class="ypf-b" role="dialog" aria-modal="true"><h3>Open in your browser</h3>'+
    (/Android/i.test(ua)?'<p>Following works in your phone’s browser. Tap below, then tap <b>Follow</b> again.</p><a class="ypf-yes" href="'+intent+'">Open in Chrome</a>':'<p>Following works in Safari. Tap <b>⋯</b> and choose <b>Open in Safari</b> (or copy the link below), then tap <b>Follow</b> again.</p>')+
    '<button type="button" class="ypf-no" id="ypfCopy">Copy link</button></div></div>'+
  '<div class="ypf-m" id="ypfBl" hidden><div class="ypf-b" role="dialog" aria-modal="true"><h3>Almost there 🌱</h3><p>Your browser has <b>blocked</b> updates from this site. It takes 10 seconds to fix:</p>'+
    '<ol><li>Tap the <b>🔒 lock</b> (or <b>ⓘ</b>) next to the web address.</li><li>Tap <b>Permissions</b> or <b>Notifications</b>.</li><li>Choose <b>Allow</b>, then tap the button below.</li></ol>'+
    '<button type="button" class="ypf-yes" id="ypfBlOk">Done, follow now</button><button type="button" class="ypf-no" id="ypfBlNo">Maybe later</button></div></div>'+
  '<div class="ypf-m" id="ypfTy" hidden><div class="ypf-b" role="dialog" aria-modal="true"><img src="/logo-mark.webp" alt="" width="72" height="72">'+
    '<h3>You’re in. <i>Let’s grow together.</i> 🌱</h3><p>Your first push arrives <b>tomorrow morning</b>. Thank you for joining!</p>'+
    '<a class="ypf-yes" href="'+LI+'" target="_blank" rel="noopener" style="background:#0A66C2;box-shadow:none">One more step: follow me on LinkedIn</a><button type="button" class="ypf-no" id="ypfTyOk">Continue exploring</button></div></div>'+
  '<div class="ypf-q" id="ypfQ" hidden role="status"><b>👆 Almost done!</b> Tap the <span>🔔</span> icon in the address bar at the top, then tap <b>Allow</b>.<button type="button" aria-label="Close" id="ypfQx">✕</button></div>'+
  '<div class="ypf-t" id="ypfT" role="status"></div>';

  function $(id){return d.getElementById(id);}
  function start(){
    var wrap=d.createElement('div');wrap.innerHTML=html;while(wrap.firstChild)d.body.appendChild(wrap.firstChild);
    var pill=$('ypfPill'),pre=$('ypfPre'),ios=$('ypfIos'),wv=$('ypfWv'),bl=$('ypfBl'),ty=$('ypfTy'),q=$('ypfQ');
    var OS=null,osLoaded=false,pending=false,shown=false;
    function toast(t){var el=$('ypfT');el.textContent=t;el.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){el.classList.remove('on');},4500);}
    function setOn(on){if(on){lsSet(FKEY,'on');pill.hidden=true;}else{pill.hidden=false;}}
    function later(){lsSet(LATER,String(Date.now()));}
    function anyOpen(){return !pre.hidden||!ios.hidden||!wv.hidden||!bl.hidden||!ty.hidden;}
    function celebrate(){if(celebrate.done)return;celebrate.done=true;[pre,ios,wv,bl].forEach(function(m){m.hidden=true;});ty.hidden=false;}
    function loadOS(){if(osLoaded)return;osLoaded=true;
      window.OneSignalDeferred=window.OneSignalDeferred||[];
      window.OneSignalDeferred.push(async function(OneSignal){
        try{await OneSignal.init({appId:APP_ID,serviceWorkerPath:'/OneSignalSDKWorker.js',notifyButton:{enable:false},promptOptions:{slidedown:{prompts:[]}}});}catch(e){return;}
        OS=OneSignal;
        if(pending){pending=false;try{if(OneSignal.Notifications.permission){OneSignal.User.PushSubscription.optIn();}}catch(e){}}
        try{var o=!!OneSignal.User.PushSubscription.optedIn;if(o)setOn(true);else if(lsGet(FKEY)==='on'){lsSet(FKEY,'');setOn(false);}}catch(e){}
        try{OneSignal.User.PushSubscription.addEventListener('change',function(ev){if(ev.current&&ev.current.optedIn){setOn(true);celebrate();}});}catch(e){}
      });
      var sc=d.createElement('script');sc.src='https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';sc.defer=true;d.head.appendChild(sc);}
    function blocked(){pre.hidden=true;bl.hidden=false;}
    function subscribe(){
      if(!('Notification' in window)||!Notification.requestPermission){toast('Your browser does not support notifications. Try Chrome.');return;}
      if(Notification.permission!=='granted')toast('Tap “Allow” to join 🌱');
      var fin=false,qt=setTimeout(function(){if(fin)return;try{scrollTo({top:0,behavior:'smooth'});}catch(e){scrollTo(0,0);}q.hidden=false;},1200);
      function done(p){if(fin)return;fin=true;clearTimeout(qt);q.hidden=true;
        if(p==='granted'){setOn(true);celebrate();if(OS){try{OS.User.PushSubscription.optIn();}catch(e){}}else{pending=true;loadOS();}}
        else if(p==='denied')blocked();
        else toast('Look for “Allow” at the top or bottom of your screen 🌱');}
      try{var r=Notification.requestPermission(done);if(r&&r.then)r.then(done);}catch(e){}
    }
    function follow(){pre.hidden=true;
      if(inApp&&!standalone){wv.hidden=false;return;}
      if(isiOS&&!standalone){try{scrollTo(0,0);}catch(e){}ios.hidden=false;return;}
      if(('Notification' in window)&&Notification.permission==='denied'){blocked();return;}
      subscribe();}
    pill.addEventListener('click',follow);
    $('ypfYes').addEventListener('click',follow);
    $('ypfNo').addEventListener('click',function(){pre.hidden=true;later();});
    pre.addEventListener('click',function(e){if(e.target===pre){pre.hidden=true;later();}});
    $('ypfIosOk').addEventListener('click',function(){ios.hidden=true;});
    ios.addEventListener('click',function(e){if(e.target===ios)ios.hidden=true;});
    $('ypfCopy').addEventListener('click',function(){try{navigator.clipboard.writeText(here);toast('Link copied. Paste it in Chrome or Safari.');}catch(e){}wv.hidden=true;});
    wv.addEventListener('click',function(e){if(e.target===wv)wv.hidden=true;});
    $('ypfBlOk').addEventListener('click',function(){location.href=here+'?follow=1';});
    $('ypfBlNo').addEventListener('click',function(){bl.hidden=true;later();});
    $('ypfTyOk').addEventListener('click',function(){ty.hidden=true;});
    $('ypfQx').addEventListener('click',function(){q.hidden=true;});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&anyOpen()){if(!pre.hidden)later();[pre,ios,wv,bl,ty].forEach(function(m){m.hidden=true;});}});

    var isOn=lsGet(FKEY)==='on'||(('Notification' in window)&&Notification.permission==='granted'&&lsGet(FKEY)==='on');
    setOn(isOn);
    /* lift the button above any fixed bar the page already has at the bottom */
    function lift(){if(pill.hidden)return;pill.style.bottom='16px';var r=pill.getBoundingClientRect(),top=innerHeight;
      [r.left+8,r.left+r.width/2,r.right-8].forEach(function(x){(d.elementsFromPoint?d.elementsFromPoint(x,r.top+r.height/2):[]).forEach(function(el){
        if(el===pill||pill.contains(el)||el===d.body||el===d.documentElement)return;var n=el;
        while(n&&n!==d.body){var ps=getComputedStyle(n).position;if(ps==='fixed'||ps==='sticky'){var rr=n.getBoundingClientRect();if(rr.height<innerHeight*.35&&rr.top>innerHeight*.5&&rr.top<top)top=rr.top;break;}n=n.parentElement;}});});
      if(top<innerHeight)pill.style.bottom=(innerHeight-top+10)+'px';}
    setTimeout(lift,600);setTimeout(lift,2500);addEventListener('resize',lift);
    setTimeout(loadOS,200);
    var via=/[?&]follow=1/.test(location.search);
    if(via){setTimeout(function(){if(lsGet(FKEY)==='on'){toast('You’re already growing with me 🌱');return;}
        if(inApp&&!standalone){wv.hidden=false;return;}
        if(isiOS&&!standalone){try{scrollTo(0,0);}catch(e){}ios.hidden=false;return;}
        if(('Notification' in window)&&Notification.permission==='denied'){blocked();return;}
        pre.hidden=false;},700);}
    else if(!isOn&&Date.now()-(+lsGet(LATER)||0)>7*864e5){
      setTimeout(function(){if(shown||lsGet(FKEY)==='on'||anyOpen())return;shown=true;pre.hidden=false;},standalone?300:3000);}
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',start);else start();
})();
