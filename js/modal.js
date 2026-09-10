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
  const highlights = project.highlights || project.features || [];
  const tools = project.tools || ['Figma', 'FigJam', 'Design Tokens', 'Figma Variables', 'Component Libraries'];
  const outcomeText = project.outcome || project.impact || "Delivered a scalable interface and reusable component structure to support future product expansion.";

  target.innerHTML = `
    <div class="modal-header">
      <span class="modal-category-tag" style="color: var(--lavender-primary); font-weight: 700; letter-spacing: 0.08em;">${project.categoryLabel || project.category} // CASE STUDY SPECIFICATION</span>
      <h2 class="modal-title" style="margin-top: 0.35rem;">${project.name || project.title}</h2>
      <p class="modal-subtitle" style="color: var(--text-secondary);">${project.tagline || project.subtitle || ''}</p>
    </div>

    <div class="modal-body">
      ${project.image ? `
        <div style="margin-bottom: 2rem; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); max-height: 380px;">
          <img src="${project.image}" alt="${project.name || project.title} - UX/UI and Product Design Case Study by Sakthi Niranjana" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy">
        </div>
      ` : ''}

      <div class="modal-info-grid">
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-align-left" style="color:var(--lavender-primary); margin-right:0.5rem;"></i> Project Overview</h3>
          <p class="modal-desc-paragraph">${project.description || project.shortSummary || ''}</p>

          <h3 class="modal-section-title" style="margin-top:1.5rem;"><i class="fa-solid fa-bullseye" style="color:var(--lavender-primary); margin-right:0.5rem;"></i> Problem &amp; Design Challenge</h3>
          <p class="modal-desc-paragraph" style="font-size:0.95rem; color:var(--text-secondary); line-height:1.55;">
            ${project.problem || `Designing an intuitive, responsive interface for ${project.name} that unifies complex domain workflows, minimizes user friction, and establishes a scalable foundation for multi-tenant deployment.`}
          </p>

          <h3 class="modal-section-title" style="margin-top:1.5rem;"><i class="fa-solid fa-sitemap" style="color:var(--lavender-primary); margin-right:0.5rem;"></i> UX Strategy &amp; Architecture</h3>
          <p class="modal-desc-paragraph" style="font-size:0.95rem; color:var(--text-secondary); line-height:1.55; margin-bottom:1rem;">
            ${project.strategy || `Conducted stakeholder alignment, task flow analysis, and information architecture structuring to ensure core transactional paths remain frictionless across desktop and mobile form factors.`}
          </p>

          <h3 class="modal-section-title" style="margin-top:1.5rem;"><i class="fa-solid fa-layer-group" style="color:var(--lavender-primary); margin-right:0.5rem;"></i> Key Features &amp; Capabilities</h3>
          <ul class="project-highlights-list" style="margin-bottom: 1.5rem; list-style:none; display:flex; flex-direction:column; gap:0.65rem; padding:0;">
            ${highlights.map(f => `
              <li class="project-highlight-item" style="display:flex; align-items:flex-start; gap:0.75rem; font-size:0.92rem; color:var(--text-secondary);">
                <i class="fa-solid fa-circle-check" style="color:var(--lavender-primary); margin-top:3px; flex-shrink:0;"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>

          <h3 class="modal-section-title" style="margin-top:1.5rem;"><i class="fa-solid fa-square-poll-vertical" style="color:var(--lavender-primary); margin-right:0.5rem;"></i> Outcome &amp; Impact</h3>
          <p class="modal-desc-paragraph" style="font-size:0.95rem; color:var(--text-secondary); line-height:1.55;">
            ${outcomeText}
          </p>
        </div>

        <div>
          <div class="modal-meta-box">
            <div class="modal-meta-row">
              <span class="modal-meta-key">Role</span>
              <span class="modal-meta-val">${project.role || 'Senior UX/UI & Product Designer'}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Responsibilities</span>
              <span class="modal-meta-val" style="font-size:0.85rem; line-height:1.4;">${project.responsibilities || 'UX research, information architecture, wireframing, UI design, prototyping, design systems'}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Industry / Domain</span>
              <span class="modal-meta-val">${project.categoryLabel || project.category}</span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Design Tools</span>
              <span class="modal-meta-val" style="display:flex; flex-wrap:wrap; gap:0.35rem; justify-content:flex-end;">
                ${tools.map(t => `<span class="case-pill" style="font-size:0.75rem; padding:2px 8px;">${t}</span>`).join('')}
              </span>
            </div>
            <div class="modal-meta-row">
              <span class="modal-meta-key">Status</span>
              <span class="modal-meta-val" style="color: #10b981; font-weight:700;">● Production Live</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-cta-row" style="display:flex; gap:1rem; flex-wrap:wrap; align-items:center; margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--border-color);">
        <a href="${project.url || project.behanceUrl || project.figmaLink}" target="_blank" rel="noopener noreferrer" class="anim-btn" style="padding:0.95rem 1.85rem;" aria-label="Visit Live Production Website for ${project.name || project.title}">
          <span>VISIT LIVE PROJECT</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button class="anim-btn" id="modal-close-bottom" style="background:#ffffff; color:var(--text-primary) !important;" aria-label="Close Case Study Modal">
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
