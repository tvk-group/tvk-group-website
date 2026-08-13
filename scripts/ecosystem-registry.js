/**
 * Canonical TVK Group ecosystem catalogue.
 *
 * Keep repository coverage explicit: every organisation repository must be
 * mapped to one public product family or listed in EXCLUDED_REPOSITORIES with
 * a reason. Run `node scripts/audit-ecosystem-registry.js` after edits.
 */

const INVENTORY_DATE = '2026-08-13';

const GITHUB_REPOSITORY_SNAPSHOT = [
  'energiemind-dapp', 'archive-tvk-site', 'entelekron-OSAIC',
  'entelekron-smartcontracts', 'entelekron-validator', 'entelelink',
  'tvk-assets', 'tvk-docs', 'tvk-compliance', 'tvk-group-website',
  'EnteleKRON', 'entelekron-portal', 'enteleclos', 'alvina-app',
  'tvk-labs-technologies', 'sovra-network', 'eKRON', 'AlviKRON',
  'MineKron', 'SoviKRON', 'kron.entelekron.org', 'puriKRON', 'restoKRON',
  'puppykron-site', 'puppykron-token', 'vite-react',
  'SOVRA-protocol-token', 'Cerebthra', 'avasante', 'chronoseal',
  'graphvault', 'q-presencee', 'entelescan', 'entelevault',
  'sentientsignals', 'tvk-id', 'ava-sentient-site', 'tvk-cyberlab',
  'cognethra', 'syntherra', 'warpkron', 'enm-network',
  'LoNDoN-the-secret-of-women', 'restoKRON-token', 't-v-k-com',
  'entelewallet-site', 'enteleledger', 'alvinaflow', 'alvinaworld',
  'entelekron-token', 'restokron-network', 'restokron-app', 'tvk-network',
  'infrasphere-network', 'TVK-Infrastructure-Energy-Systems',
  'energiemind-main', 'energiemind-shop', 'energiemind-org',
  'energiemind.network', 'energiemind.io', 'EnteleKRON_token_V2_OLD',
  'entelewallet-app', 'entelekron-chain', 'Preflightaudit', 'opsline',
  'entelepay', 'entelepoint', 'tvk-orbital', 'entelecard', 'webkron',
  'enteleexchange', 'enteleexchange-api', 'enteleexchange-docs',
  'enteleexchange-status', 'nadiia.moves', 'osoix',
  'wallet-address-creation', 'cesal'
];

const EXCLUDED_REPOSITORIES = {
  'archive-tvk-site': 'Archived legacy website; superseded by the current group website.',
  'tvk-group-website': 'The catalogue website itself, not an ecosystem product.'
};

const P = (name, desc, options = {}) => ({ name, desc, ...options });

