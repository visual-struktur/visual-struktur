(() => {
  "use strict";

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  const pad = (n) => String(n).padStart(2, "0");
  
  const makeId = () => {
    const d = new Date();
    const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
    return `VS-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${rand}`;
  };

  const escapeHtml = (str = "") =>
    String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m]));

  const servicesChecked = () => qsa('input[name="service"]:checked');
  const servicesValue = () => servicesChecked().map(i => i.value).join(", ");

  // Animated label update
  function updateServicesLabel() {
    const lbl = qs("#servicesLabel");
    if (!lbl) return;

    const val = servicesValue();
    
    // Fade out → change → fade in
    lbl.style.opacity = "0";
    lbl.style.transform = "translateY(-5px)";
    
    setTimeout(() => {
      if (!val) {
        lbl.textContent = "Bitte auswählen…";
        lbl.setAttribute("data-empty", "true");
      } else {
        lbl.textContent = val;
        lbl.setAttribute("data-empty", "false");
      }
      
      lbl.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      requestAnimationFrame(() => {
        lbl.style.opacity = "1";
        lbl.style.transform = "translateY(0)";
      });
    }, 150);
  }

  const getData = (form) => {
    const fd = new FormData(form);
    return {
      inquiryId: fd.get("inquiryId") || "",
      services: servicesValue() || "—",
      timeline: fd.get("timeline") || "",
      budget: fd.get("budget") || "Noch offen",
      website: fd.get("website") || "—",
      goal: fd.get("goal") || "",
      name: fd.get("name") || "",
      email: fd.get("email") || "",
      phone: fd.get("phone") || "—",
      companyName: fd.get("companyName") || "—",
      message: fd.get("message") || "—",
      pageUrl: fd.get("pageUrl") || "",
      referrer: fd.get("referrer") || "—"
    };
  };

  const buildPrintHtml = (d) => `
    <div style="font-family:Arial,sans-serif;line-height:1.5;margin:32px;max-width:900px">
      <div style="border-bottom:2px solid #e5e7eb;padding-bottom:16px;margin-bottom:24px">
        <h1 style="margin:0;font-size:28px;color:#111827">Projektanfrage</h1>
        <div style="margin-top:8px;color:#6b7280;font-size:14px">
          <strong>Anfrage-ID:</strong> ${escapeHtml(d.inquiryId)}<br/>
          <strong>Datum:</strong> ${escapeHtml(new Date().toLocaleString('de-DE'))}
        </div>
      </div>
      
      <table style="width:100%;border-collapse:collapse;font-size:15px;margin-bottom:24px">
        <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600"><strong>Gewünschte Leistungen</strong></td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.services)}</td></tr>
        <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb"><strong>Zeitplan</strong></td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.timeline)}</td></tr>
        <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb"><strong>Budgetrahmen</strong></td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.budget)}</td></tr>
        <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb"><strong>Hauptziel</strong></td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.goal)}</td></tr>
        <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb"><strong>Bestehende Website</strong></td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.website)}</td></tr>
      </table>
      
      <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-bottom:16px">
        <h2 style="margin:0 0 12px;font-size:18px;color:#111827">Kontaktdaten</h2>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600">Name</td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.name)}</td></tr>
          <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb">E-Mail</td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.email)}</td></tr>
          <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb">Telefon</td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.phone)}</td></tr>
          <tr><td style="padding:12px;border:1px solid #e5e7eb;background:#f9fafb">Unternehmen/Branche</td><td style="padding:12px;border:1px solid #e5e7eb">${escapeHtml(d.companyName)}</td></tr>
        </table>
      </div>
      
      <div style="border-top:1px solid #e5e7eb;padding-top:16px">
        <h2 style="margin:0 0 12px;font-size:18px;color:#111827">Projektdetails</h2>
        <div style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${escapeHtml(d.message)}</div>
      </div>
      
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px">
        <strong>Anfrage-URL:</strong> ${escapeHtml(d.pageUrl)}<br/>
        <strong>Referrer:</strong> ${escapeHtml(d.referrer)}
      </div>
    </div>
  `;

  const openPrint = (html) => {
    const w = window.open("", "_blank", "width=1000,height=800");
    if (!w) {
      alert("Pop-up wurde blockiert. Bitte Pop-ups für diese Seite erlauben.");
      return;
    }
    w.document.open();
    w.document.write(`
      <!doctype html>
      <html lang="de">
      <head>
        <meta charset="utf-8">
        <title>Projektanfrage — Visual Struktur</title>
        <style>
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    w.document.close();
    
    // Auto-print after load
    w.addEventListener('load', () => {
      setTimeout(() => {
        w.print();
      }, 250);
    });
  };

  // ---------- App Picker (dialog sheets) with animations
  function initSheets() {
    // Open sheet with animation
    qsa("[data-open-sheet]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-open-sheet");
        const dlg = document.getElementById(id);
        if (!dlg) return;
        
        if (typeof dlg.showModal === "function") {
          dlg.showModal();
          
          // Trigger animation
          requestAnimationFrame(() => {
            dlg.style.opacity = "1";
            dlg.style.transform = "scale(1) translateY(0)";
          });
        }
      });
    });

    // Close sheet with animation
    qsa("[data-close-sheet]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dlg = btn.closest("dialog");
        if (!dlg) return;
        
        // Animate out
        dlg.style.opacity = "0";
        dlg.style.transform = "scale(0.95) translateY(20px)";
        
        setTimeout(() => {
          dlg.close();
        }, 250);
      });
    });

    // Pick option (timeline/budget) with feedback
    qsa("[data-pick]").forEach(opt => {
      opt.addEventListener("click", () => {
        const type = opt.getAttribute("data-pick");
        const val = opt.getAttribute("data-value") ?? "";
        const label = opt.getAttribute("data-label") || opt.textContent.trim();

        // Visual feedback
        opt.style.transform = "scale(0.98)";
        setTimeout(() => {
          opt.style.transform = "scale(1)";
        }, 100);

        if (type === "timeline") {
          const input = qs("#timeline");
          const lbl = qs("#timelineLabel");
          
          if (input) input.value = val;
          
          if (lbl) {
            // Animated update
            lbl.style.opacity = "0";
            setTimeout(() => {
              lbl.textContent = label;
              lbl.setAttribute("data-empty", val ? "false" : "true");
              lbl.style.transition = "opacity 0.25s ease";
              lbl.style.opacity = "1";
            }, 150);
          }
          
          qs("#timelineRow")?.classList.remove("vs-error");
          qs("#timelineError")?.classList.add("u-hidden");
        }

        if (type === "budget") {
          const input = qs("#budget");
          const lbl = qs("#budgetLabel");
          
          if (input) input.value = val;
          
          if (lbl) {
            // Animated update
            lbl.style.opacity = "0";
            setTimeout(() => {
              lbl.textContent = label;
              lbl.style.transition = "opacity 0.25s ease";
              lbl.style.opacity = "1";
            }, 150);
          }
        }

        // Close with animation
        const dlg = opt.closest("dialog");
        if (dlg) {
          dlg.style.opacity = "0";
          dlg.style.transform = "scale(0.95) translateY(20px)";
          setTimeout(() => dlg.close(), 250);
        }
      });
    });

    // Click outside → close (premium feel)
    qsa("dialog.vs-sheet").forEach(dlg => {
      dlg.addEventListener("click", (e) => {
        const rect = dlg.getBoundingClientRect();
        const inBox =
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        if (!inBox) {
          dlg.style.opacity = "0";
          dlg.style.transform = "scale(0.95) translateY(20px)";
          setTimeout(() => dlg.close(), 250);
        }
      });
    });

    // Services reset with animation
    const resetBtn = qs("#servicesReset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        // Animate checkboxes
        servicesChecked().forEach((input, idx) => {
          setTimeout(() => {
            input.checked = false;
            const chip = input.closest('.svc-chip');
            if (chip) {
              chip.style.transform = "scale(0.95)";
              setTimeout(() => {
                chip.style.transform = "scale(1)";
              }, 100);
            }
          }, idx * 50);
        });
        
        setTimeout(updateServicesLabel, 200);
      });
    }

    // Services label live update
    qsa('input[name="service"]').forEach(i => {
      i.addEventListener("change", () => {
        setTimeout(updateServicesLabel, 100);
      });
    });
  }

  // ---------- Validation with smooth feedback
  function validateServices(statusEl) {
    const any = servicesChecked().length > 0;
    const err = qs("#serviceError");
    const block = qs("#serviceBlock");

    if (!any) {
      err?.classList.remove("u-hidden");
      block?.classList.add("vs-error");
      statusEl.textContent = "Bitte mindestens eine Leistung auswählen.";
      
      // Scroll to error
      block?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }

    err?.classList.add("u-hidden");
    block?.classList.remove("vs-error");
    return true;
  }

  function validateTimeline(statusEl) {
    const val = qs("#timeline")?.value?.trim();
    const row = qs("#timelineRow");
    const err = qs("#timelineError");

    if (!val) {
      row?.classList.add("vs-error");
      err?.classList.remove("u-hidden");
      statusEl.textContent = "Bitte Zeitplan auswählen.";
      
      row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    
    row?.classList.remove("vs-error");
    err?.classList.add("u-hidden");
    return true;
  }

  function validateRequiredNative(statusEl) {
    const fields = [
      { el: qs("#goal"), name: "Hauptziel" },
      { el: qs("#name"), name: "Name" },
      { el: qs("#email"), name: "E-Mail" },
      { el: qs("#privacy"), name: "Datenschutz", type: "checkbox" }
    ];

    for (const field of fields) {
      const { el, name, type } = field;
      
      if (type === "checkbox") {
        if (!el?.checked) {
          el?.focus();
          el?.reportValidity?.();
          statusEl.textContent = `Bitte ${name} bestätigen.`;
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return false;
        }
      } else {
        if (!el?.value?.trim()) {
          el?.focus();
          el?.reportValidity?.();
          statusEl.textContent = `Bitte ${name} ausfüllen.`;
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return false;
        }
      }
    }

    return true;
  }

  // ---------- Init
  document.addEventListener("DOMContentLoaded", () => {
    const form = qs("#contactForm");
    if (!form) return;

    const idEl = qs("#inquiryId");
    const urlEl = qs("#pageUrl");
    const refEl = qs("#referrer");
    const statusEl = qs("#formStatus");
    const printBtn = qs("#printBtn");
    const submitBtn = qs("#submitBtn");

    if (idEl) idEl.value = makeId();
    if (urlEl) urlEl.value = window.location.href;
    if (refEl) refEl.value = document.referrer || "Direct";

    initSheets();
    updateServicesLabel();

    // Print with animation
    printBtn?.addEventListener("click", () => {
      const d = getData(form);
      if (!d.inquiryId) d.inquiryId = makeId();
      
      // Button feedback
      printBtn.style.transform = "scale(0.95)";
      setTimeout(() => {
        printBtn.style.transform = "scale(1)";
        openPrint(buildPrintHtml(d));
      }, 100);
    });

    // Clear service error when user changes
    qsa('input[name="service"]').forEach(i => {
      i.addEventListener("change", () => {
        qs("#serviceError")?.classList.add("u-hidden");
        qs("#serviceBlock")?.classList.remove("vs-error");
        if (statusEl.textContent.includes("Leistung")) {
          statusEl.textContent = "";
        }
      });
    });

    // Submit with loading state
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.textContent = "";

      // Honeypot check
      const hp = qs("#hp_company");
      if (hp?.value) return;

      const ok1 = validateServices(statusEl);
      const ok2 = validateTimeline(statusEl);
      const ok3 = validateRequiredNative(statusEl);

      if (!(ok1 && ok2 && ok3)) return;

      // Loading state
      submitBtn.classList.add("btn-loading");
      submitBtn.textContent = "";
      
      // Simulate submission
      setTimeout(() => {
        submitBtn.classList.remove("btn-loading");
        submitBtn.textContent = "Anfrage absenden";
        
        statusEl.textContent = "✓ Formular validiert. Bereit für EmailJS-Integration.";
        statusEl.style.color = "rgba(16, 185, 129, 0.95)";
        
        // TODO: Add EmailJS or Google Sheets integration here
      }, 1500);
    });
  });

})();