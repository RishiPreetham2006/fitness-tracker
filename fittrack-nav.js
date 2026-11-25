/* FitTrack shared navigation, role-aware page access, and session handling. */
(function(){
  const loggedIn=localStorage.getItem('loggedIn')==='true';
  const role=localStorage.getItem('userRole')||'user';
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const userPrivate=['user.html','step.html','water.html','calories.html','sleep.html','weekly-progress.html','profile.html','bmi.html'];
  const adminPage=page==='admin.html';
  const authOnlyPages=['workout.html','plans.html','workout-details.html'];
  if(page==='fitness.html'){location.replace(loggedIn?(role==='admin'?'admin.html':'user.html'):'index.html');return;}
  if(userPrivate.includes(page)&&(!loggedIn||role!=='user')){location.replace('login.html?return='+encodeURIComponent(page));return;}
  if(adminPage&&(!loggedIn||role!=='admin')){location.replace('login.html?return=admin.html');return;}
  if(authOnlyPages.includes(page)&&!loggedIn){location.replace('login.html?return='+encodeURIComponent(page));return;}
  if(!loggedIn)return;
  // Logged-in users/admins must not see a public Home link on private navigation.
  document.querySelectorAll('a[href=\"index.html\"],a[href=\"./index.html\"]').forEach(a=>a.remove());
  // Retain original admin dashboard sidebar and page layout; add shared top navigation.
  const oldHeader=document.querySelector('body > header nav')?.closest('header')||document.querySelector('body > .header nav')?.closest('.header');
  if(oldHeader&&!adminPage)oldHeader.remove();
  document.querySelectorAll('body > header nav, body > .header nav, body > header .login-btn, body > .header .login-btn').forEach(el=>el.remove());
  const css=document.createElement('style');css.textContent=`.fittrack-tabs{position:sticky;top:0;z-index:9999;background:#063b32;color:#f3fff9;box-shadow:0 5px 18px rgba(0,0,0,.12);font-family:system-ui,Arial,sans-serif}.fittrack-tabs-inner{max-width:1250px;margin:auto;padding:10px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}.fittrack-tabs .ft-brand{font-weight:900;font-size:21px;letter-spacing:-.5px;color:#fff;text-decoration:none;white-space:nowrap}.fittrack-tabs .ft-brand span{color:#72e5b5}.fittrack-tabs .ft-links{display:flex;align-items:center;gap:6px;flex:1;flex-wrap:wrap}.fittrack-tabs a.ft-link,.fittrack-tabs button{border:0;color:#d9f4e8;background:transparent;padding:9px 10px;border-radius:9px;font:600 13px system-ui;cursor:pointer;text-decoration:none;transition:background .2s,color .2s,transform .2s}.fittrack-tabs a.ft-link:hover,.fittrack-tabs button:hover{background:#ffffff20;color:#fff;transform:translateY(-1px)}.fittrack-tabs a.ft-link.active{background:#16a875;color:#fff}.fittrack-tabs .ft-role{font-size:11px;font-weight:900;letter-spacing:.5px;border:1px solid #ffffff35;border-radius:999px;padding:6px 9px;color:#a8f0cf;white-space:nowrap}.fittrack-tabs .ft-logout{background:#ffffff15;border:1px solid #ffffff30;color:white}@media(max-width:640px){.fittrack-tabs-inner{gap:8px;padding:9px 10px}.fittrack-tabs .ft-brand{width:100%}.fittrack-tabs .ft-links{gap:3px}.fittrack-tabs a.ft-link,.fittrack-tabs button{padding:8px 9px;font-size:12px}}`;
  document.head.appendChild(css);
  const adminLinks=[['admin.html','Admin Dashboard'],['admin.html#users','Users'],['admin.html#access-today',"Today's Access"],['admin.html#workouts','Manage Workouts'],['admin.html#reports','Reports'],['workout.html','Workout Library'],['plans.html','Plans']];
  const userLinks=[['user.html','Dashboard'],['step.html','Steps'],['water.html','Water'],['calories.html','Calories'],['sleep.html','Sleep'],['bmi.html','BMI'],['weekly-progress.html','Reports'],['workout.html','Workouts'],['profile.html','Profile']];
  let links=role==='admin'?adminLinks:userLinks;
  if((page==='workout.html'||page==='plans.html'||page==='workout-details.html')&&role==='admin')links=adminLinks;
  const roleLabel=role==='admin'?'ADMIN':'USER';
  const nav=document.createElement('div');nav.className='fittrack-tabs';
  nav.innerHTML=`<div class="fittrack-tabs-inner"><a class="ft-brand" href="${role==='admin'?'admin.html':'user.html'}">Fit<span>Track</span></a><div class="ft-links">${links.map(([href,label])=>`<a class="ft-link ${page===href.split('#')[0]?'active':''}" href="${href}">${label}</a>`).join('')}</div><span class="ft-role">${roleLabel}</span><button class="ft-logout" type="button">Log out</button></div>`;
  nav.querySelector('.ft-logout').addEventListener('click',()=>{['loggedIn','userEmail','userRole','userName'].forEach(k=>localStorage.removeItem(k));location.href='index.html';});
  document.body.insertBefore(nav,document.body.firstChild);
})();
