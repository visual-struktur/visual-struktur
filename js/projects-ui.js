// =============================================================================
// PROJECTS UI
// Логика фильтрации и drawer (slide-over panel) для проектов
// =============================================================================

// -----------------------------------------------------------------------------
// FILTER LOGIC
// -----------------------------------------------------------------------------
function initProjectFilter() {
    const filterBtns = document.querySelectorAll(".proj-filter");
    const cards = document.querySelectorAll(".proj-card");

    if (!filterBtns.length || !cards.length) return;

    function setActive(el) {
        filterBtns.forEach(b => b.classList.remove("is-active"));
        el.classList.add("is-active");
    }

    function matches(card, filter) {
        if (filter === "all") return true;
        const cats = (card.dataset.cats || "").split(" ").filter(Boolean);
        return cats.includes(filter);
    }

    filterBtns.forEach(b => {
        b.addEventListener("click", () => {
            const f = b.dataset.filter;
            setActive(b);
            cards.forEach(card => {
                card.style.display = matches(card, f) ? "" : "none";
            });
        });
    });
}

// -----------------------------------------------------------------------------
// DRAWER (SLIDE-OVER PANEL)
// -----------------------------------------------------------------------------
function initProjectDrawer() {
    const overlay = document.getElementById("caseOverlay");
    const panel = document.getElementById("casePanel");
    const backdrop = document.getElementById("caseBackdrop");
    const closeBtn = document.getElementById("caseClose");

    if (!overlay || !panel) return;

    // Элементы контента
    const caseKicker = document.getElementById("caseKicker");
    const caseTitle = document.getElementById("caseTitle");
    const caseSub = document.getElementById("caseSub");
    const caseImg = document.getElementById("caseImg");
    const caseGoal = document.getElementById("caseGoal");
    const caseBullets = document.getElementById("caseBullets");
    const caseStack = document.getElementById("caseStack");
    const caseBranding = document.getElementById("caseBranding");
    const caseBrandingGrid = document.getElementById("caseBrandingGrid");
    const caseLinksWrap = document.getElementById("caseLinksWrap");
    const caseLink = document.getElementById("caseLink");

    let lastFocused = null;

    // -------------------------------------------------------------------------
    // OPEN DRAWER
    // -------------------------------------------------------------------------
    function openDrawer(key) {
        const data = PROJECTS[key];
        if (!data) return;

        lastFocused = document.activeElement;

        // Базовая информация
        caseKicker.textContent = data.kicker || "Case Study";
        caseTitle.textContent = data.title || "—";
        caseSub.textContent = data.sub || "—";
        caseGoal.textContent = data.goal || "—";

        // Главное изображение
        if (data.img) {
            caseImg.src = data.img;
            caseImg.alt = data.imgAlt || data.title || "Case Visual";
            caseImg.classList.remove("hidden");
        } else {
            caseImg.classList.add("hidden");
            caseImg.removeAttribute("src");
            caseImg.alt = "";
        }

        // Буллеты (Umsetzung)
        caseBullets.innerHTML = "";
        (data.bullets || []).forEach(txt => {
            const li = document.createElement("li");
            li.textContent = "• " + txt;
            caseBullets.appendChild(li);
        });

        // Stack / Setup
        caseStack.innerHTML = "";
        (data.stack || []).forEach(tag => {
            const span = document.createElement("span");
            span.className = "panel rounded-full px-3 py-1";
            span.textContent = tag;
            caseStack.appendChild(span);
        });

        // Branding Assets (опционально)
        if (data.branding && data.branding.length > 0) {
            caseBrandingGrid.innerHTML = "";
            data.branding.forEach(item => {
                const img = document.createElement("img");
                img.src = item.src;
                img.alt = item.alt;
                img.className = "block w-full h-32 object-cover rounded-xl panel";
                img.loading = "lazy";
                img.decoding = "async";
                caseBrandingGrid.appendChild(img);
            });
            caseBranding.classList.remove("hidden");
        } else {
            caseBranding.classList.add("hidden");
        }

        // Ссылка на сайт
        if (data.link) {
            caseLink.href = data.link;
            caseLink.textContent = data.linkLabel || "Website ansehen";
            caseLinksWrap.classList.remove("hidden");
        } else {
            caseLinksWrap.classList.add("hidden");
            caseLink.href = "#";
            caseLink.textContent = "";
        }

        // Показываем overlay
        overlay.classList.remove("hidden");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        // Анимация появления
        requestAnimationFrame(() => {
            panel.classList.remove("translate-x-full");
            closeBtn.focus();
        });
    }

    // -------------------------------------------------------------------------
    // CLOSE DRAWER
    // -------------------------------------------------------------------------
    function closeDrawer() {
        panel.classList.add("translate-x-full");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

        const done = () => {
            overlay.classList.add("hidden");
            panel.removeEventListener("transitionend", done);
            if (lastFocused && typeof lastFocused.focus === "function") {
                lastFocused.focus();
            }
        };
        panel.addEventListener("transitionend", done);
    }

    // -------------------------------------------------------------------------
    // EVENT LISTENERS
    // -------------------------------------------------------------------------
    // Открытие по клику на кнопку "Details"
    document.querySelectorAll(".proj-open").forEach(btn => {
        btn.addEventListener("click", () => openDrawer(btn.dataset.project));
    });

    // Закрытие по клику на backdrop
    if (backdrop) {
        backdrop.addEventListener("click", closeDrawer);
    }

    // Закрытие по кнопке
    if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
    }

    // Закрытие по Escape
    window.addEventListener("keydown", (e) => {
        const isOpen = !overlay.classList.contains("hidden");
        if (!isOpen) return;
        if (e.key === "Escape") closeDrawer();
    });
}

// -----------------------------------------------------------------------------
// INIT
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    initProjectFilter();
    initProjectDrawer();
});
