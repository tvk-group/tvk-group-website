/**
 * TVK Group Holding — shared content, data & helpers
 */
const path = require('path');
const ROOT = path.join(__dirname, '..');

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', nav: { home: 'Home', about: 'About TVK Group', companies: 'Companies', ecosystem: 'Ecosystem', technologies: 'Technologies', industries: 'Industries', partnerships: 'Strategic Partnerships', investors: 'Investor Relations', insights: 'News / Insights', contact: 'Contact' }, langLabel: '🌐 Language' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nav: { home: 'Ana Sayfa', about: 'TVK Group Hakkında', companies: 'Şirketler', ecosystem: 'Ekosistem', technologies: 'Teknolojiler', industries: 'Sektörler', partnerships: 'Stratejik Ortaklıklar', investors: 'Yatırımcı İlişkileri', insights: 'Haberler', contact: 'İletişim' }, langLabel: '🌐 Dil' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nav: { home: 'Startseite', about: 'Über TVK Group', companies: 'Unternehmen', ecosystem: 'Ökosystem', technologies: 'Technologien', industries: 'Branchen', partnerships: 'Partnerschaften', investors: 'Investor Relations', insights: 'News', contact: 'Kontakt' }, langLabel: '🌐 Sprache' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nav: { home: 'Accueil', about: 'À propos', companies: 'Sociétés', ecosystem: 'Écosystème', technologies: 'Technologies', industries: 'Secteurs', partnerships: 'Partenariats', investors: 'Relations investisseurs', insights: 'Actualités', contact: 'Contact' }, langLabel: '🌐 Langue' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nav: { home: 'Inicio', about: 'Sobre TVK Group', companies: 'Empresas', ecosystem: 'Ecosistema', technologies: 'Tecnologías', industries: 'Industrias', partnerships: 'Alianzas', investors: 'Relación con inversores', insights: 'Noticias', contact: 'Contacto' }, langLabel: '🌐 Idioma' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true, nav: { home: 'الرئيسية', about: 'عن المجموعة', companies: 'الشركات', ecosystem: 'النظام البيئي', technologies: 'التقنيات', industries: 'القطاعات', partnerships: 'الشراكات', investors: 'علاقات المستثمرين', insights: 'الأخبار', contact: 'اتصل' }, langLabel: '🌐 اللغة' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nav: { home: '首页', about: '关于TVK Group', companies: '公司', ecosystem: '生态系统', technologies: '技术', industries: '行业', partnerships: '战略合作', investors: '投资者关系', insights: '新闻', contact: '联系' }, langLabel: '🌐 语言' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nav: { home: 'ホーム', about: 'TVK Groupについて', companies: 'グループ企業', ecosystem: 'エコシステム', technologies: 'テクノロジー', industries: '産業', partnerships: 'パートナーシップ', investors: '投資家情報', insights: 'ニュース', contact: 'お問い合わせ' }, langLabel: '🌐 言語' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nav: { home: 'Главная', about: 'О TVK Group', companies: 'Компании', ecosystem: 'Экосистема', technologies: 'Технологии', industries: 'Отрасли', partnerships: 'Партнёрства', investors: 'Для инвесторов', insights: 'Новости', contact: 'Контакты' }, langLabel: '🌐 Язык' },
  { code: 'he', name: 'עברית', flag: '🇮🇱', rtl: true, nav: { home: 'בית', about: 'אודות TVK Group', companies: 'חברות', ecosystem: 'אקוסיסטם', technologies: 'טכנולוגיות', industries: 'תעשיות', partnerships: 'שותפויות', investors: 'יחסי משקיעים', insights: 'חדשות', contact: 'צור קשר' }, langLabel: '🌐 שפה' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nav: { home: 'Home', about: 'Chi siamo', companies: 'Aziende', ecosystem: 'Ecosistema', technologies: 'Tecnologie', industries: 'Settori', partnerships: 'Partnership', investors: 'Investor Relations', insights: 'News', contact: 'Contatto' }, langLabel: '🌐 Lingua' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', nav: { home: '홈', about: 'TVK Group 소개', companies: '회사', ecosystem: '생태계', technologies: '기술', industries: '산업', partnerships: '파트너십', investors: '투자자 정보', insights: '뉴스', contact: '연락처' }, langLabel: '🌐 언어' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', nav: { home: 'Strona główna', about: 'O TVK Group', companies: 'Spółki', ecosystem: 'Ekosystem', technologies: 'Technologie', industries: 'Branże', partnerships: 'Partnerstwa', investors: 'Relacje inwestorskie', insights: 'Aktualności', contact: 'Kontakt' }, langLabel: '🌐 Język' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nav: { home: 'Início', about: 'Sobre TVK Group', companies: 'Empresas', ecosystem: 'Ecossistema', technologies: 'Tecnologias', industries: 'Indústrias', partnerships: 'Parcerias', investors: 'Relações com investidores', insights: 'Notícias', contact: 'Contato' }, langLabel: '🌐 Idioma' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', nav: { home: 'Home', about: 'Over TVK Group', companies: 'Bedrijven', ecosystem: 'Ecosysteem', technologies: 'Technologieën', industries: 'Sectoren', partnerships: 'Partnerschappen', investors: 'Investor Relations', insights: 'Nieuws', contact: 'Contact' }, langLabel: '🌐 Taal' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', nav: { home: 'Hjem', about: 'Om TVK Group', companies: 'Virksomheder', ecosystem: 'Økosystem', technologies: 'Teknologier', industries: 'Brancher', partnerships: 'Partnerskaber', investors: 'Investor Relations', insights: 'Nyheder', contact: 'Kontakt' }, langLabel: '🌐 Sprog' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', nav: { home: 'Hem', about: 'Om TVK Group', companies: 'Företag', ecosystem: 'Ekosystem', technologies: 'Teknologier', industries: 'Branscher', partnerships: 'Partnerskap', investors: 'Investor Relations', insights: 'Nyheter', contact: 'Kontakt' }, langLabel: '🌐 Språk' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', nav: { home: 'Etusivu', about: 'Tietoa TVK Groupista', companies: 'Yritykset', ecosystem: 'Ekosysteemi', technologies: 'Teknologiat', industries: 'Toimialat', partnerships: 'Kumppanuudet', investors: 'Sijoittajasuhteet', insights: 'Uutiset', contact: 'Yhteystiedot' }, langLabel: '🌐 Kieli' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', nav: { home: 'Hjem', about: 'Om TVK Group', companies: 'Selskaper', ecosystem: 'Økosystem', technologies: 'Teknologier', industries: 'Bransjer', partnerships: 'Partnerskap', investors: 'Investor Relations', insights: 'Nyheter', contact: 'Kontakt' }, langLabel: '🌐 Språk' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nav: { home: 'होम', about: 'TVK Group के बारे में', companies: 'कंपनियाँ', ecosystem: 'इकोसिस्टम', technologies: 'प्रौद्योगिकी', industries: 'उद्योग', partnerships: 'साझेदारी', investors: 'निवेशक संबंध', insights: 'समाचार', contact: 'संपर्क' }, langLabel: '🌐 भाषा' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', nav: { home: 'Beranda', about: 'Tentang TVK Group', companies: 'Perusahaan', ecosystem: 'Ekosistem', technologies: 'Teknologi', industries: 'Industri', partnerships: 'Kemitraan', investors: 'Hubungan Investor', insights: 'Berita', contact: 'Kontak' }, langLabel: '🌐 Bahasa' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', nav: { home: 'Trang chủ', about: 'Về TVK Group', companies: 'Công ty', ecosystem: 'Hệ sinh thái', technologies: 'Công nghệ', industries: 'Ngành', partnerships: 'Đối tác', investors: 'Quan hệ nhà đầu tư', insights: 'Tin tức', contact: 'Liên hệ' }, langLabel: '🌐 Ngôn ngữ' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', nav: { home: 'หน้าแรก', about: 'เกี่ยวกับ TVK Group', companies: 'บริษัท', ecosystem: 'ระบบนิเวศ', technologies: 'เทคโนโลยี', industries: 'อุตสาหกรรม', partnerships: 'พันธมิตร', investors: 'นักลงทุนสัมพันธ์', insights: 'ข่าว', contact: 'ติดต่อ' }, langLabel: '🌐 ภาษา' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', nav: { home: 'Головна', about: 'Про TVK Group', companies: 'Компанії', ecosystem: 'Екосистема', technologies: 'Технології', industries: 'Галузі', partnerships: 'Партнерства', investors: 'Для інвесторів', insights: 'Новини', contact: 'Контакти' }, langLabel: '🌐 Мова' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿', nav: { home: 'Domů', about: 'O TVK Group', companies: 'Společnosti', ecosystem: 'Ekosystém', technologies: 'Technologie', industries: 'Odvětví', partnerships: 'Partnerství', investors: 'Vztahy s investory', insights: 'Novinky', contact: 'Kontakt' }, langLabel: '🌐 Jazyk' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', nav: { home: 'Αρχική', about: 'Σχετικά με TVK Group', companies: 'Εταιρείες', ecosystem: 'Οικοσύστημα', technologies: 'Τεχνολογίες', industries: 'Κλάδοι', partnerships: 'Συνεργασίες', investors: 'Σχέσεις με επενδυτές', insights: 'Νέα', contact: 'Επικοινωνία' }, langLabel: '🌐 Γλώσσα' }
];