const ECOSYSTEM_CATEGORIES = [
  {
    id: 'core',
    title: 'Core Protocol & Digital Trust',
    desc: 'Coordination, identity, verification, interoperability and secure digital infrastructure.',
    projects: [
      P('EnteleKRON', 'Foundational coordination protocol for the integrated ecosystem.', { detail: 'Modular trust, governance and interoperability architecture.', stage: 'Under R&D', url: 'https://entelekron.org', img: 'ecosystem/entelekron-transparent.svg', tags: ['Protocol', 'Coordination'], repos: ['EnteleKRON', 'entelekron-OSAIC', 'entelekron-smartcontracts'] }),
      P('EnteleKRON Chain', 'Network and validator infrastructure for the protocol layer.', { stage: 'Under development', mark: 'EK', tags: ['Network', 'Validator'], repos: ['entelekron-chain', 'entelekron-validator'] }),
      P('EnteleKRON Portal', 'Controlled access point for ecosystem applications and services.', { stage: 'Under development', mark: 'EK', tags: ['Portal', 'Access'], repos: ['entelekron-portal'] }),
      P('EnteleLINK', 'Interoperability layer for chain-to-chain communication.', { stage: 'Under development', url: 'https://entelelink.com', img: 'entelelink_logo.png', tags: ['Interoperability', 'Messaging'], repos: ['entelelink'] }),
      P('EnteleWALLET', 'Wallet experience for ecosystem identity, assets and applications.', { stage: 'Under development', url: 'https://entelewallet.app', img: 'ecosystem/entelewallet-transparent.svg', tags: ['Wallet', 'Access'], repos: ['entelewallet-app', 'entelewallet-site'] }),
      P('EnteleLEDGER', 'Distributed ledger coordination and auditable records.', { stage: 'Under development', img: 'ecosystem/enteleledger.svg', tags: ['Ledger', 'Audit'], repos: ['enteleledger'] }),
      P('EnteleSCAN', 'Biometric and decentralized identity authentication.', { stage: 'Under development', url: 'https://entelescan.com', img: 'entelescan_logo.png', tags: ['Biometrics', 'Authentication'], repos: ['entelescan'] }),
      P('TVK ID', 'Digital identity, credentials and access-verification infrastructure.', { stage: 'Under development', img: 'tvkid_logo.png', tags: ['Identity', 'Credentials'], repos: ['tvk-id'] }),
      P('GraphVault', 'Document integrity and knowledge-vault infrastructure.', { stage: 'Under R&D', mark: 'GV', tags: ['Knowledge graph', 'Integrity'], repos: ['graphvault'] }),
      P('ChronoSeal', 'Timestamping and proof-of-existence systems.', { stage: 'Under R&D', mark: 'CS', tags: ['Timestamping', 'Proof'], repos: ['chronoseal'] }),
      P('Q-Presence', 'Presence and verification research for trusted digital interaction.', { stage: 'Under development', img: 'qp_logo.png', tags: ['Presence', 'Verification'], repos: ['q-presencee'] }),
      P('Wallet Address Creation', 'Controlled wallet-address provisioning utility.', { stage: 'Under development', mark: 'WA', tags: ['Wallet', 'Provisioning'], repos: ['wallet-address-creation'] })
    ]
  },
  {
    id: 'security',
    title: 'Security & Assurance',
    desc: 'Cybersecurity, custody controls, operational protection and release assurance.',
    projects: [
      P('TVK CyberLab', 'Cybersecurity, digital risk and security advisory capabilities.', { stage: 'Under development', url: 'https://tvkcyberlab.com', img: 'cyberlab_logo.png', tags: ['Cybersecurity', 'Risk'], repos: ['tvk-cyberlab'] }),
      P('EnteleCLOS', 'Secure operations and closure protocols for ecosystem assets.', { stage: 'Under R&D', mark: 'EC', tags: ['Operations', 'Protocols'], repos: ['enteleclos'] }),
      P('EnteleVAULT', 'Vault-grade storage for identity, governance and digital assets.', { stage: 'Under development', url: 'https://entelevault.com', img: 'entelevault_logo.png', tags: ['Vault', 'Custody controls'], repos: ['entelevault'] }),
      P('Preflight Audit', 'Pre-release evidence and quality gates for ecosystem deployments.', { stage: 'Internal infrastructure', mark: 'PA', tags: ['Audit', 'Release gates'], repos: ['Preflightaudit'] })
    ]
  },
  {
    id: 'intelligence',
    title: 'AI, Intelligence & Human Systems',
    desc: 'Cognitive architectures, signal intelligence, human-centric AI and wellness research.',
    projects: [
      P('SOVRA', 'AI decision-intelligence and reasoning systems under structured R&D.', { stage: 'Under R&D', img: 'ecosystem/sovra.svg', tags: ['Reasoning', 'Decision AI'], repos: ['sovra-network'] }),
      P('SOVRA Protocol Asset', 'Experimental protocol-asset research supporting the SOVRA architecture.', { stage: 'Experimental / R&D', mark: 'S', tags: ['Protocol', 'Research'], repos: ['SOVRA-protocol-token'] }),
      P('Cerebthra', 'Cognitive architecture and neural-reasoning framework.', { stage: 'Under development', img: 'ecosystem/cerebthra.svg', tags: ['Cognitive AI', 'Architecture'], repos: ['Cerebthra'] }),
      P('Cognethra', 'Cognition and knowledge-synthesis research environment.', { stage: 'Under development', img: 'ecosystem/cognethra.svg', tags: ['Cognition', 'Knowledge'], repos: ['cognethra'] }),
      P('Syntherra', 'Synthetic intelligence and model-coordination research.', { stage: 'Under development', mark: 'SY', tags: ['Synthetic AI', 'Models'], repos: ['syntherra'] }),
      P('Sentient Signals', 'Signal processing and intelligence analytics.', { stage: 'Under development', url: 'https://sentientsignals.io', img: 'sentientsignals_logo.png', tags: ['Analytics', 'Signals'], repos: ['sentientsignals'] }),
      P('ALVINA', 'Human-centric AI expression and emotional-intelligence layer.', { stage: 'Under development', url: 'https://alvina.app', img: 'alvina_logo.png', tags: ['Human AI', 'Expression'], repos: ['alvina-app'] }),
      P('ALVINA Flow', 'Workflow and orchestration environment for ALVINA experiences.', { stage: 'Under development', mark: 'AF', tags: ['Workflow', 'Orchestration'], repos: ['alvinaflow'] }),
      P('ALVINA World', 'Immersive environment for ALVINA interaction and presence.', { stage: 'Under development', mark: 'AW', tags: ['Experience', 'Presence'], repos: ['alvinaworld'] }),
      P('Ava Sentient', 'Advanced AI presence and interaction systems.', { stage: 'Under development', url: 'https://avasentient.com', img: 'avasentient_logo.png', tags: ['Presence', 'Interaction'], repos: ['ava-sentient-site'] }),
      P('Ava Santé', 'AI-assisted health and wellness technologies.', { stage: 'Under development', url: 'https://avasante.com', img: 'avasante_logo.png', tags: ['Wellness', 'Health'], repos: ['avasante'] })
    ]
  },
  {
    id: 'finance',
    title: 'Finance & Market Infrastructure',
    desc: 'Jurisdiction-gated architecture for stablecoin, minting, treasury, custody, payments, markets and tokenization.',
    projects: [
      P('TVKUSD', 'Planned fiat-backed stablecoin liability, separate from ENK.', { detail: 'Issuer, reserve, redemption, ledger, audit and jurisdiction gates are required before activation.', stage: 'Planned — not issued', mark: '₮', tags: ['Stablecoin', 'Evidence gated'], repos: [] }),
      P('EnteleMINT', 'Evidence-gated issuance and burn-control architecture.', { stage: 'Architecture', mark: 'EM', tags: ['Minting', 'Controls'], repos: [] }),
      P('EnteleTREASURY', 'Separated reserve, liability, operating-capital and collateral books.', { stage: 'Architecture', mark: 'ET', tags: ['Treasury', 'Reserves'], repos: [] }),
      P('EntelePAY', 'Payments infrastructure designed for exact product and jurisdiction activation.', { stage: 'Jurisdiction gated', url: 'https://entelepay.com', mark: 'EP', tags: ['Payments', 'Settlement'], repos: ['entelepay'] }),
      P('EnteleCARD', 'Card-program architecture connected to controlled payment rails.', { stage: 'Jurisdiction gated', url: 'https://entelecard.com', img: 'ecosystem/entelecard.svg', tags: ['Cards', 'Payments'], repos: ['entelecard'] }),
      P('EnteleEXCHANGE', 'Market infrastructure spanning exchange, API, documentation and service status.', { stage: 'Under development', url: 'https://enteleexchange.com', img: 'ecosystem/enteleexchange.svg', tags: ['Markets', 'Trading infrastructure'], repos: ['enteleexchange', 'enteleexchange-api', 'enteleexchange-docs', 'enteleexchange-status'] }),
      P('EntelePOINT', 'Transaction and service-entry infrastructure for ecosystem applications.', { stage: 'Under development', url: 'https://entelepoint.com', mark: 'EP', tags: ['Service point', 'Transactions'], repos: ['entelepoint'] }),
      P('Opsline', 'Institutional operations and reporting workbench.', { stage: 'Under development', url: 'https://opsline.org', mark: 'OL', tags: ['Operations', 'Reporting'], repos: ['opsline'] }),
      P('Custody & Prime Brokerage', 'Roadmap for separately approved custody, execution, financing, collateral, settlement and reporting services.', { stage: 'Roadmap', mark: 'PB', tags: ['Custody', 'Prime services'], repos: [] }),
      P('Tokenization', 'Evidence-first architecture for representing legally established rights on-chain.', { stage: 'Roadmap', mark: 'TK', tags: ['Tokenization', 'Legal rights'], repos: [] }),
      P('ENK Ecosystem Asset', 'Access, governance and network-utility asset architecture; separate from TVKUSD.', { stage: 'Under development', mark: 'ENK', tags: ['Utility', 'Governance'], repos: ['entelekron-token', 'EnteleKRON_token_V2_OLD'] }),
      P('Financial Governance', 'Compliance evidence, activation controls and policy support for the financial layer.', { stage: 'Architecture', mark: 'FG', tags: ['Compliance', 'Activation'], repos: ['tvk-compliance'] })
    ]
  },
  {
    id: 'infrastructure',
    title: 'Energy, Infrastructure & Orbital Systems',
    desc: 'Energy intelligence, industrial networks, infrastructure coordination and frontier systems.',
    projects: [
      P('EnergieMIND', 'Energy intelligence, optimisation, network and commerce platform family.', { stage: 'Under development', url: 'https://energiemind.com', img: 'ecosystem/energiemind-mark.svg', tags: ['Energy', 'Intelligence'], repos: ['energiemind-dapp', 'energiemind-main', 'energiemind-shop', 'energiemind-org', 'energiemind.network', 'energiemind.io'] }),
      P('ENM Network', 'Energy-network modules for intelligent infrastructure coordination.', { stage: 'Under R&D', mark: 'ENM', tags: ['Grid', 'Coordination'], repos: ['enm-network'] }),
      P('TVK Network', 'Shared network infrastructure for TVK ecosystem services.', { stage: 'Under development', mark: 'TVK', tags: ['Network', 'Infrastructure'], repos: ['tvk-network'] }),
      P('Infrasphere Network', 'Distributed coordination layer for infrastructure systems.', { stage: 'Under development', mark: 'IS', tags: ['Infrastructure', 'Network'], repos: ['infrasphere-network'] }),
      P('TVK Infrastructure & Energy Systems', 'Industrial energy and infrastructure systems portfolio.', { stage: 'Under development', url: 'https://tvkinfrastructure.com', img: 'tvk_logo_1024px_transparent.png', tags: ['Industrial', 'Energy systems'], repos: ['TVK-Infrastructure-Energy-Systems'] }),
      P('TVK Orbital', 'Orbital systems and space-infrastructure research.', { stage: 'Under R&D', url: 'https://tvkorbital.com', img: 'ecosystem/tvk-orbital.svg', tags: ['Orbital', 'Frontier systems'], repos: ['tvk-orbital'] }),
      P('OSOIX', 'Systems research connecting operational intelligence and infrastructure.', { stage: 'Under development', url: 'https://osoix.com', img: 'ecosystem/osoix.svg', tags: ['Systems', 'Intelligence'], repos: ['osoix'] }),
      P('WebKRON', 'Web infrastructure and digital-experience layer for KRON services.', { stage: 'Under development', url: 'https://webkron.org', img: 'ecosystem/webkron.svg', tags: ['Web infrastructure', 'Services'], repos: ['webkron'] }),
      P('TVK Türkiye Platform', 'Regional operating platform for technology, trade and infrastructure.', { stage: 'Under development', url: 'https://t-v-k.com', img: 'logo.tvk.group.png', tags: ['Türkiye', 'Operations'], repos: ['t-v-k-com'] })
    ]
  },
  {
    id: 'kron',
    title: 'KRON Ecosystem Experiments',
    desc: 'Experimental community, network and digital-asset concepts — research only, not investment products.',
    projects: [
      P('KRON Hub', 'Public hub for the broader EnteleKRON experimental project family.', { stage: 'Experimental / R&D', url: 'https://github.com/tvk-group/kron.entelekron.org', mark: 'KR', tags: ['Hub', 'Research'], repos: ['kron.entelekron.org'] }),
      P('eKRON', 'Experimental KRON ecosystem component.', { stage: 'Experimental / R&D', url: 'https://github.com/tvk-group/eKRON', img: 'ecosystem/ekron.svg', tags: ['Experiment', 'R&D only'], repos: ['eKRON'] }),
      P('AlviKRON', 'Experimental ALVINA-connected ecosystem component.', { stage: 'Experimental / R&D', url: 'https://github.com/tvk-group/AlviKRON', img: 'ecosystem/alvikron.svg', tags: ['Experiment', 'R&D only'], repos: ['AlviKRON'] }),
      P('MineKRON', 'Experimental network-participation concept.', { stage: 'Experimental / R&D', url: 'https://github.com/tvk-group/MineKron', img: 'ecosystem/minekron.svg', tags: ['Experiment', 'R&D only'], repos: ['MineKron'] }),
      P('SoviKRON', 'Experimental SOVRA-connected ecosystem component.', { stage: 'Experimental / R&D', img: 'ecosystem/sovikron.svg', tags: ['Experiment', 'R&D only'], repos: ['SoviKRON'] }),
      P('puriKRON', 'Experimental sustainability-oriented ecosystem component.', { stage: 'Experimental / R&D', url: 'https://github.com/tvk-group/puriKRON', img: 'ecosystem/purikron.svg', tags: ['Experiment', 'R&D only'], repos: ['puriKRON'] }),
      P('restoKRON', 'Experimental food-service network, application and asset family.', { stage: 'Experimental / R&D', mark: 'RK', tags: ['Network', 'Application'], repos: ['restoKRON', 'restoKRON-token', 'restokron-network', 'restokron-app'] }),
      P('PuppyKRON', 'Community and social-impact experiment within the KRON family.', { stage: 'Concept / early development', mark: 'PK', tags: ['Community', 'Social impact'], repos: ['puppykron-site', 'puppykron-token'] }),
      P('warpKRON', 'Experimental high-speed coordination concept.', { stage: 'Experimental / R&D', url: 'https://github.com/tvk-group/warpkron', mark: 'WK', tags: ['Experiment', 'Coordination'], repos: ['warpkron'] })
    ]
  },
  {
    id: 'ventures',
    title: 'Ventures, Brands & Experiences',
    desc: 'Consumer, lifestyle, mobility and experience ventures connected to the wider group.',
    projects: [
      P('LoNDoN — The Secret of Women', 'Luxury wellness and lifestyle brand within the group portfolio.', { stage: 'Active development', url: 'https://london-thesecretofwomen.com', img: 'london_logo.png', tags: ['Wellness', 'Lifestyle'], repos: ['LoNDoN-the-secret-of-women'] }),
      P('Nadiia Moves', 'Mobility and movement-focused digital venture.', { stage: 'Under development', mark: 'NM', tags: ['Mobility', 'Experience'], repos: ['nadiia.moves'] }),
      P('CESAL', 'Emerging consumer and experience venture.', { stage: 'Under development', mark: 'C', tags: ['Consumer', 'Venture'], repos: ['cesal'] })
    ]
  },
  {
    id: 'operations',
    title: 'Ecosystem Operations & Research',
    desc: 'Shared research, documentation, asset, governance and engineering capabilities.',
    projects: [
      P('TVK Labs & Technologies', 'Research and development core for group technologies.', { stage: 'Active development', url: 'https://tvklabs.com', img: 'tvklabs_logo.png', tags: ['R&D', 'Technology'], repos: ['tvk-labs-technologies'] }),
      P('TVK Assets', 'Central brand and digital-asset repository for ecosystem delivery.', { stage: 'Internal infrastructure', mark: 'TA', tags: ['Assets', 'Brand systems'], repos: ['tvk-assets'] }),
      P('TVK Documentation', 'Architecture, governance and product documentation source.', { stage: 'Active development', mark: 'DOC', tags: ['Documentation', 'Governance'], repos: ['tvk-docs'] }),
      P('Engineering Sandbox', 'Shared prototype environment for validated interface experiments.', { stage: 'Internal R&D', mark: 'LAB', tags: ['Prototype', 'Engineering'], repos: ['vite-react'] })
    ]
  }
];

const HOMEPAGE_PROJECTS = [
  'EnteleKRON', 'EnteleWALLET', 'TVK ID', 'EnteleVAULT',
  'SOVRA', 'ALVINA', 'TVKUSD', 'EnteleMINT',
  'EnteleTREASURY', 'EntelePAY', 'EnergieMIND', 'TVK Orbital'
];

module.exports = {
  INVENTORY_DATE,
  GITHUB_REPOSITORY_SNAPSHOT,
  EXCLUDED_REPOSITORIES,
  ECOSYSTEM_CATEGORIES,
  HOMEPAGE_PROJECTS
};
