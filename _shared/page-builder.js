// ============================================
// GROWWSTACKS PAGE BUILDER
// Loads shared components into any page
// ============================================

(function() {
  'use strict';
  
  // Determine the path to _shared/ based on page depth
  // Homepage (/) → './_shared/'
  // /services/make-automation/ → '../../_shared/'
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const prefix = depth <= 1 ? './_shared/' : '../'.repeat(depth) + '_shared/';

  // ---- Load Components ----
  const components = [
    { id: 'gs-navbar',         file: 'components/navbar.html' },
    { id: 'gs-footer',         file: 'components/footer.html' },
    { id: 'gs-consult-form',   file: 'components/consult-form.html' },
    { id: 'gs-ticker',         file: 'components/platform-ticker.html' },
    { id: 'gs-partners',       file: 'components/partner-badges.html' },
    { id: 'gs-stats',          file: 'components/stats-bar.html' },
    { id: 'gs-mid-cta',        file: 'components/mid-cta.html' },
    { id: 'gs-schema',         file: 'components/schema-org.html' },
  ];
  
  // Fetch and inject each component
  components.forEach(comp => {
    const placeholder = document.getElementById(comp.id);
    if (!placeholder) return; // Skip if this page doesn't use it
    
    fetch(prefix + comp.file)
      .then(r => r.text())
      .then(html => {
        // Replace {{VARIABLE}} tokens with SITE config values
        html = replaceTokens(html);
        placeholder.innerHTML = html;
        
        // Re-run scripts inside injected HTML
        placeholder.querySelectorAll('script').forEach(oldScript => {
          const newScript = document.createElement('script');
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      })
      .catch(err => console.warn(`Component ${comp.id} not loaded:`, err));
  });
  
  // ---- Token Replacement ----
  function replaceTokens(html) {
    return html
      .replace(/\{\{SITE\.phone\}\}/g, SITE.phone)
      .replace(/\{\{SITE\.phoneTel\}\}/g, SITE.phoneTel)
      .replace(/\{\{SITE\.email\}\}/g, SITE.email)
      .replace(/\{\{SITE\.name\}\}/g, SITE.name)
      .replace(/\{\{SITE\.domain\}\}/g, SITE.domain)
      .replace(/\{\{SITE\.googleAdsId\}\}/g, SITE.googleAdsId)
      .replace(/\{\{SITE\.stats\.projects\}\}/g, SITE.stats.projects)
      .replace(/\{\{SITE\.stats\.clients\}\}/g, SITE.stats.clients)
      .replace(/\{\{SITE\.stats\.experts\}\}/g, SITE.stats.experts)
      .replace(/\{\{SITE\.stats\.costReduction\}\}/g, SITE.stats.costReduction)
      .replace(/\{\{SITE\.stats\.googleRating\}\}/g, SITE.stats.googleRating)
      .replace(/\{\{SITE\.thankYouPage\}\}/g, SITE.thankYouPage)
      .replace(/\{\{SITE\.formWebhookUrl\}\}/g, SITE.formWebhookUrl)
      .replace(/\{\{SITE\.social\.linkedin\}\}/g, SITE.social.linkedin)
      .replace(/\{\{SITE\.social\.upwork\}\}/g, SITE.social.upwork)
      .replace(/\{\{SITE\.social\.googleReviews\}\}/g, SITE.social.googleReviews)
      .replace(/\{\{YEAR\}\}/g, new Date().getFullYear())
      // Address
      .replace(/\{\{SITE\.addressUS\.street\}\}/g, SITE.addressUS.street)
      .replace(/\{\{SITE\.addressUS\.city\}\}/g, SITE.addressUS.city)
      .replace(/\{\{SITE\.addressUS\.state\}\}/g, SITE.addressUS.state)
      .replace(/\{\{SITE\.addressUS\.flag\}\}/g, SITE.addressUS.flag)
      .replace(/\{\{SITE\.addressIN\.city\}\}/g, SITE.addressIN.city)
      .replace(/\{\{SITE\.addressIN\.flag\}\}/g, SITE.addressIN.flag);
  }
  
})();
