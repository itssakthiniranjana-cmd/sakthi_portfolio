/**
 * From Figma to Product Archive Component
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Enterprise WMS, 3PL, Landlord, Broker, and Design System Case Studies
 * - Interactive Tabs (Problem, Approach, Key Screens, Tokens)
 * - Verified Figma Archive Link
 */

import { FIGMA_ARCHIVE_PROJECTS } from './data.js';

export function renderFigmaArchive(containerId = 'figma-archive-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  FIGMA_ARCHIVE_PROJECTS.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'figma-case-card';
    card.dataset.id = proj.id;

    card.innerHTML = `
      <div class="figma-badge">
        <svg width="12" height="12" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
        <span>FIGMA ENTERPRISE ARCHIVE</span>
      </div>

      <h3 class="figma-case-title">${proj.title}</h3>
      <span class="figma-case-context">${proj.context}</span>
      <p class="figma-case-tagline">${proj.tagline}</p>

      <div class="figma-tabs-nav">
        <button class="figma-tab-btn active" data-tab="problem">Problem</button>
        <button class="figma-tab-btn" data-tab="approach">Approach</button>
        <button class="figma-tab-btn" data-tab="screens">Key Screens</button>
        <button class="figma-tab-btn" data-tab="tokens">Tokens</button>
      </div>

      <div class="figma-tab-content" id="content-${proj.id}">
        <p><strong>Core UX Challenge:</strong> ${proj.problem}</p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:1.5rem; border-top:1px solid var(--border-subtle); flex-wrap:wrap; gap:1rem;">
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">
          ${proj.outcome}
        </span>
        <a href="${proj.figmaLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding:0.5rem 1rem; font-size:0.8125rem;">
          <span>VIEW IN FIGMA</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `;

    // Tab interaction
    const tabBtns = card.querySelectorAll('.figma-tab-btn');
    const contentBox = card.querySelector(`#content-${proj.id}`);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabType = btn.dataset.tab;
        if (tabType === 'problem') {
          contentBox.innerHTML = `<p><strong>Core UX Challenge:</strong> ${proj.problem}</p>`;
        } else if (tabType === 'approach') {
          contentBox.innerHTML = `<p><strong>Design Approach:</strong> ${proj.approach}</p>`;
        } else if (tabType === 'screens') {
          contentBox.innerHTML = `
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.4rem;">
              ${proj.keyScreens.map(s => `
                <li style="font-size:0.875rem;">
                  <span style="color:var(--accent-primary); font-weight:700;">• ${s.name}:</span> ${s.desc}
                </li>
              `).join('')}
            </ul>
          `;
        } else if (tabType === 'tokens') {
          contentBox.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem; align-items:center;">
              ${proj.tokens.map(t => `<span class="glass-badge" style="color:var(--accent-primary);">${t}</span>`).join('')}
            </div>
          `;
        }
      });
    });

    container.appendChild(card);
  });
}
