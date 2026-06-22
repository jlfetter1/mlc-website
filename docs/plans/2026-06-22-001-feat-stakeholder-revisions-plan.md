---
title: "feat: MLC stakeholder revisions (2026-06 client feedback round)"
type: feat
date: 2026-06-22
deepened: 2026-06-22
depth: Standard
origin: "MLC Website last revision.pdf (client stakeholder feedback, 6 pages, Spanish, 2026-06-22)"
status: ready-for-execution
---

# feat: MLC Stakeholder Revisions — 2026-06 Client Feedback Round

## Summary

Implement the ~19 concrete revisions the client returned in *MLC Website last revision.pdf* across the homepage and six solution landers. The changes are copy refinements (bilingual EN+ES), targeted design tweaks, one net-new homepage section, and a scoped punctuation cleanup. No architecture, framework, or build changes — content and presentation work on the existing vanilla HTML/CSS/i18n site.

**Source of truth:** `MLC Website last revision.pdf` (repo root, dated 2026-06-22). Two older feedback PDFs exist at the repo root — `Comments Website and Landing Pages.pdf` (2026-04-24) and `Catálogo_JCS.pdf` (2026-04-20) — they predate this round and are treated as **prior/superseded**; the June PDF is the sole source for these changes.

Execution posture (per user direction): each slice ships as its own **PR**; an **adversarial review agent challenges every PR**; findings are fixed and the review loop repeats until the PR is approved; **only an approved PR merges to `main`** (GitHub Pages auto-deploys on merge → live client links). All front-end design work routes through `/hallmark`. All user-facing copy lands in both `en` and `es`.

---

## Problem Frame

The client (MLC stakeholders, via JC) reviewed the staged site and returned a marked-up PDF requesting specific changes before the site is client-ready. The feedback is concrete and bounded — it names sections, exact copy, and design adjustments. The job is to faithfully apply each item, exercise design judgment where the feedback is directional ("create a differentiating section", "two columns", "two rows", "review uppercase and color"), and deploy to the live GitHub Pages URLs so JC can share them with the client.

The feedback is written in Spanish. Because the site is bilingual, every copy change must be applied to the correct translation mechanism for the page it lives on (see KTD1 — this is the single biggest source of error in this work).

---

## How i18n actually works here (read before any copy edit)

The site has **two independent translation mechanisms** in `site/js/i18n.js`. Editing copy without touching the right one will silently regress the Spanish site.

1. **Structured `data-i18n` dictionary** — used by elements carrying a `data-i18n="key"` attribute (almost all of `site/index.html`). Keys live in the `en` block (~lines 30–340), the `es` block (~lines 200–340), and an `fr` block. To change such copy: edit the `data-i18n` element's fallback text in the HTML **and** the matching key value in the `en` and `es` blocks.

2. **Visible-text flat map (`pageTextTranslations`)** — used by a `TreeWalker` (i18n.js ~line 3263+) that translates plain visible text on pages **without** `data-i18n`. The walker **explicitly skips any node inside a `[data-i18n]` element** (confirmed at i18n.js ~line 3258). The solution landers (`site/companies/*.html`) use this path: their H1s and body copy are plain text. The map key **is the literal English string** (e.g., `"HR can defend to the CFO."`), and `pageTextTranslations.es` maps it to Spanish. To change lander copy you MUST: (a) edit the visible English text in the HTML, **and** (b) change the flat-map **key** from the old English string to the new English string, **and** (c) update its ES value. Attribute/meta strings (`title`, `aria-label`, `alt`, `meta`, og) are translated by a second querySelectorAll pass and follow the same key-is-English-string rule.

**Live defect already in the tree (must reconcile):** `i18n.js:1214` has `"HR can defend to the CFO." : "que RRHH puede presentar con confianza al CFO."` — the ES value was pre-edited to the *new* feedback wording while `business-english.html:104` still renders the *old* English. So today the EN site shows old copy and the ES key is half-migrated. U6 fixes this.

