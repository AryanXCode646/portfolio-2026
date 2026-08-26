/**
 * 2026 Motion Designer - Interactive Terminal Simulator (AryanOS v2.6)
 * Terminal CLI for recruiters and developers with Strict Sanitization & Anti-XSS Protection.
 */

class InteractiveTerminal {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.history = [];
    this.historyIndex = -1;

    if (!this.container || !this.input || !this.output) return;

    this.init();
  }

  init() {
    this.printWelcome();
    this.attachEvents();
  }

  printWelcome() {
    this.output.innerHTML = `
      <div class="term-line term-intro">
        <span class="term-cyan">[ SYSTEM: ARYAN_OS v2.6 // CREATIVE_AI_CORE_ONLINE ]</span>
        <br><span class="term-dim">Session started: 2026.4 // Node: Rudrapur (U.S. Nagar), IN // Latency: &lt;50ms</span>
        <br>Type <span class="term-accent term-clickable" onclick="window.terminalInstance.runCommand('help')">'help'</span> to explore technical commands or click the action pills below.
      </div>
    `;
  }

  attachEvents() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    this.container.addEventListener('click', () => {
      this.input.focus();
    });
  }

  runCommand(cmd) {
    this.input.value = cmd;
    this.execute(cmd);
    this.input.value = '';
    this.input.focus();
  }

  execute(rawCmd) {
    const cleanCmd = rawCmd.trim();
    const args = cleanCmd.split(' ');
    const command = args[0].toLowerCase();
    const subArg = args[1] ? args[1].toLowerCase() : null;

    // Echo sanitized input
    this.appendLine(`<div class="term-line term-input-echo"><span class="term-prompt">aryan@motion-lab:~$</span> <span class="term-user-text">${this.escapeHtml(cleanCmd)}</span></div>`);

    switch (command) {
      case 'help':
        this.appendHelp();
        break;

      case 'whoami':
      case 'about':
        this.appendLine(`
          <div class="term-response">
            <p><strong class="term-cyan">${this.escapeHtml(portfolioData.personal.name)}</strong> // ${this.escapeHtml(portfolioData.personal.title)}</p>
            <p class="term-dim">${this.escapeHtml(portfolioData.personal.bio)}</p>
            <p>🎓 <strong>Education:</strong> ${this.escapeHtml(portfolioData.personal.degree)}</p>
            <p class="term-dim">🏛️ ${this.escapeHtml(portfolioData.personal.college)}</p>
            <p>📍 Location: <span class="term-accent">${this.escapeHtml(portfolioData.personal.location)}</span> | 🟢 Status: <span class="term-green">${this.escapeHtml(portfolioData.personal.status)}</span></p>
          </div>
        `);
        break;

      case 'education':
        this.appendEducation();
        break;

      case 'skills':
        this.appendSkills(subArg);
        break;

      case 'projects':
        this.appendProjects();
        break;

      case 'project':
        this.appendProjectDetail(subArg);
        break;

      case 'contact':
        const email = SecurityShield.getEmail();
        const phone = SecurityShield.getPhone();
        this.appendLine(`
          <div class="term-response">
            <p class="term-cyan">📫 Direct Contact Credentials:</p>
            <ul class="term-list">
              <li>📧 Email: <a href="mailto:${this.escapeHtml(email)}" class="term-link">${this.escapeHtml(email)}</a></li>
              <li>📞 Phone: <span class="term-white">${this.escapeHtml(phone)}</span></li>
              <li>📍 Address: <span class="term-dim">${this.escapeHtml(portfolioData.personal.location)}</span></li>
              <li>🐙 GitHub: <a href="${this.escapeHtml(portfolioData.personal.github)}" target="_blank" rel="noopener noreferrer" class="term-link">${this.escapeHtml(portfolioData.personal.github)}</a></li>
              <li>💼 LinkedIn: <a href="${this.escapeHtml(portfolioData.personal.linkedin)}" target="_blank" rel="noopener noreferrer" class="term-link">${this.escapeHtml(portfolioData.personal.linkedin)}</a></li>
            </ul>
          </div>
        `);
        break;

      case 'github':
        this.appendLine(`<div class="term-response term-green">Opening GitHub repository: <a href="${this.escapeHtml(portfolioData.personal.github)}" target="_blank" rel="noopener noreferrer" class="term-link">${this.escapeHtml(portfolioData.personal.github)}</a></div>`);
        window.open(portfolioData.personal.github, '_blank', 'noopener,noreferrer');
        break;

      case 'stats':
        this.appendStats();
        break;

      case 'theme':
        if (window.toggleTheme) {
          const newTheme = window.toggleTheme();
          this.appendLine(`<div class="term-response term-green">Switched theme mode to: <strong>${this.escapeHtml(newTheme)}</strong></div>`);
        }
        break;

      case 'clear':
      case 'cls':
        this.output.innerHTML = '';
        break;

      case 'sudo':
        if (subArg === 'hire' || subArg === 'hire-aryan') {
          const emailAddr = SecurityShield.getEmail();
          const phoneNum = SecurityShield.getPhone();
          this.appendLine(`
            <div class="term-response term-sudo-box">
              <span class="term-green">✔ ACCESS AUTHORIZED: Priority Interview Pipeline Dispatched!</span>
              <p>Aryan Saxena is ready to contribute to your engineering goals.</p>
              <p>📞 Phone: <strong>${this.escapeHtml(phoneNum)}</strong> | ✉️ Email: <strong>${this.escapeHtml(emailAddr)}</strong></p>
            </div>
          `);
        } else {
          this.appendLine(`<div class="term-response term-warn">Permission denied: try running 'sudo hire'</div>`);
        }
        break;

      default:
        this.appendLine(`
          <div class="term-response term-err">
            Command not recognized: '<span class="term-err-text">${this.escapeHtml(cleanCmd)}</span>'.
            Type <span class="term-accent term-clickable" onclick="window.terminalInstance.runCommand('help')">'help'</span> for available commands.
          </div>
        `);
    }

    this.scrollToBottom();
  }

  appendHelp() {
    let rows = portfolioData.terminalHelp.map(item => `
      <div class="term-help-row">
        <span class="term-cmd term-clickable" onclick="window.terminalInstance.runCommand('${this.escapeHtml(item.cmd)}')">${this.escapeHtml(item.cmd)}</span>
        <span class="term-dots">....................</span>
        <span class="term-desc">${this.escapeHtml(item.desc)}</span>
      </div>
    `).join('');

    this.appendLine(`
      <div class="term-response">
        <p class="term-cyan">⚡ Available Terminal Commands (2026 Core):</p>
        <div class="term-help-grid">${rows}</div>
      </div>
    `);
  }

  appendEducation() {
    let items = portfolioData.education.map(ed => `
      <div class="term-edu-item mb-2">
        <div class="term-cyan">🎓 ${this.escapeHtml(ed.degree)} (${this.escapeHtml(ed.period)})</div>
        <div class="term-white">🏛️ ${this.escapeHtml(ed.institution)} — <span class="term-dim">${this.escapeHtml(ed.university)}</span></div>
        <div class="term-dim text-xs">${this.escapeHtml(ed.details)}</div>
      </div>
    `).join('');

    this.appendLine(`
      <div class="term-response">
        <p class="term-cyan">📚 Academic Credentials & Degrees:</p>
        <div class="term-edu-list">${items}</div>
      </div>
    `);
  }

  appendSkills(filter) {
    let filtered = portfolioData.skills;
    let title = "Technical Matrix & Proficiency Breakdown:";

    if (filter === '--ai' || filter === 'ai') {
      filtered = filtered.filter(s => s.category === 'ai-ml');
      title = "AI & Machine Learning Matrix [01]:";
    } else if (filter === '--web' || filter === 'web') {
      filtered = filtered.filter(s => s.category === 'web-dev');
      title = "Full-Stack & Web Matrix [02]:";
    } else if (filter === '--core' || filter === 'core') {
      filtered = filtered.filter(s => s.category === 'languages-core');
      title = "Languages & Core CS Matrix [03]:";
    }

    let items = filtered.map(s => `
      <div class="term-skill-item">
        <div class="term-skill-header">
          <span>${s.icon} <strong class="term-white">${this.escapeHtml(s.name)}</strong> [${this.escapeHtml(s.experience)}]</span>
          <span class="term-cyan">${s.level}%</span>
        </div>
        <div class="term-progress-bar">
          <div class="term-progress-fill" style="width: ${s.level}%"></div>
        </div>
      </div>
    `).join('');

    this.appendLine(`
      <div class="term-response">
        <p class="term-cyan">${this.escapeHtml(title)}</p>
        <div class="term-skills-grid">${items}</div>
        <p class="term-dim mt-2">💡 Options: 'skills --ai', 'skills --web', 'skills --core'</p>
      </div>
    `);
  }

  appendProjects() {
    let items = portfolioData.projects.map(p => `
      <div class="term-project-item">
        <div class="term-project-title">
          <span>[${this.escapeHtml(p.num)}] ${p.icon} <strong class="term-accent">${this.escapeHtml(p.title)}</strong></span>
          <span class="term-badge">${this.escapeHtml(p.badge)}</span>
        </div>
        <p class="term-dim">${this.escapeHtml(p.tagline)}</p>
        <div class="term-tags">${p.tech.map(t => `<span class="term-tag">${this.escapeHtml(t)}</span>`).join(' ')}</div>
      </div>
    `).join('');

    this.appendLine(`
      <div class="term-response">
        <p class="term-cyan">🚀 Featured Systems & Projects:</p>
        <div class="term-projects-list">${items}</div>
        <p class="term-dim mt-2">💡 Type 'project monopoly' to view architecture breakdown.</p>
      </div>
    `);
  }

  appendProjectDetail(name) {
    if (!name || name === 'monopoly') {
      const p = portfolioData.projects.find(x => x.id === 'monopoly') || portfolioData.projects[0];
      this.appendLine(`
        <div class="term-response term-detail-box">
          <h4 class="term-cyan">[${this.escapeHtml(p.num)}] ${p.icon} ${this.escapeHtml(p.title)}</h4>
          <p class="term-white">${this.escapeHtml(p.description)}</p>
          <p class="term-accent">Key Architectural Highlights:</p>
          <ul class="term-bullet-list">
            ${p.highlights.map(h => `<li>✔ ${this.escapeHtml(h)}</li>`).join('')}
          </ul>
          <p class="term-dim">Tech Stack: ${this.escapeHtml(p.tech.join(', '))}</p>
        </div>
      `);
    } else {
      const p = portfolioData.projects.find(x => x.id.includes(name));
      if (p) {
        this.appendLine(`
          <div class="term-response term-detail-box">
            <h4 class="term-cyan">[${this.escapeHtml(p.num)}] ${p.icon} ${this.escapeHtml(p.title)}</h4>
            <p>${this.escapeHtml(p.description)}</p>
            <p class="term-dim">Tech: ${this.escapeHtml(p.tech.join(', '))}</p>
          </div>
        `);
      } else {
        this.appendLine(`<div class="term-response term-warn">Project '${this.escapeHtml(name)}' not found. Try 'projects' to list all.</div>`);
      }
    }
  }

  appendStats() {
    let items = portfolioData.personal.stats.map(st => `
      <div class="term-stat-pill">
        <span class="term-stat-val">${this.escapeHtml(st.value)}</span>
        <span class="term-stat-lbl">${this.escapeHtml(st.label)}</span>
      </div>
    `).join('');

    this.appendLine(`
      <div class="term-response">
        <p class="term-cyan">📊 Performance Metrics & System Health:</p>
        <div class="term-stats-flex">${items}</div>
      </div>
    `);
  }

  appendLine(html) {
    this.output.insertAdjacentHTML('beforeend', html);
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHtml(str) {
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
}

document.addEventListener('DOMContentLoaded', () => {
  window.terminalInstance = new InteractiveTerminal('terminal-window', 'terminal-input', 'terminal-output');
});
