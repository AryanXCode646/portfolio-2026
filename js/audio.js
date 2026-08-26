/**
 * 2026 Motion Designer - Procedural Web Audio FX Synthesizer
 * Pure Web Audio API synthesized sound effects (zero external mp3 assets needed).
 */

class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('aryan_audio_enabled') === 'true';
    this.init();
  }

  init() {
    // Create AudioContext on first user gesture
    const unlockAudio = () => {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    this.attachUiListeners();
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('aryan_audio_enabled', this.enabled);
    this.updateIcon();
    if (this.enabled) {
      this.playChime(600, 800);
      if (window.showToast) window.showToast('Audio FX: ENABLED', 'info');
    } else {
      if (window.showToast) window.showToast('Audio FX: MUTED', 'info');
    }
    return this.enabled;
  }

  updateIcon() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    if (this.enabled) {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
      btn.classList.add('sound-active');
    } else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" x2="1" y1="1" y2="23"/></svg>`;
      btn.classList.remove('sound-active');
    }
  }

  playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime(f1 = 440, f2 = 880) {
    if (!this.enabled || !this.ctx) return;
    this.playTone(f1, 'sine', 0.1, 0.04);
    setTimeout(() => this.playTone(f2, 'sine', 0.15, 0.04), 60);
  }

  playClick() {
    this.playTone(1200, 'triangle', 0.03, 0.03);
  }

  playHover() {
    this.playTone(380, 'sine', 0.04, 0.015);
  }

  playKeystroke() {
    const f = 700 + Math.random() * 200;
    this.playTone(f, 'sine', 0.02, 0.02);
  }

  playModalOpen() {
    this.playChime(520, 1040);
  }

  attachUiListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateIcon();

      const soundBtn = document.getElementById('sound-toggle-btn');
      if (soundBtn) {
        soundBtn.addEventListener('click', () => this.toggle());
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('button, a, .skill-card, .project-card, .term-chip')) {
        this.playClick();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.playKeystroke();
      }
    });
  }
}

// Global instance
window.soundFX = new SoundFXEngine();