const NAV_PAGES = [
  { file: 'index.html', key: 'home' },
  { file: 'about.html', key: 'about' },
  { file: 'companies.html', key: 'companies' },
  { file: 'ecosystem.html', key: 'ecosystem' },
  { file: 'technologies.html', key: 'technologies' },
  { file: 'industries.html', key: 'industries' },
  { file: 'strategic-partnerships.html', key: 'partnerships' },
  { file: 'investor-relations.html', key: 'investors' },
  { file: 'insights.html', key: 'insights' },
  { file: 'contact.html', key: 'contact' }
];

const HOMEPAGE_COMPANIES = [
  { icon: 'fa-flask', title: 'TVK Labs & Technologies', desc: 'Research, development, AI, cybersecurity, blockchain and emerging technologies.', link: 'companies.html#labs' },
  { icon: 'fa-bolt', title: 'TVK Infrastructure & Energy Systems', desc: 'Energy, infrastructure, industrial systems and strategic technology investments.', link: 'companies.html#energy' },
  { icon: 'fa-building', title: 'TVK Group Türkiye', desc: 'Turkish operating company focused on technology investments, import/export, infrastructure, energy and business development.', link: 'companies.html#turkey' },
  { icon: 'fa-seedling', title: 'Future Ventures', desc: 'Future ecosystem companies and sector-specific ventures under structured development.', link: 'companies.html#ventures' }
];