**Inherited ES quality is machine-grade and untrustworthy.** Examples found: `i18n.js:1663` `"The clock is running" → "el reloj esta corriendo"` (missing accent + capital), `i18n.js:905` `"Can candidates retake?" → "¿Pueden los candidatos volver a tomar?"` (drops "la prueba"). For every string we touch, **audit and fix the ES**, do not just "verify it exists."

---

## Requirements

"FB p.N" = feedback PDF page number.

| R# | Requirement | Source |
|----|-------------|--------|
| R1 | Nav logo is slightly larger / more visible | FB p.1 |
| R2 | Spanish-language selector is clearly visible (contrast, size, or location) | FB p.1 |
| R3 | Process H2 **Spanish** copy → "…Aquí está la respuesta." (ES-only; "tu"→"la"). EN unchanged | FB p.1 |
| R4 | "La Diferencia" eyebrow has more visual prominence | FB p.1 |
| R5 | New standalone homepage section: "Capacitación Tan Personalizada Como Tu Negocio" + 3 bullets + closing line | FB p.2 |
| R6 | AI-sector line refined → ES "Nuestra IA adapta cada lección a tu sector: farmacéutica, finanzas, automotriz, tecnología o consumo" (and matching EN) | FB p.2 |
| R7 | Privacy reassurance: rework the existing contact-form note to convey "Tu privacidad es nuestra prioridad. Nunca compartimos tus datos." (do not add a duplicate) | FB p.3 |
| R8 | Remove em-dashes from homepage visible copy + all CTAs (EN+ES); best-effort decorative sweep on landers | FB p.3 |
| R9 | Business English hero title → "Resultados que RRHH puede presentar con confianza al CFO." (+ matching EN) | FB p.3 |
| R10 | Last-Minute Coaching: unify the off-token gold(s) with `--gold`; copy "La cuenta regresiva ha comenzado." | FB p.3–4 |
| R11 | Recruitment: highlight the retake question; fix its ES to the full "¿Pueden los candidatos volver a tomar la prueba?" | FB p.4 |
| R12 | Translation: split the indicated content into two **columns** | FB p.4 |
| R13 | Accreditation: title → "Certifica a tu equipo. La garantía de una preparación especializada y de alto impacto."; restructure indicated block into two **rows**; review uppercase + color | FB p.4–5 |
| R14 | Train Abroad: replace lead with expanded audience copy (keeps Canada / boarding-school programs) | FB p.6 |
| R15 | Resolve the standalone "Canadá" annotation (FB p.6): confirm intent with JC — foreground Canada vs. label — and apply or document the read | FB p.6 |

**Success criteria:** every PDF item reflected on the live site in the correct language(s); design tweaks polished (not generic); EN/ES toggle, nav scroll state, FAQ, scroll-reveal, `prefers-reduced-motion`, mobile/tablet all pass; each change shipped via reviewed-and-approved PR; no orphaned/half-migrated i18n keys.

---

## Key Technical Decisions

