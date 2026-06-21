#!/usr/bin/env node
/**
 * Updates legal, privacy, and terms pages with V2.0 navigation and styling.
 * Run: node scripts/update-legal-pages.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT, LANGUAGES, navHtml, footerHtml, headHtml, ambientLayers, scriptsHtml } = require('./tvk-shared');

const LEGAL_PAGES = {
  'legal.html': { title: 'Legal Notice — TVK Group', h2: 'Legal Notice' },
  'privacy.html': { title: 'Privacy Policy — TVK Group', h2: 'Privacy Policy' },
  'terms.html': { title: 'Terms & Conditions — TVK Group', h2: 'Terms & Conditions' }
};

function extractBodyContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/<div class="section">([\s\S]*?)<\/div>\s*<footer/i);
  if (match) return match[1].trim();
  const h2Match = content.match(/<h2>[^<]+<\/h2>([\s\S]*?)(?:<\/div>\s*<footer|<footer)/i);
  if (h2Match) return `<h2>${content.match(/<h2>([^<]+)<\/h2>/)[1]}</h2>\n    ${h2Match[1].trim()}`;
  return '<p>Content unavailable.</p>';
}

LANGUAGES.forEach(lang => {
  Object.entries(LEGAL_PAGES).forEach(([filename, meta]) => {
    const existingPath = path.join(ROOT, lang.code, filename);
    let bodyContent = '<p>This site is operated by TVK Group Holding LTD.</p>';
    if (fs.existsSync(existingPath)) {
      bodyContent = extractBodyContent(existingPath);
    }

    const head = headHtml(lang.code, meta.title, meta.title, filename);
    const html = `${head.html}
<body${head.dir}>
${ambientLayers()}

  <div class="tvk-page-content">
    ${navHtml(lang.code, filename)}

    <section class="tvk-page-hero">
      <div class="tvk-container tvk-reveal visible">
        <h1>${meta.h2}</h1>
      </div>
    </section>

    <section class="tvk-section">
      <div class="tvk-container tvk-content-narrow tvk-reveal">
        ${bodyContent.replace(/<h2>[^<]+<\/h2>\s*/i, '')}
      </div>
    </section>

    ${footerHtml(lang.code)}
  </div>
${scriptsHtml()}
`;

    fs.writeFileSync(existingPath, html, 'utf8');
    console.log(`Updated: ${lang.code}/${filename}`);
  });
});

console.log('\nDone! Updated legal pages.');
