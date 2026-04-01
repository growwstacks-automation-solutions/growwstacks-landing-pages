import { widgetData } from './widget-data.js';

export function initGrowwStacksWidget(config = {}) {
  const {
    cycleTime = 6000,
    containerId = 'gs-spw'
  } = config;

  injectStyles();

  const root = document.getElementById(containerId);
  if (!root) {
    console.error(`GrowwStacks Widget Error: Container #${containerId} not found`);
    return;
  }

  root.innerHTML = '';

  const records = widgetData.map((item) => ({
    clientName: item.clientName || 'Unknown Client',
    projectName: item.projectName || 'New Project',
    projectType: item.projectType || 'Service',
    country: item.country || '',
    logoUrl: item.logoUrl || '',
    color: randomColor(),
    init: getInitials(item.clientName || 'UC'),
    mapColors: getCountryMapColors(item.country || '')
  }));

  if (!records.length) {
    console.warn('No widget records found');
    return;
  }

  let idx = 0;
  let interval;

  function showNext() {
    const rec = records[idx++ % records.length];
    const existing = root.querySelector('.gs-spw-card');

    if (existing) {
      existing.classList.add('gs-spw-leaving');
      setTimeout(() => {
        existing.remove();
        root.appendChild(buildCard(rec, cycleTime, root));
      }, 280);
    } else {
      root.appendChild(buildCard(rec, cycleTime, root));
    }
  }

  showNext();
  interval = setInterval(showNext, cycleTime);

  return () => clearInterval(interval);
}

function buildCard(rec, cycleTime, root) {
  const card = document.createElement('div');
  card.className = 'gs-spw-card';

  // Map
  const mapDiv = document.createElement('div');
  mapDiv.className = 'gs-spw-map';
  mapDiv.innerHTML = makeFakeMapSVG(rec.mapColors) +
    '<div class="gs-spw-map-ring"></div><div class="gs-spw-map-pin"></div>';
  card.appendChild(mapDiv);

  // Body
  const body = document.createElement('div');
  body.className = 'gs-spw-body';

  // Logo / Avatar
  const avWrap = document.createElement('div');
  avWrap.className = 'gs-spw-av-wrap';

  let av;
  if (rec.logoUrl) {
    av = document.createElement('img');
    av.className = 'gs-spw-logo';
    av.src = rec.logoUrl;
    av.alt = rec.clientName;
  } else {
    av = document.createElement('div');
    av.className = 'gs-spw-av';
    av.style.background = rec.color;
    av.textContent = rec.init;
  }

  const live = document.createElement('div');
  live.className = 'gs-spw-live';

  avWrap.append(av, live);

  // Text
  const txt = document.createElement('div');
  txt.className = 'gs-spw-text';

  const nm = document.createElement('div');
  nm.className = 'gs-spw-name';
  nm.textContent = rec.clientName;

  const act = document.createElement('div');
  act.className = 'gs-spw-action';
  act.innerHTML = `started <b>${rec.projectName}</b>`;

  const meta = document.createElement('div');
  meta.className = 'gs-spw-meta';
  meta.innerHTML = `
    <div class="gs-spw-loc">
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path d="M5 .5C3.07.5 1.5 2.07 1.5 4c0 2.63 3.5 5.5 3.5 5.5S8.5 6.63 8.5 4C8.5 2.07 6.93.5 5 .5Zm0 4.75A1.25 1.25 0 1 1 5 3a1.25 1.25 0 0 1 0 2.25Z" fill="#c9a84c"/>
      </svg>
      ${rec.country}
    </div>
    <div class="gs-spw-badge">${rec.projectType}</div>
  `;

  txt.append(nm, act, meta);
  body.append(avWrap, txt);
  card.appendChild(body);

  // Progress bar
  const prog = document.createElement('div');
  prog.className = 'gs-spw-progress';
  prog.style.setProperty('--dur', `${cycleTime}ms`);
  card.appendChild(prog);

  // Close
  const x = document.createElement('button');
  x.className = 'gs-spw-x';
  x.innerHTML = '&#x2715;';
  x.setAttribute('aria-label', 'Dismiss');
  x.onclick = () => root.remove();
  card.appendChild(x);

  return card;
}