- **KTD1 — Use the correct i18n mechanism per page (see "How i18n actually works").** Homepage `data-i18n` edits touch the structured `en`/`es` blocks; lander edits touch the visible HTML text **and** the `pageTextTranslations` flat-map key (key = English string) **and** its ES value. This is the #1 correctness risk in this plan.
- **KTD2 — Apply ES-only feedback to ES only.** Several PDF items are Spanish-wording tweaks with no English counterpart (R3). Do **not** invent English rewrites from ES-only feedback. Where the feedback gives new Spanish *and* the English clearly must match (R6, R9, R13, R14), change both; where it's purely an ES nuance (R3 "tu"→"la"), leave EN intact.
- **KTD3 — Em-dash cleanup: homepage literal, landers best-effort.** The client's literal ask (FB p.3) is to remove em-dashes from the **Home page and all CTAs** — so on the homepage, remove em-dashes from **all visible copy and CTA labels** (EN+ES), replacing with commas/periods/colons or reflow, including body prose (this overrides any "leave correct prose" instinct *for the homepage*). On **landers**, do a best-effort decorative sweep (separators → punctuation) but leave em-dashes inside genuinely correct flowing sentences; flag ambiguous cases to the reviewer. `i18n.js` has em-dashes on ~282 lines — never blanket-strip.
- **KTD4 — Coaching gold = token alignment, both occurrences.** `coaching.html:14` (`.ur-badge` bg `#F59E0B`) **and** `coaching.html:195` (inline `style="color:#F59E0B"` on the "clock is running" eyebrow) both hardcode an amber that differs from `--gold` (`#C5A46C`). Replace both with `var(--gold)`. Because `#C5A46C` is lighter/more muted than `#F59E0B`, re-check the `.ur-badge` contrast (dark text on gold) after the change.
- **KTD5 — Design items go through `/hallmark`, fresh layouts.** New section (R5), Translation two-column (R12), Accreditation two-row + color (R13), La Diferencia prominence (R4), Recruitment highlight (R11) are designed against the existing design system (CSS custom properties, `.section-dark`/`.section-light`, card easing `cubic-bezier(0.23,1,0.32,1)`). Per project memory, inherit the design system but do not clone existing section structure.
- **KTD6 — PR-per-slice with adversarial gate.** Each unit (or coherent group) ships as branch + PR; an adversarial review agent reviews each PR (faithfulness to PDF, i18n parity per KTD1, design quality, regressions); fix → re-review until approved; only approved PRs merge to `main`; merge == live deploy.
- **KTD7 — Validation is manual (no test harness).** No test/lint/typecheck tooling. "Test scenarios" are manual checks via local static server (`python -m http.server -d site`) + the `CLAUDE.md` checklist + targeted greps (scoped per KTD3/F5).

---

## Scope Boundaries

**In scope:** R1–R15 on `site/index.html`, `site/css/styles.css`, `site/js/i18n.js`, and `site/companies/{business-english,coaching,recruitment,translation,accreditation,train-abroad}.html`.

**Out of scope / Deferred:**
- ES-as-default language flip (tracked in project memory — pending JC sign-off).
- French (FR) dictionary / toggle (deferred at launch). FR keys may be left as-is unless an edit obviously orphans one; note but don't fix FR copy this round.
- Anything not in the June PDF (no new pages; the April PDFs are not re-litigated here).
- `site/internal/` wireframes, `proposal.html`, `competitive-analysis.html`.

**Deferred to Follow-Up Work:** if the lander em-dash sweep surfaces copy that wants real rewriting beyond punctuation, note it and leave it — punctuation-only this round.

---

## Implementation Units

Stable U-IDs. Suggested PR grouping noted per unit (execution detail for `ce-work`).

### U1. Nav logo size + Spanish-selector visibility

- **Goal:** R1, R2.
- **Requirements:** R1, R2
- **Dependencies:** none
- **Files:** `site/css/styles.css` (`.nav-logo`, `.lang-toggle`, `.lang-active`, `.lang-inactive`, `.lang-divider`); `site/index.html` nav (~lines 35–53, reference); confirm the same nav pattern on landers + `about.html`/`individuals.html` so the fix is site-wide.
- **Approach:** Modestly increase `.nav-logo` height/max-height (preserve header rhythm + `.scrolled` state). The inactive ES token is too faint — raise contrast/weight so both EN and ES read as tappable; clarify the active/inactive affordance. Design-system only. **`/hallmark`.**
- **Patterns to follow:** existing `.scrolled` nav state; color tokens.
- **Test scenarios:** logo visibly larger, no nav overflow, `.scrolled` still aligns (manual); both EN+ES legible at default+scrolled, reasonable AA contrast (manual); toggle still switches language (manual); mobile/tablet no wrap/overlap (manual).
- **Verification:** larger logo, obviously-visible ES, no regression across breakpoints/scroll states.
- *(PR-A)*

### U2. Homepage copy refinements (process H2 ES, AI-sector line)

