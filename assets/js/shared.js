// ============================================================
//  Shared behaviour — theme, sidebar, injected top nav
// ============================================================

// --- Theme (light-first) ---
// Every fresh page load starts in light mode; the toggle below can switch
// to dark for the current session, but that choice isn't persisted.
(function initTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
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
    { href: '/proof-of-value',                          label: 'Proof of Value' },
    { href: '/projects',                    label: 'Projects' },
    { href: '/case-studies/case-study-1',   label: 'Case Study 01' },
    { href: '/metrics-dashboard',           label: 'Metrics Dashboard' },
  ]},
  { label: 'Craft & Thinking', items: [
    { href: '/skills-tools', label: 'Skills & Tools' },
    { href: '/frameworks',   label: 'Frameworks' },
    { href: '/playbook',     label: 'Playbook' },
    { href: '/claude-code',  label: 'My Claude Code Stack' },
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
      const cls = ['nav-group-item', i.sub && 'nav-group-item--sub', active && 'active'].filter(Boolean).join(' ');
      return `<a class="${cls}" href="${i.href}">${i.label}</a>`;
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

// --- Scroll reveal (site-wide) ---
// Any bento/card grid item gets a data-reveal attribute + staggered delay,
// then fades/rises into place the first time it enters the viewport.
(function scrollReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.card, .bento > *, .cards > *');
  if (!targets.length) return;

  targets.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.setProperty('--reveal-delay', `${Math.min(i, 10) * 60}ms`);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
})();

// --- Subtle pointer tilt on active cards (desktop, fine pointer only) ---
(function cardTilt() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !finePointer) return;

  document.querySelectorAll('.card--active').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// --- Theme toggle ---
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  });
}
