#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const S = require('./tvk-shared');

function shell(lang, page, title, desc, body, eco = false) {
  const h = S.headHtml(lang, title, desc, page);
  return `${h.html}<body${h.dir}>${S.ambient()}<div class="tvk-page-content">${S.navHtml(lang, page)}${body}${S.footerHtml(lang)}</div>${S.scripts(eco)}`;
}

function about(lang) {
  return shell(lang, 'about.html', S.t(lang, 'aboutTitle'), S.t(lang, 'aboutLead'), `
${S.pageHero(S.t(lang, 'aboutH1'), S.t(lang, 'aboutLead'))}
<section class="tvk-section"><div class="tvk-container tvk-content-narrow tvk-reveal">
  <h3>${S.t(lang, 'missionH')}</h3><p>${S.t(lang, 'missionP')}</p>
  <h3>${S.t(lang, 'visionH')}</h3><p>${S.t(lang, 'visionP')}</p>
  <h3>${S.t(lang, 'founderH')}</h3><p>${S.t(lang, 'founderP')}</p>
  <h3>${S.t(lang, 'stageH')}</h3><p>${S.t(lang, 'stageP')}</p>
  <div class="tvk-section-cta"><a href="/${lang}/ecosystem.html" class="tvk-btn tvk-btn-primary">${S.t(lang, 'aboutCta')}</a></div>
</div></section>
<section class="tvk-stage-notice"><div class="tvk-container"><div class="tvk-stage-notice-inner"><i class="fa-solid fa-circle-info"></i><p>${S.t(lang, 'stageNotice')}</p></div></div></section>`);
}

