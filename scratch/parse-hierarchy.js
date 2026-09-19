const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\RAMZAN\\.gemini\\antigravity-ide\\brain\\a97c8811-9dbd-4ed7-ae3e-7fd348e12470\\.system_generated\\steps\\220\\content.md', 'utf8');

// Find the main header nav element
// Search for <nav ... or <header ...
const headerMatch = content.match(/<header[\s\S]*?<\/header>/i) || content.match(/<nav[\s\S]*?<\/nav>/gi);

// Extract the primary navigation HTML
const navMatch = content.match(/<nav[^>]*class=["'][^"']*(?:elementor-nav-menu|main-navigation|menu)[^"']*["'][\s\S]*?<\/nav>/i) 
              || content.match(/<nav[\s\S]*?<\/nav>/i);

const navHtml = navMatch ? navMatch[0] : content;

// Parse the html tokens
// Let's create a minimal recursive parser for <ul> and <li>
function parseHtmlMenu(html) {
  // find the first <ul
  const firstUlIdx = html.indexOf('<ul');
  if (firstUlIdx === -1) return [];

  let idx = firstUlIdx;
  
  function parseUl() {
    const items = [];
    // advance past <ul...>
    const ulOpenEnd = html.indexOf('>', idx);
    if (ulOpenEnd === -1) return items;
    idx = ulOpenEnd + 1;

    while (idx < html.length) {
      // Find next tag
      const nextTag = html.indexOf('<', idx);
      if (nextTag === -1) break;
      
      if (html.startsWith('</ul', nextTag)) {
        idx = html.indexOf('>', nextTag) + 1;
        break;
      }
      
      if (html.startsWith('<li', nextTag)) {
        const liOpenEnd = html.indexOf('>', nextTag);
        idx = liOpenEnd + 1;
        
        // Find <a> tag inside this <li>
        const aOpen = html.indexOf('<a', idx);
        let title = '';
        let href = '#';
        let sub = [];
        
        if (aOpen !== -1 && aOpen < html.indexOf('<ul', idx) && (aOpen < html.indexOf('</li', idx) || html.indexOf('</li', idx) === -1)) {
          const aClose = html.indexOf('</a>', aOpen);
          const aTag = html.substring(aOpen, aClose);
          const hrefMatch = aTag.match(/href=["']([^"']*)["']/);
          if (hrefMatch) href = hrefMatch[1];
          const textInside = html.substring(html.indexOf('>', aOpen) + 1, aClose);
          title = textInside.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8211;/g, '-').trim();
          idx = aClose + 4;
        }

        // Check if there is a sub <ul> before </li
        const nextUl = html.indexOf('<ul', idx);
        const nextLiClose = html.indexOf('</li', idx);
        const nextLiOpen = html.indexOf('<li', idx);
        const nextUlClose = html.indexOf('</ul', idx);

        if (nextUl !== -1 && (nextLiClose === -1 || nextUl < nextLiClose) && (nextLiOpen === -1 || nextUl < nextLiOpen) && (nextUlClose === -1 || nextUl < nextUlClose)) {
          idx = nextUl;
          sub = parseUl();
        }

        // Advance to </li
        const closeLi = html.indexOf('</li', idx);
        if (closeLi !== -1) {
          idx = html.indexOf('>', closeLi) + 1;
        }

        if (title) {
          items.push({ title, href, sub: sub.length ? sub : undefined });
        }
      } else {
        idx = nextTag + 1;
      }
    }
    return items;
  }

  return parseUl();
}

const tree = parseHtmlMenu(navHtml);
fs.writeFileSync('d:\\heapware\\GraceGardenSchool\\scratch\\menu-tree.json', JSON.stringify(tree, null, 2));
console.log('Saved menu tree:');
console.log(JSON.stringify(tree, null, 2));
