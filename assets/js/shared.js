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
// Grouped so the top nav matches the sidebar's Overview / Proof of Work /
// Craft & Thinking / Reading & Influences structure exactly.
const NAV_GROUPS = [
  { label: 'Overview', items: [
    { href: '/profile',          label: 'Profile' },
    { href: '/career-timeline',  label: 'Career Timeline' },
  ]},
  { label: 'Proof of Work', items: [
    { href: '/proof-of-value',              label: 'Proof of Value' },
    { href: '/projects',                    label: 'Projects' },
    { href: '/case-studies/case-study-1',   label: 'Case Study 01' },
    { href: '/metrics-dashboard',           label: 'Metrics Dashboard' },
  ]},
  { label: 'Craft & Thinking', items: [
    { href: '/skills-tools', label: 'Skills & Tools' },
    { href: '/frameworks',   label: 'Frameworks' },
    { href: '/playbook',     label: 'Playbook' },
    { href: '/claude-code',  label: 'Powered by Claude Code' },
  ]},
  { label: 'Reading & Influences', items: [
    { href: '/reading-list', label: 'Reading List' },
  ]},
];

function isActivePath(path, href) {
  return path === href || (href !== '/' && path.startsWith(href));
}

(function injectNav() {
  const inner = document.querySelector('.nav-inner, .global-nav-inner');
  if (!inner || inner.querySelector('.nav-center')) return;

  const path = location.pathname.replace(/\/+$/, '') || '/';
  const center = document.createElement('div');
  center.className = 'nav-center';
  center.innerHTML = NAV_GROUPS.map(group => {
    const groupActive = group.items.some(i => isActivePath(path, i.href));
    const itemsHtml = group.items.map(i => {
      const active = isActivePath(path, i.href);
      return `<a class="nav-group-item${active ? ' active' : ''}" href="${i.href}">${i.label}</a>`;
    }).join('');
    return `
      <div class="nav-group">
        <button type="button" class="nav-center-link nav-group-trigger${groupActive ? ' active' : ''}" aria-haspopup="true" aria-expanded="false">
          ${group.label}
          <svg class="nav-group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav-group-menu" role="menu">${itemsHtml}</div>
      </div>`;
  }).join('');

  const right = inner.querySelector('.nav-right, .global-nav-actions');
  right ? inner.insertBefore(center, right) : inner.appendChild(center);

  // Touch/click support alongside hover (hover-only doesn't work well on tap devices)
  center.querySelectorAll('.nav-group-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const group = btn.closest('.nav-group');
      const wasOpen = group.classList.contains('open');
      center.querySelectorAll('.nav-group.open').forEach(g => { g.classList.remove('open'); g.querySelector('.nav-group-trigger').setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { group.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', () => {
    center.querySelectorAll('.nav-group.open').forEach(g => { g.classList.remove('open'); g.querySelector('.nav-group-trigger').setAttribute('aria-expanded', 'false'); });
  });

  // Highlight the matching sidebar link too
  document.querySelectorAll('.sidebar-link').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\/+$/, '');
    if (href && isActivePath(path, href)) a.classList.add('active');
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
