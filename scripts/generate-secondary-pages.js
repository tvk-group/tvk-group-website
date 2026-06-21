#!/usr/bin/env node
/**
 * Generates TVK Group V2.0 secondary pages for all language versions.
 * Run: node scripts/generate-secondary-pages.js
 */
const fs = require('fs');
const path = require('path');
const {
  ROOT,
  LANGUAGES,
  SUITE_PRODUCTS,
  INDUSTRIES,
  t,
  tArray,
  navHtml,
  footerHtml,
  headHtml,
  ambientLayers,
  scriptsHtml
} = require('./tvk-shared');

function pageShell(lang, activePage, title, description, bodyContent, includeEcosystem = false) {
  const head = headHtml(lang, title, description, activePage);
  return `${head.html}
<body${head.dir}>
${ambientLayers()}

  <div class="tvk-page-content">
    ${navHtml(lang, activePage)}

    ${bodyContent}

    ${footerHtml(lang)}
  </div>
${scriptsHtml(includeEcosystem)}
`;
}

function pageHero(h1, lead) {
  return `<section class="tvk-page-hero">
      <div class="tvk-container tvk-reveal visible">
        <h1>${h1}</h1>
        <p class="tvk-page-hero-lead">${lead}</p>
      </div>
    </section>`;
}

