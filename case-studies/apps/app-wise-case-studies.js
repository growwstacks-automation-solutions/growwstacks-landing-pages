(function () {
  "use strict";

  let activeFilter = "all";
  let visibleCount = 12;
  const STEP = 12;
  let shuffledCards = [];

  function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

  function getGrid() {
    return document.getElementById("csh-grid");
  }

  function getCountEl() {
    return document.getElementById("csh-count");
  }

  function getCards() {
    return Array.isArray(window.CS_CARDS) ? window.CS_CARDS : [];
  }

  function getAppFilter() {
    const grid = getGrid();
    if (!grid) return null;
    return (grid.getAttribute("data-app") || "").toLowerCase();
  }

  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getMetaIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12H4z"/></svg>`;
  }

  function getRoiIcon(type = "trend") {
    if (type === "clock") {
      return `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>`;
    }
    return `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M12 7h5v5"/></svg>`;
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
            alt="${escapeHtml(card.imgAlt || card.title || "")}"
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

            <span class="csh-card-link">View →</span>
          </div>
        </div>
      </a>
    `;
  }

  function getFilteredCards() {
    let cards = getCards();

    // ✅ Category filter
    if (activeFilter !== "all") {
      cards = cards.filter((card) => {
        const category = String(card.category || "").toLowerCase();
        return category.split(/\s+/).includes(activeFilter.toLowerCase());
      });
    }

    // ✅ App filter
    const appFilter = getAppFilter();

    if (appFilter) {
      cards = cards.filter((card) => {
        const apps = Array.isArray(card.app) ? card.app : [];
        return apps.map((a) => a.toLowerCase()).includes(appFilter);
      });
    }

    // 🔥 apply shuffle only once when filter changes
    if (!shuffledCards.length) {
      shuffledCards = shuffleArray(cards);
    }

    return shuffledCards;
  }

  function updateCount(visible, total) {
  const el = getCountEl();
  if (!el) return;

  el.innerHTML = `Showing <strong>${visible}</strong> of <strong>${total}</strong> projects`;
}

  function renderCards() {
    const grid = getGrid();
    if (!grid) return;

    const filtered = getFilteredCards();
    const visible = filtered.slice(0, visibleCount);

    grid.innerHTML = visible.map(renderCard).join("");
    updateCount(visible.length, filtered.length);
    const btn = document.getElementById("csh-load-more");

    if (btn) {
      btn.style.display =
        visibleCount >= filtered.length ? "none" : "inline-block";
    }
  }

  function initFilters() {
    const pills = document.querySelectorAll(".csh-pill");
    if (!pills.length) return;

    pills.forEach((btn) => {
      btn.addEventListener("click", function () {
        pills.forEach((p) => p.classList.remove("active"));
        this.classList.add("active");

        activeFilter = this.getAttribute("data-filter") || "all";

        visibleCount = 12; // ✅ reset on filter change
        // 🔥 reset shuffle so new filter gets new random order
shuffledCards = [];
        renderCards();
      });
    });
  }

  let isLoading = false;

  function initLoadMore() {
    const btn = document.getElementById("csh-load-more");
    if (!btn) return;

    btn.addEventListener("click", function () {
      if (isLoading) return; // prevent double click
      isLoading = true;

      const filtered = getFilteredCards();
      visibleCount = Math.min(visibleCount + STEP, filtered.length);
      renderCards();

      setTimeout(() => {
        isLoading = false;
      }, 200);
    });
  }

  function initFAQ() {
    const faqButtons = document.querySelectorAll(".csh-faq-q");

    faqButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !expanded);

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
      console.error("❌ CS_CARDS missing");
      return;
    }

    visibleCount = 12;

    initFilters();
    initLoadMore();
    initFAQ();
    renderCards();
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
})();
