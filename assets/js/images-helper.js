// ============================================
// IMAGE HELPER FUNCTIONS
// ============================================
// Dynamically injects images from SITE.images config into the DOM

// Generic function to set images by data attribute
function setupImagesByDataAttribute() {
  const allImages = document.querySelectorAll('img[data-image-key]');
  console.log('[images-helper] setupImagesByDataAttribute found', allImages.length, 'images');
  
  allImages.forEach((img) => {
    const key = img.dataset.imageKey;
    const imageConfig = getImageByKey(key);

    if (imageConfig) {
      const src      = (typeof imageConfig === 'string') ? imageConfig : imageConfig.src;
      const alt      = (typeof imageConfig === 'string') ? '' : imageConfig.alt;
      const fallback = (typeof imageConfig === 'string') ? null : imageConfig.fallback;

      if (src) img.src = src;
      if (alt) img.alt = alt;
      if (fallback) {
        img.onerror = function() { this.src = fallback; };
      }
      console.log('[images-helper] Set image', key, '→', src.substring(0, 60) + '...');
    } else {
      console.warn('[images-helper] Image key not found:', key);
    }
  });
}

// Handle <link data-image-key> elements (favicon, logos in head, etc.)
function setupLinksByDataAttribute() {
  const allLinks = document.querySelectorAll('link[data-image-key]');
  allLinks.forEach((link) => {
    const key = link.dataset.imageKey;
    const imageConfig = getImageByKey(key);
    if (imageConfig) {
      const href = (typeof imageConfig === 'string') ? imageConfig : imageConfig.src;
      if (href) link.href = href;
    }
  });
}

// Helper: get image value by dot-notation key
// Example: "HERO.carousel.0", "BRANDING.favicon"
function getImageByKey(key) {
  if (!key) return null;
  
  const keys      = key.split('.');
  const namespace = keys[0];
  
  // Try window[namespace] first, then SITE.images[namespace]
  let value = window[namespace];
  if (!value && typeof SITE !== 'undefined' && SITE[namespace]) {
    value = SITE[namespace];
  }
  if (!value && typeof SITE !== 'undefined' && SITE.images && SITE.images[namespace]) {
    value = SITE.images[namespace];
  }
  
  if (!value) {
    console.warn('[images-helper] Namespace not found:', namespace);
    return null;
  }
  
  try {
    for (let i = 1; i < keys.length; i++) {
      const k = keys[i];
      value = isNaN(k) ? value[k] : value[parseInt(k)];
    }
    return value;
  } catch (e) {
    console.warn('[images-helper] Key not found:', key, e.message);
    return null;
  }
}

// ─── Hero Carousel ────────────────────────
function setupHeroCarousel() {
  const carouselImages = document.querySelectorAll('.carousel-img');
  if (carouselImages.length && IMAGES.HERO && IMAGES.HERO.carousel) {
    carouselImages.forEach((img, index) => {
      if (IMAGES.HERO.carousel[index]) {
        img.src = IMAGES.HERO.carousel[index].src;
        img.alt = IMAGES.HERO.carousel[index].alt;
      }
    });
  }
}

// ─── Partner Badges ───────────────────────
// Now reads from SITE.logos (favicon-based, no IMAGES.PARTNERS)
function setupPartnerBadges() {
  if (typeof SITE === 'undefined' || !SITE.logos) return;

  const partnerBadges = document.querySelectorAll('.partner-badge');
  const logoKeys      = Object.keys(SITE.logos);

  partnerBadges.forEach((badge, index) => {
    if (index >= logoKeys.length) return;
    const img = badge.querySelector('img');
    const key = logoKeys[index];
    if (img && SITE.logos[key]) {
      img.src = SITE.logos[key];
      img.alt = key;
      // favicon URLs don't need onerror fallback — they always resolve
    }
  });
}

