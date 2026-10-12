import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../dist/',import.meta.url);
const source=await readFile(new URL('report.html',root),'utf8');
const body=source.match(/<article id="report-text">([\s\S]*?)<\/article>/)?.[1];
if(!body)throw new Error('Full report source missing');
const parts=body.split(/<h2>(.*?)<\/h2>/);
const ids=['summary','context','assessment','approach','compact','recommendations','references'];
const labels=['Executive summary','Changing context','Progress assessment','From sprints to mobilisation','A Prosperity Compact','Ten recommendations','References'];
const chapters=[['foreword','Foreword',parts[0].replace(/^<p>Project SAIL:<\/p><p>Mobilising the Nation<\/p><p>Foreword \(SR - redraft if desired\)<\/p>/,'')]];
for(let i=1;i<parts.length;i+=2){let n=(i-1)/2;chapters.push([ids[n],labels[n],parts[i+1]]);}
if(chapters.length!==8)throw new Error('Report chapter structure changed; update the chapter map before publishing');
const numbers=['F','E','01','02','03','04','05','R'];
const sections=chapters.map(([id,label,source],i)=>{
 let content=source;
 if(id==='recommendations'){
  const recs=source.split(/<h3 id="recommendation-(\d+)">(.*?)<\/h3>/);
  content=recs[0]+'<div class="reading-controls"><button type="button" id="expand-all">Expand all recommendations</button><button type="button" id="collapse-all">Collapse all</button></div>';
  for(let j=1;j<recs.length;j+=3){const [n,title,copy]=recs.slice(j,j+3);content+=`<details class="recommendation" id="recommendation-${n}"><summary><span class="rec-number">${n.padStart(2,'0')}</span><span>${title.replace(/^\d+\.\s*/,'')}</span><span class="toggle" aria-hidden="true">+</span></summary><div class="rec-copy">${copy}</div></details>`;}
 }
 if(id==='assessment'){
  const graphic='<figure class="assessment-visual" aria-label="Assessment of 50 recommendations: 14 substantial progress, 27 early activity, 6 weak or short of ask, 3 lack of information"><figcaption>50 recommendations. Four stages of progress.</figcaption><div class="assessment-bars" aria-hidden="true"><i style="--share:28%;--tone:#6335be"></i><i style="--share:54%;--tone:#aa91cd"></i><i style="--share:12%;--tone:#d5c8e7"></i><i style="--share:6%;--tone:#ece6f4"></i></div><div class="assessment-key"><div><strong>14</strong><span>Substantial progress</span></div><div><strong>27</strong><span>Early activity</span></div><div><strong>6</strong><span>Weak or short of ask</span></div><div><strong>3</strong><span>Lack of information</span></div></div></figure>';
  content=content.replace('<h3>The assessment</h3>','<h3>The assessment</h3>'+graphic);
 }
 if(id==='assessment'){if(!content.includes('<h3>The fifty recommendations</h3>'))throw new Error('Assessment heading missing');content=content.replace('<h3>The fifty recommendations</h3>','<details class="evidence"><summary>Explore the assessment of all 50 recommendations</summary><div class="evidence-body">')+'</div></details>';}
 content=content.replace(/<table(.*?)>([\s\S]*?)<\/table>/g,'<div class="table-scroll" tabindex="0" role="region" aria-label="Report table"><table$1>$2</table></div>');
 return `<details class="chapter" id="${id}" aria-labelledby="${id}-title"><summary class="chapter-heading"><span class="section-number">${numbers[i]}</span><h2 id="${id}-title">${label}</h2><span class="chapter-toggle" aria-hidden="true">+</span></summary><div class="prose">${content}</div></details>`;
}).join('');
const file=new URL('index.html',root);let index=await readFile(file,'utf8');
if(!index.includes('<!-- REPORT START -->')||!index.includes('<!-- REPORT END -->'))throw new Error('Report insertion markers missing');
index=index.replace(/<!-- REPORT START -->[\s\S]*?<!-- REPORT END -->/,'<!-- REPORT START -->'+sections+'<!-- REPORT END -->');
await writeFile(file,index);console.log('Built the full digital report from dist/report.html.');
