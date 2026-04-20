# Website Build Brief — Modern Language Center

## Design Direction

### Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary Blue | #008AFE | CTAs, interactive elements, brand identity |
| Deep Navy | #1a2744 | Headings, dark sections, text |
| Premium Gold | #B08C5A | Premium CTAs, accents, hover states |
| Light Background | #f8f9fb | Page background, alternating sections |
| Card White | #FFFFFF | Cards, content blocks |
| Muted Text | #5a6677 | Body copy, secondary text |
| Success Green | #2a7d4f | Trust signals, checkmarks |

**Rationale:** Keeps MLC's established blue while adding sophistication with navy and gold. The gold accent is already in the current site's secondary button — we're elevating it to a premium signal. Backed by competitor data: be School's bold palette works because it's confident. MLC's refined blue/navy/gold says "established, premium, trustworthy."

### Typography Pairing
- **Headlines:** Instrument Serif (elegant, editorial, signals sophistication)
- **Body:** DM Sans (clean, modern, excellent readability)
- **Both are free Google Fonts** with full Latin Extended support (critical for Spanish content)

**Rationale:** MarselisPro is not widely available and falls back to Arial on most systems. Instrument Serif + DM Sans is a proven premium pairing (used by top design agencies) and loads instantly from Google Fonts.

### Photography & Asset Style
- Professional corporate photography with warm lighting
- Diverse international professionals in business settings
- Avoid stock-photo poses — candid, in-motion, at-work shots
- 3D scroll-triggered hero asset as centerpiece differentiator
- SVG icons for services (matching the minimal style of current pillar icons)

### Animation Recommendations
| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero section | 3D asset plays on scroll | ScrollTrigger |
| Section headings | Fade up + stagger | Scroll into view |
| Client logos | Subtle continuous scroll | Auto |
| Stat counters | Count up animation | Scroll into view |
| Cards | Fade up with stagger | Scroll into view |
| CTA buttons | Magnetic hover effect | Mouse proximity |
| Nav | Blur backdrop on scroll | Scroll position |
| Dark/light sections | Parallax depth layers | ScrollTrigger |

### What to AVOID
- Elementor/page-builder look (heavy, slow, template-feeling)
- Carousel/slider heroes (no competitor does them well)
- Overuse of blue-on-blue (current site has monotone blue sections)
- Stock photography with generic smiling people
- Dense paragraph blocks without visual breathing room

---

## Site Architecture

### Pages to Build

| Page | Purpose | Priority |
|------|---------|----------|
| **Homepage** | Hero + trust bar + services overview + social proof + CTA | Critical |
| **Business Program** | B2B service detail + process + HR messaging + CTA | Critical |
| **One on One** | Individual service + pricing tiers + instructor profile + CTA | High |
| **About Us** | Story + pillars + team + international teachers | High |
| **Contact** | Form + locations + WhatsApp integration | High |

**Note:** Start with a single-language (Spanish) build. English mirror can be added post-launch. This simplifies the build and avoids the bilingual complexity that currently bogs down the site.

### Navigation Structure
```
Logo                                          [CTA: Agenda una cita]
Empresas  |  Individuos  |  Nosotros  |  Contacto
```

- **Empresas** (dropdown): Business Program, Premium, Coaching
- **Individuos** (dropdown): One on One, Meet Program
- **Nosotros:** About Us page
- **Contacto:** Contact page
- Primary CTA in nav: "Agenda una cita" (Book a meeting) — always visible

### Content Hierarchy — Homepage

1. **Hero** — 3D scroll asset + headline + sub-headline + CTA
2. **Trust Bar** — Client logos (scrolling marquee)
3. **Value Props** — 3 cards: Calidad Academica / Cero Carga Administrativa / Resultados Medibles
4. **Process Section** (dark) — 4-step visual: Diagnostico > Plan > Capacitacion > Resultados
5. **Services Overview** — Business Program + One on One + Premium cards
6. **Social Proof** — Testimonials with company logos + stats (20+ years, 6 languages, 100+ companies)
7. **Team Preview** — International teachers section with country flags
8. **CTA Section** — "Agenda tu diagnostico gratuito" with form

