/* ═══════════════════════════════════════════════════════════
   CASE STUDIES — Shared JavaScript
   Covers: Site assets init, Hub page filter + cards,
           FAQ accordion (all pages), Tool logos injection
═══════════════════════════════════════════════════════════ */

/* ─── Site Assets Init (reads from site-config.js SITE object) ─── */
(function () {
  if (typeof SITE === 'undefined') return;

  /* Google Ads — inject script tag + init tracking */
  if (SITE.googleAdsId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', SITE.googleAdsId);

    var gads = document.createElement('script');
    gads.async = true;
    gads.src = 'https://www.googletagmanager.com/gtag/js?id=' + SITE.googleAdsId;
    document.head.appendChild(gads);
  }

  /* Favicon */
  if (SITE.imagekit && SITE.imagekit.favicon) {
    var link = document.querySelector('link[rel="icon"]')
             || document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = SITE.imagekit.favicon;
    if (!link.parentNode) document.head.appendChild(link);
  }

  /* OG image — hub page marks this meta with data-site-favicon */
  if (SITE.imagekit && SITE.imagekit.favicon) {
    var ogImg = document.querySelector('meta[property="og:image"][data-site-favicon]');
    if (ogImg) ogImg.setAttribute('content', SITE.imagekit.favicon);
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────────────────────
     HUB PAGE — Empty State "Show All" Button
  ───────────────────────────────────────────────────────── */
  var showAllBtn = document.getElementById('csh-show-all');
  if (showAllBtn) {
    showAllBtn.addEventListener('click', function () {
      var allPill = document.querySelector('.csh-pill[data-filter="all"]');
      if (allPill) allPill.click();
    });
  }

  /* ─────────────────────────────────────────────────────────
     HUB PAGE — Sticky Filter Shadow
  ───────────────────────────────────────────────────────── */
  var filterBar = document.getElementById('csh-filters');
  if (filterBar) {
    window.addEventListener('scroll', function () {
      filterBar.classList.toggle('scrolled', window.scrollY > 200);
    });
  }

 /* ─────────────────────────────────────────────────────────
     HUB PAGE — Filter Pills Logic + Pagination (9 per page)
  ───────────────────────────────────────────────────────── */
  var PER_PAGE = 9;
  var pills    = document.querySelectorAll('.csh-pill');
  var cards    = Array.prototype.slice.call(document.querySelectorAll('.csh-card'));
  var countEl  = document.getElementById('csh-count');
  var emptyEl  = document.getElementById('csh-empty');
  var moreBtn  = document.getElementById('csh-more-btn');
  var moreWrap = document.getElementById('csh-more-wrap');

  var currentFilter = 'all';
  var visibleCount  = PER_PAGE;

  function getFiltered() {
    if (currentFilter === 'all') return cards;
    return cards.filter(function(c) {
      var cats = (c.getAttribute('data-category') || '').split(' ');
      return cats.indexOf(currentFilter) !== -1;
    });
  }

  function renderCards() {
    var filtered = getFiltered();
    var toShow   = filtered.slice(0, visibleCount);

    cards.forEach(function(c) { c.style.display = 'none'; });
    toShow.forEach(function(c) { c.style.display = ''; });

    var shown = Math.min(visibleCount, filtered.length);
    if (countEl) {
      countEl.innerHTML = 'Showing <strong>' + shown + '</strong> of <strong>' + filtered.length + '</strong> projects';
    }
    if (emptyEl) {
      emptyEl.style.display = filtered.length === 0 ? 'block' : 'none';
    }
    if (moreWrap) {
      moreWrap.style.display = visibleCount < filtered.length ? 'block' : 'none';
    }
  }

  if (pills.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        visibleCount = PER_PAGE;
        renderCards();
      });
    });
  }

  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      visibleCount += PER_PAGE;
      renderCards();
    });
  }

  renderCards();

  /* ─────────────────────────────────────────────────────────
     HUB PAGE — Card Click → Navigate
  ───────────────────────────────────────────────────────── */
  if (cards.length) {
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var href = card.getAttribute('data-href');
        if (href) window.location.href = href;
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     FAQ ACCORDION
     Works for both hub (.csh-faq-q / .csh-faq-item)
     and detail pages (.faq-q / .faq-item)
  ───────────────────────────────────────────────────────── */
  var faqBtns = document.querySelectorAll('.csh-faq-q, .faq-q');
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.csh-faq-item, .faq-item');
      var isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.csh-faq-item, .faq-item').forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('.csh-faq-q, .faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─────────────────────────────────────────────────────────
     TOOL LOGOS INJECTION (Detail Pages)
     Reads tool keys from <meta name="page-tools" content="n8n,airtable,...">
     Injects logos into #cs-hero-tools and #cs-sidebar-tools
  ───────────────────────────────────────────────────────── */
  var metaTools = document.querySelector('meta[name="page-tools"]');
  if (metaTools && typeof SITE !== 'undefined' && SITE.tools) {
    var pageTools = metaTools.getAttribute('content').split(',');

    var heroEl = document.getElementById('cs-hero-tools');
    if (heroEl) {
      pageTools.forEach(function (key) {
        key = key.trim();
        var t = SITE.tools[key];
        if (!t) return;
        var img = (SITE.logos && SITE.logos[key]) || t.icon32;
        heroEl.innerHTML += '<div class="cs-hero-logo">'
          + '<img src="' + img + '" alt="' + t.name + '" width="20" height="20" loading="lazy"> '
          + t.name + '</div>';
      });
    }

    var sideEl = document.getElementById('cs-sidebar-tools');
    if (sideEl) {
      pageTools.forEach(function (key) {
        key = key.trim();
        var t = SITE.tools[key];
        if (!t) return;
        sideEl.innerHTML += '<span class="cs-tool-tag">'
          + '<img src="' + t.icon16 + '" alt="" width="14" height="14" loading="lazy"> '
          + t.name + '</span>';
      });
    }
  }

  /* ─────────────────────────────────────────────────────────
     DETAIL PAGES — Sticky Nav Shadow
  ───────────────────────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ─────────────────────────────────────────────────────────
     DETAIL PAGES — YouTube Lite Facade (click to load)
  ───────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var facade = e.target.closest('.yt-facade');
    if (!facade) return;
    var videoId = facade.dataset.videoId;
    if (!videoId) return;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
    iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:inherit;';
    facade.parentElement.style.position = 'relative';
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });

  /* ─────────────────────────────────────────────────────────
     DETAIL PAGES — YouTube Facade Keyboard Support
  ───────────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var facade = document.activeElement && document.activeElement.classList.contains('yt-facade')
      ? document.activeElement : null;
    if (facade) { e.preventDefault(); facade.click(); }
  });

  /* ─────────────────────────────────────────────────────────
     DETAIL PAGES — Smooth Scroll for Anchor Links
  ───────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    var pos = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────────────────────────
     DETAIL PAGES — Dynamic Footer Year + Contact Info
  ───────────────────────────────────────────────────────── */
  var fy = document.getElementById('footer-year');
  if (fy) fy.textContent = new Date().getFullYear();

  if (typeof SITE !== 'undefined') {
    var emailLink = document.getElementById('footer-email');
    if (emailLink) {
      emailLink.href = 'mailto:' + SITE.email;
      emailLink.textContent = SITE.email;
    }
    var phoneLink = document.getElementById('footer-phone');
    if (phoneLink) {
      phoneLink.href = SITE.phoneTel;
      phoneLink.textContent = SITE.phone;
    }
  }

});

/* ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
   SCHEMA.ORG — JSON-LD Data
   Injected for SEO (Article, Breadcrumb, FAQ)
═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

// Page-specific schema data (AI Finance Loan Automation Case Study)
var pageSchemas = {
  'ai-finance-loan-automation': {
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'AI-Powered Finance & Loan Application Automation System — Case Study',
      'description': 'How GrowwStacks built AI voice assistant Anna to automate loan applications end-to-end — cutting processing time 85%, tripling completions, saving $500K+ annually.',
      'image': 'https://i.ytimg.com/vi/YouAMvn21V4/hqdefault.jpg',
      'author': {
        '@type': 'Organization',
        'name': 'GrowwStacks',
        'url': 'https://growwstacks.com'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'GrowwStacks',
        'url': 'https://growwstacks.com'
      },
      'datePublished': '2026-02-19',
      'dateModified': '2026-02-19',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': 'https://growwstacks.com/case-studies/ai-finance-loan-automation/'
      }
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://growwstacks.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Case Studies',
          'item': 'https://growwstacks.com/case-studies/'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'AI Finance & Loan Application Automation'
        }
      ]
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How long does it take to implement an AI loan application system like this?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Full implementation from kickoff to production typically takes 6 weeks — covering database configuration, voice AI training, workflow automation build, and compliance validation across all loan types. Weeks 1–2 cover system integration, weeks 3–4 focus on training the AI on your specific products and regulations, and weeks 5–6 are testing and go-live preparation. Institutions with standardized product lines on common CRM platforms consistently meet this timeline.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does AI loan automation handle financial compliance and regulatory requirements?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Compliance is built into the conversation architecture — every required regulatory disclosure is programmed as a mandatory conversation node that the AI delivers before proceeding. Verbal consent is captured and timestamped, every call is recorded in full with a searchable transcript, and a complete audit trail is maintained meeting standard financial industry documentation requirements. Compliance scripting is institution-specific and developed collaboratively with your compliance team during implementation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can the voice AI integrate with our existing CRM and loan origination system?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes — the system integrates with Salesforce, HubSpot, and most major CRM platforms via standard REST API with real-time synchronization during the call. For loan origination systems, integration depends on API availability — most modern LOS platforms (Encompass, Calyx, etc.) support webhook or API connections. Legacy systems without API access may require a middleware layer. Integration requirements are mapped during a technical discovery session before scoping.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens when a loan applicant asks something the AI cannot answer?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The AI is programmed with clear escalation boundaries — when a question exceeds its training scope, it gracefully transfers to a human loan officer with the full conversation context already loaded in the CRM, so the applicant never repeats themselves. Escalation triggers (complex rate negotiation, hardship exceptions, applicant frustration) are defined during implementation. Most institutions see escalation rates drop from 20–30% in month one to under 8% by month three as training improves.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What ROI can a mid-size bank or credit union realistically expect from AI loan automation?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'For a financial institution processing 100–300 loan applications monthly, realistic first-year ROI ranges from 400–700%. The primary sources are reduced intake staffing hours, captured after-hours applications, and higher completion rates from eliminating process abandonment. A 200-application monthly volume typically saves 600–1,000 staff hours per month while simultaneously increasing completed application volume by 30–40%.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does AI voice loan processing compare to online application portals or chatbots?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Voice AI consistently outperforms web-based self-service for loan applications because it mirrors how most borrowers — especially the 45+ demographic — prefer to discuss financial decisions: by talking to someone. Web portals suffer 30–50% abandonment rates due to process friction, while chatbots struggle with the non-linear nature of loan conversations. Running voice AI alongside an existing portal typically delivers 35–50% aggregate completion rate improvement compared to portal-only approaches.'
          }
        }
      ]
    }
  }
};

// Add Smart Lead Qualification AI schema
pageSchemas['smart-lead-qualification-ai'] = {
  article: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'AI-Powered Lead Qualification System Using ManyChat, ChatGPT & Make.com — Case Study',
    'description': 'How GrowwStacks built an AI lead qualification system using ManyChat, ChatGPT-4, and Make.com — cutting screening time by 85% and delivering 550% ROI.',
    'image': 'https://i.ytimg.com/vi/MShhrHfUDaQ/hqdefault.jpg',
    'author': {
      '@type': 'Organization',
      'name': 'GrowwStacks',
      'url': 'https://growwstacks.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'GrowwStacks',
      'url': 'https://growwstacks.com'
    },
    'datePublished': '2026-02-19',
    'dateModified': '2026-02-19',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://growwstacks.com/case-studies/smart-lead-qualification-ai/'
    }
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://growwstacks.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Case Studies',
        'item': 'https://growwstacks.com/case-studies/'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Smart Lead Qualification AI'
      }
    ]
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How much does it cost to build an AI lead qualification system like this?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A conversational AI lead qualification system typically costs between $5,000 and $15,000 depending on channels, criteria complexity, and integrations. This ManyChat + ChatGPT-4 + Make.com build fell in the $8,000-$10,000 range with 2-week delivery. With $15K+ monthly savings, the system delivered 550% ROI and paid for itself within 3 weeks.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can ChatGPT accurately qualify leads, or does it make too many mistakes?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'With proper prompt engineering, ChatGPT-4 achieves 92% qualification accuracy — comparable to or better than human reviewers who show 15-20% inconsistency. The key is structured prompting with explicit criteria, JSON-formatted responses, and confidence scores that flag uncertain cases for human review.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long does it take to set up an automated lead qualification pipeline?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A complete AI lead qualification system takes 2-3 weeks from kickoff to live deployment. Prompt engineering is the most time-intensive part — getting AI accuracy above 90% requires 3-4 iterations with real conversation data. Every project includes 30 days of free post-launch support.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What happens if the AI incorrectly rejects a good lead?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The system uses three outcomes — qualified, not qualified, and needs more information — instead of binary decisions. Decisions below 80% confidence are flagged for human review with the AI\'s reasoning attached, making false rejections near-zero.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Which types of businesses benefit most from AI-powered lead qualification?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Any business processing 50+ conversational applications per day sees immediate ROI. Strongest use cases include e-commerce ambassador programs, influencer agencies, membership organizations, and SaaS inbound chat leads.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How does AI lead qualification compare to simple chatbot rules?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Simple chatbot rules catch about 60% of qualification criteria while AI evaluation captures 92%+ because it understands context, nuance, and intent. The AI approach delivers 45% higher conversion rates from qualified prospects.'
        }
      }
    ]
  }
};

// Add Case Studies Hub page schema
pageSchemas['case-studies-hub'] = {
  collectionPage: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Case Studies — AI & Automation Success Stories',
    'description': 'Browse 50+ real automation case studies from GrowwStacks. See how businesses saved $50K–$400K+ annually with Make.com, AI agents, voice AI, and workflow automation.',
    'url': 'https://growwstacks.com/case-studies/',
    'publisher': {
      '@type': 'Organization',
      'name': 'GrowwStacks',
      'url': 'https://growwstacks.com',
      'logo': 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/GS-favicon.png'
    }
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://growwstacks.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Case Studies'
      }
    ]
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How much does a typical AI automation project cost for a small business?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most projects range from $5,000 to $10,000 depending on complexity. Simple workflow automations start around $3,000, while complex multi-agent AI systems can reach $15,000+. Our average project delivers 300-700% return within the first year.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long does it take to implement an automation or AI agent for my business?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most projects are deployed within 2-8 weeks. Simple automations take 1-2 weeks, mid-complexity projects take 3-5 weeks, and enterprise AI agent systems take 6-8 weeks with phased delivery so you see working components within the first week.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Will AI automation replace my team, or work alongside them?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our automations augment your team, not replace them. They eliminate repetitive manual tasks so your people can focus on high-value work that requires human judgment and relationship building.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What industries benefit most from AI and workflow automation?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Healthcare, finance/CPA firms, e-commerce, and professional services see the strongest ROI. Any business processing repetitive data or handling high-volume operations with 50+ repeated tasks per week typically saves at least $50K annually.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What platforms do you use — Make.com, Zapier, or custom code?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We primarily use Make.com (Platinum Partner) and n8n for workflow automation, combined with OpenAI/ChatGPT for AI intelligence and VAPI for voice AI. The platform choice depends on your specific needs and data privacy requirements.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I know if my business is ready for AI automation?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'If your team spends more than 10 hours per week on predictable, pattern-based tasks — like copy-pasting data between apps, manually sending follow-ups, or hand-processing invoices — your business is ready. Our free automation audit identifies your top 3 highest-ROI opportunities.'
        }
      }
    ]
  }
};

// Inject schema.org data into <head> for SEO
document.addEventListener('DOMContentLoaded', function () {
  // Detect current page from URL or page class
  var pageKey = document.body.classList.contains('cs-page') && window.location.pathname.includes('/case-studies/') && !window.location.pathname.includes('/case-studies/smart-lead') && !window.location.pathname.includes('/case-studies/ai-finance') ? 'case-studies-hub' : (document.body.classList.contains('page-lead-qual') ? 'smart-lead-qualification-ai' : 'ai-finance-loan-automation');
  var schemas = pageSchemas[pageKey];

  if (schemas) {
    // For hub page, inject CollectionPage instead of Article
    if (schemas.collectionPage) {
      var scriptCP = document.createElement('script');
      scriptCP.type = 'application/ld+json';
      scriptCP.textContent = JSON.stringify(schemas.collectionPage);
      document.head.appendChild(scriptCP);
    }

    if (schemas.article) {
      var script1 = document.createElement('script');
      script1.type = 'application/ld+json';
      script1.textContent = JSON.stringify(schemas.article);
      document.head.appendChild(script1);
    }

    if (schemas.breadcrumb) {
      var script2 = document.createElement('script');
      script2.type = 'application/ld+json';
      script2.textContent = JSON.stringify(schemas.breadcrumb);
      document.head.appendChild(script2);
    }

    if (schemas.faq) {
      var script3 = document.createElement('script');
      script3.type = 'application/ld+json';
      script3.textContent = JSON.stringify(schemas.faq);
      document.head.appendChild(script3);
    }
  }
});

/* ═══════════════════════════════════════════════════════════════
   case-studies.js
   Renders cards + filter pills + dynamic count
   Uses exact same HTML structure and classes
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  let activeFilter = "all";

  function getGrid() {
    return document.getElementById("csh-grid");
  }

  function getCountEl() {
    return document.getElementById("csh-count");
  }

  function getCards() {
    return Array.isArray(window.CS_CARDS) ? window.CS_CARDS : [];
  }

  function getMetaIcon() {
    return `
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" clip-rule="evenodd"></path>
      </svg>
    `;
  }

  function getRoiIcon(type = "trend") {
    if (type === "clock") {
      return `
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.5 2.5a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd"></path>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
      </svg>
    `;
  }

  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderCard(card) {
    return `
      <a class="csh-card"
         data-category="${escapeHtml(card.category || "")}"
         href="${escapeHtml(card.href || "#")}"
         target="_blank">

        <div class="csh-card-banner ${escapeHtml(card.bannerClass || "")}">
          <img
            src="${escapeHtml(card.img || "")}"
            alt="${escapeHtml(card.imgAlt || card.title || "Case Study")}"
            class="csh-card-banner-img"
            loading="lazy"
          >
          <span class="csh-card-tag">${card.tag || ""}</span>
        </div>

        <div class="csh-card-body">
          <h3 class="csh-card-title">${card.title || ""}</h3>
          <p class="csh-card-desc">${card.desc || ""}</p>

          <div class="csh-card-footer">
            <div class="csh-card-meta">
              ${getMetaIcon()}
              ${card.meta || ""}
            </div>

            <div class="csh-card-roi">
              ${getRoiIcon(card.roiIcon)}
              ${card.roi || ""}
            </div>

            <span class="csh-card-link">View &rarr;</span>
          </div>
        </div>
      </a>
    `;
  }

  function getFilteredCards() {
    const cards = getCards();

    if (activeFilter === "all") return cards;

    return cards.filter(card => {
      const category = String(card.category || "").toLowerCase();
      return category.split(/\s+/).includes(activeFilter.toLowerCase());
    });
  }

  function updateCount(count) {
    const countEl = getCountEl();
    if (!countEl) return;

    countEl.innerHTML = `Showing <strong>${count}</strong> project${count === 1 ? "" : "s"}`;
  }

  function renderCards() {
    const grid = getGrid();
    if (!grid) {
      console.error("❌ #csh-grid not found");
      return;
    }

    const filteredCards = getFilteredCards();

    grid.innerHTML = filteredCards.map(renderCard).join("");
    updateCount(filteredCards.length);

    console.log("✅ Cards rendered:", filteredCards.length, "Filter:", activeFilter);
  }

  function initFilters() {
    const pills = document.querySelectorAll(".csh-pill");
    if (!pills.length) return;

    pills.forEach(btn => {
      btn.addEventListener("click", function () {
        pills.forEach(p => p.classList.remove("active"));
        this.classList.add("active");

        activeFilter = this.getAttribute("data-filter") || "all";
        renderCards();
      });
    });
  }

  function initFAQ() {
    const faqButtons = document.querySelectorAll(".csh-faq-q");
    if (!faqButtons.length) return;

    faqButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", String(!expanded));

        const answer = this.nextElementSibling;
        if (answer) {
          answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
        }

        const icon = this.querySelector(".csh-faq-icon");
        if (icon) icon.textContent = expanded ? "+" : "−";
      });
    });
  }

  function init() {
    if (!Array.isArray(window.CS_CARDS)) {
      console.error("❌ window.CS_CARDS not found");
      return;
    }

    initFilters();
    initFAQ();
    renderCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // backup in case page-builder injects content later
  window.addEventListener("load", init);
})();

