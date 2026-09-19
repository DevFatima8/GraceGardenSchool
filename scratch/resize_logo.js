const fs = require('fs');
const path = require('path');

function replaceSize(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceSize(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes("maxHeight: '80px'")) {
                content = content.replace(/maxHeight:\s*'80px'/g, "maxHeight: '60px'");
                fs.writeFileSync(fullPath, content);
                console.log(`Updated size in ${fullPath}`);
            }
        }
    }
}

replaceSize(path.join(process.cwd(), 'components'));