function companies(lang) {
  const cards = S.getGroupCompanies(lang).map(c => `
    <div class="tvk-company-detail" id="${c.id}">
      <div class="tvk-company-detail-header">
        ${c.img ? `<img src="/assets/${c.img}" alt="${c.title}" />` : `<span class="tvk-company-flag">${c.flag}</span>`}
        <div><h3>${c.title} ${c.flag}</h3><span class="tvk-company-sub">${c.subtitle}</span><span class="tvk-stage-badge">${c.status}</span></div>
      </div>
      <p class="tvk-company-role">${c.role}</p>
      <div class="tvk-company-focus"><strong>Focus areas:</strong><ul>${c.focus.map(f => `<li>${f}</li>`).join('')}</ul></div>
      ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" class="tvk-link-arrow">Visit website <i class="fa-solid fa-arrow-right"></i></a>` : ''}
    </div>`).join('');
  return shell(lang, 'companies.html', S.t(lang, 'companiesTitle'), S.t(lang, 'companiesLead'), `
${S.pageHero(S.t(lang, 'companiesH2'), S.t(lang, 'companiesLead'))}
<section class="tvk-section"><div class="tvk-container tvk-company-list tvk-reveal">${cards}</div></section>`);
}

function ecosystem(lang) {
  const cats = S.getEcosystemCategories(lang).map(c => S.ecosystemCategoryHtml(c, lang)).join('');
  return shell(lang, 'ecosystem.html', S.t(lang, 'ecosystemTitle'), S.t(lang, 'ecosystemLead'), `
${S.pageHero(S.t(lang, 'ecosystemH2'), S.t(lang, 'ecosystemLead'))}
<section class="tvk-section tvk-section-alt"><div class="tvk-container"><div class="tvk-galaxy-wrap tvk-reveal"><canvas id="tvk-galaxy-canvas"></canvas><div class="tvk-galaxy-tooltip" id="tvk-galaxy-tooltip"><h4></h4><p></p></div></div></div></section>
<section class="tvk-section"><div class="tvk-container tvk-eco-full tvk-reveal">${cats}</div></section>`, true);
}

function technologies(lang) {
  return shell(lang, 'technologies.html', S.t(lang, 'techTitle'), S.t(lang, 'techLead'), `
${S.pageHero(S.t(lang, 'techH2'), S.t(lang, 'techLead'))}
<section class="tvk-section"><div class="tvk-container"><div class="tvk-pillar-grid tvk-reveal">
${S.TECH_PILLARS.map(p => `<div class="tvk-pillar-card tvk-pillar-card-lg"><div class="tvk-pillar-icon"><i class="fa-solid ${p.icon}"></i></div><h3>${p.title}</h3><p>${p.desc}</p></div>`).join('')}
</div></div></section>`);
}

function industries(lang) {
  return shell(lang, 'industries.html', S.t(lang, 'industriesTitle'), S.t(lang, 'industriesLead'), `
${S.pageHero(S.t(lang, 'industriesH2'), S.t(lang, 'industriesLead'))}
<section class="tvk-section"><div class="tvk-container">
<p class="tvk-content-note tvk-reveal">${S.t(lang, 'industriesNote')}</p>
<div class="tvk-industries-grid tvk-industries-grid-lg tvk-reveal">
${S.INDUSTRIES.map(i => `<div class="tvk-industry-card tvk-industry-card-lg"><div class="tvk-industry-icon"><i class="fa-solid ${i.icon}"></i></div><h3>${i.name}</h3><p>Potential applications under development for future pilots and strategic validation in the ${i.name.toLowerCase()} sector.</p></div>`).join('')}
</div></div></section>`);
}

function partnerships(lang) {
  const targets = S.tArray(lang, 'partnershipsTargets');
  const focus = S.tArray(lang, 'partnershipsFocus');
  return shell(lang, 'strategic-partnerships.html', S.t(lang, 'partnershipsTitle'), S.t(lang, 'partnershipsLead'), `
${S.pageHero(S.t(lang, 'partnershipsH2'), S.t(lang, 'partnershipsLead'))}
<section class="tvk-section"><div class="tvk-container">
<div class="tvk-two-col tvk-reveal">
  <div><h3>Partnership Targets</h3><ul class="tvk-check-list">${targets.map(t => `<li>${t}</li>`).join('')}</ul></div>
  <div><h3>Collaboration Focus</h3><ul class="tvk-check-list">${focus.map(f => `<li>${f}</li>`).join('')}</ul></div>
</div>
<div class="tvk-section-cta"><a href="/${lang}/contact.html" class="tvk-btn tvk-btn-primary">${S.t(lang, 'partnershipsCta')}</a></div>
</div></section>`);
}

function investors(lang) {
  const roadmap = S.tArray(lang, 'investorsRoadmap');
  return shell(lang, 'investor-relations.html', S.t(lang, 'investorsTitle'), S.t(lang, 'investorsLead'), `
${S.pageHero(S.t(lang, 'investorsH2'), S.t(lang, 'investorsLead'))}
<section class="tvk-section"><div class="tvk-container tvk-content-narrow tvk-reveal">
  <h3>Vision</h3><p>${S.t(lang, 'investorsVision')}</p>
  <h3>Development Roadmap</h3><ul class="tvk-check-list">${roadmap.map(r => `<li>${r}</li>`).join('')}</ul>
  <h3>Governance</h3><p>${S.t(lang, 'investorsGovernance')}</p>
  <div class="tvk-risk-notice"><i class="fa-solid fa-triangle-exclamation"></i><p>${S.t(lang, 'investorsRisk')}</p></div>
</div></section>`);
}

function insights(lang) {
  return shell(lang, 'insights.html', S.t(lang, 'insightsTitle'), S.t(lang, 'insightsLead'), `
${S.pageHero(S.t(lang, 'insightsTitle'), S.t(lang, 'insightsLead'))}
<section class="tvk-section"><div class="tvk-container"><div class="tvk-insights-placeholder tvk-reveal"><i class="fa-solid fa-newspaper"></i><p>${S.t(lang, 'insightsPlaceholder')}</p></div></div></section>`);
}

function contact(lang) {
  return shell(lang, 'contact.html', S.t(lang, 'contactTitle'), S.t(lang, 'contactLead'), `
${S.pageHero(S.t(lang, 'contactH2'), S.t(lang, 'contactLead'))}
<section class="tvk-section"><div class="tvk-container"><div class="tvk-contact-layout tvk-reveal">
  <div class="tvk-contact-info">
    <div class="tvk-contact-info-item"><i class="fa-solid fa-envelope"></i><div><h4>${S.t(lang, 'contactGeneral')}</h4><a href="mailto:contact@tvk.group">contact@tvk.group</a></div></div>
    <div class="tvk-contact-info-item"><i class="fa-solid fa-handshake"></i><div><h4>${S.t(lang, 'contactPartnerships')}</h4><a href="mailto:partners@tvk.group">partners@tvk.group</a></div></div>
    <div class="tvk-contact-info-item"><i class="fa-solid fa-building-columns"></i><div><h4>${S.t(lang, 'contactInstitutional')}</h4><a href="mailto:institutional@tvk.group">institutional@tvk.group</a></div></div>
  </div>
  ${S.contactForm(lang)}
</div></div></section>`);
}

const PAGES = { 'about.html': about, 'companies.html': companies, 'ecosystem.html': ecosystem, 'technologies.html': technologies, 'industries.html': industries, 'strategic-partnerships.html': partnerships, 'investor-relations.html': investors, 'insights.html': insights, 'contact.html': contact };

let n = 0;
S.LANGUAGES.forEach(l => {
  const dir = path.join(S.ROOT, l.code);
  Object.entries(PAGES).forEach(([f, gen]) => {
    fs.writeFileSync(path.join(dir, f), gen(l.code));
    console.log('Generated:', l.code + '/' + f);
    n++;
  });
});
console.log('Done:', n, 'pages');
