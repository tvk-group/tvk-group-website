#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { ROOT, LANGUAGES } = require('./tvk-shared');
const PAGES = ['index.html','about.html','companies.html','ecosystem.html','technologies.html','industries.html','strategic-partnerships.html','investor-relations.html','insights.html','contact.html','legal.html','privacy.html','terms.html','company.html','work.html'];
let urls = '';
LANGUAGES.forEach(l => PAGES.forEach(p => {
  const loc = p === 'index.html' ? `https://tvk.group/${l.code}/` : `https://tvk.group/${l.code}/${p}`;
  urls += `  <url><loc>${loc}</loc></url>\n`;
}));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`);
console.log('Sitemap:', LANGUAGES.length * PAGES.length, 'URLs');
