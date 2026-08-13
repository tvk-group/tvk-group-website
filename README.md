# tvk-group-website
Official website for TVK Group Holding LTD, the sovereign parent entity managing Entelekron, Energiemind, Sentient Signals, and all global subsidiaries. Built with clean static HTML and styled for modern, institutional visibility. Hosted at tvk.group. Includes company structure, legal footer, and compliant metadata.

## EnteleKRON financial-layer content

Reviewed English and Turkish source content lives in [content/entelekron-financial-layer.en.json](content/entelekron-financial-layer.en.json) and [content/entelekron-financial-layer.tr.json](content/entelekron-financial-layer.tr.json). The English and Turkish ecosystem pages consume those sources directly. Other language editions omit the financial layer until reviewed translations reach parity. Roadmap copy must not imply a live stablecoin, bank, license, payment, custody, prime-brokerage or tokenization service.

## Ecosystem catalogue

The canonical product-to-repository map lives in [scripts/ecosystem-registry.js](scripts/ecosystem-registry.js). Every GitHub repository in the inventory is mapped to a visible product family or documented as an intentional exclusion. Run `node scripts/audit-ecosystem-registry.js` to verify coverage, then `node scripts/generate-all.js` to regenerate and audit all language editions.
