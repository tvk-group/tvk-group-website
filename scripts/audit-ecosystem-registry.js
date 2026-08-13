#!/usr/bin/env node
const {
  INVENTORY_DATE,
  GITHUB_REPOSITORY_SNAPSHOT,
  EXCLUDED_REPOSITORIES,
  ECOSYSTEM_CATEGORIES
} = require('./ecosystem-registry');

const mapped = new Map();
for (const category of ECOSYSTEM_CATEGORIES) {
  if (!category.id || !category.title || !Array.isArray(category.projects)) {
    throw new Error(`Invalid ecosystem category: ${JSON.stringify(category)}`);
  }
  for (const project of category.projects) {
    if (!project.name || !project.desc || !project.stage || !Array.isArray(project.repos)) {
      throw new Error(`Invalid ecosystem project in ${category.id}: ${JSON.stringify(project)}`);
    }
    for (const repo of project.repos) {
      const owners = mapped.get(repo) || [];
      owners.push(project.name);
      mapped.set(repo, owners);
    }
  }
}

const snapshot = new Set(GITHUB_REPOSITORY_SNAPSHOT);
const excluded = new Set(Object.keys(EXCLUDED_REPOSITORIES));
const missing = GITHUB_REPOSITORY_SNAPSHOT.filter(repo => !mapped.has(repo) && !excluded.has(repo));
const unknown = [...mapped.keys(), ...excluded].filter(repo => !snapshot.has(repo));
const duplicateMappings = [...mapped.entries()].filter(([, owners]) => owners.length > 1);
const duplicateSnapshot = GITHUB_REPOSITORY_SNAPSHOT.filter((repo, index, list) => list.indexOf(repo) !== index);

if (missing.length || unknown.length || duplicateMappings.length || duplicateSnapshot.length) {
  if (missing.length) console.error('Unmapped repositories:', missing.join(', '));
  if (unknown.length) console.error('Unknown repositories:', unknown.join(', '));
  if (duplicateMappings.length) console.error('Repositories mapped more than once:', duplicateMappings.map(([repo, owners]) => `${repo} (${owners.join(' / ')})`).join(', '));
  if (duplicateSnapshot.length) console.error('Duplicate snapshot entries:', duplicateSnapshot.join(', '));
  process.exit(1);
}

const productCount = ECOSYSTEM_CATEGORIES.reduce((total, category) => total + category.projects.length, 0);
console.log(`Ecosystem registry audit passed (${INVENTORY_DATE} inventory): ${mapped.size} mapped repositories, ${excluded.size} documented exclusions, ${productCount} product families.`);
