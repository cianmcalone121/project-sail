const recommendations=[...document.querySelectorAll('.recommendation')];
document.querySelector('#expand-all')?.addEventListener('click',()=>recommendations.forEach(item=>item.open=true));
document.querySelector('#collapse-all')?.addEventListener('click',()=>recommendations.forEach(item=>item.open=false));
function revealAnchor(hash=location.hash){let id;try{id=decodeURIComponent(hash.slice(1));}catch{return;}if(!id)return;const target=document.getElementById(id);if(!target)return;for(let p=target;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;requestAnimationFrame(()=>target.scrollIntoView());}
// Handle repeated clicks too: hashchange does not fire when the hash is unchanged.
document.addEventListener('click',event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const link=event.target.closest('a[href^="#"]');if(link)revealAnchor(link.getAttribute('href'));});
window.addEventListener('hashchange',()=>revealAnchor());if(location.hash)revealAnchor();
const reportDisclosures=[...document.querySelectorAll('.report-body details')];
document.querySelector('#expand-sections')?.addEventListener('click',()=>reportDisclosures.forEach(item=>item.open=true));
document.querySelector('#collapse-sections')?.addEventListener('click',()=>reportDisclosures.forEach(item=>item.open=false));
document.querySelector('#section-jump')?.addEventListener('change',event=>{const id=event.target.value;if(!id)return;const hash='#'+id;revealAnchor(hash);if(location.hash!==hash)location.hash=hash;event.target.value='';});
window.addEventListener('beforeprint',()=>{document.querySelectorAll('details').forEach(item=>{item.dataset.wasOpen=String(item.open);item.open=true;});});window.addEventListener('afterprint',()=>{document.querySelectorAll('details').forEach(item=>{item.open=item.dataset.wasOpen==='true';delete item.dataset.wasOpen;});});
// A single, subtle chapter accent as each heading enters view.
if('IntersectionObserver' in window){const chapterObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('in-view');chapterObserver.unobserve(entry.target);}},{threshold:.5});document.querySelectorAll('.chapter-heading').forEach(heading=>chapterObserver.observe(heading));}