- **Goal:** R3, R6.
- **Requirements:** R3, R6
- **Dependencies:** none
- **Files:** `site/index.html` (`proc.h2` ~line 206; `plat.ai.p` ~line 363), `site/js/i18n.js` (`proc.h2`, `plat.ai.p` in `es` block; `plat.ai.p` in `en` block).
- **Approach:**
  - R3 (ES only): `proc.h2` ES "…Aquí está tu respuesta." → "…Aquí está la respuesta." **Leave EN "Here's your answer." unchanged** (no English item in the feedback).
  - R6 (both): `plat.ai.p` EN → "Our AI adapts every lesson to your sector: pharma, finance, automotive, tech, consumer goods." ES → "Nuestra IA adapta cada lección a tu sector: farmacéutica, finanzas, automotriz, tecnología o consumo." (colon replaces the old em-dash, consistent with KTD3.)
- **Patterns to follow:** structured `data-i18n` keys (homepage mechanism per KTD1).
- **Test scenarios:** ES toggle shows new `proc.h2`; EN `proc.h2` unchanged (manual); `plat.ai.p` correct in both languages, no em-dash (manual); no raw-key fallback (manual).
- **Verification:** R3 ES-only applied; R6 both languages; no English regression.
- *(PR-B)*

### U3. "La Diferencia" eyebrow prominence

- **Goal:** R4.
- **Requirements:** R4
- **Dependencies:** none
- **Files:** `site/index.html` (`why.eyebrow` ~line 257), `site/css/styles.css` (scoped class preferred over global `.eyebrow`).
- **Approach:** Larger size and/or distinct treatment (accent color, weight, device) so the eyebrow signposts the section. Scope to this instance to avoid changing every eyebrow site-wide. **`/hallmark`.**
- **Patterns to follow:** `.eyebrow` styling; `#why` `.section-light mesh-gradient` theme; card easing.
- **Test scenarios:** eyebrow clearly more prominent in EN+ES (manual); holds at mobile/tablet without crowding H2 (manual); reduced-motion respected if animated (manual); other eyebrows unaffected if a shared class was touched (manual).
- **Verification:** prominent, on-brand, no collateral eyebrow changes.
- *(PR-A — pairs with U1)*

### U4. New standalone homepage section — "Tan Personalizada Como Tu Negocio"

- **Goal:** R5.
- **Requirements:** R5
- **Dependencies:** none
- **Files:** `site/index.html` (new `<section>` with `data-i18n` keys), `site/css/styles.css` (scoped styles), `site/js/i18n.js` (new keys in `en`+`es` blocks — homepage mechanism).
- **Approach:** Net-new full-width section, own layout (not a clone of `#why`/`#process`). Content (use `data-i18n` keys so it follows the homepage mechanism):
  - Heading EN "Training As Personalized As Your Business" / ES "Capacitación Tan Personalizada Como Tu Negocio".
  - Bullet 1 EN "Adapted to your industry, goals, and teams." / ES "Adaptada a tu industria, objetivos y equipos."
  - Bullet 2 EN "Focused on real business situations, not theory." / ES "Enfocada en situaciones reales de negocio, no en teoría."
  - Bullet 3 EN "Personalization without sacrificing consistency, metrics, or quality control." / ES "Personalización sin sacrificar consistencia, métricas ni control de calidad."
  - Closing EN "Personalization where it matters. Consistency where it counts." / ES "Personalización donde importa. Consistencia donde cuenta."
  - Generous whitespace ("usar el espacio en blanco"). `.section-dark`/`.section-light` per surrounding rhythm. Placement decided in `/hallmark` pass (candidate: after `#why`, before `#platform`). No em-dashes (KTD3).
- **Patterns to follow:** per-section theming; `.reveal` scroll-reveal via `main.js`; card easing.
- **Test scenarios:** all five strings render in EN+ES (manual); scroll-reveal animates + degrades under reduced-motion (manual); layout holds <768px and 768–1024px (manual); clean theme transition with neighbors (manual).
- **Verification:** polished, distinctive, fully bilingual, no console errors.
- *(PR-C)*

