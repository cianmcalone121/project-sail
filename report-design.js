const recommendations=[...document.querySelectorAll('.recommendation')];
document.querySelector('#expand-all')?.addEventListener('click',()=>recommendations.forEach(item=>item.open=true));
document.querySelector('#collapse-all')?.addEventListener('click',()=>recommendations.forEach(item=>item.open=false));
function revealAnchor(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const target=document.getElementById(id);if(!target)return;for(let p=target;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;requestAnimationFrame(()=>target.scrollIntoView());}
window.addEventListener('hashchange',revealAnchor);if(location.hash)revealAnchor();
const links=[...document.querySelectorAll('.contents nav a')];
const sections=links.map(link=>document.querySelector(link.getAttribute('href')));
let scheduled=false;
function updateReading(){scheduled=false;const available=document.documentElement.scrollHeight-innerHeight;const progress=available>0?Math.round(scrollY/available*100):100;document.querySelector('#progress').value=progress;document.querySelector('#progress-label').textContent=`${progress}% read`;let current=0;sections.forEach((section,i)=>{if(section.getBoundingClientRect().top<=180)current=i;});links.forEach((link,i)=>{if(i===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateReading);}},{passive:true});window.addEventListener('resize',updateReading);document.addEventListener('toggle',updateReading,true);updateReading();
window.addEventListener('beforeprint',()=>{document.querySelectorAll('details').forEach(item=>{item.dataset.wasOpen=String(item.open);item.open=true;});});window.addEventListener('afterprint',()=>{document.querySelectorAll('details').forEach(item=>{item.open=item.dataset.wasOpen==='true';delete item.dataset.wasOpen;});});
