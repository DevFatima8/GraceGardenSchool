const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('C:\\Users\\RAMZAN\\.gemini\\antigravity-ide\\brain\\a97c8811-9dbd-4ed7-ae3e-7fd348e12470\\.system_generated\\steps\\220\\content.md', 'utf8');

// Find all nav or menu tags
const navMatches = content.match(/<nav[\s\S]*?<\/nav>/gi) || [];
console.log('Nav tags found:', navMatches.length);

navMatches.forEach((nav, i) => {
  console.log(`--- NAV ${i} ---`);
  // Extract links and texts
  const linkMatches = [...nav.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  linkMatches.forEach(m => {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      console.log(`${text} -> ${m[1]}`);
    }
  });
});

// Also search for menu classes like menu-item, sub-menu, etc.
const menuMatches = content.match(/<ul[^>]*class=["'][^"']*(?:menu|nav)[^"']*["'][\s\S]*?<\/ul>/gi) || [];
console.log('\nMenu UL tags found:', menuMatches.length);
menuMatches.forEach((ul, i) => {
  console.log(`--- MENU UL ${i} ---`);
  const linkMatches = [...ul.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  linkMatches.forEach(m => {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      console.log(`${text} -> ${m[1]}`);
    }
  });
});