// ─── Ticker Images ────────────────────────
// Now reads from SITE.tickerRow1 / SITE.tickerRow2
function setupTickerImages() {
  if (typeof SITE === 'undefined') return;

  const tickerRows = document.querySelectorAll('.ticker-row');

  function fillRow(rowEl, dataArray) {
    if (!rowEl || !dataArray) return;
    const items = rowEl.querySelectorAll('.ticker-item');
    items.forEach((item, index) => {
      const actualIndex = index % dataArray.length;
      const img         = item.querySelector('img');
      const entry       = dataArray[actualIndex];
      if (img && entry) {
        img.src = favicon(entry.domain);
        img.alt = entry.name;
      }
    });
  }

  fillRow(tickerRows[0], SITE.tickerRow1);
  fillRow(tickerRows[1], SITE.tickerRow2);
}

// ─── Case Study Cards (Homepage) ──────────
// Reads from SITE.images.CASES — sets image AND makes card clickable via href
function setupCaseStudies() {
  if (!IMAGES.CASES) return;

  const caseCards = document.querySelectorAll('.case-card');
  caseCards.forEach((card, index) => {
    const data = IMAGES.CASES[index];
    if (!data) return;

    // Set image
    const img = card.querySelector('.case-img img');
    if (img) {
      img.src = data.img;
      img.alt = data.alt;
    }

    // Make card clickable if href is defined
    if (data.href) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        window.location.href = data.href;
      });
    }
  });
}

// ─── Testimonials ─────────────────────────
function setupTestimonials() {
  const testimonialCards = document.querySelectorAll('.test-card');
  const testimonialKeys  = ['andrey', 'noor', 'ankit'];
  
  testimonialCards.forEach((card, index) => {
    if (index >= testimonialKeys.length) return;
    const avatar = card.querySelector('.test-avatar-img');
    const key    = testimonialKeys[index];
    if (avatar && IMAGES.TESTIMONIALS && IMAGES.TESTIMONIALS[key]) {
      avatar.src = IMAGES.TESTIMONIALS[key].img;
      avatar.alt = IMAGES.TESTIMONIALS[key].alt;
    }
  });
}

// ─── Review Badges ────────────────────────
function setupReviewBadges() {
  const reviewPlatforms = document.querySelectorAll('.review-platform');
  const logos           = ['google', 'upwork', 'upwork'];
  
  reviewPlatforms.forEach((platform, index) => {
    if (index >= logos.length) return;
    const logo = platform.querySelector('.review-logo');
    if (logo && IMAGES.REVIEW_BADGES && IMAGES.REVIEW_BADGES[logos[index]]) {
      logo.src = IMAGES.REVIEW_BADGES[logos[index]];
    }
  });
}

// ─── Review Collage ───────────────────────
function setupReviewCollage() {
  const reviewCards = document.querySelectorAll('.rc-card');
  reviewCards.forEach((card) => {
    const sourceLogos = card.querySelectorAll('.rc-source-logo');
    const isGoogle    = card.classList.contains('rc-google');
    const isUpwork    = card.classList.contains('rc-upwork');
    sourceLogos.forEach((logo) => {
      if (isGoogle && IMAGES.REVIEW_BADGES && IMAGES.REVIEW_BADGES.google) {
        logo.src = IMAGES.REVIEW_BADGES.google;
      } else if (isUpwork && IMAGES.REVIEW_BADGES && IMAGES.REVIEW_BADGES.upwork) {
        logo.src = IMAGES.REVIEW_BADGES.upwork;
      }
    });
  });
}

// ─── Init ─────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  if (typeof IMAGES !== 'undefined') {
    setupLinksByDataAttribute();
    setupImagesByDataAttribute();
    setupHeroCarousel();
    setupPartnerBadges();
    setupTickerImages();
    setupCaseStudies();
    setupTestimonials();
    setupReviewBadges();
    setupReviewCollage();
  }

  // Retry after 600ms to catch any async-injected components
  setTimeout(function () {
    try {
      setupLinksByDataAttribute();
      setupImagesByDataAttribute();
    } catch (e) {
      console.warn('[images-helper] retry failed:', e);
    }
  }, 600);
});