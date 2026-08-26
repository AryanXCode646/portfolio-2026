/**
 * 2026 Motion Designer - Interactive AI Voice & Chat Companion (AryanAI)
 * High-speed client-side intelligent assistant grounded in Aryan Saxena's Resume & System Specs.
 */

class AryanAICompanion {
  constructor() {
    this.widget = null;
    this.panel = null;
    this.messagesContainer = null;
    this.input = null;
    this.isOpen = false;
    this.voiceEnabled = true;
    this.speechSynth = window.speechSynthesis || null;

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.buildDOM();
      this.attachEvents();
    });
  }

  buildDOM() {
    // 1. Floating Trigger Button
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'ai-companion-btn';
    triggerBtn.className = 'ai-companion-trigger';
    triggerBtn.setAttribute('aria-label', 'Open AryanAI Voice Companion');
    triggerBtn.innerHTML = `
      <div class="ai-trigger-pulse"></div>
      <span class="ai-trigger-icon">🤖</span>
      <span class="ai-trigger-text">AryanAI Companion</span>
    `;
    document.body.appendChild(triggerBtn);

    // 2. Chat & Voice Dialog Panel
    const panel = document.createElement('div');
    panel.id = 'ai-companion-panel';
    panel.className = 'ai-companion-dialog hud-panel';
    panel.innerHTML = `
      <div class="hud-corner-tl"></div><div class="hud-corner-tr"></div>
      <div class="hud-corner-bl"></div><div class="hud-corner-br"></div>

      <div class="ai-dialog-header">
        <div class="d-flex align-items-center gap-2">
          <div class="ai-status-indicator"></div>
          <div>
            <h4 class="ai-dialog-title">AryanAI // Voice Companion</h4>
            <span class="mono-tag text-cyan" style="font-size: 0.68rem;">2026.4 NEURAL AGENT ACTIVE</span>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button id="ai-voice-toggle" class="ai-mini-btn" title="Toggle AI Voice Output">🎙️</button>
          <button id="ai-dialog-close" class="ai-mini-btn" title="Close Companion">✕</button>
        </div>
      </div>

      <div class="ai-messages-box" id="ai-messages-box">
        <div class="ai-msg ai-bot">
          <span class="ai-bot-badge">AI</span>
          <div class="ai-msg-content">
            Hello! I am <strong>AryanAI</strong>, the neural assistant trained on Aryan Saxena's resume, engineering projects, and AI models. Ask me anything or tap a prompt below!
          </div>
        </div>
      </div>

      <div class="ai-quick-prompts">
        <button class="ai-prompt-chip" data-q="What are Aryan's top AI & ML skills?">AI &amp; PyTorch Skills</button>
        <button class="ai-prompt-chip" data-q="Tell me about the MONOPOLY Voice AI assistant">MONOPOLY Voice AI</button>
        <button class="ai-prompt-chip" data-q="What is Aryan's education background?">Education &amp; College</button>
        <button class="ai-prompt-chip" data-q="How can I contact or hire Aryan?">Contact / Hire</button>
      </div>

      <form id="ai-input-form" class="ai-input-wrapper">
        <input type="text" id="ai-user-query" class="ai-input-box" placeholder="Ask AryanAI about skills, projects, stack..." autocomplete="off">
        <button type="submit" class="ai-send-btn" aria-label="Send Query">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;
    document.body.appendChild(panel);

    this.widget = triggerBtn;
    this.panel = panel;
    this.messagesContainer = panel.querySelector('#ai-messages-box');
    this.input = panel.querySelector('#ai-user-query');
  }

  attachEvents() {
    this.widget.addEventListener('click', () => this.togglePanel());
    
    const closeBtn = this.panel.querySelector('#ai-dialog-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.togglePanel(false));

    const voiceBtn = this.panel.querySelector('#ai-voice-toggle');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        this.voiceEnabled = !this.voiceEnabled;
        voiceBtn.style.opacity = this.voiceEnabled ? '1' : '0.4';
        if (window.showToast) {
          window.showToast(`AI Speech Voice: ${this.voiceEnabled ? 'ON' : 'MUTED'}`, 'info');
        }
      });
    }

    const form = this.panel.querySelector('#ai-input-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = this.input.value.trim();
        if (query) {
          this.handleUserQuery(query);
          this.input.value = '';
        }
      });
    }

    this.panel.querySelectorAll('.ai-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        this.handleUserQuery(q);
      });
    });
  }

  togglePanel(forceState) {
    this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
    if (this.isOpen) {
      this.panel.classList.add('active');
      if (window.soundFX) window.soundFX.playModalOpen();
      setTimeout(() => this.input.focus(), 200);
    } else {
      this.panel.classList.remove('active');
      if (this.speechSynth) this.speechSynth.cancel();
    }
  }

  handleUserQuery(userText) {
    // 1. Render user message
    this.appendMessage('user', userText);

    // 2. Generate intelligent response
    const answer = this.generateResponse(userText);

    // 3. Stream AI response
    setTimeout(() => {
      this.appendStreamingBotMessage(answer);
    }, 300);
  }

  generateResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('pytorch')) {
      return `Aryan specializes in **Artificial Intelligence & Machine Learning** (Python, PyTorch, Deep Learning, Voice AI with Edge-TTS, OpenCV), **Full-Stack** (React.js, Next.js, Node.js, Tailwind CSS), **Languages** (C++, C, Java, SQL), and **Core CS** (DSA, DBMS, Linux).`;
    }

    if (q.includes('monopoly') || q.includes('voice') || q.includes('assistant')) {
      return `**MONOPOLY** is Aryan's flagship desktop voice assistant for Windows! It operates in the background via global hotkey (\`Ctrl+Shift+M\`), analyzes screen context in real-time, executes system tasks safely, and speaks naturally using Edge-TTS.`;
    }

    if (q.includes('project') || q.includes('works') || q.includes('built')) {
      return `Aryan's key engineered systems include:\n1. **MONOPOLY AI**: Screen-aware Windows voice assistant.\n2. **PyTorch Deep Learning Engine**: Custom neural classification & regression pipelines.\n3. **Nexus Full-Stack MERN Platform**: Scalable web app with JWT auth and MongoDB.\n4. **NeuroFlow Agentic RAG**: Multi-agent LLM reasoning system.`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('b.tech')) {
      return `Aryan is pursuing a **B.Tech in Computer Science & Engineering (2023 - 2027)** at **Dr. A.P.J. Abdul Kalam Institute of Technology**, Veer Madho Singh Bhandari UTU, Uttarakhand. He completed his Senior Secondary and Secondary education at Rainbow Public School, U.S. Nagar.`;
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
      const email = SecurityShield.getEmail();
      const phone = SecurityShield.getPhone();
      return `You can reach Aryan directly via:\n- 📧 **Email**: ${email}\n- 📞 **Phone / WhatsApp**: ${phone}\n- 📍 **Location**: Rudrapur (U.S. Nagar), Uttarakhand\n- 🐙 **GitHub**: https://github.com/AryanXCode646\n- 💼 **LinkedIn**: https://www.linkedin.com/in/aryan-saxena-0213363ab`;
    }

    if (q.includes('who are you') || q.includes('who is aryan') || q.includes('about')) {
      return `Aryan Saxena is an AI Engineer and Full-Stack Developer specializing in building low-latency intelligent systems, deep learning models with PyTorch, voice interfaces, and modern web applications.`;
    }

    return `Aryan is an AI & Full-Stack Developer with expertise in PyTorch, Voice AI (MONOPOLY Assistant), React, and MERN applications. Feel free to ask about his skills, education, or how to contact him!`;
  }

  appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `ai-msg ai-${role}`;
    msg.innerHTML = `
      ${role === 'bot' ? '<span class="ai-bot-badge">AI</span>' : '<span class="ai-user-badge">YOU</span>'}
      <div class="ai-msg-content">${this.formatMarkdown(text)}</div>
    `;
    this.messagesContainer.appendChild(msg);
    this.scrollToBottom();
  }

  appendStreamingBotMessage(fullText) {
    const msg = document.createElement('div');
    msg.className = 'ai-msg ai-bot';
    msg.innerHTML = `
      <span class="ai-bot-badge">AI</span>
      <div class="ai-msg-content"></div>
    `;
    this.messagesContainer.appendChild(msg);

    const contentDiv = msg.querySelector('.ai-msg-content');
    let index = 0;
    const speed = 12;

    const streamInterval = setInterval(() => {
      index += 3;
      if (index >= fullText.length) {
        index = fullText.length;
        clearInterval(streamInterval);
        contentDiv.innerHTML = this.formatMarkdown(fullText);
        this.scrollToBottom();
        this.speak(fullText);
      } else {
        contentDiv.innerHTML = this.formatMarkdown(fullText.substring(0, index)) + '<span class="ai-stream-cursor">▌</span>';
        this.scrollToBottom();
      }
    }, speed);
  }

  speak(text) {
    if (!this.voiceEnabled || !this.speechSynth) return;
    try {
      this.speechSynth.cancel();
      // Strip markdown for speech
      const plainText = text.replace(/[*_#`\-\[\]]/g, '').replace(/https?:\/\/\S+/g, 'link');
      const utter = new SpeechSynthesisUtterance(plainText);
      utter.rate = 1.05;
      utter.pitch = 1.0;
      this.speechSynth.speak(utter);
    } catch (e) {}
  }

  formatMarkdown(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="ai-code">$1</code>')
      .replace(/\n/g, '<br>');
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// Global instance
window.aryanAI = new AryanAICompanion();
