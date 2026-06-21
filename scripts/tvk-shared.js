/**
 * Shared content, navigation, and helpers for TVK Group V2.0 site generation.
 */
const path = require('path');

const ROOT = path.join(__dirname, '..');

const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true, nav: { home: 'الرئيسية', about: 'من نحن', ecosystem: 'النظام البيئي', aiTrust: 'مجموعة الذكاء والثقة', industries: 'القطاعات', partnerships: 'الشراكات', insights: 'رؤى', contact: 'اتصل' }, langLabel: '🌐 اللغة' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nav: { home: '首页', about: '关于', ecosystem: '生态系统', aiTrust: 'AI与信任套件', industries: '行业', partnerships: '战略合作', insights: '洞察', contact: '联系' }, langLabel: '🌐 语言' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', nav: { home: 'Hjem', about: 'Om os', ecosystem: 'Økosystem', aiTrust: 'AI & Trust Suite', industries: 'Brancher', partnerships: 'Partnerskaber', insights: 'Indsigt', contact: 'Kontakt' }, langLabel: '🌐 Sprog' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', nav: { home: 'Home', about: 'Over', ecosystem: 'Ecosysteem', aiTrust: 'AI & Trust Suite', industries: 'Sectoren', partnerships: 'Partnerschappen', insights: 'Inzichten', contact: 'Contact' }, langLabel: '🌐 Taal' },
  { code: 'en', name: 'English', flag: '🇬🇧', nav: { home: 'Home', about: 'About', ecosystem: 'Ecosystem', aiTrust: 'AI & Trust Suite', industries: 'Industries', partnerships: 'Strategic Partnerships', insights: 'Insights', contact: 'Contact' }, langLabel: '🌐 Language' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nav: { home: 'Accueil', about: 'À propos', ecosystem: 'Écosystème', aiTrust: 'Suite IA & Confiance', industries: 'Secteurs', partnerships: 'Partenariats', insights: 'Perspectives', contact: 'Contact' }, langLabel: '🌐 Langue' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nav: { home: 'Startseite', about: 'Über uns', ecosystem: 'Ökosystem', aiTrust: 'AI & Trust Suite', industries: 'Branchen', partnerships: 'Partnerschaften', insights: 'Einblicke', contact: 'Kontakt' }, langLabel: '🌐 Sprache' },
  { code: 'he', name: 'עברית', flag: '🇮🇱', rtl: true, nav: { home: 'בית', about: 'אודות', ecosystem: 'אקוסיסטם', aiTrust: 'חבילת AI ואמון', industries: 'תעשיות', partnerships: 'שותפויות', insights: 'תובנות', contact: 'צור קשר' }, langLabel: '🌐 שפה' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nav: { home: 'होम', about: 'परिचय', ecosystem: 'इकोसिस्टम', aiTrust: 'AI और ट्रस्ट सूट', industries: 'उद्योग', partnerships: 'साझेदारी', insights: 'अंतर्दृष्टि', contact: 'संपर्क' }, langLabel: '🌐 भाषा' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nav: { home: 'Home', about: 'Chi siamo', ecosystem: 'Ecosistema', aiTrust: 'Suite AI & Trust', industries: 'Settori', partnerships: 'Partnership', insights: 'Approfondimenti', contact: 'Contatto' }, langLabel: '🌐 Lingua' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nav: { home: 'ホーム', about: '会社概要', ecosystem: 'エコシステム', aiTrust: 'AI＆トラストスイート', industries: '産業', partnerships: '戦略的パートナーシップ', insights: 'インサイト', contact: 'お問い合わせ' }, langLabel: '🌐 言語' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', nav: { home: '홈', about: '소개', ecosystem: '생태계', aiTrust: 'AI & Trust Suite', industries: '산업', partnerships: '전략적 파트너십', insights: '인사이트', contact: '연락처' }, langLabel: '🌐 언어' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', nav: { home: 'Strona główna', about: 'O nas', ecosystem: 'Ekosystem', aiTrust: 'Pakiet AI & Trust', industries: 'Branże', partnerships: 'Partnerstwa', insights: 'Wgląd', contact: 'Kontakt' }, langLabel: '🌐 Język' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nav: { home: 'Início', about: 'Sobre', ecosystem: 'Ecossistema', aiTrust: 'Suite AI & Trust', industries: 'Indústrias', partnerships: 'Parcerias', insights: 'Insights', contact: 'Contato' }, langLabel: '🌐 Idioma' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nav: { home: 'Главная', about: 'О нас', ecosystem: 'Экосистема', aiTrust: 'AI & Trust Suite', industries: 'Отрасли', partnerships: 'Партнёрства', insights: 'Аналитика', contact: 'Контакты' }, langLabel: '🌐 Язык' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nav: { home: 'Inicio', about: 'Acerca de', ecosystem: 'Ecosistema', aiTrust: 'Suite IA y Confianza', industries: 'Industrias', partnerships: 'Alianzas', insights: 'Perspectivas', contact: 'Contacto' }, langLabel: '🌐 Idioma' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', nav: { home: 'Hem', about: 'Om oss', ecosystem: 'Ekosystem', aiTrust: 'AI & Trust Suite', industries: 'Branscher', partnerships: 'Partnerskap', insights: 'Insikter', contact: 'Kontakt' }, langLabel: '🌐 Språk' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nav: { home: 'Ana Sayfa', about: 'Hakkımızda', ecosystem: 'Ekosistem', aiTrust: 'AI & Güven Paketi', industries: 'Sektörler', partnerships: 'Stratejik Ortaklıklar', insights: 'İçgörüler', contact: 'İletişim' }, langLabel: '🌐 Dil' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', nav: { home: 'Etusivu', about: 'Tietoa', ecosystem: 'Ekosysteemi', aiTrust: 'AI & Trust Suite', industries: 'Toimialat', partnerships: 'Kumppanuudet', insights: 'Näkemykset', contact: 'Yhteystiedot' }, langLabel: '🌐 Kieli' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', nav: { home: 'Hjem', about: 'Om oss', ecosystem: 'Økosystem', aiTrust: 'AI & Trust Suite', industries: 'Bransjer', partnerships: 'Partnerskap', insights: 'Innsikt', contact: 'Kontakt' }, langLabel: '🌐 Språk' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', nav: { home: 'Beranda', about: 'Tentang', ecosystem: 'Ekosistem', aiTrust: 'AI & Trust Suite', industries: 'Industri', partnerships: 'Kemitraan', insights: 'Wawasan', contact: 'Kontak' }, langLabel: '🌐 Bahasa' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', nav: { home: 'Trang chủ', about: 'Giới thiệu', ecosystem: 'Hệ sinh thái', aiTrust: 'Bộ AI & Trust', industries: 'Ngành', partnerships: 'Đối tác', insights: 'Thông tin', contact: 'Liên hệ' }, langLabel: '🌐 Ngôn ngữ' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', nav: { home: 'หน้าแรก', about: 'เกี่ยวกับ', ecosystem: 'ระบบนิเวศ', aiTrust: 'AI & Trust Suite', industries: 'อุตสาหกรรม', partnerships: 'พันธมิตร', insights: 'ข้อมูลเชิงลึก', contact: 'ติดต่อ' }, langLabel: '🌐 ภาษา' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', nav: { home: 'Головна', about: 'Про нас', ecosystem: 'Екосистема', aiTrust: 'AI & Trust Suite', industries: 'Галузі', partnerships: 'Партнерства', insights: 'Аналітика', contact: 'Контакти' }, langLabel: '🌐 Мова' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿', nav: { home: 'Domů', about: 'O nás', ecosystem: 'Ekosystém', aiTrust: 'AI & Trust Suite', industries: 'Odvětví', partnerships: 'Partnerství', insights: 'Poznatky', contact: 'Kontakt' }, langLabel: '🌐 Jazyk' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', nav: { home: 'Αρχική', about: 'Σχετικά', ecosystem: 'Οικοσύστημα', aiTrust: 'AI & Trust Suite', industries: 'Κλάδοι', partnerships: 'Συνεργασίες', insights: 'Αναλύσεις', contact: 'Επικοινωνία' }, langLabel: '🌐 Γλώσσα' }
];

