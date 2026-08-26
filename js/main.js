/**
 * 2026 Motion Designer Portfolio - Main Interactive Controller
 * Enhanced with Multi-Tab Project Modals, Code Inspector, Audio FX, and Security Guards.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTheme();
  initTypingEffect();
  initStats();
  initSkills();
  initProjects();
  initEducationAndExperience();
  initNavigation();
  initContactForm();
  initScrollAnimations();
  init3DCardTilt();
  initSecureContactBindings();
});

/* --------------------------------------------------
   Custom Magnetic Cursor Follower
-------------------------------------------------- */
function initCustomCursor() {
  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const outline = document.createElement('div');
  outline.className = 'custom-cursor-outline';
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const hoverables = 'a, button, input, textarea, .skill-card, .project-card, .term-chip, .hud-panel, .ai-companion-trigger';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) {
      document.body.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) {
      document.body.classList.remove('hovering');
    }
  });
}

/* --------------------------------------------------
   Theme Management (Dark / Light)
-------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('aryan_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      window.toggleTheme();
    });
  }
}

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('aryan_portfolio_theme', newTheme);
  updateThemeIcon(newTheme);

  if (window.particleEngine) {
    window.particleEngine.setTheme(newTheme);
  }
  if (window.soundFX) {
    window.soundFX.playChime(600, 900);
  }
  showToast(`Switched theme mode to: ${newTheme.toUpperCase()}`);
  return newTheme;
};

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  } else {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  }
}

/* --------------------------------------------------
   Dynamic Typing Effect in Hero
-------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const words = [
    "AI & Machine Learning Engineer",
    "B.Tech CSE @ Dr. APJ Abdul Kalam Inst.",
    "Creator of MONOPOLY Voice & Vision AI",
    "PyTorch & Deep Learning Practitioner",
    "Full-Stack React & Node.js Developer"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 80;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      speed = 40;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      speed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------
   Stats Grid
-------------------------------------------------- */
function initStats() {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer) return;

  statsContainer.innerHTML = portfolioData.personal.stats.map(stat => `
    <div class="stat-card hud-panel reveal-on-scroll">
      <div class="hud-corner-tl"></div><div class="hud-corner-tr"></div>
      <div class="hud-corner-bl"></div><div class="hud-corner-br"></div>
      <div class="stat-value gradient-text">${escapeHtml(stat.value)}</div>
      <div class="stat-label">${escapeHtml(stat.label)}</div>
    </div>
  `).join('');
}

/* --------------------------------------------------
   Skills Hub Rendering & Real-Time Search
-------------------------------------------------- */
let currentSkillCategory = 'all';
let skillSearchQuery = '';

function initSkills() {
  renderSkillCategoryTabs();
  renderSkills();

  const searchInput = document.getElementById('skill-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      skillSearchQuery = e.target.value.toLowerCase().trim();
      renderSkills();
    });
  }
}

