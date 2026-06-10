# AI Pattern Remediation

Status: fixed.

Scope: active Next.js website copy in `app/lib/content.ts`, `app/components/*`, and the root `index.html` fallback page. Excluded dependencies, build output, logs, and internal reports.

## Changed

- Replaced repeated reassurance copy with concrete deliverables: price, scope, start date, page count, and planning.
- Replaced generic conversion claims with named mechanics: WhatsApp CTA's, offerteblok, services, proof, and above-the-fold placement.
- Replaced repeated SEO phrasing with concrete SEO work: paginatitels, meta descriptions, headings, and local search terms.
- Rewrote passive construction in the build step into first-person active voice.
- Replaced vague `maatwerk` labels with named CMS examples: projects, price lists, team members, and extra sections.
- Reduced filler words such as `gewoon`, `precies`, `altijd`, and broad `snel` claims.
- Removed user-facing em dashes from the edited website copy.
- Renamed the `Groei` package to `Plus` to avoid generic growth-marketing phrasing.

## Verification

- Pattern scan on edited website files: 0 findings.
- `npm.cmd run build`: passed.

## Files Touched

- `app/lib/content.ts`
- `app/components/Benefits.tsx`
- `app/components/Contact.tsx`
- `app/components/Faq.tsx`
- `app/components/Process.tsx`
- `index.html`
