/**
 * 2026 In-Browser Neural Network Visualizer & Tensor Sandbox (NeuralMatrix)
 * Real-time forward-propagation canvas visualizer with interactive weights and activations.
 */

class NeuralMatrixSandbox {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.layers = [4, 6, 6, 3]; // Input, Hidden 1, Hidden 2, Output
    this.activation = 'relu';
    this.pulses = [];
    this.nodes = [];
    this.weights = [];
    this.outputs = [0.1, 0.8, 0.1];
    this.isRunning = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.buildNetwork();
    this.attachControls();
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    this.width = parent.clientWidth || 600;
    this.height = 320;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.buildNetwork();
  }

  buildNetwork() {
    this.nodes = [];
    this.weights = [];

    const numLayers = this.layers.length;
    const xStep = this.width / (numLayers + 1);

    for (let l = 0; l < numLayers; l++) {
      const numNodes = this.layers[l];
      const layerNodes = [];
      const yStep = this.height / (numNodes + 1);

      for (let n = 0; n < numNodes; n++) {
        layerNodes.push({
          x: xStep * (l + 1),
          y: yStep * (n + 1),
          activation: Math.random() * 0.8 + 0.1,
          layer: l,
          index: n
        });
      }
      this.nodes.push(layerNodes);
    }

    // Initialize Synapse Weights
    for (let l = 0; l < numLayers - 1; l++) {
      const layerWeights = [];
      for (let i = 0; i < this.nodes[l].length; i++) {
        const nodeWeights = [];
        for (let j = 0; j < this.nodes[l + 1].length; j++) {
          nodeWeights.push((Math.random() * 2 - 1).toFixed(2));
        }
        layerWeights.push(nodeWeights);
      }
      this.weights.push(layerWeights);
    }
  }

  stimulate(featureVec = null) {
    // Set input activations
    const inputs = featureVec || [Math.random(), Math.random(), Math.random(), Math.random()];
    for (let i = 0; i < this.nodes[0].length; i++) {
      this.nodes[0][i].activation = inputs[i] || 0.5;
    }

    // Launch signal pulses across synapses
    for (let i = 0; i < this.nodes[0].length; i++) {
      for (let j = 0; j < this.nodes[1].length; j++) {
        this.pulses.push({
          fromX: this.nodes[0][i].x,
          fromY: this.nodes[0][i].y,
          toX: this.nodes[1][j].x,
          toY: this.nodes[1][j].y,
          progress: 0,
          speed: 0.035 + Math.random() * 0.02,
          color: '#00f0ff',
          targetLayer: 1,
          targetNode: j
        });
      }
    }

    if (window.soundFX) window.soundFX.playTone(520, 'sine', 0.06, 0.02);
  }

  setActivation(act) {
    this.activation = act;
    this.stimulate();
    if (window.showToast) window.showToast(`Activation Function: ${act.toUpperCase()}`, 'info');
  }

  attachControls() {
    const actSelector = document.getElementById('neural-act-select');
    if (actSelector) {
      actSelector.addEventListener('change', (e) => this.setActivation(e.target.value));
    }

    const stimulateBtn = document.getElementById('neural-stimulate-btn');
    if (stimulateBtn) {
      stimulateBtn.addEventListener('click', () => this.stimulate());
    }

    // Canvas click stimulation
    this.canvas.addEventListener('click', (e) => {
      this.stimulate();
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Synapses
    for (let l = 0; l < this.nodes.length - 1; l++) {
      for (let i = 0; i < this.nodes[l].length; i++) {
        const from = this.nodes[l][i];
        for (let j = 0; j < this.nodes[l + 1].length; j++) {
          const to = this.nodes[l + 1][j];
          const w = parseFloat(this.weights[l][i][j]);

          this.ctx.beginPath();
          this.ctx.moveTo(from.x, from.y);
          this.ctx.lineTo(to.x, to.y);
          this.ctx.strokeStyle = w > 0 ? `rgba(0, 240, 255, ${Math.abs(w) * 0.35})` : `rgba(168, 85, 247, ${Math.abs(w) * 0.35})`;
          this.ctx.lineWidth = Math.max(1, Math.abs(w) * 2.2);
          this.ctx.stroke();
        }
      }
    }

    // 2. Update & Draw Signal Pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.progress += p.speed;

      const curX = p.fromX + (p.toX - p.fromX) * p.progress;
      const curY = p.fromY + (p.toY - p.fromY) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      if (p.progress >= 1) {
        // Trigger forward propagation to next layer
        if (p.targetLayer < this.nodes.length - 1) {
          const nextL = p.targetLayer + 1;
          for (let k = 0; k < this.nodes[nextL].length; k++) {
            this.pulses.push({
              fromX: this.nodes[p.targetLayer][p.targetNode].x,
              fromY: this.nodes[p.targetLayer][p.targetNode].y,
              toX: this.nodes[nextL][k].x,
              toY: this.nodes[nextL][k].y,
              progress: 0,
              speed: 0.035 + Math.random() * 0.02,
              color: nextL === this.nodes.length - 1 ? '#a3e635' : '#a855f7',
              targetLayer: nextL,
              targetNode: k
            });
          }
        }
        this.pulses.splice(i, 1);
      }
    }

    // 3. Draw Neurons
    for (let l = 0; l < this.nodes.length; l++) {
      for (let n = 0; n < this.nodes[l].length; n++) {
        const node = this.nodes[l][n];
        const isOutput = l === this.nodes.length - 1;
        const isInput = l === 0;

        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, isOutput ? 12 : 9, 0, Math.PI * 2);

        if (isInput) {
          this.ctx.fillStyle = `rgba(0, 240, 255, ${0.4 + node.activation * 0.6})`;
          this.ctx.strokeStyle = '#00f0ff';
        } else if (isOutput) {
          this.ctx.fillStyle = `rgba(163, 230, 53, ${0.4 + node.activation * 0.6})`;
          this.ctx.strokeStyle = '#a3e635';
        } else {
          this.ctx.fillStyle = `rgba(168, 85, 247, ${0.3 + node.activation * 0.7})`;
          this.ctx.strokeStyle = '#a855f7';
        }

        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.stroke();

        // Node Glow
        this.ctx.shadowColor = this.ctx.strokeStyle;
        this.ctx.shadowBlur = node.activation * 12;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.neuralSandbox = new NeuralMatrixSandbox('neural-canvas');
});
