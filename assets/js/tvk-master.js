(function () {
  'use strict';

  /* ── Particles ── */
  function initParticles() {
    const canvas = document.getElementById('tvk-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(80, Math.floor(w * h / 15000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8, 145, 178, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(8, 145, 178, ${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ── Neural network background ── */
  function initNeural() {
    const canvas = document.getElementById('tvk-neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let w, h, t = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      nodes = [];
      const count = 25;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.005;
      nodes.forEach((n, i) => {
        n.x += Math.sin(t + n.phase) * 0.3;
        n.y += Math.cos(t + n.phase * 1.3) * 0.3;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(30, 64, 175, ${0.04 * (1 - dist / 200)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ── Ecosystem Galaxy ── */
  function initGalaxy() {
    const canvas = document.getElementById('tvk-galaxy-canvas');
    const tooltip = document.getElementById('tvk-galaxy-tooltip');
    if (!canvas) return;

    const ecosystems = window.TVK_ECOSYSTEMS || [];
    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, angle = 0;
    let hovered = null;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w / 2;
      cy = h / 2;
    }

    function getNodePositions() {
      const radius = Math.min(w, h) * 0.38;
      return ecosystems.map((eco, i) => {
        const a = (i / ecosystems.length) * Math.PI * 2 + angle;
        const r = radius + Math.sin(angle * 2 + i) * 20;
        return {
          ...eco,
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          angle: a
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const nodes = getNodePositions();

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        const grad = ctx.createLinearGradient(cx, cy, n.x, n.y);
        grad.addColorStop(0, 'rgba(8, 145, 178, 0.3)');
        grad.addColorStop(1, 'rgba(8, 145, 178, 0.05)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = hovered === n.id ? 2 : 1;
        ctx.stroke();
      });

      const pulse = Math.sin(angle * 3) * 0.15 + 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 45 * pulse, 0, Math.PI * 2);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      coreGrad.addColorStop(0, '#0891b2');
      coreGrad.addColorStop(0.6, '#1e40af');
      coreGrad.addColorStop(1, 'rgba(30, 64, 175, 0.2)');
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(103, 232, 249, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TVK GROUP', cx, cy);

      nodes.forEach(n => {
        const isHovered = hovered === n.id;
        const size = isHovered ? 14 : 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#67e8f9' : '#0891b2';
        ctx.fill();
        if (isHovered) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = isHovered ? '#0f172a' : '#475569';
        ctx.font = `${isHovered ? 'bold ' : ''}9px Inter, sans-serif`;
        const labelY = n.y + (n.y > cy ? 22 : -16);
        ctx.fillText(n.name, n.x, labelY);
      });

      angle += 0.003;
      requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const nodes = getNodePositions();
      hovered = null;
      nodes.forEach(n => {
        if (Math.hypot(mx - n.x, my - n.y) < 18) hovered = n.id;
      });
      canvas.style.cursor = hovered ? 'pointer' : 'default';

      if (tooltip && hovered) {
        const node = nodes.find(n => n.id === hovered);
        tooltip.querySelector('h4').textContent = node.name;
        tooltip.querySelector('p').textContent = node.desc;
        tooltip.style.left = (e.clientX - rect.left + 15) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
        tooltip.classList.add('visible');
      } else if (tooltip) {
        tooltip.classList.remove('visible');
      }
    });

    canvas.addEventListener('click', () => {
      if (!hovered) return;
      const node = ecosystems.find(e => e.id === hovered);
      if (node && node.url) window.open(node.url, '_blank');
    });

    canvas.addEventListener('mouseleave', () => {
      hovered = null;
      if (tooltip) tooltip.classList.remove('visible');
    });

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ── Tech Stack visualization ── */
  function initTechStack() {
    const canvas = document.getElementById('tvk-tech-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const techs = ['AI', 'Blockchain', 'Identity', 'Energy', 'Security', 'Governance', 'Analytics', 'Infrastructure'];
    let w, h, cx, cy, activeIdx = -1, t = 0;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w / 2;
      cy = h / 2;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.02;
      const radius = Math.min(w, h) * 0.32;

      techs.forEach((name, i) => {
        const a = (i / techs.length) * Math.PI * 2 - Math.PI / 2 + t * 0.1;
        const x = cx + Math.cos(a) * radius;
        const y = cy + Math.sin(a) * radius;
        const isActive = i === activeIdx;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = isActive ? 'rgba(103, 232, 249, 0.6)' : 'rgba(8, 145, 178, 0.15)';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, isActive ? 28 : 22, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 30);
        g.addColorStop(0, isActive ? '#67e8f9' : '#0891b2');
        g.addColorStop(1, isActive ? '#1e40af' : 'rgba(30, 64, 175, 0.6)');
        ctx.fillStyle = g;
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = `bold ${isActive ? 11 : 9}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const short = name.length > 10 ? name.slice(0, 8) + '…' : name;
        ctx.fillText(short, x, y);
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#0891b2';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#67e8f9';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText('TVK', cx, cy);

      requestAnimationFrame(draw);
    }

    const tags = document.querySelectorAll('.tvk-tech-tag');
    tags.forEach((tag, i) => {
      tag.addEventListener('mouseenter', () => {
        activeIdx = i;
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
      });
      tag.addEventListener('mouseleave', () => {
        activeIdx = -1;
        tag.classList.remove('active');
      });
    });

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ── World Map ── */
  function initWorldMap() {
    const svg = document.getElementById('tvk-world-map');
    if (!svg) return;

    const locations = [
      { x: 520, y: 175, label: 'UAE — RAK DAO HQ', type: 'hq' },
      { x: 480, y: 140, label: 'UK — TVK Labs', type: 'research' },
      { x: 510, y: 145, label: 'Germany — Logistics', type: 'infra' },
      { x: 540, y: 160, label: 'Switzerland — Foundation', type: 'partnership' },
      { x: 200, y: 200, label: 'Americas — Expansion', type: 'expansion' },
      { x: 750, y: 190, label: 'Asia-Pacific — Research', type: 'research' },
      { x: 600, y: 280, label: 'Africa — Infrastructure', type: 'infra' },
      { x: 480, y: 300, label: 'Middle East — Energy', type: 'infra' },
      { x: 535, y: 158, label: 'Türkiye — TVK Group Teknoloji', type: 'hq' }
    ];

    const colors = {
      hq: '#0891b2',
      research: '#1e40af',
      infra: '#0d9488',
      partnership: '#6366f1',
      expansion: '#f59e0b'
    };

    locations.forEach((loc, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'tvk-map-marker');
      g.style.cursor = 'pointer';

      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', loc.x);
      pulse.setAttribute('cy', loc.y);
      pulse.setAttribute('r', '12');
      pulse.setAttribute('fill', colors[loc.type] || '#0891b2');
      pulse.setAttribute('opacity', '0.2');
      pulse.innerHTML = `<animate attributeName="r" values="8;20;8" dur="3s" begin="${i * 0.4}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="${i * 0.4}s" repeatCount="indefinite"/>`;

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', loc.x);
      dot.setAttribute('cy', loc.y);
      dot.setAttribute('r', '5');
      dot.setAttribute('fill', colors[loc.type] || '#0891b2');
      dot.setAttribute('stroke', '#fff');
      dot.setAttribute('stroke-width', '2');

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = loc.label;
      g.appendChild(title);
      g.appendChild(pulse);
      g.appendChild(dot);
      svg.appendChild(g);
    });
  }

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.tvk-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── Nav scroll ── */
  function initNav() {
    const nav = document.querySelector('.tvk-nav');
    const toggle = document.querySelector('.tvk-nav-toggle');
    const links = document.querySelector('.tvk-nav-links');

    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      });
    }

    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
      });
    }
  }

  /* ── Visibility-gated animation helper ── */
  function runWhenVisible(canvas, drawFrame) {
    let active = false;
    let raf = 0;

    function loop() {
      if (!active) return;
      drawFrame();
      raf = requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver((entries) => {
      active = entries[0].isIntersecting;
      if (active) {
        cancelAnimationFrame(raf);
        loop();
      }
    }, { threshold: 0.12 });

    observer.observe(canvas);
    active = true;
    loop();
    return observer;
  }

  /* ── SOVRA: Intelligence reasoning network ── */
  function initSovraViz() {
    const canvas = document.getElementById('tvk-sovra-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, t = 0;

    const nodes = [
      { label: 'Reasoning', angle: -Math.PI / 2, color: '#a78bfa' },
      { label: 'Knowledge', angle: -Math.PI / 6, color: '#67e8f9' },
      { label: 'Signals', angle: Math.PI / 6, color: '#818cf8' },
      { label: 'Analytics', angle: Math.PI / 2, color: '#c084fc' },
      { label: 'Inference', angle: (5 * Math.PI) / 6, color: '#38bdf8' },
      { label: 'Memory', angle: (-5 * Math.PI) / 6, color: '#e879f9' }
    ];

    const pulses = nodes.map((_, i) => ({ progress: i / nodes.length, speed: 0.004 + Math.random() * 0.003 }));
    const sparks = Array.from({ length: 24 }, () => ({
      x: Math.random(), y: Math.random(), life: Math.random(), speed: 0.003 + Math.random() * 0.005
    }));

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w * 0.5;
      cy = h * 0.52;
    }

    function nodePos(node, radius) {
      const r = radius + Math.sin(t * 2 + node.angle * 3) * 6;
      return { x: cx + Math.cos(node.angle + t * 0.15) * r, y: cy + Math.sin(node.angle + t * 0.15) * r };
    }

    function drawSparkline(x, y, width, height, phase, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= width; i += 3) {
        const py = y + height / 2 + Math.sin(i * 0.08 + phase) * (height * 0.35) * Math.sin(i * 0.02 + t);
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      const orbitR = Math.min(w, h) * 0.3;

      const corePulse = 0.85 + Math.sin(t * 3) * 0.15;
      const coreR = 38 * corePulse;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.8);
      coreGrad.addColorStop(0, 'rgba(167, 139, 250, 0.45)');
      coreGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
      coreGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 1.8, 0, Math.PI * 2);
      ctx.fill();

      nodes.forEach((node, i) => {
        const pos = nodePos(node, orbitR);
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) pulse.progress = 0;

        const grad = ctx.createLinearGradient(cx, cy, pos.x, pos.y);
        grad.addColorStop(0, 'rgba(167, 139, 250, 0.5)');
        grad.addColorStop(1, node.color + '44');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        const px = cx + (pos.x - cx) * pulse.progress;
        const py = cy + (pos.y - cy) * pulse.progress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = node.color + '33';
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '600 9px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, pos.x, pos.y);
      });

      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      const brainGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      brainGrad.addColorStop(0, '#c4b5fd');
      brainGrad.addColorStop(0.6, '#6366f1');
      brainGrad.addColorStop(1, '#4338ca');
      ctx.fillStyle = brainGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SOVRA', cx, cy - 6);
      ctx.font = '500 7px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText('INTELLIGENCE CORE', cx, cy + 10);

      sparks.forEach(s => {
        s.life += s.speed;
        if (s.life > 1) { s.life = 0; s.x = Math.random(); s.y = Math.random(); }
        const sx = s.x * w;
        const sy = s.y * h;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${(1 - s.life) * 0.6})`;
        ctx.fill();
      });

      drawSparkline(16, h - 56, w * 0.28, 36, t * 2, 'rgba(103, 232, 249, 0.5)');
      drawSparkline(w - w * 0.28 - 16, h - 56, w * 0.28, 36, t * 2.5 + 1, 'rgba(167, 139, 250, 0.5)');

      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(12, 12, w * 0.32, 48);
      ctx.fillRect(w - w * 0.32 - 12, 12, w * 0.32, 48);
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.font = '600 7px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('REASONING PANEL', 20, 24);
      ctx.textAlign = 'right';
      ctx.fillText('KNOWLEDGE GRAPH', w - 20, 24);
      drawSparkline(20, 30, w * 0.28, 24, t * 3, 'rgba(129, 140, 248, 0.7)');
      drawSparkline(w - w * 0.28 - 20, 30, w * 0.28, 24, t * 2.2, 'rgba(56, 189, 248, 0.7)');
    }

    resize();
    window.addEventListener('resize', resize);
    runWhenVisible(canvas, draw);
  }

  /* ── ENTELΞKRON: Sovereign blockchain coordination ── */
  function initEntelekronViz() {
    const canvas = document.getElementById('tvk-entelekron-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, t = 0;

    const validators = 8;
    const modules = [
      { label: 'Identity', angle: -Math.PI / 2, color: '#67e8f9' },
      { label: 'Governance', angle: 0, color: '#818cf8' },
      { label: 'Validators', angle: Math.PI / 2, color: '#34d399' },
      { label: 'Wallets', angle: Math.PI, color: '#fbbf24' },
      { label: 'Protocol', angle: -Math.PI / 4, color: '#38bdf8' },
      { label: 'Intelligence', angle: (3 * Math.PI) / 4, color: '#a78bfa' }
    ];

    let blocks = [];
    for (let i = 0; i < 6; i++) {
      blocks.push({ hash: '#' + (1000 + i) });
    }

    let consensusAngle = 0;
    let lastBlockTick = 0;
    const zkParticles = Array.from({ length: 16 }, () => ({
      x: 0, y: 0, life: Math.random(), block: Math.floor(Math.random() * 5)
    }));

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w * 0.5;
      cy = h * 0.5;
    }

    function drawBlock(x, y, bw, bh, hash, highlight) {
      const r = 6;
      ctx.fillStyle = highlight ? 'rgba(8, 145, 178, 0.35)' : 'rgba(255,255,255,0.06)';
      ctx.strokeStyle = highlight ? '#67e8f9' : 'rgba(103, 232, 249, 0.35)';
      ctx.lineWidth = highlight ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + bw - r, y);
      ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
      ctx.lineTo(x + bw, y + bh - r);
      ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
      ctx.lineTo(x + r, y + bh);
      ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = highlight ? '#67e8f9' : 'rgba(255,255,255,0.5)';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(hash, x + bw / 2, y + bh / 2 - 2);
      ctx.font = '6px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText('zk-DPoS', x + bw / 2, y + bh / 2 + 10);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      consensusAngle += 0.025;

      const valR = Math.min(w, h) * 0.34;
      for (let i = 0; i < validators; i++) {
        const a = (i / validators) * Math.PI * 2 + t * 0.08;
        const vx = cx + Math.cos(a) * valR;
        const vy = cy + Math.sin(a) * valR;
        const isActive = Math.abs(((consensusAngle % (Math.PI * 2)) - a + Math.PI * 3) % (Math.PI * 2) - Math.PI) < 0.5;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(vx, vy);
        ctx.strokeStyle = isActive ? 'rgba(52, 211, 153, 0.4)' : 'rgba(8, 145, 178, 0.12)';
        ctx.lineWidth = isActive ? 1.5 : 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(vx, vy, isActive ? 9 : 7, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? 'rgba(52, 211, 153, 0.5)' : 'rgba(8, 145, 178, 0.25)';
        ctx.fill();
        ctx.strokeStyle = isActive ? '#34d399' : '#0891b2';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (isActive) {
          ctx.beginPath();
          ctx.arc(vx, vy, 14, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      const modR = Math.min(w, h) * 0.22;
      modules.forEach(mod => {
        const mx = cx + Math.cos(mod.angle + t * 0.1) * modR;
        const my = cy + Math.sin(mod.angle + t * 0.1) * modR;
        ctx.beginPath();
        ctx.arc(mx, my, 10, 0, Math.PI * 2);
        ctx.fillStyle = mod.color + '44';
        ctx.fill();
        ctx.strokeStyle = mod.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '600 7px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(mod.label, mx, my + 22);
      });

      const coreR = 32 + Math.sin(t * 2) * 3;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0, '#0891b2');
      coreGrad.addColorStop(0.7, '#1e40af');
      coreGrad.addColorStop(1, '#0f172a');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.strokeStyle = '#67e8f9';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ENTELΞKRON', cx, cy);

      const bw = Math.min(52, w * 0.09);
      const bh = 36;
      const chainY = h - bh - 28;
      const chainW = blocks.length * (bw + 10) - 10;
      let startX = (w - chainW) / 2;

      if (t - lastBlockTick > 3.5) {
        lastBlockTick = t;
        blocks.push({ hash: '#' + Math.floor(1000 + Math.random() * 9000) });
        if (blocks.length > 7) blocks.shift();
      }

      blocks.forEach((block, i) => {
        const bx = startX + i * (bw + 10);
        const isNewest = i === blocks.length - 1;
        drawBlock(bx, chainY, bw, bh, block.hash, isNewest);

        if (i < blocks.length - 1) {
          const nx = startX + (i + 1) * (bw + 10);
          ctx.strokeStyle = 'rgba(103, 232, 249, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(bx + bw, chainY + bh / 2);
          ctx.lineTo(nx, chainY + bh / 2);
          ctx.stroke();

          const flowX = bx + bw + ((nx - bx - bw) * ((t * 0.8 + i) % 1));
          ctx.beginPath();
          ctx.arc(flowX, chainY + bh / 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#67e8f9';
          ctx.fill();
        }
      });

      zkParticles.forEach(p => {
        p.life += 0.008;
        if (p.life > 1) p.life = 0;
        const bi = Math.min(p.block, blocks.length - 1);
        const bx = startX + bi * (bw + 10) + bw / 2;
        const by = chainY + bh / 2;
        const px = bx + (Math.random() - 0.5) * 30;
        const py = by - 20 - p.life * 40;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${1 - p.life})`;
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '600 7px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SOVEREIGN CHAIN · zk-DPoS CONSENSUS', w / 2, chainY - 10);
    }

    resize();
    window.addEventListener('resize', resize);
    runWhenVisible(canvas, draw);
  }

  /* ── Hero infrastructure canvas ── */
  function initHeroViz() {
    const canvas = document.getElementById('tvk-hero-viz-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, t = 0;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.02;
      const lines = 5;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const y = h * 0.3 + i * (h * 0.12);
        for (let x = 0; x <= w; x += 4) {
          const wave = Math.sin(x * 0.01 + t + i) * 15;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = `rgba(103, 232, 249, ${0.15 + i * 0.05})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ── Init ── */
  function init() {
    initParticles();
    initNeural();
    initGalaxy();
    initTechStack();
    initWorldMap();
    initScrollReveal();
    initNav();
    initHeroViz();
    initSovraViz();
    initEntelekronViz();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