const SUITE_PRODUCTS = [
  { icon: 'fa-brain', name: 'SOVRA', desc: 'AI decision intelligence and executive risk analysis.' },
  { icon: 'fa-shield-halved', name: 'TVK CyberLab', desc: 'Cybersecurity, digital risk and security advisory.' },
  { icon: 'fa-fingerprint', name: 'TVK ID', desc: 'Digital identity and access verification.' },
  { icon: 'fa-file-shield', name: 'GraphVault', desc: 'Document integrity infrastructure.' },
  { icon: 'fa-clock', name: 'ChronoSeal', desc: 'Timestamping and proof-of-existence.' },
  { icon: 'fa-bolt', name: 'EnergieMIND', desc: 'Energy intelligence and infrastructure optimization.' }
];

const INDUSTRIES = [
  { icon: 'fa-plane', name: 'Aviation' },
  { icon: 'fa-truck', name: 'Logistics' },
  { icon: 'fa-solar-panel', name: 'Energy' },
  { icon: 'fa-landmark', name: 'Government' },
  { icon: 'fa-heart-pulse', name: 'Healthcare' },
  { icon: 'fa-industry', name: 'Manufacturing' },
  { icon: 'fa-chart-line', name: 'Finance' },
  { icon: 'fa-tower-broadcast', name: 'Critical Infrastructure' }
];

