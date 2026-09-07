/**
 * Projects Gallery System — Exgrid Light Edition
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Real high-resolution thumbnail images in individual browser frames
 * - Alternating 2-column editorial alignment & structured typography
 * - Live site link & System specifications modal triggers
 * - Category filter tabs
 */

import { ALL_PROJECTS } from './data.js';
import { openModal } from './modal.js';

export function renderSelectedWork(containerId = 'work-gallery-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  function buildCards(items) {
    container.innerHTML = '';

    items.forEach((project, idx) => {
      const card = document.createElement('div');
      card.className = 'project-stage-card';
      card.dataset.id = project.id;
      card.dataset.index = idx;
      card.dataset.category = project.category;

      const highlights = project.highlights || project.features || [];
      const cleanUrl = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')[0];

      card.innerHTML = `
        <!-- Visual Stage with Browser Chrome & Real Thumbnail -->
        <div class="project-visual-stage" data-cursor-text="PROJECT">
          <div class="project-browser-frame">
            <div class="project-browser-header">
              <div class="project-browser-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <div class="project-browser-url">
                <i class="fa-solid fa-lock"></i>
                <span>${cleanUrl}</span>
              </div>
              <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-browser-external" title="Open ${project.name} in new tab" onclick="event.stopPropagation();">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <div class="project-thumb-container">
              <img src="${project.image}" alt="${project.name} Production Interface" class="project-thumb-img" loading="lazy" onerror="this.onerror=null; this.src='assets/img/projects/figmaprojects.jpg';">
              <div class="project-thumb-overlay">
                <span class="view-specs-hint"><i class="fa-solid fa-layer-group"></i> VIEW SYSTEM SPECS</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Information Stage with Clean Vertical Alignment -->
        <div class="project-info-stage">
          <div class="project-header-meta">
            <span class="case-pill">${project.categoryLabel || project.category}</span>
            <span class="project-live-indicator"><span class="pulse-dot"></span> LIVE PLATFORM</span>
          </div>

          <h2 class="project-title">${project.name}</h2>
          
          <div class="project-role-badge">
            <i class="fa-solid fa-user-check"></i>
            <span>${project.role || 'Lead UX/UI & Product Designer'}</span>
          </div>

          <p class="project-tagline">${project.tagline || project.description}</p>
          
          <div class="project-highlights-box">
            <h5 class="highlights-title"><i class="fa-solid fa-microchip"></i> ARCHITECTURE &amp; KEY DELIVERABLES</h5>
            <ul class="project-highlights-list">
              ${highlights.map(h => `
                <li class="project-highlight-item">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="project-actions">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="anim-btn project-btn-primary">
              <span>VISIT LIVE SITE</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button class="anim-btn view-case-btn project-btn-secondary" data-id="${project.id}">
              <span>PROJECT SPECS</span>
              <i class="fa-solid fa-layer-group"></i>
            </button>
          </div>
        </div>
      `;

      // Bind Modal Triggers
      const thumbContainer = card.querySelector('.project-thumb-container');
      const caseBtn = card.querySelector('.view-case-btn');

      const handleOpen = (e) => {
        e.preventDefault();
        openModal(project);
      };

      if (thumbContainer) thumbContainer.addEventListener('click', handleOpen);
      if (caseBtn) caseBtn.addEventListener('click', handleOpen);

      container.appendChild(card);
    });
  }

  // Initial render of all projects
  buildCards(ALL_PROJECTS);

  // Setup Work Filter Tabs
  setupWorkFilterTabs(buildCards);
}

function setupWorkFilterTabs(buildCards) {
  const filterTabs = document.querySelectorAll('.work-filter-tab');
  if (!filterTabs.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      if (!filter || filter === 'all') {
        buildCards(ALL_PROJECTS);
      } else {
        const filtered = ALL_PROJECTS.filter(p => p.category === filter);
        buildCards(filtered.length ? filtered : ALL_PROJECTS);
      }
    });
  });
}


