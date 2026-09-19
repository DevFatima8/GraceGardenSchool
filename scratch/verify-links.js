const fs = require('fs');
const path = require('path');

const menuFile = fs.readFileSync('d:\\heapware\\GraceGardenSchool\\components\\layout\\headers\\header-menu.jsx', 'utf8');
const appDir = 'd:\\heapware\\GraceGardenSchool\\app';

const linkMatches = [...menuFile.matchAll(/href=['"]([^'"]+)['"]/g)].map(m => m[1]);
const uniqueHrefs = [...new Set(linkMatches)];

console.log(`Found ${uniqueHrefs.length} unique hrefs in header-menu.jsx:`);

let missing = 0;
uniqueHrefs.forEach(href => {
  if (href === '#' || href === '/') return;
  
  const cleanHref = href.split('#')[0].replace(/^\//, '');
  if (!cleanHref) return; // e.g. /#history or /
  
  const pagePath = path.join(appDir, cleanHref, 'page.jsx');
  const exists = fs.existsSync(pagePath);
  
  if (!exists) {
    console.log(`❌ MISSING PAGE for href "${href}" -> checked: ${pagePath}`);
    missing++;
  } else {
    console.log(`✅ OK: ${href} -> exists at app/${cleanHref}/page.jsx`);
  }
});

console.log(`\nTotal checked. Missing: ${missing}`);
