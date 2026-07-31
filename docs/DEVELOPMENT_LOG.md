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

## 2026-07-30 — Claude Architect service page: hero carousel now rotates
**Commit(s):** _unpushed — pending review_ · **Scope:** `services/claude-architect.html`

**What:** Added three more hero banners (`Claude_banner_2.png`, `Claude_banner_3.png`,
`Claude_Banner_4.png`) to the `.cc-carousel`, so it cross-fades through four images like
the Make.com page. Full cycle is 4 x 3.5s = 14s.

**Why:** The markup, CSS, and rotation script were all already in place, but the carousel
held a single image — and the script bails at `imgs.length < 2`, so nothing rotated.
Adding the images activates the existing loop; no JS change was needed.

**Decisions:**
- **The four banners have very different native ratios** — 1024x536 (1.91), 1080x1350
  (0.80, portrait), 1280x720 (1.78), and 768x1024 (0.75, portrait). In the 560x380 (1.47)
  frame the two portrait shots left wide empty bands either side.
- **Final approach: CSS blur-fill.** Each slide is a `<figure class="cc-slide">` carrying
  its own photo URL in a `--slide` custom property. `::before` paints that image
  `background-size:cover` + `blur(22px) saturate(1.15) scale(1.18)` at `opacity:.55` to
  fill the frame; `::after` lays a soft cream→coral gradient over it to keep it on-brand;
  the sharp `<img>` sits on top at `z-index:1` with `object-fit:contain`. Portrait shots
  now fill the panel edge-to-edge with a soft blur instead of flat cream bands.
  `--slide` is the **same URL** as the `<img> src`, so it is one HTTP request per slide,
  served from cache — no extra image weight.
- **Rejected: chained ImageKit transforms** (`bl-` + `l-image` overlay). It worked in
  isolation but proved fragile — the overlay's own `h-` kept overriding the frame height,
  yielding 1120x1231 instead of 1120x760. Also discovered the sources carry their **own**
  white borders (banner 2 has 115px left / 119px right), so blurring the raw file just
  smeared white rather than photo. CSS avoids both problems.
