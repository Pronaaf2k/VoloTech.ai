# Redesign validation

Validated 2026-09-18 against the local production build.

- `npm run lint`: passed.
- `npm run build`: passed, all existing routes retained.
- `node tests/contact-route.cjs`: 3 tests passed, including unavailable delivery, forwarding, and upstream failure.
- Browser: Edge, 390 / 768 / 1440 CSS px, all six routes. Screenshots reviewed for wrapping, artwork, layout, and overflow.
- Axe: no WCAG A/AA violations across 18 route/viewport combinations; dark homepage check also passed.
- No browser page errors or horizontal overflow.
- Keyboard skip link, mobile menu, Escape/focus return, navigation, FAQ disclosure, and assistant dialog passed.
- Contact: required-field validation, query-selected interest, pending button state, mocked failure retaining values, and mocked success resetting values passed. No enquiries delivered externally.
- Extra checks: 320 / 1024 overflow across all routes, desktop pointer-triggered artwork, live reduced-motion change.
- Lighthouse mobile simulation: performance 97, accessibility 100, best practices 100, SEO 100. LCP 2.6 s, total blocking time 10 ms, CLS 0. Local measurements are not field data.

The Satoshi variable supports weights 300–900. IBM Plex Mono uses the installed 400 weight. Orange actions use dark text; small orange labels use the darker accent. Automated contrast checks passed in the reviewed states.

## Content and launch gaps

- Project scopes are illustrative. No verified client case studies, testimonials, or measured results were available in the repository.
- Set `CONTACT_API_URL` and verify actual delivery before launch. The existing API returns an honest unavailable state when unconfigured.
- The existing assistant remains explicitly marked as coming soon; no AI reply service is connected.

Full automated findings are in `redesign-audit.json`. Local screenshots are ignored by Git. Existing user edits were retained; no deployment or commit was performed.

Follow-up: homepage condensed to hero, original draggable logo carousel, four route summaries, and a compact contact invitation. Detailed capabilities live on Services; examples on Work; delivery steps on How We Work. Header navigation is left-aligned beside the brand. Theme selection supports Light, Dark, and System default with persistence and mobile access. Build/lint and browser checks passed for persistence, system changes, mobile controls, carousel drag/keyboard, hidden scrollbar, and 390/768/1440 layouts.
