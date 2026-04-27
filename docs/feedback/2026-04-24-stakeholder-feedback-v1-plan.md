# Stakeholder Feedback v1 — Catalog + Implementation Plan

**Source:** `Comments Website and Landing Pages.pdf` (13 pages, reviewed 2026-04-24)
**Reviews:** Homepage (current deploy) + all 11 wireframe pages from `/internal/wireframes-v1.html`
**Stakeholder answers received:** 2026-04-27
**Brand assets received:** 2026-04-27 (`site/assets/references/`)

---

## Stakeholder answers (resolved 2026-04-27)

| # | Question | Answer |
|---|---|---|
| 1 | Premium Production card subhead on homepage | **OMIT** — drop this change request entirely |
| 2 | "92%" stat phrasing | "top-**tier**" (typo). **Eliminate the word "say"**. Treat the 92% as the headline; the explanation that follows the % is the claim. |
| 3 | BE final CTA buttons | **One button = appointment, the other = diagnostic** |
| 4 | Cost-per-student placeholder | **Render literally as `$XX.xx`** |
| 5 | Coaching Ready-Set-Go framework | **Yes — single framework across all coaching engagements** |
| 6 | Recruitment scorecard | **Real format.** Accompanied by a detailed explanation of language abilities + an official diploma. |
| 7 | Other Languages — "What's inside" | **Do not include. Omit those instructions.** |
| 8 | Train Abroad — language training component | **Programs vary** — simple trips with English classes through full immersion. Programs available for undergraduate / graduate students, middle and upper management, or anyone. Language training can be integrated **before, during, or after** travel. |
| 9 | Two-CTA visual hierarchy | **Equal visual weight** |
| 10 | Founded date | **2003** |
| 11 | Tony Robbins event reference | **Anonymized phrasing only** — do not name Tony Robbins. |

## Canonical brand assets received

From `site/assets/references/`:

**Logo:** Use `Logo/Imagotipo Modern PNG Grande.png` (or Mediano/Chico for size variants), `Logo/Símbolo PNG.png` for icon-only use, `Logo/Símbolo Blanco PNG.png` for dark backgrounds. Retire the WordPress-CDN-hosted `logo-mlc-black.png` currently in `index.html`.

**Brand colors (canonical, from brand identity manual):**
| Role | Pantone | HEX | RGB |
|---|---|---|---|
| Dark navy | 287C | `#002C87` | 0/44/135 |
| Bright blue | 299CP | `#00A0DE` | 0/160/222 |
| Brand grey | 179 11C | `#666666` | 102/102/102 |

**Brand typography:** Gotham (Bold/Regular) + Arimo (Regular/Italic). Current site uses Space Grotesk + Inter as substitutes — confirm with stakeholder whether to change. Likely keep substitutes since Gotham is paid and Arimo is an Arial substitute (we already match its character).

**Logo proportions:** 12.43x × 4x for full imagotipo with safe zone. 4x × 4x for symbol-only with safe zone. Honor the 11.33x × 2.9x interior bounds when sizing.

## Still-missing assets

These were not delivered with the references folder:

| Asset | Purpose | Workaround |
|---|---|---|
| Mitsubishi logo SVG | Trust bar (homepage §1.2) | Recreate from public-domain mark, or omit pending delivery |
| BNP Paribas logo SVG | Trust bar (homepage §1.2) | Same |
| Odyssey logo SVG | Trust bar (homepage §1.2) | Same — also need to clarify which "Odyssey" entity (PDF showed "ODYSSEYRE") |
| Coaching Ready-Set-Go diagram source | §4 — recreate at design quality | Will rebuild from PDF page 8 reference |
| Recruitment scorecard sample | §5 hero | Have visual reference from PDF page 9; building a designed equivalent |

---

## Cross-cutting directives

These apply to **every solution lander**:

1. **Visual differentiation between solution pages.** Stakeholder explicitly flagged "IMPORTANT: Make sure there are visual differences between each of these products" (page 3).
2. **Two-CTA convention on every lander, equal visual weight.**
   - **Lower-left button** → "Schedule an appointment with MLC" (sales conversation)
   - **Right button** → "Schedule a free diagnostic test" (assessment funnel)
   - Two buttons must be visually distinct (e.g., gold + blue, or gold + ghost) but **carry equal hierarchy** per Q9 answer.
3. **Form turnaround promise.** "CEFR assessment + custom proposal delivered within **48 hours**" — apply everywhere.
4. **Coach match window.** "We match a coach within **24 hours**" on Coaching page.
5. **CEO name.** "Steve **Genereux**" — sweep all repos including research notes.
6. **Founded year.** **2003** — sweep.
7. **Tony Robbins.** Never named. All references must be anonymized (e.g., "global personal-development brand," "international speaker series").

---

## Page-by-page changes

### §1 · Homepage (current deploy)

