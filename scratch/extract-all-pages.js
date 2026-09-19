const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('d:\\heapware\\GraceGardenSchool\\scratch\\full-tree.json', 'utf8'));

const pages = new Map();

function traverse(item, parentPath = '') {
  if (item.href && item.href !== '#' && !item.href.includes('#')) {
    // Clean href to slug
    const url = item.href.replace('https://stanthonysft.edu.pk', '').replace(/\/$/, '');
    const slug = url.startsWith('/') ? url.substring(1) : url;
    if (slug) {
      pages.set(slug, {
        title: item.title,
        slug: slug,
        parent: parentPath
      });
    }
  }
  if (item.children) {
    item.children.forEach(c => traverse(c, item.title));
  }
}

tree.forEach(t => traverse(t));

console.log(`Total unique page slugs found: ${pages.size}`);
const list = Array.from(pages.values());
fs.writeFileSync('d:\\heapware\\GraceGardenSchool\\scratch\\all-pages.json', JSON.stringify(list, null, 2));
list.forEach(p => console.log(`${p.slug} -> ${p.title} (under ${p.parent})`));
