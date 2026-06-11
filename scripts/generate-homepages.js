#!/usr/bin/env node
/**
 * Generates TVK Group master homepage for all language versions.
 * Run: node scripts/generate-homepages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true, nav: { home: 'الرئيسية', company: 'الشركة', work: 'انضم إلينا', legal: 'قانوني', privacy: 'الخصوصية', terms: 'الشروط', contact: 'اتصل' }, langLabel: '🌐 اللغة' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nav: { home: '首页', company: '公司', work: '加入我们', legal: '法律', privacy: '隐私', terms: '条款', contact: '联系' }, langLabel: '🌐 语言' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', nav: { home: 'Hjem', company: 'Virksomhed', work: 'Karriere', legal: 'Juridisk', privacy: 'Privatliv', terms: 'Vilkår', contact: 'Kontakt' }, langLabel: '🌐 Sprog' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', nav: { home: 'Home', company: 'Bedrijf', work: 'Werken', legal: 'Juridisch', privacy: 'Privacy', terms: 'Voorwaarden', contact: 'Contact' }, langLabel: '🌐 Taal' },
  { code: 'en', name: 'English', flag: '🇬🇧', nav: { home: 'Home', company: 'Company', work: 'Work With Us', legal: 'Legal', privacy: 'Privacy', terms: 'Terms', contact: 'Contact' }, langLabel: '🌐 Language' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nav: { home: 'Accueil', company: 'Entreprise', work: 'Carrières', legal: 'Juridique', privacy: 'Confidentialité', terms: 'Conditions', contact: 'Contact' }, langLabel: '🌐 Langue' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nav: { home: 'Startseite', company: 'Unternehmen', work: 'Karriere', legal: 'Rechtliches', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', contact: 'Kontakt' }, langLabel: '🌐 Sprache' },
  { code: 'he', name: 'עברית', flag: '🇮🇱', rtl: true, nav: { home: 'בית', company: 'חברה', work: 'קריירה', legal: 'משפטי', privacy: 'פרטיות', terms: 'תנאים', contact: 'צור קשר' }, langLabel: '🌐 שפה' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nav: { home: 'होम', company: 'कंपनी', work: 'करियर', legal: 'कानूनी', privacy: 'गोपनीयता', terms: 'शर्तें', contact: 'संपर्क' }, langLabel: '🌐 भाषा' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nav: { home: 'Home', company: 'Azienda', work: 'Lavora con noi', legal: 'Legale', privacy: 'Privacy', terms: 'Termini', contact: 'Contatto' }, langLabel: '🌐 Lingua' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nav: { home: 'ホーム', company: '会社', work: '採用', legal: '法務', privacy: 'プライバシー', terms: '利用規約', contact: 'お問い合わせ' }, langLabel: '🌐 言語' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', nav: { home: '홈', company: '회사', work: '채용', legal: '법률', privacy: '개인정보', terms: '약관', contact: '연락처' }, langLabel: '🌐 언어' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', nav: { home: 'Strona główna', company: 'Firma', work: 'Kariera', legal: 'Prawne', privacy: 'Prywatność', terms: 'Regulamin', contact: 'Kontakt' }, langLabel: '🌐 Język' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nav: { home: 'Início', company: 'Empresa', work: 'Carreiras', legal: 'Legal', privacy: 'Privacidade', terms: 'Termos', contact: 'Contato' }, langLabel: '🌐 Idioma' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nav: { home: 'Главная', company: 'Компания', work: 'Карьера', legal: 'Правовая', privacy: 'Конфиденциальность', terms: 'Условия', contact: 'Контакты' }, langLabel: '🌐 Язык' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nav: { home: 'Inicio', company: 'Empresa', work: 'Trabaja con nosotros', legal: 'Legal', privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto' }, langLabel: '🌐 Idioma' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', nav: { home: 'Hem', company: 'Företag', work: 'Karriär', legal: 'Juridik', privacy: 'Integritet', terms: 'Villkor', contact: 'Kontakt' }, langLabel: '🌐 Språk' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nav: { home: 'Ana Sayfa', company: 'Şirket', work: 'Kariyer', legal: 'Yasal', privacy: 'Gizlilik', terms: 'Şartlar', contact: 'İletişim' }, langLabel: '🌐 Dil' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', nav: { home: 'Etusivu', company: 'Yritys', work: 'Ura', legal: 'Oikeudellinen', privacy: 'Tietosuoja', terms: 'Ehdot', contact: 'Yhteystiedot' }, langLabel: '🌐 Kieli' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', nav: { home: 'Hjem', company: 'Selskap', work: 'Karriere', legal: 'Juridisk', privacy: 'Personvern', terms: 'Vilkår', contact: 'Kontakt' }, langLabel: '🌐 Språk' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', nav: { home: 'Beranda', company: 'Perusahaan', work: 'Karier', legal: 'Hukum', privacy: 'Privasi', terms: 'Ketentuan', contact: 'Kontak' }, langLabel: '🌐 Bahasa' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', nav: { home: 'Trang chủ', company: 'Công ty', work: 'Tuyển dụng', legal: 'Pháp lý', privacy: 'Quyền riêng tư', terms: 'Điều khoản', contact: 'Liên hệ' }, langLabel: '🌐 Ngôn ngữ' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', nav: { home: 'หน้าแรก', company: 'บริษัท', work: 'ร่วมงาน', legal: 'กฎหมาย', privacy: 'ความเป็นส่วนตัว', terms: 'ข้อกำหนด', contact: 'ติดต่อ' }, langLabel: '🌐 ภาษา' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', nav: { home: 'Головна', company: 'Компанія', work: 'Кар\'єра', legal: 'Правове', privacy: 'Конфіденційність', terms: 'Умови', contact: 'Контакти' }, langLabel: '🌐 Мова' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿', nav: { home: 'Domů', company: 'Společnost', work: 'Kariéra', legal: 'Právní', privacy: 'Soukromí', terms: 'Podmínky', contact: 'Kontakt' }, langLabel: '🌐 Jazyk' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', nav: { home: 'Αρχική', company: 'Εταιρεία', work: 'Καριέρα', legal: 'Νομικά', privacy: 'Απόρρητο', terms: 'Όροι', contact: 'Επικοινωνία' }, langLabel: '🌐 Γλώσσα' }
];

const CONTENT = {
  en: {
    title: 'TVK Group Holding LTD — Building the Infrastructure of Intelligent Civilization',
    description: 'TVK Group — Technology Holding, AI Infrastructure, Blockchain, Energy Systems, Digital Identity, Future Civilization Architect',
    heroH1: 'Building the Infrastructure of Intelligent Civilization.',
    heroSub: 'Technology. Intelligence. Sovereignty. TVK Group builds, owns, develops, funds, and coordinates multiple future-facing ecosystems.',
    heroCta: 'Explore the Ecosystem',
    pillars: ['AI Networks', 'Energy Systems', 'Digital Identity', 'Blockchain Infrastructure', 'Global Connectivity'],
    aboutH2: 'TVK Group Holding LTD',
    aboutP: 'TVK Group is a sovereign conglomerate focused on building autonomous systems across energy, finance, AI, defense, and digital identity. Operating from the UAE, UK, Germany, and Türkiye, we unify innovation and trust through decentralized infrastructure and strategic project brands.',
    identities: ['Technology Holding', 'AI Infrastructure Company', 'Blockchain Infrastructure Builder', 'Energy Systems Developer', 'Digital Identity Innovator', 'Future Civilization Architect'],
    galaxyLabel: 'Ecosystem Galaxy', galaxyH2: 'The TVK Ecosystem Universe', galaxyP: 'A sovereign constellation of interconnected technologies — each ecosystem orbiting the central intelligence of TVK Group.',
    orgLabel: 'Holding Structure', orgH2: 'Organizational Intelligence Map', orgP: 'TVK Group coordinates divisions across technology, intelligence, and infrastructure at global scale.',
    orgRoot: 'TVK GROUP',
    divisions: ['Technology Division', 'AI Division', 'Blockchain Division', 'Energy Division', 'Health Division', 'Infrastructure Division'],
    mapLabel: 'Global Operations', mapH2: 'Global Operations Center', mapP: 'Ecosystem presence, partnerships, infrastructure deployment, and research across continents.',
    mapLegend: ['Ecosystem Presence', 'Partnerships', 'Infrastructure', 'Research', 'Future Expansion'],
    labsLabel: 'Research Core', labsH2: 'TVK Labs', labsP: 'The research and development core driving innovation across AI, blockchain, infrastructure, security, and energy systems.',
    labItems: [
      { icon: 'fa-brain', title: 'AI Research', desc: 'Sovereign AI kernels, reasoning systems, and intelligent agents.' },
      { icon: 'fa-link', title: 'Blockchain Research', desc: 'Protocol design, consensus mechanisms, and cross-chain interoperability.' },
      { icon: 'fa-server', title: 'Infrastructure Research', desc: 'Scalable systems, DePIN networks, and intelligent automation.' },
      { icon: 'fa-shield-halved', title: 'Security Research', desc: 'Cyber defense, validator security, and cryptographic protocols.' },
      { icon: 'fa-bolt', title: 'Energy Research', desc: 'Renewable integration, smart grids, and carbon-efficient mining.' }
    ],
    investLabel: 'Investment & Ventures', investH2: 'Building Future Infrastructure', investP: 'TVK Group is a builder — developing, funding, and coordinating strategic ventures that shape intelligent civilization.',
    investItems: [
      { title: 'Current Projects', desc: 'Active ecosystem deployments across blockchain, AI, identity, and energy infrastructure.' },
      { title: 'Strategic Ventures', desc: 'Long-term partnerships and joint ventures advancing sovereign technology systems.' },
      { title: 'Future Infrastructure', desc: 'Next-generation programs in digital identity, autonomous governance, and intelligent energy.' },
      { title: 'Innovation Programs', desc: 'R&D initiatives through TVK Labs advancing protocol, security, and civilization-scale systems.' }
    ],
    techLabel: 'Technology Stack', techH2: 'Integrated Technology Architecture', techP: 'Eight interconnected domains forming the foundation of the TVK intelligent infrastructure stack.',
    techTags: ['AI', 'Blockchain', 'Identity', 'Energy', 'Security', 'Governance', 'Analytics', 'Infrastructure'],
    sovraH3: 'SOVRA', sovraP: 'The intelligence layer of the TVK ecosystem. SOVRA powers reasoning engines, knowledge systems, and sovereign AI coordination across all connected platforms.',
    sovraFeatures: ['Intelligence Dashboards', 'Reasoning Panels', 'Knowledge Systems', 'AI Demonstrations'],
    enteleH3: 'ENTELΞKRON', enteleP: 'The sovereign coordination layer. Foundational chain of the TVK ecosystem with modular AI kernel, zk-DPoS consensus, and sovereign digital operations core.',
    enteleFeatures: ['Identity', 'Governance', 'Validators', 'Wallets', 'Protocol', 'Intelligence'],
    enteleLink: 'Explore EnteleSCAN →',
    futureLabel: 'Strategic Initiatives', futureH2: 'Future Infrastructure Programs', futureP: 'Strategic initiatives advancing the infrastructure of intelligent civilization.',
    futureItems: [
      { title: 'Digital Identity', desc: 'Universal sovereign identity credentials linked across chains, platforms, and governance systems.' },
      { title: 'Sovereign AI', desc: 'Autonomous intelligence kernels operating within decentralized, privacy-preserving frameworks.' },
      { title: 'Intelligent Energy', desc: 'Carbon-efficient mining, renewable integration, and smart energy grid coordination.' },
      { title: 'Advanced Analytics', desc: 'Market intelligence, signal processing, and civilization-scale data reasoning systems.' },
      { title: 'Security Systems', desc: 'Validator protection, breach detection, and on-chain wallet security infrastructure.' },
      { title: 'Autonomous Governance', desc: 'DAO frameworks, voting protocols, and self-governing ecosystem coordination.' }
    ],
    companiesH2: 'Our Companies', projectsH2: 'Our Projects',
    footerTagline: 'Building the infrastructure of the next intelligent civilization.',
    footerCopy: '© 2025 TVK Group Holding LTD. All rights reserved.'
  },
  de: {
    heroH1: 'Die Infrastruktur der intelligenten Zivilisation aufbauen.',
    heroSub: 'Technologie. Intelligenz. Souveränität. TVK Group baut, besitzt, entwickelt, finanziert und koordiniert zukunftsorientierte Ökosysteme.',
    heroCta: 'Ökosystem erkunden',
    aboutP: 'TVK Group ist ein souveräner Konzern, der sich auf den Aufbau autonomer Systeme in den Bereichen Energie, Finanzen, KI, Verteidigung und digitale Identität konzentriert. Mit Niederlassungen in den VAE, dem Vereinigten Königreich, Deutschland und der Türkei vereinen wir Innovation und Vertrauen durch dezentralisierte Infrastruktur und strategische Projektmarken.',
    companiesH2: 'Unsere Unternehmen', projectsH2: 'Unsere Projekte'
  },
  fr: {
    heroH1: 'Construire l\'infrastructure de la civilisation intelligente.',
    heroSub: 'Technologie. Intelligence. Souveraineté. TVK Group construit, possède, développe, finance et coordonne de multiples écosystèmes tournés vers l\'avenir.',
    aboutP: 'TVK Group est un conglomérat souverain axé sur la construction de systèmes autonomes dans l\'énergie, la finance, l\'IA, la défense et l\'identité numérique. Opérant depuis les Émirats arabes unis, le Royaume-Uni et l\'Allemagne, nous unifions innovation et confiance.',
    companiesH2: 'Nos entreprises', projectsH2: 'Nos projets'
  },
  es: {
    heroH1: 'Construyendo la infraestructura de la civilización inteligente.',
    heroSub: 'Tecnología. Inteligencia. Soberanía. TVK Group construye, posee, desarrolla, financia y coordina múltiples ecosistemas orientados al futuro.',
    aboutP: 'TVK Group es un conglomerado soberano enfocado en construir sistemas autónomos en energía, finanzas, IA, defensa e identidad digital. Operando desde los EAU, Reino Unido y Alemania, unificamos innovación y confianza.',
    companiesH2: 'Nuestras empresas', projectsH2: 'Nuestros proyectos'
  },
  ar: {
    heroH1: 'بناء بنية الحضارة الذكية.',
    heroSub: 'التكنولوجيا. الذكاء. السيادة. تبني TVK Group وتملك وتطور وتموّل وتنسق أنظمة بيئية متعددة موجهة نحو المستقبل.',
    aboutP: 'TVK Group هي تكتل سيادي يركز على بناء أنظمة مستقلة عبر الطاقة والتمويل والذكاء الاصطناعي والدفاع والهوية الرقمية. تعمل من الإمارات والمملكة المتحدة وألمانيا.',
    companiesH2: 'شركاتنا', projectsH2: 'مشاريعنا'
  },
  zh: {
    heroH1: '构建智能文明的基础设施。',
    heroSub: '技术。智能。主权。TVK Group 构建、拥有、开发、资助并协调多个面向未来的生态系统。',
    aboutP: 'TVK Group 是一个主权企业集团，专注于在能源、金融、人工智能、国防和数字身份领域构建自主系统。在阿联酋、英国和德国运营。',
    companiesH2: '我们的公司', projectsH2: '我们的项目'
  },
  ja: {
    heroH1: 'インテリジェント文明のインフラを構築する。',
    heroSub: 'テクノロジー。知性。主権。TVK Groupは複数の未来志向エコシステムを構築、所有、開発、資金提供、調整します。',
    companiesH2: 'グループ企業', projectsH2: 'プロジェクト'
  },
  ru: {
    heroH1: 'Создаём инфраструктуру интеллектуальной цивилизации.',
    heroSub: 'Технологии. Интеллект. Суверенитет. TVK Group строит, владеет, развивает, финансирует и координирует экосистемы будущего.',
    companiesH2: 'Наши компании', projectsH2: 'Наши проекты'
  },
  tr: {
    heroH1: 'Akıllı Medeniyetin Altyapısını İnşa Ediyoruz.',
    heroSub: 'Teknoloji. Zeka. Egemenlik. TVK Group, geleceğe yönelik çoklu ekosistemleri inşa eder, sahiplenir, geliştirir, finanse eder ve koordine eder.',
    aboutP: 'TVK Group; enerji, finans, yapay zeka, savunma ve dijital kimlik alanlarında özerk sistemler inşa eden egemen bir holdingdir. BAE, Birleşik Krallık, Almanya ve Türkiye\'de faaliyet göstererek merkeziyetsiz altyapı ve stratejik proje markalarıyla inovasyon ve güveni birleştiriyoruz.',
    companiesH2: 'Şirketlerimiz', projectsH2: 'Projelerimiz'
  }
};

function t(lang, key) {
  const en = CONTENT.en;
  const localized = CONTENT[lang] || {};
  return localized[key] !== undefined ? localized[key] : en[key];
}

function tArray(lang, key) {
  const en = CONTENT.en;
  const localized = CONTENT[lang] || {};
  return localized[key] !== undefined ? localized[key] : en[key];
}

const ECOSYSTEMS = [
  { id: 'entelekron', name: 'ENTELΞKRON', desc: 'Foundational chain with zk-DPoS consensus and sovereign AI kernel.', url: 'https://entelekron.org' },
  { id: 'sovra', name: 'SOVRA', desc: 'Intelligence layer powering reasoning and knowledge systems.', url: '' },
  { id: 'tvklabs', name: 'TVK Labs', desc: 'Research and development core for AI, blockchain, and infrastructure.', url: 'https://tvklabs.com' },
  { id: 'entelescan', name: 'EnteleSCAN', desc: 'Biometric ID and decentralized identity authentication.', url: 'https://entelescan.com' },
  { id: 'entelelink', name: 'EnteleLINK', desc: 'ISO-20022 interoperability layer for chain communication.', url: 'https://entelelink.com' },
  { id: 'entelevault', name: 'EnteleVAULT', desc: 'Vault-grade secure storage for identity and governance assets.', url: 'https://entelevault.com' },
  { id: 'chronoseal', name: 'ChronoSeal', desc: 'Temporal integrity and timestamp verification systems.', url: '' },
  { id: 'graphvault', name: 'GraphVAULT', desc: 'Graph-based knowledge and data vault infrastructure.', url: '' },
  { id: 'qpresence', name: 'Q-Presence', desc: 'Decentralized presence protocol across chains.', url: 'https://q-presence.com' },
  { id: 'entelewallet', name: 'EnteleWallet', desc: 'Sovereign wallet infrastructure for ecosystem assets.', url: '' },
  { id: 'enteleledger', name: 'EnteleLEDGER', desc: 'Distributed ledger coordination and audit systems.', url: '' },
  { id: 'cerebthra', name: 'Cerebthra', desc: 'Cognitive architecture and neural reasoning framework.', url: '' },
  { id: 'energiemind', name: 'Energiemind', desc: 'Intelligent energy systems and carbon-efficient mining.', url: 'https://energiemind.com' },
  { id: 'avasante', name: 'Ava Santé', desc: 'AI-powered health and wellness for women.', url: 'https://avasante.com' },
  { id: 'alvina', name: 'ALVINA', desc: 'Emotional AI layer and soul-linked expression systems.', url: 'https://alvina.app' },
  { id: 'sentsig', name: 'Sentient Signals', desc: 'Market intelligence and civilization-scale signal processing.', url: 'https://sentientsignals.io' },
  { id: 'cyberlab', name: 'TVK CyberLab', desc: 'Cybersecurity and Operation Shield validator protection.', url: 'https://tvkcyberlab.com' }
];

const COMPANIES = [
  { img: 'tvklabs_logo.png', url: 'https://tvklabs.com', title: 'TVK Labs & Technologies LTD', desc: 'Innovating Intelligence, Powering the Future. TVK Labs serves as the advanced research and development core of TVK Group, driving innovation across artificial intelligence, blockchain protocols, software systems, and intelligent automation.' },
  { img: 'tvk_logo_1024px_transparent.png', url: 'https://energiemind.com', title: 'TVK Infrastructure & Energy Systems LTD', desc: 'Empowering Resilience with Smart Infrastructure and Green Energy. Designs and delivers next-generation prefab architecture, solar energy systems, and intelligent IoT-based logistics solutions.' },
  { img: 'prefab_logo.png', url: 'https://t-v-k.com', title: 'TVK Container Fertighäuser Militärischem Material Internationaler Transport GmbH', desc: 'Rapid Deployment. Secure Logistics. Global Reach. Specializes in modular containers, prefabricated housing, and secure military-grade infrastructure with international logistics.' },
  { img: 'london_logo.png', url: 'https://london-thesecretofwomen.com', title: 'LoNDon – The Secret of Women - LTD', desc: 'Timeless Elegance. Intelligent Wellness. A luxury beauty and wellness brand combining ancient rituals with cutting-edge wellness technologies.' },
  { img: 'logo.tvk.group.png', url: '', title: 'TVK Group Teknoloji Yatırım İthalat İhracat Ticaret ve Sanayi Limited Şirketi 🇹🇷', desc: 'Technology Investment. Import & Export. Trade & Industry. Turkish operations entity driving technology investment, international trade, import-export coordination, and industrial development for TVK Group across Türkiye and regional markets.' }
];

const PROJECTS = [
  { img: 'entelekron_logo.png', url: 'https://entelekron.org', title: 'EnteleKron', desc: 'Foundational chain of the TVK ecosystem. Modular AI kernel, zk-DPoS consensus, and sovereign digital operations core.' },
  { img: 'entelelink_logo.png', url: 'https://entelelink.com', title: 'EnteleLink', desc: 'ISO-20022-compliant interoperability layer for seamless chain-to-chain communication and validator integration.' },
  { img: 'entelescan_logo.png', url: 'https://entelescan.com', title: 'EnteleScan', desc: 'Biometric scanning and decentralized identity authentication system supporting TVK ID issuance and verification.' },
  { img: 'entelevault_logo.png', url: 'https://entelevault.com', title: 'EnteleVault', desc: 'Vault-grade secure storage for identity tokens, voting keys, backup secrets, and DAO governance assets.' },
  { img: 'qp_logo.png', url: 'https://q-presence.com', title: 'Q-Presence', desc: 'Decentralized presence protocol that maps user signals, digital intent, and multi-device awareness across chains.' },
  { img: 'sentientsignals_logo.png', url: 'https://sentientsignals.io', title: 'Sentient Signals', desc: 'Market intelligence and civilization-scale signal processing within the TVK ecosystem.' },
  { img: 'tvkid_logo.png', url: 'https://tvkidentity.com', title: 'TVK ID', desc: 'Universal user identity credential linked to EnteleScan, used for cross-chain DAO voting, login, and governance.' },
  { img: 'cyberlab_logo.png', url: 'https://tvkcyberlab.com', title: 'TVK CyberLab & Operation Shield', desc: 'Cybersecurity and breach detection system integrated into validator operations and on-chain wallet security.' },
  { img: 'avasante_logo.png', url: 'https://avasante.com', title: 'Ava Santé', desc: 'AI-powered health and lifestyle assistant for women, with wellness rituals and multilingual voice interaction.' },
  { img: 'avasentient_logo.png', url: 'https://avasentient.com', title: 'Ava Sentient', desc: 'Virtual influencer and advanced AI entity built for interactive presence, social automation, and content creation.' },
  { img: 'alvina_logo.png', url: 'https://alvina.app', title: 'Alvina App / Flow / World', desc: 'Symbolic and emotional layer of Ava system. Represents soul-linked AI expression and long-term story arc modules.', extraLinks: [{ url: 'https://alvinaflow.com', title: 'Alvina Flow' }, { url: 'https://alvinaworld.com', title: 'Alvina World' }] }
];

function langOptions(currentCode) {
  return LANGUAGES.map(l =>
    `<option value="/${l.code}/index.html"${l.code === currentCode ? ' selected' : ''}>${l.flag} ${l.name}</option>`
  ).join('\n          ');
}

function generatePage(lang) {
  const l = LANGUAGES.find(x => x.code === lang.code);
  const dir = l.rtl ? ' dir="rtl"' : '';
  const divisions = tArray(lang.code, 'divisions');
  const labItems = tArray(lang.code, 'labItems');
  const investItems = tArray(lang.code, 'investItems');
  const futureItems = tArray(lang.code, 'futureItems');
  const pillars = tArray(lang.code, 'pillars');
  const identities = tArray(lang.code, 'identities');
  const techTags = tArray(lang.code, 'techTags');
  const mapLegend = tArray(lang.code, 'mapLegend');
  const sovraFeatures = tArray(lang.code, 'sovraFeatures');
  const enteleFeatures = tArray(lang.code, 'enteleFeatures');

  return `<!DOCTYPE html>
<html lang="${lang.code}"${dir}>
<head>
  <meta charset="UTF-8" />
  <title>${t(lang.code, 'title')}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${t(lang.code, 'description')}" />
  <link rel="icon" href="/assets/favicon.ico" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="/assets/css/tvk-master.css?v=3" />
</head>
<body${dir}>
  <canvas id="tvk-neural-canvas"></canvas>
  <canvas id="tvk-particles-canvas"></canvas>

  <div class="tvk-page-content">
    <nav class="tvk-nav">
      <a href="/${lang.code}/index.html" class="tvk-nav-brand">
        <img src="/assets/logo.tvk.group.png" alt="TVK Group" />
        <strong>TVK GROUP</strong>
      </a>
      <button class="tvk-nav-toggle" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
      <ul class="tvk-nav-links">
        <li><a href="/${lang.code}/index.html">${l.nav.home}</a></li>
        <li><a href="/${lang.code}/company.html">${l.nav.company}</a></li>
        <li><a href="/${lang.code}/work.html">${l.nav.work}</a></li>
        <li><a href="/${lang.code}/legal.html">${l.nav.legal}</a></li>
        <li><a href="/${lang.code}/privacy.html">${l.nav.privacy}</a></li>
        <li><a href="/${lang.code}/terms.html">${l.nav.terms}</a></li>
        <li><a href="/${lang.code}/contact.html">${l.nav.contact}</a></li>
        <li>
          <select class="tvk-lang-select" onchange="window.location.href=this.value;">
            <option disabled>${l.langLabel}</option>
            ${langOptions(lang.code)}
          </select>
        </li>
      </ul>
    </nav>

    <section class="tvk-hero" id="hero">
      <div class="tvk-hero-bg"></div>
      <div class="tvk-hero-overlay"></div>
      <div class="tvk-hero-grid"></div>
      <div class="tvk-hero-content tvk-reveal visible">
        <img src="/assets/logo.tvk.group.png" class="tvk-hero-logo" alt="TVK Group" />
        <h1>${t(lang.code, 'heroH1')}</h1>
        <p class="tvk-hero-sub">${t(lang.code, 'heroSub')}</p>
        <div class="tvk-hero-pillars">
          ${pillars.map(p => `<span class="tvk-pillar">${p}</span>`).join('\n          ')}
        </div>
        <a href="#ecosystem" class="tvk-hero-cta">${t(lang.code, 'heroCta')} <i class="fa-solid fa-arrow-down"></i></a>
      </div>
      <div class="tvk-hero-viz">
        <canvas id="tvk-hero-viz-canvas"></canvas>
      </div>
    </section>

    <section class="tvk-section" id="about">
      <div class="tvk-container tvk-about tvk-reveal">
        <h2>${t(lang.code, 'aboutH2')}</h2>
        <p>${t(lang.code, 'aboutP')}</p>
        <div class="tvk-identity-pills">
          ${identities.map(i => `<span class="tvk-identity-pill">${i}</span>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="ecosystem">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'galaxyLabel')}</span>
          <h2>${t(lang.code, 'galaxyH2')}</h2>
          <p>${t(lang.code, 'galaxyP')}</p>
        </div>
        <div class="tvk-galaxy-wrap tvk-reveal">
          <canvas id="tvk-galaxy-canvas"></canvas>
          <div class="tvk-galaxy-tooltip" id="tvk-galaxy-tooltip"><h4></h4><p></p></div>
        </div>
      </div>
    </section>

    <section class="tvk-section" id="structure">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'orgLabel')}</span>
          <h2>${t(lang.code, 'orgH2')}</h2>
          <p>${t(lang.code, 'orgP')}</p>
        </div>
        <div class="tvk-org-chart tvk-reveal">
          <div class="tvk-org-root">${t(lang.code, 'orgRoot')}</div>
          <div class="tvk-org-connector"></div>
          <div class="tvk-org-divisions">
            ${divisions.map(d => `<div class="tvk-org-node">${d}</div>`).join('\n            ')}
          </div>
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="global">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'mapLabel')}</span>
          <h2>${t(lang.code, 'mapH2')}</h2>
          <p>${t(lang.code, 'mapP')}</p>
        </div>
        <div class="tvk-map-container tvk-reveal">
          <svg id="tvk-world-map" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="1000" height="500" fill="#f1f5f9"/>
            <path d="M150,120 Q200,80 280,100 T400,90 T500,110 T600,95 T750,105 T850,115 L880,140 Q850,180 800,200 T700,220 T600,210 T500,230 T400,215 T300,225 T200,210 T150,180 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
            <path d="M120,250 Q180,230 250,245 T380,235 T520,250 T650,240 T780,255 T900,245 L920,280 Q880,320 800,330 T650,340 T500,350 T350,335 T200,345 T130,320 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
            <path d="M480,130 Q520,125 540,140 T560,160 T550,180 T530,175 T500,170 T480,155 Z" fill="#cbd5e1"/>
            <path d="M200,180 Q250,170 300,185 T350,200 T320,220 T270,215 T220,200 Z" fill="#cbd5e1"/>
            <path d="M600,280 Q680,270 750,290 T820,310 T780,340 T700,335 T620,320 Z" fill="#cbd5e1"/>
            <path d="M750,170 Q800,165 830,180 T850,200 T820,215 T780,210 T750,195 Z" fill="#cbd5e1"/>
          </svg>
          <div class="tvk-map-legend">
            ${mapLegend.map((item, i) => {
              const colors = ['#0891b2', '#6366f1', '#0d9488', '#1e40af', '#f59e0b'];
              return `<div class="tvk-map-legend-item"><span class="tvk-map-dot" style="background:${colors[i]}"></span>${item}</div>`;
            }).join('\n            ')}
          </div>
        </div>
      </div>
    </section>

    <section class="tvk-section" id="labs">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'labsLabel')}</span>
          <h2>${t(lang.code, 'labsH2')}</h2>
          <p>${t(lang.code, 'labsP')}</p>
        </div>
        <div class="tvk-labs-grid tvk-reveal">
          ${labItems.map(item => `
          <div class="tvk-lab-card">
            <div class="tvk-lab-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-dark" id="investment">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'investLabel')}</span>
          <h2>${t(lang.code, 'investH2')}</h2>
          <p>${t(lang.code, 'investP')}</p>
        </div>
        <div class="tvk-invest-grid tvk-reveal">
          ${investItems.map(item => `
          <div class="tvk-invest-card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="tech">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'techLabel')}</span>
          <h2>${t(lang.code, 'techH2')}</h2>
          <p>${t(lang.code, 'techP')}</p>
        </div>
        <div class="tvk-tech-viz tvk-reveal">
          <canvas id="tvk-tech-canvas"></canvas>
        </div>
        <div class="tvk-tech-labels tvk-reveal">
          ${techTags.map(tag => `<span class="tvk-tech-tag">${tag}</span>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="tvk-section" id="sovra">
      <div class="tvk-container">
        <div class="tvk-showcase tvk-reveal">
          <div class="tvk-showcase-visual tvk-showcase-sovra">
            <span class="tvk-showcase-badge">Sovereign Radiance</span>
            <canvas id="tvk-sovra-canvas" class="tvk-showcase-canvas" aria-label="SOVRA intelligence network animation"></canvas>
          </div>
          <div class="tvk-showcase-content">
            <h3>${t(lang.code, 'sovraH3')}</h3>
            <p>${t(lang.code, 'sovraP')}</p>
            <ul class="tvk-feature-list">
              ${sovraFeatures.map(f => `<li>${f}</li>`).join('\n              ')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="entelekron">
      <div class="tvk-container">
        <div class="tvk-showcase tvk-showcase-reverse tvk-reveal">
          <div class="tvk-showcase-content">
            <h3>${t(lang.code, 'enteleH3')}</h3>
            <p>${t(lang.code, 'enteleP')}</p>
            <ul class="tvk-feature-list">
              ${enteleFeatures.map(f => `<li>${f}</li>`).join('\n              ')}
            </ul>
            <a href="https://entelescan.com" target="_blank" class="tvk-showcase-link">${t(lang.code, 'enteleLink')} <i class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div class="tvk-showcase-visual tvk-showcase-entele">
            <span class="tvk-showcase-badge">Temporal Entelechy</span>
            <canvas id="tvk-entelekron-canvas" class="tvk-showcase-canvas" aria-label="ENTELΞKRON blockchain coordination animation"></canvas>
            <img src="/assets/entelekron_logo.png" alt="" class="tvk-showcase-logo" />
          </div>
        </div>
      </div>
    </section>

    <section class="tvk-section" id="future">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <span class="tvk-section-label">${t(lang.code, 'futureLabel')}</span>
          <h2>${t(lang.code, 'futureH2')}</h2>
          <p>${t(lang.code, 'futureP')}</p>
        </div>
        <div class="tvk-future-grid tvk-reveal">
          ${futureItems.map(item => `
          <div class="tvk-future-card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="tvk-section tvk-section-alt" id="companies">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <h2>${t(lang.code, 'companiesH2')}</h2>
        </div>
        <div class="tvk-card-grid tvk-reveal">
          ${COMPANIES.map(c => `
          <div class="tvk-card">
            ${c.url ? `<a href="${c.url}" target="_blank"><img src="/assets/${c.img}" alt="${c.title}" loading="lazy" /></a>` : `<img src="/assets/${c.img}" alt="${c.title}" loading="lazy" />`}
            <h3>${c.url ? `<a href="${c.url}" target="_blank">${c.title}</a>` : c.title}</h3>
            <p>${c.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="tvk-section" id="projects">
      <div class="tvk-container">
        <div class="tvk-section-header tvk-reveal">
          <h2>${t(lang.code, 'projectsH2')}</h2>
        </div>
        <div class="tvk-card-grid tvk-reveal">
          ${PROJECTS.map(p => `
          <div class="tvk-card">
            <a href="${p.url}" target="_blank"><img src="/assets/${p.img}" alt="${p.title}" loading="lazy" /></a>
            ${p.extraLinks ? `<div class="tvk-card-links"><a href="${p.url}" target="_blank">${p.title.split(' / ')[0]}</a>${p.extraLinks.map(l => `<a href="${l.url}" target="_blank">${l.title}</a>`).join('')}</div>` : `<h3><a href="${p.url}" target="_blank">${p.title}</a></h3>`}
            <p>${p.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <footer class="tvk-footer">
      <p class="tvk-footer-tagline">${t(lang.code, 'footerTagline')}</p>
      <p>${t(lang.code, 'footerCopy')}</p>
    </footer>
  </div>

  <script>
    window.TVK_ECOSYSTEMS = ${JSON.stringify(ECOSYSTEMS)};
  </script>
  <script src="/assets/js/tvk-master.js?v=3"></script>
</body>
</html>`;
}

// Generate all pages
LANGUAGES.forEach(lang => {
  const dir = path.join(ROOT, lang.code);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const html = generatePage(lang);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`Generated: ${lang.code}/index.html`);
});

// Generate shared nav language snippet for updating other pages
const navLangOptions = LANGUAGES.map(l =>
  `<option value="/${l.code}/index.html">${l.flag} ${l.name}</option>`
).join('\n          ');

fs.writeFileSync(path.join(ROOT, 'scripts', 'lang-options.html'), navLangOptions);
console.log(`\nDone! Generated ${LANGUAGES.length} language homepages.`);
