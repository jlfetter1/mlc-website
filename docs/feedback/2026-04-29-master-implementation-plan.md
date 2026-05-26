# MLC Website — Master Implementation Plan

**Date:** 2026-04-29
**Source:** Stakeholder call with Juan Carlos (JC), MLC
**Owner of plan:** Orchestrator (Jonathan/Openclaw)
**Target:** Production deploy by ~2026-05-13 (two-week commitment from call)

---

## Where we are

- Homepage + 8 solution landers + individuals + about + privacy are live on GitHub Pages V1.
- Stakeholder reaction on the call: "very happy", "way better than I expected", minor copy feedback already absorbed in last commit.
- Site is being kept secret from the broader MLC team; reveal happens at go-live (only Steve, his wife, Christian, JC know it exists).
- Forms are still `mailto:` placeholders. No CRM, no DNS, no production host.
- Hero imagery on each lander is generic; JC explicitly asked for product-contextualized imagery in the homepage's "guy walking with confidence" register.

## What "done" means for this phase

A clickable, shareable, polished V1 sent to JC by **end of day 2026-04-29** that:

1. Has product-contextualized hero imagery on all 8 solution landers.
2. Reads correctly on mobile, tablet, desktop with EN/ES toggle and reduced-motion path.
3. Has a clean dark/white logo on the nav (no grey "MODERN" on dark).
4. Routes form submissions to HubSpot (or has a clear stub ready to flip the moment admin access lands).
5. Has zero console errors and zero broken inter-page links.

Production launch (~2026-05-13) means: domain connected, HubSpot live, ES default, FR scaffolded, email blast ready, LinkedIn packs ready.

---

## Workstreams

### W1. V1 polish pass (this week)
- All 9 pages reviewed for: console errors, broken links, EN/ES parity, mobile breakpoint, prefers-reduced-motion.
- Inter-page navigation audited (footer + nav consistent across landers).
- Two-CTA convention enforced everywhere (gold + blue, equal weight).
- FAQ accordions, scroll reveals, stat counters all functional.
- Local verification: `python3 -m http.server -d site` returning 200 on every page.

### W2. Per-product hero imagery (this week)
JC's directive — same elite "shot of confidence" framing, subject changes per product:

| Lander | Imagery brief |
|---|---|
| business-english.html | Confident professional in workplace flow (executive in glass office, board meeting energy) |
| premium-production.html | Executive in mid-negotiation / closing a deal / commanding a room |
| coaching.html | Executive under deadline pressure — prepping notes for big interview / presentation, intensity but composed |
| recruitment.html | HR director evaluating candidates, scorecard energy |
| accreditation.html | Exam/certification moment, focused individual at terminal |
| translation.html | Certified document / formal handoff context, signed paper energy |
| languages.html | Multicultural professional setting, language diversity signaling |
| train-abroad.html | Professional traveling, airport/arrival, international destination cue |

Generation pipeline: `image-generator/` tooling already in place. Output to `site/assets/solutions/<slug>.jpg`. Compress ≤200KB.

### W3. Brand assets gap fill
- **Dark/white logo variant** for nav on dark sections. Generate `mlc-logo-white.svg` (or `.png`) by recoloring canonical Imagotipo. Replace nav `<img>` source on all pages where nav sits over `.section-dark`.
- **Trust-bar logos**: audit `site/assets/references/Logo` for new arrivals; import to `site/assets/logos/brands_home-*.svg`. Flag still-missing (Mitsubishi, BNP Paribas, Odyssey) for JC follow-up.

### W4. HubSpot CRM integration
- Get admin access from JC (committed on call; possible alternative is access via Max).
- Generate API token / private app credentials.
- Map form fields per page → HubSpot contact properties (name, work email, company, phone, team size, city, source page, UTM).
- Replace all `mailto:` actions with HubSpot Forms API submissions. Build a single `submitForm()` helper in `js/main.js` (or new `js/forms.js`) called by every form.
- Lead routing rules in HubSpot: new submissions → owner = Annabelle (round-robin with JC), stage = "New Lead → Presentation". Post-close handoff to account manager via workflow.
- QA: submit one test from every page, verify each lands in HubSpot with correct page-source attribution.