const GROUP_COMPANIES = [
  { id: 'holding', flag: '🇦🇪', title: 'TVK Group Holding LTD FZCO', subtitle: 'Global Holding', role: 'Parent entity coordinating group strategy, intellectual property and international structure.', focus: ['Group coordination', 'Strategic planning', 'International representation', 'Ecosystem governance'], status: 'Active', planned: false },
  { id: 'labs', flag: '🇬🇧', title: 'TVK Labs & Technologies LTD', subtitle: 'Research & Development', role: 'R&D hub for blockchain, AI, cybersecurity and protocol development across the ecosystem.', focus: ['AI & protocol research', 'Software systems', 'Technical documentation', 'Innovation pipelines'], status: 'Active', url: 'https://tvklabs.com', img: 'tvklabs_logo.png' },
  { id: 'energy', flag: '🇬🇧', title: 'TVK Infrastructure & Energy Systems LTD', subtitle: 'Infrastructure & Energy', role: 'Develops energy intelligence, infrastructure systems and industrial technology investments.', focus: ['Energy intelligence', 'Infrastructure systems', 'Industrial technology', 'EnergieMIND initiatives'], status: 'Active', url: 'https://energiemind.com', img: 'tvk_logo_1024px_transparent.png' },
  { id: 'gmbh', flag: '🇩🇪', title: 'TVK Container & Fertighäuser & Militärisches Material & Internationaler Transport GmbH', subtitle: 'Logistics & Infrastructure', role: 'German division focused on logistics, container technology, prefabricated housing and secure infrastructure.', focus: ['Modular infrastructure', 'International logistics', 'Industrial deployment'], status: 'Active', url: 'https://t-v-k.com', img: 'prefab_logo.png' },
  { id: 'london', flag: '🇬🇧', title: 'LoNDon – The Secret of Women LTD', subtitle: 'Wellness & Lifestyle', role: 'Luxury wellness and lifestyle brand within the group portfolio.', focus: ['Wellness technologies', 'Lifestyle brand development'], status: 'Active', url: 'https://london-thesecretofwomen.com', img: 'london_logo.png' },
  { id: 'turkey', flag: '🇹🇷', title: 'TVK Group Teknoloji Yatırım İthalat İhracat Ticaret ve Sanayi LTD', subtitle: 'Türkiye Operations', role: 'Turkish operating entity for technology investment, trade, import/export and regional business development.', focus: ['Technology investment', 'Import & export', 'Regional expansion', 'Industrial development'], status: 'Active', img: 'logo.tvk.group.png' },
  { id: 'fzco', flag: '🇦🇪', title: 'TVK Group Holding LTD FZCO', subtitle: 'UAE Structure (Planned)', role: 'Planned UAE entity for international holding operations and regional coordination.', focus: ['Holding structure', 'Regional coordination'], status: 'Planned', planned: true },
  { id: 'foundation', flag: '🇨🇭', title: 'TVK – EnteleKRON Foundation', subtitle: 'Foundation (Planned)', role: 'Planned Switzerland-based entity for digital infrastructure and ecosystem governance development.', focus: ['Ecosystem governance', 'Digital infrastructure'], status: 'Planned', planned: true },
  { id: 'ventures', flag: '🌐', title: 'Future Ventures', subtitle: 'Venture Development', role: 'Pipeline for sector-specific ventures and future group companies under structured validation.', focus: ['Venture building', 'Sector pilots', 'Strategic validation'], status: 'Under development', planned: true }
];