function generateAbout(lang) {
  const values = tArray(lang, 'aboutValues');
  const body = `${pageHero(t(lang, 'aboutH1'), t(lang, 'aboutLead'))}
    <section class="tvk-section">
      <div class="tvk-container tvk-content-narrow tvk-reveal">
        <p>${t(lang, 'aboutP1')}</p>
        <p>${t(lang, 'aboutP2')}</p>
        <p>${t(lang, 'aboutP3')}</p>
        <div class="tvk-identity-pills">
          ${values.map(v => `<span class="tvk-identity-pill">${v}</span>`).join('\n          ')}
        </div>
      </div>
    </section>
    <section class="tvk-stage-notice">
      <div class="tvk-container">
        <div class="tvk-stage-notice-inner">
          <i class="fa-solid fa-circle-info"></i>
          <p>${t(lang, 'stageNotice')}</p>
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'about.html', t(lang, 'aboutTitle'), t(lang, 'aboutDescription'), body);
}

function generateEcosystem(lang) {
  const body = `${pageHero(t(lang, 'ecosystemH1'), t(lang, 'ecosystemLead'))}
    <section class="tvk-section">
      <div class="tvk-container tvk-content-narrow tvk-reveal">
        <p>${t(lang, 'ecosystemP')}</p>
      </div>
    </section>
    <section class="tvk-section tvk-section-alt">
      <div class="tvk-container">
        <div class="tvk-galaxy-wrap tvk-reveal">
          <canvas id="tvk-galaxy-canvas"></canvas>
          <div class="tvk-galaxy-tooltip" id="tvk-galaxy-tooltip"><h4></h4><p></p></div>
        </div>
      </div>
    </section>
    <section class="tvk-section">
      <div class="tvk-container">
        <div class="tvk-suite-grid tvk-reveal">
          ${SUITE_PRODUCTS.map(p => `
          <div class="tvk-suite-card">
            <div class="tvk-suite-icon"><i class="fa-solid ${p.icon}"></i></div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'ecosystem.html', t(lang, 'ecosystemTitle'), t(lang, 'ecosystemDescription'), body, true);
}

function generateAiTrustSuite(lang) {
  const body = `${pageHero(t(lang, 'aiTrustH1'), t(lang, 'aiTrustLead'))}
    <section class="tvk-section">
      <div class="tvk-container">
        <div class="tvk-suite-grid tvk-reveal">
          ${SUITE_PRODUCTS.map(p => `
          <div class="tvk-suite-card tvk-suite-card-lg">
            <div class="tvk-suite-icon"><i class="fa-solid ${p.icon}"></i></div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>
    <section class="tvk-section tvk-section-alt">
      <div class="tvk-container tvk-content-narrow tvk-reveal">
        <div class="tvk-section-header">
          <span class="tvk-section-label">${t(lang, 'offeringLabel')}</span>
          <h2>${t(lang, 'offeringH2')}</h2>
          <p>${t(lang, 'offeringP')}</p>
        </div>
        <div class="tvk-section-cta">
          <a href="/${lang}/contact.html" class="tvk-btn tvk-btn-primary">${t(lang, 'contactCta')}</a>
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'ai-trust-suite.html', t(lang, 'aiTrustTitle'), t(lang, 'aiTrustDescription'), body);
}

function generateIndustries(lang) {
  const body = `${pageHero(t(lang, 'industriesH1'), t(lang, 'industriesLead'))}
    <section class="tvk-section">
      <div class="tvk-container">
        <div class="tvk-industries-grid tvk-industries-grid-lg tvk-reveal">
          ${INDUSTRIES.map(ind => `
          <div class="tvk-industry-card tvk-industry-card-lg">
            <div class="tvk-industry-icon"><i class="fa-solid ${ind.icon}"></i></div>
            <h3>${ind.name}</h3>
            <p>Trust infrastructure solutions in development for ${ind.name.toLowerCase()} sector validation and pilot preparation.</p>
          </div>`).join('')}
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'industries.html', t(lang, 'industriesTitle'), t(lang, 'industriesDescription'), body);
}

function generatePartnerships(lang) {
  const types = tArray(lang, 'partnershipsTypes');
  const body = `${pageHero(t(lang, 'partnershipsH1'), t(lang, 'partnershipsLead'))}
    <section class="tvk-section">
      <div class="tvk-container tvk-content-narrow tvk-reveal">
        <p>${t(lang, 'partnershipsP1')}</p>
        <p>${t(lang, 'partnershipsP2')}</p>
      </div>
    </section>
    <section class="tvk-section tvk-section-alt">
      <div class="tvk-container">
        <div class="tvk-labs-grid tvk-reveal">
          ${types.map(item => `
          <div class="tvk-lab-card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>`).join('')}
        </div>
        <div class="tvk-section-cta tvk-reveal">
          <a href="/${lang}/contact.html" class="tvk-btn tvk-btn-primary">${t(lang, 'partnershipsCta')}</a>
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'partnerships.html', t(lang, 'partnershipsTitle'), t(lang, 'partnershipsDescription'), body);
}

function generateInsights(lang) {
  const body = `${pageHero(t(lang, 'insightsH1'), t(lang, 'insightsLead'))}
    <section class="tvk-section">
      <div class="tvk-container tvk-content-narrow tvk-reveal">
        <p>${t(lang, 'insightsP')}</p>
      </div>
    </section>
    <section class="tvk-section tvk-section-alt">
      <div class="tvk-container">
        <div class="tvk-insights-placeholder tvk-reveal">
          <i class="fa-solid fa-newspaper"></i>
          <p>${t(lang, 'insightsPlaceholder')}</p>
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'insights.html', t(lang, 'insightsTitle'), t(lang, 'insightsDescription'), body);
}

function generateContact(lang) {
  const body = `${pageHero(t(lang, 'contactH1'), t(lang, 'contactLead'))}
    <section class="tvk-section">
      <div class="tvk-container">
        <div class="tvk-contact-layout tvk-reveal">
          <div class="tvk-contact-info">
            <div class="tvk-contact-info-item">
              <i class="fa-solid fa-envelope"></i>
              <div>
                <h4>${t(lang, 'contactGeneral')}</h4>
                <a href="mailto:contact@tvk.group">contact@tvk.group</a>
              </div>
            </div>
            <div class="tvk-contact-info-item">
              <i class="fa-solid fa-handshake"></i>
              <div>
                <h4>${t(lang, 'contactPartnerships')}</h4>
                <a href="mailto:partners@tvk.group">partners@tvk.group</a>
              </div>
            </div>
            <div class="tvk-contact-info-item">
              <i class="fa-solid fa-clipboard-check"></i>
              <div>
                <h4>${t(lang, 'contactAssessments')}</h4>
                <a href="mailto:assessments@tvk.group">assessments@tvk.group</a>
              </div>
            </div>
          </div>
          <form class="tvk-contact-form" action="mailto:contact@tvk.group" method="post" enctype="text/plain">
            <div class="tvk-form-row">
              <div class="tvk-form-group">
                <label for="name">${t(lang, 'formName')}</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div class="tvk-form-group">
                <label for="email">${t(lang, 'formEmail')}</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <div class="tvk-form-group">
              <label for="org">${t(lang, 'formOrg')}</label>
              <input type="text" id="org" name="organization" />
            </div>
            <div class="tvk-form-group">
              <label for="message">${t(lang, 'formMessage')}</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="tvk-btn tvk-btn-primary">${t(lang, 'formSubmit')} <i class="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
    </section>`;

  return pageShell(lang, 'contact.html', t(lang, 'contactTitle'), t(lang, 'contactDescription'), body);
}

const GENERATORS = {
  'about.html': generateAbout,
  'ecosystem.html': generateEcosystem,
  'ai-trust-suite.html': generateAiTrustSuite,
  'industries.html': generateIndustries,
  'partnerships.html': generatePartnerships,
  'insights.html': generateInsights,
  'contact.html': generateContact
};

let count = 0;
LANGUAGES.forEach(lang => {
  const dir = path.join(ROOT, lang.code);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  Object.entries(GENERATORS).forEach(([filename, generator]) => {
    fs.writeFileSync(path.join(dir, filename), generator(lang.code), 'utf8');
    count++;
    console.log(`Generated: ${lang.code}/${filename}`);
  });
});

console.log(`\nDone! Generated ${count} secondary pages.`);
