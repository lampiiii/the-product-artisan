Open a portfolio page in the browser. If no argument is given, open the home page.

Available pages and their routes:
- home → http://localhost:3000/
- profile → http://localhost:3000/profile
- claude-code → http://localhost:3000/claude-code
- proof-of-value → http://localhost:3000/proof-of-value
- platform-thinking → http://localhost:3000/proof-of-value/platform-thinking
- agent-governance → http://localhost:3000/proof-of-value/agent-governance
- domain-expertise → http://localhost:3000/proof-of-value/domain-expertise
- reusable-architecture → http://localhost:3000/proof-of-value/reusable-architecture
- playbook → http://localhost:3000/playbook

The page files live in the `artisan/` directory (previously `pages/`).

## Instructions

1. First check if the server is running on port 3000. If not, start it with `node server.js` in the background.
2. Match the user's argument `$ARGUMENTS` to one of the available pages above (fuzzy match is fine — e.g. "profile", "pov", "platform" should all resolve correctly). If the argument is "pov" treat it as "proof-of-value". If the argument is a partial match like "platform" resolve to "platform-thinking", "agent" to "agent-governance", "domain" to "domain-expertise", "reusable" to "reusable-architecture", "claude" to "claude-code", "play" to "playbook".
3. Open the matched URL using `open` (macOS).
4. Confirm which page was opened.
