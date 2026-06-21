#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const S = require('./tvk-shared');

const PAGES = {
  'legal.html': 'legalTitle',
  'privacy.html': 'privacyTitle',
  'terms.html': 'termsTitle'
};

function extractBody(file) {
  const c = fs.readFileSync(file, 'utf8');
  const m = c.match(/<div class="tvk-content-narrow[^"]*">([\s\S]*?)<\/div>\s*<\/section>/i);
  if (m) return m[1].trim();
  const m2 = c.match(/<div class="section">([\s\S]*?)<\/div>\s*<footer/i);
  if (m2) return m2[1].replace(/<h2>[^<]+<\/h2>\s*/i, '').trim();
  return '<p>TVK Group Holding LTD</p>';
}

S.LANGUAGES.forEach(lang => {
  Object.entries(PAGES).forEach(([page, titleKey]) => {
    const fp = path.join(S.ROOT, lang.code, page);
    const body = fs.existsSync(fp) ? extractBody(fp) : '<p>TVK Group Holding LTD</p>';
    const title = S.t(lang.code, titleKey);
    const h = S.headHtml(lang.code, `${title} — TVK Group`, title, page);
    fs.writeFileSync(fp, `${h.html}<body${h.dir}>${S.ambient()}<div class="tvk-page-content">${S.navHtml(lang.code, page)}${S.pageHero(title, '')}<section class="tvk-section"><div class="tvk-container tvk-content-narrow tvk-reveal">${body}</div></section>${S.footerHtml(lang.code)}</div>${S.scripts()}`);
    console.log('Updated:', lang.code + '/' + page);
  });
});