| # | Type | Change | Status |
|---|---|---|---|
| 1.1 | Asset | Replace nav logo with `Imagotipo Modern PNG Grande.png` (canonical brand version, larger) | Asset on hand |
| 1.2 | Asset | Add three new client logos to the trust bar: Mitsubishi, BNP Paribas, Odyssey | **Blocked — logos not delivered** |
| 1.3 | Copy | Solutions section subhead → **"Every solution transforms your team's communication. Built to engage. Designed to convert. The ideal solution is one click away."** | Ready |
| 1.4 | Copy | Solutions card — Business English subhead → **"Internationally recognized Business English curriculum for teams. AI-adapted content for your sector. Certified instructors. Groups of 8 students max."** | Ready |
| ~~1.5~~ | — | ~~Premium Production card subhead change~~ | **OMITTED per Q1** |
| 1.6 | Copy | Process step 02 (Design) → **"Design: Our linguistic experts place you in the right program. Our AI customizes your curriculum by role, level, or industry."** | Ready |
| 1.7 | Copy | Why MLC subhead → **"The only language partner in Mexico that combines AI-native infrastructure with 20 years of executive-level delivery by expert coaches."** | Ready |
| 1.8 | Copy | Platform subhead → **"Scheduling, group organization, instructor assignment, progress monitoring, quality control, student support, feedback, and invoice generation. All automated. Done for you."** | Ready |

### §2 · Business English Program

| # | Type | Change |
|---|---|---|
| 2.1 | Structure | Two-CTA convention (left = appointment, right = diagnostic) — equal visual weight |
| 2.2 | Copy | Form helper → **"CEFR assessment + custom proposal delivered within 48 hours. Your data stays with MLC — we don't sell leads."** |
| 2.3 | Copy | Card 03 deliverable → **"03 · CONTENT · Core Curriculum + AI-adapted to your industry"** |
| 2.4 | Copy | "50+ hrs/mo" body → **"We handle every operational task. Placement, group organization, instructor assignment, progress monitoring, quality control, student support, feedback, and invoice generation. You review outcomes. Nothing else."** |
| 2.5 | Copy | "92%" card — keep "92%" stat, drop the word "say". The supporting line that explains the 92% IS the claim (e.g., "92% completion among top-tier leaders" — the existing card body becomes the explanation). |
| 2.6 | Copy | "Mo. PDF" → **"No Hidden Charges"** with subtitle **"No forced subscription. No retainer. Accurate billing hours based on usage."** |
| 2.7 | Asset | Monthly report mockup — highlight sample company name; replace stats: 247 students, 42 groups, Avg Attendance **89%**, Avg Gain **+2 levels / 8 mo**, B1 Retention 97%, Avg Cost per Student **`$XX.xx`** (literal placeholder per Q4) |
| 2.8 | Copy | Pull-quote progression → **"B1 To B2 (In 8 months)"** |
| 2.9 | Copy | Process step 02 → **"02 · DESIGN · Custom Curriculum: Core program + AI customization"** — remove "HR signs off" |
| 2.10 | Structure | Final CTA — appointment + diagnostic, equal weight |

### §3 · Premium Production

| # | Type | Change |
|---|---|---|
| 3.1 | Copy | Hero subhead → **"80% production-based. Presentations, negotiations, and boardroom fluency with case studies from prestigious business schools. Groups of 4 students max."** |
| 3.2 | Structure | Hero buttons follow two-CTA convention |
| 3.3 | Copy | Reorganize the four non-negotiables: |
| | | 1. Max 4 per group |
| | | 2. Dual Curriculum — Strengthen your English proficiency while sharpening your executive communication skills. |
| | | 3. Real Business Case Studies — Material inspired by HBR and MIT Sloan. Not contrived dialogues from a textbook. |
| | | 4. Certified senior instructors only |

### §4 · Last-Minute Coaching

| # | Type | Change |
|---|---|---|
| 4.1 | Copy | Hero rewrite → **"The moment that matters is near. In 24-48 hours, your coaching sessions are ready."** Lead-in note: "We evaluate the student's level, analyze their event needs, and develop a program." |
| 4.2 | Structure | Replace "Five moves in 48 hours" with the **Ready-Set-Go (Language Coaching)** 5-step framework — single framework for all coaching engagements per Q5: |
| | | **1. Needs Analysis** — Pre-Coaching Interview and Survey |
| | | **2. Set: Rehearsal** — First run-through; feedback on delivery (intonation, pronunciation, structure, confidence); detailed notes |
| | | **3. Ready: Preparation and Refinement** — Review and Practice Final Presentation; refine vocabulary, syntax, grammar; prepare student for first run-through (online meeting) |
| | | **4. Be: Final Run** — Final 'mock' run-through; pacing, timing, correction of recurrent stress; detailed final feedback and recording |
| | | **5. Post-Coaching** — Brief Survey and Feedback Session |
| 4.3 | Copy | Pull quote — change scenario to **"3 days before the event for a Compensation & Benefits Manager / Payroll Manager"** |
| 4.4 | Copy | FAQ — **"We started a session 24 hours after the inbound."** |
| 4.5 | Copy | Final CTA — **"We match a coach within 24 hours."** |