function makeFakeMapSVG(colors) {
  return `
    <svg class="gs-spw-map-svg" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="${colors[0]}"/>
      <rect width="64" height="64" fill="url(#grd)"/>
      <defs>
        <linearGradient id="grd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colors[1]}" stop-opacity=".6"/>
          <stop offset="100%" stop-color="${colors[0]}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <line x1="0" y1="20" x2="64" y2="20" stroke="rgba(255,255,255,.55)" stroke-width="1"/>
      <line x1="0" y1="40" x2="64" y2="40" stroke="rgba(255,255,255,.4)" stroke-width=".8"/>
      <line x1="22" y1="0" x2="22" y2="64" stroke="rgba(255,255,255,.5)" stroke-width="1"/>
      <line x1="44" y1="0" x2="44" y2="64" stroke="rgba(255,255,255,.35)" stroke-width=".8"/>
      <line x1="0" y1="48" x2="64" y2="14" stroke="rgba(255,255,255,.3)" stroke-width=".8"/>
      <rect x="6" y="6" width="12" height="9" rx="1" fill="${colors[2]}"/>
      <rect x="26" y="6" width="14" height="10" rx="1" fill="${colors[2]}"/>
      <rect x="48" y="6" width="10" height="8" rx="1" fill="${colors[2]}"/>
      <rect x="6" y="26" width="10" height="10" rx="1" fill="${colors[2]}"/>
      <rect x="48" y="26" width="12" height="10" rx="1" fill="${colors[2]}"/>
      <rect x="6" y="46" width="14" height="12" rx="1" fill="${colors[2]}"/>
      <rect x="28" y="46" width="10" height="12" rx="1" fill="${colors[2]}"/>
      <rect x="46" y="46" width="12" height="12" rx="1" fill="${colors[2]}"/>
    </svg>
  `;
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('') || 'GS';
}