---

## Content Framework

### Homepage Headlines — 3 Options

**Option A (Data-driven, mirrors top competitor pattern):**
> "20 anos transformando el talento ejecutivo de Mexico"
> Sub: El proveedor B2B #1 de soluciones linguisticas. Capacitacion en 6 idiomas con instructores internacionales y resultados medibles.

**Option B (Outcome-focused, speaks to HR buyer):**
> "Tu equipo habla. Nosotros lo hacemos comunicar."
> Sub: Capacitacion corporativa en idiomas con reportes mensuales, KPIs claros y cero carga administrativa para tu area de RRHH.

**Option C (Bold, differentiating):**
> "No ensenamos gramatica. Desarrollamos comunicadores de clase mundial."
> Sub: Programas B2B en 6 idiomas con contenido personalizado por IA para tu industria, instructores internacionales en vivo y seguimiento mensual.

**Recommendation:** Option C for the rebuild — it's bold, differentiated, and leads with what makes MLC unique (AI-customized content, live instructors, not a software platform).

### Value Proposition Structure
1. **Above the fold:** What you do + for whom + why you're different
2. **Trust bar:** Proof that others trust you (client logos)
3. **Process:** How it works (lower friction)
4. **Services:** What you offer (self-selection)
5. **Proof:** Testimonials + data (confirm the decision)
6. **Action:** CTA with clear next step

### SEO Keyword Targets

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| Homepage | proveedor ingles empresas Mexico | capacitacion idiomas corporativo, cursos ingles B2B |
| Business Program | cursos de ingles para empresas | ingles corporativo, ingles de negocios Mexico |
| One on One | clases de ingles personalizadas | ingles ejecutivo, tutor ingles online Mexico |
| About | escuela de idiomas Mexico | academia idiomas corporativo |
| Contact | cotizar ingles para empresas | contacto escuela idiomas Mexico |

---

## Conversion Playbook

### Primary Conversion Goal
**Book a free diagnostic call** — shift from "Cotizar ya!" (quote request) to "Agenda tu diagnostico gratuito" (free diagnostic). This is what IH Mexico does successfully. It's lower commitment and starts the sales conversation.

### Lead Capture Strategy
1. **Primary:** "Agenda tu diagnostico gratuito" form (name, email, phone, company, team size)
2. **Secondary:** "Prueba tu nivel gratis" (free level test) — already exists, needs prominence
3. **Tertiary:** WhatsApp widget for instant chat (IH Mexico and be School both use this)

### Social Proof Plan
| Element | Placement | Source |
|---------|-----------|--------|
| Client logos (6-8) | Trust bar below hero | MLC's existing client base |
| Testimonial quotes (3-4) | Dedicated section + sprinkled | Collect from current clients |
| Stats (20+ years, 6 languages, etc.) | Hero area or counter section | MLC data |
| Teacher nationalities | About section with flag icons | Already on current site |
| Platform logos (Pearson, Padlet, etc.) | Business Program page | Already on current site |

### Trust Signal Checklist
- [ ] 6-8 client company logos visible on homepage
- [ ] 3-4 testimonials with real names + company attribution
- [ ] "20+ years" prominently displayed
- [ ] "6 languages" with flag icons
- [ ] Cambridge/CEFR alignment mentioned
- [ ] Teacher credentials section (certifications, experience)
- [ ] Privacy policy linked
- [ ] Physical address visible
- [ ] WhatsApp/phone number accessible
- [ ] SSL certificate (already has)

---

## Technical Requirements Summary

- **Stack:** HTML + CSS + JavaScript (no frameworks)
- **Animation:** GSAP + ScrollTrigger (CDN)
- **Design:** Mobile-first, semantic HTML5
- **Hero:** 3D scroll-triggered asset placeholder (<!-- 3D SCROLL ASSET HERE -->)
- **Performance:** Lighthouse 90+, lazy loading, prefers-reduced-motion
- **SEO:** Schema markup (EducationalOrganization), OG tags, proper hreflang for future EN
- **Deployment:** Static files, ready for Vercel/Netlify