### U5. Contact-form privacy note (rework, not duplicate)

- **Goal:** R7.
- **Requirements:** R7
- **Dependencies:** none
- **Files:** `site/index.html` (`form.note` ~line 580), `site/js/i18n.js` (`form.note` in `en` ~line 37 and `es` ~line 227; **and** the flat-map duplicate `"CEFR assessment + custom proposal…"` ~line 921 keyed on the visible English string), `site/companies/business-english.html` (~line 119 — see outlier below). The same privacy string appears in **9 files**.
- **Approach:** The form already has a privacy note ("…Your data stays with MLC — we don't sell leads."). **Rework it** to carry the feedback message rather than adding a second line. EN → "CEFR assessment + custom proposal delivered within 48 hours. Your privacy is our priority; we never share your data." ES → "Evaluación CEFR + propuesta personalizada en 48 horas. Tu privacidad es nuestra prioridad; nunca compartimos tus datos." (The existing string contains an em-dash → removed here, satisfying KTD3 for this CTA-area copy.) Coverage has **two paths** (per KTD1):
  - **8 instances use `data-i18n="form.note"`** (index.html:580; companies: accreditation:161, recruitment:211, premium-production:173, coaching:212, translation:173, languages:147, train-abroad:197, business-english:290). Editing the structured `en`/`es` values (i18n.js:37/227) updates their *rendered* text. Also update their HTML fallback text for hygiene (correct EN on no-JS and keeps source honest).
  - **1 outlier — `business-english.html:119` (`class="lf-tiny"`, NO `data-i18n`)** — translated only by the flat-map TreeWalker (key i18n.js:921). This needs: edit the visible English text in the HTML **and** change the flat-map key (i18n.js:921) **and** update its ES value. Missing this is exactly the orphan failure mode (EN stale here while ES updates).
- **Patterns to follow:** existing `form.note` key; lander flat-map rule (KTD1) for the line-119 outlier.
- **Test scenarios:** privacy line reworked EN+ES, no duplicate, no em-dash, on **all 9 instances** (manual); `business-english.html:119` shows new EN (not stale) and correct ES (manual); flat-map key (921) updated so its key no longer equals the old English (grep) (manual).
- **Verification:** single coherent privacy line in both languages across all 9 surfaces, including the non-`data-i18n` line-119 outlier; no orphaned key.
- *(PR-B)*

### U6. Business English — hero title + reconcile stale ES key

- **Goal:** R9 + fix the live half-migrated key.
- **Requirements:** R9
- **Dependencies:** none
- **Files:** `site/companies/business-english.html` (`<h1>` ~line 104, plain text + gold `<span>`), `site/js/i18n.js` (flat-map key `"HR can defend to the CFO."` ~line 1214; meta/og strings ~line 887).
- **Approach (lander mechanism, KTD1):**
  1. Change the visible H1 English to the new framing, e.g. EN "Results HR can present to the CFO with confidence." keeping the `<span style="color:var(--gold)">` accent on the key phrase.
  2. Change the flat-map **key** from `"HR can defend to the CFO."` to the new English string, and set its ES value to "Resultados que RRHH puede presentar con confianza al CFO." (resolves the line-1214 mismatch).
  3. Reconcile the meta/og description (`"Business English HR can defend to the CFO…"` ~line 887) and the H1 fragment split: confirm whether the H1 is one string or split across the `<span>` (TreeWalker keys per text node) — set keys to match the actual node boundaries.
  4. Audit ES quality of the new value.
- **Patterns to follow:** lander visible-text flat map; gold-accent span.
- **Test scenarios:** EN H1 shows new title with gold accent (manual); ES toggle shows the new ES (not English fallback, not old wording) (manual); no flat-map key still equals the *old* English (grep) (manual); meta/og not contradicting H1 (manual).
- **Verification:** new bilingual title live, accent intact, no orphaned/duplicate key, line-1214 mismatch gone.
- *(PR-E)*