function renderSkillCategoryTabs() {
  const container = document.getElementById('skill-category-tabs');
  if (!container) return;

  container.innerHTML = portfolioData.skillCategories.map(cat => `
    <button class="skill-tab-btn ${cat.id === currentSkillCategory ? 'active' : ''}" data-cat="${escapeHtml(cat.id)}">
      <span>${escapeHtml(cat.name)}</span>
    </button>
  `).join('');

  container.querySelectorAll('.skill-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.skill-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSkillCategory = btn.getAttribute('data-cat');
      renderSkills();
    });
  });
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  let filtered = portfolioData.skills;

  if (currentSkillCategory !== 'all') {
    filtered = filtered.filter(s => s.category === currentSkillCategory);
  }

  if (skillSearchQuery) {
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(skillSearchQuery) ||
      s.description.toLowerCase().includes(skillSearchQuery) ||
      s.tags.some(t => t.toLowerCase().includes(skillSearchQuery))
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results-box hud-panel p-5 text-center" style="grid-column: 1 / -1;">
        <p class="mono-tag">NO MATRIX ENTRY FOUND FOR "${escapeHtml(skillSearchQuery)}"</p>
        <button class="btn btn-sm btn-outline mt-3" onclick="document.getElementById('skill-search-input').value=''; skillSearchQuery=''; renderSkills();">Reset Matrix Search</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(skill => `
    <div class="skill-card hud-panel ${skill.highlight ? 'highlight-border' : ''}">
      <div class="hud-corner-tl"></div><div class="hud-corner-tr"></div>
      <div class="hud-corner-bl"></div><div class="hud-corner-br"></div>

      <div class="skill-top">
        <div class="skill-icon-badge">${skill.icon}</div>
        <div class="skill-info">
          <h4 class="skill-name">${escapeHtml(skill.name)}</h4>
          <span class="skill-exp">${escapeHtml(skill.experience)}</span>
        </div>
        <span class="skill-percentage">${skill.level}%</span>
      </div>

      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
      </div>

      <p class="skill-desc">${escapeHtml(skill.description)}</p>

      <div class="skill-tags">
        ${skill.tags.map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------
   Featured Projects Showcase
-------------------------------------------------- */
let currentProjectFilter = 'all';

function initProjects() {
  const filterContainer = document.getElementById('project-filter-tabs');
  if (filterContainer) {
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentProjectFilter = btn.getAttribute('data-filter');
        renderProjects();
      });
    });
  }

  renderProjects();
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  let filtered = portfolioData.projects;
  if (currentProjectFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentProjectFilter || (currentProjectFilter === 'featured' && p.featured));
  }

  container.innerHTML = filtered.map(p => `
    <div class="project-card hud-panel ${p.featured ? 'featured-project' : ''}" data-tilt>
      <div class="hud-corner-tl"></div><div class="hud-corner-tr"></div>
      <div class="hud-corner-bl"></div><div class="hud-corner-br"></div>

      <div class="project-meta-top">
        <span class="project-num">${escapeHtml(p.num)}</span>
        <span class="badge ${p.featured ? 'badge-cyan' : 'badge-violet'}">${escapeHtml(p.badge)}</span>
      </div>

      <div class="project-header">
        <span class="project-icon">${p.icon}</span>
        <div>
          <h3 class="project-title">${escapeHtml(p.title)}</h3>
          <p class="project-tagline">${escapeHtml(p.tagline)}</p>
        </div>
      </div>

      <p class="project-desc">${escapeHtml(p.description)}</p>

      <div class="project-highlights">
        <h5>Key Capabilities:</h5>
        <ul>
          ${p.highlights.slice(0, 3).map(h => `<li><span class="check-icon">✓</span> ${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>

      <div class="project-tech-stack">
        ${p.tech.map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
      </div>

      <div class="project-actions">
        <button class="btn btn-sm btn-primary" onclick="openProjectModal('${escapeHtml(p.id)}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          Deep Dive [0${escapeHtml(p.num)}]
        </button>
        <a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Repository
        </a>
      </div>
    </div>
  `).join('');

  init3DCardTilt();
}

/* --------------------------------------------------
   Multi-Tab Interactive Project Modal
-------------------------------------------------- */
window.openProjectModal = function(id) {
  const p = portfolioData.projects.find(x => x.id === id);
  if (!p) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-content-area');
  if (!modal || !modalBody) return;

  if (window.soundFX) window.soundFX.playModalOpen();

  modalBody.innerHTML = `
    <div class="modal-project-content">
      <div class="modal-header-section d-flex align-items-center gap-3">
        <div class="modal-icon-badge fs-2">${p.icon}</div>
        <div>
          <span class="mono-tag text-cyan">[ SYSTEM SPEC 0${escapeHtml(p.num)} // ${escapeHtml(p.year)} ]</span>
          <h2 class="text-uppercase mb-1">${escapeHtml(p.title)}</h2>
          <p class="modal-tagline mono-tag text-muted">${escapeHtml(p.tagline)}</p>
        </div>
      </div>

      <!-- Multi-Tab Switcher -->
      <div class="modal-tabs-nav mt-4">
        <button class="modal-tab-btn active" onclick="switchModalTab(this, 'tab-overview')">01 // Overview</button>
        <button class="modal-tab-btn" onclick="switchModalTab(this, 'tab-arch')">02 // Architecture</button>
        <button class="modal-tab-btn" onclick="switchModalTab(this, 'tab-code')">03 // Source Code</button>
        <button class="modal-tab-btn" onclick="switchModalTab(this, 'tab-metrics')">04 // Telemetry</button>
      </div>

      <!-- Tab 1: Overview -->
      <div id="tab-overview" class="modal-tab-pane active">
        <div class="modal-section mt-3">
          <h4 class="mono-tag text-cyan">SYSTEM OVERVIEW</h4>
          <p class="text-sub">${escapeHtml(p.description)}</p>
        </div>

        <div class="modal-section mt-3">
          <h4 class="mono-tag text-cyan">KEY CAPABILITIES &amp; HIGHLIGHTS</h4>
          <ul class="modal-list mt-2">
            ${p.highlights.map(h => `<li><span class="text-cyan">✔</span> ${escapeHtml(h)}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-section mt-3">
          <h4 class="mono-tag text-cyan">TECHNOLOGY STACK</h4>
          <div class="project-tech-stack mt-2">
            ${p.tech.map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Tab 2: Architecture -->
      <div id="tab-arch" class="modal-tab-pane">
        <div class="modal-section mt-3">
          <h4 class="mono-tag text-cyan">SYSTEM PIPELINE &amp; DATAFLOW</h4>
          <pre class="code-preview-block"><code>${escapeHtml(p.architecture || 'Architecture Diagram Loaded in Memory')}</code></pre>
        </div>
      </div>

      <!-- Tab 3: Source Code Snippet -->
      <div id="tab-code" class="modal-tab-pane">
        <div class="modal-section mt-3">
          <h4 class="mono-tag text-cyan">CORE IMPLEMENTATION SNIPPET</h4>
          <pre class="code-preview-block"><code>${escapeHtml(p.codeSnippet || '# Production Code Maintained on GitHub')}</code></pre>
        </div>
      </div>

      <!-- Tab 4: Metrics -->
      <div id="tab-metrics" class="modal-tab-pane">
        <div class="modal-section mt-3">
          <h4 class="mono-tag text-cyan">BENCHMARKS &amp; TELEMETRY</h4>
          <div class="telemetry-grid mt-2">
            ${p.metrics ? Object.entries(p.metrics).map(([k, v]) => `
              <div class="telemetry-card">
                <span class="telemetry-key">${escapeHtml(k.toUpperCase())}</span>
                <span class="telemetry-val">${escapeHtml(v)}</span>
              </div>
            `).join('') : '<p class="text-sub">Telemetry Metrics Online</p>'}
          </div>
        </div>
      </div>

      <div class="modal-actions mt-4 d-flex gap-3">
        <a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          View Source on GitHub
        </a>
        <button class="btn btn-outline" onclick="closeProjectModal()">Close Specification</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.switchModalTab = function(btn, targetPaneId) {
  const container = btn.closest('.modal-project-content');
  if (!container) return;

  container.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  container.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
  const target = container.querySelector('#' + targetPaneId);
  if (target) target.classList.add('active');

  if (window.soundFX) window.soundFX.playClick();
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

/* --------------------------------------------------
   Education & Experience Timeline
-------------------------------------------------- */
function initEducationAndExperience() {
  const eduContainer = document.getElementById('education-timeline');
  if (eduContainer && portfolioData.education) {
    eduContainer.innerHTML = portfolioData.education.map(ed => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-dot"></div>
        <div class="timeline-content hud-panel">
          <div class="hud-corner-tl"></div><div class="hud-corner-tr"></div>
          <div class="hud-corner-bl"></div><div class="hud-corner-br"></div>
          <div class="timeline-header">
            <div>
              <h4 class="timeline-role">${escapeHtml(ed.degree)}</h4>
              <h5 class="timeline-org">${escapeHtml(ed.institution)}</h5>
              <div class="mono-tag text-dim">${escapeHtml(ed.university)}</div>
            </div>
            <span class="timeline-period">${escapeHtml(ed.period)}</span>
          </div>
          <p class="timeline-desc">${escapeHtml(ed.details)}</p>
          <span class="badge badge-lime">${escapeHtml(ed.status)}</span>
        </div>
      </div>
    `).join('');
  }

  const expContainer = document.getElementById('experience-timeline');
  if (expContainer && portfolioData.experience) {
    expContainer.innerHTML = portfolioData.experience.map(exp => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-dot"></div>
        <div class="timeline-content hud-panel">
          <div class="hud-corner-tl"></div><div class="hud-corner-tr"></div>
          <div class="hud-corner-bl"></div><div class="hud-corner-br"></div>
          <div class="timeline-header">
            <div>
              <h4 class="timeline-role">${escapeHtml(exp.role)}</h4>
              <h5 class="timeline-org">${escapeHtml(exp.organization)}</h5>
            </div>
            <span class="timeline-period">${escapeHtml(exp.period)}</span>
          </div>
          <p class="timeline-desc">${escapeHtml(exp.description)}</p>
          <ul class="timeline-points">
            ${exp.points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

/* --------------------------------------------------
   3D Card Tilt Interaction
-------------------------------------------------- */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------
   Navigation & Scroll Spy
-------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  const progressBar = document.getElementById('scroll-progress-bar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = (scrollY / docHeight * 100) + '%';
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------
   Secure Contact Binding & Obfuscation
-------------------------------------------------- */
function initSecureContactBindings() {
  const emailVal = SecurityShield.getEmail();
  const phoneVal = SecurityShield.getPhone();

  const emailTargets = document.querySelectorAll('.secure-email-target');
  emailTargets.forEach(el => {
    el.textContent = emailVal;
    if (el.tagName === 'A') {
      el.setAttribute('href', `mailto:${emailVal}`);
    }
  });

  const phoneTargets = document.querySelectorAll('.secure-phone-target');
  phoneTargets.forEach(el => {
    el.textContent = phoneVal;
  });
}

/* --------------------------------------------------
   Contact Form & Anti-Spam Honeypot Protection
-------------------------------------------------- */
let lastSubmitTime = 0;

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const honeypot = document.getElementById('form-honeypot');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot submission trapped by honeypot.');
        showToast('Message received.', 'info');
        form.reset();
        return;
      }

      const now = Date.now();
      if (now - lastSubmitTime < 5000) {
        showToast('Please wait a moment before sending another message.', 'error');
        return;
      }
      lastSubmitTime = now;

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all contact fields.', 'error');
        return;
      }

      const emailAddress = SecurityShield.getEmail();
      const subject = encodeURIComponent(`Portfolio Commission / Inquiry: ${name}`);
      const body = encodeURIComponent(`Hi Aryan,\n\n${message}\n\nFrom: ${name} (${email})`);
      window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, '_blank');

      showToast('Opening secure email client...', 'success');
      form.reset();
    });
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(SecurityShield.getEmail()).then(() => {
        showToast('Email address copied securely!', 'success');
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(SecurityShield.getPhone()).then(() => {
        showToast('Phone number copied securely!', 'success');
      });
    });
  }
}

/* --------------------------------------------------
   Scroll Reveal Animations
-------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* --------------------------------------------------
   Toast Notification System (XSS-Safe)
-------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;

  const dot = document.createElement('span');
  dot.className = 'toast-dot';

  const textNode = document.createElement('span');
  textNode.textContent = message;

  toast.appendChild(dot);
  toast.appendChild(textNode);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (typeof SecurityGuard !== 'undefined' && SecurityGuard.sanitize) {
    return SecurityGuard.sanitize(str);
  }
  if (typeof str !== 'string') return String(str);
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

