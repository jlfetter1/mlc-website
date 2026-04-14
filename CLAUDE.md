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
  index.html             # Main homepage (all 11 sections)
  welcome.html           # Split landing page (companies vs individuals)
  css/styles.css         # Full design system (~2400 lines)
  js/
    main.js              # Scroll animations, nav, FAQ, stat counters
    i18n.js              # Translation dictionary (391 keys) + language switcher
    mesh-gradient.js     # Three.js aurora shader (hero section)
    cta-shader.js        # Three.js dot grid shader (CTA section)
    gemini-images.js     # Node.js CLI for Gemini image generation (not served)
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

## Additional Documentation

Check these when working in the relevant area:

| Document | When to check |
|----------|---------------|
| [Architectural Patterns](.claude/docs/architectural_patterns.md) | Adding sections, animations, interactive elements, or modifying the design system |
