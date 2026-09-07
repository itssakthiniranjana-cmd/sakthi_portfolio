/**
 * Universal Modal System — Projects & Live Showcase
 * Sakthi Niranjana S Portfolio
 */

let modalBackdrop = null;
let modalContainer = null;

export function initModal() {
  modalBackdrop = document.getElementById('project-modal') || document.getElementById('global-modal-backdrop');
  modalContainer = modalBackdrop ? (modalBackdrop.querySelector('.modal-container') || document.getElementById('global-modal-container')) : null;

  if (!modalBackdrop) return;

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

export function openModal(project) {
  if (!modalContainer || !modalBackdrop) return;

  const target = document.getElementById('modal-content-target') || modalContainer;

  target.innerHTML = `
    <div class="modal-header">
      <span class="modal-category-tag" style="color: var(--lavender-primary);">${project.categoryLabel || project.category} // PROJECT</span>
      <h2 class="modal-title">${project.name || project.title}</h2>
      <p class="modal-subtitle">${project.tagline || project.subtitle || ''}</p>
    </div>

    <div class="modal-body">
      ${project.image ? `
        <div style="margin-bottom: 2rem; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); max-height: 360px;">
          <img src="${project.image}" alt="${project.name || project.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy">
        </div>
      ` : ''}

      <div class="modal-info-grid">
        <div>
          <h3 class="modal-section-title">Project Overview</h3>
          <p class="modal-desc-paragraph">${project.description || project.shortSummary || ''}</p>

          <h3 class="modal-section-title">Key Capabilities &amp; Architecture</h3>
          <ul class="project-highlights-list" style="margin-bottom: 2rem; list-style:none; display:flex; flex-direction:column; gap:0.75rem;">
            ${(project.features || project.highlights || []).map(f => `
              <li class="project-highlight-item" style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.95rem; color:var(--text-secondary);">
                <i class="fa-solid fa-circle-check" style="color:var(--lavender-primary); margin-top:3px; flex-shrink:0;"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <div class="modal-meta-box">
            <div class="modal-meta-row">
              <span class="modal-meta-key">Role &amp; Discipline</span>
              <span class="modal-meta-val">${project.role || 'Senior UX/UI Designer'}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Category</span>
              <span class="modal-meta-val">${project.categoryLabel || project.category}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Status</span>
              <span class="modal-meta-val" style="color: #10b981;">● Production Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-cta-row" style="display:flex; gap:1rem; flex-wrap:wrap; align-items:center;">
        <a href="${project.url || project.behanceUrl || project.figmaLink}" target="_blank" rel="noopener noreferrer" class="anim-btn" style="padding:0.95rem 1.85rem;">
          <span>VISIT LIVE PROJECT</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button class="anim-btn" id="modal-close-bottom" style="background:#ffffff; color:var(--text-primary) !important;">
          <span>CLOSE</span>
        </button>
      </div>
    </div>
  `;

  const closeBottom = document.getElementById('modal-close-bottom');
  if (closeBottom) {
    closeBottom.addEventListener('click', closeModal);
  }

  showModal();
}

export function openCaseStudyModal(project) {
  openModal(project);
}

export function openLiveProductModal(product) {
  openModal(product);
}

function showModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}