const PRICING_PACKAGES = [
  { name: 'Executive Assessment', price: '€4,499', desc: 'Focused executive risk review and trust posture assessment for leadership teams.' },
  { name: 'Strategic Assessment', price: '€9,499', desc: 'Comprehensive organizational analysis across AI, security, identity and operational risk.' },
  { name: 'Enterprise Transformation', price: 'Custom', desc: 'Tailored engagement for complex environments requiring phased validation and partnership alignment.' }
];

const ECOSYSTEMS = [
  { id: 'sovra', name: 'SOVRA', desc: 'AI decision intelligence and executive risk analysis.', url: '' },
  { id: 'cyberlab', name: 'TVK CyberLab', desc: 'Cybersecurity, digital risk and security advisory.', url: 'https://tvkcyberlab.com' },
  { id: 'tvkid', name: 'TVK ID', desc: 'Digital identity and access verification.', url: 'https://tvkidentity.com' },
  { id: 'graphvault', name: 'GraphVault', desc: 'Document integrity infrastructure.', url: '' },
  { id: 'chronoseal', name: 'ChronoSeal', desc: 'Timestamping and proof-of-existence.', url: '' },
  { id: 'energiemind', name: 'EnergieMIND', desc: 'Energy intelligence and infrastructure optimization.', url: 'https://energiemind.com' },
  { id: 'tvklabs', name: 'TVK Labs', desc: 'Research and development core for AI, security and infrastructure.', url: 'https://tvklabs.com' }
];