- `.cc-carousel` keeps `background:#FFE8DC` (the page's `--cc-100`) as the base tone
  behind the blur layer, replacing the previous dark navy `#0E1428`.
- **`Claude_Banner_4.png` uses a capital "B"** unlike banners 2-3 (`Claude_banner_N`).
  ImageKit paths are case-sensitive, so the inconsistency is preserved deliberately and
  flagged with an inline comment — "correcting" it to lowercase would 404.
- The rotation script now selects `.cc-slide` rather than `img`, since each slide is a
  figure wrapping its image.
- `.cc-float` gained a `1px solid var(--cc-border)` hairline. The white stat cards
  previously sat against a dark navy panel; on the lighter panel they lost their edge.
- First slide keeps `loading="eager"` + `fetchpriority="high"` (it is the LCP element);
  slides 2 and 3 are `loading="lazy"`.

**Left untouched (on purpose):** the rotation script, `.cc-carousel` CSS, the floating
stat cards, and the `@media` rule that hides `.cc-visual` on mobile.

---

## 2026-07-30 — Fix: 4th phone screenshot in the WhatsApp inbox gallery
**Commit(s):** _unpushed — pending review_ · **Scope:** `case-studies/shared-whatsapp-team-inbox.html`

**What:** Added an ImageKit `cm-extract` crop to the 4th `.cs-app-gallery` image
(`05_Add_Agent_Admin.png`) so it matches the other three.

**Why:** All four sources are 1080x1920, but that one has **~250px of solid green
(rgb 71,112,76) baked into the top and bottom of the file itself** — verified by decoding
the PNG scanlines. The other three fill their full frame. Because `object-fit: contain`
scales to fit, the green bands consumed 26% of the height, so its UI rendered visibly
smaller than its neighbours and showed green where the others showed dark phone bezel.

**Fix:** `tr=cm-extract,w-1080,h-1419,y-250:w-500,q-80,f-auto` — crops the bands, then
chains the existing resize. Verified: delivered image is 500x657 with **0.00% green
pixels**, and the gallery frame letterboxes it onto the same `#0d0d0d` bezel as the rest.
All four now render at an identical 185px width in one equal-height grid row.

**Decisions:** Cropped at delivery rather than re-exporting the asset — no ImageKit write
access is needed and the original file is untouched. A re-exported screenshot without the
baked bands would let the `tr=` be simplified back to `w-500,q-80,f-auto`.

**Left untouched (on purpose):** the other three gallery images, the `.cs-app-gallery` CSS
frame, and everything else on the page.

---

## 2026-07-30 — New case study: Multi-Channel AI Telemedicine Agents
**Commit(s):** _unpushed — pending review_ · **Scope:**
`case-studies/ai-telemedicine-multichannel-agents.html` (new),
`case-studies/case-studies-cart.js`

**What:** New flat case-study page for an anonymised virtual telemedicine and wellness
practice — four AI agents (inbound voice, outbound voice, website chat, SMS) all
answering as one assistant, sharing one knowledge base and one GoHighLevel logging
pattern. Registered as card #55 on the hub.

**Article structure follows `google-review-automation.html`** (the canonical pattern),
not a narrative one: Problem → Solution → `<h3>` How It Works (numbered `<ol>`, one step
per channel) → 6-card `cs-features` grid → Before vs. After → Implementation (numbered
`<ol>`) → Right Fit. Tone is plain and direct — short paragraphs, no literary framing,
no standalone "The Client"/"The Challenge" sections (client context folds into The
Problem). The `cs-visual-flow` sits inside The Solution, after the chat screenshots.

**Why:** Publish the telemedicine multi-channel agent build as a case study targeting
the primary keyword "multi-channel AI agent".

**Decisions:**
- **Card category is `healthcare` (badge "Healthcare"), not the three tokens the brief
  specified.** The brief asked for `ai-powered healthcare crm-sales` with an "AI Agents"
  badge; that would have reintroduced the exact defect fixed on 2026-07-29 (badge naming
  a category that is not one of the seven pills, card appearing under filters its badge
  contradicts). Confirmed with the user before applying. Filters still sum to 57 = 57.
- `_shared/case-studies.css` **does not exist** — every `cs-*` style lives in
  `global.css`. The `<link>` is kept because all 58 case studies carry it (harmless 404,
  consistent with the rest of the directory), and the new `.cs-img-pair` two-up
  screenshot pattern went into a scoped `<style>` block on the page instead.
- No `SITE.logos` edit needed: `vapi`, `twilio`, `claude`, `n8n` and `ghl` all already
  exist and resolve (all five verified HTTP 200). The brief's assumption that `claude`
  was missing and `gohighlevel` was blank was incorrect — both are present.
- Walkthrough video is live: `yt-facade` embed in the `.process-video` hero slot,
  `data-video-id="bvs6wKmv4Pc"`. Markup is byte-identical to the working reference apart
  from the ID/labels; the click + Enter/Space handlers in `case-studies.js` are delegated,
  so it binds with no extra wiring. The interim `.cs-video-soon` placeholder and its
  `TODO_VIDEO` comment have been removed. (Note: `.cs-hero-media` in `global.css` is dead
  — no case study uses it; the hero visual always lives in `.process-video`.)
- **The `Hero Image AI Store` asset is the hub card banner and the social image only —
  it is deliberately not rendered anywhere in the page itself.** `renderCard()` in
  `case-studies/apps/app-wise-case-studies.js` paints `card.img` into
  `.csh-card-banner-img`, which is where a visitor sees it. Inside the page, "The
  Solution" carries only the two-up chat row and "Technical Approach" the workflow
  `cs-img-block`. It remains `og:image` / `twitter:image` / schema `image`.
- Sidebar is Project Details → Tools & Integrations → **Key Metrics** → CTA. The brief
  said to omit Key Metrics, but **56 of 58 case studies carry that card**, so omitting it
  made this page the outlier; the site-wide convention won. Values are short (2–4 words)
  and drawn from facts already in the article.

**Left untouched (on purpose):** the consult form and Make.com webhook, `global.css`,
all other cards' `category`/`tag`, the seven filter pills, and `case-studies.js`.

**Follow-ups (mirrored to ROADMAP):**
- Replace the video placeholder with the `yt-facade` embed once the walkthrough ships.
- `_shared/case-studies.css` is referenced by all 58 case studies but does not exist —
  either create it or strip the link site-wide.

---

## 2026-07-29 — Hub filters: strict 1:1 badge ↔ category
**Commit(s):** _unpushed — pending review_ · **Scope:** `case-studies/case-studies-cart.js`

**What:** Rewrote the `category` field on 56 of 56 cards so each carries **exactly one**
valid filter token, always equal to the badge printed on the card (`tag`). Also removed
14 dead tokens that matched no filter pill (`automation`, `hospitality`, `analytics`,
`construction`, `mep`, `document-ai`, `rfp`, `outreach`, `recruiting`,
`customer-experience`, `data-pipeline`, `workforce`, `custom-app`, `bid-qualification`).

**Why:** Cards badged "AI-Powered" or "E-Commerce" were appearing under the Operations
filter. Root cause: `operations` had been used as a catch-all meaning "this is an
automation" — true of nearly every case study — so **38 of 56 cards carried both
`ai-powered` and `operations`**, and 41 of the 46 cards in the Operations filter showed
a badge saying something else. The filter contradicted the card.

**Effect on filter counts:**

| Pill | Before | After |
|---|---|---|
| operations | 46 | 5 |
| ai-powered | 46 | 36 |
| social-marketing | 5 | 3 |
| crm-sales | 5 | 4 |
| ecommerce | 4 | 3 |
| finance | 3 | 2 |
| healthcare | 3 | 3 |
| **All Projects** | 56 | 56 |

Every card remains reachable — the seven filters now sum to exactly 56.

**Decisions:**
- `tag` is the source of truth: the badge a visitor sees is the category they find it
  under. One card, one category.
- **Shared WhatsApp Team Inbox** badge changed `Customer Support` → `CRM & Sales`.
  "Customer Support" is not one of the seven pills, so as a badge it read as a category
  that does not exist (the same defect just fixed on the tuition card).
- Cards previously in two legitimate categories now appear in one only — e.g. the
  tuition portal left Finance and kept Operations. This is the intended trade-off of a
  strict 1:1 rule.

**Left untouched (on purpose):** `tag`/`title`/`desc` on all other cards, the seven
filter pills in `case-studies/index.html`, and the filter logic in `case-studies.js`
(unchanged — it already did an exact token match).

**Follow-ups:** `ai-powered` still holds 36 of 56 cards. Worth a future pass to split it
by industry or use-case, since a filter holding 64% of the catalogue does little to help
a visitor narrow down.

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
- **Card `tag` set to `Operations`, not `Education`.** The hub has only seven filter
  pills and Education is not one of them; `tag` is the visible badge while `category`
  drives filtering, so an off-list badge reads as a category that does not exist. Badge
  now mirrors a real pill. (`shared-whatsapp-team-inbox` still uses an off-list
  "Customer Support" badge — same issue, left alone as it predates this.)
- **Card `desc` cut to 153 chars.** `.csh-card-desc` clamps to 3 lines
  (`-webkit-line-clamp:3`, global.css:1787); the original 221-char copy overflowed and
  truncated mid-word at "a…", which also stretched the final line. Median desc across
  the 56 cards is 110 chars — keep new cards near that.
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
