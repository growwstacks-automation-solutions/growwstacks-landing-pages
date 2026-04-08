(function () {
  function renderFAQ(targetId, faqData = [], options = {}) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const sectionTitle = options.title || "Got Questions? We've Got Answers.";
    const sectionLabel = options.label || "Frequently Asked Questions";

    target.innerHTML = `
      <section class="faq section" id="faq">
        <div class="container">
          <div style="text-align:center">
            <div class="section-label" style="justify-content:center">${sectionLabel}</div>
            <h2 class="section-title">${sectionTitle}</h2>
          </div>
          <div class="faq-inner">
            ${faqData
              .map(
                (item, index) => `
                <div class="faq-item">
                  <button class="faq-q" data-index="${index}">
                    ${item.question}
                    <span class="faq-arrow">▾</span>
                  </button>
                  <div class="faq-a">
                    <div class="faq-a-inner">${item.answer}</div>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;

    const buttons = target.querySelectorAll(".faq-q");

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const item = this.parentElement;
        const answer = item.querySelector(".faq-a");

        const isOpen = item.classList.contains("active");

        // close all
        target.querySelectorAll(".faq-item").forEach((faqItem) => {
          faqItem.classList.remove("active");
          faqItem.querySelector(".faq-a").style.maxHeight = null;
        });

        // open clicked
        if (!isOpen) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  window.renderFAQ = renderFAQ;
})();