### U7. Last-Minute Coaching — gold unification (both) + countdown copy

- **Goal:** R10.
- **Requirements:** R10
- **Dependencies:** none
- **Files:** `site/companies/coaching.html` (`.ur-badge` `#F59E0B` line 14; inline `color:#F59E0B` eyebrow line 195; urgency/countdown copy), `site/js/i18n.js` (flat-map keys for the changed copy, incl. fixing `"The clock is running" → "el reloj está corriendo"` quality if that line is touched).
- **Approach:** Replace **both** `#F59E0B` occurrences (lines 14 and 195) with `var(--gold)`; grep the file for any other amber. Re-check `.ur-badge` contrast (dark text on `#C5A46C`). Apply copy "The countdown has begun." / "La cuenta regresiva ha comenzado." to the relevant urgency line via the lander flat map (edit visible EN + map key + ES). If the "clock is running" eyebrow copy is in scope, fix its broken ES (`el reloj esta corriendo` → `El reloj está corriendo`).
- **Patterns to follow:** `var(--gold)` usage already on `.ur-ct .n`, `.events-list li span.arrow`, `.rsg-step .rsg-num`.
- **Test scenarios:** no `#F59E0B` remains (grep) (manual); accents uniformly `--gold`; badge text legible (manual); countdown copy correct EN+ES (manual); any touched ES is correct (accents/caps) (manual).
- **Verification:** uniform gold, legible badge, correct bilingual countdown, ES quality fixed for touched strings.
- *(PR-F)*

### U8. Recruitment — highlight retake question + fix its ES

- **Goal:** R11.
- **Requirements:** R11
- **Dependencies:** none
- **Files:** `site/companies/recruitment.html` (FAQ retake item ~line 187), `site/css/styles.css` (scoped highlight), `site/js/i18n.js` (`"Can candidates retake?"` ~line 905 — fix ES to include "la prueba").
- **Approach:** The retake Q exists as an FAQ ("Can candidates retake?" → "Yes, after 90 days. Same rate."). "Resaltar" = highlight: promote it to a visible callout or style this FAQ item distinctly (accent border / open-by-default / badge) via **`/hallmark`**. Fix the ES key value to "¿Pueden los candidatos volver a tomar la prueba?" (currently drops "la prueba").
- **Patterns to follow:** `.faq-item`/`.faq-question` markup + `main.js` toggle.
- **Test scenarios:** retake Q visibly emphasized EN+ES (manual); ES reads the full feedback phrasing incl. "la prueba" (manual); other FAQ toggles still work if this one is promoted/open-by-default (manual); breakpoints hold (manual).
- **Verification:** retake Q stands out; FAQ intact; ES corrected.
- *(PR-F)*

### U9. Translation — two-column layout

- **Goal:** R12.
- **Requirements:** R12
- **Dependencies:** none
- **Files:** `site/companies/translation.html` (target single-column block; existing `.svc-split` 2-col grid ~line 22 for reference), `site/css/styles.css` if a new grid is needed, `site/js/i18n.js` for any touched copy.
- **Approach:** Identify the block the client means (the page already has a `.svc-split` two-column services grid, so the target is a *different* currently single-column block). **Default interpretation (to unblock execution, parallel to U10's):** the `#services` intro block (~line 90) is the most likely single-column target for a two-column treatment; if PDF context points instead at the closing CTA block (~line 159), switch — flag to reviewer either way. Apply a responsive two-column grid collapsing to one under ~900px (mirror `.svc-split`'s media rule). **`/hallmark`** for balance. Account for longer ES text in column sizing.
- **Patterns to follow:** `.svc-split` grid + `@media (max-width:900px)` collapse.
- **Test scenarios:** target content shows two balanced columns desktop (manual); collapses to one column mobile, no overflow (manual); ES (often longer) fits both variants (manual).
- **Verification:** clean responsive two-column, no ES overflow, correct target block.
- *(PR-F)*

### U10. Accreditation — title + two-row layout + uppercase/color review

