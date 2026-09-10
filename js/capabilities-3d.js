/**
 * 3D Capabilities & Craft Interactive Parallax Engine
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Multi-layer 3D perspective tilt with requestAnimationFrame smooth physics
 * - Cursor-following specular glare & glassmorphic reflection
 * - Dynamic 3D depth separation (translateZ layers) on title, icon, tags & impact boxes
 * - Dynamic floating drop shadow calculated relative to light source
 * - Category filtering with smooth transition animations
 * - Magnetic custom cursor interaction (CRAFT badge)
 */

import { CAPABILITIES } from './data.js';

export function renderCapabilities(containerId = 'capabilities-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Render cards
  function buildCards(items) {
    container.innerHTML = '';
    
    items.forEach((cap, index) => {
      const card = document.createElement('div');
      card.className = 'capability-card';
      card.dataset.index = index;
      card.dataset.category = cap.category;

      card.innerHTML = `
        <div class="capability-card__glare" aria-hidden="true"></div>
        <div class="capability-card__glow" aria-hidden="true"></div>
        
        <div class="capability-card__inner">
          <div class="capability-card__header">
            <div class="capability-card__meta">
              <span class="case-pill">${cap.category}</span>
            </div>
            <div class="capability-icon-badge">
              <i class="${cap.icon || 'fa-solid fa-shapes'}"></i>
            </div>
          </div>

          <h3 class="capability-title">${cap.title}</h3>
          <p class="capability-desc">${cap.description}</p>

          <div class="capability-impact-box">
            <i class="fa-solid fa-circle-check"></i>
            <span>${cap.impact || 'Enterprise Level Craft'}</span>
          </div>

          <div class="capability-skills-section">
            <div class="capability-skills">
              ${cap.skills.map(s => `<span class="capability-skill-pill">${s}</span>`).join('')}
            </div>
            ${cap.tools && cap.tools.length ? `
              <div class="capability-tools">
                <span class="tools-label"><i class="fa-solid fa-wrench"></i> Stack:</span>
                ${cap.tools.map(t => `<span class="capability-tool-pill">${t}</span>`).join('')}
              </div>
            ` : ''}
          </div>

          <div class="capability-card__footer">
            <span class="capability-explore-text">EXPLORE SPECIALIZATION</span>
            <span class="capability-arrow-btn"><i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      `;

      // Attach 3D Parallax Hover Listeners
      initParallaxCard(card);

      container.appendChild(card);
    });
  }

  // Initial render of all 10 capabilities
  buildCards(CAPABILITIES);

  // Setup Filter Tabs if present
  setupFilterTabs(buildCards);
}

