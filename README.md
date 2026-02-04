diff --git a/c:\Users\Nikolajm\OneDrive\Desktop\Visual-Struktur\README.md b/c:\Users\Nikolajm\OneDrive\Desktop\Visual-Struktur\README.md
new file mode 100644
--- /dev/null
+++ b/c:\Users\Nikolajm\OneDrive\Desktop\Visual-Struktur\README.md
@@ -0,0 +1,120 @@
+# Visual Struktur — Website
+
+[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-success)](#deployment-github-pages)
+[![Made with Tailwind CSS](https://img.shields.io/badge/Style-TailwindCSS-0ea5e9)](#tech-stack)
+[![Static Site](https://img.shields.io/badge/App-Static%20HTML%2FCSS%2FJS-111827)](#projektueberblick)
+
+Offizielle Website von **Visual Struktur** (Deutschland): Webdesign • Digitalisierung • SEO + GEO (AI-Search).  
+Dieses Repository enthält den kompletten statischen Webauftritt (HTML/CSS/JS) und wird über **GitHub Pages** deployed.
+
+## 🌐 Live
+- GitHub Pages: https://visual-struktur.github.io/visual-struktur/
+- (Optional) Custom Domain: https://YOUR-DOMAIN.de
+
+---
+
+## Projektüberblick
+- **Statischer Multi-Page-Auftritt** (mehrere `.html`-Seiten im Root)
+- Assets (Bilder, JS, CSS) in klaren Ordnern
+- Tailwind vorhanden (`tailwind.config.js`) — Build optional/abhängig von `package.json`
+
+---
+
+## Seiten (Root)
+- `index.html` — Startseite
+- `leistungen.html` — Leistungen
+- `prozess.html` — Prozess
+- `projekte.html` — Projekte
+- `branchen.html` — Branchen
+- `kontakt.html` — Kontakt
+- `impressum.html` / `datenschutz.html` / `agb.html` — Rechtliches
+
+---
+
+## Tech Stack
+- HTML / CSS / JavaScript (Vanilla)
+- Tailwind CSS (`tailwind.config.js`)
+- GitHub Pages (Deployment)
+
+---
+
+## Projektstruktur
+```text
+.
+├─ images/                # Bilder (WebP usw.)
+├─ js/                    # Frontend JavaScript
+├─ css/                   # CSS (falls genutzt)
+├─ src/                   # Tailwind-Quellen / Input
+├─ assets/                # weitere Assets (optional)
+├─ styles.css             # Projekt-Styles (falls genutzt)
+├─ tailwind.config.js
+├─ index.html
+└─ *.html                 # weitere Seiten
+```
+
+---
+
+## Lokal entwickeln
+**Option A: VS Code Live Server (empfohlen)**
+- Extension Live Server installieren
+- `index.html` öffnen
+- `Go Live` klicken
+
+**Option B: Lokaler HTTP Server (Python)**
+```bash
+python -m http.server 5173
+```
+Im Browser öffnen: `http://localhost:5173`
+
+---
+
+## Tailwind Build (falls aktiv)
+Wenn Tailwind per Node/NPM kompiliert wird:
+```bash
+npm install
+npm run build
+```
+Hinweis: Die genauen Input/Output-Pfade hängen von `package.json` ab  
+(z. B. `src/input.css` → `css/...` oder `assets/css/...`).
+
+---
+
+## Deployment (GitHub Pages)
+Der Deploy erfolgt über GitHub Pages (typisch via GitHub Actions / Pages).
+
+Prüfen:
+- Repository → Settings → Pages
+- Source: GitHub Actions (oder alternativ Branch-Deploy)
+- Bei Branch-Deploy: `main` + `/` (root)
+
+---
+
+## Branching & Änderungen (Best Practice)
+Empfohlenes Vorgehen (auch wenn du solo arbeitest):
+- `main` bleibt stabil (deploybar)
+- Änderungen über Feature-Branch: `feature/<kurzname>` (z. B. `feature/hero-overlay`)
+- Merge zurück nach `main`
+
+Optional (empfohlen):
+- Branch Protection für `main`: kein Force-Push, kein Löschen (optional: Merge nur via PR)
+
+---
+
+## Qualitäts-Checkliste
+Vor dem Push auf `main`:
+- Mobile Layout geprüft (iOS/Android Breakpoints)
+- Lighthouse/Performance grob ok
+- Bilder optimiert (`.webp`, passende Größe)
+- Keine toten Links / falsche Pfade
+- SEO-Basics: Title/Description pro Seite, Canonical/Hreflang falls genutzt
+
+---
+
+## Sicherheit
+- Keine Secrets/Tokens im Repo speichern (API Keys, Mail-Keys etc.)
+- Falls Formulare genutzt werden: Spam-Schutz (Honeypot/Captcha) + DSGVO-Hinweise
+
+---
+
+## Lizenz
+© Visual Struktur. Nutzung von Code und Design nur mit ausdrücklicher Zustimmung.
