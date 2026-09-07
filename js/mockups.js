/**
 * High-Fidelity Mockup Art Generator
 * Sakthi Niranjana S Portfolio
 * 
 * Generates custom, crisp, editorial-grade canvas visuals for Behance case studies
 * and product archives without relying on placeholder images or generic stock.
 */

export function renderMockupCanvas(canvasElement, projectOrType) {
  if (!canvasElement) return;
  const ctx = canvasElement.getContext('2d');
  const width = canvasElement.width = 800;
  const height = canvasElement.height = 500;

  ctx.clearRect(0, 0, width, height);

  if (typeof projectOrType === 'object' && projectOrType !== null) {
    renderProjectMockup(ctx, width, height, projectOrType);
  } else if (typeof projectOrType === 'string') {
    switch (projectOrType) {
      case 'enipu':
        renderEnipuMockup(ctx, width, height);
        break;
      case 'festo':
        renderFestoMockup(ctx, width, height);
        break;
      case 'inception':
        renderInceptionMockup(ctx, width, height);
        break;
      case 'navbar':
        renderNavbarMockup(ctx, width, height);
        break;
      default:
        renderDefaultMockup(ctx, width, height, projectOrType);
    }
  } else {
    renderDefaultMockup(ctx, width, height, 'PROJECT');
  }
}

