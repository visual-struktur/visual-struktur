(() => {
    "use strict";

    // ====== CONFIG (замени на свои значения) ======
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID_OWNER = "YOUR_TEMPLATE_ID_OWNER"; // письмо тебе
    const EMAILJS_TEMPLATE_ID_CLIENT = "YOUR_TEMPLATE_ID_CLIENT"; // авто-подтверждение клиенту (опционально)

    // Если хочешь лог в Google Sheets через Apps Script Webhook:
    const SHEETS_WEBHOOK_URL = ""; // например: https://script.google.com/macros/s/XXXX/exec

    // ====== Helpers ======
    const qs = (s, r = document) => r.querySelector(s);
    const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

    const pad = (n) => String(n).padStart(2, "0");
    const makeId = () => {
        const d = new Date();
        const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
        return `VS-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${rand}`;
    };

    const escapeHtml = (str = "") =>
        str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));

    const servicesValue = () =>
        qsa('input[name="service"]:checked').map(i => i.value).join(", ") || "—";

    const getFormData = (form) => {
        const fd = new FormData(form);
        return {
            inquiryId: fd.get("inquiryId") || "",
            pageUrl: fd.get("pageUrl") || "",
            referrer: fd.get("referrer") || "",
            services: servicesValue(),
            timeline: fd.get("timeline") || "",
            budget: fd.get("budget") || "",
            website: fd.get("website") || "",
            goal: fd.get("goal") || "",
            name: fd.get("name") || "",
            email: fd.get("email") || "",
            phone: fd.get("phone") || "",
            companyName: fd.get("companyName") || "",
            message: fd.get("message") || "",
            // honeypot:
            trap: fd.get("company") || "",
            createdAt: new Date().toISOString()
        };
    };

    const buildSummaryHtml = (d) => {
        // компактный “документ” для письма/печати
        return `
      <div style="font-family:Arial,sans-serif;line-height:1.35">
        <h2 style="margin:0 0 8px">Projektanfrage</h2>
        <div style="color:#555;margin:0 0 10px">
          <strong>ID:</strong> ${escapeHtml(d.inquiryId)}<br/>
          <strong>Datum:</strong> ${escapeHtml(new Date().toLocaleString())}
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7;width:32%"><strong>Leistung</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.services)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Zeitplan</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.timeline)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Budget</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.budget || "Noch offen")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Ziel</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.goal)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Website</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.website || "—")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Kontakt</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.name)} · ${escapeHtml(d.email)} · ${escapeHtml(d.phone || "—")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Firma/Branche</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.companyName || "—")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f7f7f7"><strong>Details</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(d.message || "—")}</td></tr>
        </table>

        <p style="color:#666;font-size:12px;margin-top:10px">
          Seite: ${escapeHtml(d.pageUrl)}<br/>
          Referrer: ${escapeHtml(d.referrer || "—")}
        </p>
      </div>
    `;
    };

    const openPrint = (summaryHtml) => {
        const w = window.open("", "_blank", "width=900,height=700");
        if (!w) return;
        w.document.open();
        w.document.write(`
      <!doctype html><html><head><meta charset="utf-8">
      <title>Projektanfrage – Druck</title>
      <style>
        body{margin:24px;font-family:Arial,sans-serif}
        @media print{body{margin:0}}
      </style>
      </head><body>${summaryHtml}</body></html>
    `);
        w.document.close();
        w.focus();
        // можно автопечать, но я оставил вручную, чтобы не раздражало
        // w.print();
    };

    // ====== Main ======
    document.addEventListener("DOMContentLoaded", () => {
        const form = qs("#contactForm");
        if (!form) return;

        // meta
        qs("#inquiryId").value = makeId();
        qs("#pageUrl").value = window.location.href;
        qs("#referrer").value = document.referrer || "";

        const statusEl = qs("#formStatus");
        const btn = qs("#submitBtn");
        const printBtn = qs("#printBtn");

        // EmailJS init
        if (window.emailjs) {
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        } else {
            console.warn("[Kontakt] EmailJS not loaded.");
        }

        printBtn?.addEventListener("click", () => {
            const data = getFormData(form);
            if (!data.inquiryId) data.inquiryId = makeId();
            openPrint(buildSummaryHtml(data));
        });

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // honeypot
            const data = getFormData(form);
            if (data.trap) return;

            // basic validation
            const requiredIds = ["timeline", "goal", "name", "email", "privacy"];
            for (const id of requiredIds) {
                const el = qs("#" + id);
                if (!el) continue;
                const ok = (el.type === "checkbox") ? el.checked : String(el.value || "").trim().length > 0;
                if (!ok) {
                    el.focus();
                    statusEl.textContent = "Bitte Pflichtfelder ausfüllen.";
                    return;
                }
            }

            // require at least one service checkbox (optional but recommended)
            const anyService = qsa('input[name="service"]:checked').length > 0;
            if (!anyService) {
                statusEl.textContent = "Bitte mindestens eine Leistung auswählen.";
                return;
            }

            // prepare summary
            if (!data.inquiryId) data.inquiryId = makeId();
            const summaryHtml = buildSummaryHtml(data);

            // UI state
            btn.disabled = true;
            btn.style.opacity = "0.7";
            statusEl.textContent = "Sende…";

            try {
                // 1) send to OWNER
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_OWNER, {
                    inquiry_id: data.inquiryId,
                    services: data.services,
                    timeline: data.timeline,
                    budget: data.budget || "Noch offen",
                    goal: data.goal,
                    website: data.website || "—",
                    name: data.name,
                    email: data.email,
                    phone: data.phone || "—",
                    company: data.companyName || "—",
                    message: data.message || "—",
                    page_url: data.pageUrl,
                    referrer: data.referrer || "—",
                    summary_html: summaryHtml
                });

                // 2) send confirmation to CLIENT (optional)
                if (EMAILJS_TEMPLATE_ID_CLIENT) {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CLIENT, {
                        to_email: data.email,
                        to_name: data.name,
                        inquiry_id: data.inquiryId,
                        services: data.services,
                        timeline: data.timeline,
                        goal: data.goal,
                        summary_html: summaryHtml
                    });
                }

                // 3) log to Sheets (optional)
                if (SHEETS_WEBHOOK_URL) {
                    fetch(SHEETS_WEBHOOK_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    }).catch(() => { });
                }

                statusEl.textContent = "Gesendet. Danke! Bestätigung per E-Mail ist unterwegs.";
                // обновим ID для следующей заявки
                form.reset();
                qs("#inquiryId").value = makeId();
                qs("#pageUrl").value = window.location.href;
                qs("#referrer").value = document.referrer || "";

                // сразу открыть печать/PDF для тебя (можно отключить)
                // openPrint(summaryHtml);

            } catch (err) {
                console.error(err);
                statusEl.textContent = "Fehler beim Senden. Bitte später erneut versuchen.";
            } finally {
                btn.disabled = false;
                btn.style.opacity = "";
            }
        });
    });
})();
