/* ==========================================================================
   Main Application Controller — Arbaj Ahmad Portfolio
   - 3-Stage Scroll-Driven 3D Portrait Choreography
   - 3D Perspective Tilt Physics
   - Official Technology Logos (Zero "Verified" clutter)
   - Real Email Dispatch ("Text Me") via Backend /api/contact + FormSubmit + mailto
   ========================================================================== */

(function() {
  const data = window.PORTFOLIO_DATA;
  let activeSkillCategory = "All";
  let currentStage = 1;
  let manualStageLockUntil = 0;

  function showToast(message, label) {
    const container = document.getElementById("toast-region");
    if (!container) return;
    const item = document.createElement("div");
    item.className = "espresso-card px-5 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-3 pointer-events-auto";
    item.innerHTML = `<span class="font-mono-code text-[10px] uppercase tracking-widest crema-text">${label || "PORTFOLIO"}</span><span>${message}</span>`;
    container.appendChild(item);
    setTimeout(function() {
      item.style.opacity = "0";
      setTimeout(function() {
        if (item.parentNode) item.parentNode.removeChild(item);
      }, 300);
    }, 3600);
  }

  // --- 1. 3-STAGE SCROLL-DRIVEN 3D PORTRAIT CHOREOGRAPHY ---
  function applyPortraitStage(stageNum) {
    currentStage = stageNum;
    const heroGrid = document.getElementById("hero-stage-grid");
    if (heroGrid) {
      heroGrid.classList.remove("stage-1", "stage-2", "stage-3");
      heroGrid.classList.add("stage-" + stageNum);
    }

    if (stageNum === 3) {
      document.body.classList.add("in-stage-3");
    } else {
      document.body.classList.remove("in-stage-3");
    }
  }

  function handleWindowScroll() {
    if (Date.now() < manualStageLockUntil) return;
    const y = window.scrollY || window.pageYOffset || 0;
    const detailsEl = document.getElementById("details-anchor");
    const detailsTop = detailsEl ? detailsEl.getBoundingClientRect().top : 9999;

    if (detailsTop <= 240 || y >= 480) {
      if (currentStage !== 3) applyPortraitStage(3);
    } else if (y >= 90) {
      if (currentStage !== 2) applyPortraitStage(2);
    } else {
      if (currentStage !== 1) applyPortraitStage(1);
    }
  }

  // --- 2. RENDER EXPERIENCE, PROJECTS, SKILLS (NO "VERIFIED" TEXT), EDUCATION, ACHIEVEMENTS ---
  function renderExperience() {
    const expContainer = document.getElementById("experience-list");
    if (!expContainer) return;
    expContainer.innerHTML = data.experience.map(function(exp) {
      const stackHtml = (exp.stack || []).map(function(tech) {
        return `<span class="tech-logo-chip"><span class="tech-logo-svg">${window.getTechLogoSVG(tech)}</span><span>${tech}</span></span>`;
      }).join("");

      const bulletsHtml = (exp.bullets || []).map(function(b) {
        return `<li class="flex items-start gap-3 text-sm sm:text-base text-[var(--text-secondary)]"><span class="crema-text mt-1.5 text-xs">◆</span><span>${b}</span></li>`;
      }).join("");

      return `
        <article class="tilt-card-3d espresso-card rounded-3xl p-7 sm:p-9">
          <div class="tilt-glare-layer"></div>
          <div class="tilt-card-content space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h3 class="font-editorial text-2xl sm:text-3xl font-semibold">${exp.company}</h3>
                <p class="text-sm font-medium crema-text mt-0.5">${exp.role}</p>
              </div>
              <div class="sm:text-right font-mono-code text-xs text-[var(--text-muted)]">
                <div>${exp.period}</div>
                <div>${exp.location}</div>
              </div>
            </div>
            <ul class="space-y-2.5">${bulletsHtml}</ul>
            <div class="flex flex-wrap gap-2 pt-2">${stackHtml}</div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.innerHTML = data.projects.map(function(proj, index) {
      const num = "0" + (index + 1);
      const stackChips = (proj.stack || []).map(function(tech) {
        return `<span class="tech-logo-chip"><span class="tech-logo-svg">${window.getTechLogoSVG(tech)}</span><span>${tech}</span></span>`;
      }).join("");

      const bulletItems = (proj.bullets || []).map(function(b) {
        return `<li class="flex items-start gap-2.5 text-sm sm:text-base text-[var(--text-secondary)]"><span class="crema-text mt-1.5 text-[10px]">●</span><span>${b}</span></li>`;
      }).join("");

      return `
        <article class="tilt-card-3d espresso-card rounded-3xl p-7 sm:p-9 flex flex-col justify-between">
          <div class="tilt-glare-layer"></div>
          <div class="tilt-card-content space-y-5">
            <div class="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
              <span class="font-mono-code text-xs uppercase tracking-[0.2em] crema-text">${num} / Project</span>
              <span class="px-3 py-0.5 rounded-full text-[11px] font-mono-code border border-[var(--border-subtle)] text-[var(--text-secondary)]">${proj.status}</span>
            </div>
            <h3 class="font-editorial text-2xl sm:text-3xl font-semibold">${proj.title}</h3>
            <ul class="space-y-2.5 pt-1">${bulletItems}</ul>
          </div>
          <div class="tilt-card-content pt-6 mt-6 border-t border-[var(--border-subtle)]">
            <div class="flex flex-wrap gap-2">${stackChips}</div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderSkills() {
    const grid = document.getElementById("skills-logo-grid");
    if (!grid) return;

    const filtered = data.skills.filter(function(sk) {
      return activeSkillCategory === "All" || sk.category === activeSkillCategory;
    });

    grid.innerHTML = filtered.map(function(sk) {
      const svg = window.getTechLogoSVG(sk.name);
      return `
        <div class="tilt-card-3d espresso-card rounded-2xl p-5 flex items-center gap-4">
          <div class="tilt-glare-layer"></div>
          <div class="tilt-card-content flex items-center gap-4 min-w-0">
            <div class="w-11 h-11 rounded-xl bg-[#140f0c] border border-[var(--border-subtle)] p-2 flex items-center justify-center shrink-0">
              ${svg}
            </div>
            <div class="min-w-0">
              <h4 class="font-editorial text-lg font-semibold truncate">${sk.name}</h4>
              <p class="font-mono-code text-[11px] text-[var(--text-muted)] uppercase tracking-wider">${sk.category}</p>
            </div>
          </div>
        </div>
      `;
    }).join("");

    bind3DTiltCards();
  }

  function renderEducation() {
    const eduContainer = document.getElementById("education-list");
    if (!eduContainer) return;
    eduContainer.innerHTML = data.education.map(function(edu) {
      return `
        <article class="tilt-card-3d espresso-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
          <div class="tilt-glare-layer"></div>
          <div class="tilt-card-content space-y-2.5">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono-code text-xs uppercase tracking-widest crema-text">${edu.period}</span>
              <span class="font-mono-code text-xs text-[var(--text-muted)]">${edu.location}</span>
            </div>
            <h3 class="font-editorial text-2xl font-semibold pt-1">${edu.institution}</h3>
            <p class="text-sm sm:text-base text-[var(--text-secondary)]">${edu.degree}</p>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderAchievements() {
    const container = document.getElementById("achievements-list");
    if (!container) return;
    container.innerHTML = data.achievements.map(function(ach) {
      return `
        <div class="tilt-card-3d espresso-card rounded-3xl p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="tilt-glare-layer"></div>
          <div class="tilt-card-content space-y-2">
            <div class="font-mono-code text-xs uppercase tracking-[0.2em] crema-text">Problem Solving Milestone</div>
            <h3 class="font-editorial text-2xl sm:text-3xl font-semibold">${ach.title}</h3>
            <p class="text-sm sm:text-base text-[var(--text-secondary)]">${ach.description}</p>
          </div>
          <div class="tilt-card-content shrink-0 px-6 py-4 rounded-2xl border border-[var(--border-strong)] text-center">
            <div class="font-editorial text-3xl font-bold crema-text">50+</div>
            <div class="font-mono-code text-[11px] uppercase tracking-wider text-[var(--text-secondary)] mt-1">Problems Solved</div>
          </div>
        </div>
      `;
    }).join("");
  }

  // --- 3. 3D PERSPECTIVE TILT BINDINGS ---
  function bind3DTiltCards() {
    document.querySelectorAll(".tilt-card-3d").forEach(function(card) {
      if (card.dataset.boundTilt === "1") return;
      card.dataset.boundTilt = "1";

      card.addEventListener("mousemove", function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -4.2;
        const ry = ((x - rect.width / 2) / (rect.width / 2)) * 4.2;
        card.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });

      card.addEventListener("mouseleave", function() {
        card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }

  function bindHeroPortrait3D() {
    const stage = document.getElementById("hero-portrait-stage");
    const card = document.getElementById("hero-portrait-card");
    if (!stage || !card) return;

    stage.addEventListener("mousemove", function(e) {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / (rect.height / 2)) * -9.0;
      const ry = ((x - rect.width / 2) / (rect.width / 2)) * 9.0;
      card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    });

    stage.addEventListener("mouseleave", function() {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  // --- 4. REAL EMAIL DELIVERY ("TEXT ME") HANDLER ---
  async function handleTextMeSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim() || "Portfolio Message for Arbaj Ahmad";
    const message = document.getElementById("contact-message").value.trim();
    const submitBtn = document.getElementById("text-me-submit-btn");
    const statusBox = document.getElementById("email-delivery-status");

    if (!name || !email || !message) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending to arbajahmad1089@gmail.com...</span>`;

    const payload = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      recipient: "arbajahmad1089@gmail.com"
    };

    let deliveredViaServer = false;

    // 1. Try local/deployed Node.js Express + Nodemailer backend (/api/contact)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res && res.ok) {
        deliveredViaServer = true;
      }
    } catch (err) {
      // Backend server not running on static host; fall through to FormSubmit / mailto relay
    }

    // 2. If hosted on static GitHub Pages without Node backend, relay via FormSubmit AJAX to arbajahmad1089@gmail.com
    if (!deliveredViaServer) {
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/arbajahmad1089@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: subject,
            message: message
          })
        });
        if (fsRes && fsRes.ok) {
          deliveredViaServer = true;
        }
      } catch (err) {
        // Offline or sandboxed environment fallback
      }
    }

    // 3. Construct direct mailto URI for instant email client handoff as well
    const mailtoBody = encodeURIComponent(
      "Name: " + name + "\n" +
      "Sender Email: " + email + "\n\n" +
      message
    );
    const mailtoHref = "mailto:arbajahmad1089@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + mailtoBody;

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    if (statusBox) {
      statusBox.classList.remove("hidden");
      statusBox.innerHTML = `
        <div class="p-4 rounded-2xl border border-[var(--border-strong)] bg-[#16110e] text-xs sm:text-sm space-y-2">
          <div class="font-semibold crema-text">Message prepared for arbajahmad1089@gmail.com</div>
          <p class="text-[var(--text-secondary)]">
            ${deliveredViaServer
              ? "Your message has been dispatched directly to Arbaj Ahmad's email inbox (arbajahmad1089@gmail.com)."
              : "Click the direct link below to complete sending via your email app to arbajahmad1089@gmail.com:"}
          </p>
          <div class="pt-1 flex flex-wrap gap-3">
            <a href="${mailtoHref}" class="btn-espresso-primary px-4 py-2 rounded-full text-xs font-mono-code uppercase tracking-wider inline-flex items-center gap-2">
              <span>Open in Email App (arbajahmad1089@gmail.com)</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      `;
    }

    if (!deliveredViaServer) {
      try {
        const a = document.createElement("a");
        a.href = mailtoHref;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (e) {}
    }

    showToast("Message routed to arbajahmad1089@gmail.com", "EMAIL DISPATCH");
    e.target.reset();
  }

  // --- 5. INITIALIZE ON DOM READY ---
  window.addEventListener("DOMContentLoaded", function() {
    renderExperience();
    renderProjects();
    renderSkills();
    renderEducation();
    renderAchievements();
    bindHeroPortrait3D();
    bind3DTiltCards();

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    handleWindowScroll();

    // Smooth section navigation
    document.querySelectorAll("[data-nav-target]").forEach(function(btn) {
      btn.addEventListener("click", function() {
        const targetId = btn.getAttribute("data-nav-target");
        if (targetId === "top") {
          manualStageLockUntil = Date.now() + 800;
          applyPortraitStage(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (targetId === "summary") {
          manualStageLockUntil = Date.now() + 800;
          applyPortraitStage(2);
          window.scrollTo({ top: 200, behavior: "smooth" });
        } else {
          manualStageLockUntil = Date.now() + 800;
          applyPortraitStage(3);
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        const mobileDrawer = document.getElementById("mobile-nav-drawer");
        if (mobileDrawer) mobileDrawer.classList.add("hidden");
      });
    });

    // Mobile drawer toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", function() {
        const drawer = document.getElementById("mobile-nav-drawer");
        if (drawer) drawer.classList.toggle("hidden");
      });
    }

    // Skill category filter buttons
    document.querySelectorAll("[data-skill-filter]").forEach(function(btn) {
      btn.addEventListener("click", function() {
        activeSkillCategory = btn.getAttribute("data-skill-filter");
        document.querySelectorAll("[data-skill-filter]").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderSkills();
      });
    });

    // Contact form ("Text Me")
    const contactForm = document.getElementById("portfolio-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", handleTextMeSubmit);
    }
  });
})();
