#!/usr/bin/env node
/**
 * Audits all language HTML pages for old design markers.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, LANGUAGES } = require('./tvk-shared');

const PAGES = ['index.html','about.html','companies.html','ecosystem.html','technologies.html','industries.html','strategic-partnerships.html','investor-relations.html','insights.html','contact.html','legal.html','privacy.html','terms.html','company.html','work.html'];
const OLD = [/background-color:\s*#000/i, /font-family:\s*sans-serif/i, /tvk-master\.css\?v=3/i, /class="tvk-nav-links"/];
const REQUIRED = [
  /tvk-master\.css\?v=10/i,
  /class="tvk-nav" data-tvk-nav/,
  /class="tvk-footer-board"/,
  /data-tvk-menu-trigger="finance"/,
  /https:\/\/finance\.entelekron\.org\//
];

let issues = [];
LANGUAGES.forEach(l => {
  PAGES.forEach(p => {
    const fp = path.join(ROOT, l.code, p);
    if (!fs.existsSync(fp)) { issues.push(`MISSING: ${l.code}/${p}`); return; }
    const c = fs.readFileSync(fp, 'utf8');
    OLD.forEach(rx => { if (rx.test(c)) issues.push(`OLD DESIGN: ${l.code}/${p} (${rx})`); });
    REQUIRED.forEach(rx => { if (!rx.test(c)) issues.push(`MISSING NAV SYSTEM: ${l.code}/${p} (${rx})`); });
    const ecosystemTriggers = c.match(/data-tvk-menu-trigger="ecosystem"/g) || [];
    const financeTriggers = c.match(/data-tvk-menu-trigger="finance"/g) || [];
    if (ecosystemTriggers.length !== 1) issues.push(`ECOSYSTEM NAV COUNT: ${l.code}/${p} expected 1, found ${ecosystemTriggers.length}`);
    if (financeTriggers.length !== 1) issues.push(`FINANCE NAV COUNT: ${l.code}/${p} expected 1, found ${financeTriggers.length}`);
  });
});

if (issues.length) {
  console.log('Issues found:', issues.length);
  issues.forEach(i => console.log(' -', i));
  process.exit(1);
}
console.log('Audit passed:', LANGUAGES.length * PAGES.length, 'pages OK');
