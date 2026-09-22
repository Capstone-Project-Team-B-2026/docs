#!/usr/bin/env node
/**
 * Static coverage audit for Nexus Ops Figma plugin generators.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');

function read(p) {
  return fs.readFileSync(path.join(src, p), 'utf8');
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (name.endsWith('.js')) acc.push(full);
  }
  return acc;
}

const idsSrc = read('catalog/ids.js');
const mobileIds = [...idsSrc.matchAll(/\['(M-[A-Z0-9]+)'/g)].map((m) => m[1]);
const webIds = [...idsSrc.matchAll(/\['(W-[A-Z0-9]+)'/g)].map((m) => m[1]);

const allSource = walk(src).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const genSrc = read('generate.js');

let failed = false;
function fail(msg) {
  failed = true;
  console.log('  ✗', msg);
}
function pass(msg) {
  console.log('  ✓', msg);
}

const missing = [];
const implemented = [];
for (const id of [...mobileIds, ...webIds]) {
  const re = new RegExp("put\\('" + id + "'");
  if (re.test(allSource)) implemented.push(id);
  else missing.push(id);
}

const putMobile = [...allSource.matchAll(/put\('(M-[A-Z0-9]+)'/g)].map((m) => m[1]);
const putWeb = [...allSource.matchAll(/put\('(W-[A-Z0-9]+)'/g)].map((m) => m[1]);
const dupes = [...putMobile, ...putWeb].filter((id, i, arr) => arr.indexOf(id) !== i);

console.log('=== Nexus Ops Figma Plugin Audit ===');
console.log('Catalog mobile:', mobileIds.length);
console.log('Catalog web:', webIds.length);
console.log('Implemented mobile puts:', putMobile.length);
console.log('Implemented web puts:', putWeb.length);

if (missing.length) fail('Missing screens: ' + missing.join(', '));
else pass('All M-* / W-* IDs implemented');

if (dupes.length) fail('Duplicate put() IDs: ' + [...new Set(dupes)].join(', '));
else pass('No duplicate put() IDs');

if (mobileIds.length !== 26) fail('Expected 26 M-* got ' + mobileIds.length);
else pass('26 mobile screens in catalog');

if (webIds.length !== 18) fail('Expected 18 W-* got ' + webIds.length);
else pass('18 web screens in catalog');

if (!genSrc.includes('placeMobile') || !genSrc.includes('ROW_GUTTER')) {
  fail('generate.js missing measured placeMobile / ROW_GUTTER');
} else {
  pass('Measured placement + ROW_GUTTER present');
}

if (!genSrc.includes('findCanvasOverlaps')) fail('Missing overlap check');
else pass('Canvas overlap check present');

if (failed) {
  console.log('\nFAILED');
  process.exit(1);
}
console.log('\nPASSED');