function initParallaxCard(card) {
  const glare = card.querySelector('.capability-card__glare');
  const header = card.querySelector('.capability-card__header');
  const icon = card.querySelector('.capability-icon-badge');
  const title = card.querySelector('.capability-title');
  const desc = card.querySelector('.capability-desc');
  const impact = card.querySelector('.capability-impact-box');
  const skills = card.querySelector('.capability-skills-section');
  const footer = card.querySelector('.capability-card__footer');

  let bounds = null;
  let mouseX = 0;
  let mouseY = 0;
  let isHovered = false;
  let rafId = null;

  // Spring physics variables
  let currentTiltX = 0;
  let currentTiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  function updateTransform() {
    if (!isHovered && Math.abs(currentTiltX) < 0.05 && Math.abs(currentTiltY) < 0.05) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      if (header) header.style.transform = 'translate3d(0, 0, 0)';
      if (icon) icon.style.transform = 'translate3d(0, 0, 0)';
      if (title) title.style.transform = 'translate3d(0, 0, 0)';
      if (desc) desc.style.transform = 'translate3d(0, 0, 0)';
      if (impact) impact.style.transform = 'translate3d(0, 0, 0)';
      if (skills) skills.style.transform = 'translate3d(0, 0, 0)';
      if (footer) footer.style.transform = 'translate3d(0, 0, 0)';
      if (glare) glare.style.opacity = '0';
      cancelAnimationFrame(rafId);
      rafId = null;
      return;
    }

    // Smooth interpolation (LERP) for fluid 60fps motion
    currentTiltX += (targetTiltX - currentTiltX) * 0.15;
    currentTiltY += (targetTiltY - currentTiltY) * 0.15;

    const normX = (currentTiltY / 14); // -1 to 1
    const normY = (-currentTiltX / 14); // -1 to 1

    // 1. Card Container 3D Perspective Tilt & Elevation
    card.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) translateZ(24px) scale3d(1.02, 1.02, 1.02)`;

    // 2. Dynamic Directional 3D Drop Shadow
    const shadowX = -normX * 22;
    const shadowY = -normY * 22 + 25;
    card.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 45px rgba(137, 2, 62, 0.18), 0 10px 25px rgba(0, 0, 0, 0.04)`;

    // 3. Multi-layer Parallax Depth Separation
    if (header) {
      header.style.transform = `translate3d(${(normX * 8).toFixed(1)}px, ${(normY * 8).toFixed(1)}px, 25px)`;
    }
    if (icon) {
      icon.style.transform = `translate3d(${(normX * 16).toFixed(1)}px, ${(normY * 16).toFixed(1)}px, 45px) rotate(${(normX * 10).toFixed(1)}deg)`;
    }
    if (title) {
      title.style.transform = `translate3d(${(normX * 12).toFixed(1)}px, ${(normY * 12).toFixed(1)}px, 35px)`;
    }
    if (desc) {
      desc.style.transform = `translate3d(${(normX * 6).toFixed(1)}px, ${(normY * 6).toFixed(1)}px, 18px)`;
    }
    if (impact) {
      impact.style.transform = `translate3d(${(normX * 10).toFixed(1)}px, ${(normY * 10).toFixed(1)}px, 30px)`;
    }
    if (skills) {
      skills.style.transform = `translate3d(${(normX * 14).toFixed(1)}px, ${(normY * 14).toFixed(1)}px, 40px)`;
    }
    if (footer) {
      footer.style.transform = `translate3d(${(normX * 8).toFixed(1)}px, ${(normY * 8).toFixed(1)}px, 22px)`;
    }

    // 4. Glare specular highlight
    if (glare && bounds) {
      const glareX = (mouseX / bounds.width) * 100;
      const glareY = (mouseY / bounds.height) * 100;
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(137, 2, 62, 0.22), rgba(255, 255, 255, 0.45) 35%, transparent 70%)`;
    }

    rafId = requestAnimationFrame(updateTransform);
  }

  card.addEventListener('mouseenter', () => {
    bounds = card.getBoundingClientRect();
    isHovered = true;
    if (!rafId) {
      rafId = requestAnimationFrame(updateTransform);
    }
  });

  card.addEventListener('mousemove', (e) => {
    if (!bounds) bounds = card.getBoundingClientRect();
    mouseX = e.clientX - bounds.left;
    mouseY = e.clientY - bounds.top;

    const xNorm = (mouseX / bounds.width) * 2 - 1; // -1 to 1
    const yNorm = (mouseY / bounds.height) * 2 - 1; // -1 to 1

    targetTiltX = -yNorm * 13; // Max 13 deg
    targetTiltY = xNorm * 13; // Max 13 deg
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;
    targetTiltX = 0;
    targetTiltY = 0;
  });

  // Clicking card triggers route to Work page
  card.addEventListener('click', () => {
    window.location.href = 'work.html';
  });
}

function setupFilterTabs(buildCards) {
  const filterTabs = document.querySelectorAll('.capability-filter-tab');
  if (!filterTabs.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      if (!filter || filter === 'all') {
        buildCards(CAPABILITIES);
      } else {
        const filtered = CAPABILITIES.filter(cap => {
          const cat = cap.category.toLowerCase();
          const title = cap.title.toLowerCase();
          if (filter === 'design' && (cat.includes('discipline') || cat.includes('craft') || title.includes('ux') || title.includes('visual'))) return true;
          if (filter === 'strategy' && (cat.includes('strategic') || cat.includes('scalability') || title.includes('product') || title.includes('systems'))) return true;
          if (filter === 'creative' && (cat.includes('identity') || cat.includes('leadership') || title.includes('branding') || title.includes('content'))) return true;
          if (filter === 'tech' && (cat.includes('enterprise') || cat.includes('motion') || cat.includes('discovery') || cat.includes('tactile') || title.includes('wms') || title.includes('prototyping') || title.includes('research') || title.includes('interaction'))) return true;
          return false;
        });
        buildCards(filtered.length ? filtered : CAPABILITIES);
      }
    });
  });
}

