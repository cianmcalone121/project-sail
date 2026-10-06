import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../dist/',import.meta.url);
const data=JSON.parse(await readFile(new URL('content.json',root),'utf8'));
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function RecommendationCard(r){
 const id=Number(r.id);
 if(!Number.isInteger(id)||id<1||id>10)throw new Error('Invalid recommendation ID');
 return `<details class="recommendation" id="action-${id}"><summary><span class="rec-number">${String(id).padStart(2,'0')}</span><span class="rec-heading"><span class="rec-category">${escape(r.compact)}</span><span class="rec-title">${escape(r.title)}</span><span class="rec-summary">${escape(r.summary)}</span></span><span class="rec-toggle" aria-hidden="true"></span></summary><div class="rec-detail"><p>${escape(r.detail)}</p><div class="rec-exchange"><span class="eyebrow">THE RECIPROCAL COMMITMENT</span><p>${escape(r.exchange)}</p></div><dl><div><dt>Accountable</dt><dd>${escape(r.owner)}</dd></div><div><dt>Delivery</dt><dd>${escape(r.timeline)}</dd></div></dl><a class="source-link" href="report.html#recommendation-${id}">Read the full recommendation</a></div></details>`;
}
const file=new URL('index.html',root);let html=await readFile(file,'utf8');
html=html.replace(/(<div class="recommendation-list">)[\s\S]*?(<\/div><p class="caption">Concise summaries)/,(_,start,end)=>start+data.recommendations.map(RecommendationCard).join('\n')+end);
await writeFile(file,html);console.log('Synced recommendation cards from dist/content.json. Static site ready in dist/.');