- **Goal:** R13.
- **Requirements:** R13
- **Dependencies:** none
- **Files:** `site/companies/accreditation.html` (`<h1>` ~line 49; the block to split into two rows; uppercase/eyebrow styling + inline colors), `site/css/styles.css` (scoped), `site/js/i18n.js` (title flat-map key + ES).
- **Approach (lander mechanism):**
  - Title: EN "Certify your team. The guarantee of specialized, high-impact preparation." / ES "Certifica a tu equipo. La garantía de una preparación especializada y de alto impacto." Update visible text + flat-map key + ES; keep a gold accent if it suits.
  - Two rows (**default interpretation, to unblock execution**): restructure the certifications grid (`#certs` / the cert chips block) into two clear rows; if PDF context points at the value section instead, switch — flag to reviewer either way.
  - Uppercase + color: audit `text-transform:uppercase` and inline/hardcoded accent colors on this page; reduce shouty all-caps where it hurts readability; align colors to `--gold`/tokens. List specific changes for review.
- **Patterns to follow:** eyebrow/heading styles; gold token; section rhythm.
- **Test scenarios:** new title correct EN+ES, no fallback (manual); restructured block reads as two responsive rows (manual); uppercase reduced/justified, colors tokenized (manual).
- **Verification:** retitled, clean two-row block, refined type/color, bilingual.
- *(PR-F — split into its own PR if review finds it too large)*

### U11. Train Abroad — replacement lead copy

