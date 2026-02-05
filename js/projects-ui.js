// =============================================================================
// PROJECTS UI
// Логика фильтрации и drawer (slide-over panel) для проектов
// =============================================================================

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------------------------------------------------------------------------
  // FILTER LOGIC
  // ---------------------------------------------------------------------------
  function initProjectFilter() {
    const filterBtns = $$(".proj-filter");
    const cards = $$(".proj-card");

    if (!filterBtns.length || !cards.length) return;

    function setActive(el) {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      el.classList.add("is-active");
    }

    function matches(card, filter) {
      if (filter === "all") return true;
      const cats = (card.dataset.cats || "").split(/\s+/).filter(Boolean);
      return cats.includes(filter);
    }

    filterBtns.forEach(b => {
      b.addEventListener("click", () => {
        const f = b.dataset.filter || "all";
        setActive(b);
        cards.forEach(card => {
          card.style.display = matches(card, f) ? "" : "none";
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // DRAWER (SLIDE-OVER PANEL)
  // ---------------------------------------------------------------------------
  function initProjectDrawer() {
    const overlay = $("#caseOverlay");
    const panel = $("#casePanel");
    const backdrop = $("#caseBackdrop");
    const closeBtn = $("#caseClose");

    if (!overlay || !panel) return;

    // Content elements
    const caseKicker = $("#caseKicker");
    const caseTitle = $("#caseTitle");
    const caseSub = $("#caseSub");
    const caseImg = $("#caseImg");
    const caseGoal = $("#caseGoal");
    const caseBullets = $("#caseBullets");
    const caseStack = $("#caseStack");
    const caseBranding = $("#caseBranding");
    const caseBrandingGrid = $("#caseBrandingGrid");
    const caseLinksWrap = $("#caseLinksWrap");
    const caseLink = $("#caseLink");

    // Required guards
    const required = [
      closeBtn,
      caseKicker,
      caseTitle,
      caseSub,
      caseImg,
      caseGoal,
      caseBullets,
      caseStack,
      caseLinksWrap,
      caseLink
    ];

    if (required.some(x => !x)) {
      console.error("Projects Drawer: missing required elements", {
        closeBtn,
        caseKicker,
        caseTitle,
        caseSub,
        caseImg,
        caseGoal,
        caseBullets,
        caseStack,
        caseLinksWrap,
        caseLink
      });
      return;
    }

    let lastFocused = null;

    function isOpen() {
      return !overlay.classList.contains("hidden");
    }

    // -------------------------------------------------------------------------
    // OPEN DRAWER
    // -------------------------------------------------------------------------
    function openDrawer(key) {
      const data = (window.PROJECTS || {})[key];
      if (!data) {
        console.warn("Project key not found:", key, Object.keys(window.PROJECTS || {}));
        return;
      }

      lastFocused = document.activeElement;

      // Base
      caseKicker.textContent = data.kicker || "Case Study";
      caseTitle.textContent = data.title || "—";
      caseSub.textContent = data.sub || "—";
      caseGoal.textContent = data.goal || "—";

      // Main image
      if (data.img) {
        caseImg.src = data.img;
        caseImg.alt = data.imgAlt || data.title || "Case Visual";
        caseImg.classList.remove("hidden");
      } else {
        caseImg.classList.add("hidden");
        caseImg.removeAttribute("src");
        caseImg.alt = "";
      }

      // Bullets
      caseBullets.innerHTML = "";
      (data.bullets || []).forEach(txt => {
        const li = document.createElement("li");
        li.textContent = "• " + txt;
        caseBullets.appendChild(li);
      });

      // Stack
      caseStack.innerHTML = "";
      (data.stack || []).forEach(tag => {
        const span = document.createElement("span");
        span.className = "panel rounded-full px-3 py-1";
        span.textContent = tag;
        caseStack.appendChild(span);
      });

      // Branding assets (optional)
      if (caseBranding && caseBrandingGrid) {
        const items = Array.isArray(data.branding) ? data.branding : [];
        if (items.length) {
          caseBrandingGrid.innerHTML = "";
          items.forEach(item => {
            if (!item?.src) return;

            const a = document.createElement("a");
            a.href = item.src;
            a.target = "_blank";
            a.rel = "noopener";
            a.className = "block";

            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt || "";
            img.className = "block w-full h-32 object-cover rounded-xl panel";
            img.loading = "lazy";
            img.decoding = "async";

            a.appendChild(img);
            caseBrandingGrid.appendChild(a);
          });

          caseBranding.classList.remove("hidden");
        } else {
          caseBranding.classList.add("hidden");
        }
      }

      // Link
      if (data.link) {
        caseLink.href = data.link;
        caseLink.textContent = data.linkLabel || "Website ansehen";
        caseLinksWrap.classList.remove("hidden");
      } else {
        caseLinksWrap.classList.add("hidden");
        caseLink.href = "#";
        caseLink.textContent = "";
      }

      // Show overlay
      overlay.classList.remove("hidden");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("overflow-hidden");

      // Animate in
      requestAnimationFrame(() => {
        panel.classList.remove("translate-x-full");
        closeBtn.focus();
      });
    }

    // -------------------------------------------------------------------------
    // CLOSE DRAWER
    // -------------------------------------------------------------------------
    function closeDrawer() {
      if (!isOpen()) return;

      panel.classList.add("translate-x-full");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("overflow-hidden");

      // Fallback close if transitionend не сработал
      let closed = false;
      const finish = () => {
        if (closed) return;
        closed = true;
        overlay.classList.add("hidden");
        panel.removeEventListener("transitionend", finish);
        if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      };

      panel.addEventListener("transitionend", finish);
      window.setTimeout(finish, 380); // fallback ~ duration 300ms
    }

    // -------------------------------------------------------------------------
    // EVENT LISTENERS
    // -------------------------------------------------------------------------
    // Open by click
    $$(".proj-open").forEach(btn => {
      btn.addEventListener("click", () => openDrawer(btn.dataset.project));
    });

    // Close
    if (backdrop) backdrop.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    // Escape
    window.addEventListener("keydown", (e) => {
      if (!isOpen()) return;
      if (e.key === "Escape") closeDrawer();
    });
  }

  // ---------------------------------------------------------------------------
  // INIT
  // ---------------------------------------------------------------------------
  function init() {
    if (typeof window.PROJECTS === "undefined") {
      console.error("PROJECTS not loaded! Ensure projects-data.js is included before projects-ui.js");
      return;
    }
    initProjectFilter();
    initProjectDrawer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