const ECOSYSTEM_CATEGORIES = [
  {
    id: 'ai', title: 'AI & Intelligence', projects: [
      { name: 'SOVRA', desc: 'AI decision intelligence and reasoning systems under R&D.', stage: 'Under R&D', url: '' },
      { name: 'Cerebthra', desc: 'Cognitive architecture and neural reasoning framework.', stage: 'Under development', url: '' },
      { name: 'Sentient Signals', desc: 'Signal processing and intelligence analytics.', stage: 'Under development', url: 'https://sentientsignals.io', img: 'sentientsignals_logo.png' }
    ]
  },
  {
    id: 'trust', title: 'Trust & Verification', projects: [
      { name: 'EnteleKRON', desc: 'Foundational coordination layer with modular protocol architecture.', stage: 'Under R&D', url: 'https://entelekron.org', img: 'entelekron_logo.png' },
      { name: 'EnteleLEDGER', desc: 'Distributed ledger coordination and audit systems.', stage: 'Under development', url: '' },
      { name: 'EnteleLINK', desc: 'Interoperability layer for chain-to-chain communication.', stage: 'Under development', url: 'https://entelelink.com', img: 'entelelink_logo.png' },
      { name: 'TVK ID', desc: 'Digital identity and access verification infrastructure.', stage: 'Under development', url: 'https://tvkidentity.com', img: 'tvkid_logo.png' },
      { name: 'GraphVault', desc: 'Document integrity and knowledge vault infrastructure.', stage: 'Under R&D', url: '' },
      { name: 'ChronoSeal', desc: 'Timestamping and proof-of-existence systems.', stage: 'Under R&D', url: '' },
      { name: 'EnteleSCAN', desc: 'Biometric and decentralized identity authentication.', stage: 'Under development', url: 'https://entelescan.com', img: 'entelescan_logo.png' }
    ]
  },
  {
    id: 'security', title: 'Security', projects: [
      { name: 'TVK CyberLab', desc: 'Cybersecurity, digital risk and security advisory capabilities.', stage: 'Under development', url: 'https://tvkcyberlab.com', img: 'cyberlab_logo.png' },
      { name: 'EnteleCLOS', desc: 'Secure operations and closure protocols for ecosystem assets.', stage: 'Under R&D', url: '' },
      { name: 'EnteleVAULT', desc: 'Vault-grade secure storage for identity and governance assets.', stage: 'Under development', url: 'https://entelevault.com', img: 'entelevault_logo.png' }
    ]
  },
  {
    id: 'energy', title: 'Energy', projects: [
      { name: 'EnergieMIND', desc: 'Energy intelligence and infrastructure optimization.', stage: 'Under development', url: 'https://energiemind.com' },
      { name: 'ENM', desc: 'Energy network modules for intelligent infrastructure coordination.', stage: 'Under R&D', url: '' }
    ]
  },
  {
    id: 'human', title: 'Human & Health Technologies', projects: [
      { name: 'ALVINA', desc: 'Human-centric AI expression and emotional intelligence layer.', stage: 'Under development', url: 'https://alvina.app', img: 'alvina_logo.png' },
      { name: 'Ava Sentient', desc: 'Advanced AI presence and interaction systems.', stage: 'Under development', url: 'https://avasentient.com', img: 'avasentient_logo.png' },
      { name: 'Ava Santé', desc: 'AI-assisted health and wellness technologies.', stage: 'Under development', url: 'https://avasante.com', img: 'avasante_logo.png' }
    ]
  },
  {
    id: 'social', title: 'Social Impact', projects: [
      { name: 'PuppyKRON', desc: 'Social impact initiative within the ecosystem architecture.', stage: 'Concept / early development', url: '' }
    ]
  },
  {
    id: 'digital', title: 'Digital Asset Experiments', projects: [
      { name: 'KRON Ecosystem Assets', desc: 'Experimental ecosystem tokens under research — not investment products. Mentioned for architectural transparency only.', stage: 'Experimental / R&D', url: 'https://entelekron.org' }
    ]
  }
];