const CONTENT = {
  en: {
    title: 'TVK Group — Building the Trust Infrastructure of the Next Digital Economy',
    description: 'TVK Group is an early-stage technology ecosystem developing AI, cybersecurity, digital identity and trust infrastructure solutions for enterprises and strategic partners.',
    heroH1: 'Building the Trust Infrastructure of the Next Digital Economy',
    heroSub: 'AI, cybersecurity, digital identity and trust infrastructure solutions for enterprises, institutions and strategic partners.',
    heroCtaPrimary: 'Explore Our Solutions',
    heroCtaSecondary: 'Request Strategic Discussion',
    stageNotice: 'TVK Group is currently in research, development, formation and pilot preparation stage. Our technologies are being developed for controlled enterprise validation and strategic partnership discussions.',
    suiteLabel: 'Technology Portfolio',
    suiteH2: 'AI & Trust Suite',
    suiteP: 'Integrated capabilities designed for enterprise-grade trust, risk intelligence and digital infrastructure validation.',
    offeringLabel: 'First Commercial Offering',
    offeringH2: 'TVK Executive Risk & Trust Assessment',
    offeringP: 'Structured assessment programs for leadership teams evaluating AI adoption, security posture and trust infrastructure readiness.',
    industriesLabel: 'Sector Focus',
    industriesH2: 'Industries',
    industriesP: 'Our solutions are being developed for regulated and operationally complex environments.',
    partnershipsLabel: 'Collaboration',
    partnershipsH2: 'Strategic Partnerships',
    partnershipsP: 'TVK Group seeks strategic partners, pilot environments, sector expertise and long-term alignment — not passive capital.',
    partnershipsCta: 'Discuss Partnership Opportunities',
    contactLabel: 'Get in Touch',
    contactH2: 'Start a Strategic Conversation',
    contactP: 'For partnership discussions, pilot inquiries or executive assessments, contact our team directly.',
    contactCta: 'Contact Us',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formOrg: 'Organization',
    formMessage: 'Message',
    formSubmit: 'Send Message',
    footerTagline: 'Building the Trust Infrastructure of the Next Digital Economy.',
    footerCopy: '© 2025 TVK Group Holding LTD. All rights reserved.',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    aboutTitle: 'About TVK Group — Trust Infrastructure for the Digital Economy',
    aboutDescription: 'Learn about TVK Group, an early-stage technology ecosystem in R&D, formation and pilot preparation.',
    aboutH1: 'About TVK Group',
    aboutLead: 'TVK Group is an early-stage technology ecosystem currently in research, development, formation and pilot preparation.',
    aboutP1: 'We are building integrated capabilities across AI decision intelligence, cybersecurity, digital identity and trust infrastructure — designed for enterprises, institutions and strategic partners navigating complex digital transformation.',
    aboutP2: 'Our work is focused on controlled validation, sector-specific pilot preparation and long-term partnership alignment. We do not claim completed deployments, established customer bases or proven market traction at this stage.',
    aboutP3: 'TVK Group operates through affiliated entities across the UAE, United Kingdom, Germany and Türkiye, coordinating R&D, technology development and strategic market validation.',
    aboutValues: ['R&D & Formation', 'Pilot Preparation', 'Market Validation', 'Strategic Partnerships'],
    ecosystemTitle: 'TVK Ecosystem — Integrated Trust Technology',
    ecosystemDescription: 'Explore the TVK Group technology ecosystem spanning AI, security, identity and infrastructure.',
    ecosystemH1: 'The TVK Ecosystem',
    ecosystemLead: 'A coordinated portfolio of trust infrastructure technologies under active development and validation.',
    ecosystemP: 'Each capability in the TVK ecosystem addresses a distinct layer of enterprise trust — from executive risk intelligence to document integrity and energy infrastructure optimization.',
    aiTrustTitle: 'AI & Trust Suite — TVK Group Technology Portfolio',
    aiTrustDescription: 'SOVRA, TVK CyberLab, TVK ID, GraphVault, ChronoSeal and EnergieMIND — integrated trust infrastructure solutions.',
    aiTrustH1: 'AI & Trust Suite',
    aiTrustLead: 'Six integrated capabilities forming the core of TVK Group\'s trust infrastructure portfolio.',
    industriesTitle: 'Industries — TVK Group Sector Focus',
    industriesDescription: 'TVK Group develops trust infrastructure solutions for aviation, logistics, energy, government and more.',
    industriesH1: 'Industries We Serve',
    industriesLead: 'Solutions designed for regulated, operationally complex and trust-critical environments.',
    partnershipsTitle: 'Strategic Partnerships — TVK Group',
    partnershipsDescription: 'TVK Group seeks strategic partners, pilot environments and sector expertise for long-term alignment.',
    partnershipsH1: 'Strategic Partnerships',
    partnershipsLead: 'We seek partners who bring domain expertise, pilot environments and long-term strategic alignment.',
    partnershipsP1: 'TVK Group is not seeking passive capital. We are building relationships with organizations that can contribute sector knowledge, validation environments and collaborative development capacity.',
    partnershipsP2: 'Partnership discussions may include pilot preparation, co-development, sector advisory roles and strategic technology alignment across our AI & Trust Suite.',
    partnershipsTypes: [
      { title: 'Pilot Environments', desc: 'Organizations willing to participate in controlled validation and structured assessment programs.' },
      { title: 'Sector Expertise', desc: 'Domain specialists in aviation, energy, government, healthcare and critical infrastructure.' },
      { title: 'Technology Alignment', desc: 'Partners with complementary capabilities in AI, security, identity or infrastructure.' },
      { title: 'Strategic Collaboration', desc: 'Long-term alignment focused on trust infrastructure development and market validation.' }
    ],
    insightsTitle: 'Insights — TVK Group',
    insightsDescription: 'Perspectives on trust infrastructure, AI governance and digital transformation from TVK Group.',
    insightsH1: 'Insights',
    insightsLead: 'Perspectives on trust infrastructure, enterprise risk and the evolving digital economy.',
    insightsP: 'As TVK Group progresses through R&D and pilot preparation, we will share analysis on AI governance, cybersecurity posture, digital identity frameworks and sector-specific trust challenges.',
    insightsPlaceholder: 'New perspectives and analysis will be published here as our research and validation programs develop.',
    contactTitle: 'Contact — TVK Group',
    contactDescription: 'Contact TVK Group for strategic discussions, partnership inquiries and executive assessments.',
    contactH1: 'Contact',
    contactLead: 'Reach our team for partnership discussions, pilot inquiries or executive assessment requests.',
    contactGeneral: 'General Inquiries',
    contactPartnerships: 'Partnerships',
    contactAssessments: 'Executive Assessments'
  },
  de: {
    heroH1: 'Aufbau der Vertrauensinfrastruktur der nächsten digitalen Wirtschaft',
    heroSub: 'KI-, Cybersicherheits-, digitale Identitäts- und Vertrauensinfrastrukturlösungen für Unternehmen, Institutionen und strategische Partner.',
    stageNotice: 'TVK Group befindet sich derzeit in der Forschungs-, Entwicklungs-, Gründungs- und Pilotvorbereitungsphase.',
    footerTagline: 'Aufbau der Vertrauensinfrastruktur der nächsten digitalen Wirtschaft.'
  },
  fr: {
    heroH1: 'Construire l\'infrastructure de confiance de la prochaine économie numérique',
    heroSub: 'Solutions d\'IA, cybersécurité, identité numérique et infrastructure de confiance pour les entreprises, institutions et partenaires stratégiques.',
    stageNotice: 'TVK Group est actuellement en phase de recherche, développement, formation et préparation de pilotes.',
    footerTagline: 'Construire l\'infrastructure de confiance de la prochaine économie numérique.'
  },
  es: {
    heroH1: 'Construyendo la infraestructura de confianza de la próxima economía digital',
    heroSub: 'Soluciones de IA, ciberseguridad, identidad digital e infraestructura de confianza para empresas, instituciones y socios estratégicos.',
    stageNotice: 'TVK Group se encuentra actualmente en fase de investigación, desarrollo, formación y preparación de pilotos.',
    footerTagline: 'Construyendo la infraestructura de confianza de la próxima economía digital.'
  },
  tr: {
    heroH1: 'Yeni Dijital Ekonominin Güven Altyapısını İnşa Ediyoruz',
    heroSub: 'Kurumlar, kuruluşlar ve stratejik ortaklar için yapay zeka, siber güvenlik, dijital kimlik ve güven altyapısı çözümleri.',
    stageNotice: 'TVK Group şu anda araştırma, geliştirme, kuruluş ve pilot hazırlık aşamasındadır.',
    footerTagline: 'Yeni Dijital Ekonominin Güven Altyapısını İnşa Ediyoruz.'
  }
};

