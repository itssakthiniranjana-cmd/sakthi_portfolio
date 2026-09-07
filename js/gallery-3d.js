/**
 * Projects Gallery System — Exgrid Light Edition
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Large visual stages with custom procedural mockup canvases
 * - Project highlights & capabilities breakdown
 * - Direct external links to verified live applications
 * - In-depth specification & architecture modal triggers
 */

import { ALL_PROJECTS } from './data.js';
import { renderMockupCanvas } from './mockups.js';
import { openModal } from './modal.js';

export function renderSelectedWork(containerId = 'work-gallery-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  ALL_PROJECTS.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'project-stage-card';
    card.dataset.id = project.id;
    card.dataset.index = idx;

    const highlights = project.highlights || project.features || [];

    card.innerHTML = `
      <div class="project-visual-stage" data-cursor-text="PROJECT">
        <canvas class="custom-mockup-canvas" id="canvas-${project.id}"></canvas>
      </div>
      <div class="project-info-stage">
        <span class="case-pill" style="margin-bottom: 0.85rem; display: inline-block;">${(project.categoryLabel || project.category).toUpperCase()}</span>
        <h3 class="project-title">${project.name || project.title}</h3>
        <span class="project-category">${project.role || 'Senior UX/UI Designer'}</span>
        <p class="project-tagline">${project.tagline || project.description}</p>
        
        <ul class="project-highlights-list">
          ${highlights.map(h => `
            <li class="project-highlight-item">
              <i class="fa-solid fa-circle-check" style="color:var(--lavender-primary); margin-top:2px;"></i>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 1.5rem;">
          <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="anim-btn" style="padding: 0.85rem 1.5rem;">
            <span>VISIT LIVE SITE</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <button class="anim-btn view-case-btn" data-id="${project.id}" style="background:#ffffff; color:var(--text-primary) !important; padding: 0.85rem 1.5rem;">
            <span>PROJECT SPECS</span>
            <i class="fa-solid fa-layer-group"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);

    // Render Canvas Visual
    const canvas = document.getElementById(`canvas-${project.id}`);
    if (canvas) {
      renderMockupCanvas(canvas, project);
    }

    // Bind Modal Trigger
    const visualStage = card.querySelector('.project-visual-stage');
    const caseBtn = card.querySelector('.view-case-btn');

    const handleOpen = () => openModal(project);
    if (visualStage) visualStage.addEventListener('click', handleOpen);
    if (caseBtn) caseBtn.addEventListener('click', handleOpen);
  });
}

