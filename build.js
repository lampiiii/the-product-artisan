// Build script for Cloudflare Pages — copies source files into dist/
// in a flat layout that matches the site's clean URLs (no _redirects needed).
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const PAGES = {
  'artisan/home.html':                            'index.html',
  'artisan/profile.html':                         'profile.html',
  'artisan/claude-code.html':                      'claude-code.html',
  'artisan/proof-of-value.html':                   'proof-of-value.html',
  'artisan/projects.html':                         'projects.html',
  'artisan/pov/platform-thinking.html':            'proof-of-value/platform-thinking.html',
  'artisan/pov/agent-governance.html':             'proof-of-value/agent-governance.html',
  'artisan/pov/domain-expertise.html':             'proof-of-value/domain-expertise.html',
  'artisan/pov/reusable-architecture.html':        'proof-of-value/reusable-architecture.html',
  'artisan/pov/outcome-stories.html':              'proof-of-value/outcome-stories.html',
  'artisan/pov/stakeholder-management.html':       'proof-of-value/stakeholder-management.html',
  'artisan/pov/pricing-strategy.html':             'proof-of-value/pricing-strategy.html',
  'artisan/playbook.html':                         'playbook.html',
  'artisan/career-timeline.html':                  'career-timeline.html',
  'artisan/skills-tools.html':                     'skills-tools.html',
  'artisan/reading-list.html':                     'reading-list.html',
  'artisan/frameworks.html':                       'frameworks.html',
  'artisan/metrics-dashboard.html':                'metrics-dashboard.html',
  'artisan/case-studies/case-study-1.html':        'case-studies/case-study-1.html',
  'artisan/404.html':                              '404.html',
};

const STATIC_DIRS = ['assets', 'resources'];

function rimraf(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

rimraf(DIST);
fs.mkdirSync(DIST, { recursive: true });

for (const [src, dest] of Object.entries(PAGES)) {
  const srcPath = path.join(ROOT, src);
  const destPath = path.join(DIST, dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

for (const dir of STATIC_DIRS) {
  const srcPath = path.join(ROOT, dir);
  if (fs.existsSync(srcPath)) copyDir(srcPath, path.join(DIST, dir));
}

console.log(`Built ${Object.keys(PAGES).length} pages + ${STATIC_DIRS.join(', ')} into dist/`);