const ECOSYSTEMS = [
  { id: 'entelekron', name: 'ENTELΞKRON', desc: 'Foundational coordination layer under R&D.', url: 'https://entelekron.org' },
  { id: 'sovra', name: 'SOVRA', desc: 'AI decision intelligence and reasoning systems.', url: '' },
  { id: 'tvklabs', name: 'TVK Labs', desc: 'Research and development core.', url: 'https://tvklabs.com' },
  { id: 'entelescan', name: 'EnteleSCAN', desc: 'Biometric ID and identity authentication.', url: 'https://entelescan.com' },
  { id: 'entelelink', name: 'EnteleLINK', desc: 'Interoperability layer for chain communication.', url: 'https://entelelink.com' },
  { id: 'entelevault', name: 'EnteleVAULT', desc: 'Vault-grade secure storage.', url: 'https://entelevault.com' },
  { id: 'chronoseal', name: 'ChronoSeal', desc: 'Timestamping and proof-of-existence.', url: '' },
  { id: 'graphvault', name: 'GraphVAULT', desc: 'Document integrity infrastructure.', url: '' },
  { id: 'tvkid', name: 'TVK ID', desc: 'Digital identity infrastructure.', url: 'https://tvkidentity.com' },
  { id: 'cerebthra', name: 'Cerebthra', desc: 'Cognitive architecture framework.', url: '' },
  { id: 'energiemind', name: 'Energiemind', desc: 'Energy intelligence systems.', url: 'https://energiemind.com' },
  { id: 'avasante', name: 'Ava Santé', desc: 'Health and wellness technologies.', url: 'https://avasante.com' },
  { id: 'alvina', name: 'ALVINA', desc: 'Human-centric AI expression.', url: 'https://alvina.app' },
  { id: 'sentsig', name: 'Sentient Signals', desc: 'Signal processing and analytics.', url: 'https://sentientsignals.io' },
  { id: 'cyberlab', name: 'TVK CyberLab', desc: 'Cybersecurity and digital risk.', url: 'https://tvkcyberlab.com' }
];

const TECH_PILLARS = [
  { icon: 'fa-brain', title: 'Artificial Intelligence', desc: 'Reasoning systems, decision intelligence and human-centric AI under structured R&D.' },
  { icon: 'fa-fingerprint', title: 'Digital Identity', desc: 'Identity verification, access control and trust credentials designed for future pilots.' },
  { icon: 'fa-shield-halved', title: 'Cybersecurity', desc: 'Digital risk frameworks, security advisory and protective infrastructure.' },
  { icon: 'fa-link', title: 'Blockchain Verification', desc: 'Protocol coordination, ledger systems and verification infrastructure.' },
  { icon: 'fa-server', title: 'Enterprise Infrastructure', desc: 'Scalable systems architecture for institutional and industrial environments.' },
  { icon: 'fa-bolt', title: 'Energy Intelligence', desc: 'Smart energy coordination and infrastructure optimization technologies.' },
  { icon: 'fa-people-group', title: 'Human-Centric AI', desc: 'Technologies designed around human experience, health and social impact.' }
];

