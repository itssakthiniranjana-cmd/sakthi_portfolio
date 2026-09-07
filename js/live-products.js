/**
 * Live Digital Products Filter & Grid System
 * Sakthi Niranjana S Portfolio
 */

import { ALL_PROJECTS } from './data.js';
import { openModal } from './modal.js';

export function renderLiveProducts(containerId = 'live-products-grid', filterContainerId = 'live-filter-tabs') {
  const container = document.getElementById(containerId);
  const filterContainer = document.getElementById(filterContainerId);
  if (!container) return;

  const categories = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'Fintech', label: 'FinTech' },
    { id: 'Gaming', label: 'Gaming & Lotteries' },
    { id: 'PropTech', label: 'PropTech' },
    { id: 'Logistics', label: 'Logistics & Supply Chain' },
    { id: 'Enterprise', label: 'Enterprise & SaaS' },
    { id: 'Creative', label: 'Creative & E-Com' }
  ];

  let currentCategory = 'ALL';

  if (filterContainer) {
    filterContainer.innerHTML = '';
    categories.forEach(cat => {
      const tab = document.createElement('button');
      tab.className = `filter-tab ${cat.id === currentCategory ? 'active' : ''}`;
      tab.textContent = cat.label;
      tab.style.cssText = `
        padding: 0.55rem 1.25rem;
        border-radius: 9999px;
        font-family: var(--font-display);
        font-size: 0.875rem;
        font-weight: 600;
        background: ${cat.id === currentCategory ? 'var(--text-primary)' : '#ffffff'};
        color: ${cat.id === currentCategory ? '#ffffff' : 'var(--text-secondary)'};
        border: 1px solid var(--border-color);
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      tab.addEventListener('click', () => {
        currentCategory = cat.id;
        filterContainer.querySelectorAll('.filter-tab').forEach(t => {
          t.style.background = '#ffffff';
          t.style.color = 'var(--text-secondary)';
        });
        tab.style.background = 'var(--text-primary)';
        tab.style.color = '#ffffff';
        renderCards();
      });
      filterContainer.appendChild(tab);
    });
  }

  function renderCards() {
    container.innerHTML = '';
    const filtered = currentCategory === 'ALL' 
      ? ALL_PROJECTS 
      : ALL_PROJECTS.filter(p => p.category === currentCategory);

    filtered.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'project-grid-card';
      card.dataset.id = project.id;
      card.dataset.category = project.category;

      const highlights = project.highlights || project.features || [];
      const cleanUrl = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')[0];

      card.innerHTML = `
        <!-- Thumbnail Image Container -->
        <div class="project-card-thumb">
          <div class="project-card-thumb-inner">
            <img src="${project.image}" alt="${project.name}" class="project-card-img" loading="lazy" onerror="this.onerror=null; this.src='assets/img/projects/figmaprojects.jpg';">
            <div class="project-card-overlay">
              <span class="view-specs-badge"><i class="fa-solid fa-expand"></i> VIEW SPECS</span>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="project-card-body">
          <div class="project-card-meta">
            <span class="case-pill">${project.categoryLabel || project.category}</span>
            <span class="project-card-dot" style="background:${project.color || 'var(--lavender-primary)'}; box-shadow:0 0 8px ${project.color || 'var(--lavender-primary)'}"></span>
          </div>

          <h3 class="project-card-title">${project.name}</h3>
          <span class="project-card-role">${project.role || 'Senior UX/UI Designer'}</span>
          <p class="project-card-desc">${project.tagline || project.description}</p>

          <div class="project-card-tags">
            ${highlights.map(h => `<span class="case-pill project-card-tag">${h}</span>`).join('')}
          </div>
        </div>

        <!-- Card Footer -->
        <div class="project-card-footer">
          <span class="project-card-domain">${cleanUrl}</span>
          <div class="project-card-actions">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-card-link" onclick="event.stopPropagation();">
              <span>VISIT LIVE</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openModal(project);
      });

      container.appendChild(card);
    });
  }

  renderCards();
}
