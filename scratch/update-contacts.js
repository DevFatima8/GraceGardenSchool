const fs = require('fs');
const path = require('path');

function replaceInDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        replaceInDir(fullPath);
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      if (content.includes('gracegardenschoollahore@gmail.com')) {
        content = content.replace(/gracegardenschoollahore@gmail\.com/g, 'Gracegarden042@gmail.com');
        changed = true;
      }
      if (content.includes('0300-4740054')) {
        content = content.replace(/0300-4740054/g, '+92 300 406 6340');
        changed = true;
      }
      if (content.includes('0321-4822765')) {
        content = content.replace(/0321-4822765/g, '+92 316 440 8633');
        changed = true;
      }
      if (content.includes('042-35111166')) {
        content = content.replace(/042-35111166/g, '+92 300 406 6340');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated contact info in: ${fullPath}`);
      }
    }
  }
}

replaceInDir('d:\\heapware\\GraceGardenSchool\\app');
replaceInDir('d:\\heapware\\GraceGardenSchool\\components');
console.log('Finished updating all contact references.');