- **Goal:** R14, R15.
- **Requirements:** R14, R15
- **Dependencies:** none
- **Files:** `site/companies/train-abroad.html` (`.lead` ~line 68; meta description ~line 7; Canada blocks ~lines 134/139 for R15), `site/js/i18n.js` (lead flat-map key + ES; meta string).
- **Approach (lander mechanism):**
  - R14: Replace the lead. ES (verbatim from feedback): "Desde una estancia de una semana con clases de inglés hasta una inmersión completa de varios meses. Diseñado para ejecutivos, gerentes y directivos, así como para estudiantes de licenciatura y posgrado; en general, para cualquier persona que requiera una mejora acelerada y medible de su nivel de inglés. También ofrecemos programas especializados para niños y adolescentes en exclusivos internados en el extranjero." EN: **diff against the existing polished EN lead (line 68)** and adjust only what the feedback changes (don't retranslate from scratch and regress phrasing). Update visible text + flat-map key + ES; reconcile meta description if it mirrors the lead.
  - R15 (Canadá): the page already features "Canada · US · UK" and Canadian boarding schools. **Default read:** the standalone "Canadá" annotation asks to foreground Canada as the flagship destination. **Action:** confirm intent with JC; if confirmed, give Canada visual/positional primacy in the destinations block; if it's just a label, document and no-op. Do not silently drop it.
- **Patterns to follow:** `.lead` styling; lander flat map.
- **Test scenarios:** lead shows new copy EN+ES; EN preserves existing polish where unchanged (manual); audience list (executives, managers, undergrad/grad, kids/teens) all present (manual); Canada handling matches JC's confirmed intent or is documented (manual); meta not contradicting lead (manual).
- **Verification:** new bilingual lead, EN not regressed, Canadá item resolved, downstream Canada content coherent.
- *(PR-E)*

---

## Sequencing & PR Plan

Each PR → adversarial review loop → approval → merge → live.

1. **PR-A** — Home nav/design: U1, U3
2. **PR-B** — Home copy + site-wide privacy note: U2, U5 (note: U5's privacy string spans 9 files, incl. one lander instance at `business-english.html:119`)
3. **PR-C** — Home new section: U4
4. **PR-E** — Lander copy: U6, U11
5. **PR-F** — Lander design+copy: U7, U8, U9, U10 (split U10 if large)
6. **PR-D** — Em-dash sweep (homepage literal + lander decorative): **runs LAST**, after all copy PRs merge.

**`i18n.js` contention (important):** nearly every unit edits `site/js/i18n.js`, and the em-dash sweep touches it broadly. Run PR-D last to absorb final reconciliation, and within copy PRs keep `i18n.js` edits minimal and localized to the changed keys. Rebase each PR on latest `main` before review to surface conflicts early.

**Em-dash ownership (avoid double-edit churn):** copy units remove em-dashes *inline* on the strings they already touch — U2 handles `plat.ai.p`, U5 handles the privacy note. **PR-D owns only the remaining/untouched homepage visible copy + CTA em-dashes and the lander decorative sweep.** Because PR-D runs last, any em-dash a copy PR already removed is simply absent by then — no conflict, no re-edit.

Within each PR: implement → local validation checklist → open PR → adversarial review → fix → re-review until approved → merge to `main` → confirm GitHub Pages deploy.

---

## System-Wide Impact

- **`site/js/i18n.js`** is touched by most units across **both** mechanisms; the failure mode is a changed English string orphaning its flat-map key → ES site shows English. Per-unit grep guards (below) catch this.
- **Shared CSS** (`site/css/styles.css`): prefer scoped classes over edits to global `.eyebrow`/`.lead`/`.nav-logo`; verify any global change across other pages.
- **GitHub Pages auto-deploy:** each merge to `main` is immediately public; the PR adversarial-review gate is the safeguard.

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Lander English edit orphans its ES flat-map key → ES shows English | KTD1 + per-unit grep: after each lander edit, confirm no flat-map key still equals the *old* English string |
| Line-1214–style half-migrated keys elsewhere | U6 reconciles the known one; grep for ES values that already match new feedback wording while EN is unchanged |
| Inherited ES is machine-quality (missing accents, dropped words) | Audit ES for every touched string; fix accents/caps/wording (R8/R11 examples) |
| Em-dash scope misread (home literal vs lander best-effort) | KTD3 makes the split explicit; verification grep scoped to visible copy (exclude `<!-- -->`, `<title>`, meta) |
| Inventing English changes from ES-only feedback (R3) | KTD2: ES-only items change ES only |
| Duplicate privacy line (R7) | U5 reworks the existing `form.note`, not a new line |
| Coaching second gold missed (line 195) | KTD4 names both `#F59E0B` lines; grep confirms zero remain |
| Global CSS regressions | Scoped classes; cross-page validation |
| Ambiguous design targets ("two rows", "highlight", which Translation block) | `/hallmark` + concrete default interpretations in U9/U10; flag to reviewer |
| Unreviewed live deploy | PR gate: only approved PRs merge |

---

## Open Questions (execution-time)

- **R15 "Canadá" intent:** foreground Canada vs. label — confirm with JC; U11 has a default + documented fallback.
- **R7 placement:** reworking `form.note` is the chosen path; confirm no second privacy surface is expected.
- **R12 Translation target block:** which currently-single-column block — resolve against PDF context, flag if ambiguous.
- **R13 "two rows" target:** certifications grid is the default; confirm during `/hallmark`.

None block starting; all are presentation/placement choices safe to resolve at execution and confirm via adversarial review.

---

## Validation Checklist (per PR)

1. Local static server (`python -m http.server -d site`), no console errors.
2. EN **and** ES toggle shows correct strings for all touched copy — explicitly confirm ES is not falling back to English (the flat-map orphan failure mode).
3. **i18n parity grep:** for each lander string changed, confirm no `pageTextTranslations` key still equals the *old* English; confirm the new ES value is present and correct (accents/caps).
4. Nav scroll state, FAQ expand, scroll-reveal still work.
5. `prefers-reduced-motion` degrades gracefully (DevTools → Rendering).
6. Mobile (<768px) and tablet (768–1024px) intact.
7. **Em-dash grep (U5/PR-D), scoped:** check visible copy + CTA labels only — exclude HTML comments (`<!-- -->`), `<title>`, and `meta`/og tags — so the "clean" criterion is achievable.
8. Coaching: `grep "#F59E0B" site/companies/coaching.html` returns nothing.
