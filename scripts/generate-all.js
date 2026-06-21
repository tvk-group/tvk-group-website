#!/usr/bin/env node
/**
 * Regenerates all TVK Group pages across all languages.
 */
require('child_process').execSync('node scripts/generate-homepages.js', { stdio: 'inherit', cwd: __dirname + '/..' });
require('child_process').execSync('node scripts/generate-secondary-pages.js', { stdio: 'inherit', cwd: __dirname + '/..' });
require('child_process').execSync('node scripts/generate-legacy-pages.js', { stdio: 'inherit', cwd: __dirname + '/..' });
require('child_process').execSync('node scripts/update-legal-pages.js', { stdio: 'inherit', cwd: __dirname + '/..' });
require('child_process').execSync('node scripts/generate-sitemap.js', { stdio: 'inherit', cwd: __dirname + '/..' });
require('child_process').execSync('node scripts/audit-pages.js', { stdio: 'inherit', cwd: __dirname + '/..' });
require('child_process').execSync('node scripts/audit-i18n.js', { stdio: 'inherit', cwd: __dirname + '/..' });
console.log('\nAll pages regenerated and audited.');
