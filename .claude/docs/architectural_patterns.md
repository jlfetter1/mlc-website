# Architectural Patterns

## Overview

Zero-dependency static site. No framework, no bundler, no package manager. External libraries (GSAP, Three.js) loaded via CDN/ES6 imports. All interactivity is vanilla JS with CSS class toggling.

## Section-Based Theming (Not Global Toggle)

Theme is per-section, not a global dark/light toggle. Wrapper classes `.section-dark` / `.section-light` cascade colors to all children. Every new section must declare one of these. See `site/css/styles.css:707-751` for the pattern.

- Dark sections: `--bg-dark` background, `--text-on-dark` text, strong shadows
- Light sections: `--bg-light` background, `--text-on-light` text, soft shadows
- Card hover shadows differ by section theme (`styles.css:732`)

## Data-Attribute Driven Behavior

HTML elements declare behavior through data attributes; JS scans and activates them:

| Attribute | Purpose | JS Handler |
|-----------|---------|------------|
| `data-i18n="key.path"` | Bilingual text replacement | `site/js/i18n.js:360-365` |
| `data-count="NUMBER"` | Animated stat counter | `site/js/main.js:113-132` |

## CSS Class-Based State Machine

All interactive state is managed by adding/removing CSS classes. No JS framework state:

| Class | Trigger | Applied To |
|-------|---------|------------|
| `.scrolled` | Scroll > threshold | `nav` (`main.js:19`) |
| `.open` | Click toggle | `.faq-item`, `.mobile-menu` (`main.js:28-37, 156-161`) |
| `.active` | 3.5s cycling interval | `.ai-chip` (`main.js:186-194`) |
| `.animated` | IntersectionObserver | `.timeline` (`main.js:135-148`) |
| `.stat-flash` | 3.5s jitter interval | `.stat-value` (`main.js:198-226`) |

## Animation Architecture (Three Layers)

### Layer 1: CSS @keyframes (Ambient)
Background effects that loop continuously. ~19 keyframe animations defined in `styles.css:461-494`. Examples: `auroraDark`/`auroraLight` gradient pulses, `scrollLogos` infinite horizontal scroll.

### Layer 2: GSAP ScrollTrigger (Scroll-Reveal)
Elements with `.reveal` class animate in on viewport entry (`main.js:40-65`):
- Opacity 0 -> 1, Y +24px -> 0
- Stagger calculated from sibling index: `indexOf(el) * 0.06`
- Fires once (no reverse) for performance
- Grid parents: `.card-grid`, `.solutions-grid`, `.testimonials-grid`, `.timeline`

### Layer 3: Three.js WebGL (Hero/CTA Shaders)
Self-contained IIFE modules that manage their own scene lifecycle:
- `site/js/mesh-gradient.js` - Aurora mesh gradient (5-color parametric sine waves)
- `site/js/cta-shader.js` - Dot grid with connection lines + energy waves

Both follow identical structure: canvas lookup -> bail if reduced motion -> scene/camera/renderer -> IntersectionObserver visibility gating -> RAF loop -> debounced resize.

## Performance Contract

Every animation file must respect `prefers-reduced-motion`:
- `main.js:11` - Skip GSAP scroll reveals
- `mesh-gradient.js:9` - Skip WebGL shader entirely
- `cta-shader.js:11` - Skip WebGL shader entirely
- `welcome.html:48` - Skip welcome page animations

WebGL renderers use `powerPreference: 'low-power'` (`mesh-gradient.js:20`).

IntersectionObserver gates RAF loops so off-screen shaders don't burn GPU (`cta-shader.js:134-138`).

## Internationalization (i18n)

Flat translation dictionary with dot-notation keys in `site/js/i18n.js:6-336`. ~391 keys covering all page content in EN/ES.

**Flow:** User clicks `.lang-toggle` -> `localStorage('mlc-lang')` persists choice -> IIFE walks all `[data-i18n]` elements and sets `textContent` (or `innerHTML` if value contains `<`).

**Adding new text:** Add key to both `en` and `es` objects in `i18n.js`, add `data-i18n="your.key"` to the HTML element.

## Responsive Grid System

12-column CSS Grid for solutions bento layout (`styles.css:778-795`). Cards declare their own `grid-column: span N` widths. Three breakpoints:

| Breakpoint | Width | Grid behavior |
|------------|-------|---------------|
| Desktop | > 1024px | Full 12-col, varied spans |
| Tablet | 768-1024px | 6-col simplified (`styles.css:1524`) |
| Mobile | < 768px | Single column stack (`styles.css:1560`) |

Navigation collapses to hamburger overlay at mobile (`styles.css:1562-1587`).

## Design System Tokens

All design tokens are CSS custom properties on `:root` (`styles.css:8-60`):
- Colors: `--gold` (primary accent), `--bg-dark*`, `--bg-light*`, `--text-on-dark`, `--text-on-light`
- Typography: `--font-display` (Space Grotesk), `--font-sans` (Inter)
- Spacing: `--section-pad` (clamp-responsive), `--container` (1200px max)
- Radii: `--radius`, `--radius-sm`
- Card easing: `cubic-bezier(0.23,1,0.32,1)` (Power3 out equivalent)
