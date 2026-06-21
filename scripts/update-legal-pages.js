#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const S = require('./tvk-shared');

const PAGES = ['legal.html', 'privacy.html', 'terms.html'];
const TITLES = { 'legal.html': 'Legal Notice', 'privacy.html': 'Privacy Policy', 'terms.html': 'Terms & Conditions' };

function extract(file) {
  const c = fs.readFileSync(file, 'utf8');
  const m = c.match(/<div class="section">([\s\S]*?)<\/div>\s*<footer/i) || c.match(/<h2>[^<]+<\/h2>([\s\S]*?)(?:<footer|<script)/i);
  if (!m) return '<p>Content unavailable.</p>';
  return m[1].replace(/<h2>[^<]+<\/h2>\s*/i, '').trim();
}

S.LANGUAGES.forEach(lang => {
  PAGES.forEach(page => {
    const fp = path.join(S.ROOT, lang.code, page);
    const body = fs.existsSync(fp) ? extract(fp) : '<p>TVK Group Holding LTD</p>';
    const h = S.headHtml(lang.code, `${TITLES[page]} — TVK Group`, TITLES[page], page);
    fs.writeFileSync(fp, `${h.html}<body${h.dir}>${S.ambient()}<div class="tvk-page-content">${S.navHtml(lang.code, page)}${S.pageHero(TITLES[page], '')}<section class="tvk-section"><div class="tvk-container tvk-content-narrow tvk-reveal">${body}</div></section>${S.footerHtml(lang.code)}</div>${S.scripts()}`);
    console.log('Updated:', lang.code + '/' + page);
  });
});
