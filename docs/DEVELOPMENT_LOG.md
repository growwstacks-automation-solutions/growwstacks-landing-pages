# Development Log — GrowwStacks Landing Pages

Append-only, **reverse-chronological** record of changes and decisions. This is the
project's memory: each entry should let a future session reconstruct *what* changed,
*why*, *which files*, and *what was deliberately left alone*.

**How to add an entry (newest on top):**

```
## YYYY-MM-DD — <short title>
**Commit(s):** <hash> · **Scope:** <files/areas>
**What:** <what changed, in plain terms>
**Why:** <the reason / the user's intent>
**Decisions:** <key choices and trade-offs made>
**Left untouched (on purpose):** <things deliberately not changed>
**Follow-ups:** <anything deferred → mirror into ROADMAP.md>
```

---

## 2026-07-29 — New case study: Tuition Management Portal
**Commit(s):** _unpushed — pending review_ · **Scope:**
`case-studies/tutoring-business-admin-platform.html` (new), `_shared/site-config.js`,
`case-studies/case-studies-cart.js`, `sitemap/sitemap-case-studies.xml`
**What:** Added a flat-file case study for a custom full-stack tuition management portal
built for an anonymised UK tuition centre (React + Node/Express + PostgreSQL on Neon,
n8n self-hosted on a VPS, QuickBooks Online invoicing, Microsoft 365 email). Mirrors
`shared-whatsapp-team-inbox.html` structurally: `cs-hero`, `cs-results`,
`cs-content`/`cs-sidebar`, five `cs-img-block` figures, `cs-highlight`, `cs-visual-flow`
(5 steps + 2 outcome chips), 6-item `faq`, `cs-bottom-cta`, plus all three JSON-LD blocks
(Article, BreadcrumbList, FAQPage) with the FAQ schema matching the rendered accordion
word for word. Registered the hub card as entry 54 in `case-studies-cart.js` and added
both this page and the previously-missed `shared-whatsapp-team-inbox` to the sitemap.

**Why:** Publish the tuition-portal build as a case study, targeting "tuition management
portal" as primary keyword.

**Decisions:**
- **Logo keys — audited rather than trusted.** The brief listed `react`, `express`,
  `postgresql`, `neon`, `microsoft365` as missing; in fact only `neon` was. `react`
  (added by the shared-whatsapp build) and `postgresql` already existed, and Express is
  keyed **`expressjs`**, not `express`. Only `neon` and a `microsoft365` alias (→ same
  source as the existing `microsoft`) were added — no duplicate keys, and **no blank
  pills**: all 8 hero/sidebar pills resolve to a real logo URL.
- `csh-banner-purple` for the hub card instead of the brief's suggested
  `csh-banner-indigo`, which is already used 33× in the file.
- Category tokens `operations finance` — both valid filter tokens.
- Prose trimmed to 1,789 words to hit the 1,400–1,800 target; primary keyword seeded in
  H1, title, meta description, an H2, the first 100 words, and 3 image alts.
- Sidebar **Duration = 7 weeks** (supplied by the user; the page briefly carried a
  `TODO_DURATION` placeholder, now resolved — no TODO markers remain on this page).
