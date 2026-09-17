# VoloTech.ai website

Next.js website for business technology services. The homepage uses server-rendered HTML and CSS, with client components for navigation, the enquiry form, and the retained ribbon sculpture. The original orange Three.js ribbon sculpture is preserved as a brand element, with the supplied image as an immediate fallback. Do not remove or replace this artwork. Never use ImageGen for this project.

## Development

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `node --test --test-isolation=none tests/contact-route.cjs`

## Contact delivery

Set `CONTACT_API_URL` to an endpoint you operate that accepts the JSON submission and delivers it to the team. Configure `NEXT_PUBLIC_SITE_URL` with the canonical production URL. See `.env.example`.

The server validates enquiries and forwards name, email, company, interest, message, and source. It reports success only when the receiving endpoint accepts the request. An unset endpoint returns 503, and the form preserves the visitor's input. Complete a real delivery test before launch. Apply spam protection and rate limiting at the delivery endpoint or hosting layer.

## Content decisions before launch

- Confirm the service descriptions, project process, and ownership/support expectations.
- Configure and test contact delivery. A verified public email or phone can be added as a fallback once supplied.
- Confirm target geography. The new copy addresses businesses generally rather than limiting the offer to the previous Bangladesh industry examples.
- Add approved case studies, team details, and testimonials when available. Current project scopes are explicitly illustrative.
- Confirm privacy/retention terms for enquiry data with the business and its receiving service.
- Consultations currently request an email follow-up. Add a scheduling link only when a real booking service is available.

## Browser checks

`tests/browser-checks.html` runs responsive overflow checks, axe WCAG checks in light and dark themes, anchor checks, and mocked contact-form tests. To run locally, copy it to `public/__qa.html` and copy `node_modules/axe-core/axe.min.js` to `public/__qa-axe.js`, start the development server, then open `/__qa.html` and click Run checks. Delete both public QA files after testing and before building or publishing. The test mocks form responses and does not send enquiries externally.

Tested at 320, 390, 768, 1024, and 1440 CSS pixels. Axe checks cover 390 and 1440 pixels in both themes. Manual checks include mobile navigation, Escape dismissal, support selection, FAQ disclosure, and visual inspection. Automated accessibility checks do not replace assistive-technology user testing.

The interactive ribbon loads on desktop. Mobile and reduced-motion visitors see the supplied ribbon image without the WebGL runtime. The original Three.js code is retained. Its current dependency emits a non-fatal THREE.Clock deprecation warning in desktop browsers.