function renderProjectMockup(ctx, w, h, p) {
  const primaryColor = p.color || '#8b5cf6';
  const name = p.name || p.title || 'Live Product';
  const cat = (p.categoryLabel || p.category || 'Product Design').toUpperCase();
  const highlights = p.highlights || p.features || [];

  // 1. Dark Studio Gradient Background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0f0e17');
  grad.addColorStop(0.5, '#161426');
  grad.addColorStop(1, '#0a0912');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. Ambient Color Aura
  const aura = ctx.createRadialGradient(w * 0.75, h * 0.35, 10, w * 0.75, h * 0.35, 320);
  aura.addColorStop(0, hexToRgba(primaryColor, 0.45));
  aura.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, w, h);

  // 3. Grid Pattern Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 4. Main Floating Glass UI Dashboard Card
  const cardX = 70;
  const cardY = 60;
  const cardW = w - 140;
  const cardH = h - 120;

  // Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 15;

  ctx.fillStyle = 'rgba(23, 21, 38, 0.85)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 20);
  ctx.fill();
  ctx.stroke();
  ctx.shadowColor = 'transparent';

  // 5. Card Browser Header Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, 44, [20, 20, 0, 0]);
  ctx.fill();

  // Traffic light dots
  const dotColors = ['#ff5f56', '#ffbd2e', '#27c93f'];
  dotColors.forEach((c, idx) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(cardX + 26 + idx * 16, cardY + 22, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // URL / Title Pill in Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(cardX + cardW / 2 - 140, cardY + 11, 280, 22, 11);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '500 11px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  const cleanUrl = p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${p.id}.com`;
  ctx.fillText(cleanUrl, cardX + cardW / 2, cardY + 26);

  // 6. Content Inside Card
  ctx.textAlign = 'left';

  // Category Tag Pill
  ctx.fillStyle = hexToRgba(primaryColor, 0.2);
  ctx.strokeStyle = hexToRgba(primaryColor, 0.6);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 35, cardY + 65, 170, 26, 13);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 11px "Space Grotesk", sans-serif';
  ctx.fillText(cat.slice(0, 22), cardX + 47, cardY + 82);

  // Big Project Headline
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 32px "Space Grotesk", sans-serif';
  ctx.fillText(name, cardX + 35, cardY + 130);

  // Secondary Role / Spec text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '500 13px "Inter", sans-serif';
  ctx.fillText(`Role: ${p.role || 'Senior Product Designer'}`, cardX + 35, cardY + 155);

  // 7. Mini Telemetry / Metric Cards
  const metricCols = 3;
  const metricW = (cardW - 70 - (metricCols - 1) * 16) / metricCols;
  const metricY = cardY + 180;
  const metricH = 100;

  for (let i = 0; i < metricCols; i++) {
    const mx = cardX + 35 + i * (metricW + 16);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(mx, metricY, metricW, metricH, 12);
    ctx.fill();
    ctx.stroke();

    // Metric Header
    ctx.fillStyle = primaryColor;
    ctx.font = '700 10px "Space Grotesk", sans-serif';
    ctx.fillText(`FEATURE 0${i + 1}`, mx + 14, metricY + 24);

    // Feature Text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 11px "Inter", sans-serif';
    const text = highlights[i] || `Component ${i + 1} Architecture`;
    wrapCanvasText(ctx, text, mx + 14, metricY + 45, metricW - 28, 16);
  }

  // 8. Live Status Pill at Bottom
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(cardX + 45, cardY + cardH - 24, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '600 11px "Space Grotesk", sans-serif';
  ctx.fillText('PRODUCTION VERIFIED & DEPLOYED', cardX + 57, cardY + cardH - 20);
}

function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== 'string') return `rgba(139, 92, 246, ${alpha})`;
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return `rgba(139, 92, 246, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
      if (curY > y + lineHeight * 2) break;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
}

function renderEnipuMockup(ctx, w, h) {
  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#131124');
  grad.addColorStop(0.5, '#231e42');
  grad.addColorStop(1, '#0c0a18');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Soft violet ambient aura
  const aura = ctx.createRadialGradient(w * 0.7, h * 0.4, 10, w * 0.7, h * 0.4, 280);
  aura.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
  aura.addColorStop(1, 'rgba(124, 58, 237, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, w, h);

  // Floating UI Glass Card
  ctx.save();
  ctx.translate(w * 0.12, h * 0.15);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(0, 0, w * 0.76, h * 0.7, 16);
  ctx.fill();
  ctx.stroke();

  // Enipu Logo / Header
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ENIPU', 35, 48);

  ctx.font = '600 12px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(167, 139, 250, 0.9)';
  ctx.fillText('BRAND IDENTITY & DIGITAL EXPERIENCE', 35, 74);

  // UI Metrics block
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.beginPath();
  ctx.roundRect(35, 100, 220, 160, 12);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('+148%', 55, 150);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '500 12px "Inter", sans-serif';
  ctx.fillText('Engagement Velocity', 55, 175);

  // Graph Line
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(55, 230);
  ctx.bezierCurveTo(110, 220, 150, 190, 230, 160);
  ctx.stroke();

  // Visual Palette Circles
  const colors = ['#5b46f6', '#7c3aed', '#a855f7', '#38bdf8', '#ffffff'];
  colors.forEach((c, idx) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(320 + idx * 45, 130, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  ctx.restore();
}

function renderFestoMockup(ctx, w, h) {
  // Deep Blueprint Industrial Slate
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0a192f');
  grad.addColorStop(1, '#020c1b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Cyan Grid Lines
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Wayfinding Signpost Composition
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(w * 0.15, h * 0.18, w * 0.7, h * 0.64, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('FESTO LIETUVA // LEVEL 03', w * 0.2, h * 0.32);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 14px "Inter", sans-serif';
  ctx.fillText('→ ENGINEERING COLLABORATION WING', w * 0.2, h * 0.44);
  ctx.fillText('→ HARDWARE LAB & TESTING BAY', w * 0.2, h * 0.54);
  ctx.fillText('→ EXECUTIVE STRATEGY SUITE', w * 0.2, h * 0.64);

  // Spatial Wayfinding Indicator
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(w * 0.72, h * 0.48, 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#020c1b';
  ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('03', w * 0.72, h * 0.55);
  ctx.textAlign = 'left';
}

function renderInceptionMockup(ctx, w, h) {
  // High contrast editorial mono layout
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, w, h);

  // Red/Violet diagonal split
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(w * 0.6, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, h);
  ctx.lineTo(w * 0.4, h);
  ctx.closePath();
  ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
  ctx.fill();
  ctx.restore();

  // Massive expressive typographic layers
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.font = '900 140px "Syne", sans-serif';
  ctx.fillText('DEPTH', 40, 220);
  ctx.fillText('LAYER', 120, 360);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 32px "Syne", sans-serif';
  ctx.fillText('INCEPTION', 60, 100);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('EXPRESSIVE TYPOGRAPHY & EDITORIAL ARCHITECTURE', 60, 130);

  // Typographic rule lines
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 150);
  ctx.lineTo(w - 60, 150);
  ctx.stroke();
}

function renderNavbarMockup(ctx, w, h) {
  // Clean Lavender Studio
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#f1effa');
  grad.addColorStop(1, '#e3dff5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Render 3 Distinct Floating Navigation Components
  const navs = [
    { y: 70, label: '01. Floating Pill with Blur', w: 560, h: 54, bg: 'rgba(255, 255, 255, 0.9)' },
    { y: 190, label: '02. Glass Dock with Micro-Badges', w: 620, h: 64, bg: 'rgba(255, 255, 255, 0.75)' },
    { y: 320, label: '03. Segmented Command Bar', w: 520, h: 56, bg: 'rgba(13, 12, 24, 0.92)', dark: true }
  ];

  navs.forEach(nav => {
    ctx.save();
    ctx.translate((w - nav.w) / 2, nav.y);

    // Shadow
    ctx.shadowColor = 'rgba(91, 70, 246, 0.12)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;

    ctx.fillStyle = nav.bg;
    ctx.strokeStyle = nav.dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(91, 70, 246, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0, 0, nav.w, nav.h, 30);
    ctx.fill();
    ctx.stroke();

    ctx.shadowColor = 'transparent';

    // Label
    ctx.fillStyle = nav.dark ? '#ffffff' : '#0d0c18';
    ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SN // SYSTEM', 25, nav.h / 2 + 5);

    // Pills
    ctx.fillStyle = nav.dark ? '#818cf8' : '#5b46f6';
    ctx.beginPath();
    ctx.arc(nav.w - 35, nav.h / 2, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
}

function renderDefaultMockup(ctx, w, h, title) {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(1, '#0f0e26');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title ? title.toUpperCase() : 'PROJECT MOCKUP', w / 2, h / 2);
  ctx.textAlign = 'left';
}
