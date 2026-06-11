#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MARKER = 'TVK Group Teknoloji Yatırım';

const TURKEY_BLOCK = `
    <div class="company">
      <h3>TVK Group Teknoloji Yatırım İthalat İhracat Ticaret ve Sanayi Limited Şirketi 🇹🇷</h3>
      <h4>Turkey Operations Entity</h4>
      <p>Turkish subsidiary focused on technology investment, import-export operations, trade, and industrial development across the TVK ecosystem.</p>
      <p>- Technology investment and commercial operations in Türkiye</p>
      <p>- Import and export coordination for TVK Group products and infrastructure</p>
      <p>- Trade and industrial development for regional ecosystem expansion</p>
      <p>- Bridge entity connecting Middle East, European, and Eurasian markets</p>
    </div>
`;

function getAllCompanyFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'assets', 'scripts'].includes(entry.name)) {
      getAllCompanyFiles(full, files);
    } else if (entry.name === 'company.html') {
      files.push(full);
    }
  }
  return files;
}

const files = getAllCompanyFiles(ROOT);
let updated = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(MARKER)) return;

  // Insert before EnteleKRON Foundation if present
  if (content.includes('EnteleKRON Foundation')) {
    content = content.replace(
      /(\s*)<div class="company">\s*<h3>TVK - EnteleKRON Foundation/,
      `${TURKEY_BLOCK}\n$1<div class="company">\n$1  <h3>TVK - EnteleKRON Foundation`
    );
  } else {
    // Insert before closing section div (after last company block)
    content = content.replace(
      /(<div class="company">[\s\S]*?<\/div>)\s*(\n\s*<\/div>\s*\n\s*<footer>)/,
      `$1${TURKEY_BLOCK}$2`
    );
  }

  if (!content.includes(MARKER)) {
    console.warn('Failed to patch:', file);
    return;
  }

  fs.writeFileSync(file, content);
  updated++;
  console.log('Updated:', path.relative(ROOT, file));
});

console.log(`\nPatched ${updated} company.html files.`);
