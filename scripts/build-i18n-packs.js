#!/usr/bin/env node
/**
 * Builds scripts/i18n/*.json page translation packs for all non-English languages.
 */
const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname, 'i18n');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const PACKS = require('./i18n-packs-data');

Object.entries(PACKS).forEach(([lang, pack]) => {
  const fp = path.join(outDir, `${lang}.json`);
  fs.writeFileSync(fp, JSON.stringify(pack, null, 2) + '\n');
  console.log('Wrote', lang + '.json', '(' + Object.keys(pack).length + ' keys)');
});
console.log('Done:', Object.keys(PACKS).length, 'language packs');
