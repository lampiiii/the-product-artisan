# Abhay Tyagi -- PM Workspace

A personal portfolio site for a Senior Product Manager at ServiceNow, showcasing AI-driven Customer Success work, proof-of-value case studies, and an interactive strategic playbook.

---

## What's Inside

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Full-screen hero landing page with workspace navigation |
| **Profile** | `/profile` | Detailed bio, career timeline, skills, certifications, education, and achievements |
| **Claude Code** | `/claude-code` | Showcase of how this portfolio was built entirely with Claude Code |
| **Proof of Value** | `/proof-of-value` | Hub linking to four in-depth PoV case studies |
| **Platform Thinking** | `/proof-of-value/platform-thinking` | Case study on cross-application workflow design |
| **Agent Governance** | `/proof-of-value/agent-governance` | Case study on multi-agent AI system governance |
| **Domain Expertise** | `/proof-of-value/domain-expertise` | Case study on Customer Success domain knowledge |
| **Reusable Architecture** | `/proof-of-value/reusable-architecture` | Case study on scalable, reusable product architecture |
| **Playbook** | `/playbook` | AI PM Strategic Playbook dashboard |

---

## Tech Stack

- **HTML / CSS / JS** -- vanilla, zero external dependencies
- **Node.js** -- lightweight server with clean URL routing (no frameworks, no npm packages)
- **Inter** -- Google Fonts for typography
- **Dark mode** -- built-in theme toggle with `localStorage` persistence

---

## Getting Started

### Prerequisites

- Node.js (any recent version)

### Run locally

```bash
git clone https://github.com/lampiiii/portfolio.git
cd portfolio
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No `npm install` required -- the server uses only Node.js built-in modules (`http`, `fs`, `path`).

---

## Project Structure

```
portfolio/
├── server.js                        # Zero-dependency Node.js server with route mapping
├── package.json                     # Project metadata and scripts
├── .nvmrc                           # Node.js version pin
├── shared.css                       # Shared design system (variables, nav, sidebar, footer)
├── shared.js                        # Shared JS (sidebar toggle, dark mode, keyboard shortcuts)
├── 404.html                         # Styled 404 error page
├── pm-workspace-home.html           # Home / landing page
├── profile.html                     # Profile and career details
├── claude-code.html                 # Claude Code showcase
├── proof-of-value.html              # Proof of Value hub
├── pov-platform-thinking.html       # PoV: Platform Thinking
├── pov-agent-governance.html        # PoV: Agent Governance
├── pov-domain-expertise.html        # PoV: Domain Expertise
├── pov-reusable-architecture.html   # PoV: Reusable Architecture
├── strategic-playbook-dashboard.html # AI PM Strategic Playbook
├── resources/
│   ├── Abhay.pdf                    # Downloadable resume
│   ├── Profile.pdf
│   └── profile-photo.jpg
└── styles/
    ├── CLAUDE.md                    # Claude Code style instructions
    └── executive-email.md
```

---

## Deployment

This site works with virtually any hosting option:

- **Static hosts** (Vercel, Netlify, Cloudflare Pages) -- deploy the HTML files directly. You will need redirect/rewrite rules to map clean URLs (e.g., `/profile`) to their `.html` files.
- **Node.js hosts** (Railway, Render, Fly.io) -- run `node server.js` as the start command. The built-in server handles routing automatically on port 3000.
- **Any web server** (Nginx, Apache, Caddy) -- serve the directory as static files with appropriate rewrite rules.

---

## Built With

This entire portfolio -- every page, every line of CSS, the server, and the content strategy -- was built using [Claude Code](https://claude.ai/claude-code) by Anthropic.
