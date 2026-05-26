# MLC Website

Premium B2B website for Modern Language Center (MLC) - enterprise language training company in Mexico targeting C-suite executives and multinationals (BMW, PepsiCo, Grupo Salinas, TV Azteca).

## Tech Stack

- **Frontend:** Vanilla HTML, CSS3, JavaScript (ES6) - no framework, no bundler
- **Animation:** GSAP 3.12.5 (CDN), Three.js (ES6 import), CSS @keyframes
- **Styling:** Single CSS file with custom properties design system
- **i18n:** Custom EN/ES bilingual system via `data-i18n` attributes + localStorage
- **Deployment:** GitHub Pages, auto-deploys on push to `main`
- **Dependencies:** Zero npm packages. GSAP and Three.js loaded via CDN/import maps

## Project Structure

```
site/                    # Deployed directory (GitHub Pages serves this)
  index.html             # Main homepage (all 11 sections) — canonical entry
  welcome.html           # Optional split-entry page routing to index.html (companies) or individuals.html (individuals, not yet built). Not linked from index.html.
  competitive-analysis.html  # Standalone research deck (shares styles.css)
  proposal.html          # Standalone proposal deck (shares styles.css)
  css/styles.css         # Full design system (~2400 lines)
  js/
    main.js              # Scroll animations, nav, FAQ, stat counters
    i18n.js              # EN/ES translation dictionary + language switcher
    mesh-gradient.js     # Three.js aurora shader (hero section)
    cta-shader.js        # Three.js dot grid shader (CTA section)
    gemini-images.js     # Node.js CLI for Gemini image generation — tooling, not served at runtime. Co-located here for historical reasons; do not import from page scripts.
  assets/                # Images, videos, logos, solution photos
.github/workflows/
  deploy.yml             # GitHub Pages deployment (checkout -> upload site/ -> deploy)
```

Non-deployed directories at root: `research/`, `website-intelligence/`, `3d-animation-creator/`, `image-generator/`, `seo-strategy/`, `scroll-stop-builder-skill/` - these are tooling/content generation, not part of the live site.

## Build & Deploy

No build step. Static files served directly.

```sh
# Deploy: push to main triggers GitHub Actions
git push origin main

# Local preview: any static server from site/ directory
npx serve site
# or
python -m http.server -d site
```

## Key Conventions

- **Theming is per-section**, not global. Every section wraps in `.section-dark` or `.section-light`
- **All interactive state** uses CSS class toggling (`.scrolled`, `.open`, `.active`, `.animated`)
- **All user-facing text** must have `data-i18n` attributes with keys in both `en` and `es` in `i18n.js`
- **All animations** must check `prefers-reduced-motion` and degrade gracefully
- **WebGL shaders** are self-contained IIFEs that manage their own scene lifecycle and use IntersectionObserver to pause when off-screen
- **Card easing:** `cubic-bezier(0.23,1,0.32,1)` throughout

## Asset Conventions

- `site/assets/solutions/*.jpg` — hero image for each solution card (one per solution, lowercase-kebab name matching the solution key)
- `site/assets/logos/*.svg` — client brand logos; prefer SVG, keep PNG/ICO only as fallbacks. Trust-bar logos follow the `brands_home-<BRAND>.svg` naming
- `site/assets/hero-*.jpg`, `photo-*.jpg`, `hero-video.mp4` — top-level hero and photo imagery referenced from multiple pages
- Compress JPEGs to ≤200KB where possible; prefer SVG for anything vector
- **Root-level JPEGs** (`proposal-*.jpeg`, `simple-*.jpeg`, `final-*.jpeg`) are generated deliverables from the `image-generator/` and `proposal/` tooling — not served by the site and should not be referenced from `site/`

## Testing & Validation

No tests, linters, or typecheckers are configured. Validate changes by:
1. Running a local static server (`npx serve site` or `python -m http.server -d site`)
2. Checking the browser console for errors
3. Testing EN/ES toggle, nav scroll state, FAQ expand, and scroll-reveal animations
4. Verifying `prefers-reduced-motion` path (DevTools → Rendering → Emulate CSS media feature)
5. Mobile breakpoint (<768px) and tablet breakpoint (768–1024px)

## Additional Documentation

Check these when working in the relevant area:

| Document | When to check |
|----------|---------------|
| [Architectural Patterns](.claude/docs/architectural_patterns.md) | Adding sections, animations, interactive elements, or modifying the design system |
