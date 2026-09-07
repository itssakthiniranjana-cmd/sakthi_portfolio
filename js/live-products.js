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
      card.className = 'banner__sidebar-single';
      card.style.cssText = `
        background: #ffffff;
        border-radius: 24px;
        border: 1px solid var(--border-color);
        padding: 1.75rem;
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1.25rem;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
      `;

      let displayUrl = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')[0];

      card.innerHTML = `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <span class="case-pill" style="font-size:0.6875rem; padding:0.2rem 0.6rem;">${project.categoryLabel}</span>
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${project.color || 'var(--lavender-primary)'}; box-shadow:0 0 8px ${project.color || 'var(--lavender-primary)'}"></span>
          </div>

          <h4 style="font-size:1.35rem; font-weight:800; margin-bottom:0.4rem; color:var(--text-primary);">${project.name}</h4>
          <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.25rem;">${project.tagline}</p>

          <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:1.25rem;">
            ${(project.highlights || []).map(h => `<span class="case-pill" style="background:var(--bg-secondary); border-color:transparent; font-size:0.6875rem;">${h}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:1rem; border-top:1px solid var(--border-subtle);">
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${displayUrl}</span>
          <a href="${project.url}" target="_blank" rel="noopener noreferrer" style="color:var(--lavender-primary); font-weight:700; font-size:0.875rem;" onclick="event.stopPropagation();">
            VISIT LIVE <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem; margin-left:4px;"></i>
          </a>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--lavender-primary)';
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = 'var(--shadow-lavender)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border-color)';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-sm)';
      });

      card.addEventListener('click', () => {
        openModal(project);
      });

      container.appendChild(card);
    });
  }

  renderCards();
}
