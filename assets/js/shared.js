// ============================================================
//  Shared behaviour — theme, sidebar, injected top nav
// ============================================================

// --- Theme (dark-first) ---
// Default to dark (matches io.google) unless the visitor chose light before.
(function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  document.documentElement.setAttribute('data-theme', saved || 'dark');
})();

// --- Primary navigation (injected once, site-wide) ---
const NAV_LINKS = [
  { href: '/profile',        label: 'Profile' },
  { href: '/proof-of-value', label: 'Proof of Value' },
  { href: '/claude-code',    label: 'Claude Code' },
  { href: '/playbook',       label: 'Playbook' },
];

(function injectNav() {
  const inner = document.querySelector('.nav-inner, .global-nav-inner');
  if (!inner || inner.querySelector('.nav-center')) return;

  const path = location.pathname.replace(/\/+$/, '') || '/';
  const center = document.createElement('div');
  center.className = 'nav-center';
  center.innerHTML = NAV_LINKS.map(l => {
    const active = path === l.href || (l.href !== '/' && path.startsWith(l.href));
    return `<a class="nav-center-link${active ? ' active' : ''}" href="${l.href}">${l.label}</a>`;
  }).join('');

  const right = inner.querySelector('.nav-right, .global-nav-actions');
  right ? inner.insertBefore(center, right) : inner.appendChild(center);

  // Highlight the matching sidebar link too
  document.querySelectorAll('.sidebar-link').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\/+$/, '');
    if (href && (path === href || (href !== '/' && path.startsWith(href)))) a.classList.add('active');
  });
})();

// --- Nav shadow on scroll ---
(function navScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// --- Sidebar ---
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const sidebarToggle = document.getElementById('sidebar-toggle');

function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('visible'); }
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('visible'); }

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
}
if (overlay) overlay.addEventListener('click', closeSidebar);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

// --- Theme toggle ---
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });
}
