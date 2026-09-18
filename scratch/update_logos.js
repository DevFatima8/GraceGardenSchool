const fs = require('fs');
const path = require('path');

function findAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findAndReplace(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            if (content.includes('logo-1.png')) {
                content = content.replace(/logo-1\.png/g, 'logo-1.jpg');
                updated = true;
            }
            if (content.includes('logo-2.png')) {
                content = content.replace(/logo-2\.png/g, 'logo-2.jpg');
                updated = true;
            }
            if (updated) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

findAndReplace(path.join(process.cwd(), 'components'));
findAndReplace(path.join(process.cwd(), 'app'));
