/**
 * Live Digital Products Filter & Browser Wall System
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Filterable showcase of 21 real-world verified products
 * - Category filter pills
 * - Browser window card UI with live URL pills
 * - Interactive detail modal / direct live visit
 */

import { LIVE_PRODUCTS } from './data.js';
import { openLiveProductModal } from './modal.js';

export function renderLiveProducts(containerId = 'live-products-grid', filterContainerId = 'live-filter-tabs') {
  const container = document.getElementById(containerId);
  const filterContainer = document.getElementById(filterContainerId);
  if (!container || !filterContainer) return;

  // 1. Categories
  const categories = [
    { id: 'ALL', label: 'All Products (21)' },
    { id: 'Fintech', label: 'Fintech & Payments' },
    { id: 'Logistics', label: 'Logistics & Smart Cities' },
    { id: 'PropTech', label: 'PropTech & Spaces' },
    { id: 'Gaming', label: 'Gaming & Lotteries' },
    { id: 'Enterprise', label: 'Enterprise & Tech' },
    { id: 'Creative', label: 'Creative Studios' }
  ];

  let currentCategory = 'ALL';

  // Render Filter Tabs
  filterContainer.innerHTML = '';
  categories.forEach(cat => {
    const tab = document.createElement('button');
    tab.className = `filter-tab ${cat.id === currentCategory ? 'active' : ''}`;
    tab.textContent = cat.label;
    tab.addEventListener('click', () => {
      currentCategory = cat.id;
      filterContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCards();
    });
    filterContainer.appendChild(tab);
  });

  // Render Cards Function
  function renderCards() {
    container.innerHTML = '';
    const filtered = currentCategory === 'ALL' 
      ? LIVE_PRODUCTS 
      : LIVE_PRODUCTS.filter(p => p.category === currentCategory);

    filtered.forEach((product, idx) => {
      const card = document.createElement('div');
      card.className = 'live-browser-card';
      card.dataset.id = product.id;
      card.dataset.cursorText = "OPEN";

      // Parse display hostname from URL
      let displayUrl = product.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

      card.innerHTML = `
        <div class="browser-header">
          <div class="browser-dots">
            <span class="browser-dot" style="background: #ef4444;"></span>
            <span class="browser-dot" style="background: #f59e0b;"></span>
            <span class="browser-dot" style="background: #10b981;"></span>
          </div>
          <div class="browser-url-pill">${displayUrl}</div>
        </div>
        <div class="browser-body">
          <div class="live-product-name">
            <span>${product.name}</span>
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${product.color}; box-shadow:0 0 8px ${product.color}"></span>
          </div>
          <span class="live-product-category">${product.categoryLabel}</span>
          <p class="live-product-summary">${product.shortSummary}</p>
          
          <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom: 1.25rem;">
            ${product.features.map(f => `<span class="glass-badge" style="font-size:0.6875rem; padding:0.2rem 0.6rem;">${f}</span>`).join('')}
          </div>

          <div class="live-card-footer">
            <span>VIEW DETAILS</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openLiveProductModal(product);
      });

      container.appendChild(card);
    });
  }

  renderCards();
}
