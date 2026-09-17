/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ channel: 'msedge', headless: true });
 const page = await browser.newPage({ reducedMotion: 'reduce' });
 const report=[]; const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 for(const width of [390,768,1440]) {
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/services','/work','/how-we-work','/support','/contact']) {
   await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3001')+route); await page.evaluate(()=>document.fonts.ready); if(route==='/') await page.waitForTimeout(1200);
   await page.addScriptTag({path:process.env.AXE_SCRIPT || require.resolve('axe-core/axe.min.js')});
   const audit=await page.evaluate(async()=>({overflow:document.documentElement.scrollWidth>innerWidth,font:getComputedStyle(document.querySelector('h1')).fontFamily,h1:document.querySelector('h1').getBoundingClientRect().toJSON(),violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}));
   report.push({width,route,...audit});
   await page.screenshot({path:`tests/redesign-${width}-${route==='/'?'home':route.slice(1)}.png`,fullPage:true});
  }
 }
 await page.setViewportSize({width:390,height:844}); await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3001'));
 await page.keyboard.press('Tab'); assert.equal(await page.locator(':focus').textContent(),'Skip to main content');
 await page.getByRole('button',{name:'Open menu',exact:true}).click(); assert.equal(await page.locator('#mobile-menu').isVisible(),true);
 await page.keyboard.press('Escape'); assert.equal(await page.locator('#mobile-menu').isVisible(),false); assert.equal(await page.locator(':focus').getAttribute('aria-label'),'Open menu');
 await page.getByRole('button',{name:'Open menu',exact:true}).click(); await page.locator('#mobile-menu').getByRole('link',{name:'Contact',exact:true}).click(); await page.waitForURL('**/contact');
 await page.getByRole('button',{name:'Send enquiry'}).click(); assert.equal(await page.locator('input[name=name]').evaluate(e=>e.validity.valueMissing),true);
 await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3001')+'/contact?interest=Technical%20support%20or%20maintenance');
 await page.waitForFunction(()=>document.querySelector('select').value==='Technical support or maintenance');
 await page.getByLabel('Full name').fill('Local QA'); await page.getByLabel('Email *',{exact:true}).fill('qa@example.com'); await page.getByLabel('Tell us about it').fill('A local mocked enquiry to verify form feedback.');
 await page.route('**/api/contact', r=>r.fulfill({status:503,contentType:'application/json',body:JSON.stringify({message:'Test service unavailable. Your details are still in the form.'})}));
 await page.getByRole('button',{name:'Send enquiry'}).click(); await page.getByRole('status').filter({hasText:'Test service unavailable'}).waitFor(); assert.equal(await page.getByLabel('Full name').inputValue(),'Local QA');
 await page.route('**/api/contact',async r=>{await new Promise(resolve=>setTimeout(resolve,400));await r.fulfill({status:201,contentType:'application/json',body:JSON.stringify({message:'Test enquiry accepted.'})});});
 await page.getByRole('button',{name:'Send enquiry'}).click(); assert.equal(await page.getByRole('button',{name:'Sending...'}).isDisabled(),true); await page.getByRole('status').filter({hasText:'Test enquiry accepted'}).waitFor(); assert.equal(await page.getByLabel('Full name').inputValue(),'');
 await page.getByRole('button',{name:'Open VoloTech assistant'}).click(); assert.equal(await page.getByRole('dialog').isVisible(),true); await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').isVisible(),false);
 await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3001')+'/how-we-work');await page.getByText('Can you work on a system we already have?',{exact:false}).click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
 await page.emulateMedia({colorScheme:'dark'}); await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3001'));await page.screenshot({path:'tests/redesign-dark.png',fullPage:true});
 await page.addScriptTag({path:process.env.AXE_SCRIPT || require.resolve('axe-core/axe.min.js')});
 report.push({mode:'dark',violations:await page.evaluate(async()=>(await axe.run()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))});
 fs.writeFileSync('tests/redesign-audit.json',JSON.stringify({report,errors,interactions:'passed'},null,2));
 assert.equal(report.some(x=>x.overflow),false); assert.equal(report.some(x=>x.violations.length),false); assert.deepEqual(errors,[]);
 console.log(JSON.stringify({checks:report.length,overflow:report.filter(x=>x.overflow),violations:report.filter(x=>x.violations.length),errors,interactions:'passed'},null,2));await browser.close();
})();


