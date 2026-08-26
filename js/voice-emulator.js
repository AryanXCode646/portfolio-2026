/**
 * 2026 MONOPOLY Voice & Vision AI Live Assistant Emulator
 * Interactive Web Simulation of Aryan Saxena's Flagship Desktop AI System.
 */

class MonopolyVoiceEmulator {
  constructor() {
    this.container = document.getElementById('voice-emulator-hub');
    this.statusTag = document.getElementById('monopoly-status-tag');
    this.intentDisplay = document.getElementById('monopoly-intent-display');
    this.actionDisplay = document.getElementById('monopoly-action-display');
    this.voiceOutput = document.getElementById('monopoly-voice-output');
    this.waveform = document.getElementById('monopoly-waveform');
    this.isProcessing = false;

    if (!this.container) return;
    this.init();
  }

  init() {
    this.attachPresetButtons();
    this.attachCustomInput();
  }

  attachPresetButtons() {
    const buttons = document.querySelectorAll('.voice-cmd-pill');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-cmd') || btn.innerText;
        this.processVoiceCommand(text);
      });
    });
  }

  attachCustomInput() {
    const form = document.getElementById('monopoly-input-form');
    const input = document.getElementById('monopoly-cmd-input');
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          this.processVoiceCommand(query);
          input.value = '';
        }
      });
    }
  }

  processVoiceCommand(rawText) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    if (window.soundFX) window.soundFX.playClick();
    if (this.waveform) this.waveform.classList.add('active-waveform');
    if (this.statusTag) {
      this.statusTag.innerHTML = `<span class="pulse-dot"></span> LISTENING &amp; ROUTING INTENT...`;
      this.statusTag.className = "mono-tag text-cyan";
    }

    const clean = rawText.toLowerCase();

    let parsedIntent = "INTENT_UNKNOWN";
    let actionResult = "System fallback executed";
    let spokenReply = "Command received by MONOPOLY engine.";

    if (clean.includes('screen') || clean.includes('error') || clean.includes('inspect')) {
      parsedIntent = "VISION_SCREEN_INSPECT_ERROR";
      actionResult = "PIL/OpenCV frame grab -> 0 errors detected. System operating at nominal state.";
      spokenReply = "Screen context scanned. No fatal runtime errors detected on display.";
    } else if (clean.includes('pytorch') || clean.includes('train') || clean.includes('model')) {
      parsedIntent = "ML_PYTORCH_TRAINING_PIPELINE";
      actionResult = "Triggering DataLoader -> AdamW optimizer -> Loss: 0.041 (Epoch 40/50).";
      spokenReply = "PyTorch training loop initialized with AdamW optimizer and early stopping.";
    } else if (clean.includes('memory') || clean.includes('optimize') || clean.includes('system')) {
      parsedIntent = "OS_PROCESS_MEMORY_TRIM";
      actionResult = "Win32 SetProcessWorkingSetSize invoked -> 124MB RAM reclaimed.";
      spokenReply = "Background memory trimmed successfully. System latency reduced to under 40 milliseconds.";
    } else if (clean.includes('interview') || clean.includes('schedule') || clean.includes('hire')) {
      parsedIntent = "RECRUITER_CONTACT_DISPATCH";
      const email = typeof SecurityShield !== 'undefined' ? SecurityShield.getEmail() : 'aryansaxena407@gmail.com';
      actionResult = `Opening recruitment channel for Aryan Saxena -> ${email}`;
      spokenReply = "Dispatching interview request to Aryan Saxena. Priority communication channel ready.";
    } else if (clean.includes('music') || clean.includes('focus') || clean.includes('play')) {
      parsedIntent = "MEDIA_SYNTH_AUDIO_STREAM";
      actionResult = "Synthesizing 432Hz ambient focus frequencies via Web Audio.";
      spokenReply = "Playing ambient focus stream for deep engineering sessions.";
      if (window.soundFX) window.soundFX.playChime(432, 864);
    } else {
      parsedIntent = "GENERIC_TASK_DISPATCH";
      actionResult = `Interpreted query: "${rawText}" -> Executing agent reasoning loop.`;
      spokenReply = `Task executed: ${rawText}`;
    }

    // Update displays after simulated latency
    setTimeout(() => {
      if (this.intentDisplay) this.intentDisplay.textContent = parsedIntent;
      if (this.actionDisplay) this.actionDisplay.textContent = actionResult;
      if (this.voiceOutput) this.voiceOutput.textContent = spokenReply;

      if (this.statusTag) {
        this.statusTag.innerHTML = `🟢 MONOPOLY // INTENT EXECUTED (Latency: 38ms)`;
        this.statusTag.className = "mono-tag text-emerald";
      }

      // Voice synthesis
      if (window.speechSynthesis && !clean.includes('music')) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(spokenReply);
          utter.rate = 1.05;
          window.speechSynthesis.speak(utter);
        } catch (e) {}
      }

      setTimeout(() => {
        if (this.waveform) this.waveform.classList.remove('active-waveform');
        this.isProcessing = false;
      }, 1200);
    }, 450);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.monopolyEmulator = new MonopolyVoiceEmulator();
});
