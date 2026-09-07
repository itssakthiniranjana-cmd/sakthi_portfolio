/**
 * Main Application Bootstrap
 * Sakthi Niranjana S Portfolio
 * Senior UX/UI Designer | Product Designer | Creative Strategist
 */

import { initPortraitParallax } from './portrait-parallax.js';
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

  // 2. Initialize 3D Parallax Portrait
  initPortraitParallax();

  // 3. Render Dynamic Components if present on current page
  if (document.getElementById('capabilities-container')) {
    renderCapabilities('capabilities-container');
  }
  if (document.getElementById('work-gallery-container')) {
    renderSelectedWork('work-gallery-container');
  }
  if (document.getElementById('live-products-grid')) {
    renderLiveProducts('live-products-grid', 'live-filter-tabs');
  }
  if (document.getElementById('figma-archive-container')) {
    renderFigmaArchive('figma-archive-container');
  }

  // 4. Initialize Modals & Scroll Engine
  initModal();
  initScrollEngine();

  // 5. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 6. Quick Copy Actions & Mobile Drawer
  initUIInteractions();

  // 7. Set Active Navigation Link based on current page URL
  setActiveNavLink();
});

function runPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  const counterEl = document.getElementById('preloader-count');

  if (!preloader) return;

  // If user already visited in current session, quick reveal
  if (sessionStorage.getItem('visited_preloader')) {
    preloader.style.display = 'none';
    document.body.style.overflow = '';
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (progressBar) progressBar.style.width = '100%';
      if (counterEl) counterEl.textContent = '100%';

      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = '';
        sessionStorage.setItem('visited_preloader', 'true');
      }, 350);
    } else {
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (counterEl) counterEl.textContent = `${progress}%`;
    }
  }, 35);
}

function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href.startsWith('#') && (currentPath === 'index.html' || currentPath === '')) {
      // Anchors on index page
    } else {
      link.classList.remove('active');
    }
  });
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
    const target = e.target.closest('[data-cursor-text], a, button, .project-stage-card, .capability-card, .live-browser-card, .hero-portrait-card');
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
    const target = e.target.closest('[data-cursor-text], a, button, .project-stage-card, .capability-card, .live-browser-card, .hero-portrait-card');
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
