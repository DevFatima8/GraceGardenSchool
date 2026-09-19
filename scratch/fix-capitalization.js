const fs = require('fs');
const path = require('path');

// 1. Fix CSS / SCSS files
const cssFiles = [
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\style.css',
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\section\\_header.scss',
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\default\\_common.scss',
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\section\\_page.scss',
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\section\\_subscribe.scss',
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\section\\_blog.scss',
  'd:\\heapware\\GraceGardenSchool\\public\\assets\\sass\\section\\_banner.scss'
];

cssFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace text-transform: uppercase with text-transform: none (or capitalize where appropriate)
    const updated = content.replace(/text-transform:\s*uppercase;/gi, 'text-transform: none;');
    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated uppercase in stylesheet: ${filePath}`);
    }
  }
});

// 2. Remove '' class from all .jsx files in app/ and components/
function removeTextUppercase(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        removeTextUppercase(fullPath);
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('')) {
        content = content.replace(/\s*/g, '');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Removed from: ${fullPath}`);
      }
    }
  }
}

removeTextUppercase('d:\\heapware\\GraceGardenSchool\\app');
removeTextUppercase('d:\\heapware\\GraceGardenSchool\\components');
removeTextUppercase('d:\\heapware\\GraceGardenSchool\\scratch');

console.log('Capitalization / Uppercase fix complete!');
