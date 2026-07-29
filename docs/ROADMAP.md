# Roadmap — GrowwStacks Landing Pages

_Last updated: 2026-06-22_

Current state of the site and the prioritized list of what's next. Update this every
session: move finished items into [`DEVELOPMENT_LOG.md`](DEVELOPMENT_LOG.md) and
re-rank what remains.

---

## Current state (snapshot)

- **Homepage hero** — ✅ on the refined Claude design (`.gs-hero-ds`, scoped). Live.
- **Credentials strip** (`partners.html`) — ✅ on the refined design (`.gs-creds-ds`). Live.
- **CTA copy** — ✅ "Book a Free Automation Audit" across the hero consult fold and
  the global nav button. Live.
- **Everything else** (what-we-do, process, stats, cases, industries, testimonials,
  footer, all blog/landing pages) — still on the **original** design system in
  `global.css`. Unchanged.
- **Lead form / Make.com webhook** — untouched and working (WebMCP attrs added are
  additive only; no field names changed).
- **Floating widgets** (projects ticker + chat) — ✅ now load on page-load, not on
  scroll-to-footer. Unpushed.
- **Agentic browsing / WebMCP** — `llms.txt` added (→ Lighthouse 3/3); declarative +
  imperative WebMCP tools added (`_shared/webmcp.js`). ⏸️ Origin-trial token pending.

The site is in a **mixed-design state**: homepage first fold + credentials use the
refined system; the rest uses the original. This is intentional and stable.

---

## Next actions (prioritized)

### P0 — In flight (this session, unpushed)
- [ ] **Tuition Management Portal case study — blur the screenshots before publish.**
      `02_Schedule_Management_Calendar.png` shows an unblurred tutor name in "Available
      Slots", and `01`, `03`, `04` show unblurred revenue / tutor-pay / parent-bill
      figures. Page prose, alt text, captions, and schema are already clean; only the
      images carry identifying data. (Sidebar duration resolved to 7 weeks — no TODO
      markers remain on the page.)
- [ ] **Register the WebMCP origin trial** for `growwstacks.com` (Chrome Origin
      Trials console) and paste the token into `_headers` (uncomment the two
      placeholder lines). Without it, the WebMCP tools stay inactive in production.
- [ ] **After deploy, re-run Lighthouse** agentic category: confirm llms.txt passes
      (3/3) and, once the token is live, that WebMCP tools are captured.
- [ ] **Smoke-test widget timing**: on a hard reload, the projects ticker + chat
      widget should appear within ~2s of load *without scrolling*.

### P1 — Likely next
- [ ] **Finance / Healthcare / Operations "problem strip"** (design section 2).
      Not built yet. Agreed placement: **a new inline section in `index.html`
      directly below the hero** (second fold). Build with the scoped-CSS pattern
      (`.gs-problem-ds` or similar). Copy from the design: loan re-keying / missed
      clinic calls / off-the-shelf AI that doesn't fit ops.

### P2 — Small polish
- [ ] **Form submit button copy** → optionally "Book a Free Automation Audit →" to
      match the new CTA wording (currently "Get My Free Automation Audit →").
      Text-only change; no webhook impact. Confirm with Manish first (it's on the
      "form side" he asked to leave alone).
- [ ] **Commit the Claude design bundle** under `docs/design-system/` (or a
      reference link) so future sessions have the source of truth for the refined
      system without re-fetching the export.

### P3 — Bigger decisions (need Manish's call before starting)
- [ ] **Full design migration.** Decide whether to roll the refined Claude design
      across the whole site (what-we-do, process, cases, industries, testimonials,
      footer, blog/landing templates). This is a large, site-wide effort and would
      likely mean evolving `global.css` itself — big blast radius (~13k pages).
      Until decided, keep using **per-section scoped blocks**.
- [ ] **Nav button length.** "Book a Free Automation Audit →" is longer than the old
      label; it fits on desktop and is hidden < 1024px, but watch for awkwardness on
      mid-width desktops. Revisit if it looks tight.

---

## Open decisions / questions

- **Public exposure of `docs/` and `CLAUDE.md`.** Because Cloudflare Pages serves the
  repo as-is with no build step, these files are reachable at
  `growwstacks.com/CLAUDE.md`, `/docs/…`. They contain internal notes (not secrets —
  the webhook URL is already public in `site-config.js`). Options: (a) keep local /
  don't push, (b) push but block via `robots.txt` + a `_redirects` 404 rule, or
  (c) push as-is. **Pending Manish's preference** — see DEVELOPMENT_LOG entry.
- **Design source of truth.** The refined design currently lives only in the external
  Claude Design export. Committing a copy (P2) removes that dependency.

---

## Known issues (low priority)

- Pre-existing **unmatched `</div>`** near the `#consultation` wrapper in
  `index.html`. Browsers tolerate it; fix only if doing a broader cleanup of that file.
- `global.css` still carries styles for components that may have been superseded by
  scoped blocks (e.g. legacy `.partners`/`.partner-badge`). Dead but harmless; prune
  only as part of a deliberate cleanup pass.
- **Broken-but-tolerated case-study includes.** `_shared/case-studies.css` is referenced
  by 311 case-study pages but **does not exist in the repo**; all `cs-*` styles actually
  live in `global.css`. Likewise `../case-studies.js` resolves one level above the file's
  real location (`case-studies/case-studies.js`), and the FAQ/video handlers it provides
  are also bound by `page-builder.js`. Both requests return 200 in production, so nothing
  is visibly broken — new pages replicate the includes for consistency. Worth one
  deliberate pass to either add the file or strip the references site-wide.

---

## Done (recent — see DEVELOPMENT_LOG for detail)

- 2026-06-22 — Widget load-on-page-load fix, `llms.txt`, WebMCP declarative +
  imperative tools, origin-trial scaffold (unpushed — pending review + token).
- 2026-06-08 — Hero redesign, credentials strip, CTA copy alignment (`3d0af1c8`, live).
- 2026-06-08 — Project documentation set established.
