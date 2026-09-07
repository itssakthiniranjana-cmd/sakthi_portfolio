/**
 * High-Fidelity Mockup Art Generator
 * Sakthi Niranjana S Portfolio
 * 
 * Generates custom, crisp, editorial-grade canvas visuals for Behance case studies
 * and product archives without relying on placeholder images or generic stock.
 */

export function renderMockupCanvas(canvasElement, type) {
  if (!canvasElement) return;
  const ctx = canvasElement.getContext('2d');
  const width = canvasElement.width = 800;
  const height = canvasElement.height = 500;

  ctx.clearRect(0, 0, width, height);

  switch (type) {
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
      renderDefaultMockup(ctx, width, height, type);
  }
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
