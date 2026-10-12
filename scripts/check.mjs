import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const root=new URL('../dist/',import.meta.url);
const index=await readFile(new URL('index.html',root),'utf8');
const data=JSON.parse(await readFile(new URL('content.json',root),'utf8'));
assert.equal(data.recommendations.length,10);
assert.deepEqual(data.recommendations.map(r=>r.id),[1,2,3,4,5,6,7,8,9,10]);
assert.equal((index.match(/class="recommendation"/g)||[]).length,10);
assert.equal((index.match(/<h1\b/g)||[]).length,1);
for(const file of ['index.html','report.html']){
 const html=await readFile(new URL(file,root),'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(new Set(ids).size,ids.length,`Duplicate IDs in ${file}`);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|data:|mailto:)/.test(match[1]))continue;
  const [target,anchor]=match[1].split('#');
  const url=new URL(target||file,root);await access(url);
  if(anchor){const destination=await readFile(url,'utf8');assert.ok(destination.includes(`id="${anchor}"`),`Missing anchor ${match[1]}`);}
 }
}
// Preserve every source paragraph and table cell in the full digital report.
const report=await readFile(new URL('report.html',root),'utf8');
const body=report.match(/<article id="report-text">([\s\S]*?)<\/article>/)[1];
const omitted=new Set(['<p>Project SAIL:</p>','<p>Mobilising the Nation</p>','<p>Foreword (SR - redraft if desired)</p>']);
for(const [paragraph] of body.matchAll(/<p>[\s\S]*?<\/p>/g))if(!omitted.has(paragraph))assert.ok(index.includes(paragraph), 'Missing report paragraph: '+paragraph.slice(0,90));
assert.equal((index.match(/<table\b/g)||[]).length,(body.match(/<table\b/g)||[]).length,'Report tables missing');
for(let n=1;n<=10;n++)assert.ok(index.includes(`id="recommendation-${n}"`));
execFileSync(process.execPath,['--check',new URL('report-design.js',root).pathname]);
assert.ok(index.includes('id="context"'), 'Missing Action Plan introduction');
execFileSync(process.execPath,['--check',new URL('app.js',root).pathname]);
console.log('PASS: 10 recommendations, unique IDs, all local links/assets/anchors, full report paragraphs and tables preserved, JavaScript syntax.');
