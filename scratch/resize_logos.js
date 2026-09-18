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
            
            // For single quotes
            if (content.includes("alt='logo' />")) {
                content = content.replace(/alt='logo' \/>/g, "alt='logo' style={{ maxHeight: '80px', width: 'auto' }} />");
                updated = true;
            }
            // For double quotes
            if (content.includes('alt="logo" />')) {
                content = content.replace(/alt="logo" \/>/g, 'alt="logo" style={{ maxHeight: \'80px\', width: \'auto\' }} />');
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
