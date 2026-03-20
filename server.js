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
  '/':                                  'pm-workspace-home.html',
  '/profile':                           'profile.html',
  '/claude-code':                       'claude-code.html',
  '/proof-of-value':                    'proof-of-value.html',
  '/proof-of-value/platform-thinking':  'pov-platform-thinking.html',
  '/proof-of-value/agent-governance':   'pov-agent-governance.html',
  '/proof-of-value/domain-expertise':   'pov-domain-expertise.html',
  '/proof-of-value/reusable-architecture': 'pov-reusable-architecture.html',
  '/playbook':                          'strategic-playbook-dashboard.html',
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
  const notFoundPage = path.join(DIR, '404.html');
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
