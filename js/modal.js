/**
 * Universal Modal System
 * Sakthi Niranjana S Portfolio
 * 
 * Manages full-screen case-study modals, live product previews,
 * and keyboard/backdrop navigation.
 */

import { renderMockupCanvas } from './mockups.js';

let modalBackdrop = null;
let modalContainer = null;

export function initModal() {
  modalBackdrop = document.getElementById('global-modal-backdrop');
  modalContainer = document.getElementById('global-modal-container');

  if (!modalBackdrop) return;

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

export function openCaseStudyModal(project) {
  if (!modalContainer || !modalBackdrop) return;

  modalContainer.innerHTML = `
    <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close modal">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="modal-header">
      <span class="modal-category-tag">CASE STUDY // ${project.category}</span>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-subtitle">${project.tagline}</p>
    </div>

    <div class="modal-body">
      <div class="modal-visual-hero">
        <canvas class="modal-canvas-art" id="modal-canvas-view"></canvas>
      </div>

      <div class="modal-info-grid">
        <div>
          <h3 class="modal-section-title">Design Overview</h3>
          <p class="modal-desc-paragraph">${project.description}</p>

          <h3 class="modal-section-title">Key Highlights & Architecture</h3>
          <ul class="project-highlights-list" style="margin-bottom: 2rem;">
            ${project.highlights.map(h => `
              <li class="project-highlight-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <div class="modal-meta-box">
            <div class="modal-meta-row">
              <span class="modal-meta-key">Role & Discipline</span>
              <span class="modal-meta-val">${project.role}</span>
            </div>
            ${project.metrics ? project.metrics.map(m => `
              <div class="modal-meta-row">
                <span class="modal-meta-key">${m.label}</span>
                <span class="modal-meta-val">${m.value}</span>
              </div>
            `).join('') : ''}
            <div class="modal-meta-row">
              <span class="modal-meta-key">Verified Portfolio</span>
              <span class="modal-meta-val">Behance Profile</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-cta-row">
        <a href="${project.behanceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>VIEW FULL CASE ON BEHANCE</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <button class="btn btn-secondary" id="modal-close-bottom">
          <span>CLOSE</span>
        </button>
      </div>
    </div>
  `;

  // Render Visual Canvas in Modal
  const modalCanvas = document.getElementById('modal-canvas-view');
  if (modalCanvas) {
    renderMockupCanvas(modalCanvas, project.imageMockup);
  }

  // Bind Close triggers
  document.getElementById('modal-close-trigger').addEventListener('click', closeModal);
  document.getElementById('modal-close-bottom').addEventListener('click', closeModal);

  showModal();
}

export function openLiveProductModal(product) {
  if (!modalContainer || !modalBackdrop) return;

  modalContainer.innerHTML = `
    <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close modal">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="modal-header">
      <span class="modal-category-tag" style="color: ${product.color}">${product.categoryLabel} // LIVE PRODUCT</span>
      <h2 class="modal-title">${product.name}</h2>
      <p class="modal-subtitle">${product.shortSummary}</p>
    </div>

    <div class="modal-body">
      <div class="modal-info-grid">
        <div>
          <h3 class="modal-section-title">Product Context & Architecture</h3>
          <p class="modal-desc-paragraph">
            <strong>${product.name}</strong> operates in the <strong>${product.categoryLabel}</strong> sector, providing digital services tailored for ${product.audience.toLowerCase()}.
          </p>

          <h3 class="modal-section-title">Key Capabilities & Features</h3>
          <ul class="project-highlights-list" style="margin-bottom: 2rem;">
            ${product.features.map(f => `
              <li class="project-highlight-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${product.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <div class="modal-meta-box">
            <div class="modal-meta-row">
              <span class="modal-meta-key">Interface Type</span>
              <span class="modal-meta-val">${product.interfaceType}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Primary Audience</span>
              <span class="modal-meta-val">${product.audience}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Live Status</span>
              <span class="modal-meta-val" style="color: var(--accent-emerald)">● Production Active</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-cta-row">
        <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background: linear-gradient(135deg, ${product.color} 0%, #4338ca 100%)">
          <span>VISIT LIVE WEBSITE</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <button class="btn btn-secondary" id="modal-close-bottom">
          <span>CLOSE</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('modal-close-trigger').addEventListener('click', closeModal);
  document.getElementById('modal-close-bottom').addEventListener('click', closeModal);

  showModal();
}

function showModal() {
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}