- **Sidebar kept on the shared styling, not overridden.** The page initially copied the
  `.cs-sidebar-row/label/value` override block from `shared-whatsapp-team-inbox.html`
  (`align-items:flex-start`, `max-width:42%`), which exists only because that page's
  values wrap. Root cause was sentence-length values ("Live revenue and expenditure from
  QuickBooks"). Fixed at the source: values shortened to a word or figure so `global.css`
  renders single-line rows with hairline dividers and centred label/value, matching the
  rest of the site. Override block deleted; ROI now uses the existing
  `.cs-sidebar-value.accent` class instead of an inline `style`. Key Metrics reworded to
  scannable pairs (`Manual processes −100%`, `Roles supported 4`).

**Left untouched (on purpose):** The form/webhook, shared components, and `global.css`.
The `../_shared/case-studies.css` and `../case-studies.js` includes were replicated
verbatim from the reference page even though neither resolves on disk from
`case-studies/` (see Follow-ups) — deviating would have made this page inconsistent with
the other 55.

**Follow-ups (mirrored to ROADMAP):**
- **Screenshots need blurring before publish** — `02_Schedule_Management_Calendar.png`
  shows an unblurred tutor name in "Available Slots"; `01`, `03`, and `04` show
  unblurred revenue/pay/bill figures. Prose, alts, captions, and schema are already
  clean; the images are not.
- Site-wide: `_shared/case-studies.css` does not exist in the repo yet is referenced by
  311 case-study pages, and `../case-studies.js` resolves one level above the file's
  actual location. Both currently return 200 in production, so this is latent, not
  broken — worth a dedicated cleanup pass.

---

## 2026-07-24 — New case study: Multi-Channel Agent Performance Analytics
**Commit(s):** _unpushed — pending review_ · **Scope:**
`case-studies/multi-channel-agent-performance-analytics/index.html` (new),
`_shared/site-config.js`, `case-studies/case-studies-cart.js`,
`sitemap/sitemap-case-studies.xml`
**What:** Added a folder-based case study (JustCall + Gorgias → BigQuery pipeline with
cross-platform identity resolution → Looker Studio dashboards) for an anonymized fitness
equipment retailer. Structurally identical to existing detail pages (`cs-hero`,
`cs-results`, `cs-content`/`cs-sidebar`, `cs-img-block`, `cs-visual-flow`, `cs-highlight`,
`faq`, `cs-bottom-cta`), with inline FAQPage + BreadcrumbList JSON-LD in `<head>`. Added
four tool-logo keys (`justcall`, `gorgias`, `bigQuery`, `lookerStudio`) to `SITE.logos`;
`n8n` and `slack` already existed. Registered the hub card in `case-studies-cart.js` and
the URL in the case-studies sitemap.
**Why:** Requested new portfolio case study; anonymization required (client never named).
**Decisions:** Folder page → `index.html` at URL depth 2, so shared paths use `../../_shared/`,
`../../assets/js/`, `../case-studies.js` (matches `case-studies/apps/*`). Tool pills/sidebar
use the `data-logo` + local inject script pattern (the meta-driven `#cs-hero-tools`
injection needs `SITE.tools`, which does not exist). Logos go through `SITE.logos`, not
hardcoded. Duration left as literal `TODO_DURATION` for a human to fill in.
**Left untouched (on purpose):** Existing `n8n`/`slack` logo entries (already present);
the (non-existent) `_shared/case-studies.css` link is kept for consistency with siblings
(all `cs-*` classes live in `global.css`); form/webhook.
**Follow-ups:** Fill `TODO_DURATION` in the new page's sidebar before/after publish.

---

## 2026-06-22 — Widget load timing fix + llms.txt + WebMCP (agentic browsing)
**Commit(s):** _unpushed — pending review_ · **Scope:** `_shared/page-builder.js`,
`_shared/webmcp.js` (new), `_shared/components/consult-section.html`, `llms.txt` (new),
`_headers`, `docs/`

**What:**
- **Floating widgets load on page-load, not on scroll** (`page-builder.js`): the
  footer is a lazy component and hosts the two always-on widgets — the live
  projects ticker (`#gs-spw`) and the GHL chat widget — so both only appeared once
  the user scrolled to the bottom. Added a `window.load` + `requestIdleCallback`
  trigger that injects the footer as soon as the page finishes loading. The
  IntersectionObserver stays as a fallback; `loadComponent()` is idempotent so
  whichever fires first wins.
- **`llms.txt`** (new, repo root): machine-readable site summary with an H1 and
  link sections (services, resources, company, legal). Fixes the Lighthouse
  "Agentic browsing → llms.txt" failure (was 2/3; this is the missing check → 3/3).
  Previously `/llms.txt` 404'd to Cloudflare's HTML error page, which the audit
  parsed as malformed markdown.
- **WebMCP — full adoption** (agentic browsing):
  - *Declarative* (`consult-section.html`): added `toolname`/`tooldescription` to
    `#consultForm` and `toolparamdescription` to the user-facing inputs. **Additive
    attributes only — no field `name` changed**, so the Make.com webhook is intact.
  - *Imperative* (`webmcp.js`, new; loaded eagerly by page-builder on every page):
    registers `get_company_overview`, `list_services` (read-only), and
    `submit_consultation_request` (autonomous) via `modelContext.registerTool`.
    Feature-detected across `document.modelContext`/`navigator.modelContext` and
    fully try/catch-wrapped → inert no-op without the API or origin trial.
  - *Origin trial* (`_headers`): commented placeholder for the Chrome WebMCP
    origin-trial token (site-wide `Origin-Trial` header). **Inactive until Manish
    registers growwstacks.com and pastes the token.**

**Why:** (1) The widgets were meant to be visible from page load, not gated on
reaching the footer. (2) Lighthouse PageSpeed "Agentic browsing" was 2/3 (llms.txt
failing) and Manish wants the site properly readable/actionable by AI agents.

**Decisions:**
- Footer trigger uses `window.load` (matches "when the site finishes loading")
  deferred to idle, **not** `eager: true` — making the footer eager would pull the
  third-party chat script into initial render and hurt the very PageSpeed metrics
  we're improving.
- WebMCP registered **imperatively + eagerly** (not relying on the lazily-injected
  declarative form), because Lighthouse's agentic snapshot can miss tools that only
  appear after scroll. Declarative attrs kept too, for the informational
  "forms missing declarative WebMCP" audit and DOM-interacting agents.
- **Autonomous submit (Manish's call):** `submit_consultation_request` POSTs the
  webhook directly, bypassing Turnstile. Risk acknowledged but **incremental** — the
  webhook URL is already public in `site-config.js`, so the captcha never protected
  the webhook itself, only the visible form. Mitigation: agent leads tagged
  `source: "webmcp_agent"` for filtering/rate-limiting in Make.

**Left untouched (on purpose):**
- The form's field `name`s, hidden inputs, Turnstile flow, and the human submit
  handler — all unchanged. WebMCP additions are attributes + a separate JS path.
- The GHL chat widget internals (third-party; can't be instrumented).

**Follow-ups (mirrored to ROADMAP):**
- Manish to register the WebMCP origin trial and paste the token into `_headers`.
- After deploy: re-run Lighthouse agentic category to confirm 3/3 and that WebMCP
  tools are captured; verify widgets appear on load without scrolling.
- Consider rate-limiting / honeypot on the Make scenario for `source:"webmcp_agent"`.

---

## 2026-06-08 — Homepage hero redesign, credentials strip, CTA copy alignment
**Commit:** `3d0af1c8` (pushed to `main` / live) · **Scope:** `index.html`,
`_shared/components/partners.html`, `_shared/components/navbar.html`,
`_shared/components/consult-section.html`

**What:**
- **Hero** (`index.html`): replaced the AI-orb hero with the Claude design's hero —
  Anthropic Services Partner lockup (Claude logo) → headline "Enterprise AI,
  *actually shipped.*" → verticals lead → "Book an Architecture Call →" CTA +
  "See client results" link → 3 proof chips → a dark **"Live architecture" panel**
  (Patient call → Voice agent → Claude decides → Appointment booked, cycling every
  1.5s). Added **JetBrains Mono** to the font load. Pruned the now-dead legacy
  hero + AI-orb critical CSS.
- **Credentials strip** (`partners.html`): replaced the 8 platform badges with the
  design's "Certified & partnered with" + 5 badges (Anthropic, Make.com, Upwork,
  n8n, Microsoft).
- **CTA copy**: consult-section heading "Get Your Free Automation Audit" → "Book a
  Free Automation Audit"; global nav button "Free Consultation" → "Book a Free
  Automation Audit" (changed in both the HTML default and the JS default branch).

**Why:** Bring the homepage's first fold and partner section in line with the
approved Claude Design export, and harmonize the call-to-action wording the user
saw across the hero, nav, and consult fold.

**Decisions:**
- **Scoped-CSS port, not a global migration.** `global.css` has none of the refined
  design's classes and the brief was "styling comes from the shared CSS, don't add
  CSS." Resolved by porting the hero and credentials strip as **self-contained
  scoped blocks** (`.gs-hero-ds`, `.gs-creds-ds`) with locally-redefined tokens and
  inlined Lucide SVGs → zero blast radius. (This is now the standard pattern — see
  ARCHITECTURE §6.)
- Edited the **inline** homepage hero in `index.html` (page-builder skips it because
  it's pre-filled); `_shared/components/hero.html` was left as the fallback.
- Claude logo + credential icons use the Google favicon service (the design's exact
  source), keeping marks small and uniform.
- Nav + consult are **shared components**, so the CTA copy change is **site-wide**
  (~13k pages nav, ~12.7k pages consult). Accepted as intended.

**Left untouched (on purpose):**
- The lead **form** entirely: structure, field names, hidden inputs, Turnstile,
  submit button ("Get My Free Automation Audit →"), form-card heading ("Book Your
  Free Audit"), and the Make.com webhook.
- `_shared/global.css` and all other sections (what-we-do, process, cases,
  industries, testimonials, footer) — still on the original design system.
- A pre-existing unmatched `</div>` near the `#consultation` wrapper in `index.html`
  (browsers tolerate it; out of scope).

**Follow-ups (mirrored to ROADMAP):**
- Finance / Healthcare / Operations "problem strip" (design section 2) — not built;
  agreed placement is "new section after the hero."
- Optional: change the form submit button text to "Book a Free Automation Audit" for
  exact consistency (text-only, no webhook impact).
- Decide whether to migrate the rest of the page (and `global.css`) to the refined
  Claude design, or keep the scoped-section approach.

---

## 2026-06-08 — Project documentation established
**Scope:** `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT_LOG.md`,
`docs/ROADMAP.md`, `robots.txt`, `_redirects`

**What:** Created the cross-session documentation set — a root `CLAUDE.md` hub
(auto-loaded by Claude Code) plus `docs/` for architecture, this log, and the roadmap.

**Why:** Give future Claude Code sessions durable context so the whole system is
understood quickly and progress stays tracked.

**Decisions:** Hub-and-spokes layout; `CLAUDE.md` is high-signal and links to the
detailed docs. Logging convention defined at the top of this file. Committed to git
for durability, but **guarded from public exposure**: `robots.txt` disallows
`/docs/` + `/CLAUDE.md`, and `_redirects` bounces those paths to `/` (Cloudflare
follows redirects even when the file exists), so the docs are never served or indexed
publicly while remaining readable locally by Claude Code.