const INDUSTRIES = [
  { icon: 'fa-plane', name: 'Aviation' },
  { icon: 'fa-truck', name: 'Logistics' },
  { icon: 'fa-solar-panel', name: 'Energy' },
  { icon: 'fa-landmark', name: 'Government' },
  { icon: 'fa-heart-pulse', name: 'Healthcare' },
  { icon: 'fa-industry', name: 'Manufacturing' },
  { icon: 'fa-chart-line', name: 'Finance' },
  { icon: 'fa-tower-broadcast', name: 'Critical Infrastructure' },
  { icon: 'fa-shield', name: 'Defense-adjacent Civil Systems' }
];

const CONTENT = {
  en: {
    title: 'TVK Group — Technology, Infrastructure & Innovation Ecosystem',
    description: 'TVK Group is an early-stage technology and investment ecosystem developing AI, digital trust, cybersecurity, energy intelligence and strategic technologies across multiple companies and projects.',
    heroH1: 'TVK Group',
    heroSub: 'A technology, infrastructure and innovation ecosystem building the foundations of digital trust, intelligence and strategic transformation.',
    heroLine: 'Artificial Intelligence · Digital Trust · Cybersecurity · Energy Intelligence · Blockchain Verification · Human-Centric Technologies',
    heroCta1: 'Explore the Ecosystem',
    heroCta2: 'Strategic Partnership Inquiry',
    stageNotice: 'TVK Group is currently in research, development, corporate formation and market validation stage. The Group is building a structured ecosystem of technologies, companies and strategic initiatives prepared for future pilots, partnerships and institutional growth.',
    overviewLabel: 'Group Overview', overviewH2: 'A Multi-Layer Technology Ecosystem',
    overviewP: 'TVK Group is developing an integrated architecture spanning technology development, digital trust infrastructure, AI systems, cybersecurity, energy and infrastructure, international business development, and future venture building. The Group operates through affiliated companies across multiple jurisdictions, coordinating R&D, ecosystem structuring and strategic validation.',
    overviewItems: ['Technology Development', 'Digital Trust Infrastructure', 'AI Systems', 'Cybersecurity', 'Energy & Infrastructure', 'International Business Development', 'Future Venture Building'],
    companiesLabel: 'Group Companies', companiesH2: 'Our Companies', companiesP: 'A structured portfolio of operating entities and ventures under the TVK Group umbrella.',
    ecosystemLabel: 'Ecosystem', ecosystemH2: 'TVK Ecosystem', ecosystemP: 'A coordinated portfolio of technologies, projects and initiatives organized for strategic development and future validation.',
    techLabel: 'Technology Pillars', techH2: 'Technologies', techP: 'Core technology domains forming the foundation of the TVK Group ecosystem architecture.',
    industriesLabel: 'Sectors', industriesH2: 'Industries', industriesP: 'Technologies under development with potential applications across regulated and operationally complex sectors.',
    partnershipsLabel: 'Collaboration', partnershipsH2: 'Strategic Partnerships',
    partnershipsP: 'TVK Group seeks strategic partners, pilot environments, sector expertise, institutional guidance and long-term alignment.',
    partnershipsCta: 'Discuss Strategic Partnership',
    investorsLabel: 'Investors', investorsH2: 'Investor Relations', investorsP: 'TVK Group is in an early development stage, building long-term infrastructure for future institutional growth and investment readiness.',
    investorsCta: 'View Investor Relations',
    contactLabel: 'Contact', contactH2: 'Contact TVK Group', contactP: 'For strategic inquiries, partnership discussions and institutional correspondence.',
    formName: 'Name', formCompany: 'Company', formRole: 'Role', formEmail: 'Email', formInterest: 'Area of Interest', formMessage: 'Message', formSubmit: 'Send Message',
    footerTagline: 'Technology, infrastructure and innovation for the next digital economy.',
    footerCopy: '© 2025 TVK Group Holding LTD. All rights reserved.',
    footerLegal: 'Legal', footerPrivacy: 'Privacy', footerTerms: 'Terms', footerWork: 'Careers', footerLegacy: 'Company Directory',
    aboutTitle: 'About TVK Group', aboutH1: 'About TVK Group',
    aboutLead: 'An early-stage technology and investment ecosystem building structured foundations for digital trust, intelligence and strategic transformation.',
    missionH: 'Mission', missionP: 'To develop integrated technologies, companies and infrastructure that enable trustworthy digital transformation for enterprises, institutions and strategic partners.',
    visionH: 'Vision', visionP: 'A globally structured technology group coordinating AI, trust infrastructure, cybersecurity and energy intelligence across a multi-company ecosystem.',
    founderH: 'Strategy', founderP: 'TVK Group follows a founder-led, long-term ecosystem approach — prioritizing R&D depth, institutional credibility and strategic partnership alignment over short-term commercialization.',
    stageH: 'Current Stage', stageP: 'The Group is in research, development, corporate formation, ecosystem structuring and market validation. Technologies are designed for future pilots and controlled enterprise validation.',
    aboutCta: 'Explore the Ecosystem',
    companiesTitle: 'TVK Group Companies', companiesLead: 'Operating entities and planned structures within the TVK Group holding architecture.',
    ecosystemTitle: 'TVK Ecosystem — Projects & Technologies', ecosystemLead: 'The complete ecosystem organized by strategic category.',
    techTitle: 'TVK Group Technologies', techLead: 'Technology pillars defining the group\'s long-term infrastructure architecture.',
    industriesTitle: 'Industries — Strategic Relevance', industriesLead: 'Sector applications under development for future pilots and strategic validation.',
    industriesNote: 'Applications described represent potential future use cases. No completed deployments or established customer relationships are claimed.',
    partnershipsTitle: 'Strategic Partnerships', partnershipsLead: 'Building relationships with organizations that contribute sector knowledge, pilot environments and long-term alignment.',
    partnershipsTargets: ['Holding groups & family offices', 'Industrial and logistics companies', 'Aviation and energy groups', 'Research institutions', 'Technology alignment partners'],
    partnershipsFocus: ['Pilot environments', 'Sector knowledge', 'Advisory support', 'Strategic collaboration', 'Future joint ventures'],
    investorsTitle: 'Investor Relations', investorsLead: 'Conservative, transparent communication for institutional stakeholders.',
    investorsVision: 'TVK Group aims to build a credible, structured technology holding with long-term investment readiness through disciplined R&D, governance development and ecosystem validation.',
    investorsRoadmap: ['R&D and technology development', 'Corporate formation and structuring', 'Ecosystem architecture', 'Pilot preparation', 'Strategic partnership development', 'Future investment readiness'],
    investorsGovernance: 'Governance philosophy emphasizes transparency, risk-aware development and institutional accountability as the Group matures.',
    investorsRisk: 'TVK Group is an early-stage venture. No revenue, valuation or return projections are presented. Investment discussions are not solicited at this stage.',
    insightsTitle: 'News & Insights', insightsLead: 'Perspectives on ecosystem development, technology strategy and institutional growth.',
    insightsPlaceholder: 'Updates and analysis will be published as the Group progresses through R&D and validation programs.',
    contactTitle: 'Contact TVK Group', contactLead: 'Reach our team for strategic, partnership and institutional inquiries.',
    contactGeneral: 'General Inquiries', contactPartnerships: 'Partnerships', contactInstitutional: 'Institutional'
  }
};

