(() => {
  const data = window.PORTFOLIO || {};
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { if ($(id) && value !== undefined) $(id).textContent = value; };
  const setLink = (id, value) => { if ($(id) && value) $(id).href = value; };
  const safeUrl = (value) => typeof value === "string" && /^https?:\/\//i.test(value);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  document.title = `${data.name || "Student"} — Student Portfolio`;
  setText("heroStatus", data.status || "STUDENT PORTFOLIO");
  setText("heroIntro", data.intro || "");
  setText("aboutLead", data.aboutLead || "");
  setText("aboutText", data.about || "");
  setText("factRole", data.role || "Student");
  setText("factLocation", data.location || "");
  setText("factFocus", data.focus || "");
  setText("monogram", data.initials || "ME");
  const profileImage = $("profileImage");
  if (profileImage && data.profileImage) profileImage.src = data.profileImage;

  const educationList = $("educationList");
  (data.education || []).forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "education-card reveal";
    card.innerHTML = `<div class="education-mark">0${index + 1}</div><div class="education-content"><div class="education-status"><span class="education-period">STATUS</span><span class="education-status-value">${escapeHtml(item.status || item.period || "Currently Enrolled")}</span></div><h3>${escapeHtml(item.school || "")}</h3><p class="education-program">${escapeHtml(item.program || "")}</p><p>${escapeHtml(item.detail || "")}</p></div><span class="education-arrow">↗</span>`;
    educationList.appendChild(card);
  });
  setText("footerName", data.name || "Student");
  setText("year", new Date().getFullYear());
  document.querySelectorAll(".brand-mark").forEach(el => { el.innerHTML = `${escapeHtml(data.initials || "ME")}<span>.</span>`; });

  const github = safeUrl(data.github) ? data.github : "https://github.com/";
  ["heroGithub","allProjectsLink","contactGithub"].forEach(id => setLink(id, github));
  const email = typeof data.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? data.email : "";
  setText("contactEmailText", data.email || "Add your email in config.js");
  setText("contactEmailLink", data.email || "Add your email in config.js");
  setLink("contactEmailLink", email ? `mailto:${email}` : "mailto:");
  const repositoriesUrl = `${github.replace(/\/+$/, "")}?tab=repositories`;
  setLink("allProjectsLink", repositoriesUrl);

  const skillsGrid = $("skillsGrid");
  const skillGroups = new Map();
  (data.skills || []).forEach(skill => {
    const groupName = skill.group || "Other skills";
    if (!skillGroups.has(groupName)) skillGroups.set(groupName, []);
    skillGroups.get(groupName).push(skill);
  });
  skillGroups.forEach((skills, groupName) => {
    const group = document.createElement("article");
    group.className = "skill-group reveal";
    const items = skills.map(skill => `<article class="skill-chip"><div class="skill-chip-heading"><span>${escapeHtml(skill.name || "Skill")}</span><small>${escapeHtml(skill.level || "Learning")}</small></div><p>${escapeHtml(skill.description || "")}</p></article>`).join("");
    group.innerHTML = `<h3 class="skill-group-heading">${escapeHtml(groupName)}</h3><div class="skill-group-items">${items}</div>`;
    skillsGrid.appendChild(group);
  });

  const projectsGrid = $("projectsGrid");
  const tones = ["", "alt-blue", "alt-violet"];
  const fallbackMarks = ["{ }", "✳", "▦", "⌘", "◈"];
  (data.projects || []).forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    const tags = (project.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
    const statusTone = project.status === "Completed" ? "is-completed" : project.status === "In Progress" ? "is-in-progress" : "is-other";
    const status = project.status ? `<span class="project-status ${statusTone}">${escapeHtml(project.status)}</span>` : "";
    const screenshot = project.image ? `<img class="project-screenshot" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title || "Project")} screenshot" loading="lazy">` : "";
    const links = [
      safeUrl(project.link) ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">${escapeHtml(project.linkLabel || "Live project")} <span>↗</span></a>` : "",
      safeUrl(project.github) && !project.github.includes("your-username") ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noreferrer">Source code <span>↗</span></a>` : ""
    ].filter(Boolean).join("");
    const projectLinks = links || `<a href="${escapeHtml(repositoriesUrl)}" target="_blank" rel="noreferrer">Browse GitHub repositories <span>↗</span></a>`;
    const visual = `<div class="project-visual ${tones[index % tones.length]}">${screenshot}<span class="visual-index">${escapeHtml(project.number || String(index+1).padStart(2,"0"))} / WORK</span><span class="visual-ring"></span><span class="visual-mark">${escapeHtml(fallbackMarks[index % fallbackMarks.length])}</span><span class="visual-caption">${escapeHtml(project.category || "STUDENT PROJECT")}</span><span class="image-hint">PREVIEW COMING SOON</span></div>`;
    const visualMarkup = safeUrl(project.github) && !project.github.includes("your-username") ? `<a class="project-image-link" href="${escapeHtml(project.github)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(project.title)} GitHub repository">${visual}</a>` : visual;
    card.innerHTML = `${visualMarkup}<div class="project-body"><div class="project-heading-meta"><div class="project-category">${escapeHtml(project.category || "STUDENT PROJECT")}</div>${status}</div><h3>${escapeHtml(project.title || "Untitled Project")}</h3><p>${escapeHtml(project.description || "")}</p><div class="project-contribution"><span>MY CONTRIBUTION</span>${escapeHtml(project.contribution || "Learning and project development")}</div><div class="project-tags">${tags}</div><div class="project-links">${projectLinks}</div></div>`;
    projectsGrid.appendChild(card);
    const screenshotImage = card.querySelector(".project-screenshot");
    if (screenshotImage) {
      const visualContainer = screenshotImage.closest(".project-visual");
      const markImageState = () => {
        visualContainer.classList.toggle("has-image", screenshotImage.naturalWidth > 0);
        visualContainer.classList.toggle("image-unavailable", screenshotImage.complete && screenshotImage.naturalWidth === 0);
      };
      screenshotImage.addEventListener("load", markImageState);
      screenshotImage.addEventListener("error", markImageState);
      if (screenshotImage.complete) markImageState();
    }
  });
  setText("projectCount", `${String((data.projects || []).length).padStart(2,"0")} PROJECT${(data.projects || []).length === 1 ? "" : "S"}`);

  const menuToggle = $("menuToggle"), nav = $("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false");
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  }), {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => sectionObserver.observe(section));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollProgress = $("scrollProgress");
  const backToTop = $("backToTop");
  let scrollFrame = 0;
  const updateScrollDecorations = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
    document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
    if (scrollProgress) scrollProgress.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    scrollFrame = 0;
  };
  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollDecorations);
  }, {passive:true});
  updateScrollDecorations();
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({top:0, behavior:reduceMotion.matches ? "auto" : "smooth"});
    });
  }

  const finePointer = window.matchMedia("(pointer: fine)");
  const cursorAura = $("cursorAura");
  if (!reduceMotion.matches && finePointer.matches) {
    let pointerFrame = 0;
    document.addEventListener("pointermove", event => {
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
        if (cursorAura) cursorAura.classList.add("visible");
        pointerFrame = 0;
      });
    }, {passive:true});

    document.querySelectorAll(".skill-group, .project-card, .education-card, .hero-art").forEach(card => {
      card.addEventListener("pointermove", event => {
        const bounds = card.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const tiltX = ((y / bounds.height) - .5) * -6;
        const tiltY = ((x / bounds.width) - .5) * 6;
        card.style.setProperty("--spot-x", `${x}px`);
        card.style.setProperty("--spot-y", `${y}px`);
        card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        card.classList.add("pointer-hovered");
      });
      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("transform");
        card.classList.remove("pointer-hovered");
      });
    });
  }

  $("copyEmail").addEventListener("click", async () => {
    if (!email) { showToast("Add your email in config.js first"); return; }
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      showToast("Clipboard unavailable. Opening your email app instead.");
      window.location.href = `mailto:${email}`;
    }
  });
  $("contactForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!email) {
      showToast("Add your email in config.js before using the contact form");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const senderName = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = `Portfolio message from ${senderName}`;
    const body = `Hi Josriel,\n\n${message}\n\n---\nFrom: ${senderName}\nReply to: ${senderEmail}`;
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const composeFallback = $("contactComposeFallback");
    composeFallback.href = composeUrl;
    composeFallback.hidden = false;
    composeFallback.click();
    showToast("Your email draft is ready. If a new tab didn't open, use the link below.");
  });
  function showToast(message) {
    const toast = $("toast"); toast.textContent = message; toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  }
  // Subtle floating particles. Animation is disabled for reduced-motion users.
  const canvas = $("particleCanvas");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({length: Math.min(65, Math.floor(window.innerWidth / 20))}, () => ({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + .4, vx: (Math.random() - .5) * .22,
        vy: (Math.random() - .5) * .18, a: Math.random() * .4 + .12
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,243,106,${p.a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener("resize", resize);
  }
})();