function randomColor() {
  const colors = ['#1d4e89', '#2d6a4f', '#6b2d8b', '#8b2252', '#7d6608'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getCountryMapColors(country = '') {
  const c = country.toLowerCase();

  if (c.includes('us') || c.includes('united states')) {
    return ['#d8e8ff', '#9fc4ff', 'rgba(80,120,180,.4)'];
  }
  if (c.includes('india')) {
    return ['#fff0d8', '#ffd39f', 'rgba(180,120,80,.4)'];
  }
  if (c.includes('uk') || c.includes('united kingdom')) {
    return ['#e2e6f5', '#b7c2e8', 'rgba(90,110,170,.4)'];
  }
  if (c.includes('uae')) {
    return ['#f1eadb', '#d6c29a', 'rgba(150,120,80,.4)'];
  }
  if (c.includes('canada')) {
    return ['#fbe1e1', '#efb0b0', 'rgba(180,80,80,.4)'];
  }
  if (c.includes('australia')) {
    return ['#e1f1fb', '#b0d9ef', 'rgba(80,140,180,.4)'];
  }

  return ['#e8dcc8', '#d4c4a0', 'rgba(180,160,130,.5)'];
}

function injectStyles() {
  if (document.getElementById('gs-widget-styles')) return;

  const style = document.createElement('style');
  style.id = 'gs-widget-styles';
  style.textContent = `
    #gs-spw{
      position:fixed;
      bottom:20px;
      left:20px;
      z-index:2147483647;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
      width:320px;
    }

    .gs-spw-card{
      display:flex;
      align-items:center;
      background:#fff;
      border-radius:10px;
      box-shadow:0 4px 24px rgba(0,0,0,0.14),0 1px 4px rgba(0,0,0,0.07);
      border:1px solid rgba(0,0,0,0.07);
      overflow:hidden;
      cursor:default;
      animation:gs-in .42s cubic-bezier(.34,1.56,.64,1) both;
      position:relative;
    }

    @keyframes gs-in{
      from{opacity:0;transform:translateY(16px) scale(.95)}
      to{opacity:1;transform:translateY(0) scale(1)}
    }

    @keyframes gs-out{
      from{opacity:1;transform:translateY(0) scale(1)}
      to{opacity:0;transform:translateY(-8px) scale(.97)}
    }

    .gs-spw-card.gs-spw-leaving{
      animation:gs-out .28s ease forwards;
    }

    .gs-spw-map{
      flex-shrink:0;
      width:64px;
      height:64px;
      position:relative;
      overflow:hidden;
      background:#dde3e8;
    }

    .gs-spw-map-svg{
      width:100%;
      height:100%;
      display:block;
    }

    .gs-spw-map-pin{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:10px;
      height:10px;
      background:#c9a84c;
      border-radius:50%;
      border:2px solid #fff;
      box-shadow:0 1px 3px rgba(0,0,0,.3);
      z-index:2;
    }

    .gs-spw-map-ring{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:20px;
      height:20px;
      border:1.5px solid #c9a84c;
      border-radius:50%;
      animation:gs-ping 2.2s ease-out infinite;
    }

    @keyframes gs-ping{
      0%{transform:translate(-50%,-50%) scale(1);opacity:.9}
      100%{transform:translate(-50%,-50%) scale(2.8);opacity:0}
    }

    .gs-spw-body{
      display:flex;
      align-items:center;
      gap:9px;
      padding:10px 12px;
      flex:1;
      min-width:0;
    }

    .gs-spw-av-wrap{
      position:relative;
      flex-shrink:0;
    }

    .gs-spw-av,
    .gs-spw-logo{
      width:46px;
      height:46px;
      border-radius:8px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:12px;
      font-weight:800;
      color:#fff;
      letter-spacing:.3px;
      object-fit:cover;
      background:#f2f2f2;
      border:1px solid rgba(0,0,0,.06);
    }

    .gs-spw-live{
      position:absolute;
      bottom:-2px;
      right:-2px;
      width:9px;
      height:9px;
      background:#22c55e;
      border-radius:50%;
      border:1.5px solid #fff;
      animation:gs-blink 2.2s ease-in-out infinite;
    }

    @keyframes gs-blink{
      0%,100%{opacity:1}
      50%{opacity:.25}
    }

    .gs-spw-text{
      flex:1;
      min-width:0;
    }

    .gs-spw-name{
      font-size:12px;
      font-weight:700;
      color:#111;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .gs-spw-action{
      font-size:11px;
      color:#555;
      margin-top:1px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .gs-spw-action b{
      color:#111;
      font-weight:600;
    }

    .gs-spw-meta{
      margin-top:3px;
      display:flex;
      align-items:center;
      gap:5px;
      flex-wrap:wrap;
    }

    .gs-spw-loc{
      font-size:10px;
      color:#999;
      display:flex;
      align-items:center;
      gap:2px;
    }

    .gs-spw-badge{
      font-size:9.5px;
      font-weight:700;
      color:#c9a84c;
      background:rgba(201,168,76,.1);
      border-radius:3px;
      padding:1px 5px;
      text-transform:uppercase;
      letter-spacing:.4px;
    }

    .gs-spw-x{
      position:absolute;
      top:6px;
      right:6px;
      width:18px;
      height:18px;
      background:rgba(0,0,0,.28);
      border:none;
      border-radius:50%;
      color:#fff;
      font-size:11px;
      cursor:pointer;
      padding:0;
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0;
      transition:opacity .15s;
    }

    #gs-spw:hover .gs-spw-x{
      opacity:1;
    }

    .gs-spw-progress{
      position:absolute;
      bottom:0;
      left:0;
      height:2px;
      background:#c9a84c;
      width:100%;
      transform-origin:left;
      animation:gs-prog var(--dur,6s) linear forwards;
    }

    @keyframes gs-prog{
      from{transform:scaleX(1)}
      to{transform:scaleX(0)}
    }
  `;

  document.head.appendChild(style);
}