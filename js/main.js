/**
 * Main Application Bootstrap — Exgrid Light Edition
 * Sakthi Niranjana S Portfolio
 * Senior UX/UI Designer | Product Designer | Creative Strategist
 */

import { renderCapabilities } from './capabilities-3d.js';
import { renderSelectedWork } from './gallery-3d.js';
import { initExperienceEducationToggle } from './experience-toggle.js';
import { initModal, openModal } from './modal.js';
import { PERSONAL_INFO, SELECTED_WORK } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Preloader
  initPreloader();

  // 2. Initialize Dual Magnetic Mouse Cursor
  initExgridCursor();

  // 3. Initialize Modals
  initModal();

  // 4. Initialize Navigation & Offcanvas Drawer
  initExgridNavbar();

  // 5. Initialize Split-Letter Button Animations
  initSplitButtons();

  // 6. Initialize Case Study Hover Tracking & Modal Triggers
  initCaseStudyInteractions();

  // 7. Initialize Scroll-To-Top Circular Progress Wrap
  initProgressWrap();

  // 8. Render Dynamic Sub-Components if present on standalone pages
  if (document.getElementById('capabilities-container')) {
    renderCapabilities('capabilities-container');
  }
  if (document.getElementById('work-gallery-container')) {
    renderSelectedWork('work-gallery-container');
  }
  if (document.getElementById('exp-edu-container')) {
    initExperienceEducationToggle('exp-edu-container');
  }

  // 9. Set Active Navigation Link
  setActiveNavLink();
});

/**
 * 01. Preloader fade-out
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  };

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    // Fallback safety timer
    setTimeout(hidePreloader, 1200);
  }
}

/**
 * 02. Dual Magnetic Cursor Engine
 */
function initExgridCursor() {
  const cursorOuter = document.getElementById('cursor-outer');
  const cursorInner = document.getElementById('cursor-inner');
  const cursorText = document.getElementById('cursor-text');

  if (!cursorOuter || !cursorInner) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outerX = mouseX;
  let outerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function renderCursor() {
    outerX += (mouseX - outerX) * 0.18;
    outerY += (mouseY - outerY) * 0.18;
    cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Interactive Hover Triggers
  document.addEventListener('mouseover', (e) => {
    const projectRow = e.target.closest('.banner__content-study__single');
    const interactiveTarget = e.target.closest('a, button, .tw, .in, .fb, .yt, .banner__meta-single, .tool-logo-item');

    if (projectRow) {
      cursorInner.classList.add('cursor-project');
      cursorOuter.style.opacity = '0';
      if (cursorText) cursorText.textContent = 'VIEW';
    } else if (interactiveTarget) {
      cursorOuter.classList.add('cursor-hover');
      cursorInner.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const projectRow = e.target.closest('.banner__content-study__single');
    const interactiveTarget = e.target.closest('a, button, .tw, .in, .fb, .yt, .banner__meta-single, .tool-logo-item');

    if (projectRow) {
      cursorInner.classList.remove('cursor-project');
      cursorOuter.style.opacity = '0.6';
      if (cursorText) cursorText.textContent = '';
    } else if (interactiveTarget) {
      cursorOuter.classList.remove('cursor-hover');
      cursorInner.classList.remove('cursor-hover');
    }
  });
}

/**
 * 03. Primary Navbar & Offcanvas Toggle
 */
function initExgridNavbar() {
  const navbar = document.getElementById('primary-navbar');
  const openBtn = document.getElementById('open-offcanvas-btn');
  const closeBtn = document.getElementById('close-offcanvas-btn');
  const offcanvasDrawer = document.getElementById('offcanvas-drawer');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('navbar-active');
    } else {
      navbar?.classList.remove('navbar-active');
    }
  });

  // Offcanvas drawer triggers
  if (openBtn && offcanvasDrawer) {
    openBtn.addEventListener('click', () => {
      openBtn.classList.toggle('active');
      offcanvasDrawer.classList.toggle('open');
      document.body.classList.toggle('body-active');
    });
  }

  if (closeBtn && offcanvasDrawer) {
    closeBtn.addEventListener('click', () => {
      openBtn?.classList.remove('active');
      offcanvasDrawer.classList.remove('open');
      document.body.classList.remove('body-active');
    });
  }
}

/**
 * 04. Split-Letter Button Hover Animations (.anim-btn)
 */
function initSplitButtons() {
  const animButtons = document.querySelectorAll('.anim-btn');

  animButtons.forEach((btn) => {
    const animSpan = btn.querySelector('.btn-anim');
    if (!animSpan) return;

    const text = animSpan.textContent.trim();
    animSpan.innerHTML = '';

    const letters = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      return span;
    });

    letters.forEach((span, index) => {
      span.style.transitionDelay = `${index * 0.04}s`;
      animSpan.appendChild(span);
    });
  });
}

/**
 * 05. Case Study Floating Hover Preview & Modal Triggers
 */
function initCaseStudyInteractions() {
  const caseStudyRows = document.querySelectorAll('.banner__content-study__single');

  caseStudyRows.forEach((row) => {
    const projectId = row.getAttribute('data-project-id');
    const project = SELECTED_WORK.find((p) => p.id === projectId);
    const hoverThumb = row.querySelector('.case-study-hover');

    // Smooth cursor follower inside row
    if (hoverThumb) {
      row.addEventListener('mousemove', (e) => {
        const rect = row.getBoundingClientRect();
        const dx = e.clientX - rect.left;
        const dy = e.clientY - rect.top;

        // Position hover image relative to cursor with dynamic tilt
        hoverThumb.style.left = `${dx + 30}px`;
        hoverThumb.style.top = `${dy - 40}px`;
      });
    }

    // Click handler to open rich modal
    row.addEventListener('click', () => {
      if (project) {
        openModal(project);
      }
    });
  });
}

/**
 * 06. Circular SVG Progress Wrap Indicator
 */
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

    if (scroll > 120) {
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

/**
 * 07. Active Nav Link Helper
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__list a, .offcanvas-links a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
