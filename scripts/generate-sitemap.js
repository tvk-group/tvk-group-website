#!/usr/bin/env node
/**
 * Generates sitemap.xml for all TVK Group V2.0 pages.
 * Run: node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT, LANGUAGES } = require('./tvk-shared');

const PAGES = [
  'index.html',
  'about.html',
  'ecosystem.html',
  'ai-trust-suite.html',
  'industries.html',
  'partnerships.html',
  'insights.html',
  'contact.html',
  'legal.html',
  'privacy.html',
  'terms.html'
];

let urls = '';
LANGUAGES.forEach(lang => {
  PAGES.forEach(page => {
    const loc = page === 'index.html'
      ? `https://tvk.group/${lang.code}/`
      : `https://tvk.group/${lang.code}/${page}`;
    urls += `  <url><loc>${loc}</loc></url>\n`;
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap with ${LANGUAGES.length * PAGES.length} URLs.`);
