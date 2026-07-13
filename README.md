# The Product Artisan

Personal brand portfolio by **Abhay Tyagi** — Senior Product Manager at ServiceNow, building AI-powered Customer Success.

A multi-page static site showcasing my profile, AI-native PM operating system (built with Claude Code), proof-of-value case studies, and strategic playbook. Dark/light theme, zero dependencies, warm terracotta design system.

---

## What's Inside

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Full-screen hero, explore cards, key metrics, Substack CTA |
| **Profile** | `/profile` | Career timeline, skills, products, certifications, education, achievements |
| **Powered by Claude Code** | `/claude-code` | 8 custom skills, 2 agents, 7 hooks, 4 MCP integrations — my AI-native PM OS |
| **Proof of Value** | `/proof-of-value` | Hub for 10 strategic PM skills with bento grid (9 active, 1 watching) |
| **Platform Thinking** | `/proof-of-value/platform-thinking` | Team-wide operating system architecture case study |
| **Agent Governance** | `/proof-of-value/agent-governance` | Multi-agent AI system governance case study |
| **Domain Expertise** | `/proof-of-value/domain-expertise` | Cross-product domain knowledge case study |
| **Reusable Architecture** | `/proof-of-value/reusable-architecture` | Scalable, reusable product architecture case study |
| **Outcome Stories** | `/proof-of-value/outcome-stories` | Measurable delivery-outcome case study |
| **Stakeholder Management** | `/proof-of-value/stakeholder-management` | Audience-aware comms & ceremony case study |
| **Pricing Strategy** | `/proof-of-value/pricing-strategy` | GenAI compute-cost architecture case study |
| **Playbook** | `/playbook` | AI PM Strategic Playbook dashboard |
| **404** | `/*` | Styled error page |

---

## Key Metrics

- **290%** product ACV growth during my tenure ($18M → $70M)
- **19** AI agents built across 5 workflows
- **0 → 120** enterprise Plus tier upgrades
- **380+** enterprise accounts on the platform

---

## Tech Stack

- **HTML / CSS / JS** — vanilla, zero external dependencies
- **Node.js** — lightweight server with clean URL routing (no frameworks, no npm packages)
- **Inter** — Google Fonts for typography
- **Dark mode** — built-in theme toggle with `localStorage` persistence
- **Design system** — warm terracotta accent (#d97757), CSS custom properties, responsive breakpoints

---

## Project Structure

```
the-product-artisan/
├── server.js                          # Zero-dependency Node.js server with route mapping
├── package.json                       # Project metadata and scripts
├── artisan/
│   ├── home.html                      # Homepage — hero, explore cards, metrics, Substack CTA
│   ├── profile.html                   # Profile — career, skills, products, achievements
│   ├── claude-code.html               # Claude Code architecture showcase
│   ├── proof-of-value.html            # Proof of Value hub — bento grid of 10 skill areas
│   ├── playbook.html                  # AI PM Strategic Playbook dashboard
│   ├── 404.html                       # Styled 404 error page
│   └── pov/
│       ├── platform-thinking.html     # PoV: Platform Thinking
│       ├── agent-governance.html      # PoV: Agent Governance
│       ├── domain-expertise.html      # PoV: Domain Expertise
│       ├── reusable-architecture.html # PoV: Reusable Architecture
│       ├── outcome-stories.html       # PoV: Outcome Stories
│       ├── stakeholder-management.html # PoV: Stakeholder Management
│       └── pricing-strategy.html      # PoV: Pricing Strategy
├── assets/
│   ├── css/
│   │   └── shared.css                 # Shared design system (variables, nav, sidebar, footer)
│   └── js/
│       └── shared.js                  # Shared JS (sidebar toggle, dark mode)
├── resources/
│   ├── Abhay.pdf                      # Resume (linked from /profile)
│   └── profile-photo.jpg              # Profile photo
├── styles/
│   └── executive-email.md             # Writing style guide
└── .claude/
    └── commands/
        └── brand-advisor.md           # Custom Claude Code agent for personal branding
```

---

## Getting Started

### Prerequisites

- Node.js (any recent version)

### Run locally

```bash
git clone https://github.com/lampiiii/the-product-artisan.git
cd the-product-artisan
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No `npm install` required — the server uses only Node.js built-in modules (`http`, `fs`, `path`).

---

## Links

- **Substack**: [productartisan.substack.com](https://productartisan.substack.com)
- **LinkedIn**: [linkedin.com/in/abhay-tyagi-iimu](https://www.linkedin.com/in/abhay-tyagi-iimu/)
- **GitHub**: [github.com/lampiiii](https://github.com/lampiiii)

---

## Deployment

This site works with virtually any hosting option:

- **Static hosts** (Vercel, Netlify, Cloudflare Pages) — deploy the HTML files directly with rewrite rules to map clean URLs to their `.html` files.
- **Node.js hosts** (Railway, Render, Fly.io) — run `node server.js` as the start command. The built-in server handles routing on port 3000.
- **Any web server** (Nginx, Apache, Caddy) — serve the directory as static files with appropriate rewrite rules.

---

## Built With

This entire portfolio — every page, every line of CSS, the server, and the content strategy — was built using [Claude Code](https://claude.ai/claude-code) by Anthropic.
