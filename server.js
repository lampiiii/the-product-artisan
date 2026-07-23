// Portfolio Server — lightweight Node.js server (zero dependencies)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

const ROUTES = {
  '/':                                  'artisan/home.html',
  '/profile':                           'artisan/profile.html',
  '/claude-code':                       'artisan/claude-code.html',
  '/proof-of-value':                    'artisan/proof-of-value.html',
  '/projects':                          'artisan/projects.html',
  '/proof-of-value/platform-thinking':  'artisan/pov/platform-thinking.html',
  '/proof-of-value/agent-governance':   'artisan/pov/agent-governance.html',
  '/proof-of-value/domain-expertise':   'artisan/pov/domain-expertise.html',
  '/proof-of-value/reusable-architecture': 'artisan/pov/reusable-architecture.html',
  '/proof-of-value/delivery-discipline': 'artisan/pov/delivery-discipline.html',
  '/proof-of-value/stakeholder-management': 'artisan/pov/stakeholder-management.html',
  '/proof-of-value/pricing-strategy':    'artisan/pov/pricing-strategy.html',
  '/playbook':                          'artisan/playbook.html',
  '/career-timeline':                   'artisan/career-timeline.html',
  '/skills-tools':                      'artisan/skills-tools.html',
  '/reading-list':                      'artisan/reading-list.html',
  '/frameworks':                        'artisan/frameworks.html',
  '/metrics-dashboard':                 'artisan/metrics-dashboard.html',
  '/case-studies/case-study-1':         'artisan/case-studies/case-study-1.html',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  // Route-based pages
  if (ROUTES[pathname]) {
    const file = path.join(DIR, ROUTES[pathname]);
    return serveFile(res, file, '.html');
  }

  // Static files (resources, styles)
  const safePath = path.join(DIR, pathname);
  if (safePath.startsWith(DIR) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    return serveFile(res, safePath, path.extname(safePath));
  }

  // 404 — serve styled page
  const notFoundPage = path.join(DIR, 'artisan/404.html');
  if (fs.existsSync(notFoundPage)) {
    return serveFile(res, notFoundPage, '.html', 404);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
  res.end('Not Found');
});

function serveFile(res, filePath, ext, statusCode = 200) {
  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(statusCode, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      ...SECURITY_HEADERS,
    });
    res.end(content);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end('Internal Server Error');
  }
}

server.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
