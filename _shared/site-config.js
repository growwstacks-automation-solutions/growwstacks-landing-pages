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
  domain: 'https://growwstacks.com',

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
    favicon: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/GS-favicon.png'
  },

  // ─── Partner / Tool Logos (favicon helper — consistent sz=64) ─
logos: {
  // ── Automation Platforms ──
  make:            'https://ik.imagekit.io/r2zdlyze2o/GS-Website/make.png',
  zapier:          'https://ik.imagekit.io/r2zdlyze2o/GS-Website/zapier.png',
  n8n:             favicon('n8n.io'),
  monday:          favicon('monday.com'),
  airtable:        favicon('airtable.com'),

  // ── AI & Voice ──
  openai:          favicon('openai.com'),
  vapi:            favicon('vapi.ai'),
  retell:          favicon('retellai.com'),
  perplexity:      favicon('perplexity.ai'),
  chatgpt:         favicon('chat.openai.com'),
  heyalice:        favicon('heyalice.app'),
  nlpearl:         favicon('nlpearl.ai'),
  fathom:          favicon('fathom.ai'),
  ideogram:        favicon('ideogram.ai'),
  flux:            favicon('flux.ai'),
  immersity:       favicon('immersity.ai'),
  smartlead:       favicon('smartlead.ai'),
  instantly:       favicon('instantly.ai'),
  fireflies:       favicon('fireflies.ai'),
  leonardo:        favicon('leonardo.com'),
  llama:           favicon('llama.meta.com'),
  elevenlabs:      'https://ik.imagekit.io/r2zdlyze2o/Logo/Elevenlabs.jpg',
  gemini:          'https://ik.imagekit.io/r2zdlyze2o/Logo/gemini.png',

  // ── Communication ──
  slack:           favicon('slack.com'),
  whatsapp:        favicon('whatsapp.com'),
  telegram:        favicon('telegram.org'),
  discord:         favicon('discord.com'),
  messenger:       favicon('messenger.com'),
  aircall:         favicon('aircall.io'),
  dialpad:         favicon('dialpad.com'),
  signalwire:      favicon('signalwire.com'),
  sakari:          favicon('sakari.io'),
  twilio:          favicon('twilio.com'),

  // ── CRM & Sales ──
  hubspot:         favicon('hubspot.com'),
  salesforce:      favicon('salesforce.com'),
  pipedrive:       favicon('pipedrive.com'),
  close:           favicon('close.com'),
  attio:           favicon('attio.com'),
  copper:          favicon('copper.com'),
  insightly:       favicon('insightly.com'),
  streak:          favicon('streak.com'),
  bigin:           favicon('bigin.com'),
  keap:            favicon('keap.com'),
  clientjoy:       favicon('clientjoy.io'),
  apollo:          favicon('apollo.io'),
  salesmate:       favicon('salesmate.io'),
  salestracker:    favicon('salestracker.com'),
  zoho:            favicon('zoho.com/crm'),
  espocrm:         favicon('espocrm.com'),
  clio:            favicon('clio.com'),
  '17hats':        favicon('17hats.com'),

  // ── Microsoft ──
  microsoft:       favicon('microsoft.com'),
  teams:           favicon('teams.microsoft.com'),
  outlook:         favicon('outlook.live.com'),
  onedrive:        'https://ik.imagekit.io/r2zdlyze2o/Logo/Onedrive.png',
  excel:           'https://ik.imagekit.io/r2zdlyze2o/Logo/Microsoft_Office_Excel_Logo_512px.png',
  word:            'https://ik.imagekit.io/r2zdlyze2o/Logo/Microsoft_Office_Word_Logo_512px.png',
  powerApps:       'https://ik.imagekit.io/r2zdlyze2o/Logo/microsoft-power-apps.png',
  powerAutomate:   'https://ik.imagekit.io/r2zdlyze2o/Logo/microsoft-power-automate.png',
  sharepoint:      'https://ik.imagekit.io/r2zdlyze2o/Logo/sharepoint.png',

  // ── Google ──
  google:          favicon('google.com'),
  gmail:           'https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico',
  googleCalendar:  'https://calendar.google.com/googlecalendar/images/favicon_v2018_256.png',
  googleDocs:      'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
  googleSlide:     'https://ssl.gstatic.com/docs/presentations/images/favicon5.ico',
  googleForms:      'https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png',
  googleDrive:     'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png',
  googleMeet:      favicon('meet.google.com'),
  googleMap:       favicon('maps.google.com'),
  googleAds:       'https://ik.imagekit.io/r2zdlyze2o/Logo/google_ads',
  googleAppScript: 'https://ik.imagekit.io/r2zdlyze2o/Logo/google-apps-script.png',
  googleColab:     'https://colab.research.google.com/img/colab_favicon_256px.png',
  googleMyBusiness:'https://img.utdstc.com/icon/73e/c02/73ec026992430326513a9b8bf092f6199b0174d230158bc8553da7ea8d830d9d:200',
  googleLooker:    'https://play-lh.googleusercontent.com/7m6tWuvazdJQBoMtz4-UuHvl46APqRczwLQ0-Bq7QULjSGcgnljFpCswdvZkc4VTpw=w240-h480-rw',
  googleDataStudio:'https://w7.pngwing.com/pngs/212/149/png-transparent-google-data-studio-hd-logo-thumbnail.png',
  googleVideoIntel:favicon('cloud.google.com'),
  bigquery:        favicon('cloud.google.com/bigquery'),
  googleSheets:    'https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico',
  

  // ── Social ──
  linkedin:        favicon('linkedin.com'),
  manychat:        favicon('manychat.com'),
  instagram:       favicon('instagram.com'),
  facebook:        favicon('facebook.com'),
  facebookAds:     favicon('facebook.com/ads'),
  twitter:         favicon('twitter.com'),
  tiktok:          favicon('tiktok.com'),
  pinterest:       favicon('pinterest.com'),
  youtube:         favicon('youtube.com'),
  hootsuite:       favicon('hootsuite.com'),

  // ── Commerce & Payments ──
  shopify:         favicon('shopify.com'),
  stripe:          favicon('stripe.com'),
  woocommerce:     favicon('woocommerce.com'),
  gumroad:         favicon('gumroad.com'),
  fastspring:      favicon('fastspring.com'),
  sendowl:         favicon('sendowl.com'),
  chargebee:       favicon('chargebee.com'),
  paypro:          favicon('paypro.com'),
  clickfunnels:    favicon('clickfunnels.com'),
  kartra:          favicon('kartra.com'),
  kajabi:          favicon('kajabi.com'),
  xero:            favicon('xero.com'),
  bill:            favicon('bill.com'),
  cin7:            favicon('cin7.com'),
  whop:            favicon('whop.com'),
  sandcloud:       favicon('sandcloud.com'),
  bigcommerce:     favicon('bigcommerce.com'),


  // ── Productivity ──
  notion:          favicon('notion.so'),
  zoom:            favicon('zoom.us'),
  calendly:        favicon('calendly.com'),
  jira:            favicon('atlassian.com'),
  mailchimp:       favicon('mailchimp.com'),
  asana:           favicon('asana.com'),
  clickup:         favicon('clickup.com'),
  trello:          favicon('trello.com'),
  todoist:         favicon('todoist.com'),
  loom:            favicon('loom.com'),
  docusign:        "https://ik.imagekit.io/r2zdlyze2o/Logo/docusign.webp",
  pandadoc:        favicon('pandadoc.com'),
  typeform:        favicon('typeform.com'),
  jotform:         favicon('jotform.com'),
  gravityforms:    favicon('gravityforms.com'),
  cal:             favicon('cal.com'),
  acuity:          favicon('acuityscheduling.com'),
  toggl:           favicon('toggl.com'),
  harvest:         favicon('harvestapp.com'),
  podio:           favicon('podio.com'),
  unito:           favicon('unito.io'),
  dubsado:         favicon('dubsado.com'),
  tave:            favicon('tave.com'),
  eventbrite:      favicon('eventbrite.com'),
  questionscout:   favicon('questionscout.com'),
  screenshotone:   favicon('screenshotone.com'),
  canva:           favicon('canva.com'),

  // ── Email Marketing ──
  mailerlite:      favicon('mailerlite.com'),
  brevo:           favicon('brevo.com'),
  constantcontact: favicon('constantcontact.com'),
  convertkit:      favicon('convertkit.com'),
  activecampaign:  favicon('activecampaign.com'),
  klaviyo:         favicon('klaviyo.com'),
  mailwizz:        favicon('mailwizz.com'),
  reply:           favicon('reply.io'),
  dripify:         favicon('dripify.com'),
  unipile:         favicon('unipile.com'),

  // ── Cloud & Dev ──
  aws:             favicon('aws.amazon.com'),
  amazon:          favicon('amazon.com'),
  meta:            favicon('meta.com'),
  cloudflare:      favicon('cloudflare.com'),
  nodejs:          favicon('nodejs.org'),
  expressjs:       favicon('expressjs.com'),
  python:          favicon('python.org'),
  pytorch:         favicon('pytorch.org'),
  flask:           favicon('flask.palletsprojects.com'),
  javascript:      favicon('javascript.com'),
  htmx:            favicon('htmx.org'),
  bootstrap:       favicon('getbootstrap.com'),
  htmlcss:         favicon('w3schools.com'),
  rapidapi:        favicon('rapidapi.com'),
  apify:           favicon('apify.com'),
  bubble:          favicon('bubble.io'),
  webflow:         favicon('webflow.com'),
  softr:           favicon('softr.io'),
  wordpress:       favicon('wordpress.com'),
  squarespace:     favicon('squarespace.com'),
  frame:           favicon('frame.io'),
  framework:       favicon('frame.work'),
  dropbox:         favicon('dropbox.com'),
  fivetran:        favicon('fivetran.com'),
  imagekit:        favicon('imagekit.io'),

  // ── AI / ML / Data ──
  langchain:       favicon('langchain.com'),
  pinecone:        favicon('pinecone.io'),
  chromadb:        favicon('trychroma.com'),
  faiss:           favicon('facebook.com/ads'),
  pandas:          favicon('pandas.pydata.org'),
  transformers:    favicon('transformers.com'),
  ocr:             favicon('ocr.space'),

  // ── Industry / Niche ──
  ghl:             favicon('gohighlevel.com'),
  brokerengine:    favicon('brokerengine.com'),
  bitrix24:        favicon('bitrix24.com'),
  holded:          favicon('holded.com'),
  booqable:        favicon('booqable.com'),
  inksoft:         favicon('inksoft.com'),
  machship:        favicon('machship.com'),
  officernd:       favicon('officernd.com'),
  optimaroute:     favicon('optimoroute.com'),
  launch27:        favicon('launch27.com'),
  unleashed:       favicon('unleashedsoftware.com'),
  wheelbasepro:    favicon('wheelbasepro.com'),
  kisi:            favicon('getkisi.com'),
  xplor:           favicon('xplor.com'),
  hubflo:          favicon('hubflo.com'),
  circle:          favicon('circle.so'),
  cscart:          favicon('cs-cart.com'),
  rfmcube:         favicon('rfmcube.com'),
  batchdata:       favicon('batchdata.com'),
  bouncer:         favicon('usebouncer.com'),
  phantombuster:   favicon('phantombuster.com'),
  originality:     favicon('originality.com'),
  ouraring:        favicon('ouraring.com'),
  passkit:         favicon('passkit.com'),
  savemyexams:     favicon('savemyexams.com'),
  grain:           favicon('grain.co'),
  feefo:           favicon('feefo.com'),
  fatture:         favicon('fattureincloud.it'),
  abaninja:        favicon('abaninja.com'),
  col:             favicon('col.com'),
  maps:            favicon('maps.com'),
  mxroute:         favicon('mxroute.com'),
  timeline:        favicon('timelines.ai'),
  partial:         favicon('partial.ly'),
  systeme:         favicon('systeme.io'),
  paypal:         favicon('paypal.com'),

  // ── Education / LMS ──
  teachable:       favicon('teachable.com'),
  learndash:       favicon('learndash.com'),
  learnworlds:     favicon('learnworlds.com'),

  // ── PDF Tools ──
  pdfco:           favicon('pdf.co'),
  pdfminer:        favicon('pdfminersix.readthedocs.io'),
  pdffiller:       favicon('pdffiller.com'),
  pdfplumber:      favicon('pdfplumber.com'),

  // ── Misc / CMS ──
  rss:             favicon('rss.com'),
  sms:             favicon('sms.com'),
  cf7:             favicon('contactform7.com'),
  smartsuite:      favicon('smartsuite.com'),
  database:        favicon('mysql.com'),
  vector:          favicon('vector.com'),

  // ── Special cases (direct icon URLs) ──
  powerbi:         'https://ik.imagekit.io/r2zdlyze2o/Logo/Power_BI.png',
  azure:           'https://portal.azure.com/favicon.ico',
  quickbooks:      'https://ik.imagekit.io/r2zdlyze2o/Logo/quickbooks.png',
  azureSql:        'https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.jpg',
  azureDocIntel:   favicon('azure.microsoft.com'),
  '360dialog':     favicon('360dialog.com'),
  xml:             'https://cdn-icons-png.flaticon.com/512/136/136526.png',
  email:           'https://illustoon.com/photo/2751.png',
  webhook:         'https://ik.imagekit.io/r2zdlyze2o/Logo/Webhook?updatedAt=1771505144146',
  beehive:         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3G9QVYGjQHpoNE67mT5rLhBsP9ZpYqntt7A&s',
  bs4:             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqIYT6nKpypujxEF0-fUtT2saVWkCij1vvw&s',
  beehiiv:         favicon('beehiiv.com'),
  broadly:         'https://play-lh.googleusercontent.com/7gyykx7j4VYzEmNz2yZwhMg27n8XCPvmFs4Hdi2ERpKGjaLejftuullEGBflaYQ1mHk',
  json:            favicon('json.org'),
  dialogue365:     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3G9QVYGjQHpoNE67mT5rLhBsP9ZpYqntt7A&s',
  zohoBooks:       'https://ik.imagekit.io/r2zdlyze2o/Logo/zoho%20Books.png',
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
        src: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/3.png?tr=w-520,h-330,q-80,f-auto',
        alt: 'Make Platinum Partner Award'
      },
      {
        src: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/4.png?tr=w-520,h-330,q-80,f-auto',
        alt: 'GrowwStacks Team Celebration'
      }
    ]
  },

  // ─── Homepage Case Study Cards ─────────────
  // href = destination case study page
  CASES: [
    {
      title:    'AI Lead Qualification Agent for SaaS Platform',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/AI%20Lead%20Qualification%20Agent%20for%20SaaS%20Platform.jpeg?updatedAt=1771319768887',
      alt:      'AI Lead Qualification Agent for SaaS Platform',
      category: 'SaaS',
      href:     '/case-studies/smart-lead-qualification-ai/'
    },
    {
      title:    'Voice AI for Patient Appointment Booking',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/Voice%20AI%20for%20Patient%20Appointment%20Booking.png?updatedAt=1771320381007',
      alt:      'Voice AI for Patient Appointment Booking',
      category: 'Healthcare',
      href:     '/case-studies/voice-ai-patient-appointment/'
    },
    {
      title:    'AI Chatbot + Social Media Automation for Real Estate',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/AI%20Chatbot%20+%20Social%20Media%20Automation%20for%20Real%20Estate.png?updatedAt=1771325461368',
      alt:      'AI Chatbot + Social Media Automation for Real Estate',
      category: 'Real Estate',
      href:     '/case-studies/ai-chatbot-real-estate/'
    }
  ],

  TESTIMONIALS: {
    andrey: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/Andrey-Avatov-GrowwStacks-Client.png?updatedAt=1771326788524',
      alt: 'Andrey Avetov'
    },
    noor: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/Noor-Israel-GrowwStacks-Client.png?updatedAt=1771326788512',
      alt: 'Noor Webbed'
    },
    ankit: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/Ankit-GrowwStacks-Client.png?updatedAt=1771326788415',
      alt: 'Ankit'
    }
  },

  VIDEOS: {
    hero:   'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/project_lifecycle_explained',
    andrey: 'https://i.ytimg.com/vi/FFxoaHm3MwM/mqdefault.jpg',
    noor:   'https://i.ytimg.com/vi/v3cpr16oHGw/mqdefault.jpg',
    ankit:  'https://i.ytimg.com/vi/lJ5Z52LX4j8/mqdefault.jpg'
  },

  REVIEW_BADGES: {
    google: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/GrowwStacks%20Google%20Review%20Logo.png',
    upwork: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Home%20Page/upwork%20logo.jpeg?updatedAt=1771312194270',
    clutch: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/Top-Clutch-Ai-Consulting-Company-2026.png'
  },

  BRANDING: {
    favicon: 'https://ik.imagekit.io/r2zdlyze2o/GS-Website/GS-favicon.png',
    logo:    'https://ik.imagekit.io/r2zdlyze2o/GS-Website/GS-favicon.png'
  }

};

// ============================================
// Backward compatibility aliases
// ============================================
window.IMAGES = SITE.images;
const IMAGES  = SITE.images;