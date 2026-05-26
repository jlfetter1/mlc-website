# Handoff Brief — Lead Implementation Agent

**From:** Orchestrator (Jonathan/Openclaw)
**Date:** 2026-04-29
**Mission:** Take the MLC website from V1 to a clickable, polished, shareable state by **end of day today**, then drive toward production launch by 2026-05-13.

---

## Read first

1. `/home/openclaw/.openclaw/workspace/projects/mlc-website/CLAUDE.md` — codebase rules, theming, conventions
2. `.claude/docs/architectural_patterns.md` — design system patterns
3. `docs/feedback/2026-04-29-master-implementation-plan.md` — the plan you're executing
4. `docs/feedback/2026-04-24-stakeholder-feedback-v1-plan.md` — what the last round absorbed
5. Auto-memory: `feedback_page_uniqueness.md` — **never clone homepage onto landers**; design system is shared, composition is not

## Context you need to know

- This is the **MLC website**, B2B premium language training in Mexico. Stakeholder Juan Carlos (JC) is "very happy" with V1 and wants polished hi-fi pages this week.
- Two-week deploy commitment: production live by ~2026-05-13.
- Decided this week: **HubSpot Free** is the CRM. All forms go there. Lead routing: Annabelle + JC own intake → presentation → close → handoff to account manager.
- **No GitHub Pages long-term.** Migration to a real production host is part of this phase.

## Today's deliverable (non-negotiable)

A clickable shareable V1 link to send JC by tonight. That means:

1. **Per-product hero imagery on all 8 landers** — see directives below
2. **Dark/white logo variant** in nav (current grey "MODERN" wordmark on dark is suboptimal)
3. **V1 polish pass**: zero console errors, zero broken links, EN/ES toggle works, mobile breakpoint clean
4. **All form CTAs unified**: equal-weight gold + blue, two-CTA convention
5. **Local verification:** `python3 -m http.server -d site` returning 200 on every page

## Per-product imagery brief (JC's exact direction)

Carry the homepage's "guy walking with confidence" elite aesthetic into every product page, contextualized to the product. Same shot quality, same elite register, subject changes.

| Lander | Subject |
|---|---|
| `business-english.html` | Confident professional in workplace flow |
| `premium-production.html` | Executive negotiating / presenting / closing a deal |
| `coaching.html` | Executive under deadline pressure prepping for big interview/event |
| `recruitment.html` | HR director evaluating candidates (scorecard energy) |
| `accreditation.html` | Exam/certification moment, focused individual |
| `translation.html` | Certified document handoff, formal setting |
| `languages.html` | Multicultural professional setting |
| `train-abroad.html` | Professional traveling, airport/arrival, international cue |

**Generation:** use `image-generator/` tooling. Output to `site/assets/solutions/<slug>.jpg`. Compress ≤200KB. SVG not appropriate here.

## Workstreams not for today (build toward, don't block on)

- **HubSpot integration (W4)** — JC owes admin access. Build the `submitForm()` helper against a stub now so flipping to live endpoints is one variable change. Map form fields to HubSpot contact properties: name, work email, company, phone, team size, city, source page, UTM params.
- **Production host migration (W5)** — recommend Cloudflare Pages (DNS + TLS + form whitelist clean). Don't migrate today; just have the recommendation and the steps queued.
- **ES + FR translations (W6)** — ES once EN locked. FR scaffold after.
- **LinkedIn campaign packs (W7)** — 8 per-product + 1 corporate, 3 ad variants each.
- **Email blast (W8)** — draft template, hold until domain live.

## Conventions to enforce (from CLAUDE.md)

- Per-section theming via `.section-dark` / `.section-light`
- All user-facing strings need `data-i18n` attributes + EN/ES entries in `js/i18n.js`
- All animations must respect `prefers-reduced-motion`
- Card easing: `cubic-bezier(0.23,1,0.32,1)`
- WebGL shaders only on homepage hero + CTA — don't add them to landers
- Each lander has its own composition; design system inherited, layouts unique

## Stakeholder rules learned this project

- **Don't clone homepage UI onto landers.** Saved memory `feedback_page_uniqueness.md`. Each lander gets its own composition.
- **Two CTAs, equal visual weight.** Gold + blue, not primary/secondary hierarchy.
- **Anonymize Tony Robbins.** Reference is "global personal-development events / brands · 10,000+ attendees" only.
- **No timeline/dates in stakeholder-facing docs.** Deadlines are our problem, not the client's.
- **Founded 2003**, not 2004.
- **Steve Genereux**, not Generoux.
- **`$XX.xx`** is the literal redacted-cost glyph in the report mockup.

## Verification checklist (before reporting done)

- [ ] `python3 -m http.server -d site` then curl 200 from every URL
- [ ] Browser console clean on every page
- [ ] EN/ES toggle works on every page, persists in localStorage
- [ ] FAQ accordions expand/collapse on every lander that has them
- [ ] Scroll-reveal animations fire on every section
- [ ] Mobile (<768px) and tablet (768–1024px) breakpoints clean
- [ ] DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → animations degrade gracefully
- [ ] All footer/nav links resolve
- [ ] All buttons have hover/focus states
- [ ] Two-CTA convention (gold + blue equal weight) on every CTA section

## When you're done

1. Commit with a clear message: subject under 70 chars, body explaining what changed and why
2. Push to `main`
3. Report back with the live URL list, the verification checklist results, and any blockers you hit
4. **Do not** mark the production-launch tasks complete — those are W5/W6/W7/W8 and live across the next two weeks

## You are explicitly authorized to

- Generate hero imagery via the `image-generator/` pipeline
- Edit any HTML/CSS/JS file in `site/`
- Add new files to `site/assets/solutions/`, `site/assets/logos/`
- Create new translations entries in `js/i18n.js`
- Commit and push to `main`

## You are NOT authorized to

- Modify `.gitignore` without flagging it
- Add npm dependencies (this project has zero, keep it that way)
- Add a build step or bundler
- Push to a branch other than `main`
- Migrate to production host without confirmation (queue the steps; don't execute the cutover)
- Send anything to JC directly — all stakeholder comms go through Jonathan

## Success criteria

JC opens the V1 link tonight, clicks through every product, sees product-contextualized hero imagery in the homepage's elite register, sees clean nav logo on dark sections, hits zero broken anything, and replies "this is great, let's polish."

---

**Go.**
