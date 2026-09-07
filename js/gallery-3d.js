/**
 * Selected Work 3D Cinematic Gallery
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Large visual stages with custom procedural mockup canvases
 * - Case study highlights & metrics breakdown
 * - 3D depth parallax & perspective skew on scroll
 * - Detail modal triggers
 */

import { SELECTED_BEHANCE_PROJECTS } from './data.js';
import { renderMockupCanvas } from './mockups.js';
import { openCaseStudyModal } from './modal.js';

export function renderSelectedWork(containerId = 'work-gallery-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  SELECTED_BEHANCE_PROJECTS.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'project-stage-card';
    card.dataset.id = project.id;
    card.dataset.index = idx;

    card.innerHTML = `
      <div class="project-visual-stage" data-cursor-text="VIEW">
        <canvas class="custom-mockup-canvas" id="canvas-${project.id}"></canvas>
      </div>
      <div class="project-info-stage">
        <span class="project-num-badge">PROJECT ${project.num} // ${project.year}</span>
        <h3 class="project-title">${project.title}</h3>
        <span class="project-category">${project.category}</span>
        <p class="project-tagline">${project.tagline}</p>
        
        <ul class="project-highlights-list">
          ${project.highlights.map(h => `
            <li class="project-highlight-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-primary view-case-btn" data-id="${project.id}">
            <span>EXPLORE CASE STUDY</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <a href="${project.behanceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            <span>BEHANCE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);

    // Render Canvas Visual
    const canvas = document.getElementById(`canvas-${project.id}`);
    if (canvas) {
      renderMockupCanvas(canvas, project.imageMockup);
    }

    // Bind Modal Trigger
    const visualStage = card.querySelector('.project-visual-stage');
    const caseBtn = card.querySelector('.view-case-btn');

    const handleOpen = () => openCaseStudyModal(project);
    if (visualStage) visualStage.addEventListener('click', handleOpen);
    if (caseBtn) caseBtn.addEventListener('click', handleOpen);
  });
}