function t(lang, key) {
  const localized = CONTENT[lang] || {};
  return localized[key] !== undefined ? localized[key] : CONTENT.en[key];
}

function tArray(lang, key) {
  const localized = CONTENT[lang] || {};
  return localized[key] !== undefined ? localized[key] : CONTENT.en[key];
}

function langOptions(currentCode, page = 'index.html') {
  return LANGUAGES.map(l =>
    `<option value="/${l.code}/${page}"${l.code === currentCode ? ' selected' : ''}>${l.flag} ${l.name}</option>`
  ).join('\n          ');
}

function hreflangTags(page = 'index.html') {
  return LANGUAGES.map(l =>
    `<link rel="alternate" hreflang="${l.code}" href="https://tvk.group/${l.code}/${page}" />`
  ).join('\n  ') + `\n  <link rel="alternate" hreflang="x-default" href="https://tvk.group/en/${page}" />`;
}

function navHtml(lang, activePage = 'index.html') {
  const l = LANGUAGES.find(x => x.code === lang);
  const pages = [
    { file: 'index.html', label: l.nav.home },
    { file: 'about.html', label: l.nav.about },
    { file: 'ecosystem.html', label: l.nav.ecosystem },
    { file: 'ai-trust-suite.html', label: l.nav.aiTrust },
    { file: 'industries.html', label: l.nav.industries },
    { file: 'partnerships.html', label: l.nav.partnerships },
    { file: 'insights.html', label: l.nav.insights },
    { file: 'contact.html', label: l.nav.contact }
  ];
  const links = pages.map(p =>
    `<li><a href="/${lang}/${p.file}"${p.file === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('\n        ');

  return `<nav class="tvk-nav">
      <a href="/${lang}/index.html" class="tvk-nav-brand">
        <img src="/assets/logo.tvk.group.png" alt="TVK Group" />
        <strong>TVK GROUP</strong>
      </a>
      <button class="tvk-nav-toggle" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
      <ul class="tvk-nav-links">
        ${links}
        <li>
          <select class="tvk-lang-select" onchange="window.location.href=this.value;">
            <option disabled>${l.langLabel}</option>
            ${langOptions(lang, activePage)}
          </select>
        </li>
      </ul>
    </nav>`;
}

function footerHtml(lang) {
  return `<footer class="tvk-footer">
      <p class="tvk-footer-tagline">${t(lang, 'footerTagline')}</p>
      <div class="tvk-footer-links">
        <a href="/${lang}/legal.html">${t(lang, 'footerLegal')}</a>
        <a href="/${lang}/privacy.html">${t(lang, 'footerPrivacy')}</a>
        <a href="/${lang}/terms.html">${t(lang, 'footerTerms')}</a>
      </div>
      <p>${t(lang, 'footerCopy')}</p>
    </footer>`;
}

function headHtml(lang, title, description, page = 'index.html', extra = '') {
  const l = LANGUAGES.find(x => x.code === lang);
  const dir = l.rtl ? ' dir="rtl"' : '';
  return {
    dir,
    html: `<!DOCTYPE html>
<html lang="${lang}"${dir}>
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#071A3D" />
  <link rel="canonical" href="https://tvk.group/${lang}/${page}" />
  ${hreflangTags(page)}
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://tvk.group/${lang}/${page}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://tvk.group/og-preview.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/assets/favicon.ico" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="/assets/css/tvk-master.css?v=4" />
  ${extra}
</head>`
  };
}

function ambientLayers() {
  return `  <canvas id="tvk-neural-canvas"></canvas>
  <canvas id="tvk-particles-canvas"></canvas>`;
}

function scriptsHtml(includeEcosystem = false) {
  const eco = includeEcosystem
    ? `\n  <script>\n    window.TVK_ECOSYSTEMS = ${JSON.stringify(ECOSYSTEMS)};\n  </script>`
    : '';
  return `${eco}
  <script src="/assets/js/tvk-master.js?v=4"></script>
</body>
</html>`;
}

module.exports = {
  ROOT,
  LANGUAGES,
  SUITE_PRODUCTS,
  INDUSTRIES,
  PRICING_PACKAGES,
  ECOSYSTEMS,
  CONTENT,
  t,
  tArray,
  langOptions,
  hreflangTags,
  navHtml,
  footerHtml,
  headHtml,
  ambientLayers,
  scriptsHtml
};