### §5 · Recruitment Support

| # | Type | Change |
|---|---|---|
| 5.1 | Asset | Replace simple scorecard with detailed sample (per-skill table: Grammar/Reading/Listening/Core test with B2 results, dates, score/max/achieved/difficulty). Include a "Detailed results and feedback" panel with circular score (e.g., 72%) + Listening/Reading/Production sub-scores. Show that the scorecard is paired with a detailed explanation + official diploma per Q6. |
| 5.2 | Copy | "ACCEPTED BY" → **"USED FOR"** |
| 5.3 | Copy | Replace credential boxes (Regulators / Courts / Cross-border / Audit) with: **HR Screening · Internal Certification · CEFR-based proof of level · Individual skills evaluation results** |

### §6 · Translation & Interpretation

| # | Type | Change |
|---|---|---|
| 6.1 | Direction | Emphasize large-scale anonymized event interpretation (Tony Robbins reference must NOT be named — anonymized phrasing only per Q11) |
| 6.2 | Copy | Update the trust-is-earned strip: |
| | | **Marquee event interpretation** — Over 3,000 headsets for whisper · Simultaneous subtitles on screens · Interpreters and Transcribers · 10,000+ audience |
| | | **Executive Interpretation** |
| | | **Broadcast Interpretation** |
| | | **Regulatory Translation** |
| | | (Replace earlier "Tony Robbins · 5,000 attendees · CDMX" with anonymized version: e.g., "Global personal-development brand · 10,000+ attendees · CDMX") |
| 6.3 | Copy | **Eliminate "ISO 4043 compliant"** mention from interpretation FAQ |

### §7 · Other Languages

| # | Type | Change |
|---|---|---|
| ~~7.1~~ | — | ~~Maybe include "Four deliverables" structure from BE~~ | **OMITTED per Q7** |
| 7.2 | Copy | Eliminate VW, Toyota, Honda mentions from German + Japanese cells |
| 7.3 | Copy | Eliminate the "max 4 for premium" reference in methodology block (program is English-only) |
| 7.4 | Copy | Replace pull quote → **"24 certified nurses · 8 months from zero German to B2 · onsite total immersion · successfully sent to Germany to work"** |

### §8 · Accreditation

| # | Type | Change |
|---|---|---|
| 8.1 | Copy | Step 04 → **"Full mock is regularly scheduled. Score trajectory transparent."** |

### §9 · Train Abroad

| # | Type | Change |
|---|---|---|
| 9.1 | Copy/Structure | Add language-training component per Q8: |
| | | • Programs vary — simple trips with English classes through full immersion |
| | | • Available for undergraduate / graduate students, middle and upper management, or anyone (no longer "C-suite only") |
| | | • Language training integrated **before, during, or after** travel |
| 9.2 | Copy | Candidate profile bullet → **"C-suite or senior VP level & upper management"** |

### §10 · Individuals Overview

| # | Type | Change |
|---|---|---|
| 10.1 | Copy | Travel Abroad card → **"Immersion at partner institutions in the UK, Canada, and the US. 4 weeks minimum. For individuals. Children's programs for the summer camp and the full school year are available."** |

### §11 · About

| # | Type | Change |
|---|---|---|
| 11.1 | Copy | **Founded in 2003** — sweep |
| 11.2 | Copy | **Steve Genereux** — sweep |

---

## Sequencing

### Phase 1 · Cross-cutting low-risk text (no blockers)
- Genereux spelling sweep (codebase + research)
- Founded date 2003 sweep
- Form turnaround "48 hours" everywhere
- Coach match "24 hours" on Coaching
- Two-CTA template wired into shared pattern

### Phase 2 · Homepage (one blocker: 3 client logos)
- Logo enlargement + canonical brand-version swap
- Three new client logos to trust bar (blocked — see still-missing assets)
- All copy edits 1.3, 1.4, 1.6, 1.7, 1.8

### Phase 3 · Solution-lander text + structure
1. Premium Production
2. Accreditation
3. Translation (with anonymized event reference)
4. Other Languages
5. Train Abroad
6. Individuals
7. About

### Phase 4 · Higher-effort structural
1. Business English (3-card rewrite + monthly-report mockup rebuild)
2. Recruitment Support (scorecard centerpiece redesign)
3. Last-Minute Coaching (Ready-Set-Go 5-step build, hero rewrite, FAQ + quote updates)

### Phase 5 · Verification + ES/FR translation pass

---

**End of plan v2 — answers integrated.**
