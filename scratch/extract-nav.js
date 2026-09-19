const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\RAMZAN\\.gemini\\antigravity-ide\\brain\\a97c8811-9dbd-4ed7-ae3e-7fd348e12470\\.system_generated\\steps\\220\\content.md', 'utf8');

const navIdx = content.indexOf('<nav');
console.log('Nav index:', navIdx);

// Search for menu items and their depth
const menuSection = content.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi);
console.log('Total nav sections:', menuSection ? menuSection.length : 0);

if (menuSection) {
  menuSection.forEach((sec, i) => {
    console.log(`\n=== NAV SECTION ${i} === (Length: ${sec.length})`);
    fs.writeFileSync(`d:\\heapware\\GraceGardenSchool\\scratch\\nav_${i}.html`, sec);
  });
}
