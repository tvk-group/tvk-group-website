#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const S = require('./tvk-shared');

function home(lang) {
  const h = S.headHtml(lang, S.t(lang, 'title'), S.t(lang, 'description'), 'index.html');
  const overview = S.tArray(lang, 'overviewItems');
  return `${h.html}
<body${h.dir}>${S.ambient()}
<div class="tvk-page-content">
${S.navHtml(lang, 'index.html')}

<section class="tvk-hero" id="hero">
  <div class="tvk-hero-bg"></div><div class="tvk-hero-overlay"></div><div class="tvk-hero-grid"></div>
  <div class="tvk-hero-content tvk-reveal visible">
    <img src="/assets/logo.tvk.group.png" class="tvk-hero-logo" alt="TVK Group" />
    <h1>${S.t(lang, 'heroH1')}</h1>
    <p class="tvk-hero-sub">${S.t(lang, 'heroSub')}</p>
    <p class="tvk-hero-line">${S.t(lang, 'heroLine')}</p>
    <div class="tvk-hero-ctas">
      <a href="#ecosystem" class="tvk-btn tvk-btn-primary">${S.t(lang, 'heroCta1')} <i class="fa-solid fa-arrow-down"></i></a>
      <a href="/${lang}/strategic-partnerships.html" class="tvk-btn tvk-btn-secondary">${S.t(lang, 'heroCta2')}</a>
    </div>
  </div>
  <div class="tvk-hero-viz"><canvas id="tvk-hero-viz-canvas"></canvas></div>
</section>

<section class="tvk-stage-notice"><div class="tvk-container"><div class="tvk-stage-notice-inner"><i class="fa-solid fa-circle-info"></i><p>${S.t(lang, 'stageNotice')}</p></div></div></section>

<section class="tvk-section" id="overview">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'overviewLabel'), S.t(lang, 'overviewH2'), S.t(lang, 'overviewP'))}
    <div class="tvk-identity-pills tvk-reveal">${overview.map(i => `<span class="tvk-identity-pill">${i}</span>`).join('')}</div>
    <div class="tvk-section-cta tvk-reveal"><a href="/${lang}/about.html" class="tvk-btn tvk-btn-outline">About TVK Group <i class="fa-solid fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="tvk-section tvk-section-alt" id="companies">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'companiesLabel'), S.t(lang, 'companiesH2'), S.t(lang, 'companiesP'))}
    <div class="tvk-holding-grid tvk-reveal">
      ${S.HOMEPAGE_COMPANIES.map(c => `<div class="tvk-holding-card"><div class="tvk-holding-icon"><i class="fa-solid ${c.icon}"></i></div><h3>${c.title}</h3><p>${c.desc}</p><a href="/${lang}/${c.link}" class="tvk-link-arrow">Learn more <i class="fa-solid fa-arrow-right"></i></a></div>`).join('')}
    </div>
  </div>
</section>

<section class="tvk-section" id="ecosystem">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'ecosystemLabel'), S.t(lang, 'ecosystemH2'), S.t(lang, 'ecosystemP'))}
    <div class="tvk-eco-preview tvk-reveal">
      ${S.getEcosystemCategories(lang).map(c => S.ecosystemCategoryHtml(c, lang, true)).join('')}
    </div>
    <div class="tvk-section-cta tvk-reveal"><a href="/${lang}/ecosystem.html" class="tvk-btn tvk-btn-primary">View Full Ecosystem <i class="fa-solid fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="tvk-section tvk-section-alt" id="technologies">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'techLabel'), S.t(lang, 'techH2'), S.t(lang, 'techP'))}
    <div class="tvk-pillar-grid tvk-reveal">
      ${S.TECH_PILLARS.map(p => `<div class="tvk-pillar-card"><div class="tvk-pillar-icon"><i class="fa-solid ${p.icon}"></i></div><h3>${p.title}</h3><p>${p.desc}</p></div>`).join('')}
    </div>
    <div class="tvk-section-cta tvk-reveal"><a href="/${lang}/technologies.html" class="tvk-btn tvk-btn-outline">Technology Overview <i class="fa-solid fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="tvk-section" id="industries">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'industriesLabel'), S.t(lang, 'industriesH2'), S.t(lang, 'industriesP'))}
    <div class="tvk-industries-grid tvk-reveal">
      ${S.INDUSTRIES.map(i => `<div class="tvk-industry-card"><div class="tvk-industry-icon"><i class="fa-solid ${i.icon}"></i></div><span>${i.name}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="tvk-section tvk-section-navy" id="partnerships">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'partnershipsLabel'), S.t(lang, 'partnershipsH2'), S.t(lang, 'partnershipsP'))}
    <div class="tvk-section-cta tvk-reveal"><a href="/${lang}/strategic-partnerships.html" class="tvk-btn tvk-btn-light">${S.t(lang, 'partnershipsCta')} <i class="fa-solid fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="tvk-section tvk-section-alt" id="investors">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'investorsLabel'), S.t(lang, 'investorsH2'), S.t(lang, 'investorsP'))}
    <div class="tvk-section-cta tvk-reveal"><a href="/${lang}/investor-relations.html" class="tvk-btn tvk-btn-outline">${S.t(lang, 'investorsCta')} <i class="fa-solid fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="tvk-section" id="contact">
  <div class="tvk-container">
    ${S.sectionHeader(S.t(lang, 'contactLabel'), S.t(lang, 'contactH2'), S.t(lang, 'contactP'))}
    <div class="tvk-contact-block tvk-reveal">${S.contactForm(lang)}</div>
  </div>
</section>

${S.footerHtml(lang)}
</div>
${S.scripts(true)}`;
}

S.LANGUAGES.forEach(l => {
  const dir = path.join(S.ROOT, l.code);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), home(l.code));
  console.log('Generated:', l.code + '/index.html');
});
console.log('Done:', S.LANGUAGES.length, 'homepages');