function t(lang, key) {
  return (CONTENT[lang] && CONTENT[lang][key] !== undefined) ? CONTENT[lang][key] : CONTENT.en[key];
}
function tArray(lang, key) {
  return (CONTENT[lang] && CONTENT[lang][key] !== undefined) ? CONTENT[lang][key] : CONTENT.en[key];
}

function langOptions(code, page = 'index.html') {
  return LANGUAGES.map(l => `<option value="/${l.code}/${page}"${l.code === code ? ' selected' : ''}>${l.flag} ${l.name}</option>`).join('\n            ');
}

function hreflangTags(page = 'index.html') {
  return LANGUAGES.map(l => `<link rel="alternate" hreflang="${l.code}" href="https://tvk.group/${l.code}/${page}" />`).join('\n  ') +
    `\n  <link rel="alternate" hreflang="x-default" href="https://tvk.group/en/${page}" />`;
}

function navHtml(lang, active = 'index.html') {
  const l = LANGUAGES.find(x => x.code === lang);
  const links = NAV_PAGES.map(p =>
    `<li><a href="/${lang}/${p.file}"${p.file === active ? ' class="active"' : ''}>${l.nav[p.key]}</a></li>`
  ).join('\n        ');
  return `<nav class="tvk-nav">
    <a href="/${lang}/index.html" class="tvk-nav-brand"><img src="/assets/logo.tvk.group.png" alt="TVK Group" /><strong>TVK GROUP</strong></a>
    <button class="tvk-nav-toggle" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <ul class="tvk-nav-links">${links}
      <li><select class="tvk-lang-select" onchange="location.href=this.value"><option disabled>${l.langLabel}</option>${langOptions(lang, active)}</select></li>
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
      <a href="/${lang}/work.html">${t(lang, 'footerWork')}</a>
      <a href="/${lang}/company.html">${t(lang, 'footerLegacy')}</a>
    </div>
    <p>${t(lang, 'footerCopy')}</p>
  </footer>`;
}

