#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' }
];

const NEW_LANGS = ['fi', 'no', 'id', 'vi', 'th', 'uk', 'cs', 'el'];
const PAGES_TO_COPY = ['contact.html', 'legal.html', 'privacy.html', 'terms.html', 'company.html', 'work.html'];

function getAllHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'assets' && entry.name !== 'scripts') {
      getAllHtmlFiles(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.html') && !full.includes('scripts/')) {
      files.push(full);
    }
  }
  return files;
}

function buildOptions(pagePath) {
  const parts = pagePath.replace(ROOT + path.sep, '').split(path.sep);
  const lang = parts[0];
  const page = parts[1] || 'index.html';
  const isLangFolder = LANGUAGES.some(l => l.code === lang);

  return LANGUAGES.map(l => {
    const target = isLangFolder ? `/${l.code}/${page}` : `/${l.code}/index.html`;
    const selected = l.code === lang ? ' selected' : '';
    return `<option value="${target}"${selected}>${l.flag} ${l.name}</option>`;
  }).join('\n          ');
}

function updateDropdown(content, options) {
  const selectRegex = /<select[^>]*id="lang-dropdown"[^>]*>[\s\S]*?<\/select>/;
  const selectRegex2 = /<select[^>]*class="tvk-lang-select"[^>]*>[\s\S]*?<\/select>/;

  const newSelect1 = `<select id="lang-dropdown" style="padding:4px;border-radius:5px;" onchange="window.location.href=this.value;">
          <option disabled>🌐 Language</option>
          ${options}
        </select>`;

  const newSelect2 = `<select class="tvk-lang-select" onchange="window.location.href=this.value;">
            <option disabled>🌐 Language</option>
            ${options}
          </select>`;

  if (selectRegex.test(content)) return content.replace(selectRegex, newSelect1);
  if (selectRegex2.test(content)) return content.replace(selectRegex2, newSelect2);
  return content;
}

// Copy pages to new language folders
NEW_LANGS.forEach(lang => {
  const langDir = path.join(ROOT, lang);
  if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

  PAGES_TO_COPY.forEach(page => {
    const src = path.join(ROOT, 'en', page);
    const dest = path.join(langDir, page);
    if (!fs.existsSync(src)) return;
    let content = fs.readFileSync(src, 'utf8');
    content = content.replace(/lang="en"/g, `lang="${lang}"`);
    content = content.replace(/\/en\//g, `/${lang}/`);
    fs.writeFileSync(dest, content);
    console.log(`Copied: ${lang}/${page}`);
  });
});

// Update dropdowns in all HTML files
const htmlFiles = getAllHtmlFiles(ROOT).filter(f => !f.includes('footer_multilang') && !f.includes('meta.html') && !f.includes('index_work_with_us') && !f.startsWith(path.join(ROOT, 'tvk-')));
let updated = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const options = buildOptions(file);
  const newContent = updateDropdown(content, options);
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    updated++;
  }
});

console.log(`\nUpdated language dropdowns in ${updated} files.`);
