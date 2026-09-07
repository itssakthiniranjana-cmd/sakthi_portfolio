/**
 * Main Application Bootstrap
 * Sakthi Niranjana S Portfolio
 * Senior UX/UI Designer | Product Designer | Creative Strategist
 */

import HeroThreeScene from './three-scene.js';
import { renderCapabilities } from './capabilities-3d.js';
import { renderSelectedWork } from './gallery-3d.js';
import { renderLiveProducts } from './live-products.js';
import { renderFigmaArchive } from './figma-archive.js';
import { initScrollEngine } from './scroll-engine.js';
import { initModal } from './modal.js';
import { PERSONAL_INFO } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cinematic Preloader with Counter (0 -> 100)
  runPreloader();

  // 2. Initialize Three.js 3D Glass Sculpture Scene
  try {
    new HeroThreeScene('hero-canvas');
  } catch (err) {
    console.warn('WebGL / Three.js fallback enabled:', err);
  }

  // 3. Render Dynamic Components
  renderCapabilities('capabilities-container');
  renderSelectedWork('work-gallery-container');
  renderLiveProducts('live-products-grid', 'live-filter-tabs');
  renderFigmaArchive('figma-archive-container');

  // 4. Initialize Modals & Scroll Engine
  initModal();
  initScrollEngine();

  // 5. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 6. Quick Copy Actions & Mobile Drawer
  initUIInteractions();
});

function runPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  const counterEl = document.getElementById('preloader-count');

  if (!preloader || !progressBar || !counterEl) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      progressBar.style.width = '100%';
      counterEl.textContent = '100%';

      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = '';
      }, 400);
    } else {
      progressBar.style.width = `${progress}%`;
      counterEl.textContent = `${progress}%`;
    }
  }, 40);
}

function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  const cursorText = cursor ? cursor.querySelector('span') : null;

  if (!cursor || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-cursor-text], a, button, .project-stage-card, .capability-card, .live-browser-card');
    if (target) {
      const customText = target.getAttribute('data-cursor-text');
      if (customText) {
        cursor.classList.add('cursor-hover');
        if (cursorText) cursorText.textContent = customText;
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        cursor.classList.add('cursor-link');
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-cursor-text], a, button, .project-stage-card, .capability-card, .live-browser-card');
    if (target) {
      cursor.classList.remove('cursor-hover', 'cursor-link');
      if (cursorText) cursorText.textContent = '';
    }
  });
}

function initUIInteractions() {
  // Mobile Nav Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }
  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Quick Copy for Email & Phone
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  function copyToClipboard(text, btn, label) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>COPIED!</span>`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => copyToClipboard(PERSONAL_INFO.email, copyEmailBtn, 'EMAIL'));
  }
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => copyToClipboard(PERSONAL_INFO.phone, copyPhoneBtn, 'PHONE'));
  }
}
