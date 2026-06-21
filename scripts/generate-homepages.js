#!/usr/bin/env node
/**
 * Generates TVK Group V2.0 homepage for all language versions.
 * Run: node scripts/generate-homepages.js
 */
const fs = require('fs');
const path = require('path');
const {
  ROOT,
  LANGUAGES,
  SUITE_PRODUCTS,
  INDUSTRIES,
  PRICING_PACKAGES,
  ECOSYSTEMS,
  t,
  tArray,
  navHtml,
  footerHtml,
  headHtml,
  ambientLayers,
  scriptsHtml
} = require('./tvk-shared');

function generatePage(lang) {
  const head = headHtml(lang, t(lang, 'title'), t(lang, 'description'), 'index.html');

  return `${head.html}
<body${head.dir}>
${ambientLayers()}

  <div class="tvk-page-content">
    ${navHtml(lang, 'index.html')}

    <section class="tvk-hero" id="hero">
      <div class="tvk-hero-bg"></div>
      <div class="tvk-hero-overlay"></div>
      <div class="tvk-hero-grid"></div>
      <div class="tvk-hero-content tvk-reveal visible">
        <img src="/assets/logo.tvk.group.png" class="tvk-hero-logo" alt="TVK Group" />
        <h1>${t(lang, 'heroH1')}</h1>
        <p class="tvk-hero-sub">${t(lang, 'heroSub')}</p>
        <div class="tvk-hero-ctas">
          <a href="#suite" class="tvk-btn tvk-btn-primary">${t(lang, 'heroCtaPrimary')} <i class="fa-solid fa-arrow-down"></i></a>
          <a href="/${lang}/contact.html" class="tvk-btn tvk-btn-secondary">${t(lang, 'heroCtaSecondary')}</a>
        </div>
      </div>
      <div class="tvk-hero-viz">
        <canvas id="tvk-hero-viz-canvas"></canvas>
      </div>
    </section>

    <section class="tvk-stage-notice tvk-reveal" id="stage">
      <div class="tvk-container">
        <div class="tvk-stage-notice-inner">
          <i class="fa-solid fa-circle-info"></i>
          <p>${t(lang, 'stageNotice')}</p>
        </div>
      </div>
    </section>

    <section class="tvk-section" id="suite">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang, 'suiteLabel')}</span>
          <h2>${t(lang, 'suiteH2')}</h2>
          <p>${t(lang, 'suiteP')}</p>
        </div>
        <div class="tvk-suite-grid tvk-reveal">
          ${SUITE_PRODUCTS.map(p => `
          <div class="tvk-suite-card">
            <div class="tvk-suite-icon"><i class="fa-solid ${p.icon}"></i></div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
          </div>`).join('')}
        </div>
        <div class="tvk-section-cta tvk-reveal">
          <a href="/${lang}/ai-trust-suite.html" class="tvk-btn tvk-btn-outline">View Full Suite <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="offering">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang, 'offeringLabel')}</span>
          <h2>${t(lang, 'offeringH2')}</h2>
          <p>${t(lang, 'offeringP')}</p>
        </div>
        <div class="tvk-pricing-grid tvk-reveal">
          ${PRICING_PACKAGES.map((pkg, i) => `
          <div class="tvk-pricing-card${i === 1 ? ' featured' : ''}">
            <h3>${pkg.name}</h3>
            <div class="tvk-pricing-price">${pkg.price}</div>
            <p>${pkg.desc}</p>
            <a href="/${lang}/contact.html" class="tvk-btn tvk-btn-primary tvk-btn-sm">${t(lang, 'contactCta')}</a>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="tvk-section" id="industries">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang, 'industriesLabel')}</span>
          <h2>${t(lang, 'industriesH2')}</h2>
          <p>${t(lang, 'industriesP')}</p>
        </div>
        <div class="tvk-industries-grid tvk-reveal">
          ${INDUSTRIES.map(ind => `
          <div class="tvk-industry-card">
            <div class="tvk-industry-icon"><i class="fa-solid ${ind.icon}"></i></div>
            <span>${ind.name}</span>
          </div>`).join('')}
        </div>
        <div class="tvk-section-cta tvk-reveal">
          <a href="/${lang}/industries.html" class="tvk-btn tvk-btn-outline">Explore Industries <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-navy" id="partnerships">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang, 'partnershipsLabel')}</span>
          <h2>${t(lang, 'partnershipsH2')}</h2>
          <p>${t(lang, 'partnershipsP')}</p>
        </div>
        <div class="tvk-section-cta tvk-reveal">
          <a href="/${lang}/partnerships.html" class="tvk-btn tvk-btn-light">${t(lang, 'partnershipsCta')} <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="contact">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang, 'contactLabel')}</span>
          <h2>${t(lang, 'contactH2')}</h2>
          <p>${t(lang, 'contactP')}</p>
        </div>
        <div class="tvk-contact-block tvk-reveal">
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
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="tvk-btn tvk-btn-primary">${t(lang, 'formSubmit')} <i class="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
    </section>

    ${footerHtml(lang)}
  </div>
${scriptsHtml(true)}
`;
}

LANGUAGES.forEach(lang => {
  const dir = path.join(ROOT, lang.code);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generatePage(lang.code), 'utf8');
  console.log(`Generated: ${lang.code}/index.html`);
});

console.log(`\nDone! Generated ${LANGUAGES.length} language homepages.`);
