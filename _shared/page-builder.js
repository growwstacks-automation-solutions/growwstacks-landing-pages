// ============================================
// GROWWSTACKS PAGE BUILDER
// Loads shared components + injects config values
// Include AFTER site-config.js on every page
// ============================================

(function () {
  'use strict';

  // --- Determine relative path to _shared/ ---
  const pathSegments = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const depth = pathSegments.length;
  const prefix = depth === 0 ? './_shared/' : '../'.repeat(depth) + '_shared/';

  // --- Components to inject ---
  const COMPONENTS = [
    { id: 'gs-navbar',          file: 'components/navbar.html' },
    { id: 'gs-footer',          file: 'components/footer.html' },
    { id: 'gs-ticker',          file: 'components/ticker.html' },
    { id: 'gs-partners',        file: 'components/partners.html' },
    { id: 'gs-stats',           file: 'components/stats-bar.html' },
    { id: 'gs-mid-cta',         file: 'components/mid-cta.html' },
    { id: 'gs-hero',            file: 'components/hero.html' },
    { id: 'gs-wwd',             file: 'components/what-we-do.html' },
    { id: 'gs-process',         file: 'components/process.html' },
    { id: 'gs-cases',           file: 'components/cases.html' },
    { id: 'gs-industries',      file: 'components/industries.html' },
    { id: 'gs-testimonials',    file: 'components/testimonials.html' },
    { id: 'gs-consult-section', file: 'components/consult-section.html' },
    { id: 'gs-consult-form',    file: 'components/consult-form.html' },
    { id: 'gs-faq',             file: 'components/faq.html' },
    { id: 'gs-schema',          file: 'components/schema-org.html' },
  ];

  // --- Token map: {{TOKEN}} → value ---
  function buildTokenMap() {
    if (typeof SITE === 'undefined') {
      console.error('page-builder.js: SITE config not found. Load site-config.js first.');
      return {};
    }
    return {
      // ── Brand & Contact ──────────────────────
      '{{SITE.name}}':                    SITE.name,
      '{{SITE.tagline}}':                 SITE.tagline,
      '{{SITE.legalName}}':               SITE.legalName,
      '{{SITE.domain}}':                  SITE.domain,
      '{{SITE.phone}}':                   SITE.phone,
      '{{SITE.phoneTel}}':                SITE.phoneTel,
      '{{SITE.email}}':                   SITE.email,
      '{{SITE.googleAdsId}}':             SITE.googleAdsId,
      '{{SITE.formWebhookUrl}}':          SITE.formWebhookUrl,
      '{{SITE.thankYouPage}}':            SITE.thankYouPage,
      '{{SITE.imagekit.favicon}}':        SITE.imagekit.favicon,

      // ── Stats ────────────────────────────────
      '{{SITE.stats.projects}}':          SITE.stats.projects,
      '{{SITE.stats.clients}}':           SITE.stats.clients,
      '{{SITE.stats.experts}}':           SITE.stats.experts,
      '{{SITE.stats.costReduction}}':     SITE.stats.costReduction,
      '{{SITE.stats.googleRating}}':      SITE.stats.googleRating,

      // ── Social ───────────────────────────────
      '{{SITE.social.linkedin}}':         SITE.social.linkedin,
      '{{SITE.social.upwork}}':           SITE.social.upwork,
      '{{SITE.social.googleReviews}}':    SITE.social.googleReviews,

      // ── Address US ───────────────────────────
      '{{SITE.addressUS.street}}':        SITE.addressUS.street,
      '{{SITE.addressUS.city}}':          SITE.addressUS.city,
      '{{SITE.addressUS.state}}':         SITE.addressUS.state,
      '{{SITE.addressUS.zip}}':           SITE.addressUS.zip,
      '{{SITE.addressUS.country}}':       SITE.addressUS.country,
      '{{SITE.addressUS.flag}}':          SITE.addressUS.flag,

      // ── Address IN ───────────────────────────
      '{{SITE.addressIN.city}}':          SITE.addressIN.city,
      '{{SITE.addressIN.state}}':         SITE.addressIN.state,
      '{{SITE.addressIN.country}}':       SITE.addressIN.country,
      '{{SITE.addressIN.flag}}':          SITE.addressIN.flag,

      // ── Logos — Automation ───────────────────
      '{{SITE.logos.make}}':              SITE.logos.make,
      '{{SITE.logos.zapier}}':            SITE.logos.zapier,
      '{{SITE.logos.n8n}}':               SITE.logos.n8n,
      '{{SITE.logos.monday}}':            SITE.logos.monday,
      '{{SITE.logos.airtable}}':          SITE.logos.airtable,

      // ── Logos — AI & Voice ───────────────────
      '{{SITE.logos.openai}}':            SITE.logos.openai,
      '{{SITE.logos.vapi}}':              SITE.logos.vapi,
      '{{SITE.logos.retell}}':            SITE.logos.retell,

      // ── Logos — Communication ────────────────
      '{{SITE.logos.slack}}':             SITE.logos.slack,
      '{{SITE.logos.whatsapp}}':          SITE.logos.whatsapp,
      '{{SITE.logos.telegram}}':          SITE.logos.telegram,
      '{{SITE.logos.discord}}':           SITE.logos.discord,
      '{{SITE.logos.messenger}}':         SITE.logos.messenger,

      // ── Logos — CRM & Sales ──────────────────
      '{{SITE.logos.hubspot}}':           SITE.logos.hubspot,
      '{{SITE.logos.salesforce}}':        SITE.logos.salesforce,

      // ── Logos — Microsoft ────────────────────
      '{{SITE.logos.microsoft}}':         SITE.logos.microsoft,

      // ── Logos — Google ───────────────────────
      '{{SITE.logos.google}}':            SITE.logos.google,
      '{{SITE.logos.gmail}}':             SITE.logos.gmail,
      '{{SITE.logos.sheets}}':            SITE.logos.sheets,

      // ── Logos — Commerce & Payments ──────────
      '{{SITE.logos.shopify}}':           SITE.logos.shopify,
      '{{SITE.logos.stripe}}':            SITE.logos.stripe,

      // ── Logos — Productivity ─────────────────
      '{{SITE.logos.notion}}':            SITE.logos.notion,
      '{{SITE.logos.zoom}}':              SITE.logos.zoom,
      '{{SITE.logos.calendly}}':          SITE.logos.calendly,
      '{{SITE.logos.jira}}':              SITE.logos.jira,
      '{{SITE.logos.mailchimp}}':         SITE.logos.mailchimp,

      // ── Logos — Cloud & Dev ──────────────────
      '{{SITE.logos.aws}}':               SITE.logos.aws,
      '{{SITE.logos.twilio}}':            SITE.logos.twilio,

      // ── Logos — Social ───────────────────────
      '{{SITE.logos.meta}}':              SITE.logos.meta,
      '{{SITE.logos.linkedin}}':          SITE.logos.linkedin,
      '{{SITE.logos.instagram}}':         SITE.logos.instagram,
      '{{SITE.logos.manychat}}':          SITE.logos.manychat,

      // ── Logos — Special cases ────────────────
      '{{SITE.logos.quickbooks}}':        SITE.logos.quickbooks,
      '{{SITE.logos.powerbi}}':           SITE.logos.powerbi,
      '{{SITE.logos.azure}}':             SITE.logos.azure,
      '{{SITE.logos.looker}}':            SITE.logos.looker,

      // ── Cases (homepage cards) ───────────────
      '{{CASES.0.img}}':                  SITE.images.CASES[0].img,
      '{{CASES.0.alt}}':                  SITE.images.CASES[0].alt,
      '{{CASES.0.href}}':                 SITE.images.CASES[0].href,
      '{{CASES.1.img}}':                  SITE.images.CASES[1].img,
      '{{CASES.1.alt}}':                  SITE.images.CASES[1].alt,
      '{{CASES.1.href}}':                 SITE.images.CASES[1].href,
      '{{CASES.2.img}}':                  SITE.images.CASES[2].img,
      '{{CASES.2.alt}}':                  SITE.images.CASES[2].alt,
      '{{CASES.2.href}}':                 SITE.images.CASES[2].href,

      // ── Misc ─────────────────────────────────
      '{{YEAR}}':                         String(new Date().getFullYear()),
    };
  }

  // --- Replace all {{TOKENS}} in HTML string ---
  function replaceTokens(html) {
    const tokens = buildTokenMap();
    for (const [token, value] of Object.entries(tokens)) {
      html = html.split(token).join(value || '');
    }
    return html;
  }

  // --- Activate <script> tags inside injected HTML ---
  function activateScripts(container) {
    container.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  // --- Load a single component ---
  function loadComponent(comp) {
    const el = document.getElementById(comp.id);
    if (!el) return;
    if (el.innerHTML && el.innerHTML.trim().length > 0) return;

    fetch(prefix + comp.file)
      .then(res => {
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        return res.text();
      })
      .then(html => {
        el.innerHTML = replaceTokens(html);
        activateScripts(el);
        if (typeof setupImagesByDataAttribute === 'function') setupImagesByDataAttribute();
        if (typeof setupLinksByDataAttribute === 'function') setupLinksByDataAttribute();
      })
      .catch(err => {
        console.warn('[page-builder] Could not load ' + comp.id + ':', err.message);
      });
  }

  // --- Init ---
  COMPONENTS.forEach(loadComponent);

  // Second pass for nested components
  setTimeout(function () {
    COMPONENTS.forEach(loadComponent);
  }, 300);

  // --- Shared Scripts ---
  window.addEventListener('scroll', function () {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const pos = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });

  document.addEventListener('click', function (e) {
    const facade = e.target.closest('.yt-facade');
    if (!facade) return;
    const videoId = facade.dataset.videoId;
    if (!videoId) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
    iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;';
    facade.style.position = 'relative';
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
    if (!wasActive) item.classList.add('active');
  });


  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.nav-mobile-toggle');
    if (!toggle) {
      // Click outside — close menu
      var links = document.querySelector('.nav-links');
      var btn = document.querySelector('.nav-mobile-toggle');
      if (links && links.classList.contains('show')) {
        links.classList.remove('show');
        if (btn) btn.classList.remove('open');
      }
      return;
    }
    var links = document.querySelector('.nav-links');
    if (!links) return;
    links.classList.toggle('show');
    toggle.classList.toggle('open');
  });

})();