function headHtml(lang, title, desc, page = 'index.html') {
  const l = LANGUAGES.find(x => x.code === lang);
  const dir = l.rtl ? ' dir="rtl"' : '';
  return { dir, html: `<!DOCTYPE html>
<html lang="${lang}"${dir}>
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${desc}" />
  <meta name="theme-color" content="#071A3D" />
  <link rel="canonical" href="https://tvk.group/${lang}/${page}" />
  ${hreflangTags(page)}
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="https://tvk.group/${lang}/${page}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://tvk.group/og-preview.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/assets/favicon.ico" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="/assets/css/tvk-master.css?v=5" />
</head>` };
}

function ambient() {
  return `<canvas id="tvk-neural-canvas"></canvas><canvas id="tvk-particles-canvas"></canvas>`;
}

function scripts(includeEco = false) {
  const s = includeEco ? `\n<script>window.TVK_ECOSYSTEMS=${JSON.stringify(ECOSYSTEMS)};</script>` : '';
  return `${s}\n<script src="/assets/js/tvk-master.js?v=5"></script>\n</body>\n</html>`;
}

function pageHero(h1, lead) {
  return `<section class="tvk-page-hero"><div class="tvk-container tvk-reveal visible"><h1>${h1}</h1>${lead ? `<p class="tvk-page-hero-lead">${lead}</p>` : ''}</div></section>`;
}

function sectionHeader(label, h2, p) {
  return `<div class="tvk-section-header tvk-reveal"><span class="tvk-section-label">${label}</span><h2>${h2}</h2>${p ? `<p>${p}</p>` : ''}</div>`;
}

function ecosystemCategoryHtml(cat, compact = false) {
  const items = cat.projects.map(p => {
    const img = p.img ? `<img src="/assets/${p.img}" alt="${p.name}" class="tvk-eco-thumb" loading="lazy" />` : '';
    const link = p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>` : p.name;
    return `<div class="tvk-eco-item${compact ? ' compact' : ''}">${img}<div><h4>${link}</h4><p>${p.desc}</p><span class="tvk-stage-badge">${p.stage}</span></div></div>`;
  }).join('');
  return `<div class="tvk-eco-category" id="${cat.id}"><h3>${cat.title}</h3><div class="tvk-eco-items">${items}</div></div>`;
}

function contactForm(lang) {
  return `<form class="tvk-contact-form" action="mailto:contact@tvk.group" method="post" enctype="text/plain">
    <div class="tvk-form-row">
      <div class="tvk-form-group"><label>${t(lang, 'formName')}</label><input type="text" name="name" required /></div>
      <div class="tvk-form-group"><label>${t(lang, 'formCompany')}</label><input type="text" name="company" /></div>
    </div>
    <div class="tvk-form-row">
      <div class="tvk-form-group"><label>${t(lang, 'formRole')}</label><input type="text" name="role" /></div>
      <div class="tvk-form-group"><label>${t(lang, 'formEmail')}</label><input type="email" name="email" required /></div>
    </div>
    <div class="tvk-form-group"><label>${t(lang, 'formInterest')}</label><input type="text" name="interest" placeholder="Partnership, Investment, Ecosystem, Other" /></div>
    <div class="tvk-form-group"><label>${t(lang, 'formMessage')}</label><textarea name="message" rows="4" required></textarea></div>
    <button type="submit" class="tvk-btn tvk-btn-primary">${t(lang, 'formSubmit')}</button>
  </form>`;
}

module.exports = {
  ROOT, LANGUAGES, NAV_PAGES, HOMEPAGE_COMPANIES, GROUP_COMPANIES, ECOSYSTEM_CATEGORIES,
  ECOSYSTEMS, TECH_PILLARS, INDUSTRIES, CONTENT, t, tArray, langOptions, hreflangTags,
  navHtml, footerHtml, headHtml, ambient, scripts, pageHero, sectionHeader, ecosystemCategoryHtml, contactForm
};
