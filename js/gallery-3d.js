/**
 * Projects Gallery System — Exgrid Light Edition
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Clean grid cards matching Live Projects architecture with high-res thumbnails
 * - Domain badges, category pills, role subtitles, and feature tags
 * - Direct external links & specification modal triggers
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
      card.className = 'project-grid-card';
      card.dataset.id = project.id;
      card.dataset.index = idx;
      card.dataset.category = project.category;

      const highlights = project.highlights || project.features || [];
      const cleanUrl = project.url ? project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')[0] : '';
      const isUnderConstruction = project.isUnderConstruction;
      const isBehance = project.isBehance;

      card.innerHTML = `
        <!-- Project Thumbnail Image Container -->
        <div class="project-card-thumb">
          <div class="project-card-thumb-inner">
            <img src="${project.image}?v=8" alt="${project.name} - ${project.categoryLabel || project.category} UX/UI &amp; Product Design by Sakthi Niranjana" class="project-card-img" loading="lazy" onerror="this.onerror=null; this.src='assets/img/projects/gulfticket.jpg';">
            <div class="project-card-overlay">
              <span class="view-specs-badge"><i class="fa-solid fa-expand"></i> VIEW SPECS</span>
            </div>
          </div>
        </div>

        <!-- Project Body -->
        <div class="project-card-body">
          <div class="project-card-meta">
            <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
              <span class="case-pill ${isBehance ? 'case-pill-behance' : ''}">${project.categoryLabel || project.category}</span>
              ${isUnderConstruction ? `<span class="case-pill case-pill-construction"><i class="fa-solid fa-person-digging"></i> Under Construction</span>` : ''}
              ${isBehance ? `<span class="case-pill case-pill-behance"><i class="fa-brands fa-behance"></i> Behance</span>` : ''}
            </div>
            <span class="project-card-dot" style="background: ${isUnderConstruction ? '#f59e0b' : (project.color || 'var(--lavender-primary)')}; box-shadow: 0 0 8px ${isUnderConstruction ? '#f59e0b' : (project.color || 'var(--lavender-primary)')}"></span>
          </div>

          <h3 class="project-card-title">${project.name}</h3>
          <span class="project-card-role">${project.role || 'Lead UX/UI & Product Designer'}</span>
          <p class="project-card-desc">${project.tagline || project.description}</p>

          <div class="project-card-tags">
            ${highlights.map(h => `<span class="case-pill project-card-tag">${h}</span>`).join('')}
          </div>
        </div>

        <!-- Project Footer -->
        <div class="project-card-footer">
          <span class="project-card-domain">${cleanUrl}</span>
          <div class="project-card-actions">
            ${isUnderConstruction ? `
              <span class="project-card-link project-card-link--construction" title="Site undergoing maintenance / active redesign">
                <span>UNDER CONSTRUCTION</span>
                <i class="fa-solid fa-person-digging"></i>
              </span>
            ` : isBehance ? `
              <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-card-link project-card-link--behance" onclick="event.stopPropagation();" aria-label="View Behance Case Studies">
                <span>VIEW ON BEHANCE</span>
                <i class="fa-brands fa-behance"></i>
              </a>
            ` : `
              <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-card-link" onclick="event.stopPropagation();">
                <span>VISIT LIVE</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            `}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openModal(project);
      });

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
      } else if (filter === 'Behance') {
        const filtered = ALL_PROJECTS.filter(p => p.isBehance || p.category === 'Behance');
        buildCards(filtered.length ? filtered : ALL_PROJECTS);
      } else if (filter === 'Creative') {
        const filtered = ALL_PROJECTS.filter(p => p.category === 'Creative' || p.isBehance);
        buildCards(filtered.length ? filtered : ALL_PROJECTS);
      } else {
        const filtered = ALL_PROJECTS.filter(p => p.category === filter);
        buildCards(filtered.length ? filtered : ALL_PROJECTS);
      }
    });
  });
}



