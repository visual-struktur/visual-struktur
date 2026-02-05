// =============================================================================
// PROJECTS DATA
// Данные всех проектов для страницы Portfolio
// =============================================================================

const PROJECTS = {
  // -------------------------------------------------------------------------
  // VILANA EVENT & CATERING
  // -------------------------------------------------------------------------
  vilana: {
    kicker: "Case Study · Live",
    title: "Vilana Event & Catering",
    sub: "Launch-Paket: Branding + zweisprachige Website (DE/RU) mit klarer Angebotslogik und Kontakt-Flow. Fokus: Wiedererkennung, Vertrauen und lokale Sichtbarkeit. PSI: Mobile 94 / Desktop 100.",
    img: "images/projekt-vilana-detail.webp",
    imgAlt: "Vilana Case Visual",
    goal: "Von null auf professionellen Auftritt: Marke aufbauen, Leistungen sofort verständlich machen und Anfragen vereinfachen.",
    bullets: [
      "Branding: Logo, Visitenkarte & Werbemittel (konsistenter Markenauftritt)",
      "Website: zweisprachig (DE/RU) mit klarer Seitenstruktur & Angebotslogik",
      "Kontakt-Flow: Formular mit Validation, Success-Message (ohne Reload) & Anti-Spam",
      "Local SEO: Onpage-Basis + strukturierte Daten (JSON-LD / LocalBusiness)"
    ],
    stack: ["HTML", "Tailwind", "DE/RU", "Local SEO", "Form + Anti-Spam"],
    link: "https://www.vilana-event.de",
    linkLabel: "Website ansehen",
    // Branding Assets (optional)
    branding: [
      { src: "images/vilana-logo.webp", alt: "Vilana Logo" },
      { src: "images/vilana-visitenkarte.webp", alt: "Vilana Visitenkarte" },
      { src: "images/vilana-werbung.webp", alt: "Vilana Werbemittel" }
    ]
  },

  // -------------------------------------------------------------------------
  // VISUAL STRUKTUR (eigener Auftritt)
  // -------------------------------------------------------------------------
  visualstruktur: {
    kicker: "Case Study · Live",
    title: "Visual Struktur – eigene Website",
    sub: "Agentur-Auftritt mit klarer Positionierung, strukturierten Leistungen und durchdachter User Journey. Fokus: Vertrauen, Klarheit und Conversion.",
    img: "images/projekt-visual-detail.webp",
    imgAlt: "Visual Struktur Case Visual",
    goal: "Eigenen Standard zeigen: Was wir verkaufen, setzen wir selbst um – Premium UI, SEO-Basis, System-Setup.",
    bullets: [
      "Positionierung: klare Aussage „Digitale Systeme statt nur schöne Webseiten“",
      "Struktur: Hero → Leistungen → Branchen → Prozess → Projekte → Kontakt",
      "UI-System: konsistente Komponenten (cards, buttons, panels), glassmorphism, premium feel",
      "SEO-Basis: semantische Struktur, Meta-Setup, interne Verlinkung",
      "Kontakt-Flow: Formular mit Validation, Spam-Schutz, DSGVO-Checkbox"
    ],
    stack: ["HTML", "Tailwind", "Semantic Structure", "SEO-Setup", "Premium UI"],
    link: "https://visual-struktur.de",
    linkLabel: "Website ansehen"
  },

  // -------------------------------------------------------------------------
  // AUTO ATELIER (Demo)
  // -------------------------------------------------------------------------
  autoatelier: {
    kicker: "Case Study · Live",
    title: "Auto Atelier – Demo",
    sub: "Branchen-Demo für Kfz/Autohaus: klare Struktur, schnelle Performance, CTA & lokale SEO-Basis.",
    img: "images/skrin-auto-detal.webp",
    imgAlt: "Auto Atelier Case Visual",
    goal: "Eine klare Landing, die Leistungen schnell erklärt und Anfragen sauber einsammelt – ideal für lokale Kfz-Betriebe.",
    bullets: [
      "Hero + USP: sofort verständlich, klare Service-Blöcke",
      "Conversion: CTA-Flow, Kontaktstrecke, Trust-Elemente",
      "Local SEO Basis: thematische Sections, saubere Semantik",
      "Performance: optimierte Bilder, stabile Layouts"
    ],
    stack: ["HTML", "Tailwind", "SEO-Basics", "Performance-Setup"],
    link: "https://visual-struktur.github.io/vs-demo-auto-atelier/",
    linkLabel: "Website ansehen"
  }
};

// ✅ Make global for nonUNTIME scripts
window.PROJECTS = PROJECTS;

// (Optional / Node) — harmless in browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS };
}
