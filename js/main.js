/**
 * Main Application Bootstrap — Exgrid Light Edition
 * Sakthi Niranjana S Portfolio
 * Senior UX/UI Designer | Product Designer | Creative Strategist
 */

import { renderCapabilities } from './capabilities-3d.js';
import { renderSelectedWork } from './gallery-3d.js';
import { renderLiveProducts } from './live-products.js';
import { renderFigmaArchive } from './figma-archive.js';
import { initModal, openModal } from './modal.js';
import { PERSONAL_INFO, SELECTED_WORK } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Modals
  initModal();

  // 2. Initialize Exgrid UI Interactions
  initExgridInteractions();

  // 3. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 4. Initialize Scroll-To-Top Progress Indicator
  initProgressWrap();

  // 5. Render Dynamic Components if present on current standalone page
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

  // 6. Set Active Navigation Link
  setActiveNavLink();

  // 7. Case Study Row Click Handlers on Homepage
  initCaseStudyTriggers();
});

function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__list a, .offcanvas-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initExgridInteractions() {
  // Offcanvas Menu Toggle
  const openBtn = document.getElementById('open-offcanvas-btn');
  const closeBtn = document.getElementById('close-offcanvas-btn');
  const offcanvasDrawer = document.getElementById('offcanvas-drawer');

  if (openBtn && offcanvasDrawer) {
    openBtn.addEventListener('click', () => {
      offcanvasDrawer.classList.add('open');
    });
  }

  if (closeBtn && offcanvasDrawer) {
    closeBtn.addEventListener('click', () => {
      offcanvasDrawer.classList.remove('open');
    });
  }

  // Quick Copy for Email
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<span>COPIED!</span>`;
        setTimeout(() => { copyEmailBtn.innerHTML = originalText; }, 2000);
      });
    });
  }
}

function initCaseStudyTriggers() {
  const caseStudyRows = document.querySelectorAll('.banner__content-study__single');
  caseStudyRows.forEach(row => {
    const projectId = row.getAttribute('data-project-id');
    const project = SELECTED_WORK.find(p => p.id === projectId);

    // Mouse movement inside row to position floating hover preview
    const hoverPreview = row.querySelector('.case-study-hover');
    if (hoverPreview) {
      row.addEventListener('mousemove', (e) => {
        const rect = row.getBoundingClientRect();
        const x = e.clientX - rect.left;
        hoverPreview.style.left = `${Math.min(Math.max(x + 20, 150), rect.width - 240)}px`;
      });
    }

    // Click to open modal
    row.addEventListener('click', () => {
      if (project) {
        openModal(project);
      }
    });
  });
}

function initProgressWrap() {
  const progressWrap = document.getElementById('progress-wrap');
  const progressCircle = progressWrap ? progressWrap.querySelector('path') : null;

  if (!progressWrap || !progressCircle) return;

  const pathLength = progressCircle.getTotalLength();
  progressCircle.style.transition = 'none';
  progressCircle.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressCircle.style.strokeDashoffset = pathLength;
  progressCircle.getBoundingClientRect();
  progressCircle.style.transition = 'stroke-dashoffset 10ms linear';

  function updateProgress() {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressCircle.style.strokeDashoffset = progress;

    if (scroll > 150) {
      progressWrap.classList.add('active-progress');
    } else {
      progressWrap.classList.remove('active-progress');
    }
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress);

  progressWrap.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .banner__content-study__single, .ticker-card, .banner__meta-single');
    if (target) {
      cursor.classList.add('cursor-hover');
      if (cursorText) {
        if (target.classList.contains('banner__content-study__single')) {
          cursorText.textContent = 'CASE';
        } else if (target.classList.contains('ticker-card')) {
          cursorText.textContent = 'LIVE';
        } else {
          cursorText.textContent = 'VIEW';
        }
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .banner__content-study__single, .ticker-card, .banner__meta-single');
    if (target) {
      cursor.classList.remove('cursor-hover');
      if (cursorText) cursorText.textContent = '';
    }
  });
}
