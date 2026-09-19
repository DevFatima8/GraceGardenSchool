const fs = require('fs');
const path = require('path');

function findAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findAndReplace(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            const replacements = {
                'logo-3.png': 'logo-1.jpg',
                'logo-4.png': 'logo-1.jpg',
                'logo-5.png': 'logo-2.jpg',
                'logo-6.png': 'logo-1.jpg',
                'logo-7.png': 'logo-2.jpg'
            };

            for (const [oldLogo, newLogo] of Object.entries(replacements)) {
                if (content.includes(oldLogo)) {
                    content = content.replace(new RegExp(oldLogo, 'g'), newLogo);
                    updated = true;
                }
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
