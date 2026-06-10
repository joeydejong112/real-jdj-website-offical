# Impeccable Audit — JDJ Webdevelopment

**Source:** `http://127.0.0.1:8765/` (live, served from `C:\Users\Joey\Downloads\JDJ_website_html_css\JDJ_website_html_css\`)
**Date:** 2026-06-10
**Tool:** Impeccable skill — `audit` command

> **Setup note:** `impeccable` setup requested `PRODUCT.md`. This project has none, so the audit proceeds but flag this as the first thing to address in a future `init` run.

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2 | Teal eyebrow text at 4.0:1 (fails AA 4.5:1); no skip link; no `:focus-visible` styles |
| 2 | Performance | 1 | 1.5 MB hero image served unoptimized, no lazy/decode, no width/height, no preload |
| 3 | Responsive Design | 3 | Two real breakpoints, no horizontal scroll, touch targets ≥48px; nav lacks accessible mobile menu |
| 4 | Theming | 2 | CSS variables in place, but several hard-coded hex values (#080a0d, #cfd5dc, #d8cabe) bypass the token system |
| 5 | Anti-Patterns | 3 | Hand-drawn plant "decorations" + ghost-card pattern (`border + soft box-shadow`); otherwise clean |
| **Total** | | **11/20** | **Acceptable — significant work needed** |

---

## Anti-Patterns Verdict — **PASS, with reservations**

Does this look AI-generated? Mostly **no**. The palette is restrained (navy + teal + white, no gradient text, no glassmorphism, no hero-metric template, no eyebrow-on-every-section). The CTA is the only icon-repeated-across-sections pattern but it earns its place.

**Tells present (3):**

1. **Ghost-card pattern.** Price cards: `border: 1px solid var(--line)` + `box-shadow: 0 22px 55px ...` together. Impeccable's codex rule: pick one or the other.
2. **Hand-drawn SVG plant illustrations.** Real botanical-feeling SVG with green leaves and a clay pot. Reads as AI decoration. The asset `assets/hero-websites.png` actually replaces the CSS-mockup laptop/phone in the live DOM (the CSS rules are dead code), so the plant is the only synthetic decoration. It's small. But it counts.
3. **Inconsistent radii.** The CTA card `var(--radius) = 18px` sits next to the FAQ card `18px` next to the price cards `18px` — fine. But `.btn` is `10px`, plant pot uses an organic radius, phone is `30px`, laptop screen is `18px 18px 10px 10px`. The system is *almost* tight but not declared.

---

## Executive Summary

- **Total issues found: 18** (3 P0, 5 P1, 7 P2, 3 P3)
- **Top 3 critical issues:**
  1. **Hero image: 1.5 MB PNG with no lazy/decode/dimensions** — biggest single perf win available.
  2. **Teal eyebrow text fails WCAG AA contrast (4.0 vs 4.5)** — legal exposure for a B2B site.
  3. **No skip link, no `:focus-visible` styles** — keyboard users get the worst experience.

---

## Detailed Findings

### [P0] Hero image is unoptimized, blocking
- **Location:** `index.html` line ~76, `<img class="hero-websites">` / `assets/hero-websites-generated.png`
- **Category:** Performance
- **Impact:** 1.5 MB PNG is the LCP element on every visit. On 4G it dominates LCP and Core Web Vitals. Drops into "Poor" LCP territory.
- **WCAG/Standard:** Core Web Vitals (LCP) — Google's "Good" threshold is <2.5s
- **Recommendation:** Convert to AVIF/WebP with `<picture>` + `srcset`. Add `width="581" height="387"`, `loading="eager"` (it's above the fold), `decoding="async"`, `fetchpriority="high"`. Or, since the CSS mockup still exists in `styles.css` and renders fine, **remove the `<img>` and use the CSS mockup** — it's actually more on-brand and free.
- **Suggested command:** `$impeccable optimize`

### [P0] Teal eyebrow text fails WCAG AA contrast
- **Location:** `styles.css` `.eyebrow { color: var(--teal) }` — affects 3 elements: "Snel online", "Meest gekozen", "CMS + maatwerk"
- **Category:** Accessibility
- **Impact:** 4.0:1 ratio at 16px / weight 850. AA needs 4.5:1. Visitors with low vision or in bright sunlight will struggle to read these.
- **WCAG/Standard:** WCAG 2.1 SC 1.4.3 (Contrast Minimum)
- **Recommendation:** Darken the eyebrow to `#056b5e` or use the navy `--navy` instead. Or bump font-weight + size to large-text rules (3:1) — already at 850 so closer than most.
- **Suggested command:** `$impeccable polish` (color tokens specifically)

### [P0] No skip-to-content link
- **Location:** `<body>` start, before `<header>`
- **Category:** Accessibility
- **Impact:** Keyboard users must tab through the entire header (logo, 5 nav links, WhatsApp CTA) on every page load. For a 1-page site this is small, but WCAG 2.4.1 ("Bypass Blocks") is a Level A requirement.
- **WCAG/Standard:** WCAG 2.1 SC 2.4.1
- **Recommendation:** Add `<a class="skip-link" href="#pakketten">Direct naar inhoud</a>` (or whatever Dutch equivalent) as the first focusable element, visually hidden until focused.
- **Suggested command:** `$impeccable harden`

### [P1] No `:focus-visible` styles
- **Location:** `styles.css` — `outline: none` not set, but also no custom focus styles
- **Category:** Accessibility
- **Impact:** Browser default focus rings (often hard to see on dark backgrounds) are the only keyboard affordance. Footer links on the navy background are particularly hard to see focused.
- **WCAG/Standard:** WCAG 2.1 SC 2.4.7 (Focus Visible)
- **Recommendation:** Add `:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; border-radius: inherit; }` to interactive elements.
- **Suggested command:** `$impeccable polish`

### [P1] Footer placeholder text shipped to production
- **Location:** `index.html` lines 263–264, `<span>KvK: invullen</span>`, `<span>BTW: invullen</span>`
- **Category:** Accessibility (legal)
- **Impact:** Looks unfinished to prospects. Dutch law requires KvK disclosure on commercial websites (Besluit elektronische handel). Shipping without one is non-compliant.
- **Recommendation:** Fill in the real numbers, or remove the spans entirely until ready.
- **Suggested command:** `$impeccable clarify`

### [P1] WhatsApp number is a placeholder
- **Location:** All three WhatsApp CTAs use `https://wa.me/31600000000`
- **Category:** Accessibility (functional)
- **Impact:** Visitors who tap the primary CTA on a Saturday morning get a WhatsApp error. The biggest conversion lever on the page is broken.
- **Recommendation:** Replace with the real number; the audit can't do this.
- **Suggested command:** manual fix (out of scope)

### [P1] Ghost-card anti-pattern on price cards
- **Location:** `.price-card { border: 1px solid var(--line); box-shadow: 0 22px 55px ... }` (`styles.css:236-239`)
- **Category:** Anti-Patterns
- **Impact:** Visually noisy. The card has both an edge (border) and a soft drop shadow fighting for the same visual job.
- **Recommendation:** Pick one. Impeccable's rule: solid border at brand color OR defined shadow ≤8px blur, not both. Suggest removing the border, keep the shadow, but lower blur to 12px.
- **Suggested command:** `$impeccable polish`

### [P1] Section anchors hidden under sticky header
- **Location:** Nav `href="#pakketten"` etc. vs. sticky header `height: 86px`
- **Category:** Accessibility (navigation)
- **Impact:** When users click a nav link, the section title is occluded by the header. On the FAQ card and "Werkwijze" section this hides the H2 entirely.
- **WCAG/Standard:** WCAG 2.4.10 (Section Headings)
- **Recommendation:** Add `scroll-margin-top: 100px` to `section[id]`.
- **Suggested command:** `$impeccable adapt`

### [P2] H1 letter-spacing -0.06em
- **Location:** `.hero-copy h1 { letter-spacing: -0.06em }` (`styles.css:99`)
- **Category:** Anti-Patterns
- **Impact:** The codex rule says ≥ -0.04em. -0.06em is exactly the "letters touch, reads cramped" failure mode the skill flags. Computed at 64px / 900 = -3.84px tracking.
- **Recommendation:** Soften to -0.04em max, or -0.03em.
- **Suggested command:** `$impeccable typeset`

### [P2] Hard-coded colors bypass the token system
- **Location:** `styles.css` lines 134, 148, 178, 194, 201, 390, 391
- **Category:** Theming
- **Impact:** `#080a0d` (laptop/phone bezel), `#cfd5dc`/`#8f99a5` (laptop base), `#d8cabe` (plant pot), `#4d8d38`/`#79bc5b` (plant leaves) — none in `:root`. If the brand teal changes, none of these update, but they're at least intentionally different materials (bezel, plant). Still, a `--bezel`, `--pot`, `--leaf` token would help.
- **Recommendation:** Add semantic tokens for any color that appears ≥2 times.
- **Suggested command:** `$impeccable document`

### [P2] Hero radial gradient is invisible
- **Location:** `.section-hero { background: radial-gradient(... rgba(7,143,127,.09) ...) }` (`styles.css:87`)
- **Category:** Theming
- **Impact:** 0.09 alpha on a near-white background is below human perception. The CSS rule exists but does nothing. Either commit to it (0.18+) or remove it.
- **Suggested command:** `$impeccable polish`

### [P2] H1 doesn't use `text-wrap: balance`
- **Location:** `h1` element (and most headings)
- **Category:** Accessibility (reading quality)
- **Impact:** Long hero titles render with awkward line breaks on some viewports.
- **Recommendation:** Add `text-wrap: balance` to h1–h3, `text-wrap: pretty` to p tags.
- **Suggested command:** `$impeccable typeset`

### [P2] No `prefers-reduced-motion` alternative
- **Location:** All transitions in `styles.css` (button hover, FAQ icon rotation, nav hover)
- **Category:** Accessibility
- **Impact:** Users with vestibular disorders can experience discomfort from the `transform: translateY(-2px)` button hover and the FAQ `transform: rotate(45deg)`. WCAG 2.3.3 (Animation from Interactions) is AAA but increasingly required.
- **WCAG/Standard:** WCAG 2.1 SC 2.3.3 (AAA), legal in some jurisdictions
- **Recommendation:** Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.
- **Suggested command:** `$impeccable harden`

### [P2] Inline `<svg>` symbols with stroke not all fill="none"
- **Location:** `index.html` line 11–31, `<svg class="svg-sprite">`
- **Category:** Anti-Patterns (consistency)
- **Impact:** Most symbols rely on the `.icon` class to set `fill: none; stroke: currentColor`. If a future developer uses a symbol outside that class, it'll default to a black-filled shape. Defensive: add `fill="none" stroke="currentColor"` directly to each `<symbol>`.
- **Suggested command:** `$impeccable harden`

### [P2] No `lang` attribute on footer link
- **Location:** `<a href="mailto:info@jdjwebdevelopment.nl">` — has no visible text language shift, OK
- **Category:** Accessibility (informational)
- **Impact:** Minor. The page is `lang="nl"`; mailto is a Dutch address. No change needed but flag if you ever go bilingual.
- **Suggested command:** none

### [P3] `loading="lazy"` not set on the hero image
- **Location:** same as P0 above
- **Category:** Performance
- **Impact:** Hero image should be `loading="eager"` + `fetchpriority="high"` (it's LCP). If you keep the CSS mockup, this becomes moot.
- **Suggested command:** `$impeccable optimize`

### [P3] Copyright year is 2024
- **Location:** `index.html` line 267
- **Category:** Polish
- **Impact:** It's June 2026. Looks stale.
- **Recommendation:** Use `<span id="year"></span>` + `document.getElementById('year').textContent = new Date().getFullYear()`. Or just hard-code 2026.
- **Suggested command:** manual fix

### [P3] No `aria-current` on nav
- **Location:** `nav.main-nav`
- **Category:** Accessibility
- **Impact:** On a 1-page site this is minor — `aria-current="location"` could be added to whichever section the user is in via IntersectionObserver. Skip for now; flag for future multi-page.
- **Suggested command:** `$impeccable harden`

---

## Patterns & Systemic Issues

1. **No `PRODUCT.md`, no `DESIGN.md`, no `live` config.** This is a project context gap that should be filled once, not per-command. Recommend running `$impeccable init` early — it's a blocker for `craft`, `polish`, and `shape` per the skill's routing rules.
2. **CSS has the "old" hero mockup as dead code** (`.laptop`, `.phone-mockup`, `.plant` rules are 90+ lines and unused since the `<img>` replaced them in the live DOM). Either remove the CSS or remove the image — don't ship both.
3. **Color tokens are used inconsistently** — `:root` defines `--navy`, `--teal`, etc., but `styles.css` itself uses raw hex in 7+ places for the SVG illustrations. If the design language is "teal + navy", the plant's organic greens and pot browns are exceptions that need a token or removal.

---

## Positive Findings

- **Strong semantic HTML** — single h1, hierarchical h2/h3, proper `<main>`, `<header>`, `<footer>`.
- **Excellent heading hierarchy** — exactly one h1, then h2 per section, h3 within. No skipping.
- **`<details>` for FAQ** — native, accessible, no JS required. Good call.
- **All interactive targets ≥48px** — 48–56px buttons across the board. Mobile-friendly.
- **Dutch language correctly set** — `lang="nl"` on the HTML element, not just meta.
- **No layout thrash, no expensive animations** — all transitions are 180ms ease-out on transform/opacity.
- **No external dependencies** — zero `<script>` tags, zero `<link>` to CDN, no Google Fonts (Inter falls back through system stack). Excellent footprint.
- **Emoji-free copy** — no "🚀" tells in the body text.
- **No gradient text, no glassmorphism, no hero-metric template** — passes the first three big slop checks.

---

## Recommended Actions

1. **[P0] `$impeccable optimize`** — strip the 1.5 MB hero PNG, use the CSS mockup or convert to AVIF/WebP with proper dimensions
2. **[P0] `$impeccable polish`** — fix eyebrow contrast (teal → darker teal or navy)
3. **[P0] `$impeccable harden`** — add skip link and `:focus-visible` styles
4. **[P1] `$impeccable polish`** — kill the ghost-card pattern on price cards
5. **[P1] `$impeccable adapt`** — `scroll-margin-top` on anchored sections
6. **[P2] `$impeccable typeset`** — H1 letter-spacing `-0.06em` → `-0.04em`, add `text-wrap: balance`
7. **[P2] `$impeccable harden`** — `prefers-reduced-motion` rule
8. **[P3] manual** — replace WhatsApp placeholder number, fill in KvK/BTW, fix copyright year
9. **Final pass: `$impeccable polish`** — after the above to verify score improvement

Re-run `$impeccable audit` after fixes to see your score improve.
