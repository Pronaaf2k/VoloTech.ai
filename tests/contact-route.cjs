/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test harness loads the TypeScript route. */
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const path = require('node:path');
const filename = path.resolve('app/api/contact/route.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = new Module(filename, module); mod.filename = filename; mod.paths = Module._nodeModulePaths(path.dirname(filename)); mod._compile(compiled, filename);
const { POST } = mod.exports;
const originalFetch = global.fetch;
const originalEndpoint = process.env.CONTACT_API_URL;
after(() => { global.fetch = originalFetch; if (originalEndpoint === undefined) delete process.env.CONTACT_API_URL; else process.env.CONTACT_API_URL = originalEndpoint; });
const valid = { name: 'Website QA', email: 'qa@example.com', interest: 'Technical support or maintenance', message: 'Local test enquiry, do not deliver.' };
const request = (body, type = 'application/json') => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': type }, body: JSON.stringify(body) });
test('rejects unsupported content and invalid payloads', async () => {
 assert.equal((await POST(request(valid, 'text/plain'))).status, 415);
 for (const body of [null, [], {}, {...valid,email:'invalid'}, {...valid,message:'short'}, {...valid,name:' '}]) assert.equal((await POST(request(body))).status, 400);
});
test('does not claim delivery without endpoint', async () => { delete process.env.CONTACT_API_URL; assert.equal((await POST(request(valid))).status, 503); });
test('forwards validated fields and confirms only accepted delivery', async () => {
 process.env.CONTACT_API_URL = 'https://example.invalid/test';
 let forwarded;
 global.fetch = async (_url, options) => { forwarded = JSON.parse(options.body); return new Response(null, {status:204}); };
 assert.equal((await POST(request(valid))).status, 201);
 assert.equal(forwarded.interest, valid.interest); assert.equal(forwarded.source, 'volotech-ai-website');
 global.fetch = async () => new Response(null, {status:500}); assert.equal((await POST(request(valid))).status, 502);
 global.fetch = async () => { throw new Error('offline'); }; assert.equal((await POST(request(valid))).status, 502);
});

