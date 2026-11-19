/* Career Unlock: certificate + share card, shown automatically after a result is unlocked */
(function(){
 var d=document,MA='#8a1c2b',GD='#c9a24a',NV='#1d2540',INFO=null,IM={},READY=null;
 var css='.cuc{margin:18px 0 6px;padding:20px 18px;border-radius:20px;border:1px solid rgba(226,184,92,.55);background:linear-gradient(135deg,rgba(226,184,92,.16),rgba(23,20,20,.7) 60%);text-align:center}'+
 '.cuc h3{margin:0 0 4px;font-family:var(--serif);font-weight:400;font-size:24px;color:var(--gold2,#F6DFA4)}.cuc p{margin:4px 0 12px;color:var(--muted,#A39A94);font-size:14px}'+
 '.cuc input{width:100%;max-width:360px;box-sizing:border-box;padding:13px 14px;border-radius:12px;border:1px solid var(--line2,#3A2E2E);background:#0f0d0d;color:var(--ink,#F4EFEA);font:600 16px var(--sans,system-ui);text-align:center}'+
 '.cuc input.err{border-color:#E3161E;box-shadow:0 0 0 3px rgba(227,22,30,.25)}'+
 '.cuc .cb{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px}.cuc .cb button{border:0;border-radius:14px;padding:14px 18px;font:800 15px var(--sans,system-ui);cursor:pointer}'+
 '.cuc .g{background:var(--gold,#E2B85C);color:#241a05}.cuc .r{background:#E3161E;color:#fff}.cuc .w{background:#1f8f4e;color:#fff}.cuc small{display:block;margin-top:10px;color:var(--dim,#6F6661);font-size:12px}';
 var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);
 var fl=d.createElement('link');fl.rel='stylesheet';fl.href='https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Herr+Von+Muellerhoff&display=swap';d.head.appendChild(fl);
 function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}
 function guessName(){var n=ls('yp_cu_name');if(n)return n;try{var o=JSON.parse(ls('yp_fit_v2')||'null');if(o&&o.name)return o.name}catch(e){}return ''}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function img(src){return new Promise(function(r){var i=new Image();i.onload=function(){r(i)};i.onerror=function(){r(null)};i.src=src})}
 function prep(){if(READY)return READY;var f=['700 40px Cinzel','400 60px "DM Serif Display"','italic 400 30px "DM Serif Display"','700 21px Manrope','800 40px Manrope','500 13px "JetBrains Mono"','400 170px "Herr Von Muellerhoff"'];
  READY=Promise.all(f.map(function(x){return d.fonts&&d.fonts.load?d.fonts.load(x).catch(function(){}):0})).then(function(){return img('logo-badge.png')}).then(function(a){IM.logo=a;
   return window.qrcode?0:new Promise(function(ok){var s=d.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';s.onload=ok;s.onerror=ok;d.head.appendChild(s)})});return READY}
 function fitF(x,t,font,size,maxW){var s=size;do{x.font=font.replace('#',s)}while(x.measureText(t).width>maxW&&--s>16);return s}
 function spaced(x,t,cx,y,sp){var w=0,c,i,a=[...t];for(i=0;i<a.length;i++)w+=x.measureText(a[i]).width+sp;w-=sp;var px=cx-w/2;x.textAlign='left';for(i=0;i<a.length;i++){x.fillText(a[i],px,y);px+=x.measureText(a[i]).width+sp}x.textAlign='center'}
 function gold(x,x0,y0,x1,y1){var g=x.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#f7e19a');g.addColorStop(.35,'#c9a24a');g.addColorStop(.6,'#f3d77f');g.addColorStop(1,'#94681a');return g}
 function wrap(x,t,maxW){var w=t.split(' '),L=[],cur='';w.forEach(function(s){var tr=cur?cur+' '+s:s;if(x.measureText(tr).width>maxW&&cur){L.push(cur);cur=s}else cur=tr});if(cur)L.push(cur);return L}
 function qr(x,text,X,Y,size){if(!window.qrcode)return;var q=qrcode(0,'M');q.addData(text);q.make();var n=q.getModuleCount(),m=size/(n+2);x.fillStyle='#fffdf6';x.fillRect(X,Y,size,size);x.fillStyle=NV;for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))x.fillRect(X+(c+1)*m,Y+(r+1)*m,m+.4,m+.4)}
 function today(){var t=new Date(),m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return t.getDate()+' '+m[t.getMonth()]+' '+t.getFullYear()}
 function combo(){return INFO.sp.map(function(s){return s.n}).join(' × ')}
 function sig(x,X,Y){x.save();x.fillStyle=x.strokeStyle='#1b3a9a';x.font='400 120px "Herr Von Muellerhoff"';x.textAlign='center';x.textBaseline='alphabetic';x.translate(X,Y);x.rotate(-4*Math.PI/180);x.fillText('Bikram Paul',0,0);x.lineWidth=2;x.beginPath();x.moveTo(-190,22);x.bezierCurveTo(-60,12,80,6,200,-10);x.stroke();x.restore()}

 function drawCert(name){var c=d.createElement('canvas');c.width=1240;c.height=1754;var x=c.getContext('2d'),W=1240,H=1754;
  var g=x.createRadialGradient(W/2,H*.42,50,W/2,H*.42,1100);g.addColorStop(0,'#fffdf6');g.addColorStop(.7,'#f6eedb');g.addColorStop(1,'#ecdfbf');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.strokeStyle=MA;x.lineWidth=6;x.strokeRect(70,70,W-140,H-140);x.strokeStyle=gold(x,0,0,W,H);x.lineWidth=2.5;x.strokeRect(86,86,W-172,H-172);
  x.textAlign='center';x.textBaseline='alphabetic';
  x.fillStyle=MA;x.font='700 40px Cinzel';spaced(x,'YOUNGPROFESSOR.IN',W/2,230,8);
  x.fillStyle='#8a6a2a';x.font='700 22px Cinzel';spaced(x,'CAREER UNLOCK  🔓',W/2,290,8);
  x.fillStyle=MA;fitF(x,'Certificate of Exploration','400 #px "DM Serif Display"',96,1020);x.fillText('Certificate of Exploration',W/2,420);
  x.fillStyle='#5b6378';x.font='italic 400 32px "DM Serif Display"';x.fillText('This is to certify that',W/2,520);
  x.fillStyle=NV;fitF(x,name,'400 #px "DM Serif Display"',92,980);x.fillText(name,W/2,640);
  g=x.createLinearGradient(W/2-300,0,W/2+300,0);g.addColorStop(0,'rgba(201,162,74,0)');g.addColorStop(.5,GD);g.addColorStop(1,'rgba(201,162,74,0)');x.fillStyle=g;x.fillRect(W/2-300,676,600,2);
  x.fillStyle='#5b6378';x.font='italic 400 30px "DM Serif Display"';x.fillText('has completed Career Unlock and explored the career doors opened by',W/2,740);
  x.fillStyle=MA;fitF(x,combo(),'400 #px "DM Serif Display"',72,1000);x.fillText(combo(),W/2,830);
  x.fillStyle='#8a6a2a';fitF(x,INFO.title,'italic 400 #px "DM Serif Display"',40,1000);x.fillText(INFO.title,W/2,890);
  var cols=[['DOORS UNLOCKED',String(INFO.total)],['PATHS EXPLORED',INFO.sp.length===2?'Combination':'Specialisation'],['ISSUED',today()]];
  var cw=[360,360,360],cx=W/2-540;cols.forEach(function(col,i){var mid=cx+cw[i]/2;x.fillStyle='#8a6a2a';x.font='500 15px "JetBrains Mono"';spaced(x,col[0],mid,990,3);x.fillStyle=NV;x.font='700 30px Manrope';x.fillText(col[1],mid,1035);cx+=cw[i]});
  x.fillStyle='#8a6a2a';x.font='500 15px "JetBrains Mono"';spaced(x,'ROLES TO EXPLORE FIRST',W/2,1110,3);
  x.fillStyle=NV;x.font='600 26px Manrope';var ry=1152;INFO.roles.slice(0,3).forEach(function(r){var L=wrap(x,'✦ '+r,960);L.slice(0,2).forEach(function(l){x.fillText(l,W/2,ry);ry+=36})});
  sig(x,W/2,1390);x.fillStyle=NV;x.fillRect(W/2-220,1420,440,1.5);x.font='700 24px Manrope';x.fillText('Dr. Bikram Paul Singh Lehri',W/2,1458);x.fillStyle='#5b6378';x.font='500 15px Manrope';spaced(x,'PROFESSOR & MENTOR · FOUNDER',W/2,1486,2);
  var lx=210,ly=1440;x.fillStyle=MA;x.beginPath();x.arc(lx,ly,62,0,7);x.fill();x.fillStyle=GD;x.beginPath();x.arc(lx,ly,59,0,7);x.fill();x.fillStyle='#fffaf0';x.beginPath();x.arc(lx,ly,56,0,7);x.fill();
  if(IM.logo){x.save();x.beginPath();x.arc(lx,ly,52,0,7);x.clip();x.drawImage(IM.logo,lx-52,ly-52,104,104);x.restore()}
  qr(x,'https://youngprofessor.in/career-unlock.html',968,1378,112);x.fillStyle='#5b6378';x.font='500 14px "JetBrains Mono"';x.fillText('Scan to explore',1024,1514);
  x.fillStyle=MA;x.font='italic 400 27px "DM Serif Display"';x.fillText('"You bring the dreams, I\'ll bring the push."',W/2,1586);
  x.fillStyle='#8a7f6a';x.font='400 14px Manrope';x.fillText('Career Unlock is a guidance tool for exploring jobs in India. It is not a job offer or a qualification.',W/2,1630);
  return c}

 function drawCard(name){var c=d.createElement('canvas');c.width=1080;c.height=1350;var x=c.getContext('2d'),W=1080;
  var g=x.createRadialGradient(W/2,260,40,W/2,500,1000);g.addColorStop(0,'#3a1214');g.addColorStop(.55,'#140f0f');g.addColorStop(1,'#0b0a0a');x.fillStyle=g;x.fillRect(0,0,W,1350);
  x.strokeStyle='rgba(226,184,92,.55)';x.lineWidth=3;x.strokeRect(40,40,W-80,1270);
  x.textAlign='center';x.textBaseline='alphabetic';
  if(IM.logo){x.fillStyle='#E3161E';x.beginPath();x.arc(W/2,150,58,0,7);x.fill();x.save();x.beginPath();x.arc(W/2,150,53,0,7);x.clip();x.drawImage(IM.logo,W/2-53,97,106,106);x.restore()}
  x.font='400 40px "DM Serif Display"';var a=x.measureText('young').width,b=x.measureText('professor').width,cc=x.measureText('.in').width,sx=W/2-(a+b+cc)/2;x.textAlign='left';
  x.fillStyle='#F4EFEA';x.fillText('young',sx,262);x.fillStyle='#E3161E';x.fillText('professor',sx+a,262);x.fillStyle='#F4EFEA';x.fillText('.in',sx+a+b,262);x.textAlign='center';
  x.fillStyle='#E2B85C';x.font='500 24px "JetBrains Mono"';spaced(x,'CAREER UNLOCK 🔓',W/2,340,6);
  x.fillStyle='#F4EFEA';fitF(x,name,'400 #px "DM Serif Display"',76,900);x.fillText(name,W/2,440);
  x.fillStyle='#A39A94';x.font='600 32px Manrope';x.fillText('just unlocked',W/2,500);
  x.fillStyle='#F6DFA4';x.font='400 190px "DM Serif Display"';x.fillText(String(INFO.total),W/2,690);
  x.fillStyle='#F4EFEA';x.font='800 40px Manrope';x.fillText('career doors',W/2,750);
  x.fillStyle='#E2B85C';fitF(x,combo(),'italic 400 #px "DM Serif Display"',54,900);x.fillText(combo(),W/2,840);
  x.fillStyle='#A39A94';fitF(x,INFO.title,'italic 400 #px "DM Serif Display"',34,900);x.fillText(INFO.title,W/2,892);
  x.fillStyle='#F4EFEA';x.font='600 30px Manrope';var ry=975;INFO.roles.slice(0,3).forEach(function(r){var L=wrap(x,'✦ '+r,880);x.fillText(L[0]+(L.length>1?'…':''),W/2,ry);ry+=50});
  x.fillStyle='#E3161E';var bw=760,bx=W/2-bw/2;x.beginPath();x.roundRect?x.roundRect(bx,1150,bw,86,43):x.rect(bx,1150,bw,86);x.fill();
  x.fillStyle='#fff';x.font='800 32px Manrope';x.fillText('Unlock yours free → youngprofessor.in',W/2,1205);
  x.fillStyle='#E2B85C';x.font='600 26px Manrope';x.fillText('🌱 Let\'s grow together',W/2,1280);
  return c}

 function fname(n){return (n||'student').trim().replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'')||'student'}
 function dl(blob,nm){var a=d.createElement('a');a.href=URL.createObjectURL(blob);a.download=nm;d.body.appendChild(a);a.click();a.remove()}
 function blob(c){return new Promise(function(r){c.toBlob(r,'image/png')})}
 function getName(){var i=d.getElementById('cucName'),n=(i.value||'').trim();if(!n){i.classList.add('err');i.focus();i.placeholder='Type your name first';return null}i.classList.remove('err');ls('yp_cu_name',n);return n}
 function busy(b,t){var o=b.textContent;b.textContent=t;b.disabled=true;return function(){b.textContent=o;b.disabled=false}}
 function cap(){return 'I just unlocked '+INFO.total+' career doors with '+combo()+' 🔓\nSee what your specialisation unlocks, free 👉 https://youngprofessor.in/career-unlock.html\n🌱 Let\'s grow together'}

 async function doCert(){var n=getName();if(!n)return;var b=d.getElementById('cucPdf'),done=busy(b,'Preparing…');
  try{await prep();var c=drawCert(n);
   try{if(!window.jspdf)await new Promise(function(ok,no){var s=d.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';s.onload=ok;s.onerror=no;d.head.appendChild(s)});
    var pdf=new window.jspdf.jsPDF({orientation:'portrait',unit:'mm',format:'a4'});pdf.addImage(c.toDataURL('image/jpeg',.95),'JPEG',0,0,210,297);pdf.setProperties({title:'Career Unlock Certificate - '+n,author:'youngprofessor.in'});pdf.save('Career-Unlock-Certificate-'+fname(n)+'.pdf')}
   catch(e){dl(await blob(c),'Career-Unlock-Certificate-'+fname(n)+'.png')}}
  finally{done()}}
 async function doCard(share){var n=getName();if(!n)return;var b=d.getElementById(share?'cucWa':'cucCard'),done=busy(b,'Preparing…');
  try{await prep();var bl=await blob(drawCard(n)),nm='career-unlock-'+fname(n)+'.png';
   if(share){var f=new File([bl],nm,{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:cap()});return}catch(e){if(e.name==='AbortError')return}}
    dl(bl,nm);window.open('https://wa.me/?text='+encodeURIComponent(cap()),'_blank')}
   else dl(bl,nm)}
  finally{done()}}

 window.ypCU=function(root,info){INFO=info;prep();
  var box=d.createElement('div');box.className='cuc';box.id='cuc';
  box.innerHTML='<h3>🎉 Unlocked! Get your certificate &amp; card</h3><p>Free. Type your name, then download. Made on your phone, nothing is uploaded.</p>'+
   '<input id="cucName" maxlength="40" autocomplete="name" placeholder="Your full name" value="'+esc(guessName())+'">'+
   '<div class="cb"><button type="button" class="g" id="cucPdf">⬇ Download certificate</button><button type="button" class="r" id="cucCard">⬇ Download share card</button><button type="button" class="w" id="cucWa">💬 Share on WhatsApp</button></div>'+
   '<small>Certificate as PDF (A4) · Card as an image for Instagram, WhatsApp and LinkedIn</small>';
  var rh=root.querySelector('.rh');if(rh&&rh.nextSibling)root.insertBefore(box,rh.nextSibling);else root.appendChild(box);
  d.getElementById('cucPdf').onclick=doCert;d.getElementById('cucCard').onclick=function(){doCard(false)};d.getElementById('cucWa').onclick=function(){doCard(true)};
  d.getElementById('cucName').addEventListener('input',function(){this.classList.remove('err')})};
})();
