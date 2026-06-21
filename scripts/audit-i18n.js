#!/usr/bin/env node
/**
 * Audits generated pages for translated UI (nav, page heroes) on non-English locales.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, LANGUAGES } = require('./tvk-shared');
const { LOCALE_OVERRIDES } = require('./i18n-content');

const CHECKS = [
  { page: 'about.html', key: 'aboutH1' },
  { page: 'companies.html', key: 'companiesH2' },
  { page: 'ecosystem.html', key: 'ecosystemH2' },
  { page: 'technologies.html', key: 'techH2' },
  { page: 'industries.html', key: 'industriesH2' },
  { page: 'strategic-partnerships.html', key: 'partnershipsH2' },
  { page: 'investor-relations.html', key: 'investorsH2' },
  { page: 'insights.html', key: 'insightsTitle' },
  { page: 'contact.html', key: 'contactH2' },
  { page: 'company.html', key: 'companyLegacyH1' },
  { page: 'work.html', key: 'workH1' }
];

const EN_NAV = LANGUAGES.find(l => l.code === 'en').nav;

let issues = [];

LANGUAGES.filter(l => l.code !== 'en').forEach(l => {
  const pack = LOCALE_OVERRIDES[l.code] || {};
  CHECKS.forEach(({ page, key }) => {
    const expected = pack[key];
    if (!expected) {
      issues.push(`MISSING KEY: ${l.code} ${key}`);
      return;
    }
    const fp = path.join(ROOT, l.code, page);
    if (!fs.existsSync(fp)) {
      issues.push(`MISSING FILE: ${l.code}/${page}`);
      return;
    }
    const html = fs.readFileSync(fp, 'utf8');
    if (!html.includes(expected)) {
      issues.push(`NOT IN PAGE: ${l.code}/${page} expected "${expected.slice(0, 40)}..."`);
    }
  });

  const fp = path.join(ROOT, l.code, 'index.html');
  const html = fs.readFileSync(fp, 'utf8');
  const homeLabel = l.nav.home;
  if (homeLabel !== EN_NAV.home && html.includes(`>${EN_NAV.home}<`)) {
    issues.push(`EN NAV HOME: ${l.code}/index.html still shows "${EN_NAV.home}" instead of "${homeLabel}"`);
  }
});

if (issues.length) {
  console.log('i18n issues:', issues.length);
  issues.slice(0, 30).forEach(i => console.log(' -', i));
  if (issues.length > 30) console.log(` ... and ${issues.length - 30} more`);
  process.exit(1);
}
console.log('i18n audit passed:', (LANGUAGES.length - 1) * CHECKS.length, 'checks OK');
