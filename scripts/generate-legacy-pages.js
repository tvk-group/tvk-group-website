#!/usr/bin/env node
/**
 * Generates company.html (legacy directory) and work.html (careers) with holding design.
 */
const fs = require('fs');
const path = require('path');
const S = require('./tvk-shared');

function shell(lang, page, title, desc, body) {
  const h = S.headHtml(lang, title, desc, page);
  return `${h.html}<body${h.dir}>${S.ambient()}<div class="tvk-page-content">${S.navHtml(lang, page)}${body}${S.footerHtml(lang)}</div>${S.scripts()}`;
}

function companyLegacy(lang) {
  const cards = S.getGroupCompanies(lang).map(c => `
    <div class="tvk-company-detail" id="${c.id}">
      <div class="tvk-company-detail-header">
        ${c.img ? `<img src="/assets/${c.img}" alt="${c.title}" />` : `<span class="tvk-company-flag">${c.flag}</span>`}
        <div><h3>${c.title} ${c.flag}</h3><span class="tvk-company-sub">${c.subtitle}</span><span class="tvk-stage-badge">${c.status}</span></div>
      </div>
      <p class="tvk-company-role">${c.role}</p>
      ${c.bullets ? `<ul class="tvk-company-bullets">${c.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      <div class="tvk-company-focus"><strong>${S.t(lang, 'focusAreas')}:</strong><ul>${c.focus.map(f => `<li>${f}</li>`).join('')}</ul></div>
      ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" class="tvk-link-arrow">${S.t(lang, 'visitWebsite')} <i class="fa-solid fa-arrow-right"></i></a>` : ''}
    </div>`).join('');

  return shell(lang, 'company.html', S.t(lang, 'companyLegacyTitle'), S.t(lang, 'companyLegacyLead'), `
${S.pageHero(S.t(lang, 'companyLegacyH1'), S.t(lang, 'companyLegacyLead'))}
<section class="tvk-section">
  <div class="tvk-container tvk-company-list tvk-reveal">${cards}</div>
  <div class="tvk-section-cta tvk-reveal">
    <a href="/${lang}/companies.html" class="tvk-btn tvk-btn-outline">${S.t(lang, 'viewCompaniesPage')} <i class="fa-solid fa-arrow-right"></i></a>
  </div>
</section>`);
}

function work(lang) {
  const roles = S.tArray(lang, 'workRoles');
  return shell(lang, 'work.html', S.t(lang, 'workTitle'), S.t(lang, 'workLead'), `
${S.pageHero(S.t(lang, 'workH1'), S.t(lang, 'workLead'))}
<section class="tvk-section">
  <div class="tvk-container tvk-content-narrow tvk-reveal">
    <p>${S.t(lang, 'workP1')}</p>
    <p>${S.t(lang, 'workP2')}</p>
    <h3>${S.t(lang, 'workRolesH')}</h3>
    <ul class="tvk-check-list">${roles.map(r => `<li>${r}</li>`).join('')}</ul>
    <div class="tvk-section-cta">
      <a href="mailto:careers@tvk.group" class="tvk-btn tvk-btn-primary">${S.t(lang, 'workCta')}</a>
    </div>
    <p class="tvk-content-note">${S.t(lang, 'workNote')}</p>
  </div>
</section>`);
}

S.LANGUAGES.forEach(l => {
  const dir = path.join(S.ROOT, l.code);
  fs.writeFileSync(path.join(dir, 'company.html'), companyLegacy(l.code));
  fs.writeFileSync(path.join(dir, 'work.html'), work(l.code));
  console.log('Generated:', l.code + '/company.html, work.html');
});
console.log('Done: legacy pages');
