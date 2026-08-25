/**
 * 2026 Motion Designer - Interactive 3D Holographic Geometry Engine
 * High-performance 3D Wireframe Icosahedron & Neural Particle Matrix
 * Reacts to mouse cursor, scroll velocity, and orientation.
 */

class HologramEngine3D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = 0;
    this.height = 0;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.rotVelocity = { x: 0.003, y: 0.005, z: 0.002 };
    this.nodes = [];
    this.particles = [];
    this.edges = [];
    this.radius = 220;
    this.theme = 'dark';
    this.animFrame = null;

    this.init();
  }

  init() {
    this.resize();
    this.build3DGeometry();
    this.buildParticles();
    this.attachEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = Math.min(this.width, this.height) * 0.28;
    if (this.radius > 260) this.radius = 260;
    if (this.radius < 140) this.radius = 140;
  }

  setTheme(theme) {
    this.theme = theme;
  }

  build3DGeometry() {
    // Generate Icosahedron vertices & Fibonacci Sphere nodes
    this.nodes = [];
    this.edges = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVerts = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];

    // Normalize and scale
    this.nodes = baseVerts.map(v => {
      const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return {
        x: (v[0] / len) * this.radius,
        y: (v[1] / len) * this.radius,
        z: (v[2] / len) * this.radius,
        baseRadius: 4,
        pulse: Math.random() * Math.PI * 2
      };
    });

    // Add geodesic sub-nodes on sphere
    const numSubNodes = 36;
    for (let i = 0; i < numSubNodes; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / numSubNodes);
      const phiAngle = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      this.nodes.push({
        x: Math.sin(theta) * Math.cos(phiAngle) * (this.radius * 0.88),
        y: Math.sin(theta) * Math.sin(phiAngle) * (this.radius * 0.88),
        z: Math.cos(theta) * (this.radius * 0.88),
        baseRadius: 2.5,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Build connections between near nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dz = this.nodes[i].z - this.nodes[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < this.radius * 1.05) {
          this.edges.push([i, j, dist]);
        }
      }
    }
  }

  buildParticles() {
    this.particles = [];
    const count = Math.floor((this.width * this.height) / 16000);
    const total = Math.min(Math.max(count, 50), 120);

    for (let i = 0; i < total; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        colorIndex: Math.floor(Math.random() * 3)
      });
    }
  }

  attachEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.build3DGeometry();
      this.buildParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX - this.centerX) / this.centerX;
      this.mouse.targetY = (e.clientY - this.centerY) / this.centerY;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
      this.mouse.active = false;
    });
  }

  rotatePoint(p, rx, ry, rz) {
    // Y-axis rotation
    let cosY = Math.cos(ry), sinY = Math.sin(ry);
    let x1 = p.x * cosY + p.z * sinY;
    let z1 = -p.x * sinY + p.z * cosY;

    // X-axis rotation
    let cosX = Math.cos(rx), sinX = Math.sin(rx);
    let y2 = p.y * cosX - z1 * sinX;
    let z2 = p.y * sinX + z1 * cosX;

    // Z-axis rotation
    let cosZ = Math.cos(rz), sinZ = Math.sin(rz);
    let x3 = x1 * cosZ - y2 * sinZ;
    let y3 = x1 * sinZ + y2 * cosZ;

    // Perspective projection
    const fov = 450;
    const scale = fov / (fov + z2);

    return {
      x: x3 * scale + this.centerX,
      y: y3 * scale + this.centerY,
      z: z2,
      scale: scale
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const cyan = isDark ? '#06b6d4' : '#0891b2';
    const violet = isDark ? '#8b5cf6' : '#7c3aed';
    const emerald = isDark ? '#10b981' : '#059669';

    // 1. Draw Background Floating Starfield / Particles
    for (let i = 0; i < this.particles.length; i++) {
      const pt = this.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;

      if (pt.x < 0 || pt.x > this.width) pt.vx *= -1;
      if (pt.y < 0 || pt.y > this.height) pt.vy *= -1;

      // Mouse interactive push
      if (this.mouse.active) {
        const dx = this.mouse.x - pt.x;
        const dy = this.mouse.y - pt.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          const force = (120 - d) / 120;
          pt.x -= (dx / d) * force * 3;
          pt.y -= (dy / d) * force * 3;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      this.ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.2)';
      this.ctx.fill();
    }

    // 2. Animate 3D Holographic Geometry
    // Smooth mouse interpolation
    this.rotation.y += this.rotVelocity.y + this.mouse.targetX * 0.015;
    this.rotation.x += this.rotVelocity.x - this.mouse.targetY * 0.015;
    this.rotation.z += this.rotVelocity.z;

    const projectedNodes = this.nodes.map(node => {
      node.pulse += 0.03;
      return this.rotatePoint(node, this.rotation.x, this.rotation.y, this.rotation.z);
    });

    // Draw Edges with depth alpha
    for (let i = 0; i < this.edges.length; i++) {
      const [u, v] = this.edges[i];
      const p1 = projectedNodes[u];
      const p2 = projectedNodes[v];

      // Depth fade
      const avgZ = (p1.z + p2.z) / 2;
      const alpha = Math.max(0.04, Math.min(0.45, (avgZ + this.radius) / (this.radius * 2)));

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${alpha * 0.7})` : `rgba(8, 145, 178, ${alpha * 0.5})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // Draw Projected Nodes / Glowing Vertices
    for (let i = 0; i < projectedNodes.length; i++) {
      const p = projectedNodes[i];
      const alpha = Math.max(0.15, Math.min(0.9, (p.z + this.radius) / (this.radius * 2)));
      const rad = Math.max(1.5, p.scale * 3.5);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      this.ctx.fillStyle = i % 2 === 0 
        ? `rgba(6, 182, 212, ${alpha})`
        : `rgba(139, 92, 246, ${alpha})`;

      if (isDark) {
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = i % 2 === 0 ? cyan : violet;
      }
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.particleEngine = new HologramEngine3D('particle-canvas');
});
