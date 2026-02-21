// ============================================
// GROWWSTACKS SITE CONFIGURATION
// Single source of truth for all pages
// Last updated: 2026-02-21
// ============================================

// ─── Favicon helper ───────────────────────
// Use sz=64 for all logos — scale down via CSS as needed
const favicon = (domain, sz = 64) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=${sz}`;

// ============================================
// SITE — Core config
// ============================================
const SITE = {

  // ─── Brand ────────────────────────────────
  name:       'GrowwStacks',
  tagline:    'AI Agents, Voice AI & Business Automation Agency',
  legalName:  'M TEC Software & Business Automation Pvt. Ltd.',

  // ─── URLs ─────────────────────────────────
  domain: 'https://go.growwstacks.com',

  // ─── Contact ──────────────────────────────
  phone:    '+91-920-115-2256',
  phoneTel: 'tel:+919201152256',
  email:    'project@growwstacks.com',

  // ─── Addresses ────────────────────────────
  addressUS: {
    street:  '525 Route 73 North, Ste 104',
    city:    'Marlton',
    state:   'NJ',
    zip:     '08053',
    country: 'US',
    flag:    '🇺🇸'
  },
  addressIN: {
    city:    'Mumbai',
    state:   'Maharashtra',
    country: 'IN',
    flag:    '🇮🇳'
  },

  // ─── Social & Profiles ────────────────────
  social: {
    linkedin:     'https://www.linkedin.com/company/growwstacks/',
    upwork:       'https://www.upwork.com/agencies/1631885072275017728',
    googleReviews:'https://share.google/e7U12GrP3UxuzJEGr',
  },

  // ─── Tracking ─────────────────────────────
  googleAdsId: 'AW-17936939840',
  // googleAnalyticsId: 'G-XXXXXXXXXX', // uncomment when ready

  // ─── Form / Webhook ───────────────────────
  formWebhookUrl: 'https://hook.eu1.make.com/djyya63kealsfy8pa1va2a1ds3hi31om',
  thankYouPage:   '/thank-you/',

  // ─── Assets (ImageKit base — for page-specific images only) ───
  imagekit: {
    favicon: 'https://ik.imagekit.io/ui4mpbzoy/growwstacks-favicon-logo.png'
  },

  // ─── Partner / Tool Logos (favicon helper — consistent sz=64) ─
logos: {
  // ── Automation Platforms ──
  make:        favicon('make.com'),
  zapier:      favicon('zapier.com'),
  n8n:         favicon('n8n.io'),
  monday:      favicon('monday.com'),
  airtable:    favicon('airtable.com'),

  // ── AI & Voice ──
  openai:      favicon('openai.com'),
  vapi:        favicon('vapi.ai'),
  retell:      favicon('retellai.com'),

  // ── Communication ──
  slack:       favicon('slack.com'),
  whatsapp:    favicon('whatsapp.com'),
  telegram:    favicon('telegram.org'),
  discord:     favicon('discord.com'),
  messenger:   favicon('messenger.com'),

  // ── CRM & Sales ──
  hubspot:     favicon('hubspot.com'),
  salesforce:  favicon('salesforce.com'),

  // ── Microsoft ──
  microsoft:   favicon('microsoft.com'),

  // ── Google ──
  google:      favicon('google.com'),
  gmail:       favicon('gmail.com'),
  instagram:   favicon('instagram.com'),

  // ── Commerce & Payments ──
  shopify:     favicon('shopify.com'),
  stripe:      favicon('stripe.com'),

  // ── Productivity ──
  notion:      favicon('notion.so'),
  zoom:        favicon('zoom.us'),
  calendly:    favicon('calendly.com'),
  jira:        favicon('atlassian.com'),
  mailchimp:   favicon('mailchimp.com'),

  // ── Cloud & Dev ──
  aws:         favicon('amazon.com'),
  twilio:      favicon('twilio.com'),
  meta:        favicon('meta.com'),

  // ── Social ──
  linkedin:    favicon('linkedin.com'),
  manychat:    favicon('manychat.com'),

  // ── Special cases (subdomain/app icons — add full URL here when ready) ──
  sheets:   'https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico',
  powerbi:  'https://powerbi.microsoft.com/favicon.ico',
  azure:    'https://portal.azure.com/favicon.ico',
  quickbooks:'https://quickbooks.intuit.com/favicon.ico',
  },

  // ─── Stats (update here → updates everywhere) ─
  stats: {
    projects:      '2000+',
    clients:       '500+',
    experts:       '40+',
    costReduction: '60%',
    googleRating:  '5.0',
  },

  // ─── Fonts ────────────────────────────────
  fonts: {
    display: "'Bricolage Grotesque', serif",
    body:    "'Plus Jakarta Sans', sans-serif",
    url:     'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap',
  },

  // ─── Ticker Row 1 (Left → Right) ──────────
  tickerRow1: [
    { name: 'Make.com',       domain: 'make.com' },
    { name: 'Zapier',         domain: 'zapier.com' },
    { name: 'Slack',          domain: 'slack.com' },
    { name: 'HubSpot',        domain: 'hubspot.com' },
    { name: 'Salesforce',     domain: 'salesforce.com' },
    { name: 'Airtable',       domain: 'airtable.com' },
    { name: 'n8n',            domain: 'n8n.io' },
    { name: 'Monday.com',     domain: 'monday.com' },
    { name: 'WhatsApp',       domain: 'whatsapp.com' },
    { name: 'Stripe',         domain: 'stripe.com' },
    { name: 'OpenAI',         domain: 'openai.com' },
    { name: 'Shopify',        domain: 'shopify.com' },
    { name: 'Power Automate', domain: 'microsoft.com' },
  ],

  // ─── Ticker Row 2 (Right → Left) ──────────
  tickerRow2: [
    { name: 'Telegram',        domain: 'telegram.org' },
    { name: 'Notion',          domain: 'notion.so' },
    { name: 'Zoom',            domain: 'zoom.us' },
    { name: 'Calendly',        domain: 'calendly.com' },
    { name: 'Twilio',          domain: 'twilio.com' },
    { name: 'Meta / Facebook', domain: 'meta.com' },
    { name: 'Discord',         domain: 'discord.com' },
    { name: 'Power BI',        domain: 'powerbi.microsoft.com' },
    { name: 'QuickBooks',      domain: 'quickbooks.intuit.com' },
    { name: 'AWS',             domain: 'amazon.com' },
    { name: 'Jira',            domain: 'atlassian.com' },
    { name: 'Mailchimp',       domain: 'mailchimp.com' },
    { name: 'Google Sheets',   domain: 'sheets.google.com' },
    { name: 'Power Apps',      domain: 'microsoft.com' },
  ],

};

// ============================================
// SITE.images — Page-specific image URLs
// (logos now live in SITE.logos above)
// ============================================
SITE.images = {

  HERO: {
    carousel: [
      {
        src: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/3.png?tr=w-600,h-380,q-100',
        alt: 'Make Platinum Partner Award'
      },
      {
        src: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/4.png?tr=w-600,h-380,q-100',
        alt: 'GrowwStacks Team Celebration'
      }
    ]
  },

  // ─── Homepage Case Study Cards ─────────────
  // href = destination case study page
  CASES: [
    {
      title:    'AI Lead Qualification Agent for SaaS Platform',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/AI%20Lead%20Qualification%20Agent%20for%20SaaS%20Platform.jpeg?updatedAt=1771319768887',
      alt:      'AI Lead Qualification Agent for SaaS Platform',
      category: 'SaaS',
      href:     '/case-studies/smart-lead-qualification-ai/'
    },
    {
      title:    'Voice AI for Patient Appointment Booking',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Voice%20AI%20for%20Patient%20Appointment%20Booking.png?updatedAt=1771320381007',
      alt:      'Voice AI for Patient Appointment Booking',
      category: 'Healthcare',
      href:     '/case-studies/voice-ai-patient-appointment/'
    },
    {
      title:    'AI Chatbot + Social Media Automation for Real Estate',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/AI%20Chatbot%20+%20Social%20Media%20Automation%20for%20Real%20Estate.png?updatedAt=1771325461368',
      alt:      'AI Chatbot + Social Media Automation for Real Estate',
      category: 'Real Estate',
      href:     '/case-studies/ai-chatbot-real-estate/'
    }
  ],

  TESTIMONIALS: {
    andrey: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Andrey-Avatov-GrowwStacks-Client.png?updatedAt=1771326788524',
      alt: 'Andrey Avetov'
    },
    noor: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Noor-Israel-GrowwStacks-Client.png?updatedAt=1771326788512',
      alt: 'Noor Webbed'
    },
    ankit: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Ankit-GrowwStacks-Client.png?updatedAt=1771326788415',
      alt: 'Ankit'
    }
  },

  VIDEOS: {
    hero:   'https://i.ytimg.com/vi/x3RdjxHS2pI/hqdefault.jpg',
    andrey: 'https://i.ytimg.com/vi/VxRCbwp8HEY/hqdefault.jpg',
    noor:   'https://i.ytimg.com/vi/OkRWr5TL-QY/hqdefault.jpg',
    ankit:  'https://i.ytimg.com/vi/-GhflHmCmFM/hqdefault.jpg'
  },

  REVIEW_BADGES: {
    google: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/GrowwStacks%20Google%20Review%20Logo.png',
    upwork: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/upwork%20logo.jpeg?updatedAt=1771312194270'
  },

  BRANDING: {
    favicon: 'https://ik.imagekit.io/ui4mpbzoy/growwstacks-favicon-logo.png',
    logo:    'https://ik.imagekit.io/ui4mpbzoy/growwstacks-favicon-logo.png'
  }

};

// ============================================
// Backward compatibility aliases
// ============================================
window.IMAGES = SITE.images;
const IMAGES  = SITE.images;