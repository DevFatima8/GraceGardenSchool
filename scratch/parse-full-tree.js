const fs = require('fs');

const navHtml = fs.readFileSync('d:\\heapware\\GraceGardenSchool\\scratch\\nav_0.html', 'utf8');

// Let's write a robust token/tag stack parser for HTML
function parseMenuTree(html) {
  // Regex to match tags
  const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*)>/g;
  let match;
  
  const root = { title: 'ROOT', children: [] };
  const stack = [root];
  let currentLi = null;

  // We can also extract the text within <a>
  // Let's tokenize properly
  let lastIndex = 0;
  
  while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = match[0].startsWith('</');
    const tagName = match[1].toLowerCase();
    const attrs = match[2];
    const fullTag = match[0];
    const tagIndex = match.index;

    if (tagName === 'li') {
      if (!isClosing) {
        // Extract <a> text and href if immediately following or inside
        const liContentStart = tagIndex + fullTag.length;
        // find closing </li> or next <tag
        // Let's create a new node
        const node = { title: '', href: '#', children: [] };
        
        // Find <a> inside this li before another <li or <ul
        const remaining = html.substring(liContentStart);
        const aMatch = remaining.match(/^[\s\S]*?<a([^>]*)>([\s\S]*?)<\/a>/i);
        if (aMatch && aMatch.index < (remaining.indexOf('<ul') !== -1 ? remaining.indexOf('<ul') : 999999)) {
          const aAttrs = aMatch[1];
          const aText = aMatch[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8211;/g, '-').trim();
          const hrefM = aAttrs.match(/href=["']([^"']*)["']/i);
          node.title = aText;
          node.href = hrefM ? hrefM[1] : '#';
        }
        
        const parent = stack[stack.length - 1];
        if (parent.children) {
          parent.children.push(node);
        }
        stack.push(node);
      } else {
        // li closing
        if (stack.length > 1 && stack[stack.length - 1] !== root) {
          stack.pop();
        }
      }
    }
  }
  return root.children;
}

const tree = parseMenuTree(navHtml);
fs.writeFileSync('d:\\heapware\\GraceGardenSchool\\scratch\\full-tree.json', JSON.stringify(tree, null, 2));
console.log('Parsed tree depth/nodes:', tree.length);
tree.forEach(top => {
  console.log(`+ ${top.title} (${top.href})`);
  if (top.children && top.children.length) {
    top.children.forEach(c1 => {
      console.log(`  |- ${c1.title} (${c1.href})`);
      if (c1.children && c1.children.length) {
        c1.children.forEach(c2 => {
          console.log(`     |-- ${c2.title} (${c2.href})`);
          if (c2.children && c2.children.length) {
            c2.children.forEach(c3 => {
              console.log(`        |--- ${c3.title} (${c3.href})`);
            });
          }
        });
      }
    });
  }
});
