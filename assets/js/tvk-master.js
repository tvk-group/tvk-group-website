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

  /* ── SOVRA: Sovereign Radiance (SOV + RA) ── */
  function initSovraViz() {
    const canvas = document.getElementById('tvk-sovra-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, t = 0;

    const letters = ['S', 'O', 'V', 'R', 'A'];
    const auroraBands = 5;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w * 0.5;
      cy = h * 0.5;
    }

    function drawSovereignRays(count, innerR, outerR, rotation, color, width) {
      for (let i = 0; i < count; i++) {
        const a = rotation + (i / count) * Math.PI * 2;
        const spread = (Math.PI * 2 / count) * 0.35;
        const pulse = 0.7 + Math.sin(t * 2.5 + i * 1.2) * 0.3;
        const r2 = outerR * pulse;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a - spread) * innerR, cy + Math.sin(a - spread) * innerR);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.lineTo(cx + Math.cos(a + spread) * innerR, cy + Math.sin(a + spread) * innerR);
        ctx.closePath();
        const g = ctx.createRadialGradient(cx, cy, innerR, cx, cy, r2);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fill();
      }
      ctx.strokeStyle = color.replace('0.25', '0.5').replace('0.3', '0.55');
      ctx.lineWidth = width;
      for (let i = 0; i < count; i++) {
        const a = rotation + (i / count) * Math.PI * 2;
        const r2 = outerR * (0.7 + Math.sin(t * 2.5 + i * 1.2) * 0.3);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * innerR, cy + Math.sin(a) * innerR);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.stroke();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      const scale = Math.min(w, h);

      for (let b = 0; b < auroraBands; b++) {
        const bandY = cy + Math.sin(t * 0.6 + b * 1.4) * 12;
        const bandR = scale * (0.42 + b * 0.06);
        ctx.beginPath();
        ctx.ellipse(cx, bandY, bandR, bandR * 0.22, t * 0.08 + b * 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${180 - b * 20}, ${140 - b * 15}, ${255 - b * 10}, ${0.06 + b * 0.02})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      [0.38, 0.48, 0.58].forEach((fr, i) => {
        const ringR = scale * fr;
        const rot = t * (0.15 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, rot, rot + Math.PI * 1.35);
        ctx.strokeStyle = `rgba(232, 196, 104, ${0.15 - i * 0.03})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, rot + Math.PI, rot + Math.PI * 2.35);
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 - i * 0.04})`;
        ctx.stroke();
      });

      drawSovereignRays(12, scale * 0.12, scale * 0.46, t * 0.12, 'rgba(232, 196, 104, 0.18)', 0.8);
      drawSovereignRays(12, scale * 0.14, scale * 0.4, -t * 0.18 + 0.3, 'rgba(167, 139, 250, 0.15)', 0.6);

      letters.forEach((letter, i) => {
        const a = -Math.PI / 2 + (i / letters.length) * Math.PI * 2 + t * 0.2;
        const r = scale * 0.28;
        const lx = cx + Math.cos(a) * r;
        const ly = cy + Math.sin(a) * r;
        const glow = 0.5 + Math.sin(t * 3 + i * 1.5) * 0.5;

        ctx.beginPath();
        ctx.arc(lx, ly, 16, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 196, 104, ${0.08 + glow * 0.12})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(232, 196, 104, ${0.3 + glow * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 248, 220, ${0.6 + glow * 0.4})`;
        ctx.font = 'bold 14px Playfair Display, Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, lx, ly);

        const px = cx + (lx - cx) * ((t * 0.3 + i * 0.2) % 1);
        const py = cy + (ly - cy) * ((t * 0.3 + i * 0.2) % 1);
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#e8c468';
        ctx.fill();
      });

      const haloR = scale * 0.14 + Math.sin(t * 2) * 4;
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR * 2.5);
      halo.addColorStop(0, 'rgba(255, 248, 220, 0.5)');
      halo.addColorStop(0.35, 'rgba(232, 196, 104, 0.25)');
      halo.addColorStop(0.7, 'rgba(139, 92, 246, 0.12)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      core.addColorStop(0, '#fff8dc');
      core.addColorStop(0.5, '#c4a035');
      core.addColorStop(1, '#6d28d9');
      ctx.fillStyle = core;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 248, 220, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#1a0a2e';
      ctx.font = 'bold 18px Playfair Display, Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SOVRA', cx, cy - 1);

      ctx.fillStyle = 'rgba(232, 196, 104, 0.7)';
      ctx.font = '600 7px Inter, sans-serif';
      ctx.fillText('SOVEREIGN · RADIANCE', cx, cy + haloR + 22);
    }

    resize();
    window.addEventListener('resize', resize);
    runWhenVisible(canvas, draw);
  }

  /* ── ENTELΞKRON: Temporal Entelechy (Entele + Kron + Ξ) ── */
  function initEntelekronViz() {
    const canvas = document.getElementById('tvk-entelekron-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, t = 0;

    const epochCount = 10;
    let epochPhase = 0;
    const entelechyParticles = Array.from({ length: 40 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: 0.6 + Math.random() * 0.35,
      speed: 0.003 + Math.random() * 0.004,
      life: Math.random()
    }));

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w * 0.5;
      cy = h * 0.5;
    }

    function drawXi(x, y, size, glow) {
      const sw = size * 0.14;
      ctx.strokeStyle = `rgba(94, 234, 212, ${0.5 + glow * 0.5})`;
      ctx.lineWidth = sw;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#5eead4';
      ctx.shadowBlur = 12 * glow;

      ctx.beginPath();
      ctx.moveTo(x - size * 0.35, y - size * 0.4);
      ctx.lineTo(x + size * 0.35, y + size * 0.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + size * 0.35, y - size * 0.4);
      ctx.lineTo(x - size * 0.35, y + size * 0.4);
      ctx.stroke();

      ctx.shadowBlur = 0;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      epochPhase += 0.004;
      const scale = Math.min(w, h);

      const rings = [
        { r: 0.44, speed: 0.06, color: 'rgba(94, 234, 212, 0.12)', ticks: 24 },
        { r: 0.34, speed: -0.1, color: 'rgba(251, 191, 36, 0.15)', ticks: 12 },
        { r: 0.24, speed: 0.15, color: 'rgba(56, 189, 248, 0.18)', ticks: 8 }
      ];

      rings.forEach((ring, ri) => {
        const r = scale * ring.r;
        const rot = t * ring.speed;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < ring.ticks; i++) {
          const a = rot + (i / ring.ticks) * Math.PI * 2;
          const tickLen = i % (ring.ticks / 4) === 0 ? 10 : 5;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * (r - tickLen), cy + Math.sin(a) * (r - tickLen));
          ctx.lineTo(cx + Math.cos(a) * (r + 2), cy + Math.sin(a) * (r + 2));
          ctx.strokeStyle = i % (ring.ticks / 4) === 0 ? 'rgba(251, 191, 36, 0.5)' : 'rgba(94, 234, 212, 0.25)';
          ctx.lineWidth = i % (ring.ticks / 4) === 0 ? 2 : 1;
          ctx.stroke();
        }
      });

      const orbitR = scale * 0.44;
      const epochPositions = [];
      for (let i = 0; i < epochCount; i++) {
        const a = epochPhase + (i / epochCount) * Math.PI * 2;
        epochPositions.push({ x: cx + Math.cos(a) * orbitR, y: cy + Math.sin(a) * orbitR, a });
      }
      ctx.beginPath();
      epochPositions.forEach((ep, i) => {
        if (i === 0) ctx.moveTo(ep.x, ep.y);
        else ctx.lineTo(ep.x, ep.y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const leadIdx = Math.floor((epochPhase / (Math.PI * 2)) * epochCount) % epochCount;
      epochPositions.forEach((ep, i) => {
        const ex = ep.x;
        const ey = ep.y;
        const isLead = i === leadIdx;

        const bw = 14;
        const bh = 10;
        ctx.fillStyle = isLead ? 'rgba(94, 234, 212, 0.35)' : 'rgba(255,255,255,0.08)';
        ctx.strokeStyle = isLead ? '#5eead4' : 'rgba(94, 234, 212, 0.4)';
        ctx.lineWidth = isLead ? 1.5 : 1;
        ctx.beginPath();
        ctx.rect(ex - bw / 2, ey - bh / 2, bw, bh);
        ctx.fill();
        ctx.stroke();

        if (isLead) {
          ctx.beginPath();
          ctx.arc(ex, ey, 12, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(94, 234, 212, 0.3)';
          ctx.stroke();
        }
      });

      entelechyParticles.forEach(p => {
        p.dist -= p.speed;
        p.life += 0.01;
        if (p.dist < 0.15) {
          p.dist = 0.55 + Math.random() * 0.35;
          p.angle = Math.random() * Math.PI * 2;
          p.life = 0;
        }
        const spiral = p.angle + p.life * 4;
        const px = cx + Math.cos(spiral) * scale * p.dist;
        const py = cy + Math.sin(spiral) * scale * p.dist;
        const alpha = (1 - p.life % 1) * 0.7;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        ctx.fill();
      });

      const xiGlow = 0.6 + Math.sin(t * 2.5) * 0.4;
      const xiSize = scale * 0.11;
      const xiHalo = ctx.createRadialGradient(cx, cy, 0, cx, cy, xiSize * 2);
      xiHalo.addColorStop(0, `rgba(94, 234, 212, ${0.25 * xiGlow})`);
      xiHalo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = xiHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, xiSize * 2, 0, Math.PI * 2);
      ctx.fill();

      drawXi(cx, cy, xiSize, xiGlow);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('ENTEL', cx - xiSize * 0.55, cy);

      ctx.textAlign = 'left';
      ctx.fillText('KRON', cx + xiSize * 0.55, cy);

      ctx.fillStyle = 'rgba(94, 234, 212, 0.6)';
      ctx.font = '600 7px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TEMPORAL · ENTELECHY · zk-DPoS', cx, cy + scale * 0.44 + 24);

      const sweep = t * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.44, sweep, sweep + 0.4);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
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