### W5. Domain + production host migration
- Decide host (off GitHub Pages long-term per prior decision). Likely candidates: Cloudflare Pages, Netlify, Vercel — pick whichever supports custom domain + TLS + form domain whitelisting cleanly. Recommend **Cloudflare Pages** for cost + DNS unification.
- Stage on `staging.modernlanguagecenter.com`, soft-launch test, then flip apex DNS.
- HubSpot form domain whitelist updated to include both staging + production.

### W6. ES + FR translation pass
- ES: complete pass once EN copy is locked. Update `i18n.js` entries for all new pages (individuals, about, privacy, 8 landers). Pre-launch flip default to ES.
- FR: scaffolded post-ES. New `fr` block in `i18n.js`. Add toggle option `EN/ES/FR` in nav.

### W7. LinkedIn campaign asset packs
- 8 per-product creative sets + 1 corporate set.
- Each set: 3 ad variants (image), 1 carousel, 1 text-only.
- Audience: HR Directors in **Monterrey first** + untouched Mexican cities; CDMX/GDL secondary (per JC's call note "focusing on Monterey and all the cities we haven't touched").
- UTM-tagged landing URLs: `?utm_source=linkedin&utm_campaign=<product>&utm_term=<audience>`. Homepage detects `utm_campaign=corporate` and switches to corporate-lander mode.

### W8. Email blast prep
- Subject line and body draft for "We have a brand new website" announcement.
- Send to MLC's existing contact list (Annabelle/JC own list).
- Trigger after domain go-live.
- Replies routed into HubSpot via reply-to address.

---

## Sequencing

```
Week 1 (now → 2026-05-06):
  Day 1 (TODAY): W1 polish + W2 hero imagery + W3 dark logo  → ship V1 link to JC tonight
  Day 2-3: W4 HubSpot integration (blocked on JC admin access; build stub now)
  Day 4-5: W5 production host setup, staging URL, DNS prep
  Day 5: W6 ES translation pass

Week 2 (2026-05-06 → 2026-05-13):
  Day 6-7: W6 FR scaffold + ES default flip
  Day 8: W7 LinkedIn asset packs
  Day 9: W8 email blast prep, final QA
  Day 10: Production cutover, monitor, hotfix window
```

## Critical-path dependencies

1. **JC HubSpot admin access** — blocks W4. Mitigate by building submit handler against HubSpot stub now; flip endpoint when access lands.
2. **EN copy lock** — blocks W6. Mitigate by treating current `i18n.js` EN as locked unless JC sends a written change.
3. **JC trust-bar logos delivery** — blocks W3 partially. Mitigate by shipping current set with dark-logo fix; backfill missing brands when delivered.
4. **Domain ownership / DNS access** — blocks W5 cutover. Confirm Jonathan or JC controls registrar.

## Out of scope for this phase (logged for later)

- MCP connection: Google Sheets → live database (class data, attendance alarms, weekly summaries) — JC's vision for the operations platform, not the marketing site.
- Internal MLC team-wide reveal of the new site (handled by JC, not us).
- Multi-language toggle UX redesign beyond simple EN/ES/FR switcher.

## Definition of done — production launch

- [ ] All 12 pages return 200 on production domain
- [ ] Form submission from every page lands in HubSpot with correct attribution
- [ ] EN/ES/FR toggle works on every page, ES is default
- [ ] No console errors on any page
- [ ] Mobile + tablet + desktop verified
- [ ] prefers-reduced-motion path verified
- [ ] Per-product hero imagery in place on all 8 landers
- [ ] Dark/white logo variant in nav
- [ ] LinkedIn campaign URLs tested with UTM attribution
- [ ] Email blast template approved and queued
- [ ] JC + Annabelle have HubSpot training / can see leads
