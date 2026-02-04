<div align="center">

<img src="images/logo-visual.png" alt="Visual Struktur Logo" width="220" />

# Visual Struktur — Website

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://visual-struktur.github.io/visual-struktur/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-0ea5e9?style=for-the-badge&logo=tailwindcss&logoColor=white)](#tech-stack)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#tech-stack)
[![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)](#tech-stack)

**Offizielle Website von Visual Struktur (Deutschland)**  
Premium Webdesign · Digitalisierung · SEO + GEO

[🌐 Live](https://visual-struktur.github.io/visual-struktur/) •
[📧 Kontakt](https://visual-struktur.github.io/visual-struktur/kontakt.html) •
[🧩 Leistungen](https://visual-struktur.github.io/visual-struktur/leistungen.html)

</div>

---

## 🧠 Überblick

Dieses Repository enthält den Webauftritt von **Visual Struktur** als **statische Multi-Page Website** (HTML + Tailwind + Vanilla JS), deployt über **GitHub Pages**.

Fokus:
- klare Informationsarchitektur
- performance-first Umsetzung (wenig JS, schlanke Assets)
- conversion-orientierte Seitenlogik
- SEO-Basis + strukturierte Daten (wo vorhanden)

---

## 🌐 Live Demo

| Umgebung | URL |
|---|---|
| Production (GitHub Pages) | https://visual-struktur.github.io/visual-struktur/ |

---

## ✨ Features

- Multi-Page Struktur statt „One-Pager Chaos“
- Mobile-First & responsive
- Semantisches HTML + Basis-Accessibility (ARIA wo sinnvoll)
- SEO-Grundsetup: individuelle Titles/Descriptions, saubere H-Struktur
- Wartbar ohne Framework-Lock-in

---

## 📄 Seiten

- `index.html` — Startseite (Value Prop, Pakete, Prozess, CTA)
- `leistungen.html` — Leistungen / Angebot
- `prozess.html` — Ablauf / Steps / Deliverables
- `projekte.html` — Projekte / Cases
- `branchen.html` — Branchen / Use-Cases
- `kontakt.html` — Kontakt / Anfragefluss
- Rechtliches: `impressum.html`, `datenschutz.html`, `agb.html` (falls vorhanden)

---

## 🛠 Tech Stack

- HTML5
- Tailwind CSS
- Vanilla JavaScript
- GitHub Pages

---

## 📁 Projektstruktur

```text
visual-struktur/
├── index.html
├── leistungen.html
├── prozess.html
├── projekte.html
├── branchen.html
├── kontakt.html
├── impressum.html
├── datenschutz.html
├── agb.html
│
├── images/
├── js/
│   └── main.js
├── css/
│   ├── output.css
│   └── custom.css (optional)
├── src/
│   └── input.css
│
├── tailwind.config.js
├── package.json
└── README.md
💻 Lokale Entwicklung
VS Code Live Server
Live Server installieren (VS Code Extension)

index.html öffnen → Open with Live Server

Python HTTP Server
cd /path/to/visual-struktur
python -m http.server 5173
Browser: http://localhost:5173

🧱 Tailwind Build (optional)
npm install
npm run dev
Production:

npm run build
🚀 Deployment
Deploy via GitHub Pages (Push auf main):

git add .
git commit -m "Update README"
git push origin main
✅ Qualitätssicherung
Mobile Check (320 / 375 / 768 / 1024 / 1440)

Links: keine 404

Console: keine Errors

Formulare: Validierung & UX

Lighthouse optional

🔒 Sicherheit (Basics)
Keine Secrets ins Repo (.env, Tokens, Keys)

Formular Anti-Spam (Honeypot/Timing) falls implementiert

CSP/Headers optional (abhängig vom Hosting)

🗺 Roadmap
 Mehr Case Studies (detailliert)

 Testimonials / Social Proof

 Local-SEO Landing Pages

 Mehr Micro-Interactions ohne Performance-Overhead

 Optional: Mehrsprachigkeit (EN/RU)

📞 Kontakt
Visual Struktur — Hameln, Niedersachsen (DE)
Website: https://visual-struktur.github.io/visual-struktur/
Kontakt: https://visual-struktur.github.io/visual-struktur/kontakt.html

📜 Lizenz
© 2024–2026 Visual Struktur. Alle Rechte vorbehalten.
Kein Open Source. Nutzung/Kopie/Verbreitung nur mit schriftlicher Zustimmung.