/* =========================================================
    Visual Struktur — Global App JS
    - Active nav highlighting (aria-current="page")
    - Mobile menu toggle (universal + safe outside click)
    - Sticky nav shrink + shadow
    - Footer year
    - Reveal on scroll (IntersectionObserver)
    - FAQ: single-open per .faq group
    Notes:
    - Works even if elements are missing on some pages
    - No dependencies
========================================================= */

(() => {
    "use strict";

    /* =========================
        Helpers
    ========================= */
    const qs = (sel, root = document) => root.querySelector(sel);
    const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const safe = (name, fn) => {
        try {
            fn();
        } catch (e) {
            console.warn(`[VS] ${name} failed:`, e);
        }
    };

    /* =========================
        URL helpers (for nav active)
            - Handles:
            /            -> index.html
            /index.html  -> index.html
            /ru/         -> ru/index.html
            /ru/index.html -> ru/index.html
            - Ignores query/hash automatically in URL parsing
    ========================= */
    const normalizePathname = (pathname) => {
        if (!pathname) return "index.html";

        let p = String(pathname);

        // ensure leading slash consistency
        if (!p.startsWith("/")) p = `/${p}`;

        // folder -> add index.html
        if (p.endsWith("/")) p += "index.html";

        // root -> /index.html
        if (p === "/") p = "/index.html";

        // remove leading slash
        p = p.replace(/^\//, "");

        return p.toLowerCase();
    };

    /* =========================
        1) Footer Year
    ========================= */
    safe("Footer Year", () => {
        const y = qs("#year");
        if (y) y.textContent = String(new Date().getFullYear());
    });

    // =========================
    // Active nav highlighting (GitHub Pages safe)
    // =========================
    const normalizePath = (p) => {
        if (!p) return "";
        // remove hash + query
        p = p.split("#")[0].split("?")[0];

        // if it's a full URL, take pathname
        try { p = new URL(p, window.location.origin).pathname; } catch (e) { }

        // remove leading slash
        p = p.replace(/^\/+/, "");

        // remove GitHub Pages repo prefix (e.g. "visual-struktur/")
        const repo = window.location.pathname.split("/")[1]; // "visual-struktur"
        if (repo && p.startsWith(repo + "/")) p = p.slice(repo.length + 1);

        // treat root as index.html
        if (p === "" || p.endsWith("/")) p += "index.html";

        return p.toLowerCase();
    };

    (() => {
        const current = normalizePath(window.location.pathname);

        document.querySelectorAll('a.nav-link[href]').forEach((a) => {
            const href = a.getAttribute("href");
            const target = normalizePath(href);

            if (target && target === current) {
                a.classList.add("is-active");
                a.setAttribute("aria-current", "page");
            } else {
                a.classList.remove("is-active");
                a.removeAttribute("aria-current");
            }
        });
    })();


    /* =========================
        3) Sticky Nav: shrink + shadow
    ========================= */
    safe("Sticky Nav", () => {
        const nav = qs("#siteNav") || qs(".glass-header");
        if (!nav) return;

        let ticking = false;

        const update = () => {
            const y = window.scrollY || 0;
            nav.classList.toggle("nav-shrink", y > 8);
            nav.classList.toggle("nav-shadow", y > 12);
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
    });

    /* =========================
        4) Mobile Menu Toggle (universal)
        Supports:
        - #menuBtn + #mobileMenu
        - #mobileBtn + #mobileMenu
        - [data-mobile-btn] + [data-mobile-panel]
        Fix:
        - Prevent "open then instantly close" via outside click
    ========================= */
    safe("Mobile Menu", () => {
        const btn = qs("#menuBtn") || qs("#mobileBtn") || qs("[data-mobile-btn]");
        const menu = qs("#mobileMenu") || qs("[data-mobile-panel]");

        if (!btn || !menu) return;

        const isOpen = () => btn.getAttribute("aria-expanded") === "true";

        const open = () => {
            menu.classList.remove("hidden");
            btn.setAttribute("aria-expanded", "true");
        };

        const close = () => {
            menu.classList.add("hidden");
            btn.setAttribute("aria-expanded", "false");
        };

        // Important: ignore the very next outside-click right after opening
        let justOpened = false;

        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const willOpen = !isOpen();
            if (willOpen) {
                justOpened = true;
                setTimeout(() => {
                    justOpened = false;
                }, 0);
                open();
            } else {
                close();
            }
        });

        // Close on link click inside menu
        menu.addEventListener("click", (e) => {
            const a = e.target && e.target.closest ? e.target.closest("a") : null;
            if (a) close();
        });

        // Close on ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") close();
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (justOpened) return;
            if (!isOpen()) return;

            const t = e.target;
            if (t === btn || btn.contains(t) || menu.contains(t)) return;

            close();
        });
    });

    /* =========================
        5) Reveal on scroll
    ========================= */
    safe("Reveal", () => {
        const items = qsa(".reveal");
        if (!items.length) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced || !("IntersectionObserver" in window)) {
            items.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                });
            },
            { root: null, threshold: 0.12 }
        );

        items.forEach((el) => io.observe(el));
    });

    /* =========================
        6) FAQ: open only one per .faq group
    ========================= */
    safe("FAQ single-open", () => {
        qsa(".faq").forEach((faqRoot) => {
            faqRoot.addEventListener(
                "toggle",
                (e) => {
                    const t = e.target;
                    if (t && t.tagName === "DETAILS" && t.open) {
                        qsa("details", faqRoot).forEach((d) => {
                            if (d !== t) d.open = false;
                        });
                    }
                },
                true
            );
        });
    });
})();
